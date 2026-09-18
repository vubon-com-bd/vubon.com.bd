'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { EmptyState } from '../../components/data-display/EmptyState';
import { cn } from '../../utils/cn';

export interface EmptyTableProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly icon?: ReactNode;
  readonly action?: ReactNode;
}

export const EmptyTable = forwardRef<HTMLDivElement, EmptyTableProps>(function EmptyTable(
  { title = 'No results', description, icon, action, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('py-8', className)} {...rest}>
      <EmptyState
        title={title}
        {...(description !== undefined && { description })}
        {...(icon !== undefined && { icon })}
        {...(action !== undefined && { action })}
      />
    </div>
  );
});

EmptyTable.displayName = 'EmptyTable';
