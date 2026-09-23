import * as React from 'react';

/** Instantly-applied setting toggle. */
export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  checked?: boolean;
}
export declare function Switch(props: SwitchProps): JSX.Element;
