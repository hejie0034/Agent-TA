from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402


SOURCE = ROOT / "manual_2026_guides.json"
OUTPUT = ROOT / "manual_2026_translations_en.json"
BATCH_SIZE = 6


def parse_json(value: str) -> list[dict]:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", value.strip(), flags=re.I)
    data = json.loads(cleaned)
    if not isinstance(data, list):
        raise ValueError("Expected a JSON array")
    return data


def main() -> None:
    web_agent.load_env_file(web_agent.ENV_PATH)
    guides = json.loads(SOURCE.read_text(encoding="utf-8"))
    translations: dict[str, dict] = {}
    for start in range(0, len(guides), BATCH_SIZE):
        batch = guides[start : start + BATCH_SIZE]
        source = [
            {
                "id": guide["id"], "question": guide["question"], "title": guide["title"],
                "steps": [step["text"] for step in guide["steps"]],
            }
            for guide in batch
        ]
        response = web_agent.deepseek_translate(
            json.dumps(source, ensure_ascii=False),
            "English",
            (
                "Return valid JSON only. Preserve every id and the exact number and order of steps. "
                "Translate every question, title, and step into concrete, action-oriented teacher help text. "
                "Translate Chinese UI labels inside brackets; never use generic phrases such as "
                "follow the screenshot or complete the corresponding setting."
            ),
        )
        translated = {str(item.get("id")): item for item in parse_json(response)}
        for guide in batch:
            item = translated.get(guide["id"])
            if not item or len(item.get("steps") or []) != len(guide["steps"]):
                raise ValueError(f"Invalid translation for {guide['id']}")
            translations[guide["id"]] = {
                "question": str(item.get("question") or "").strip(),
                "title": str(item.get("title") or "").strip(),
                "steps": [str(step).strip() for step in item["steps"]],
            }
        print(f"Translated {min(start + BATCH_SIZE, len(guides))}/{len(guides)}")
    OUTPUT.write_text(json.dumps(translations, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Saved {len(translations)} translations")


if __name__ == "__main__":
    main()
