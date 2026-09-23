import * as React from 'react';

/** Small −/+ control for cart quantities. */
export interface QuantityStepperProps {
  value?: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  style?: React.CSSProperties;
}
export declare function QuantityStepper(props: QuantityStepperProps): JSX.Element;
