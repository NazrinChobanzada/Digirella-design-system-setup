import * as React from 'react';

/** Determinate progress for uploads, profile completion, stock levels. */
export interface ProgressBarProps {
  value?: number;
  max?: number;
  label?: string;
  tone?: 'brand' | 'warning' | 'danger';
  showValue?: boolean;
  style?: React.CSSProperties;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
