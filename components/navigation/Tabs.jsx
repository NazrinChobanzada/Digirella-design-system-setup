import React from 'react';

export function Tabs({ items = [], value, onChange, style }) {
  return (
    <div role="tablist" style={{ display: 'flex', gap: 'var(--space-7)', borderBottom: '1px solid var(--border-subtle)', fontFamily: 'var(--font-sans)', ...style }}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button key={it.value} role="tab" aria-selected={active} onClick={() => onChange && onChange(it.value)}
            style={{
              border: 0, background: 'transparent', cursor: 'pointer', padding: 'var(--space-4) 0',
              fontSize: 'var(--font-size-300)', fontWeight: active ? 'var(--font-weight-semibold)' : 'var(--font-weight-medium)',
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: active ? 'inset 0 -2px 0 var(--color-primary)' : 'none',
              transition: 'var(--transition-interactive)',
              display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
            }}>
            {it.label}
            {it.count != null ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{it.count}</span> : null}
          </button>
        );
      })}
    </div>
  );
}
