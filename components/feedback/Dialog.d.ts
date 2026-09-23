import * as React from 'react';

/**
 * Modal dialog for confirmations and short focused tasks.
 * Traps focus, closes on Escape, restores focus to the trigger, and caps at 80vh
 * with only the body scrolling.
 * @startingPoint section="Feedback" subtitle="Modal dialog" viewport="700x360"
 */
export interface DialogProps {
  open?: boolean;
  title?: string;
  /** Second line under the title — name the object being edited in a form dialog. */
  subtitle?: string;
  description?: string;
  /** Called to dismiss. Also fired by Escape, scrim click and the close button. */
  onClose?: () => void;
  /** Guard run before closing; return false to keep the dialog open (dirty forms). */
  onRequestClose?: () => boolean | void;
  footer?: React.ReactNode;
  /** Footer gets its own padding and a top border — use for form dialogs. */
  dividedFooter?: boolean;
  /** Header close button. Form dialogs yes, confirmations no. */
  showClose?: boolean;
  /** Element focused on open. Defaults to the first focusable in the dialog. */
  initialFocusRef?: React.RefObject<HTMLElement>;
  children?: React.ReactNode;
  width?: number;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
