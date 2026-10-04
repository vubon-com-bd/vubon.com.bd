'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ToolbarProps extends HTMLAttributes<HTMLDivElement> {
  readonly left?: ReactNode;
  readonly center?: ReactNode;
  readonly right?: ReactNode;
  readonly sticky?: boolean;
}

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { left, center, right, sticky, className, children, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="toolbar"
      className={cn(
        'flex flex-wrap items-center gap-2 rounded-md border border-slate-200 bg-white p-2',
        sticky && 'sticky top-14 z-[1100]',
        className
      )}
      {...rest}
    >
      {left && <div className="flex items-center gap-2">{left}</div>}
      {center && <div className="flex flex-1 items-center justify-center gap-2">{center}</div>}
      {right && <div className="ml-auto flex items-center gap-2">{right}</div>}
      {children}
    </div>
  );
});

Toolbar.displayName = 'Toolbar';
