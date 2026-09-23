import * as React from 'react';

/** Small status marker; not interactive. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'neutral' | 'success' | 'info' | 'warning' | 'danger' | 'brand';
}
export declare function Badge(props: BadgeProps): JSX.Element;
