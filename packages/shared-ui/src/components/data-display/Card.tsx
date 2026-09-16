'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly padding?: 'none' | 'sm' | 'md' | 'lg';
  readonly variant?: 'default' | 'outline' | 'elevated';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
} as const;

const variantClasses = {
  default: 'border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800',
  outline: 'border-2 border-slate-300 bg-transparent dark:border-slate-600',
  elevated: 'border border-slate-200 bg-white shadow-md dark:border-slate-700 dark:bg-slate-800',
} as const;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { children, padding = 'md', variant = 'default', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'rounded-lg',
        paddingClasses[padding],
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Card.displayName = 'Card';
