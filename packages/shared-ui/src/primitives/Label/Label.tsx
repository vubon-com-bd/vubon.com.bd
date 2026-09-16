'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { LabelProps } from './label.types';

export const Label = forwardRef<HTMLLabelElement, LabelProps>(
  function Label({ required, className, children, ...rest }, ref) {
    return (
      <label
        ref={ref}
        className={cn('text-sm font-medium text-slate-700', className)}
        {...rest}
      >
        {children}
        {required && (
          <span aria-hidden="true" className="ml-0.5 text-red-500">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
