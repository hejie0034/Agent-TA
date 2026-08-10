from __future__ import annotations

import argparse
import hashlib
import json
import re
from pathlib import Path
from typing import Any

from docx import Document
from docx.oxml.ns import qn
from PIL import Image


ROOT = Path(__file__).resolve().parents[1]
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp", ".gif"}
SKIP_HEADINGS = {
    "序 言", "【获取技术支持】", "【登录系统】", "（一）课前准备：创建课件内容",
    "（三）课程运行：在线教学", "（九）常见问题", "常见问题", "课程运行：课堂互动",
}
# These already have complete, hand-authored screenshot tutorials. The manual is
# still used as text knowledge, but does not create a competing visual answer.
EXISTING_VISUALS = {
    ("ULMS", "1.1 创建课件"), ("ULMS", "1. 创建课程"),
    ("ULMS", "设置教学团队与班级"), ("ULMS", "创建单元"),
    ("ULMS", "导入课件"),
}
QUESTION_OVERRIDES = {
    "1.2 设置章节目录": "如何设置课件章节目录？",
    "1.3.1 添加课件资源": "如何添加课件资源？",
    "1.3.2 添加课件试题": "如何添加课件试题？",
    "1.3.3 编辑课件": "如何编辑课件内容？",
    "1.3.4 添加内容组件": "如何在课件中添加内容组件？",
    "1.4 设置试听章节": "如何设置课件试听章节？",
    "1.5 预览课件": "如何预览课件？",
    "1.6 设置协同编辑": "如何设置课件协同编辑？",
    "2.1 基本信息": "如何完善课件基本信息？",
    "2.2 详细介绍": "如何完善课件详细介绍？",
    "2.3 团队成员": "如何设置课件门户团队成员？",
    "2.4 门户设置": "如何设置课件门户背景？",
    "课件发布与更新": "如何发布或更新课件？",
    "学生管理与分组": "如何管理学生并进行分组？",
    "3.1 设置学习计划": "如何设置学习计划？",
    "3.2 查看进度成绩": "如何查看课件进度成绩？",
    "发布资源": "如何在课程中发布资源？",
    "发布公告": "如何发布课程公告？",
    "布置作业": "如何布置课程作业？",
    "6.1 个人作业": "如何布置个人作业？",
    "6.2 小组作业": "如何布置小组作业？",
    "6.3 测验": "如何发布课程测验？",
    "6.4 批阅作业": "如何批阅课程作业？",
    "发布讨论": "如何发布课程讨论？",
    "1. 题库": "如何建设考试题库？",
    "2. 试卷库": "如何创建和管理考试试卷？",
    "3. 发布考试": "如何发布考试？",
    "4. 考试管理": "如何管理已发布的考试？",
    "4.1 查看考试信息": "如何查看和修改考试信息？",
    "4.2 场次安排": "如何安排考试场次？",
    "4.3 考场安排": "如何安排考试考场？",
    "4.4 阅卷安排": "如何安排考试阅卷？",
    "4.5 人脸认证照片审核": "如何审核考试人脸认证照片？",
    "4.6 考试备用验证码": "如何使用考试备用验证码？",
    "4.7 考试监控": "如何进行考试监控？",
    "4.8 考试签到": "如何设置考试签到？",
    "5.1 逐份批阅": "如何逐份批阅试卷？",
    "5.2 批量批阅": "如何批量批阅试卷？",
    "5.3 重新评分": "如何对考试重新评分？",
    "6. 成绩分析": "如何查看考试成绩分析？",
    "1. 设置课程考核规则": "如何设置课程考核规则？",
    "2. 发放课程证书": "如何发放课程证书？",
    "3. 查看课程分析数据": "如何查看课程分析数据？",
    "（七）结课与再次开课": "如何结束课程或再次开课？",
    "（八）移动教学": "如何使用优学院移动教学？",
    "创建课堂": "如何从 ULMS 课程进入 Uclass 并创建课堂？",
    "上课和下课": "如何在 Uclass 上课和下课？",
    "学生扫码进入课堂": "如何让学生扫码进入 Uclass 课堂？",
    "4. 演示课件": "如何在 Uclass 课堂演示课件？",
    "发布课堂活动": "如何在 Uclass 发布课堂互动活动？",
}
PROCEDURE_OVERRIDES = {
    "1.3.3 编辑课件": [
        "进入【课件库】，打开目标课件并点击【编辑课件内容】。",
        "在章节页面使用富文本编辑栏，或添加视频、音频、文档、练习等内容组件。",
        "保存当前页面，使用【预览】检查内容、顺序和显示效果。",
    ],
    "2.1 基本信息": [
        "进入目标课件的【基本信息】页面。",
        "填写课程名称、分类等信息，带星号的项目必须完整填写。",
        "点击保存；如果无法保存，逐项检查是否仍有必填项为空。",
    ],
    "2.2 详细介绍": [
        "进入目标课件的【详细介绍】页面。",
        "填写内容介绍和教学大纲，并按需上传课程精彩片段及出版信息。",
        "保存后重新进入页面，确认介绍、附件和出版信息显示完整。",
    ],
    "2.3 团队成员": [
        "进入目标课件门户的【团队成员】页面。",
        "填写教师姓名、所在院校和简介，上传头像；需要多人展示时点击添加教师。",
        "保存后检查教师顺序、头像和简介是否正确显示。",
    ],
    "2.4 门户设置": [
        "进入目标课件门户的【门户设置】页面。",
        "选择符合课程展示要求的门户背景图并查看预览。",
        "保存设置，返回课件门户确认背景图没有拉伸或遮挡文字。",
    ],
    "4.1 查看考试信息": [
        "进入课程【考试】，选择目标考试并点击【查看成绩】。",
        "打开【考试信息】，核对考试设置和已启用的试卷；需要时点击修改考试。",
        "保存修改后返回考试列表，确认考试时间和状态正确。",
    ],
    "4.2 场次安排": [
        "进入目标考试的【考务管理】，打开【场次安排】。",
        "添加或选择考试场次，设置考试时间、参与班级或学生。",
        "保存后检查场次列表；考试进行中如需调整，使用延时或提前收卷功能。",
    ],
    "4.4 阅卷安排": [
        "进入目标考试的【考务管理】，打开【阅卷安排】。",
        "选择参与阅卷的教师，并设置是否将待阅试卷平均分配。",
        "保存安排并检查每位教师的阅卷任务和完成状态。",
    ],
    "4.6 考试备用验证码": [
        "进入目标考试的管理页面，找到【考试备用验证码】。",
        "将验证码提供给无法通过正常验证的考生，或提供给经授权的非课程团队监考教师。",
        "使用前核对考试场次和人员身份，验证码不要发送给无关人员。",
    ],
    "4.8 考试签到": [
        "发布考试并开启需要现场签到的考试场次。",
        "在教师 APP 的考试监控页面打开并出示签到二维码。",
        "让学生到场扫码签到，并在监控页面核对签到状态后再开始考试。",
    ],
    "学生扫码进入课堂": [
        "先在 Uclass 课堂中点击【上课】，确保课堂已经开始。",
        "点击【课堂码】打开当前课堂二维码。",
        "让学生使用微信或优学院 APP 扫码，并在课堂成员列表核对进入状态。",
    ],
}
IMAGE_STEP_OVERRIDES = {
    "1.3.4 添加内容组件": [
        "在课件编辑区点击【视频】组件，打开视频添加窗口。",
        "选择从课件资源、个人资源库引用视频，或从电脑本地上传视频。",
        "选中已插入的视频，按需添加注释、在线剪辑或替换视频。",
        "在课件编辑区点击【音频】组件，打开音频添加窗口。",
        "选择已有音频资源，或点击本地上传并等待文件处理完成。",
        "选中音频组件，设置播放方式并检查音频是否可以正常播放。",
        "在课件编辑区点击【文档】组件，打开文档添加窗口。",
        "选择已有文档或上传本地文件，确认后将文档插入当前页面。",
        "点击【练习】组件，从课件试题中选择需要插入的题目。",
        "需要新题时点击【添加新题】，选择题型并完整填写题干和答案。",
        "设置练习题的作答、答案显示和反馈方式，然后保存练习。",
        "点击【音频文字】组件，进入音频与文本同步编辑页面。",
        "上传或选择音频，并录入与音频对应的文本内容。",
        "调整文本与音频的对应关系，试听无误后保存组件。",
        "点击【口语评分】组件，进入口语练习设置页面。",
        "阅读使用说明，准备朗读文本和评分所需的音频设置。",
        "填写朗读内容与评分参数，保存后预览口语评分组件。",
    ],
    "课件发布与更新": [
        "完成课件内容、基本信息和门户信息后，返回课件首页点击【发布】。",
        "填写开课院校，选择发布到本校课程网站或优学院网站。",
        "设置课程是否在网站显示，核对发布范围后确认发布。",
        "课件内容有修改时重新进入编辑页，完成修改并保存。",
        "点击【更新】使新版本生效，并返回门户检查显示内容。",
    ],
    "学生管理与分组": [
        "进入【成员】>【班级管理】，选择需要学生加入的班级。",
        "打开班级二维码并分享给学生，学生使用优学院 APP 扫码加入。",
        "也可以复制班级编码，让学生在平台或 APP 中输入编码加入。",
        "需要教师添加时点击【添加学生】，搜索并勾选学生后保存。",
        "需要批量添加时下载导入模板，按模板填写学生信息。",
        "上传填写完成的模板，处理导入提示并核对学生名单。",
        "进入班级的【分组管理】，点击创建新的学生分组。",
        "填写组名并将学生分配到对应小组，检查是否有人遗漏。",
        "保存分组，返回分组列表确认人数和成员关系正确。",
    ],
    "发布教学活动": [
        "进入课程【单元】，在目标单元中点击添加教学活动。",
        "选择课件、资源、公告、作业、讨论、直播、课堂或考试类型。",
        "完成活动内容、参与班级、开放时间等必填设置。",
        "发布后返回单元，确认活动已显示在正确位置和对应模块。",
    ],
    "发布资源": [
        "进入课程【资源】，选择从资源库引用或直接上传资源。",
        "从资源库引用时先打开【资源库】，勾选需要发布的文件。",
        "本校或共享资源需先复制到【我的资源】，再选择发布。",
        "直接上传时选择本地文件，等待上传和文件处理完成。",
        "填写资源名称，选择参与班级并设置开放时间。",
        "点击发布，返回资源列表检查学生端可见状态。",
    ],
    "发布公告": [
        "进入课程【公告】，点击【发布新公告】。",
        "填写公告名称和正文，按需添加供学生下载的附件。",
        "选择接收公告的班级，并核对发布时间或开放状态。",
        "点击发布，返回公告列表确认公告状态和参与班级正确。",
    ],
    "6.1 个人作业": [
        "进入课程【作业】，选择【个人作业】并填写标题和作业要求。",
        "添加附件或录音，设置评分方式、满分和学生提交方式。",
        "选择参与班级与起止时间，核对后发布个人作业。",
    ],
    "6.3 测验": [
        "进入课程【作业】，选择【测验】，再从个人、本校或共享题库选题。",
        "设置测验时间、参与班级、提交次数和答案公布时间。",
        "检查题目、分值和总分无误后发布测验。",
    ],
    "1. 题库": [
        "进入课程【考试】>【试题库】，先创建文件夹整理试题分类。",
        "选择目标文件夹，点击【添加新题】开始手动录题。",
        "选择题型，填写题干、选项、正确答案、解析和分值。",
        "保存题目并返回题库，检查题型、答案和所属文件夹。",
        "需要批量录题时点击模板导入并下载标准 Excel 模板。",
        "按模板要求填写题目、答案和解析，不要修改表头结构。",
        "上传模板，查看导入校验结果并修正失败行。",
        "也可选择文本批量导入，打开系统提供的文本格式说明。",
        "按规定格式粘贴多道试题文本并执行格式识别。",
        "逐题检查识别后的题型、选项和正确答案。",
        "确认无误后批量保存到指定题库文件夹。",
        "需要使用本校或共享试题时，进入对应题库搜索题目。",
        "勾选所需试题并复制到【我的题库】后再编辑使用。",
        "完成后按文件夹筛选题目，抽查题干、答案和分值。",
    ],
    "2. 试卷库": [
        "进入【考试】>【试卷库】>【我的试卷】，点击【添加试卷】。",
        "选择手动组卷时填写试卷名称和基本信息。",
        "按题型或试卷结构添加大题，并设置每部分分值。",
        "从题库选择试题加入试卷，核对题目顺序和总分。",
        "保存手动组卷结果，并使用预览检查试卷内容。",
        "选择自动组卷时设置题型、题量、难度和知识点范围。",
        "生成试卷后检查随机选出的题目，必要时替换题目。",
        "确认结构和总分后保存自动组卷结果。",
        "需要随机组卷时设置统一的试卷结构和抽题规则。",
        "检查每个随机题组的题库范围、数量和分值。",
        "保存试卷，并返回【我的试卷】确认状态可用于发布考试。",
    ],
    "4.3 考场安排": [
        "进入目标考试的【考务管理】>【考场安排】。",
        "点击添加考场，填写考场名称、座位数和考场类型。",
        "按考试场次选择考场，并将考生分配到对应考场。",
        "保存编排结果，检查考场容量、考生人数和监考信息。",
    ],
    "4.5 人脸认证照片审核": [
        "进入课程【考试】，选择目标考试并点击【查看成绩】。",
        "打开【人脸照片审核】，筛选待审核学生。",
        "选择学生并查看其提交的认证照片。",
        "将认证照片与学生本人信息进行核对。",
        "照片符合要求时选择【审核通过】。",
        "照片不清晰或不符合要求时选择驳回，并提示学生重新上传。",
        "需要教师统一准备照片时下载批量上传模板。",
        "按模板规则整理学生照片并执行批量上传。",
        "返回审核列表，确认所有参考学生均已有有效认证照片。",
    ],
    "4.7 考试监控": [
        "进入目标考试，打开对应场次的【考试监控台】。",
        "按未进入、正在答题、已交卷等状态筛选考生。",
        "查看考生设备、抓拍照片和异常提示，定位异常学生。",
        "根据实际情况执行提醒、延时或其他考务处理。",
        "考试结束后核对交卷状态并导出或保存监控记录。",
    ],
    "2. 发放课程证书": [
        "进入课程【考核】>【证书管理】，打开证书设置。",
        "分别设置合格证书和优秀证书对应的课程考核成绩标准。",
        "从证书模板中选择适用模板并查看预览。",
        "需要自定义时点击新建模板，编辑证书展示内容。",
        "保存模板并核对姓名、课程名、日期等字段位置。",
        "启用证书设置，确认符合成绩条件的学生可以获得证书。",
    ],
    "（七）结课与再次开课": [
        "进入目标课程的管理菜单，确认所有教学活动和成绩处理已经完成。",
        "点击【结束课程】并确认；结束后课程只能查看，不能继续修改。",
        "需要新学期复用时，在已结束课程上选择【再次开课】。",
        "核对复制的课件、资源、作业、讨论和考试，调整班级与时间后再发布。",
    ],
}


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value).strip()


