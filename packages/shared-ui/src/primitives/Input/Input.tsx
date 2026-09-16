'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { InputProps } from './input.types';

const sizeClasses = {
  sm: 'h-8 px-2 text-sm',
  md: 'h-10 px-3 text-base',
  lg: 'h-12 px-4 text-lg',
} as const;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input(
    { invalid, sizeVariant = 'md', className, 'aria-invalid': ariaInvalid, ...rest },
    ref,
  ) {
    const isInvalid = invalid ?? (ariaInvalid === true || ariaInvalid === 'true');
    return (
      <input
        ref={ref}
        aria-invalid={isInvalid || undefined}
        className={cn(
          'w-full rounded-md border bg-white text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500 dark:disabled:bg-slate-900',
          sizeClasses[sizeVariant],
          isInvalid
            ? 'border-red-500 focus-visible:ring-red-500'
            : 'border-slate-300 focus-visible:ring-blue-500 dark:border-slate-600',
          className,
        )}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';
