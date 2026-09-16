import type { HTMLAttributes, ReactNode } from 'react';
import type { BadgeVariants } from './badge.variants';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {
  readonly children: ReactNode;
}
