from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
from pathlib import Path
from typing import Any


ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SCREENSHOT_DIR = ROOT / "截图教程"
DEFAULT_OUTPUT = ROOT / "切片读取知识库" / "screenshot_tutorial_kb.jsonl"
DEFAULT_REPORT = ROOT / "切片读取知识库" / "screenshot_tutorial_kb_report.json"
IMAGE_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp", ".bmp"}


def natural_key(path: Path) -> list[Any]:
    parts = re.split(r"(\d+)", path.name)
    return [int(part) if part.isdigit() else part.lower() for part in parts]


def normalize_space(value: str) -> str:
    text = re.sub(r"\s+", " ", value).strip()
    text = re.sub(r"(?<=[\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])", "", text)
    text = re.sub(r"(?<=[\u4e00-\u9fff])\s+(?=[A-Za-z0-9])", "", text)
    text = re.sub(r"(?<=[A-Za-z0-9])\s+(?=[\u4e00-\u9fff])", "", text)
    return text


def infer_step_text(path: Path) -> str:
    stem = path.stem
    stem = re.sub(r"(?i)^step\s*\d*", "", stem)
    stem = re.sub(r"^\d+[_\-.\s]*", "", stem)
    stem = stem.replace("_", " ").replace("-", " ")
    return normalize_space(stem) or path.stem


def run_tesseract(image_path: Path, language: str) -> str:
    tesseract = shutil.which("tesseract")
    if not tesseract:
        return ""
    command = [tesseract, str(image_path), "stdout", "-l", language, "--psm", "6"]
    try:
        result = subprocess.run(
            command,
            check=False,
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="replace",
            timeout=45,
        )
    except (OSError, subprocess.TimeoutExpired):
        return ""
    if result.returncode != 0:
        return ""
    return normalize_space(result.stdout)


def load_sidecar_text(image_path: Path) -> str:
    for suffix in [".txt", ".ocr.txt"]:
        sidecar = image_path.with_suffix(suffix)
        if sidecar.exists():
            try:
                return normalize_space(sidecar.read_text(encoding="utf-8"))
            except OSError:
                return ""
    return ""


def build_records(screenshot_dir: Path, ocr_language: str) -> list[dict[str, Any]]:
    records: list[dict[str, Any]] = []
    tutorial_dirs = sorted(
        {
            image.parent
            for image in screenshot_dir.rglob("*")
            if image.is_file() and image.suffix.lower() in IMAGE_EXTENSIONS
        },
        key=lambda p: p.as_posix().lower(),
    )

    for index, tutorial_dir in enumerate(tutorial_dirs, start=1):
        images = sorted(
            [
                image
                for image in tutorial_dir.iterdir()
                if image.is_file() and image.suffix.lower() in IMAGE_EXTENSIONS
            ],
            key=natural_key,
        )
        rel_dir = tutorial_dir.relative_to(screenshot_dir)
        title_parts = list(rel_dir.parts)
        title = " - ".join(title_parts)
        question = title_parts[-1]
        category = title_parts[0] if title_parts else "截图教程"
        step_lines: list[str] = []
        image_records: list[dict[str, Any]] = []
        ocr_texts: list[str] = []

        for step_index, image in enumerate(images, start=1):
            step_text = infer_step_text(image)
            sidecar_text = load_sidecar_text(image)
            ocr_text = sidecar_text or run_tesseract(image, ocr_language)
            if ocr_text:
                ocr_texts.append(f"第{step_index}步截图文字：{ocr_text}")
            step_lines.append(f"第{step_index}步：查看截图 {image.name}（{step_text}）")
            image_records.append(
                {
                    "step": step_index,
                    "file": str(image.relative_to(ROOT)),
                    "name": image.name,
                    "inferredText": step_text,
                    "ocrText": ocr_text,
                }
            )

        content_lines = [
            f"截图教程：{title}",
            f"标准问法：如何{question}？" if not question.startswith("如何") else f"标准问法：{question}？",
            "目录路径：" + " > ".join(title_parts),
            "步骤图片：",
            *step_lines,
        ]
        if ocr_texts:
            content_lines.extend(["OCR文字：", *ocr_texts])

        keyword_source = " ".join(title_parts + [question])
        keywords = sorted(
            {
                part
                for part in re.split(r"[\s，。！？、；：/()（）【】<>_\-]+", keyword_source)
                if len(part) >= 2
            }
        )
        records.append(
            {
                "id": f"screenshot_tutorial_{index:03d}",
                "source": "截图教程",
                "category": category,
                "question": f"如何{question}？" if not question.startswith("如何") else f"{question}？",
                "title": title,
                "path": " > ".join(title_parts),
                "summary": f"{title}，共 {len(images)} 张步骤截图。",
                "keywords": keywords + title_parts,
                "answer": {
                    "entry": title_parts[0] if title_parts else "截图教程",
                    "steps": step_lines,
                    "check": "按截图顺序完成后，页面应进入对应操作结果或下一步状态。",
                    "risk": "涉及发布、删除、考试、学生范围或权限时，提交前先核对对象和影响范围。",
                },
                "images": image_records,
                "ocrText": "\n".join(ocr_texts),
                "knowledgeText": "\n".join(content_lines),
            }
        )
    return records


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", type=Path, default=DEFAULT_SCREENSHOT_DIR)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--report", type=Path, default=DEFAULT_REPORT)
    parser.add_argument("--ocr-language", default="chi_sim+eng")
    args = parser.parse_args()

    records = build_records(args.source, args.ocr_language)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8") as file:
        for record in records:
            file.write(json.dumps(record, ensure_ascii=False) + "\n")

    image_count = sum(len(record["images"]) for record in records)
    ocr_image_count = sum(
        1
        for record in records
        for image in record["images"]
        if image.get("ocrText")
    )
    report = {
        "source": str(args.source),
        "output": str(args.output),
        "tutorialCount": len(records),
        "imageCount": image_count,
        "ocrImageCount": ocr_image_count,
        "ocrAvailable": bool(shutil.which("tesseract")),
        "ocrLanguage": args.ocr_language,
    }
    args.report.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps(report, ensure_ascii=False))


if __name__ == "__main__":
    main()
