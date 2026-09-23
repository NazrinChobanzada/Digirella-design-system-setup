import * as React from 'react';

export interface SelectOption { value: string; label: string; }

/** Native select with design-system chrome. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options?: SelectOption[];
}
export declare function Select(props: SelectProps): JSX.Element;
