import type { HTMLAttributes, ReactNode } from 'react';
import type { ChipVariants } from './chip.variants';

export interface ChipProps extends HTMLAttributes<HTMLSpanElement>, ChipVariants {
  readonly children: ReactNode;
  readonly onRemove?: () => void;
  readonly removeLabel?: string;
}
