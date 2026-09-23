Listing, order and payout tables. Numeric columns get `align: 'right'` — the component then applies tabular figures automatically.

```jsx
<Table columns={[{key:'title',header:'Listing',width:'2fr'},{key:'price',header:'Price',align:'right'}]} rows={rows} />
```

Rows are divided by hairlines, never striped. Row hover is `--surface-hover` with no shadow.

`density="compact"` (38px rows) for dashboards and lists past twenty rows where the user scans rather than reads. Comfortable (46px) is required whenever rows carry thumbnails or two lines of text.
