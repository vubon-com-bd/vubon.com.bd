import type { ButtonHTMLAttributes } from 'react';

export interface SwitchProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onChange' | 'type' | 'value'
> {
  readonly checked: boolean;
  readonly onCheckedChange: (checked: boolean) => void;
  readonly label?: string;
}
