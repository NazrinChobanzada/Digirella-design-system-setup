# Storefront UI kit

Four screens of the marketplace storefront, clickable in a single file: **Home → Product → Cart/Checkout → Seller dashboard**.

- `index.html` — a clickable prototype running on React + Babel. Tokens come in through `../../styles.css`.
- The components here mirror the primitives in `components/` (Button, Badge, Tag, Card, Tabs, Toast). They're lightweight copies rewritten for the kit; in production, use the ones in `components/`.
- Photos are striped placeholders. Add real images under `assets/` and swap out the `.ph` blocks.
- Icons are Lucide, via CDN. Replace them if the brand supplies its own icon set.

Flow: click a product card → product page → "Add to cart" → toast bottom right → "Go to cart" → "Checkout" → order confirmation.
