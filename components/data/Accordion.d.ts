import * as React from 'react';

export interface AccordionItem { title: string; content: React.ReactNode; }

/** Disclosure list. One panel open at a time. */
export interface AccordionProps {
  items?: AccordionItem[];
  openIndex?: number | null;
  onToggle?: (index: number | null) => void;
  style?: React.CSSProperties;
}
export declare function Accordion(props: AccordionProps): JSX.Element;
