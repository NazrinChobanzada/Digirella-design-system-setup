import * as React from 'react';

/**
 * Single-line text field with label, hint and error slot.
 * @startingPoint section="Forms" subtitle="Labelled text field" viewport="700x200"
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  /** Presence switches the field to the error state. */
  error?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}
export declare function Input(props: InputProps): JSX.Element;
