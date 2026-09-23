import * as React from 'react';

/**
 * Edge-anchored panel for filters, cart, and side tasks.
 * @startingPoint section="Overlays" subtitle="Edge-anchored panel" viewport="700x420"
 */
export interface DrawerProps {
  open?: boolean;
  side?: 'left' | 'right' | 'bottom';
  width?: number;
  title?: string;
  description?: string;
  onClose?: () => void;
  footer?: React.ReactNode;
  children?: React.ReactNode;
}
export declare function Drawer(props: DrawerProps): JSX.Element | null;
