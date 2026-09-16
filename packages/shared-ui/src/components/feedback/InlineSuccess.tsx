'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface InlineSuccessProps extends HTMLAttributes<HTMLParagraphElement> {
  readonly message?: string;
}

export const InlineSuccess = forwardRef<HTMLParagraphElement, InlineSuccessProps>(
  function InlineSuccess({ message, className, children, ...rest }, ref) {
    const content = message ?? children;
    if (!content) return null;
    return (
      <p
        ref={ref}
        role="status"
        className={cn('text-xs text-green-600', className)}
        {...rest}
      >
        {content}
      </p>
    );
  },
);

InlineSuccess.displayName = 'InlineSuccess';
