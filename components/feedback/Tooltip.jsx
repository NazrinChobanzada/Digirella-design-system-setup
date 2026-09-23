import React from 'react';

export function Tooltip({ content, placement = 'top', children }) {
  const [open, setOpen] = React.useState(false);
  const pos = {
    top: { bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)' },
    bottom: { top: '100%', left: '50%', transform: 'translate(-50%, 8px)' },
    left: { right: '100%', top: '50%', transform: 'translate(-8px, -50%)' },
    right: { left: '100%', top: '50%', transform: 'translate(8px, -50%)' },
  }[placement];
  return (
    <span style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)} onBlur={() => setOpen(false)}>
      {children}
      {open ? (
        <span role="tooltip" style={{
          position: 'absolute', ...pos, whiteSpace: 'nowrap', zIndex: 50,
          background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
          fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-200)',
          padding: '6px 10px', borderRadius: 'var(--radius-xs)', boxShadow: 'var(--shadow-300)',
        }}>{content}</span>
      ) : null}
    </span>
  );
}
