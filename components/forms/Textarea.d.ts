import * as React from 'react';

/** Multi-line text field with optional character counter. */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  error?: string;
  /** Shows a live counter when set. */
  maxLength?: number;
}
export declare function Textarea(props: TextareaProps): JSX.Element;
