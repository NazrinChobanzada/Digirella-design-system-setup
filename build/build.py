#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Digirella docs generator.

One page per entry. Everything about a component — examples, guidance,
specification, API, accessibility — lives on that page as stacked sections,
reachable from the contents rail on the right. No tabs, no selectors.

    python3 build/build.py

Output is plain static HTML with no runtime dependency, so deployment stays a
single `npx vercel --prod` with no build step on the host.

Content lives at `_content/<section>/<slug>/index.html` as a series of
<section> blocks, each opening with an <h2>. Section ids and the contents rail
are derived from those headings.

Note: generated component docs sit at `components/<slug>/index.html`, alongside
the source library at `components/core/`, `components/forms/` and so on. No
slug collides with a source folder name.
"""

import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
MANIFEST = json.loads((ROOT / "manifest.json").read_text(encoding="utf-8"))
CONTENT = ROOT / "_content"

STATUS_LABELS = {
    "ready": "Rewritten for the new format",
    "draft": "Draft",
    "migrated": "Carried over from the previous structure",
    "planned": "Planned, not built",
}


def all_entries():
    for section in MANIFEST["sections"]:
        for entry in section["entries"]:
            yield section, entry


def find(slug):
    for section, entry in all_entries():
        if entry["slug"] == slug:
            return section, entry
    return None, None


def rel(depth):
    return "../" * depth


def slugify(text):
    s = re.sub(r"<[^>]+>", "", text).strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    return s.strip("-") or "section"


def read_content(section_id, slug):
    p = CONTENT / section_id / slug / "index.html"
    return p.read_text(encoding="utf-8") if p.exists() else None


def build_sidenav(current_slug, depth):
    up = rel(depth)
    out = ['<nav class="sidenav" id="sidenav" aria-label="Sections">']
    for section in MANIFEST["sections"]:
        out.append('<div class="sidenav__section">')
        out.append(f'<div class="sidenav__title">{section["label"]}</div>')
        last_group = None
        for entry in section["entries"]:
            group = entry.get("group")
            if group and group != last_group:
                out.append(f'<div class="sidenav__group">{group}</div>')
                last_group = group
            current = ' aria-current="page"' if entry["slug"] == current_slug else ""
            status = entry.get("status", "migrated")
            href = f'{up}{section["id"]}/{entry["slug"]}/index.html'
            name = escape(entry["name"])
            if entry.get("alias"):
                name += (' <span style="color:var(--text-tertiary);font-weight:400">'
                         f'· {escape(entry["alias"])}</span>')
            if entry.get("rebuilt"):
                mark = '<span class="flag">New</span>'
            else:
                mark = (f'<span class="dot" data-status="{status}" '
                        f'title="{STATUS_LABELS[status]}"></span>')
            out.append(f'<a href="{href}"{current} data-status="{status}">'
                       f'<span>{name}</span>{mark}</a>')
        out.append("</div>")
    out.append("</nav>")
    return "\n".join(out)


def build_toc(body_html):
    """Contents rail. Sections carrying data-part are grouped under that label."""
    blocks = re.findall(r"<section\b([^>]*)>(.*?)</section>", body_html, re.S)
    rows, seen = [], {}
    for attrs, inner in blocks:
        h2 = re.search(r"<h2[^>]*>(.*?)</h2>", inner, re.S)
        if not h2:
            continue
        base = slugify(h2.group(1))
        seen[base] = seen.get(base, 0) + 1
        anchor = base if seen[base] == 1 else f"{base}-{seen[base]}"
        part = re.search(r'data-part="([^"]*)"', attrs)
        rows.append((part.group(1) if part else None, anchor,
                     re.sub(r"<[^>]+>", "", h2.group(1)).strip()))

    if len(rows) < 2:
        return ""

    out = ['<aside class="toc" aria-label="On this page">',
           '<div class="toc__title">On this page</div>']
    current = object()
    for part, anchor, text in rows:
        if part != current:
            current = part
            if part:
                out.append(f'<div class="toc__part">{escape(part)}</div>')
        out.append(f'<a href="#{anchor}">{escape(text)}</a>')
    out.append("</aside>")
    return "\n".join(out)


def anchor_sections(body_html, eyebrow=""):
    seen, parts_done = {}, set()

    def repl(m):
        block = m.group(0)
        h2 = re.search(r"<h2[^>]*>(.*?)</h2>", block, re.S)
        if not h2:
            return block
        base = slugify(h2.group(1))
        seen[base] = seen.get(base, 0) + 1
        anchor = base if seen[base] == 1 else f"{base}-{seen[base]}"
        block = re.sub(r'<section\b[^>]*?\sid="[^"]*"', "<section", block, count=1)
        block = block.replace("<section", f'<section id="{anchor}"', 1)
        if eyebrow:
            block = re.sub(r"(<h2\b)", f'<div class="cap">{eyebrow}</div>\\1', block, count=1)

        part = re.search(r'data-part="([^"]*)"', block)
        if part and part.group(1) not in parts_done:
            parts_done.add(part.group(1))
            block = (f'<div class="part" id="part-{slugify(part.group(1))}">'
                     f'<h2 class="part__title">{escape(part.group(1))}</h2></div>') + block
        return block

    return re.sub(r"<section\b.*?</section>", repl, body_html, flags=re.S)


def neighbours(slug):
    flat = list(all_entries())
    idx = next((i for i, (_, e) in enumerate(flat) if e["slug"] == slug), None)
    if idx is None:
        return None, None
    return (flat[idx - 1] if idx > 0 else None,
            flat[idx + 1] if idx < len(flat) - 1 else None)


def build_pagernav(slug, depth):
    up = rel(depth)
    prev, nxt = neighbours(slug)
    out = ['<nav class="pagernav">']
    if prev:
        s, e = prev
        out.append(f'<a href="{up}{s["id"]}/{e["slug"]}/index.html">'
                   f'<span>Previous</span>{escape(e["name"])}</a>')
    else:
        out.append("<div></div>")
    if nxt:
        s, e = nxt
        out.append(f'<a href="{up}{s["id"]}/{e["slug"]}/index.html" style="text-align:right">'
                   f'<span>Next</span>{escape(e["name"])}</a>')
    else:
        out.append("<div></div>")
    out.append("</nav>")
    return "\n".join(out)


def build_related(entry, depth):
    if not entry.get("related"):
        return ""
    up = rel(depth)
    links = []
    for slug in entry["related"]:
        s, e = find(slug)
        if e:
            links.append(f'<a href="{up}{s["id"]}/{e["slug"]}/index.html">'
                         f'{escape(e["name"])}</a>')
    if not links:
        return ""
    return ('<section id="related"><h2>Related</h2>'
            f'<div class="related">{"".join(links)}</div></section>')


SHELL = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="stylesheet" href="{up}styles.css">
<link rel="stylesheet" href="{up}interactive.css">
<link rel="stylesheet" href="{up}site.css">
</head>
<body class="ix">
<header class="masthead">
  <div class="masthead__inner">
    <button class="masthead__toggle" type="button" data-nav-toggle aria-label="Sections" aria-expanded="false">☰</button>
    <a class="masthead__brand" href="{up}index.html">digirella</a>
    <span class="masthead__tag">{tagline}</span>
    <span class="masthead__spacer"></span>
    <span class="masthead__meta">v1.0 · primary #006A09</span>
  </div>
</header>

<div class="frame">
{sidenav}
<main>
{header}
<div class="doc">
{body}
{related}
</div>
{pagernav}
</main>
{toc}
</div>

<script src="{up}interactive.js"></script>
<script src="{up}site.js"></script>
</body>
</html>
"""

