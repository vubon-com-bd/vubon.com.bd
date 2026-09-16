'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface DetailField {
  readonly label: ReactNode;
  readonly value: ReactNode;
}

export interface EntityDetailProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly fields: readonly DetailField[];
  readonly actions?: ReactNode;
  readonly columns?: 1 | 2 | 3;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
} as const;

export const EntityDetail = forwardRef<HTMLDivElement, EntityDetailProps>(
  function EntityDetail(
    { title, description, fields, actions, columns = 2, className, children, ...rest },
    ref,
  ) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-4', className)} {...rest}>
        {(title || actions) && (
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex flex-col gap-0.5">
              {title && <h2 className="text-base font-semibold text-slate-900">{title}</h2>}
              {description && <p className="text-sm text-slate-500">{description}</p>}
            </div>
            {actions && <div className="flex items-center gap-2">{actions}</div>}
          </div>
        )}
        <dl className={cn('grid gap-4', columnClasses[columns])}>
          {fields.map((f, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <dt className="text-xs uppercase text-slate-500">{f.label}</dt>
              <dd className="text-sm text-slate-900">{f.value}</dd>
            </div>
          ))}
        </dl>
        {children}
      </div>
    );
  },
);

EntityDetail.displayName = 'EntityDetail';
