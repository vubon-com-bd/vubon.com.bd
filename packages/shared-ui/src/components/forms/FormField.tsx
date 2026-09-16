'use client';
import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  readonly label?: ReactNode;
  readonly error?: string;
  readonly helperText?: string;
  readonly required?: boolean;
  readonly children:
    | ReactNode
    | ((api: { id: string; describedBy: string }) => ReactNode);
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  function FormField(
    { label, error, helperText, required, children, className, ...rest },
    ref,
  ) {
    const autoId = useId();
    const fieldId = `field-${autoId}`;
    const errorId = `${fieldId}-error`;
    const helperId = `${fieldId}-helper`;
    const describedBy = [error ? errorId : null, helperText ? helperId : null]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={cn('flex flex-col gap-1.5', className)} {...rest}>
        {label && (
          <label htmlFor={fieldId} className="text-sm font-medium text-slate-700">
            {label}
            {required && (
              <span aria-hidden="true" className="ml-0.5 text-red-500">
                *
              </span>
            )}
          </label>
        )}
        {typeof children === 'function'
          ? children({ id: fieldId, describedBy })
          : children}
        {error ? (
          <p id={errorId} role="alert" className="text-xs text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-500">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

FormField.displayName = 'FormField';
