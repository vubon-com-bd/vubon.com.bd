'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
  readonly left?: ReactNode;
  readonly center?: ReactNode;
  readonly right?: ReactNode;
  readonly sticky?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(function Navbar(
  { left, center, right, sticky, className, children, ...rest },
  ref,
) {
  return (
    <header
      ref={ref}
      className={cn(
        'flex h-14 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4',
        sticky && 'sticky top-0 z-[1100]',
        className,
      )}
      {...rest}
    >
      <div className="flex items-center gap-2">{left}</div>
      {center && <div className="flex flex-1 items-center justify-center">{center}</div>}
      <div className="flex items-center gap-2">{right}</div>
      {children}
    </header>
  );
});

Navbar.displayName = 'Navbar';
