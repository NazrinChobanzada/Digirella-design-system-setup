import React from 'react';

export function Table({ columns = [], rows = [], density = 'comfortable', selectable = false, selected = [], onSelect, empty = 'No results', style }) {
  const [hover, setHover] = React.useState(null);
  const grid = (selectable ? '40px ' : '') + columns.map((c) => c.width || '1fr').join(' ');
  const align = (c) => (c.align === 'right' ? 'right' : c.align === 'center' ? 'center' : 'left');
  const rowPadding = density === 'compact' ? 'var(--space-3) var(--space-6)' : 'var(--space-4) var(--space-6)';
  return (
    <div style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', overflow: 'hidden', fontFamily: 'var(--font-sans)', ...style }}>
      <div style={{ display: 'grid', gridTemplateColumns: grid, gap: 'var(--space-5)', padding: 'var(--space-4) var(--space-6)', background: 'var(--surface-sunken)' }}>
        {selectable ? <span /> : null}
        {columns.map((c) => (
          <span key={c.key} style={{ fontSize: 'var(--font-size-100)', fontWeight: 600, letterSpacing: 'var(--letter-spacing-wide)', textTransform: 'uppercase', color: 'var(--text-tertiary)', textAlign: align(c) }}>{c.header}</span>
        ))}
      </div>
      {rows.length === 0 ? (
        <div style={{ padding: 'var(--space-11)', textAlign: 'center', fontSize: 'var(--font-size-300)', color: 'var(--text-tertiary)' }}>{empty}</div>
      ) : rows.map((r, i) => (
        <div key={r.id || i}
          onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}
          style={{
            display: 'grid', gridTemplateColumns: grid, gap: 'var(--space-5)', alignItems: 'center',
            padding: rowPadding, borderTop: '1px solid var(--border-subtle)',
            background: hover === i ? 'var(--surface-hover)' : 'transparent',
            transition: 'background-color var(--duration-fast) var(--ease-standard)',
          }}>
          {selectable ? (
            <input type="checkbox" checked={selected.includes(r.id)} onChange={() => onSelect && onSelect(r.id)} style={{ accentColor: 'var(--color-primary)', width: 16, height: 16 }} />
          ) : null}
          {columns.map((c) => (
            <div key={c.key} style={{ fontSize: 'var(--font-size-300)', color: 'var(--text-primary)', textAlign: align(c), fontVariantNumeric: c.align === 'right' ? 'tabular-nums' : 'normal' }}>
              {c.render ? c.render(r) : r[c.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
