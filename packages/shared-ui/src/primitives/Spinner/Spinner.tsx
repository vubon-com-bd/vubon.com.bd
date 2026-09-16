'use client';
import { cn } from '../../utils/cn';
import type { SpinnerProps, SpinnerSize } from './spinner.types';

const sizeClasses: Record<SpinnerSize, string> = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-8 w-8 border-2',
  xl: 'h-12 w-12 border-4',
};

export function Spinner({
  size = 'md',
  label = 'Loading',
  className,
}: SpinnerProps): JSX.Element {
  return (
    <span
      role="status"
      aria-label={label}
      className={cn(
        'inline-block animate-spin rounded-full border-slate-300 border-t-blue-600',
        sizeClasses[size],
        className,
      )}
    />
  );
}
