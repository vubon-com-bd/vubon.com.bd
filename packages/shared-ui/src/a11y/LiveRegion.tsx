'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export type LiveRegionPoliteness = 'off' | 'polite' | 'assertive';

export type LiveRegionRelevant =
  | 'additions'
  | 'removals'
  | 'text'
  | 'all'
  | 'additions removals'
  | 'additions text'
  | 'removals additions'
  | 'removals text'
  | 'text additions'
  | 'text removals';

export interface LiveRegionProps extends HTMLAttributes<HTMLDivElement> {
  readonly children?: ReactNode;
  readonly politeness?: LiveRegionPoliteness;
  readonly atomic?: boolean;
  readonly busy?: boolean;
  readonly relevant?: LiveRegionRelevant;
}

/**
 * ARIA live region for screen reader announcements.
 */
export const LiveRegion = forwardRef<HTMLDivElement, LiveRegionProps>(function LiveRegion(
  {
    children,
    politeness = 'polite',
    atomic = true,
    busy = false,
    relevant = 'additions text',
    className,
    ...rest
  },
  ref
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      aria-busy={busy || undefined}
      aria-relevant={relevant}
      className={cn('sr-only', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

LiveRegion.displayName = 'LiveRegion';
