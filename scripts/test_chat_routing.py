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

    print("聊天分流测试通过：闲聊、通用问答、主动排障和平台教程互不串线。")


if __name__ == "__main__":
    main()
