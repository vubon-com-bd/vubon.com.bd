'use client';
import { forwardRef } from 'react';
import { UI_LABELS } from '@vubon/shared-constants/common';
import { FocusTrap } from '../../a11y/FocusTrap';
import { Button } from '../../primitives/Button';
import { cn } from '../../utils/cn';
import type { ReactNode } from 'react';

export interface ConfirmDialogProps {
  readonly open: boolean;
  readonly title: ReactNode;
  readonly message?: ReactNode;
  readonly confirmLabel?: string;
  readonly cancelLabel?: string;
  readonly variant?: 'primary' | 'danger';
  readonly loading?: boolean;
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
  readonly className?: string;
}

export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  function ConfirmDialog(
    {
      open,
      title,
      message,
      confirmLabel = UI_LABELS.MODAL.CONFIRM_BUTTON,
      cancelLabel = UI_LABELS.MODAL.CANCEL_BUTTON,
      variant = 'primary',
      loading,
      onConfirm,
      onCancel,
      className,
    },
    ref,
  ) {
    if (!open) return null;
    return (
      <div
        className="fixed inset-0 z-[1400] flex items-center justify-center bg-black/40 p-4"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onCancel();
        }}
      >
        <FocusTrap>
          <div
            ref={ref}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-title"
            className={cn(
              'w-full max-w-sm rounded-lg bg-white p-5 shadow-xl dark:bg-slate-800',
              className,
            )}
          >
            <h2
              id="confirm-title"
              className="text-base font-semibold text-slate-900 dark:text-slate-100"
            >
              {title}
            </h2>
            {message && (
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {message}
              </p>
            )}
            <div className="mt-5 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={onCancel}
                {...(loading !== undefined && { loading })}
              >
                {cancelLabel}
              </Button>
              <Button
                variant={variant}
                onClick={onConfirm}
                {...(loading !== undefined && { loading })}
              >
                {confirmLabel}
              </Button>
            </div>
          </div>
        </FocusTrap>
      </div>
    );
  },
);

ConfirmDialog.displayName = 'ConfirmDialog';
