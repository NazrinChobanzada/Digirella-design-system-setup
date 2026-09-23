import * as React from 'react';

/** Anchored, dismissible container for secondary content. */
export interface PopoverProps {
  open?: boolean;
  trigger: React.ReactNode;
  placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';
  width?: number;
  onClose?: () => void;
  children?: React.ReactNode;
}
export declare function Popover(props: PopoverProps): JSX.Element;
