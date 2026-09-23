#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Apply the Turkish -> English map to the Digirella project.

Safety model: HTML is walked as a tree, so only text nodes and a whitelist of
human-readable attributes are ever touched. Tag names, class names, ids, CSS
custom properties and data-* wiring attributes are never rewritten.
"""

import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment

sys.path.insert(0, str(Path(__file__).parent))
from strings import T, EXACT_ONLY

ROOT = Path(sys.argv[1] if len(sys.argv) > 1 else ".")

TEXT_ATTRS = ("aria-label", "placeholder", "title", "alt", "data-placeholder", "content")
SKIP_PARENTS = ("script", "style", "code", "pre")

# Longest first, so "Kargo firması" wins over "Kargo".
SUBSTRING_PAIRS = sorted(
    ((k, v) for k, v in T.items() if k not in EXACT_ONLY),
    key=lambda kv: -len(kv[0]),
)

TR_CHARS = re.compile(r"[çğışöüÇĞİŞÖÜ]")
stats = {"nodes": 0, "attrs": 0, "misses": set()}


def translate(text: str, whole_node: bool) -> str:
    if not text.strip():
        return text
    if whole_node:
        hit = T.get(text.strip())
        if hit:
            lead = text[: len(text) - len(text.lstrip())]
            tail = text[len(text.rstrip()):]
            return lead + hit + tail
    out = text
    for tr, en in SUBSTRING_PAIRS:
        if tr in out:
            out = out.replace(tr, en)
    return out


def do_html(path: Path):
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")

    for node in soup.find_all(string=True):
        if isinstance(node, Comment):
            new = translate(str(node), True)
            if new != str(node):
                node.replace_with(Comment(new))
                stats["nodes"] += 1
            continue
        if node.parent.name in SKIP_PARENTS:
            continue
        new = translate(str(node), True)
        if new != str(node):
            node.replace_with(NavigableString(new))
            stats["nodes"] += 1

    for el in soup.find_all(attrs=True):
        for a in TEXT_ATTRS:
            v = el.get(a)
            if isinstance(v, str):
                new = translate(v, True)
                if new != v:
                    el[a] = new
                    stats["attrs"] += 1
        # data-toast carries a JSON payload of user-facing copy
        v = el.get("data-toast")
        if isinstance(v, str) and TR_CHARS.search(v):
            new = translate(v, False)
            if new != v:
                el["data-toast"] = new
                stats["attrs"] += 1

    # <title> and lang
    html = soup.find("html")
    if html and html.get("lang") == "tr":
        html["lang"] = "en"

    path.write_text(str(soup), encoding="utf-8")


def do_plain(path: Path):
    """JS / JSX / TS / MD / JSON — string-level replacement only."""
    src = path.read_text(encoding="utf-8")
    out = src
    for tr, en in SUBSTRING_PAIRS:
        if tr in out:
            out = out.replace(tr, en)
    if out != src:
        path.write_text(out, encoding="utf-8")
        stats["nodes"] += 1


for p in sorted(ROOT.rglob("*.html")):
    if p.name.startswith("Digirella Design System"):
        continue
    do_html(p)

for pat in ("*.js", "*.jsx", "*.ts", "*.d.ts", "*.md", "*.json"):
    for p in sorted(ROOT.rglob(pat)):
        if p.name in ("strings.py", "translate.py"):
            continue
        do_plain(p)

print(f"text nodes rewritten: {stats['nodes']}")
print(f"attributes rewritten: {stats['attrs']}")
