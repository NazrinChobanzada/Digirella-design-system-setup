import React from 'react';

export function Popover({ open = false, trigger, placement = 'bottom-start', width = 260, onClose, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose && onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open, onClose]);
  const pos = {
    'bottom-start': { top: 'calc(100% + 8px)', left: 0 },
    'bottom-end': { top: 'calc(100% + 8px)', right: 0 },
    'top-start': { bottom: 'calc(100% + 8px)', left: 0 },
    'top-end': { bottom: 'calc(100% + 8px)', right: 0 },
  }[placement];
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      {trigger}
      {open ? (
        <div style={{
          position: 'absolute', ...pos, width, zIndex: 60,
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-300)',
          padding: 'var(--space-6)', fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', color: 'var(--text-primary)',
        }}>{children}</div>
      ) : null}
    </span>
  );
}
