from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
FAQ_PATH = ROOT / "ulearning_teacher_faq.json"
SCREENSHOT_KB_PATH = ROOT / "切片读取知识库" / "screenshot_tutorial_kb.jsonl"
REPORT_PATH = ROOT / "切片读取知识库" / "screenshot_faq_sync_report.json"


MANUAL_GUIDES: dict[str, dict[str, Any]] = {
    "如何新建公告": {
        "category": "course",
        "summary": "进入课程公告模块，发布新的课程公告。",
        "keywords": ["新建公告", "发布公告", "发公告", "课程公告", "公告名称", "公告内容", "选择班级"],
        "answer": {
            "entry": "进入目标课程后，打开左侧【公告】。",
            "steps": [
                "点击右上角【发布新公告】。",
                "在弹窗中填写公告名称。",
                "填写公告内容，可按需要添加附件。",
                "选择发布班级。",
                "点击【确定】发布。",
            ],
            "check": "返回公告页面后，公告列表中能看到刚发布的公告。",
            "risk": "发布前请核对班级范围和公告内容；课程管理员可对所有班级发布，任课教师和助教通常只能对自己负责的班级发布。",
        },
    },
    "如何编辑公告": {
        "category": "course",
        "summary": "在公告列表中编辑已发布公告。",
        "keywords": ["编辑公告", "修改公告", "公告修改", "更新公告内容"],
        "answer": {
            "entry": "进入目标课程后，打开左侧【公告】。",
            "steps": ["找到要修改的公告。", "点击公告右侧【编辑】。", "修改公告名称、内容或班级范围。", "确认保存。"],
            "check": "公告列表中显示修改后的内容或更新时间。",
            "risk": "修改已发布公告会影响学生看到的通知内容，保存前请核对公告对象。",
        },
    },
    "如何删除公告": {
        "category": "course",
        "summary": "在公告列表中删除不再需要的公告。",
        "keywords": ["删除公告", "移除公告", "公告删除", "撤掉公告"],
        "answer": {
            "entry": "进入目标课程后，打开左侧【公告】。",
            "steps": ["找到要删除的公告。", "点击公告右侧操作入口。", "选择删除并按弹窗确认。"],
            "check": "公告列表中不再显示该公告。",
            "risk": "删除后学生将无法继续查看该公告，请确认公告内容和影响班级后再操作。",
        },
    },
    "如何开始上课": {
        "category": "classroom",
        "summary": "创建课堂并开始上课，学生可通过课堂码加入课堂。",
        "keywords": ["开始上课", "创建课堂", "进入课堂", "课堂码", "通知上课", "上课记录"],
        "answer": {
            "entry": "进入目标课程后，打开左侧【课堂】。",
            "steps": [
                "点击【创建课堂】。",
                "输入课堂名称。",
                "选择上课班级。",
                "点击【开始上课】。",
                "进入上课页面后，可把课堂码发给学生加入课堂。",
            ],
            "check": "课堂页面显示【上课中】，并出现课堂码、点名、资源等课堂工具。",
            "risk": "开始前请确认班级和课堂名称，避免学生加入错误课堂。",
        },
    },
    "如何在课堂中打开资源": {
        "category": "classroom",
        "summary": "在课堂进行中打开教学资源展示给学生。",
        "keywords": ["课堂打开资源", "打开资源", "课堂资源", "上课资源", "展示资源"],
        "answer": {
            "entry": "进入正在进行的课堂页面。",
            "steps": ["点击右侧【资源】。", "选择最近打开或课程资源中的目标资源。", "打开后确认课堂页面正常展示。"],
            "check": "课堂页面中显示选中的资源内容。",
            "risk": "展示前请确认资源内容正确，避免课堂中打开错误资料。",
        },
    },
    "创建课程": {
        "category": "course",
        "summary": "在教师首页创建一门新课程。",
        "keywords": ["创建课程", "新建课程", "建课", "课程封面", "课程名称"],
        "answer": {
            "entry": "教师首页点击【创建课程】。",
            "steps": ["填写课程名称。", "选择或上传课程封面。", "确认创建。"],
            "check": "教师首页出现新创建的课程卡片。",
            "risk": "团队教学通常由课程负责人创建课程，其他老师通过教学团队加入。",
        },
    },
    "删除课程": {
        "category": "course",
        "summary": "从课程卡片更多菜单删除课程。",
        "keywords": ["删除课程", "删课程", "移除课程", "确认删除", "课程卡片"],
        "answer": {
            "entry": "在教师首页或课程列表中找到要删除的课程卡片。",
            "steps": ["点击课程卡片右上角更多菜单。", "选择【删除课程】。", "在弹窗中输入确认文字。", "点击删除完成确认。"],
            "check": "课程列表中不再显示该课程。",
            "risk": "删除课程属于高风险操作，删除后可能无法恢复，请确认课程和学生范围后再操作。",
        },
    },
}


