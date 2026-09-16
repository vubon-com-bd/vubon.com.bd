'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { UI_LABELS } from '@vubon/shared-constants/common';
import { cn } from '../../utils/cn';

export interface EmptyStateProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly icon?: ReactNode;
  readonly action?: ReactNode;
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState(
    { title = UI_LABELS.COMMON.NO_RESULTS, description, icon, action, className, ...rest },
    ref,
  ) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center justify-center gap-2 py-12 text-center',
          className,
        )}
        {...rest}
      >
        {icon && (
          <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">
            {icon}
          </span>
        )}
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {title}
        </h3>
        {description && (
          <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        )}
        {action && <div className="mt-2">{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = 'EmptyState';
