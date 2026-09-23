A modal for confirmations and short tasks. Actions sit bottom right, with the primary action furthest right.

```jsx
<Dialog open={o} title="Cancel this order?" description="This can't be undone."
  onClose={close} footer={<><Button variant="ghost" onClick={close}>Cancel</Button><Button variant="danger">Cancel order</Button></>} />
```

Form dialogs add `showClose`, a `subtitle` naming the object, and `dividedFooter`. Use `onRequestClose` to guard a dirty form — return `false` and the dialog stays open so you can confirm discarding.

Focus is managed for you: focus moves in on open, is trapped while open, and returns to the trigger on close. Escape always closes.
