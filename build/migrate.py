#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pull the previous structure's content into the new one.

Two sources, in priority order:
  1. usage/<page>.html   — the in-depth guides. Their <main> sections carry the
     real documentation, so they migrate wholesale.
  2. components.html     — the live playground. Each <section id="..."> holds a
     working demo, which becomes the component's example block.

Anything already authored under _content/ is left untouched — hand-written
pages always win over migrated ones.

    python3 build/migrate.py ../ds.tr
"""

import re
import sys
from pathlib import Path
from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
OLD = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else ROOT
CONTENT = ROOT / "_content" / "components"

# component slug -> old usage page
USAGE_PAGES = {
    "select": "selection-inputs",
    "combobox": "selection-inputs",
    "multiselect": "selection-inputs",
    "treeselect": "selection-inputs",
    "checkbox": "choice-controls",
    "radio": "choice-controls",
    "switch": "choice-controls",
    "table": "table",
    "tabs": "tabs",
    "segmented-control": "tabs",
    "dialog": "modal",
    "tooltip": "overlays",
    "toast": "overlays",
    "alert": "overlays",
    "popover": "overlays",
    "menu": "overlays",
    "drawer": "overlays",
    "textarea": "input",
}

# component slug -> section id in components.html
DEMO_IDS = {
    "icon-button": "iconbutton",
    "quantity-stepper": "stepper",
    "progress-bar": "progress",
    "segmented-control": "segmented",
}


def clean(node, drop_lead=True):
    """Strip page-specific classes so migrated markup adopts the new shell."""
    html = str(node)
    html = html.replace('class="lead"', 'class="doc-lead"') if drop_lead else html
    return html


def load_usage(page):
    p = OLD / "usage" / f"{page}.html"
    if not p.exists():
        return None
    soup = BeautifulSoup(p.read_text(encoding="utf-8"), "html.parser")
    main = soup.select_one("main")
    if not main:
        return None

    out = []
    for sec in main.find_all("section", recursive=False):
        # the new build derives ids from the h2, so drop the old ones
        del sec["id"]
        for lead in sec.select("p.lead"):
            lead["class"] = ["doc-lead"]
        out.append(str(sec))
    return "\n".join(out)


def load_demo(slug):
    p = OLD / "components.html"
    if not p.exists():
        return None
    soup = BeautifulSoup(p.read_text(encoding="utf-8"), "html.parser")
    sec = soup.find("section", id=DEMO_IDS.get(slug, slug))
    if not sec:
        return None

    # keep the working demo markup, drop the old section heading and lede
    for h in sec.find_all(["h2"]):
        h.decompose()
    lead = sec.find("p", class_="lead")
    lede = ""
    if lead:
        lede = lead.get_text(strip=True)
        lead.decompose()

    inner = "".join(str(c) for c in sec.contents).strip()
    body = ['<section><h2>Examples</h2>']
    if lede:
        body.append(f'<p>{lede}</p>')
    body.append(inner)
    body.append("</section>")
    return "\n".join(body)


def migrate(slug):
    target = CONTENT / slug / "index.html"
    if target.exists():
        return "authored"

    parts = []
    demo = load_demo(slug)
    if demo:
        parts.append(demo)

    page = USAGE_PAGES.get(slug, slug)
    guide = load_usage(page)
    if guide:
        if page != slug:
            parts.append(
                f'<section><h2>Guidance</h2><p>The following comes from the shared '
                f'<strong>{page.replace("-", " ")}</strong> guide, which covers this '
                f'component alongside its siblings.</p></section>'
            )
        parts.append(guide)

    if not parts:
        return "empty"

    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text("\n".join(parts), encoding="utf-8")
    return "migrated"


def main():
    import json
    manifest = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
    tally = {}
    for section in manifest["sections"]:
        if section["id"] != "components":
            continue
        for entry in section["entries"]:
            r = migrate(entry["slug"])
            tally[r] = tally.get(r, 0) + 1
            if r != "empty":
                print(f"  {entry['name']:20} {r}")
    print("\n" + ", ".join(f"{v} {k}" for k, v in tally.items()))


if __name__ == "__main__":
    main()
