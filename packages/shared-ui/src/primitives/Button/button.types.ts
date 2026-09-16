import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariants } from './button.variants';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color'>, ButtonVariants {
  readonly children?: ReactNode;
  readonly loading?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
}
