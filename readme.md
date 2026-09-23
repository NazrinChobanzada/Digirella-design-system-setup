# Digirella Design System

A general-purpose marketplace/e-commerce design system built on a green primary (`#006A09`). It contains a layered token architecture (primitive palette → semantic tokens → components), accessibility-led contrast decisions, and a clickable UI kit.

## Sources and scope

- User brief: "a design system like the eBay Playbook tokens page, with `#006A09` as the primary colour."
- **No brand assets were supplied** — no logo, font files, icon set, screenshots, or codebase. This system is not a copy of eBay's design system; it is an original system that adopts the same *token approach* (primitive plus semantic layers, numeric scales). The brand marks, typography, and component visuals were all produced from scratch.
- The brand name is a placeholder: **digirella**. When the real name arrives, update `guidelines/brand-mark.card.html`, `ui_kits/`, and `readme.md`.

## Tokens

Entry point: `styles.css` (nothing but `@import` lines).

| File | Contents |
|---|---|
| `tokens/palette.css` | Primitive colours — `--green-*`, `--neutral-*`, `--blue-*`, `--amber-*`, `--red-*`, alpha layers. Never used directly. |
| `tokens/colors.css` | Semantic colours — `--color-primary`, `--text-*`, `--surface-*`, `--border-*`, `--status-*`. Product code uses these. |
| `tokens/typography.css` | Font families, weights, an 11→56px scale, line heights, role tokens. |
| `tokens/spacing.css` | A 4px-based `--space-0…13` plus layout widths. |
| `tokens/shape.css` | Corner radii, border widths, `--focus-ring`. |
| `tokens/elevation.css` | `--shadow-100…400`. |
| `tokens/motion.css` | Durations, easing curves, `--transition-interactive`. |
| `tokens/base.css` | Body reset, link colours. |

`--green-60` = **#006A09**, and it is the single brand anchor. Every other green is a lighter or darker step derived from that tone; `--color-primary` always points at `--green-60`, so changing the primary means changing one line.

## Visual foundations

**Accessibility.** Every colour pair the system renders was calculated against WCAG 2.2; the table lives in the "Colour accessibility" section of `index.html`. Text pairs clear 4.5:1 (AA) and non-text control boundaries clear 3:1 (1.4.11). The first audit turned up two real failures, both fixed:

- `--neutral-50` (`--text-tertiary`) went from `#767D76` to `#6B726B`: at 4.23:1 on white it sat below AA, and now reaches 4.95:1.
- Form field and checkbox boundaries were using `--border-default` (1.34:1). Since that boundary is the only visual cue defining the control, this violated 1.4.11. A new `--border-control` token (`--neutral-35`, 3.12:1) was added, leaving `--border-default` for decorative dividers only.

`--text-disabled` (2.6:1) and decorative borders are deliberate exemptions — WCAG puts disabled controls and pure decoration out of scope.

**Colour.** One dominant brand colour: a dark, saturated green. It gives 6.9:1 contrast on white, so it works as both a background and a text colour — a rare advantage, and the system leans on it. Neutrals carry a slight green cast (`#F4F6F4`, `#262A26`) so they don't read cold next to the green. A screen carries at most two background colours: `--surface-page` and `--surface-card`. Green backgrounds are reserved for the hero, primary buttons, and selected states — never behind large blocks of content. There are **no gradients**. The success colour is not a separate green; it comes from the primary family, so the feeling of confirmation carries the same signal as the brand itself.

**Typography.** A single family: Public Sans (geometric grotesque, generous x-height, clear numerals), plus IBM Plex Mono for technical data. Headings run 600–700 with `-0.02em` tightening; body is 400/1.5. Display is hero-only. Uppercase appears only in overlines (11px/600/0.04em). Italics are not used.

**Surfaces and imagery.** Product images sit on white, perfectly square, flush to the top edge of the card. Full-bleed photography appears only in a campaign hero. No textures, patterns, or illustrations — the system makes room for photography.

**Corners and borders.** Buttons are rectangular at `--radius-control` (4px) — an action should read like a control. Chips, tags, and compact steppers stay fully pill-shaped (`--radius-pill`); that difference is what separates a filter you toggle from an action you commit to. Cards and fields use 10px (`--radius-md`), modals 14px, inputs 6px. Borders are 1px and low contrast (`--border-subtle`); prefer space over a divider.

**Shadow.** Four levels, all soft and none of them cold. Cards carry no shadow by default; shadow signals either **interaction** (`--shadow-300` on hover) or layering (popover 300, modal 400).

**Interaction states.** Hover is one step darker (`--color-primary-hover`) or a neutral ground (`--surface-hover`) — never an opacity change. Press is one step darker again, with no scaling. Focus is a 2px green ring at 2px offset (`--focus-ring`), or a 3px light green halo on inputs. Disabled is a neutral ground plus `--text-disabled`, with a `not-allowed` cursor.

**Motion.** Short and functional: 140ms hover, 220ms for layers that open, 360ms for modals. One default curve, `cubic-bezier(.2,0,0,1)`. No bouncing, springing, or spinning. Page transitions are not animated.

**Transparency and blur.** Only on the modal scrim (`--surface-overlay`, 56% black). Blur is not used.

**Layout.** 1280px maximum width, 24px gutters, long-form text capped at 720px. The top bar is sticky; the side menu is not.

## Content fundamentals

