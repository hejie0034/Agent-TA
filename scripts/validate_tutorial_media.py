from __future__ import annotations

import sys
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

import web_agent  # noqa: E402


def main() -> None:
    screenshot_guides = web_agent.build_screenshot_guides()
    video_guides = web_agent.build_video_guides()
    errors: list[str] = []

    for guide in screenshot_guides:
        for field in ("id", "title", "question", "aliases", "steps"):
            if not guide.get(field):
                errors.append(f"截图教程 {guide.get('id')} 缺少 {field}")
        for step in guide.get("steps") or []:
            source = ROOT / str(step.get("src") or "")
            if not step.get("label") or not step.get("text") or not source.is_file():
                errors.append(f"截图步骤无效：{guide.get('question')} / {step}")
            step_text = str(step.get("text") or "").strip()
            if step_text.startswith("查看第 ") or len(step_text) < 4:
                errors.append(f"截图步骤仍是占位文字：{guide.get('question')} / {step_text}")

    for guide in video_guides:
        for field in ("id", "title", "question", "aliases", "src"):
            if not guide.get(field):
                errors.append(f"视频教程 {guide.get('id')} 缺少 {field}")
        source = ROOT / str(guide.get("src") or "")
        if not source.is_file():
            errors.append(f"视频文件不存在：{guide.get('src')}")

    if errors:
        raise SystemExit("\n".join(errors))

    print(
        f"教程媒体校验通过：{len(screenshot_guides)} 组截图、"
        f"{sum(len(item['steps']) for item in screenshot_guides)} 张图片、"
        f"{len(video_guides)} 个视频，字段和文件路径全部有效。"
    )


if __name__ == "__main__":
    main()
