'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface TimelineItem {
  readonly id: string;
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly time?: string;
  readonly icon?: ReactNode;
  readonly status?: 'default' | 'success' | 'warning' | 'danger';
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  readonly items: readonly TimelineItem[];
}

const statusClasses = {
  default: 'bg-slate-200 text-slate-600',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-red-100 text-red-700',
} as const;

export const Timeline = forwardRef<HTMLOListElement, TimelineProps>(function Timeline(
  { items, className, ...rest },
  ref
) {
  return (
    <ol ref={ref} className={cn('relative flex flex-col gap-4', className)} {...rest}>
      {items.map((item) => (
        <li key={item.id} className="relative flex gap-3">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs',
                statusClasses[item.status ?? 'default']
              )}
              aria-hidden="true"
            >
              {item.icon ?? '•'}
            </span>
            <span className="mt-1 w-px flex-1 bg-slate-200" aria-hidden="true" />
          </div>
          <div className="flex-1 pb-2">
            <p className="text-sm font-medium text-slate-900">{item.title}</p>
            {item.description && (
              <p className="mt-0.5 text-xs text-slate-500">{item.description}</p>
            )}
            {item.time && <time className="mt-0.5 block text-xs text-slate-400">{item.time}</time>}
          </div>
        </li>
      ))}
    </ol>
  );
});

Timeline.displayName = 'Timeline';
