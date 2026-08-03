from __future__ import annotations

import sys
from pathlib import Path
from unittest.mock import patch


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402


def main() -> None:
    assert web_agent.get_troubleshooting_rule("为什么不回答我") is None
    assert web_agent.get_troubleshooting_rule("为什么学生看不到作业")["id"] == "homework-not-visible"
    assert web_agent.get_troubleshooting_rule("考试打不开")["id"] == "exam-not-visible"

    mock_answer = (
        "我在的。刚才可能误解了你的意思，现在可以继续聊。"
        f"\n\n{web_agent.GENERAL_CHAT_SUFFIX}"
    )
    with patch.object(web_agent, "call_deepseek_general_chat", return_value=mock_answer):
        result = web_agent.answer_question("为什么不回答我")
        assert result.get("intent") == "general_chat", result
        assert result.get("modelUsed") is True, result
        assert web_agent.GENERAL_CHAT_SUFFIX in result.get("answer", ""), result

        greeting = web_agent.answer_question("你好呀")
        assert greeting.get("intent") == "small_talk", greeting
        assert greeting.get("modelUsed") is True, greeting

    with patch.object(
        web_agent,
        "call_deepseek_general_chat",
        side_effect=RuntimeError("offline"),
    ):
        fallback = web_agent.answer_question("为什么不回答我")
        assert fallback.get("intent") == "general_chat", fallback
        assert fallback.get("modelUsed") is False, fallback
        assert web_agent.GENERAL_CHAT_SUFFIX in fallback.get("answer", ""), fallback

    platform = web_agent.answer_question("如何创建课程？")
    assert platform.get("intent") not in {"general_chat", "small_talk"}, platform

    for variant in [
        "如何快速创建一门课程？",
        "怎么直接创建一个课程？",
        "怎样立即新建一门课程？",
    ]:
        result = web_agent.answer_question(variant)
        assert result.get("intent") not in {"prompt_guide", "general_chat", "small_talk"}, (variant, result)
        assert result["matches"][0]["id"] == platform["matches"][0]["id"], (variant, result)
        assert result["answer"] == platform["answer"], (variant, result)

    courseware = web_agent.answer_question("如何新建课件？")
    courseware_intent = web_agent.canonical_intent_text("如何新建课件？")
    assert all(
        web_agent.canonical_intent_text(item["question"]) != courseware_intent
        for item in courseware.get("relatedQuestions", [])
    ), courseware

    def fake_translate(text: str, target_language: str, purpose: str = "") -> str:
        if target_language == "Simplified Chinese":
            return "如何创建课程？"
        if "follow-up" in purpose:
            return "How do I set up a teaching team?"
        return "Entry: Click Create Course on the teacher home page.\n\nSteps:\n1. Enter a course name.\n2. Select a cover image.\n3. Confirm creation."

    with patch.object(web_agent, "deepseek_translate", side_effect=fake_translate):
        english = web_agent.answer_question_localized(
            "How can I quickly create a course?",
            "en",
        )
        assert english.get("language") == "en", english
        assert english.get("resolvedQuestion") == "如何创建课程？", english
        assert english.get("matches", [{}])[0].get("id") == platform["matches"][0]["id"], english
        assert "Steps:" in english.get("answer", ""), english

    print("聊天分流测试通过：闲聊、通用问答、主动排障和平台教程互不串线。")


if __name__ == "__main__":
    main()
