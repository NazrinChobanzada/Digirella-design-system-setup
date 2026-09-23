# Deploy

The design system is static HTML and CSS. No build step, no dependencies, no framework — every page opens directly from the file system and works the same on a server.

## VS Code

1. Download the project (zip) and unpack it, or clone it once it is on GitHub.
2. `code .` in the folder.
3. Install the **Live Server** extension and click *Go Live*, or run `npx serve .` — either serves `index.html` at the root.

There is nothing to compile. Editing `tokens/colors.css` and refreshing is the whole loop.

## Vercel

```bash
npx vercel          # preview deployment
npx vercel --prod   # production
```

Framework preset: **Other**. Build command: none. Output directory: `.` (the repository root). `vercel.json` is already set up with clean URLs, so `/usage/button` works as well as `/usage/button.html`.

Via the dashboard instead: push to GitHub, then *Add New → Project → Import*, accept the defaults, deploy. Every push then gets a preview URL, which is the useful part — design review happens on a link rather than on screenshots.

## What ends up published

```
index.html              visual reference: foundations, components, patterns, states, a11y audit
usage/*.html            10 in-depth usage guides
styles.css → tokens/    the only thing an app needs to import
components/             34 React components (.jsx + .d.ts + .prompt.md)
ui_kits/storefront/     clickable product screens
handoff/                Figma tokens + handoff notes
```

`components/*.jsx` are shipped as source for the frontend team to copy — they are not loaded by any published page, so nothing needs transpiling at deploy time. The one exception is `ui_kits/storefront/index.html`, which transpiles in the browser via Babel standalone; that is deliberate for a reference prototype and should not be copied into production.

## Custom domain

Add it in the Vercel project's *Domains* tab. A design system usually earns a subdomain — `design.yourcompany.com` — so the URL is memorable enough for engineers to reach for it.
