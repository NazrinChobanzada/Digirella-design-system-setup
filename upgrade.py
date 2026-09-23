#!/usr/bin/env python3
"""
Upgrade the Digirella docs pages in place.

1. Link interactive.css + interactive.js on every page.
2. Turn the static `<span class="btn" style="...">` demos into real
   `<button class="btn btn--variant">` elements so they hover, focus and press.

Deliberately left alone:
  - anything inside a `.mx` state matrix (those cells document a state, so a
    cell labelled "hover" must not react to hover)
  - any span whose inline style already paints a state (hover/active/disabled),
    for the same reason
"""

import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".")

# Inline styles that mean "this swatch is showing a state" -> keep static.
STATE_MARKERS = (
    "--surface-hover",
    "--surface-active",
    "--surface-disabled",
    "--color-primary-hover",
    "--color-primary-active",
    "--color-primary-subtle-hover",
    "--text-disabled",
    "--border-focus",
    "--focus-ring",
    "--red-60",
)


def variant_of(style: str):
    s = style.replace(" ", "")
    if "--status-danger" in s:
        return "danger"
    if "--color-primary)" in s or "--color-on-primary" in s:
        return "primary"
    if "--surface-brand-subtle" in s:
        return "subtle"
    if "--border-strong" in s or "--surface-card" in s:
        return "secondary"
    return "ghost"


def upgrade(path: Path) -> tuple[int, int]:
    html = path.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")

    # --- 1. asset links -------------------------------------------------
    prefix = "../" if path.parent.name == "usage" else ""

    head = soup.find("head")
    if head and not soup.find("link", href=re.compile(r"interactive\.css$")):
        base = soup.find("link", href=re.compile(r"styles\.css$"))
        tag = soup.new_tag("link", rel="stylesheet", href=f"{prefix}interactive.css")
        (base.insert_after(tag) if base else head.append(tag))

    body = soup.find("body")
    if body is not None:
        classes = body.get("class", [])
        if "ix" not in classes:
            body["class"] = classes + ["ix"]
        if not soup.find("script", src=re.compile(r"interactive\.js$")):
            s = soup.new_tag("script", src=f"{prefix}interactive.js")
            s["defer"] = ""
            body.append(s)

    # --- 2. buttons -----------------------------------------------------
    converted = skipped = 0
    for span in soup.find_all("span", class_="btn"):
        style = span.get("style", "") or ""

        if any(m in style for m in STATE_MARKERS):
            skipped += 1
            continue
        if span.find_parent(class_="mx"):
            skipped += 1
            continue

        span.name = "button"
        span["type"] = "button"
        span["class"] = ["btn", f"btn--{variant_of(style)}"]
        del span["style"]
        converted += 1

    path.write_text(str(soup), encoding="utf-8")
    return converted, skipped


targets = sorted(ROOT.glob("usage/*.html")) + [ROOT / "index.html"]
tc = ts = 0
for p in targets:
    if not p.exists():
        continue
    c, s = upgrade(p)
    tc += c
    ts += s
    print(f"{p.relative_to(ROOT)}: {c} buton canlandırıldı, {s} statik bırakıldı")

print(f"\nToplam: {tc} dönüştürüldü, {ts} kasıtlı olarak statik kaldı")
