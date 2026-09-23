import React from 'react';

export function Breadcrumb({ items = [], style }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap', fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-200)', ...style }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {last
              ? <span aria-current="page" style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{it.label}</span>
              : <a href={it.href || '#'} style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>{it.label}</a>}
            {last ? null : <span style={{ color: 'var(--text-tertiary)' }}>/</span>}
          </React.Fragment>
        );
      })}
    </nav>
  );
}