PLANNED = """<section><h2>Planned</h2>
<div class="stub">This entry is on the roadmap and has no implementation yet.
It appears here so the gap stays visible rather than forgotten.</div></section>"""

MIGRATED_NOTE = ('<div class="callout"><div>This page carries its content from the '
                 'previous structure, moved across unchanged. It hasn\'t been rewritten '
                 'to the new format yet.</div></div>')


def write_page(section, entry):
    depth = 2
    up = rel(depth)
    slug, name = entry["slug"], entry["name"]
    status = entry.get("status", "migrated")

    body = read_content(section["id"], slug) or PLANNED

    lede = ""
    m = re.search(r'<p class="page__lede">(.*?)</p>', body, re.S)
    if m:
        lede = m.group(0)
        body = body.replace(lede, "", 1)

    body = anchor_sections(body)
    related = build_related(entry, depth)

    flag = ' <span class="flag flag--lg">New</span>' if entry.get("rebuilt") else ""
    header = (
        f'<div class="page__eyebrow">{escape(section["label"])}</div>'
        f'<h1 class="page__title">{escape(name)}{flag}</h1>'
        f"{lede}"
        + ('' if status == "ready" else
           f'<div class="statusline"><span class="dot" data-status="{status}"></span>'
           f'{STATUS_LABELS[status]}</div>')
        + (MIGRATED_NOTE if status == "migrated" else "")
    )

    html = SHELL.format(
        title=f"{name} — {MANIFEST['site']['name']}",
        tagline=escape(MANIFEST["site"]["tagline"]),
        up=up,
        sidenav=build_sidenav(slug, depth),
        header=header,
        body=body,
        related=related,
        pagernav=build_pagernav(slug, depth),
        toc=build_toc(body + related),
    )

    out = ROOT / section["id"] / slug / "index.html"
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(html, encoding="utf-8")


