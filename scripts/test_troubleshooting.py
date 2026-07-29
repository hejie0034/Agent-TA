from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402


CASES = {
    "为什么我的学生看不到作业？": "homework-not-visible",
    "学生找不到考试入口": "exam-not-visible",
    "发布后学生还是看不到课件": "courseware-not-visible",
    "上传的视频打不开": "resource-not-visible",
    "学生没有看到课程公告": "announcement-not-visible",
    "为什么我没有这个按钮？": "entry-or-button-missing",
    "学生看不到班课": "student-course-missing",
    "保存一直失败怎么办？": "general-operation-failure",
}

NON_TROUBLESHOOTING_CASES = (
    "如何布置个人作业？",
    "如何安排考试？",
    "如何创建课程？",
)


def main() -> None:
    for question, expected_id in CASES.items():
        result = web_agent.answer_question(question)
        assert result.get("intent") == "troubleshooting", (question, result)
        assert result.get("diagnosticId") == expected_id, (question, result)
        answer = str(result.get("answer") or "")
        assert "请依次确认：" in answer, (question, answer)
        assert "1、" in answer and "下一步：" in answer, (question, answer)

    for question in NON_TROUBLESHOOTING_CASES:
        result = web_agent.answer_question(question)
        assert result.get("intent") != "troubleshooting", (question, result)

    print(
        f"主动排障测试通过：{len(CASES)} 个故障问题，"
        f"{len(NON_TROUBLESHOOTING_CASES)} 个普通操作问题。"
    )


if __name__ == "__main__":
    main()
