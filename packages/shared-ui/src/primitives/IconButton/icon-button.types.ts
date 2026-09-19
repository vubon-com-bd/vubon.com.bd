import type { ButtonHTMLAttributes, ReactNode } from 'react';
import type { ButtonVariants } from '../Button/button.variants';

export interface IconButtonProps
  extends
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'color' | 'children'>,
    Omit<ButtonVariants, 'fullWidth'> {
  /** Required for accessibility — describes the icon's meaning. */
  readonly 'aria-label': string;
  readonly children: ReactNode;
}
