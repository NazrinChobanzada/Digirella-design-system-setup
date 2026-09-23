import * as React from 'react';

/**
 * Primary action control. Pill-shaped, primary variant carries the brand green.
 * @startingPoint section="Core" subtitle="Button variants and sizes" viewport="700x200"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. One primary button per view. */
  variant?: 'primary' | 'secondary' | 'subtle' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  iconStart?: React.ReactNode;
  iconEnd?: React.ReactNode;
}
export declare function Button(props: ButtonProps): JSX.Element;
