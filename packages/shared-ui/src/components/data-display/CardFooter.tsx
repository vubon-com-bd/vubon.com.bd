'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(function CardFooter(
  { children, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end gap-2 border-t border-slate-200 pt-3 dark:border-slate-700',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'CardFooter';
