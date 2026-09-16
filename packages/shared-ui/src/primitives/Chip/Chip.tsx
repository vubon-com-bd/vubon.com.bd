import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import { chipVariants } from './chip.variants';
import type { ChipProps } from './chip.types';

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  function Chip(
    {
      variant,
      size,
      interactive,
      className,
      children,
      onRemove,
      removeLabel = 'Remove',
      ...rest
    },
    ref,
  ) {
    return (
      <span
        ref={ref}
        className={cn(
          chipVariants({ variant, size, interactive: interactive || Boolean(onRemove) }),
          className,
        )}
        {...rest}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            aria-label={removeLabel}
            onClick={onRemove}
            className="ml-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full hover:bg-slate-200"
          >
            <span aria-hidden="true">×</span>
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = 'Chip';
