# Site structure

One page per entry. Examples, guidance, specification, API and accessibility
are stacked sections on the same page — no tabs, no variant selectors. The
contents rail on the right is the only navigation within a page.

## How pages are made

`manifest.json` is the registry — every entry, its section, group and status.
`build/build.py` reads it plus the content in `_content/` and writes plain
static HTML:

    python3 build/build.py

There is no runtime dependency and no host build step. Deployment stays
`npx vercel --prod`.

## Adding or rewriting a page

1. Add or find the entry in `manifest.json`.
2. Write `_content/<section>/<slug>/index.html` as a series of `<section>`
   blocks, each opening with an `<h2>`.
3. Set `"status": "ready"` and `"rebuilt": true` to mark it New.
4. Run the build.

Navigation, contents rail, previous/next and related links are generated. Ids
come from the `<h2>` text, so nothing is written by hand.

An optional `<p class="page__lede">` at the top is lifted into the page header.

## Migration

Two scripts pulled the previous structure into `_content/`, each taking the old
project as an argument:

    python3 build/migrate.py       ../previous-version
    python3 build/migrate_index.py ../previous-version

`migrate.py` handles components, drawing on `usage/` and `components.html`.

`migrate_index.py` handles foundations and patterns, reading them straight out
of the old `index.html`. That page held ten foundation sections and eight
pattern sections — including the primitive palette tables and the full colour
accessibility audit — that exist in no other file. An earlier attempt used
`guidelines/*.card.html` instead and silently lost most of it, which is why the
source matters here.

It never overwrites authored content — hand-written pages always win. Rerunning
it is safe.

## Status values

| Status | Meaning | Shown as |
|---|---|---|
| `ready` + `rebuilt` | Written to the new format | Green **New** flag |
| `migrated` | Previous content, moved across unchanged | Grey dot |
| `planned` | Not built yet | Hollow dot |

## Superseded files

The previous structure (`components.html`, `usage/`, `guidelines/`) has been deleted. Its
content now lives in `_content/`, which is the single source for every page.


Generated component docs sit at `components/<slug>/index.html`, alongside the
source library at `components/core/`, `components/forms/` and so on. No slug
collides with a source folder name.
