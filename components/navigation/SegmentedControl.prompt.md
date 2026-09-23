Changes *how* content is shown (grid vs list, day vs week) — not which content. That is what `Tabs` is for.

```jsx
<SegmentedControl items={[{value:'grid',label:'Grid'},{value:'list',label:'List'}]} value={v} onChange={setV} />
```
