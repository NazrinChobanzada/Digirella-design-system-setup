import * as React from 'react';

/** Seller or user identity mark; falls back to initials. */
export interface AvatarProps {
  name?: string;
  src?: string;
  size?: number;
  shape?: 'circle' | 'square';
  badge?: 'online' | 'offline';
  style?: React.CSSProperties;
}
export declare function Avatar(props: AvatarProps): JSX.Element;
