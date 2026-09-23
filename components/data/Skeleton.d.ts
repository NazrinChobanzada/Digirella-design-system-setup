import * as React from 'react';

/** Loading placeholder matching the shape of the content that will replace it. */
export interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  shape?: 'line' | 'block' | 'circle';
  style?: React.CSSProperties;
}
export declare function Skeleton(props: SkeletonProps): JSX.Element;
