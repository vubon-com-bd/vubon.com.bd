'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type StatusDotColor = 'active' | 'inactive' | 'pending' | 'error' | 'success' | 'warning';

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  readonly status: StatusDotColor;
  readonly label?: ReactNode;
  readonly pulse?: boolean;
}

const colorClasses: Record<StatusDotColor, string> = {
  active: 'bg-green-500',
  inactive: 'bg-slate-400',
  pending: 'bg-amber-500',
  error: 'bg-red-500',
  success: 'bg-green-500',
  warning: 'bg-amber-500',
};

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(function StatusDot(
  { status, label, pulse, className, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      className={cn('inline-flex items-center gap-2 text-sm text-slate-700', className)}
      {...rest}
    >
      <span
        className={cn(
          'inline-block h-2 w-2 rounded-full',
          colorClasses[status],
          pulse && 'animate-pulse'
        )}
        aria-hidden="true"
      />
      {label}
    </span>
  );
});

StatusDot.displayName = 'StatusDot';
