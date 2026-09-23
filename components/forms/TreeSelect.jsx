import React from 'react';

export function TreeSelect({ label, hint, nodes = [], value, expandedKeys = [], onChange, onExpand, placeholder = 'Select a category', style }) {
  const [open, setOpen] = React.useState(false);
  const [internalExpanded, setInternalExpanded] = React.useState(expandedKeys);
  const ref = React.useRef(null);
  const expanded = onExpand ? expandedKeys : internalExpanded;

  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const toggleExpand = (key) => {
    const next = expanded.includes(key) ? expanded.filter((k) => k !== key) : [...expanded, key];
    onExpand ? onExpand(next) : setInternalExpanded(next);
  };

  const findPath = (list, target, trail = []) => {
    for (const n of list) {
      const t = [...trail, n.label];
      if (n.value === target) return t;
      if (n.children) { const r = findPath(n.children, target, t); if (r) return r; }
    }
    return null;
  };
  const path = value ? findPath(nodes, value) : null;

  const render = (list, depth = 0) => list.map((n) => {
    const hasKids = n.children && n.children.length > 0;
    const isOpen = expanded.includes(n.value);
    const selected = n.value === value;
    return (
      <React.Fragment key={n.value}>
        <div
          onClick={() => { if (hasKids) toggleExpand(n.value); else { onChange && onChange(n.value); setOpen(false); } }}
          style={{
            display: 'flex', alignItems: 'center', gap: 'var(--space-3)', cursor: 'pointer',
            padding: '8px var(--space-4)', paddingLeft: 'calc(var(--space-4) + ' + depth * 18 + 'px)',
            borderRadius: 'var(--radius-xs)', fontSize: 'var(--font-size-300)',
            background: selected ? 'var(--surface-brand-subtle)' : 'transparent',
            color: selected ? 'var(--text-brand)' : 'var(--text-primary)',
            fontWeight: selected ? 600 : hasKids ? 500 : 400,
          }}>
          <span style={{ width: 12, flex: '0 0 12px', color: 'var(--text-tertiary)', fontSize: 10, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)' }}>{hasKids ? '▶' : ''}</span>
          {n.label}
          {n.count != null ? <span style={{ marginLeft: 'auto', fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{n.count}</span> : null}
        </div>
        {hasKids && isOpen ? render(n.children, depth + 1) : null}
      </React.Fragment>
    );
  });

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'var(--font-sans)', position: 'relative', ...style }}>
      {label ? <label style={{ fontSize: 'var(--type-label-size)', fontWeight: 'var(--type-label-weight)' }}>{label}</label> : null}
      <div onClick={() => setOpen(!open)} style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-4)', minHeight: 38, cursor: 'pointer',
        background: 'var(--surface-card)', borderRadius: 'var(--radius-sm)', padding: '8px var(--space-4)',
        border: '1px solid ' + (open ? 'var(--border-focus)' : 'var(--border-control)'),
        boxShadow: open ? '0 0 0 3px var(--green-05)' : 'none', transition: 'var(--transition-interactive)',
      }}>
        <span style={{ flex: 1, fontSize: 'var(--font-size-300)', color: path ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>
          {path ? path.map((p, i) => (
            <React.Fragment key={i}>
              {i > 0 ? <span style={{ color: 'var(--text-tertiary)', margin: '0 6px' }}>/</span> : null}
              <span style={{ color: i === path.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>{p}</span>
            </React.Fragment>
          )) : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ color: 'var(--text-secondary)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--duration-fast) var(--ease-standard)' }}>
          <path d="M4 6.5L8 10.5L12 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      {open ? (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 40, background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-300)', padding: 'var(--space-2)', maxHeight: 280, overflow: 'auto' }}>
          {render(nodes)}
        </div>
      ) : null}
      {hint ? <span style={{ fontSize: 'var(--font-size-200)', color: 'var(--text-tertiary)' }}>{hint}</span> : null}
    </div>
  );
}
