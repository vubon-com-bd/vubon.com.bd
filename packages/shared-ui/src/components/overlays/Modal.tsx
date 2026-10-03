'use client';
import { forwardRef, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from '../../a11y/FocusTrap';
import { cn } from '../../utils/cn';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly size?: ModalSize;
  readonly children: ReactNode;
  readonly closeOnOverlay?: boolean;
  readonly closeOnEsc?: boolean;
  readonly showCloseButton?: boolean;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  full: 'max-w-[95vw]',
};

export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open,
    onClose,
    title,
    description,
    size = 'md',
    children,
    closeOnOverlay = true,
    closeOnEsc = true,
    showCloseButton = true,
    className,
    ...rest
  },
  ref
) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open) return;
    if (typeof document === 'undefined') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1400] flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) onClose();
      }}
    >
      <FocusTrap>
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'modal-title' : undefined}
          aria-describedby={description ? 'modal-desc' : undefined}
          className={cn('w-full rounded-lg bg-white shadow-xl', sizeClasses[size], className)}
          {...rest}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-4">
              <div>
                {title && (
                  <h2 id="modal-title" className="text-base font-semibold text-slate-900">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id="modal-desc" className="mt-0.5 text-sm text-slate-500">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  type="button"
                  aria-label="Close dialog"
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-700"
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
          )}
          <div className="p-4">{children}</div>
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
});

Modal.displayName = 'Modal';
