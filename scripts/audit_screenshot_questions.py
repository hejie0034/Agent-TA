from __future__ import annotations

import json
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402
SCREENSHOT_KB_PATH = ROOT / "切片读取知识库" / "screenshot_tutorial_kb.jsonl"
REPORT_PATH = ROOT / "切片读取知识库" / "screenshot_question_audit.json"


def main() -> None:
    web_agent.call_deepseek_rewrite = lambda _q, items, _related=None: "\n\n".join(  # type: ignore[assignment]
        web_agent.format_faq_answer(item) for item in items
    )
    records = [
        json.loads(line)
        for line in SCREENSHOT_KB_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    results = []
    failures = []
    for record in records:
        question = str(record.get("question") or "").strip()
        expected_path = str(record.get("path") or "").strip()
        response = web_agent.answer_question(question)
        matches = response.get("matches") or []
        first = matches[0] if matches else {}
        first_text = " ".join(
            str(first.get(key) or "")
            for key in ["id", "question", "source"]
        )
        answer = str(response.get("answer") or "")
        ok = bool(response.get("matched")) and (
            "截图教程" in first_text
            or expected_path in first_text
            or expected_path in answer
        )
        row = {
            "question": question,
            "expectedPath": expected_path,
            "ok": ok,
            "topMatch": first,
            "matchCount": len(matches),
            "answerPreview": answer[:240],
        }
        results.append(row)
        if not ok:
            failures.append(row)
    report = {
        "total": len(results),
        "passed": len(results) - len(failures),
        "failed": len(failures),
        "failures": failures,
        "results": results,
    }
    REPORT_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: report[k] for k in ["total", "passed", "failed"]}, ensure_ascii=False))


if __name__ == "__main__":
    main()
