'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface KeyValueProps extends HTMLAttributes<HTMLDivElement> {
  readonly label: ReactNode;
  readonly value: ReactNode;
  readonly orientation?: 'horizontal' | 'vertical';
}

export const KeyValue = forwardRef<HTMLDivElement, KeyValueProps>(function KeyValue(
  { label, value, orientation = 'horizontal', className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn(
        'gap-1',
        orientation === 'horizontal' ? 'flex items-baseline justify-between' : 'flex flex-col',
        className
      )}
      {...rest}
    >
      <span className="text-xs uppercase text-slate-500">{label}</span>
      <span className="text-sm text-slate-900">{value}</span>
    </div>
  );
});

KeyValue.displayName = 'KeyValue';
