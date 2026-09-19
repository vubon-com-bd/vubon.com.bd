'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly action?: ReactNode;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { title, description, action, className, children, ...rest },
  ref
) {
  return (
    <div ref={ref} className={cn('flex items-start justify-between gap-4', className)} {...rest}>
      <div className="flex flex-col gap-1">
        {title && (
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
        )}
        {description && <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>}
        {children}
      </div>
      {action}
    </div>
  );
});

CardHeader.displayName = 'CardHeader';
