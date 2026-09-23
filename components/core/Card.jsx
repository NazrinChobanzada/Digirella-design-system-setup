import React from 'react';

export function Card({ elevation = 'flat', padding = 'var(--space-6)', interactive = false, onClick, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const shadow = { flat: 'var(--shadow-none)', raised: 'var(--shadow-200)', floating: 'var(--shadow-300)' }[elevation] || 'var(--shadow-none)';
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)', border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)', padding, boxShadow: shadow,
        transition: 'box-shadow var(--duration-normal) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)',
        cursor: interactive ? 'pointer' : undefined,
        ...(interactive && hover ? { boxShadow: 'var(--shadow-300)', borderColor: 'var(--border-default)' } : null),
        ...style,
      }}
      {...rest}
    >{children}</div>
  );
}
