Continuous value where the exact number matters less than the relative position (price ceiling, distance radius).

```jsx
<Slider label="Max price" min={0} max={10000} step={100} value={p} unit=" ₺" onChange={e => setP(+e.target.value)} />
```

Always show the live value — a slider without a readout is unusable.
