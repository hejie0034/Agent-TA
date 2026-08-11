from __future__ import annotations

import json
import re
import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402


OUTPUT_PATH = ROOT / "screenshot_guide_translations_en.json"
BATCH_SIZE = 8


def parse_json_response(value: str) -> list[dict]:
    cleaned = re.sub(r"^```(?:json)?\s*|\s*```$", "", value.strip(), flags=re.I)
    result = json.loads(cleaned)
    if not isinstance(result, list):
        raise ValueError("Translation response must be a JSON array")
    return result


def main() -> None:
    web_agent.load_env_file(web_agent.ENV_PATH)
    guides = web_agent.build_screenshot_guides()
    translations: dict[str, dict] = {}

    for start in range(0, len(guides), BATCH_SIZE):
        batch = guides[start : start + BATCH_SIZE]
        source = [
            {
                "id": guide["id"],
                "title": guide["title"],
                "steps": [step["text"] for step in guide["steps"]],
            }
            for guide in batch
        ]
        translated_text = web_agent.deepseek_translate(
            json.dumps(source, ensure_ascii=False),
            "English",
            (
                "Return valid JSON only. Preserve every id and the number and order of steps. "
                "Translate each title and each step into a concise, action-oriented UI instruction. "
                "Keep quoted button labels clear and do not replace instructions with generic text."
            ),
        )
        translated_batch = parse_json_response(translated_text)
        by_id = {str(item.get("id")): item for item in translated_batch}
        for guide in batch:
            translated = by_id.get(guide["id"])
            if not translated:
                raise ValueError(f"Missing translated guide: {guide['id']}")
            steps = translated.get("steps") or []
            if len(steps) != len(guide["steps"]):
                raise ValueError(f"Step count mismatch: {guide['id']}")
            translations[guide["id"]] = {
                "title": str(translated.get("title") or guide["title"]),
                "steps": [str(step).strip() for step in steps],
            }
        print(f"Translated {min(start + BATCH_SIZE, len(guides))}/{len(guides)} guides")

    OUTPUT_PATH.write_text(
        json.dumps(translations, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    print(f"Saved {len(translations)} translated guides to {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
