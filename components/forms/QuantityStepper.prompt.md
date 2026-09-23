Cart and listing quantities. Caps at `max` (usually stock) and disables the button rather than clamping silently.

```jsx
<QuantityStepper value={qty} max={stock} onChange={setQty} />
```
