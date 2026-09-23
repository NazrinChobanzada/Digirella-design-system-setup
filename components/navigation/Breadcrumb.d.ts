import * as React from 'react';

export interface BreadcrumbItem { label: string; href?: string; }

/** Category trail. Max four levels; the last item is the current page. */
export interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  style?: React.CSSProperties;
}
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
