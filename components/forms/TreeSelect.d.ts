import * as React from 'react';

export interface TreeNode {
  value: string;
  label: string;
  count?: number;
  children?: TreeNode[];
}

/**
 * Single choice from a hierarchy; only leaf nodes are selectable.
 * @startingPoint section="Forms" subtitle="Hierarchical selection" viewport="700x320"
 */
export interface TreeSelectProps {
  label?: string;
  hint?: string;
  nodes?: TreeNode[];
  value?: string;
  expandedKeys?: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
  onExpand?: (keys: string[]) => void;
  style?: React.CSSProperties;
}
export declare function TreeSelect(props: TreeSelectProps): JSX.Element;
