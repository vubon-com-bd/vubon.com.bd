'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface StatProps extends HTMLAttributes<HTMLDivElement> {
  readonly label: ReactNode;
  readonly value: ReactNode;
  readonly delta?: { readonly value: string; readonly trend: 'up' | 'down' | 'flat' };
  readonly icon?: ReactNode;
}

export const Stat = forwardRef<HTMLDivElement, StatProps>(function Stat(
  { label, value, delta, icon, className, ...rest },
  ref
) {
  const trendColor =
    delta?.trend === 'up'
      ? 'text-green-600'
      : delta?.trend === 'down'
        ? 'text-red-600'
        : 'text-slate-500';

  return (
    <div
      ref={ref}
      className={cn('rounded-lg border border-slate-200 bg-white p-4', className)}
      {...rest}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase text-slate-500">{label}</p>
        {icon && <span className="text-slate-400">{icon}</span>}
      </div>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      {delta && (
        <p className={cn('mt-1 text-xs', trendColor)}>
          {delta.trend === 'up' ? '▲' : delta.trend === 'down' ? '▼' : '■'} {delta.value}
        </p>
      )}
    </div>
  );
});

Stat.displayName = 'Stat';