def clean_heading(value: str) -> str:
    return re.sub(r"^\d+(?:\.\d+)*[.、\s]*", "", value).strip()


def heading_level(style_name: str) -> int | None:
    match = re.search(r"(\d+)$", style_name)
    return int(match.group(1)) if match and style_name.startswith(("Heading", "标题")) else None


def image_rel_ids(paragraph: Any) -> list[str]:
    ids: list[str] = []
    for element in paragraph._p.iter():
        if element.tag == qn("a:blip"):
            rel_id = element.get(qn("r:embed"))
            if rel_id:
                ids.append(rel_id)
    return ids


def extract_sections(system: str, path: Path) -> list[dict[str, Any]]:
    document = Document(str(path))
    sections: list[dict[str, Any]] = []
    current: dict[str, Any] | None = None
    stack: dict[int, str] = {}
    pending_text: list[str] = []
    for index, paragraph in enumerate(document.paragraphs):
        text = clean(paragraph.text)
        level = heading_level(paragraph.style.name)
        if level is not None and text:
            stack = {key: value for key, value in stack.items() if key < level}
            stack[level] = text
            current = {
                "system": system, "heading": text, "level": level,
                "path": [stack[key] for key in sorted(stack)], "paragraphs": [], "images": [],
            }
            sections.append(current)
            pending_text = []
            continue
        if current is None:
            continue
        if text:
            current["paragraphs"].append(text)
            pending_text.append(text)
        for rel_id in image_rel_ids(paragraph):
            part = document.part.related_parts.get(rel_id)
            if part is None:
                continue
            suffix = Path(str(part.partname)).suffix.lower()
            if suffix not in IMAGE_EXTENSIONS:
                suffix = ".png"
            caption = next((item for item in reversed(pending_text) if 1 < len(item) <= 80), "")
            current["images"].append({"blob": part.blob, "suffix": suffix, "caption": caption, "index": index})
            pending_text = []
    return sections


