import type { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  readonly invalid?: boolean;
  readonly sizeVariant?: 'sm' | 'md' | 'lg';
}
