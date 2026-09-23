import React from 'react';

export function Steps({ items = [], current = 0, style }) {
  return (
    <ol style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', listStyle: 'none', margin: 0, padding: 0, fontFamily: 'var(--font-sans)', ...style }}>
      {items.map((it, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <li style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <span style={{
                width: 26, height: 26, flex: '0 0 26px', borderRadius: 'var(--radius-circle)',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'var(--font-size-200)', fontWeight: 600,
                background: done ? 'var(--color-primary)' : active ? 'var(--surface-brand-subtle)' : 'var(--surface-sunken)',
                color: done ? 'var(--color-on-primary)' : active ? 'var(--text-brand)' : 'var(--text-tertiary)',
                border: active ? '1px solid var(--color-primary)' : '1px solid transparent',
              }}>{done ? '✓' : i + 1}</span>
              <span style={{ fontSize: 'var(--font-size-300)', fontWeight: active ? 600 : 500, color: active ? 'var(--text-primary)' : done ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>{it.label}</span>
            </li>
            {i < items.length - 1 ? <span style={{ flex: 1, minWidth: 24, height: 1, background: done ? 'var(--color-primary)' : 'var(--border-default)' }} /> : null}
          </React.Fragment>
        );
      })}
    </ol>
  );
}
