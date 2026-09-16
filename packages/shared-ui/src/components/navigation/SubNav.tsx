'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SubNavItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly href?: string;
  readonly active?: boolean;
}

export interface SubNavProps
  extends Omit<HTMLAttributes<HTMLElement>, 'onSelect'> {
  readonly items: readonly SubNavItem[];
  readonly onSelect?: (id: string) => void;
}

export const SubNav = forwardRef<HTMLElement, SubNavProps>(function SubNav(
  { items, onSelect, className, ...rest },
  ref,
) {
  return (
    <nav
      ref={ref}
      aria-label="Sub navigation"
      className={cn('flex gap-4 border-b border-slate-200', className)}
      {...rest}
    >
      {items.map((item) =>
        item.href ? (
          <a
            key={item.id}
            href={item.href}
            aria-current={item.active ? 'page' : undefined}
            className={cn(
              'border-b-2 px-1 pb-2 text-sm',
              item.active
                ? 'border-blue-600 font-medium text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900',
            )}
          >
            {item.label}
          </a>
        ) : (
          <button
            key={item.id}
            type="button"
            aria-current={item.active ? 'page' : undefined}
            onClick={() => onSelect?.(item.id)}
            className={cn(
              'border-b-2 px-1 pb-2 text-sm',
              item.active
                ? 'border-blue-600 font-medium text-blue-700'
                : 'border-transparent text-slate-600 hover:text-slate-900',
            )}
          >
            {item.label}
          </button>
        ),
      )}
    </nav>
  );
});

SubNav.displayName = 'SubNav';
