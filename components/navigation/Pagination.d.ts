import * as React from 'react';

/**
 * Page-by-page navigation for result lists.
 * @startingPoint section="Navigation" subtitle="Pagination" viewport="700x120"
 */
export interface PaginationProps {
  page?: number;
  pageCount?: number;
  /** Pages shown either side of the current one. Default 1. */
  siblings?: number;
  onChange?: (page: number) => void;
  style?: React.CSSProperties;
}
export declare function Pagination(props: PaginationProps): JSX.Element;
