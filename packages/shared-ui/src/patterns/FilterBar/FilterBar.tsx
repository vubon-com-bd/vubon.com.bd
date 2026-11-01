'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ActiveFilter {
  readonly id: string;
  readonly label: ReactNode;
  readonly onRemove?: () => void;
}

export interface FilterBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly filters: readonly ActiveFilter[];
  readonly onClearAll?: () => void;
  readonly actions?: ReactNode;
  readonly title?: ReactNode;
}

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(function FilterBar(
  { filters, onClearAll, actions, title, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-wrap items-center gap-2', className)} {...rest}>
      {title && <span className="text-sm text-slate-500">{title}</span>}
      <ul className="flex flex-wrap gap-1.5" aria-label="Active filters">
        {filters.map((f) => (
          <li key={f.id}>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-0.5 text-xs text-slate-700">
              {f.label}
              {f.onRemove && (
                <button
                  type="button"
                  aria-label="Remove filter"
                  onClick={f.onRemove}
                  className="ml-0.5 rounded-full text-slate-400 hover:text-slate-700"
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
      {filters.length > 0 && onClearAll && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs text-blue-600 hover:underline"
        >
          Clear all
        </button>
      )}
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </div>
  );
});

FilterBar.displayName = 'FilterBar';
