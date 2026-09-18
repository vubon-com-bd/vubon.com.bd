'use client';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ReturnLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
}

export const ReturnLink = forwardRef<HTMLAnchorElement, ReturnLinkProps>(function ReturnLink(
  { children, className, ...rest },
  ref
) {
  return (
    <a
      ref={ref}
      className={cn(
        'inline-flex items-center gap-1 text-sm text-blue-600 hover:underline',
        className
      )}
      {...rest}
    >
      <span aria-hidden="true">←</span>
      {children}
    </a>
  );
});

ReturnLink.displayName = 'ReturnLink';
