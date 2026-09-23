import * as React from 'react';

export interface MultiSelectOption { value: string; label: string; meta?: string; }

/**
 * Multiple choice from a list, shown as removable tags or a count.
 * @startingPoint section="Forms" subtitle="Multiple selection" viewport="700x300"
 */
export interface MultiSelectProps {
  label?: string;
  hint?: string;
  error?: string;
  options?: MultiSelectOption[];
  value?: string[];
  /** "tags" shows each choice; "count" shows "N selected" — use above ~8 typical selections. */
  display?: 'tags' | 'count';
  /** Tags rendered before collapsing to "+N more". Default 3. */
  maxVisibleTags?: number;
  placeholder?: string;
  onChange?: (value: string[]) => void;
  style?: React.CSSProperties;
}
export declare function MultiSelect(props: MultiSelectProps): JSX.Element;
