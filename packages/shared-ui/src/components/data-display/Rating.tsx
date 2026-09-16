'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface RatingProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  readonly value: number;
  readonly max?: number;
  readonly readOnly?: boolean;
  readonly onChange?: (value: number) => void;
  readonly size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
} as const;

export const Rating = forwardRef<HTMLDivElement, RatingProps>(function Rating(
  { value, max = 5, readOnly, onChange, size = 'md', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="radiogroup"
      aria-label="Rating"
      className={cn('inline-flex items-center gap-0.5', sizeClasses[size], className)}
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = star <= Math.round(value);
        return (
          <button
            key={star}
            type="button"
            role="radio"
            aria-checked={star === value}
            aria-label={`${star} of ${max}`}
            disabled={readOnly}
            onClick={() => !readOnly && onChange?.(star)}
            className={cn(
              'transition-transform',
              readOnly ? 'cursor-default' : 'cursor-pointer hover:scale-110',
              filled ? 'text-amber-500' : 'text-slate-300',
            )}
          >
            <span aria-hidden="true">★</span>
          </button>
        );
      })}
    </div>
  );
});

Rating.displayName = 'Rating';
