'use client';
import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { TextareaProps } from './textarea.types';

const resizeClasses = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
} as const;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, resize = 'vertical', className, 'aria-invalid': ariaInvalid, rows = 4, ...rest },
  ref
) {
  const isInvalid = invalid ?? (ariaInvalid === true || ariaInvalid === 'true');
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={isInvalid || undefined}
      className={cn(
        'w-full rounded-md border bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:bg-slate-100',
        resizeClasses[resize],
        isInvalid
          ? 'border-red-500 focus-visible:ring-red-500'
          : 'border-slate-300 focus-visible:ring-blue-500',
        className
      )}
      {...rest}
    />
  );
});

Textarea.displayName = 'Textarea';
