Row and toolbar actions. Destructive entries use `tone: 'danger'` and sit last, below a divider.

```jsx
<Menu open={o} onClose={close} align="end" trigger={<IconButton label="More">⋯</IconButton>}
  items={[{value:'edit',label:'Edit listing'},{divider:true},{value:'del',label:'Delete',tone:'danger'}]} />
```
