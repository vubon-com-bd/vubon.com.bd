'use client';
import { forwardRef, type FormHTMLAttributes, type ReactNode } from 'react';
import { Button } from '../../primitives/Button';
import { cn } from '../../utils/cn';

export interface EntityFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'title'> {
  readonly children: ReactNode;
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly submitLabel?: string;
  readonly cancelLabel?: string;
  readonly onCancel?: () => void;
  readonly submitting?: boolean;
  readonly error?: ReactNode;
  readonly actionsExtra?: ReactNode;
}

export const EntityForm = forwardRef<HTMLFormElement, EntityFormProps>(function EntityForm(
  {
    children,
    title,
    description,
    submitLabel = 'Save',
    cancelLabel = 'Cancel',
    onCancel,
    submitting,
    error,
    actionsExtra,
    className,
    ...rest
  },
  ref
) {
  return (
    <form ref={ref} className={cn('flex flex-col gap-4', className)} {...rest}>
      {(title || description) && (
        <div className="flex flex-col gap-0.5">
          {title && <h2 className="text-base font-semibold text-slate-900">{title}</h2>}
          {description && <p className="text-sm text-slate-500">{description}</p>}
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700"
        >
          {error}
        </div>
      )}

      <div className="flex flex-col gap-4">{children}</div>

      <div className="flex items-center justify-end gap-2 border-t border-slate-200 pt-4">
        {actionsExtra}
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            {...(submitting !== undefined && { disabled: submitting })}
          >
            {cancelLabel}
          </Button>
        )}
        <Button type="submit" {...(submitting !== undefined && { loading: submitting })}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
});

EntityForm.displayName = 'EntityForm';
