import * as React from 'react';

/** Short hover/focus hint. Never holds essential information. */
export interface TooltipProps {
  content: React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}
export declare function Tooltip(props: TooltipProps): JSX.Element;