def slugify(value: str) -> str:
    text = value.lower()
    replacements = {
        "ai": "ai",
        "ppt": "ppt",
        "工作台": "workspace",
        "功能": "feature",
        "公告": "announcement",
        "课程": "course",
        "课件": "courseware",
        "课堂": "classroom",
        "资源": "resource",
        "班级": "class",
        "学生": "student",
        "教师": "teacher",
        "题库": "question-bank",
        "单元": "unit",
        "作业": "homework",
        "考试": "exam",
        "讨论": "discussion",
        "直播": "live",
        "创建": "create",
        "新建": "create",
        "添加": "add",
        "导入": "import",
        "删除": "delete",
        "编辑": "edit",
        "设置": "set",
        "开始": "start",
        "打开": "open",
        "生成": "generate",
        "使用": "use",
        "选择": "select",
        "批量": "batch",
    }
    for src, dest in replacements.items():
        text = text.replace(src, f"-{dest}-")
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text or "screenshot"


def clean_title(value: str) -> str:
    text = value.strip().rstrip("？?")
    return text[2:] if text.startswith("如何") and len(text) > 2 else text


def action_aliases(title: str) -> list[str]:
    base = clean_title(title)
    aliases = {
        f"如何{base}？",
        f"怎么{base}？",
        f"{base}在哪里？",
        f"{base}入口在哪里？",
        f"{base}怎么操作？",
    }
    if "新建" in base:
        aliases.add(base.replace("新建", "创建"))
        aliases.add(base.replace("新建", "新增"))
    if "创建" in base:
        aliases.add(base.replace("创建", "新建"))
        aliases.add(base.replace("创建", "新增"))
    if "公告" in base and ("新建" in base or "发布" in base):
        aliases.update(["怎么发公告？", "如何发布公告？", "怎么发布课程公告？"])
    if "开始上课" in base:
        aliases.update(["怎么上课？", "如何创建课堂？", "学生怎么加入课堂？", "课堂码在哪里？"])
    if "生成PPT" in base:
        aliases.update(["怎么生成PPT？", "如何用AI生成PPT？"])
    if "AI助手" in base:
        aliases.update(["怎么创建AI助手？", "怎么添加AI助手？", "AI助手入口在哪里？"])
    return sorted(aliases)


def clean_ocr_text(value: str) -> str:
    text = value.replace("\ufeff", " ")
    text = re.sub(r"第\d+步截图文字：", "\n", text)
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"(?<=[\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])", "", text)
    text = re.sub(r"[\\/_<>|{}[\]^~`]+", " ", text)
    return re.sub(r"\s+", " ", text).strip()


def ocr_step_snippets(record: dict[str, Any]) -> list[str]:
    snippets: list[str] = []
    for image in record.get("images") or []:
        text = clean_ocr_text(str(image.get("ocrText") or ""))
        if not text:
            continue
        matches = re.findall(
            r"(?:点击|占击|单击|选择|输入|打开|返回|发布|创建|添加|确定|开始|上传|生成|查看|复制|保存|进入|勾选|填写|导入)[^。；;，,\n]{0,32}",
            text,
        )
        normalized_matches = []
        for match in matches:
            cleaned = (
                match.replace("占击", "点击")
                .replace("蝓入", "输入")
                .replace("囗", "")
                .replace("厶", "")
                .strip(" ；;，,。")
            )
            cleaned = re.sub(r"\s+", "", cleaned)
            if 3 <= len(cleaned) <= 38 and cleaned not in normalized_matches:
                normalized_matches.append(cleaned)
        if normalized_matches:
            snippet = "；".join(normalized_matches[:2])
            if snippet and snippet not in snippets:
                snippets.append(snippet)
    return snippets[:6]


