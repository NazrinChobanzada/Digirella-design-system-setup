import * as React from 'react';

export interface ComboboxOption { value: string; label: string; meta?: string; }

/**
 * Type-ahead single select for long option lists.
 * @startingPoint section="Forms" subtitle="Searchable select field" viewport="700x260"
 */
export interface ComboboxProps {
  label?: string;
  hint?: string;
  options?: ComboboxOption[];
  value?: string;
  placeholder?: string;
  emptyText?: string;
  onChange?: (value: string) => void;
  style?: React.CSSProperties;
}
export declare function Combobox(props: ComboboxProps): JSX.Element;
