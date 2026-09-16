'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Stat } from '../../components/data-display/Stat';
import { cn } from '../../utils/cn';

export interface StatGridItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly value: ReactNode;
  readonly delta?: { readonly value: string; readonly trend: 'up' | 'down' | 'flat' };
  readonly icon?: ReactNode;
}

export interface StatGridProps extends HTMLAttributes<HTMLDivElement> {
  readonly items: readonly StatGridItem[];
  readonly columns?: 2 | 3 | 4;
}

const columnClasses = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

export const StatGrid = forwardRef<HTMLDivElement, StatGridProps>(function StatGrid(
  { items, columns = 4, className, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={cn('grid gap-3', columnClasses[columns], className)} {...rest}>
      {items.map((item) => (
        <Stat
          key={item.id}
          label={item.label}
          value={item.value}
          {...(item.delta !== undefined && { delta: item.delta })}
          {...(item.icon !== undefined && { icon: item.icon })}
        />
      ))}
    </div>
  );
});

StatGrid.displayName = 'StatGrid';
