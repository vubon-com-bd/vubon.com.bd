import type { SelectHTMLAttributes, ReactNode } from 'react';

export interface SelectOption {
  readonly value: string;
  readonly label: string;
  readonly disabled?: boolean;
}

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'size' | 'children'
> {
  readonly invalid?: boolean;
  readonly sizeVariant?: 'sm' | 'md' | 'lg';
  readonly options?: readonly SelectOption[];
  readonly placeholder?: string;
  readonly children?: ReactNode;
}
