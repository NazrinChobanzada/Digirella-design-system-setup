import * as React from 'react';

export interface StepItem { label: string; }

/** Linear progress through a multi-step flow. */
export interface StepsProps {
  items?: StepItem[];
  /** Zero-based index of the active step. */
  current?: number;
  style?: React.CSSProperties;
}
export declare function Steps(props: StepsProps): JSX.Element;
