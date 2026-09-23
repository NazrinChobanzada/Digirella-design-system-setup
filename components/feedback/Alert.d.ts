import * as React from 'react';

/** Persistent, page-level status message. */
export interface AlertProps {
  tone?: 'success' | 'info' | 'warning' | 'danger';
  title?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
export declare function Alert(props: AlertProps): JSX.Element;
