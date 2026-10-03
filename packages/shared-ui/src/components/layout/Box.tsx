'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  readonly children?: ReactNode;
  readonly padding?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
  readonly margin?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
  readonly rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  readonly border?: boolean;
  readonly shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
}

const paddingClasses = {
  0: 'p-0',
  1: 'p-1',
  2: 'p-2',
  3: 'p-3',
  4: 'p-4',
  6: 'p-6',
  8: 'p-8',
} as const;

const marginClasses = {
  0: 'm-0',
  1: 'm-1',
  2: 'm-2',
  3: 'm-3',
  4: 'm-4',
  6: 'm-6',
  8: 'm-8',
} as const;

const roundedClasses = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  full: 'rounded-full',
} as const;

const shadowClasses = {
  none: 'shadow-none',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
  xl: 'shadow-xl',
} as const;

export const Box = forwardRef<HTMLDivElement, BoxProps>(function Box(
  { children, padding, margin, rounded, border, shadow, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        padding !== undefined && paddingClasses[padding],
        margin !== undefined && marginClasses[margin],
        rounded !== undefined && roundedClasses[rounded],
        border && 'border border-slate-200',
        shadow !== undefined && shadowClasses[shadow],
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Box.displayName = 'Box';
