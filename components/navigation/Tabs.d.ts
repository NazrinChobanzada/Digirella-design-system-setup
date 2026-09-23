import * as React from 'react';

export interface TabItem { value: string; label: string; count?: number; }

/**
 * Horizontal view switcher with a brand-green active underline.
 * @startingPoint section="Navigation" subtitle="View switcher" viewport="700x120"
 */
export interface TabsProps {
  items?: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
}
export declare function Tabs(props: TabsProps): JSX.Element;
