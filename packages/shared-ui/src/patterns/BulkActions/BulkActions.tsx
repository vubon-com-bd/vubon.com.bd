'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Button } from '../../primitives/Button';
import { cn } from '../../utils/cn';

export interface BulkAction {
  readonly id: string;
  readonly label: ReactNode;
  readonly onSelect: () => void;
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  readonly disabled?: boolean;
}

export interface BulkActionsProps extends HTMLAttributes<HTMLDivElement> {
  readonly count: number;
  readonly actions: readonly BulkAction[];
  readonly onClear?: () => void;
  readonly busy?: boolean;
}

export const BulkActions = forwardRef<HTMLDivElement, BulkActionsProps>(
  function BulkActions({ count, actions, onClear, busy, className, ...rest }, ref) {
    if (count === 0) return null;
    return (
      <div
        ref={ref}
        role="region"
        aria-label="Bulk actions"
        className={cn(
          'flex flex-wrap items-center gap-2 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm',
          className,
        )}
        {...rest}
      >
        <span className="font-medium text-blue-900">
          {count} selected
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {actions.map((a) => (
            <Button
              key={a.id}
              size="sm"
              variant={a.variant ?? 'outline'}
              onClick={a.onSelect}
              {...(a.disabled !== undefined && { disabled: a.disabled })}
              {...(busy !== undefined && { loading: busy })}
            >
              {a.label}
            </Button>
          ))}
        </div>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="ml-auto text-xs text-blue-700 hover:underline"
          >
            Clear selection
          </button>
        )}
      </div>
    );
  },
);

BulkActions.displayName = 'BulkActions';
