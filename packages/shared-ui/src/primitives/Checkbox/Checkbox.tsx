'use client';
import { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';
import type { CheckboxProps } from './checkbox.types';

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { invalid, label, className, id, 'aria-invalid': ariaInvalid, ...rest },
  ref
) {
  const autoId = useId();
  const checkboxId = id ?? autoId;
  const isInvalid = invalid ?? (ariaInvalid === true || ariaInvalid === 'true');

  return (
    <div className="inline-flex items-center gap-2">
      <input
        ref={ref}
        id={checkboxId}
        type="checkbox"
        aria-invalid={isInvalid || undefined}
        className={cn(
          'h-4 w-4 rounded border-slate-300 text-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          isInvalid && 'border-red-500',
          className
        )}
        {...rest}
      />
      {label && (
        <label htmlFor={checkboxId} className="text-sm text-slate-700 select-none">
          {label}
        </label>
      )}
    </div>
  );
});

Checkbox.displayName = 'Checkbox';
