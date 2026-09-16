'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  readonly gap?: 0 | 1 | 2 | 3 | 4 | 6 | 8;
  readonly responsiveCols?: {
    readonly sm?: 1 | 2 | 3 | 4 | 5 | 6;
    readonly md?: 1 | 2 | 3 | 4 | 5 | 6;
    readonly lg?: 1 | 2 | 3 | 4 | 5 | 6;
  };
}

const gapClasses = {
  0: 'gap-0',
  1: 'gap-1',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  6: 'gap-6',
  8: 'gap-8',
} as const;

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(
  { children, cols = 1, gap = 4, responsiveCols, className, ...rest },
  ref,
) {
  const baseClass = `grid-cols-${cols}`;
  const smClass = responsiveCols?.sm ? `sm:grid-cols-${responsiveCols.sm}` : '';
  const mdClass = responsiveCols?.md ? `md:grid-cols-${responsiveCols.md}` : '';
  const lgClass = responsiveCols?.lg ? `lg:grid-cols-${responsiveCols.lg}` : '';

  return (
    <div
      ref={ref}
      className={cn(
        'grid',
        baseClass,
        gapClasses[gap],
        smClass,
        mdClass,
        lgClass,
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Grid.displayName = 'Grid';
