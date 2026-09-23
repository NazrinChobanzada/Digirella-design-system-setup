import * as React from 'react';

export interface TableColumn {
  key: string;
  header: string;
  /** CSS grid track, e.g. "2fr" or "120px". Default "1fr". */
  width?: string;
  align?: 'left' | 'center' | 'right';
  render?: (row: any) => React.ReactNode;
}

/**
 * Grid-based data table with hover rows and optional selection.
 * @startingPoint section="Data" subtitle="Data table" viewport="700x320"
 */
export interface TableProps {
  columns?: TableColumn[];
  rows?: any[];
  /** Row padding. "comfortable" 46px (default), "compact" 38px for long scanning lists. */
  density?: 'comfortable' | 'compact';
  selectable?: boolean;
  selected?: string[];
  onSelect?: (id: string) => void;
  empty?: string;
  style?: React.CSSProperties;
}
export declare function Table(props: TableProps): JSX.Element;
