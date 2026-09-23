import * as React from 'react';

/** Interactive filter chip — selectable and/or removable. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  selected?: boolean;
  onSelect?: (e: React.MouseEvent) => void;
  onRemove?: (e: React.MouseEvent) => void;
}
export declare function Tag(props: TagProps): JSX.Element;