def write_index():
    cards = []
    for section in MANIFEST["sections"]:
        counts = {}
        for e in section["entries"]:
            k = e.get("status", "migrated")
            counts[k] = counts.get(k, 0) + 1
        first = section["entries"][0]
        bits = " · ".join(f"{n} {k}" for k, n in sorted(counts.items()))
        cards.append(
            '<a class="card card--interactive" style="text-decoration:none;display:block" '
            f'href="{section["id"]}/{first["slug"]}/index.html">'
            f'<strong style="font-size:var(--font-size-400)">{escape(section["label"])}</strong>'
            '<p style="margin:6px 0 0;font-size:var(--font-size-200);color:var(--text-tertiary)">'
            f'{len(section["entries"])} entries · {escape(bits)}</p></a>'
        )

    rebuilt = [(s, e) for s, e in all_entries() if e.get("rebuilt")]
    chips = "".join(
        f'<a href="{s["id"]}/{e["slug"]}/index.html">{escape(e["name"])}</a>' for s, e in rebuilt
    )

    body = (
        '<section><h2>Start here</h2>'
        '<p>Every entry lives on one page. Examples, the rules for when to use it, the '
        'visual specification, the API and the accessibility notes are stacked in a single '
        'scroll rather than split across folders or tabs.</p>'
        '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));'
        f'gap:var(--space-5);margin-top:var(--space-6)">{"".join(cards)}</div></section>'
        '<section><h2>Rebuilt so far</h2>'
        '<p>These three are written to the new format and marked <span class="flag">New</span> '
        'in the navigation. Everything else keeps its previous content until it gets the same '
        'treatment, so nothing is blank in the meantime.</p>'
        f'<div class="related">{chips}</div></section>'
    )

    html = SHELL.format(
        title=f"{MANIFEST['site']['name']} — {MANIFEST['site']['tagline']}",
        tagline=escape(MANIFEST["site"]["tagline"]),
        up="",
        sidenav=build_sidenav(None, 0),
        header='<div class="page__eyebrow">Design system</div>'
               '<h1 class="page__title">Digirella</h1>'
               '<p class="page__lede">A marketplace design system built on a green primary. '
               'Foundations, components and patterns, each documented where you use it.</p>',
        body=body,
        related="",
        pagernav="",
        toc="",
    )
    (ROOT / "index.html").write_text(html, encoding="utf-8")


def main():
    n = 0
    for section, entry in all_entries():
        write_page(section, entry)
        n += 1
    write_index()
    print(f"{n} pages + index written")


if __name__ == "__main__":
    main()