- **Language and address:** English, second person ("what you're looking for", "you'll get your money back"). A formal register is reserved for legal and payment copy.
- **Casing:** Sentence case everywhere — buttons, headings, and labels included. Only overlines are uppercase.
- **Button text:** Verb plus object, three words at most. "Add to cart", "Go to checkout", "Create listing". Empty verbs like "OK" and "Submit" are not used.
- **Length:** Headings run to 8 words or fewer, helper text is one sentence, and empty-state copy never exceeds two.
- **Numbers:** English formatting — comma thousands separator, decimal point, currency symbol leading: `₺2,480`, `99.2%`.
- **Error text:** Say what happened and what to do, without blaming: "Enter a valid postcode." — not "Invalid input!"
- **No emoji.** No exclamation marks.

## Iconography

No icon set was supplied. **Lucide** (24×24 grid, 1.75 stroke, rounded caps) is used as a stand-in via CDN — its thin, neutral line sits well against the weight of Public Sans. Note that this is a substitute: if the brand supplies its own icon set, put it under `assets/icons/` and swap the `<Icon>` wrapper in the UI kit. Icons always take `currentColor`, never carry meaning on their own (there is always adjacent text or an `aria-label`), and emoji and unicode characters are never used in place of an icon.

## Components

34 components across six groups:

| Group | Components |
|---|---|
| `components/core/` | Button, IconButton, Card, Badge, Tag |
| `components/forms/` | Input, Select, Combobox, MultiSelect, TreeSelect, Textarea, Checkbox, Radio, Switch, Slider, QuantityStepper |
| `components/navigation/` | Tabs, SegmentedControl, Pagination, Breadcrumb, Steps |
| `components/data/` | Table, Avatar, Rating, ProgressBar, Skeleton, Accordion |
| `components/overlays/` | Drawer, Popover, Menu |
| `components/feedback/` | Dialog, Alert, Toast, Tooltip |

Form fields are 38px tall with 14px text (rather than the earlier 44px/16px), so a six-field form fits without folding. The Select and Combobox chevron is a 16px stroked SVG, not a 12px text character.

Each component ships as `<Name>.jsx` (named export) plus `<Name>.d.ts` (the props contract) plus `<Name>.prompt.md` (when to use it). Styling goes through CSS custom properties only; no component hardcodes a colour.

**Because no source inventory existed**, a broad set was written — the brief did not include a component inventory. If the brand supplies its own inventory, this list should be narrowed or extended to match.

## Usage guides

In-depth usage documentation lives under `usage/`. Every page follows the same shape: a decision table (which control, when), anatomy, variants, behaviour (states, keyboard, loading/empty/error), do/don't pairs, content rules, and accessibility.

| Page | Covers |
|---|---|
| `usage/selection-inputs.html` | Select, Combobox, grouped, MultiSelect (tags/count), TreeSelect — 6 variants |
| `usage/button.html` | Button vs link, hierarchy, 5 variants, sizing, icons, loading, groups |
| `usage/table.html` | Table/list/card choice, alignment, density, selection, bulk actions, sorting |
| `usage/input.html` | Input types, prefix/suffix, textarea, width, validation timing |
| `usage/tabs.html` | Tabs/segmented/side-nav choice, counts, nesting, URLs, overflow |
| `usage/accordion.html` | When to hide content, single/multiple, metadata headers, deep linking |
| `usage/choice-controls.html` | Checkbox vs Radio vs Switch, indeterminate, group layout, async errors |
| `usage/modal.html` | Overlay choice, confirmation/destructive/form dialogs, focus management |
| `usage/overlays.html` | Tooltip, Toast, Alert, Popover, Menu, Drawer — layer order, dismissal |
| `usage/form-layout.html` | Single column, field pairs, grouping, error summaries, stepped forms |

When writing a new usage page, use the shared CSS in `usage/_shell.json` — the pages should look identical.

## Interactive layer

`interactive.css` and `interactive.js` make the documented components actually work in the browser: real `:hover`, `:focus-visible`, `:active` and `:disabled` states, plus behaviour for tabs, accordions, dialogs, drawers, menus, comboboxes, sortable tables, toasts, and the rest. `components.html` is the live playground where all 34 run.

The runtime is vanilla, dependency-free, and event-delegated, driven by `data-*` attributes on the markup, so components added later work without re-initialisation. There is no build step.

## UI kit

- `ui_kits/storefront/` — a clickable four-screen marketplace: home, product detail, cart/checkout confirmation, and seller dashboard.

## Index

```
index.html              → visual reference: foundations, 34 components, 8 patterns, states, a11y audit
components.html         → live playground: all 34 components, working
styles.css              → entry point for every token
interactive.css         → interaction states for all components
interactive.js          → behaviour runtime (no dependencies)
tokens/                 → 8 token files
guidelines/             → 16 foundation cards (Colors, Type, Spacing, Brand)
components/             → 34 components in 6 groups — each with .jsx + .d.ts + .prompt.md
usage/                  → 10 in-depth usage guides
ui_kits/storefront/     → clickable product kit
handoff/                → Figma tokens (Tokens Studio) plus handoff notes
SKILL.md                → Claude Code / Agent Skills compatible entry point
```

## Gaps

- No logo or brand mark — a plain wordmark is used instead.
- No font files — Public Sans and IBM Plex Mono are pulled from Google Fonts.
- The icon set is a substitute (Lucide).
- Dark theme tokens are not defined yet.
- There is no DatePicker, FileUpload, or map component — add them if needed.
