'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface InlineErrorProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly message?: string;
}

export const InlineError = forwardRef<HTMLParagraphElement, InlineErrorProps>(function InlineError(
  { message, className, children, ...rest },
  ref
) {
  const content = message ?? children;
  if (!content) return null;
  return (
    <p ref={ref} role="alert" className={cn('text-xs text-red-600', className)} {...rest}>
      {content}
    </p>
  );
});

InlineError.displayName = 'InlineError';
