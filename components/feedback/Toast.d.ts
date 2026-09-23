import * as React from 'react';

/** Transient confirmation or error message. */
export interface ToastProps {
  tone?: 'success' | 'info' | 'warning' | 'danger';
  title?: string;
  message?: string;
  action?: React.ReactNode;
  onDismiss?: () => void;
}
export declare function Toast(props: ToastProps): JSX.Element;
