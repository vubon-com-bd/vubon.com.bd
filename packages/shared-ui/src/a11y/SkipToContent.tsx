'use client';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cn } from '../utils/cn';

export interface SkipToContentProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  readonly targetId?: string;
  readonly label?: string;
}

/**
 * Skip-to-content link.
 * Becomes visible on focus; jumps to the target element.
 */
export const SkipToContent = forwardRef<
  HTMLAnchorElement,
  SkipToContentProps
>(function SkipToContent(
  { targetId = 'main-content', label = 'Skip to content', className, ...rest },
  ref,
) {
  return (
    <a
      ref={ref}
      href={`#${targetId}`}
      className={cn(
        'sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-slate-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500',
        className,
      )}
      {...rest}
    >
      {label}
    </a>
  );
});

SkipToContent.displayName = 'SkipToContent';
