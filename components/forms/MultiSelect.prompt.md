Multiple choice where the selections must stay visible — categories on a listing, shipping regions, notification types.

```jsx
<MultiSelect label="Ships to" options={regions} value={v} onChange={setV} />
```

`display="tags"` (default) when users need to see and remove individual choices. `display="count"` when typical selections exceed about eight and the field would otherwise dominate the form.

Below five options with no search need, a checkbox group is better — it needs no click to reveal.
