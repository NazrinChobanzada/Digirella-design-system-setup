import React from 'react';

export function Menu({ open = false, trigger, items = [], align = 'start', width = 220, onClose, onSelect }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose && onClose(); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open, onClose]);
  const [hover, setHover] = React.useState(null);
  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-flex' }}>
      {trigger}
      {open ? (
        <div role="menu" style={{
          position: 'absolute', top: 'calc(100% + 6px)', [align === 'end' ? 'right' : 'left']: 0, width, zIndex: 60,
          background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)',
          boxShadow: 'var(--shadow-300)', padding: 'var(--space-2)', fontFamily: 'var(--font-sans)',
        }}>
          {items.map((it, i) => it.divider ? (
            <div key={'d' + i} style={{ height: 1, background: 'var(--border-subtle)', margin: 'var(--space-2) 0' }} />
          ) : (
            <button key={it.value} role="menuitem" disabled={it.disabled}
              onMouseEnter={() => setHover(it.value)} onMouseLeave={() => setHover(null)}
              onClick={() => { onSelect && onSelect(it.value); onClose && onClose(); }}
              style={{
                display: 'flex', alignItems: 'center', gap: 'var(--space-3)', width: '100%', textAlign: 'left',
                border: 0, borderRadius: 'var(--radius-xs)', padding: '9px var(--space-4)', cursor: it.disabled ? 'not-allowed' : 'pointer',
                fontSize: 'var(--font-size-300)', fontFamily: 'var(--font-sans)',
                color: it.disabled ? 'var(--text-disabled)' : it.tone === 'danger' ? 'var(--text-danger)' : 'var(--text-primary)',
                background: hover === it.value && !it.disabled ? 'var(--surface-hover)' : 'transparent',
              }}>
              {it.icon}{it.label}
              {it.shortcut ? <span style={{ marginLeft: 'auto', fontFamily: 'var(--font-mono)', fontSize: 'var(--font-size-100)', color: 'var(--text-tertiary)' }}>{it.shortcut}</span> : null}
            </button>
          ))}
        </div>
      ) : null}
    </span>
  );
}