def semantic_default_answer(path: str, base: str, image_count: int) -> dict[str, Any]:
    parts = [part.strip() for part in path.split(">")]
    leaf = parts[-1] if parts else base
    if path.startswith("AI工作台的功能 > 生成PPT"):
        mode = leaf.replace("生成PPT", "生成 PPT")
        return {
            "entry": "进入课程工作台，打开【AI工作台】或【教师备课助手】中的 PPT 生成入口。",
            "steps": [f"选择【{mode}】。", "按页面提示输入主题或粘贴大纲。", "选择参考资料或模板。", "点击生成并等待结果。"],
            "check": "页面生成 PPT 内容或出现可编辑、下载、继续生成的结果。",
            "risk": "生成后请检查内容准确性、模板适配性和课程适用性。",
        }
    if path.startswith("AI工作台的功能"):
        return {
            "entry": "进入课程工作台，打开【AI工作台】。",
            "steps": [f"找到并点击【{leaf}】。", "按页面提示上传材料、输入要求或选择生成方式。", "等待系统生成或识别结果。", "检查结果后复制、下载或保存。"],
            "check": "页面出现对应功能的处理结果或历史记录。",
            "risk": "AI 生成或识别结果需要教师复核后再用于教学。",
        }
    if path.startswith("如何在单元内添加资源 > 添加教学活动"):
        activity = leaf.replace("添加", "")
        return {
            "entry": "进入课程工作台，打开目标【单元】。",
            "steps": ["点击单元中的【+】添加入口。", "选择【教学活动】。", f"选择【{activity}】。", "按页面提示填写活动信息并保存或发布。"],
            "check": f"目标单元下出现新增的{activity}活动。",
            "risk": "发布前请核对班级、时间、对象和活动规则。",
        }
    if path.startswith("如何在单元内添加资源 > 添加教学资源"):
        resource_type = leaf.replace("添加", "")
        return {
            "entry": "进入课程工作台，打开目标【单元】。",
            "steps": ["点击单元中的【+】添加入口。", "选择【教学资源】。", f"选择【{resource_type}】。", "上传或选择资源后保存。"],
            "check": f"目标单元下出现新增的{resource_type}。",
            "risk": "如果资源需要转码或处理，请等待完成后再通知学生学习。",
        }
    if path.startswith("如何创建单元 > 导入课件生成单元"):
        return {
            "entry": "进入课程工作台的单元管理页面。",
            "steps": ["选择导入课件生成单元。", "选择要导入的课件。", "确认生成单元结构。", "检查生成后的单元内容并保存。"],
            "check": "单元列表中出现由课件生成的单元。",
            "risk": "生成后请检查章节和资源是否符合当前课程安排。",
        }
    if path.startswith("如何创建单元 > 添加单元"):
        return {
            "entry": "进入课程工作台的单元管理页面。",
            "steps": ["点击添加单元。", "填写单元名称。", "保存单元。", "按需要继续添加资源或活动。"],
            "check": "单元列表中出现新建单元。",
            "risk": "单元结构会影响学生学习路径，发布前请核对顺序。",
        }
    if path.startswith("如何设置教学团队 > 创建班级"):
        return {
            "entry": "进入课程的教学团队或班级管理页面。",
            "steps": ["点击创建班级。", "填写班级名称。", "保存班级。", "按需要继续添加学生或指定教师。"],
            "check": "班级列表中出现新班级。",
            "risk": "创建后请确认班级和授课教师关系正确。",
        }
    if path.startswith("如何设置教学团队 > 加入学生-学生扫码"):
        return {
            "entry": "进入课程的班级或学生管理页面。",
            "steps": ["打开目标班级的学生加入信息。", "找到班级二维码或课堂码。", "把二维码或编码发给学生。", "学生扫码后回到名单检查加入结果。"],
            "check": "班级成员列表中出现学生，人数同步增加。",
            "risk": "如果学生加入失败，请检查二维码是否有效、班级是否允许加入。",
        }
    if path.startswith("如何设置教学团队 > 加入学生-老师添加"):
        return {
            "entry": "进入课程的班级或学生管理页面。",
            "steps": ["选择目标班级。", "点击添加学生。", "搜索或选择要加入的学生。", "确认添加并检查名单。"],
            "check": "班级成员列表中出现新增学生。",
            "risk": "添加前请核对班级和学生身份，避免加错班级。",
        }
    if path.startswith("如何设置教学团队 > 指定教师"):
        return {
            "entry": "进入课程的教学团队或班级教师设置页面。",
            "steps": ["选择目标班级。", "点击指定教师或分配教师。", "选择授课教师。", "保存后检查教师负责班级。"],
            "check": "班级中显示指定教师，教学团队中显示对应负责关系。",
            "risk": "通常需要课程管理员权限才能调整教学团队和教师负责班级。",
        }
    if "课件" in base:
        return {
            "entry": "进入课程工作台的课件或资源管理页面。",
            "steps": [f"选择【{base}】相关入口。", "按页面提示选择课件、上传文件或填写名称。", "确认保存。", "返回列表检查结果。"],
            "check": "课件列表或课程内容中出现对应课件。",
            "risk": "发布或关联前请检查课件内容是否完整、适用于当前班级。",
        }
    return {
        "entry": f"参考截图教程路径：【{path}】。",
        "steps": [f"进入与【{leaf}】对应的页面。", f"按页面中的【{leaf}】入口或按钮继续操作。", "根据弹窗或表单提示填写信息并保存。"],
        "check": "完成后页面应进入截图中的结果状态或出现对应记录。",
        "risk": "涉及发布、删除、考试、学生范围或权限时，提交前先核对对象和影响范围。",
    }


