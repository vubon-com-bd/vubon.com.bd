'use client';
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  readonly children: ReactNode;
  readonly active?: boolean;
  readonly icon?: ReactNode;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  function NavLink({ children, active, icon, className, ...rest }, ref) {
    return (
      <a
        ref={ref}
        aria-current={active ? 'page' : undefined}
        className={cn(
          'flex items-center gap-2 rounded-md px-2.5 py-2 text-sm transition-colors',
          active
            ? 'bg-blue-50 font-medium text-blue-700'
            : 'text-slate-700 hover:bg-slate-100',
          className,
        )}
        {...rest}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        {children}
      </a>
    );
  },
);

NavLink.displayName = 'NavLink';
