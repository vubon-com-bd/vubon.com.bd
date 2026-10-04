import type { InputHTMLAttributes } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  readonly invalid?: boolean;
  readonly label?: string;
}
