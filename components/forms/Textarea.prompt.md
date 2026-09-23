Multi-line input for listing descriptions and messages. Set `maxLength` when the backend limits length — the counter is the only affordance users get.

```jsx
<Textarea label="Description" rows={5} maxLength={500} value={v} onChange={e => set(e.target.value)} />
```
