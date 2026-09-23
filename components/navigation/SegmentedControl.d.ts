import * as React from 'react';

export interface SegmentItem { value: string; label: string; }

/** Compact 2–4 option switch for display modes. */
export interface SegmentedControlProps {
  items?: SegmentItem[];
  value?: string;
  size?: 'small' | 'medium';
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
