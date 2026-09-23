import * as React from 'react';

export interface MenuItem {
  value?: string;
  label?: string;
  icon?: React.ReactNode;
  shortcut?: string;
  tone?: 'default' | 'danger';
  disabled?: boolean;
  divider?: boolean;
}

/** Dropdown list of actions attached to a trigger. */
export interface MenuProps {
  open?: boolean;
  trigger: React.ReactNode;
  items?: MenuItem[];
  align?: 'start' | 'end';
  width?: number;
  onClose?: () => void;
  onSelect?: (value: string) => void;
}
export declare function Menu(props: MenuProps): JSX.Element;