def navigation_steps(paragraphs: list[str]) -> list[str]:
    for paragraph in paragraphs:
        if "步骤" not in paragraph or ">" not in paragraph:
            continue
        raw = paragraph.split("：", 1)[-1]
        tokens = [clean(token).strip("【】") for token in raw.split(">") if clean(token)]
        steps: list[str] = []
        for index, token in enumerate(tokens):
            if index == 0:
                steps.append(f"进入【{token}】模块。")
            elif index == len(tokens) - 1:
                steps.append(f"完成【{token}】页面的必填设置，核对对象和时间后保存。")
            else:
                steps.append(f"点击【{token}】，进入下一步设置。")
        if steps:
            return steps
    return []


def useful_caption(caption: str, heading: str) -> str:
    caption = clean(caption).strip("。；;：:")
    if not caption or caption == heading or caption.startswith(("说明", "注：", "步骤：")):
        return ""
    if len(caption) > 24 or any(mark in caption for mark in ("，", "。", "；", "：")):
        return ""
    return caption


def procedure_steps(section: dict[str, Any]) -> list[str]:
    if section["heading"] in PROCEDURE_OVERRIDES:
        return PROCEDURE_OVERRIDES[section["heading"]]
    nav = navigation_steps(section["paragraphs"])
    heading = clean_heading(section["heading"])
    if len(nav) >= 3:
        return nav
    first_detail = next(
        (clean(text) for text in section["paragraphs"] if 8 <= len(clean(text)) <= 90 and not text.startswith(("说明", "注：", "步骤："))),
        "按页面要求填写必填项并完成设置",
    )
    result = [f"进入【{heading}】页面，先确认当前操作的课程、班级或考试对象。"]
    result.extend(nav[1:] if len(nav) > 1 else [first_detail.rstrip("。") + "。"]) 
    result.append(f"保存【{heading}】设置，返回列表确认状态和显示结果已经更新。")
    return result[:3]


