'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface DataToolbarProps extends HTMLAttributes<HTMLDivElement> {
  readonly search?: ReactNode;
  readonly filters?: ReactNode;
  readonly sort?: ReactNode;
  readonly bulk?: ReactNode;
  readonly actions?: ReactNode;
}

export const DataToolbar = forwardRef<HTMLDivElement, DataToolbarProps>(
  function DataToolbar(
    { search, filters, sort, bulk, actions, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 py-3',
          className,
        )}
        {...rest}
      >
        <div className="flex flex-1 flex-wrap items-center gap-2">
          {search}
          {filters}
          {bulk}
        </div>
        <div className="flex items-center gap-2">
          {sort}
          {actions}
        </div>
      </div>
    );
  },
);

DataToolbar.displayName = 'DataToolbar';
