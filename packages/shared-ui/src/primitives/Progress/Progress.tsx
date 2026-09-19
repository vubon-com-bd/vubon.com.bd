'use client';
import { cn } from '../../utils/cn';
import type { ProgressProps, ProgressVariant } from './progress.types';

const variantClasses: Record<ProgressVariant, string> = {
  primary: 'bg-blue-600',
  success: 'bg-green-600',
  warning: 'bg-amber-500',
  danger: 'bg-red-600',
};

const sizeClasses = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
} as const;

export function Progress({
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  label,
  showValue = false,
  className,
}: ProgressProps): JSX.Element {
  const safeMax = max > 0 ? max : 100;
  const pct = Math.max(0, Math.min(100, (value / safeMax) * 100));

  return (
    <div className={cn('w-full', className)}>
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-600">
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={value}
        aria-label={label}
        className={cn('w-full overflow-hidden rounded-full bg-slate-200', sizeClasses[size])}
      >
        <div
          className={cn('h-full transition-all', variantClasses[variant])}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
