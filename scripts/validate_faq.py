from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
FAQ_PATH = ROOT / "ulearning_teacher_faq.json"
REQUIRED_FIELDS = ("id", "category", "question", "summary", "keywords", "answer")
REQUIRED_ANSWER_FIELDS = ("entry", "steps", "check", "risk")


def main() -> None:
    items = json.loads(FAQ_PATH.read_text(encoding="utf-8"))
    errors: list[str] = []
    ids: set[str] = set()

    for index, item in enumerate(items, start=1):
        prefix = f"FAQ #{index}"
        for field in REQUIRED_FIELDS:
            if not item.get(field):
                errors.append(f"{prefix} 缺少字段：{field}")

        item_id = str(item.get("id") or "")
        if item_id in ids:
            errors.append(f"{prefix} 使用了重复 id：{item_id}")
        ids.add(item_id)

        answer = item.get("answer") or {}
        for field in REQUIRED_ANSWER_FIELDS:
            if not answer.get(field):
                errors.append(f"{prefix} 的 answer 缺少字段：{field}")

        related = item.get("related") or []
        if related and not isinstance(related, list):
            errors.append(f"{prefix} 的 related 必须是数组")

    for item in items:
        for related_id in item.get("related") or []:
            if related_id not in ids:
                errors.append(f"{item.get('id')} 引用了不存在的 related id：{related_id}")
            if related_id == item.get("id"):
                errors.append(f"{item.get('id')} 不能关联自身")

    if errors:
        raise SystemExit("\n".join(errors))

    print(f"FAQ 校验通过：{len(items)} 条，所有 id 和关联均有效。")


if __name__ == "__main__":
    main()
