'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface DescriptionItem {
  readonly term: ReactNode;
  readonly description: ReactNode;
}

export interface DescriptionListProps extends HTMLAttributes<HTMLDListElement> {
  readonly items: readonly DescriptionItem[];
  readonly columns?: 1 | 2 | 3;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
} as const;

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  function DescriptionList({ items, columns = 1, className, ...rest }, ref) {
    return (
      <dl
        ref={ref}
        className={cn('grid gap-4', columnClasses[columns], className)}
        {...rest}
      >
        {items.map((item, i) => (
          <div key={i} className="flex flex-col gap-0.5">
            <dt className="text-xs uppercase text-slate-500">{item.term}</dt>
            <dd className="text-sm text-slate-900">{item.description}</dd>
          </div>
        ))}
      </dl>
    );
  },
);

DescriptionList.displayName = 'DescriptionList';
