import React from 'react';

export function Accordion({ items = [], openIndex = null, onToggle, style }) {
  const [internal, setInternal] = React.useState(openIndex);
  const current = onToggle ? openIndex : internal;
  const toggle = (i) => { if (onToggle) onToggle(current === i ? null : i); else setInternal(current === i ? null : i); };
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', fontFamily: 'var(--font-sans)', ...style }}>
      {items.map((it, i) => {
        const open = current === i;
        return (
          <div key={i} style={{ borderTop: i ? '1px solid var(--border-subtle)' : 'none' }}>
            <button aria-expanded={open} onClick={() => toggle(i)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-5)', width: '100%', textAlign: 'left', border: 0, background: 'transparent', cursor: 'pointer', padding: 'var(--space-5) var(--space-6)', fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', fontWeight: 600, color: 'var(--text-primary)' }}>
              {it.title}
              <span style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)', lineHeight: 1 }}>▾</span>
            </button>
            {open ? <div style={{ padding: '0 var(--space-6) var(--space-6)', fontSize: 'var(--font-size-300)', lineHeight: 'var(--line-height-normal)', color: 'var(--text-secondary)' }}>{it.content}</div> : null}
          </div>
        );
      })}
    </div>
  );
}
