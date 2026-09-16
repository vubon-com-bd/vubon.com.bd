'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SectionNavItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly href: string;
}

export interface SectionNavProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  readonly items: readonly SectionNavItem[];
  readonly title?: ReactNode;
  readonly sticky?: boolean;
}

export const SectionNav = forwardRef<HTMLElement, SectionNavProps>(
  function SectionNav({ items, title, sticky, className, ...rest }, ref) {
    return (
      <nav
        ref={ref}
        aria-label="Section navigation"
        className={cn('flex flex-col gap-1', sticky && 'sticky top-20', className)}
        {...rest}
      >
        {title && <p className="text-xs uppercase text-slate-500">{title}</p>}
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href}
                className="rounded px-2 py-1 text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  },
);

SectionNav.displayName = 'SectionNav';
