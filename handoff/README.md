# Handoff — Figma and frontend

## 1 · Tokens into Figma (1:1, live variables)

`handoff/tokens.json` is written in Tokens Studio / DTCG format, with real aliases
(`--color-primary` → `{palette.green.60}`), not flattened hex values.

1. Figma → Plugins → **Tokens Studio for Figma**
2. Settings → Import → paste or upload `tokens.json`
3. Apply to document → **Create variables**

You get:

- Colour variables in the same three layers as the CSS: `palette/*` (primitive),
  then `color/*`, `text/*`, `surface/*`, `border/*`, `status/*` aliased to them.
  Changing `palette.green.60` in Figma re-themes the file exactly as changing
  `--green-60` re-themes the code.
- Number variables for `space/*`, `radius/*`, `font-size/*`.
- Text styles from `type/*` (display, title, heading, body, label, caption, overline).
- Effect styles from `shadow/100…400`.

Fonts: install **Public Sans** and **IBM Plex Mono** (both free on Google Fonts)
before importing, or the text styles bind to a fallback.

## 2 · Components and screens into Figma (editable layers)

Token import does not bring components. For those, use **html.to.design**
(Figma plugin) with the *Import from URL* tab — it converts the rendered page into
real Figma frames, auto-layout and text layers.

Pages worth importing:

| Page | What lands in Figma |
|---|---|
| `index.html` | All 32 component specimens + 8 patterns, each in its own section |
| `ui_kits/storefront/index.html` | Four full product screens |

Ask me for a **public link** for either page and I will generate one — it is
short-lived (about ten minutes), so request it when you are already in Figma with
the plugin open.

Caveat: html.to.design produces faithful *layers*, not Figma components. Someone
still has to select each specimen and press ⌥⌘K to turn it into a component with
variants. Budget roughly half a day for the full set. Tokens imported in step 1
are picked up automatically once the layers exist.

## 3 · Frontend team using Claude

The repository is already a Claude skill. Give the team the whole project folder;
`SKILL.md` at the root is what Claude Code reads.

```
styles.css                 the only file an app imports
tokens/                    8 token files behind it
components/                32 React components, each with .d.ts + .prompt.md
ui_kits/storefront/        reference screens
index.html                 the visual reference you have been reviewing
readme.md                  visual foundations, content rules, iconography
handoff/tokens.json        Figma / other tooling
```

How they use it:

- **Claude Code**: drop the folder in the repo (e.g. `.claude/skills/digirella-design/`)
  and Claude reads `SKILL.md` → `readme.md` → the component `.prompt.md` files.
  Each `.prompt.md` states what a component is for and when *not* to use it, which
  is what stops an agent from inventing a fourth button variant.
- **Production**: components are plain React with inline styles reading CSS custom
  properties — no build step, no dependencies beyond React. Copy `components/` and
  link `styles.css`.
- **Contracts**: every component has a sibling `.d.ts`. Point the team's TypeScript
  at those and wrong props fail at compile time rather than in review.

## What is not in the handoff

- No logo — the wordmark is plain type until real brand assets exist.
- Icons are Lucide via CDN, a substitution. Swap the set and the `<Icon>` wrapper
  in the UI kit changes in one place.
- No dark theme tokens yet. Adding them means one extra token set in
  `tokens.json` and one `[data-theme="dark"]` block in CSS — the semantic layer
  already makes this a swap rather than a rewrite.
