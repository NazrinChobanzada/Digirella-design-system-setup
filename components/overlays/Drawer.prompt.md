Side panel for work that keeps page context: filters, mini cart, listing preview. Use a `Dialog` instead when the task must be finished or abandoned.

```jsx
<Drawer open={o} side="right" title="Filters" onClose={close}
  footer={<><Button variant="ghost">Clear</Button><Button>Show 128 results</Button></>}>…</Drawer>
```

`side="bottom"` is the mobile default. Esc closes; the sticky footer holds the commit action.
