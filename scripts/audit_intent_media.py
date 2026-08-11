from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402


REPORT_PATH = ROOT / "reports" / "intent_media_audit.json"


def normalize(value: Any) -> str:
    return re.sub(r"\s+", "", str(value).lower())


def canonical_intent(value: Any) -> str:
    text = normalize(value)
    text = re.sub(r"^(麻烦|请问|请教|请)", "", text)
    text = re.sub(r"^(如何|怎么|怎样|咋)", "", text)
    text = re.sub(r"^(快速|立即|直接|马上|迅速|便捷)+", "", text)
    text = re.sub(r"^(新建|新增)", "创建", text)
    text = re.sub(
        r"^(创建|新建|新增|添加|做|建)(一个|一门|一项|一份|一名|个)",
        r"\1",
        text,
    )
    return re.sub(r"[？?。.]+$", "", text)


def tutorial_score(question: str, guide: dict[str, Any]) -> tuple[int, str]:
    text = normalize(question)
    core_text = canonical_intent(text)
    best_score = 0
    best_term = ""
    terms = [
        guide.get("title"),
        guide.get("question"),
        guide.get("path"),
        *(guide.get("aliases") or []),
    ]
    for term in filter(None, terms):
        normalized_term = normalize(term)
        core_term = canonical_intent(normalized_term)
        score = 0
        if text == normalized_term:
            score = 240
        elif len(core_text) >= 3 and core_text == core_term:
            score = 200
        elif (
            len(core_text) >= 4
            and len(core_term) >= 4
            and (core_text in core_term or core_term in core_text)
        ):
            coverage = min(len(core_text), len(core_term)) / max(
                len(core_text), len(core_term)
            )
            score = 35 + round(coverage * 45)
        if score > best_score:
            best_score = score
            best_term = str(term)
    return best_score, best_term


def first_match_id(question: str) -> str:
    result = web_agent.answer_question(question)
    matches = result.get("matches") or []
    return str(matches[0].get("id") or "") if matches else ""


def main() -> None:
    faq_items = json.loads(
        (ROOT / "ulearning_teacher_faq.json").read_text(encoding="utf-8")
    )
    screenshot_guides = web_agent.build_screenshot_guides()
    video_guides = web_agent.build_video_guides()
    questions = [
        (str(item.get("id") or ""), str(item.get("question") or ""))
        for item in faq_items
        if item.get("question")
    ]

    low_confidence_media_matches: list[dict[str, Any]] = []
    for media_type, guides in [
        ("image", screenshot_guides),
        ("video", video_guides),
    ]:
        for faq_id, question in questions:
            ranked = sorted(
                (
                    (*tutorial_score(question, guide), guide)
                    for guide in guides
                ),
                key=lambda item: item[0],
                reverse=True,
            )
            if not ranked or not 70 <= ranked[0][0] < 200:
                continue
            score, term, guide = ranked[0]
            low_confidence_media_matches.append(
                {
                    "mediaType": media_type,
                    "faqId": faq_id,
                    "question": question,
                    "guideQuestion": guide.get("question"),
                    "guideTitle": guide.get("title"),
                    "score": score,
                    "matchedTerm": term,
                }
            )

    canonical_groups: dict[str, list[dict[str, Any]]] = {}
    for item in faq_items:
        question = str(item.get("question") or "")
        if question:
            canonical_groups.setdefault(canonical_intent(question), []).append(item)

    duplicate_groups = []
    for intent, items in canonical_groups.items():
        if len(items) < 2:
            continue
        answers = {
            json.dumps(item.get("answer"), ensure_ascii=False, sort_keys=True)
            for item in items
        }
        duplicate_groups.append(
            {
                "intent": intent,
                "count": len(items),
                "answerVariants": len(answers),
                "items": [
                    {
                        "id": item.get("id"),
                        "question": item.get("question"),
                        "source": item.get("source"),
                    }
                    for item in items
                ],
            }
        )

    modifier_mismatches = []
    for faq_id, question in questions:
        if not re.match(r"^(如何|怎么|怎样)", question):
            continue
        base_match = first_match_id(question)
        core = canonical_intent(question)
        if not base_match or len(core) < 3:
            continue
        for variant in [f"如何快速{core}？", f"怎么直接{core}？"]:
            variant_match = first_match_id(variant)
            if variant_match != base_match:
                modifier_mismatches.append(
                    {
                        "faqId": faq_id,
                        "question": question,
                        "variant": variant,
                        "expected": base_match,
                        "actual": variant_match,
                    }
                )

    report = {
        "faqCount": len(faq_items),
        "questionCount": len(questions),
        "screenshotGuideCount": len(screenshot_guides),
        "videoGuideCount": len(video_guides),
        "lowConfidenceMediaMatchCount": len(low_confidence_media_matches),
        "lowConfidenceMediaMatches": low_confidence_media_matches,
        "canonicalDuplicateGroupCount": len(duplicate_groups),
        "canonicalDuplicateGroups": duplicate_groups,
        "modifierMismatchCount": len(modifier_mismatches),
        "modifierMismatches": modifier_mismatches,
    }
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)
    REPORT_PATH.write_text(
        json.dumps(report, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )

    print(
        "意图与媒体审计完成："
        f"FAQ {len(faq_items)} 条，"
        f"低置信媒体匹配 {len(low_confidence_media_matches)} 条，"
        f"近义重复组 {len(duplicate_groups)} 组，"
        f"修饰词命中不一致 {len(modifier_mismatches)} 条。"
    )
    print(f"report={REPORT_PATH}")


if __name__ == "__main__":
    main()
