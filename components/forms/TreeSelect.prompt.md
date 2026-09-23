Choice from a hierarchy the user must see to understand — marketplace category trees, location by country → city, account structures.

```jsx
<TreeSelect label="Category" nodes={categoryTree} value={cat} onChange={setCat} />
```

Only leaves are selectable; parent rows expand instead. The field shows the full path (`Electronics / Audio / Headphones`) because a leaf label alone is often ambiguous — "Cases" means nothing without its parent.

Three levels is the practical limit. Deeper than that, users lose their place: use a Combobox over flattened paths instead.
