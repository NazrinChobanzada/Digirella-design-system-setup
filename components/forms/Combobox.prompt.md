Searchable single select. Use above ~10 options, where a plain `Select` becomes a scroll chore (categories, cities, brands).

```jsx
<Combobox label="Category" options={cats} value={cat} onChange={setCat} />
```

Keyboard: ↑/↓ move, Enter picks, Esc closes. `meta` on an option renders a right-aligned hint (e.g. result count).
