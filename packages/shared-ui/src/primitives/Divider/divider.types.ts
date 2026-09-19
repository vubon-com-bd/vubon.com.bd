import type { HTMLAttributes, ReactNode } from 'react';

export interface DividerProps extends HTMLAttributes<HTMLDivElement> {
  readonly orientation?: 'horizontal' | 'vertical';
  readonly label?: ReactNode;
  readonly spacing?: 'none' | 'sm' | 'md' | 'lg';
}
