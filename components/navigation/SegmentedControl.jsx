import React from 'react';

export function SegmentedControl({ items = [], value, size = 'medium', onChange, style }) {
  const pad = size === 'small' ? '6px var(--space-4)' : '8px var(--space-5)';
  const fs = size === 'small' ? 'var(--font-size-200)' : 'var(--font-size-300)';
  return (
    <div role="tablist" style={{ display: 'inline-flex', gap: 2, padding: 3, background: 'var(--surface-sunken)', borderRadius: 'var(--radius-pill)', ...style }}>
      {items.map((it) => {
        const active = it.value === value;
        return (
          <button key={it.value} role="tab" aria-selected={active} onClick={() => onChange && onChange(it.value)}
            style={{
              border: 0, cursor: 'pointer', padding: pad, borderRadius: 'var(--radius-pill)',
              fontFamily: 'var(--font-sans)', fontSize: fs, fontWeight: active ? 600 : 500,
              background: active ? 'var(--surface-card)' : 'transparent',
              color: active ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: active ? 'var(--shadow-100)' : 'none',
              transition: 'var(--transition-interactive)',
            }}>{it.label}</button>
        );
      })}
    </div>
  );
}
