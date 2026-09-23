import React from 'react';

export function Avatar({ name = '', src, size = 36, shape = 'circle', badge, style }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
  return (
    <span style={{ position: 'relative', display: 'inline-flex', ...style }}>
      <span style={{
        width: size, height: size, borderRadius: shape === 'circle' ? 'var(--radius-circle)' : 'var(--radius-sm)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        background: 'var(--surface-brand-subtle)', color: 'var(--text-brand)',
        fontFamily: 'var(--font-sans)', fontSize: Math.round(size * 0.38), fontWeight: 600,
        border: '1px solid var(--color-primary-border)',
      }}>
        {src ? <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials}
      </span>
      {badge ? (
        <span style={{
          position: 'absolute', right: -1, bottom: -1, width: Math.max(10, size * 0.28), height: Math.max(10, size * 0.28),
          borderRadius: 'var(--radius-circle)', background: badge === 'online' ? 'var(--status-success)' : 'var(--neutral-40)',
          border: '2px solid var(--surface-card)',
        }} />
      ) : null}
    </span>
  );
}
