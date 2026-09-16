'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  readonly label: ReactNode;
  readonly href?: string;
}

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  readonly items: readonly BreadcrumbItem[];
  readonly separator?: ReactNode;
  readonly maxItems?: number;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  function Breadcrumb(
    { items, separator = '/', maxItems, className, ...rest },
    ref,
  ) {
    let rendered = items;
    if (maxItems && items.length > maxItems) {
      const first = items[0];
      const last = items.slice(-(maxItems - 1));
      if (first) rendered = [first, { label: '…' }, ...last];
    }

    return (
      <nav ref={ref} aria-label="Breadcrumb" className={cn('text-sm', className)} {...rest}>
        <ol className="flex flex-wrap items-center gap-1.5 text-slate-600">
          {rendered.map((item, i) => {
            const isLast = i === rendered.length - 1;
            return (
              <li key={i} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <a href={item.href} className="hover:text-slate-900 hover:underline">
                    {item.label}
                  </a>
                ) : (
                  <span
                    aria-current={isLast ? 'page' : undefined}
                    className={isLast ? 'font-medium text-slate-900' : ''}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <span aria-hidden="true" className="text-slate-400">
                    {separator}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = 'Breadcrumb';
