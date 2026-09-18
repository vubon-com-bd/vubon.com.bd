'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface PageSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly actions?: ReactNode;
  readonly children: ReactNode;
  readonly spacing?: 'sm' | 'md' | 'lg';
}

const spacingClasses = {
  sm: 'py-3',
  md: 'py-6',
  lg: 'py-8',
} as const;

export const PageSection = forwardRef<HTMLElement, PageSectionProps>(function PageSection(
  { title, description, actions, children, spacing = 'md', className, ...rest },
  ref
) {
  return (
    <section
      ref={ref}
      className={cn('flex flex-col gap-3', spacingClasses[spacing], className)}
      {...rest}
    >
      {(title || actions) && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            {title && <h2 className="text-base font-semibold text-slate-900">{title}</h2>}
            {description && <p className="text-sm text-slate-500">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </section>
  );
});

PageSection.displayName = 'PageSection';
