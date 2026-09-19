'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CenterProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly inline?: boolean;
  readonly minHeight?: number | string;
}

export const Center = forwardRef<HTMLDivElement, CenterProps>(function Center(
  { children, inline, minHeight, className, style, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      style={{ minHeight, ...style }}
      className={cn(inline ? 'inline-flex' : 'flex', 'items-center justify-center', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

Center.displayName = 'Center';