def default_item(record: dict[str, Any]) -> dict[str, Any]:
    title = str(record.get("title") or record.get("question") or "").strip()
    question = str(record.get("question") or f"如何{clean_title(title)}？").strip()
    base = clean_title(question)
    path = str(record.get("path") or title)
    image_count = len(record.get("images") or [])
    guide = next((value for key, value in MANUAL_GUIDES.items() if key in title or key in question), None)
    if guide:
        answer = guide["answer"]
        category = guide["category"]
        summary = guide["summary"]
        keywords = list(guide["keywords"])
    else:
        category = str(record.get("category") or "screenshot")
        summary = f"根据截图教程《{path}》整理的操作入口和步骤。"
        keywords = []
        answer = semantic_default_answer(path, base, image_count)
    aliases = action_aliases(question)
    keywords.extend([base, path, title, question, *aliases])
    keywords.extend(ocr_step_snippets(record))
    keywords.extend(record.get("keywords") or [])
    return {
        "id": f"{record.get('id', 'screenshot')}-{slugify(path)}",
        "category": category,
        "question": question,
        "summary": summary,
        "keywords": sorted({str(item).strip() for item in keywords if str(item).strip()}),
        "answer": answer,
        "related": [],
        "audience": "uLearning teachers",
        "client": "Web",
        "source": "截图教程",
        "sourcePath": path,
    }


def main() -> None:
    faq_items = json.loads(FAQ_PATH.read_text(encoding="utf-8"))
    faq_items = [
        item
        for item in faq_items
        if not (str(item.get("id", "")).startswith("screenshot") and item.get("source") == "截图教程")
    ]
    records = [
        json.loads(line)
        for line in SCREENSHOT_KB_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    generated = [default_item(record) for record in records]
    existing_by_id = {item.get("id"): index for index, item in enumerate(faq_items)}
    added = 0
    updated = 0
    for item in generated:
        index = existing_by_id.get(item["id"])
        if index is None:
            faq_items.append(item)
            added += 1
        else:
            faq_items[index] = item
            updated += 1

    FAQ_PATH.write_text(json.dumps(faq_items, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    report = {
        "screenshotRecords": len(records),
        "generatedFaqItems": len(generated),
        "added": added,
        "updated": updated,
        "faqTotal": len(faq_items),
        "output": str(FAQ_PATH),
    }
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
