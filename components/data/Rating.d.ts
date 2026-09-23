import * as React from 'react';

/** Read-only five-star score with optional review count. */
export interface RatingProps {
  value?: number;
  count?: number;
  size?: number;
  showValue?: boolean;
  style?: React.CSSProperties;
}
export declare function Rating(props: RatingProps): JSX.Element;
