import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface VisuallyHiddenProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  /** Show on focus (for skip links). */
  readonly focusable?: boolean;
}

/**
 * Visually hidden but accessible.
 * With `focusable`, the content becomes visible when focused.
 */
export const VisuallyHidden = forwardRef<HTMLDivElement, VisuallyHiddenProps>(
  function VisuallyHidden({ className, children, focusable = false, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          focusable
            ? 'absolute h-px w-px overflow-hidden whitespace-nowrap focus:static focus:h-auto focus:w-auto focus:overflow-visible focus:whitespace-normal'
            : 'sr-only',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

VisuallyHidden.displayName = 'VisuallyHidden';
