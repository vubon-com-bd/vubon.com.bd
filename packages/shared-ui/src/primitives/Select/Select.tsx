'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { SelectProps } from './select.types';

const sizeClasses = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-12 px-4 text-lg',
} as const;

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      invalid,
      sizeVariant = 'md',
      options,
      placeholder,
      children,
      className,
      'aria-invalid': ariaInvalid,
      ...rest
    },
    ref,
  ) {
    const isInvalid = invalid ?? (ariaInvalid === true || ariaInvalid === 'true');
    return (
      <select
        ref={ref}
        aria-invalid={isInvalid || undefined}
        className={cn(
          'w-full rounded-md border bg-white text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-100',
          sizeClasses[sizeVariant],
          isInvalid
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'border-slate-300 focus-visible:ring-blue-500',
          className,
        )}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options
          ? options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))
          : children}
      </select>
    );
  },
);

Select.displayName = 'Select';
