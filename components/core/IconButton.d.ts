import * as React from 'react';

/** Circular, icon-only action. Always needs an accessible label. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required accessible name. */
  label: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'ghost' | 'outline' | 'solid';
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
