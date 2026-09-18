'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Progress } from '../../primitives/Progress';
import { cn } from '../../utils/cn';

export interface ProgressListItem {
  readonly id: string;
  readonly label: ReactNode;
  readonly value: number;
  readonly max?: number;
}

export interface ProgressListProps extends HTMLAttributes<HTMLDivElement> {
  readonly items: readonly ProgressListItem[];
}

export const ProgressList = forwardRef<HTMLDivElement, ProgressListProps>(function ProgressList(
  { items, className, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex flex-col gap-3', className)} {...rest}>
      {items.map((item) => (
        <div key={item.id} className="flex flex-col gap-1">
          <span className="text-xs text-slate-600">{item.label}</span>
          <Progress value={item.value} max={item.max ?? 100} showValue />
        </div>
      ))}
    </div>
  );
});

ProgressList.displayName = 'ProgressList';
