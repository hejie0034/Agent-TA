from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402


PLACEHOLDER_MARKERS = ("参考截图教程路径", "进入与【", "对应的页面", "对应的【")


def safe_aliases(item: dict) -> list[str]:
    aliases = []
    for keyword in item.get("keywords") or []:
        text = str(keyword).strip()
        if (
            3 <= len(text) <= 32
            and not any(char in text for char in ("；", "\n"))
            and (
                text.endswith(("？", "?"))
                or text.startswith(("如何", "怎么", "怎样", "创建", "新建", "新增", "添加", "删除", "修改", "编辑", "使用", "开始", "打开", "发布", "导入", "设置", "查看"))
            )
        ):
            aliases.append(text)
    return aliases


def main() -> None:
    items = web_agent.load_faq_items()
    by_alias: dict[str, set[str]] = defaultdict(set)
    misses: list[dict] = []
    placeholder_answers: list[dict] = []
    unstructured_answers: list[dict] = []
    checked = 0

    variants_by_id: dict[str, list[str]] = {}
    for item in items:
        item_id = str(item.get("id"))
        variants = [str(item.get("question") or "").strip(), *safe_aliases(item)]
        variants = list(dict.fromkeys(value for value in variants if value))
        variants_by_id[item_id] = variants
        for query in variants:
            by_alias[web_agent.canonical_intent_text(query)].add(item_id)

    for item in items:
        item_id = str(item.get("id"))
        answer_text = json.dumps(item.get("answer") or {}, ensure_ascii=False)
        if any(marker in answer_text for marker in PLACEHOLDER_MARKERS):
            placeholder_answers.append({"id": item_id, "question": item.get("question")})
        rendered = web_agent.format_faq_answer(item)
        numbered_steps = re.findall(r"(?:^|\n)\s*\d+[、.．)]\s*\S+", rendered)
        if not all(
            marker in rendered
            for marker in ("入口位置：", "操作步骤：", "1、", "完成后看：", "注意：")
        ) or len(numbered_steps) < 2:
            unstructured_answers.append({"id": item_id, "question": item.get("question")})

        for query in variants_by_id[item_id]:
            owners = by_alias[web_agent.canonical_intent_text(query)]
            if len(owners) > 1 and query != item.get("question"):
                continue
            checked += 1
            matches = web_agent.find_matches(query, items, limit=3)
            top_ids = [str(match["item"].get("id")) for match in matches]
            if item_id not in top_ids:
                misses.append(
                    {
                        "id": item_id,
                        "query": query,
                        "top": top_ids,
                    }
                )

    collisions = [
        {"alias": alias, "ids": sorted(ids)}
        for alias, ids in by_alias.items()
        if alias and len(ids) > 1
    ]
    report = {
        "faqCount": len(items),
        "queriesChecked": checked,
        "retrievalMisses": misses,
        "aliasCollisions": collisions,
        "placeholderAnswers": placeholder_answers,
        "unstructuredAnswers": unstructured_answers,
    }
    report_path = ROOT / "reports" / "faq_audit_report.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")

    print(
        f"FAQ={len(items)} queries={checked} misses={len(misses)} "
        f"collisions={len(collisions)} placeholders={len(placeholder_answers)} "
        f"unstructured={len(unstructured_answers)}"
    )
    print(f"report={report_path}")
    if misses or placeholder_answers or unstructured_answers:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
