Search results and dashboard tables. First and last page are always visible; the middle collapses to `…`.

```jsx
<Pagination page={p} pageCount={24} onChange={setP} />
```

Pair it with a result count above the list ("1–24 of 486"). Use infinite scroll only on mobile feeds, never on tables.
