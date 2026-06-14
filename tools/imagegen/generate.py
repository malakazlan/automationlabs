#!/usr/bin/env python3
"""
Generate the Simple Automation Labs mockup image set via the OpenAI image API.

Follows the ai-image-generator skill patterns (gpt-image-2 for scenes,
gpt-image-1.5 for transparency). Reads the OpenAI key from the OPENAI_API_KEY
env var, or from a gitignored `.image-gen.env` file at the repo root.

Usage:
    python tools/imagegen/generate.py                 # generate missing images
    python tools/imagegen/generate.py --force         # regenerate everything
    python tools/imagegen/generate.py --only home-hero hvac-hero
    python tools/imagegen/generate.py --model gpt-image-1.5   # override model
"""
import argparse
import base64
import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]            # D:\agency
ENV_FILE = ROOT / ".image-gen.env"
MANIFEST = Path(__file__).resolve().parent / "manifest.json"
OUT_DIR = ROOT / "mockups" / "assets"
API_URL = "https://api.openai.com/v1/images/generations"

PRICE_PER_1024 = {"low": 0.006, "medium": 0.053, "high": 0.211}


def load_key() -> str:
    key = os.environ.get("OPENAI_API_KEY")
    if not key and ENV_FILE.exists():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            name, _, value = line.partition("=")
            if name.strip() == "OPENAI_API_KEY":
                key = value.strip().strip('"').strip("'")
    if not key:
        sys.exit(
            f"No OpenAI key found.\n"
            f"Create {ENV_FILE} with a single line:\n"
            f'  OPENAI_API_KEY=sk-...\n'
            f"(it is gitignored), or set the OPENAI_API_KEY environment variable."
        )
    return key


def generate_one(key: str, model: str, prompt: str, size: str, quality: str,
                 out_path: Path, transparent: bool) -> None:
    body = {
        "model": model,
        "prompt": prompt,
        "n": 1,
        "size": size,
        "quality": quality,
        "output_format": "png",
    }
    if transparent:
        body["background"] = "transparent"
    req = urllib.request.Request(
        API_URL,
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"},
    )
    try:
        resp = urllib.request.urlopen(req, timeout=180)
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")
        raise SystemExit(
            f"\nOpenAI API error {e.code} for '{out_path.stem}':\n{detail}\n\n"
            f"If this mentions verification, enable API Org Verification in your\n"
            f"OpenAI account settings. If it mentions the model, try a different\n"
            f"--model (gpt-image-1.5 or gpt-image-1)."
        )
    result = json.loads(resp.read())
    img = base64.b64decode(result["data"][0]["b64_json"])
    out_path.write_bytes(img)
    print(f"  saved {out_path.relative_to(ROOT)} ({len(img):,} bytes)")


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true", help="regenerate existing images")
    ap.add_argument("--only", nargs="*", default=None, help="generate only these ids")
    ap.add_argument("--model", default=None, help="override model for all images")
    args = ap.parse_args()

    key = load_key()
    spec = json.loads(MANIFEST.read_text(encoding="utf-8"))
    defaults = spec["defaults"]
    suffix = spec["style_suffix"]
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    items = spec["images"]
    if args.only:
        items = [i for i in items if i["id"] in set(args.only)]
        if not items:
            sys.exit(f"No manifest images match --only {args.only}")

    est = 0.0
    planned = []
    for item in items:
        out = OUT_DIR / f"{item['id']}.png"
        if out.exists() and not args.force:
            print(f"  skip {out.name} (exists; use --force to redo)")
            continue
        quality = item.get("quality", defaults["quality"])
        est += PRICE_PER_1024.get(quality, 0.053)
        planned.append((item, out, quality))

    if not planned:
        print("Nothing to generate.")
        return
    print(f"Generating {len(planned)} image(s). Rough cost estimate: ~${est:.2f}\n")

    for item, out, quality in planned:
        model = args.model or item.get("model", defaults["model"])
        size = item.get("size", defaults["size"])
        prompt = f"{item['prompt']} {suffix}"
        transparent = bool(item.get("transparent"))
        print(f"- {item['id']}  [{model} {size} {quality}]")
        generate_one(key, model, prompt, size, quality, out, transparent)

    print("\nDone. Images in mockups/assets/.")


if __name__ == "__main__":
    main()
