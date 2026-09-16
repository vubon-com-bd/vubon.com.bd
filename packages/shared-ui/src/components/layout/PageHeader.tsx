'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface PageHeaderProps
  extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  readonly title: ReactNode;
  readonly description?: ReactNode;
  readonly breadcrumbs?: ReactNode;
  readonly actions?: ReactNode;
  readonly sticky?: boolean;
}

export const PageHeader = forwardRef<HTMLElement, PageHeaderProps>(
  function PageHeader(
    { title, description, breadcrumbs, actions, sticky, className, children, ...rest },
    ref,
  ) {
    return (
      <header
        ref={ref}
        className={cn(
          'flex flex-col gap-3 border-b border-slate-200 bg-white py-4',
          sticky && 'sticky top-0 z-[1100]',
          className,
        )}
        {...rest}
      >
        {breadcrumbs}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
            {description && <p className="text-sm text-slate-500">{description}</p>}
            {children}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </header>
    );
  },
);

PageHeader.displayName = 'PageHeader';
