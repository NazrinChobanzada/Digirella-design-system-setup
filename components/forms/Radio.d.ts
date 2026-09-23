import * as React from 'react';

/** One-of-many choice; always inside a shared `name` group. */
export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  checked?: boolean;
}
export declare function Radio(props: RadioProps): JSX.Element;