def fit_steps_to_images(steps: list[str], image_count: int) -> list[str]:
    """Keep one carousel page per source screenshot without losing instructions."""
    if image_count <= 0:
        return []
    if len(steps) <= image_count:
        return steps
    fitted: list[str] = []
    for image_index in range(image_count):
        start = round(image_index * len(steps) / image_count)
        end = round((image_index + 1) * len(steps) / image_count)
        group = [step.strip().rstrip("。") for step in steps[start:end] if step.strip()]
        fitted.append("；".join(group) + "。")
    return fitted


def build_image_steps(section: dict[str, Any]) -> list[str]:
    if section["heading"] in IMAGE_STEP_OVERRIDES:
        return IMAGE_STEP_OVERRIDES[section["heading"]]
    heading = clean_heading(section["heading"])
    nav = navigation_steps(section["paragraphs"])
    result: list[str] = []
    for index, image in enumerate(section["images"]):
        caption = useful_caption(image["caption"], section["heading"])
        if index < len(nav):
            text = nav[index]
        elif caption:
            if any(word in caption for word in ("保存", "发布", "确定", "完成")):
                text = f"按页面提示{caption}，提交前再次核对操作对象和范围。"
            else:
                text = f"进入【{caption}】页面，按页面字段完成对应设置。"
        elif index == 0:
            text = f"进入【{heading}】页面，确认当前课程、班级或考试对象正确。"
        elif index == len(section["images"]) - 1:
            text = f"完成【{heading}】设置后保存，并返回列表检查状态是否已更新。"
        else:
            text = f"继续完成【{heading}】页面中的第 {index + 1} 项设置，并核对必填项。"
        result.append(text)
    return result


