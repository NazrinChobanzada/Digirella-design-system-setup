import * as React from 'react';

/** Multi-select boolean control. */
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  checked?: boolean;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
