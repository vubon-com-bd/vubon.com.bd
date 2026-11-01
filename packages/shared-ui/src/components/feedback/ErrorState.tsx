'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { UI_LABELS } from '@vubon/shared-constants/common';
import { cn } from '../../utils/cn';

export interface ErrorStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly error?: Error | string | null;
  readonly onRetry?: () => void;
  readonly retryLabel?: string;
}

export const ErrorState = forwardRef<HTMLDivElement, ErrorStateProps>(function ErrorState(
  {
    title = UI_LABELS.COMMON.SOMETHING_WRONG,
    description,
    error,
    onRetry,
    retryLabel = UI_LABELS.COMMON.TRY_AGAIN,
    className,
    children,
    ...rest
  },
  ref
) {
  const detail =
    typeof error === 'string' ? error : error instanceof Error ? error.message : undefined;

  return (
    <div
      ref={ref}
      role="alert"
      className={cn('flex flex-col items-center justify-center gap-2 py-12 text-center', className)}
      {...rest}
    >
      <span className="text-3xl text-red-500" aria-hidden="true">
        ⚠
      </span>
      <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      {description && (
        <p className="max-w-md text-sm text-slate-500 dark:text-slate-400">{description}</p>
      )}
      {!description && detail && <p className="max-w-md text-xs text-slate-400">{detail}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-2 rounded-md bg-slate-900 px-4 py-1.5 text-xs text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900"
        >
          {retryLabel}
        </button>
      )}
      {children}
    </div>
  );
});

ErrorState.displayName = 'ErrorState';
