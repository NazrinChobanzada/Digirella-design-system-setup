import * as React from 'react';

/** Single-value range control for price filters and quantities. */
export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'value'> {
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  /** Suffix shown next to the live value, e.g. " ₺". */
  unit?: string;
}
export declare function Slider(props: SliderProps): JSX.Element;
