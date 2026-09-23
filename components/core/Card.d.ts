import * as React from 'react';

/**
 * Neutral surface container.
 * @startingPoint section="Core" subtitle="Surface container — flat, raised, floating" viewport="700x200"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 'flat' | 'raised' | 'floating';
  padding?: string;
  /** Adds hover lift + pointer cursor. */
  interactive?: boolean;
}
export declare function Card(props: CardProps): JSX.Element;
