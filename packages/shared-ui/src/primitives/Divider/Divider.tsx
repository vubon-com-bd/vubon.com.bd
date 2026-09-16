import { forwardRef } from 'react';
import { cn } from '../../utils/cn';
import type { DividerProps } from './divider.types';

const spacingClasses = {
  none: '',
  sm: 'my-2',
  md: 'my-4',
  lg: 'my-6',
} as const;

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  function Divider(
    { orientation = 'horizontal', label, spacing = 'md', className, ...rest },
    ref,
  ) {
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn('inline-block h-full w-px bg-slate-200', className)}
          {...rest}
        />
      );
    }
    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          className={cn(
            'flex items-center gap-3 text-xs uppercase text-slate-500',
            spacingClasses[spacing],
            className,
          )}
          {...rest}
        >
          <span className="h-px flex-1 bg-slate-200" />
          {label}
          <span className="h-px flex-1 bg-slate-200" />
        </div>
      );
    }
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn(
          'h-px w-full bg-slate-200',
          spacingClasses[spacing],
          className,
        )}
        {...rest}
      />
    );
  },
);

Divider.displayName = 'Divider';
