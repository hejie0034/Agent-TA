import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const getArg = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
};

const sourcePath = getArg("--source");
const outputRoot = path.resolve(
  getArg("--output") ?? "uLearning截图指引工程",
);

if (!sourcePath) {
  throw new Error("缺少 --source，请传入包含本线程记录的 JSONL 文件。");
}

const rawLines = (await fs.readFile(sourcePath, "utf8")).split(/\r?\n/);
let planText = "";

for (const line of rawLines) {
  if (!line.trim()) continue;
  try {
    const event = JSON.parse(line);
    const payload = event?.payload;
    if (
      event?.type === "response_item" &&
      payload?.type === "message" &&
      payload?.role === "user"
    ) {
      const text = (payload.content ?? [])
        .map((item) => item?.text ?? "")
        .join("");
      if (text.startsWith("PLEASE IMPLEMENT THIS PLAN:")) {
        planText = text.replace(/^PLEASE IMPLEMENT THIS PLAN:\s*/, "");
      }
    }
  } catch {
    // Ignore non-JSON or incomplete diagnostic lines.
  }
}

if (!planText) {
  throw new Error("未在会话记录中找到待实施的截图问题清单。");
}

const categories = [];
let currentCategory = null;

for (const rawLine of planText.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (line === "## 截图制作建议") break;

  const heading = line.match(/^##\s+(.+)$/);
  if (heading) {
    currentCategory = {
      title: heading[1].trim(),
      questions: [],
    };
    categories.push(currentCategory);
    continue;
  }

  const question = line.match(/^(\d+)\.\s+(.+)$/);
  if (question && currentCategory) {
    currentCategory.questions.push({
      number: Number(question[1]),
      text: question[2].trim(),
    });
  }
}

const questions = categories.flatMap((category) =>
  category.questions.map((question) => ({ ...question, category })),
);

if (categories.length !== 28 || questions.length !== 521) {
  throw new Error(
    `清单解析数量异常：大类 ${categories.length}/28，问题 ${questions.length}/521。`,
  );
}

const sanitizeName = (value) =>
  value
    .replace(/[\\/:*?"<>|]/g, " ")
    .replace(/[？?。.\s]+$/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 90);

const pad = (value, width) => String(value).padStart(width, "0");

const screenshotTemplate = (question) => {
  const text = question.text;
  if (/为什么|怎么办|失败|无法|打不开|收不到|不同步|限制|看不到/.test(text)) {
    return [
      "1_进入相关功能页面.png",
      "2_问题现象或错误提示.png",
      "3_检查关键设置.png",
      "4_执行解决方法.png",
      "5_问题解决后的状态.png",
    ];
  }
  if (/有哪些|有什么作用|什么是|支持哪些|需要什么|是否/.test(text)) {
    return [
      "1_进入功能页面.png",
      "2_功能区域全貌.png",
      "3_关键选项或说明.png",
    ];
  }
  return [
    "1_进入功能页面.png",
    "2_点击操作按钮.png",
    "3_填写或选择设置.png",
    "4_确认提交前.png",
    "5_操作成功.png",
  ];
};

const privacyText =
  "姓名、头像、手机号、学号、邮箱、班级成员、成绩、学生作业内容、邀请码和二维码等信息出现时，先打码再使用。";

await fs.mkdir(outputRoot, { recursive: true });

const indexLines = [
  "# uLearning 截图指引问题总目录（教师端）",
  "",
  `共 ${categories.length} 个大类、${questions.length} 个具体问题。`,
  "",
];
const csvRows = [
  ["编号", "大类", "问题", "相对目录", "状态", "截图数量", "是否打码", "备注"],
];

for (let categoryIndex = 0; categoryIndex < categories.length; categoryIndex += 1) {
  const category = categories[categoryIndex];
  const categoryFolder = `${pad(categoryIndex + 1, 2)}_${sanitizeName(category.title)}`;
  const categoryPath = path.join(outputRoot, categoryFolder);
  await fs.mkdir(categoryPath, { recursive: true });

  indexLines.push(`## ${category.title}`, "");

  for (const question of category.questions) {
    const questionFolder = `${pad(question.number, 3)}_${sanitizeName(question.text)}`;
    const questionPath = path.join(categoryPath, questionFolder);
    const relativePath = path.join(categoryFolder, questionFolder);
    const template = screenshotTemplate(question);

    await fs.mkdir(questionPath, { recursive: true });

    const instructionPath = path.join(questionPath, "截图说明.md");
    try {
      await fs.access(instructionPath);
    } catch {
      const instruction = [
        `# ${question.number}. ${question.text}`,
        "",
        "## 建议截图",
        "",
        ...template.map((name) => `- \`${name}\``),
        "",
        "只保留实际需要的步骤，文件名必须从 1 开始连续编号。",
        "",
        "## 截图要求",
        "",
        "- 截到当前步骤所需的按钮、表单、提示或结果，不要保留无关区域。",
        "- 最终提交、发布、删除、移除、强制交卷等操作，应先保留“确认前”截图。",
        `- ${privacyText}`,
        "- 如果功能因权限、课程状态或版本差异不存在，在本文件夹中记录实际情况。",
        "",
        "## 文字说明（截图完成后填写）",
        "",
        "- 入口：",
        "- 操作步骤：",
        "- 成功标志：",
        "- 常见问题：",
        "",
      ].join("\n");
      await fs.writeFile(instructionPath, instruction, "utf8");
    }

    const link = relativePath.split(path.sep).map(encodeURIComponent).join("/");
    indexLines.push(`- [${question.number}. ${question.text}](${link}/截图说明.md)`);
    csvRows.push([
      question.number,
      category.title,
      question.text,
      relativePath,
      "待截图",
      0,
      "待检查",
      "",
    ]);
  }
  indexLines.push("");
}

const csvEscape = (value) => {
  const text = String(value);
  return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
};

const readme = [
  "# uLearning 截图指引工程",
  "",
  "本目录用于收集 uLearning 教师端操作截图。",
  "",
  `- 大类：${categories.length} 个`,
  `- 具体问题：${questions.length} 个`,
  "- 每个问题均有独立文件夹和 `截图说明.md`。",
  "- 截图完成后，在 `截图进度总表.csv` 中更新状态和截图数量。",
  "- 昨日已有截图仍保存在工作区原有的 `截图教程` 目录，本工程未移动或修改它们。",
  "",
  "## 文件命名",
  "",
  "截图按实际操作顺序连续编号，例如：",
  "",
  "- `1_进入功能页面.png`",
  "- `2_点击操作按钮.png`",
  "- `3_填写或选择设置.png`",
  "- `4_确认提交前.png`",
  "- `5_操作成功.png`",
  "",
  "## 隐私处理",
  "",
  privacyText,
  "",
  "## 使用入口",
  "",
  "- 打开 `问题总目录.md` 浏览全部问题。",
  "- 打开 `截图进度总表.csv` 维护拍摄进度。",
  "",
].join("\n");

await fs.writeFile(path.join(outputRoot, "README.md"), readme, "utf8");
await fs.writeFile(
  path.join(outputRoot, "问题总目录.md"),
  indexLines.join("\n"),
  "utf8",
);
await fs.writeFile(
  path.join(outputRoot, "截图进度总表.csv"),
  `\uFEFF${csvRows.map((row) => row.map(csvEscape).join(",")).join("\r\n")}\r\n`,
  "utf8",
);

console.log(
  JSON.stringify(
    {
      outputRoot,
      categories: categories.length,
      questions: questions.length,
      instructionFiles: questions.length,
    },
    null,
    2,
  ),
);
