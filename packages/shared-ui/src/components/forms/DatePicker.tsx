'use client';
import { forwardRef } from 'react';
import { Input } from '../../primitives/Input';
import { CalendarIcon } from '../../icons/generic/CalendarIcon';
import type { InputProps } from '../../primitives/Input';

export interface DatePickerProps extends Omit<InputProps, 'type'> {
  readonly mode?: 'date' | 'datetime-local' | 'month' | 'week';
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  function DatePicker({ mode = 'date', className, ...rest }, ref) {
    return (
      <div className="relative">
        <Input
          ref={ref}
          type={mode}
          className={`pr-10 ${className ?? ''}`}
          {...rest}
        />
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
          <CalendarIcon size="sm" />
        </span>
      </div>
    );
  },
);

DatePicker.displayName = 'DatePicker';
