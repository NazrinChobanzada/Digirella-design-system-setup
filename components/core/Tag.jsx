import React from 'react';

export function Tag({ selected = false, onSelect, onRemove, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <span
      onClick={onSelect}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--font-size-300)', fontWeight: 'var(--font-weight-medium)', lineHeight: 1,
        padding: '8px 14px', borderRadius: 'var(--radius-pill)', cursor: onSelect ? 'pointer' : 'default',
        transition: 'var(--transition-interactive)',
        background: selected ? 'var(--color-primary)' : hover ? 'var(--surface-hover)' : 'var(--surface-card)',
        color: selected ? 'var(--color-on-primary)' : 'var(--text-primary)',
        border: '1px solid ' + (selected ? 'var(--color-primary)' : 'var(--border-default)'),
        ...style,
      }}
      {...rest}
    >
      {children}
      {onRemove ? <span onClick={(e) => { e.stopPropagation(); onRemove(e); }} style={{ cursor: 'pointer', opacity: 0.6, fontSize: 'var(--font-size-300)' }}>×</span> : null}
    </span>
  );
}
