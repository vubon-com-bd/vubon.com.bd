import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface ScreenReaderOnlyProps extends HTMLAttributes<HTMLSpanElement> {
  readonly children: ReactNode;
}

/**
 * Content visible to screen readers only.
 * Uses the standard `.sr-only` pattern.
 */
export const ScreenReaderOnly = forwardRef<HTMLSpanElement, ScreenReaderOnlyProps>(
  function ScreenReaderOnly({ className, children, ...rest }, ref) {
    return (
      <span ref={ref} className={cn('sr-only', className)} {...rest}>
        {children}
      </span>
    );
  }
);

ScreenReaderOnly.displayName = 'ScreenReaderOnly';
