'use client';
import { forwardRef, type FieldsetHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface FormSectionProps extends Omit<
  FieldsetHTMLAttributes<HTMLFieldSetElement>,
  'title'
> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly children: ReactNode;
  readonly columns?: 1 | 2 | 3;
}

const columnClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
} as const;

export const FormSection = forwardRef<HTMLFieldSetElement, FormSectionProps>(function FormSection(
  { title, description, children, columns = 1, className, ...rest },
  ref
) {
  return (
    <fieldset ref={ref} className={cn('flex flex-col gap-4', className)} {...rest}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && <legend className="text-base font-semibold text-slate-900">{title}</legend>}
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      )}
      <div className={cn('grid gap-4', columnClasses[columns])}>{children}</div>
    </fieldset>
  );
});

FormSection.displayName = 'FormSection';