def english_step(step: str) -> str:
    labels = re.findall(r"【([^】]+)】", step)
    target = " / ".join(labels) if labels else "the current page"
    if "进入" in step:
        return f"Open {target} and verify that the selected course, class, or exam is correct."
    if "点击" in step:
        return f"Click {target} to continue to the next settings page."
    if any(word in step for word in ("保存", "发布", "提交")):
        return f"Complete the required settings in {target}, verify the scope and time, and save the changes."
    return f"Complete the required fields in {target} and check that no required item is missing."


def make_question(heading: str) -> str:
    if heading in QUESTION_OVERRIDES:
        return QUESTION_OVERRIDES[heading]
    title = clean_heading(heading)
    return title if title.startswith("如何") else f"如何{title}？"


def make_id(system: str, heading: str) -> str:
    digest = hashlib.sha1(f"{system}:{heading}".encode("utf-8")).hexdigest()[:10]
    return f"manual-2026-{system.lower()}-{digest}"


def pad_images_to_common_canvas(paths: list[Path]) -> None:
    if not paths:
        return
    sizes: list[tuple[int, int]] = []
    for path in paths:
        with Image.open(path) as image:
            sizes.append(image.size)
    max_width = max(width for width, _ in sizes)
    max_height = max(height for _, height in sizes)
    # Use a stable 2:1 tutorial canvas so every screenshot keeps the larger,
    # taller presentation requested by the UI. Original pixels are never scaled;
    # missing space is filled with white around the centered screenshot.
    canvas_width = max(max_width, max_height * 2)
    canvas_height = max(max_height, (canvas_width + 1) // 2)
    for path, size in zip(paths, sizes):
        if size == (canvas_width, canvas_height):
            continue
        with Image.open(path) as source:
            image = source.convert("RGBA")
            scale = min(canvas_width / image.width, canvas_height / image.height)
            target_width = max(1, round(image.width * scale))
            target_height = max(1, round(image.height * scale))
            if (target_width, target_height) != image.size:
                image = image.resize((target_width, target_height), Image.Resampling.LANCZOS)
            canvas = Image.new("RGBA", (canvas_width, canvas_height), (255, 255, 255, 255))
            left = (canvas_width - image.width) // 2
            top = (canvas_height - image.height) // 2
            canvas.alpha_composite(image, (left, top))
            if path.suffix.lower() in {".jpg", ".jpeg"}:
                canvas.convert("RGB").save(path, quality=95)
            else:
                canvas.save(path)


def question_key(value: str) -> str:
    value = value.lower().replace("快速", "")
    return re.sub(r"[^a-z0-9\u4e00-\u9fff]", "", value).replace("如何", "")


def build_outputs(sections: list[dict[str, Any]], image_root: Path) -> tuple[list[dict[str, Any]], list[dict[str, Any]]]:
    faq: list[dict[str, Any]] = []
    guides: list[dict[str, Any]] = []
    seen_questions: set[str] = set()
    try:
        existing_faq = json.loads((ROOT / "ulearning_teacher_faq.json").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        existing_faq = []
    existing_question_keys = {
        question_key(str(item.get("question") or ""))
        for item in existing_faq
        if isinstance(item, dict)
    }
    try:
        english_translations = json.loads((ROOT / "manual_2026_translations_en.json").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        english_translations = {}
    for section in sections:
        heading = section["heading"]
        if heading in SKIP_HEADINGS or not section["paragraphs"]:
            continue
        question = make_question(heading)
        if question in seen_questions:
            continue
        seen_questions.add(question)
        nav = navigation_steps(section["paragraphs"])
        image_steps = build_image_steps(section) if section["images"] else []
        answer_steps = nav or list(dict.fromkeys(image_steps))
        if not answer_steps:
            answer_steps = [clean(text) for text in section["paragraphs"][:4] if clean(text)]
        if len(answer_steps) < 3:
            answer_steps = procedure_steps(section)
        source_label = f"{section['system']} 教师用户手册（2026）"
        if question_key(question) not in existing_question_keys:
            faq.append({
                "id": make_id(section["system"], heading), "category": section["system"].lower(),
                "question": question,
                "summary": clean(" ".join(section["paragraphs"]))[:500],
                "keywords": list(dict.fromkeys([clean_heading(heading), section["system"], *section["path"]])),
                "answer": {
                    "entry": " > ".join(section["path"]), "steps": answer_steps,
                    "check": f"返回【{clean_heading(heading)}】相关页面，确认保存、发布或状态变化已经生效。",
                    "risk": "涉及发布范围、班级、时间、成绩、删除或考试设置时，提交前再次核对影响对象。",
                },
                "related": [], "audience": "uLearning teachers", "client": section["system"],
                "source": source_label,
            })
        if not section["images"] or (section["system"], heading) in EXISTING_VISUALS:
            continue
        folder = image_root / section["system"] / clean_heading(heading)
        folder.mkdir(parents=True, exist_ok=True)
        # This directory is generated from the current manual section. Clear
        # stale generated slides first so a guide with two source screenshots
        # cannot retain step3/step4 files from an earlier import.
        for old_image in folder.glob("step*.*"):
            if old_image.is_file() and old_image.suffix.lower() in IMAGE_EXTENSIONS:
                old_image.unlink()
        if len(image_steps) < 3:
            image_steps = procedure_steps(section)
        image_steps = fit_steps_to_images(image_steps, len(section["images"]))
        guide_steps = []
        guide_image_paths: list[Path] = []
        for index, (image, text) in enumerate(zip(section["images"], image_steps), start=1):
            destination = folder / f"step{index}{image['suffix']}"
            destination.write_bytes(image["blob"])
            guide_image_paths.append(destination)
            guide_steps.append({
                "label": f"Step {index}", "text": text, "textEn": english_step(text),
                "src": destination.relative_to(ROOT).as_posix(),
            })
        pad_images_to_common_canvas(guide_image_paths)
        guide_id = make_id(section["system"], heading) + "-guide"
        translated = english_translations.get(guide_id) if isinstance(english_translations, dict) else None
        translated_steps = translated.get("steps") if isinstance(translated, dict) else None
        if isinstance(translated_steps, list) and len(translated_steps) == len(guide_steps):
            for step, translated_text in zip(guide_steps, translated_steps):
                step["textEn"] = str(translated_text).strip()
        guides.append({
            "id": guide_id, "title": f"{section['system']} - {clean_heading(heading)}",
            "titleEn": (
                str(translated.get("title") or "").strip()
                if isinstance(translated, dict)
                else f"{section['system']} teacher guide"
            ),
            "question": question,
            "questionEn": (
                str(translated.get("question") or "").strip()
                if isinstance(translated, dict)
                else ""
            ),
            "aliases": list(dict.fromkeys([
                question,
                str(translated.get("question") or "").strip() if isinstance(translated, dict) else "",
                clean_heading(heading),
                *section["path"],
            ])),
            "path": f"2026 教师用户手册 > {section['system']} > {clean_heading(heading)}",
            "steps": guide_steps, "source": source_label,
        })
    return faq, guides


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--ulms", type=Path, required=True)
    parser.add_argument("--uclass", type=Path, required=True)
    parser.add_argument("--faq-output", type=Path, default=ROOT / "manual_2026_faq.json")
    parser.add_argument("--guide-output", type=Path, default=ROOT / "manual_2026_guides.json")
    parser.add_argument("--image-root", type=Path, default=ROOT / "截图教程" / "2026用户手册")
    args = parser.parse_args()
    sections = extract_sections("ULMS", args.ulms) + extract_sections("Uclass", args.uclass)
    faq, guides = build_outputs(sections, args.image_root)
    args.faq_output.write_text(json.dumps(faq, ensure_ascii=False, indent=2), encoding="utf-8")
    args.guide_output.write_text(json.dumps(guides, ensure_ascii=False, indent=2), encoding="utf-8")
    report = {
        "faqCount": len(faq), "guideCount": len(guides),
        "imageCount": sum(len(guide["steps"]) for guide in guides),
        "systems": {system: sum(1 for item in faq if item["client"] == system) for system in ("ULMS", "Uclass")},
    }
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
