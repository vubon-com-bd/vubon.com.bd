'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';

export interface ToastProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly variant?: ToastVariant;
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly icon?: ReactNode;
  readonly onClose?: () => void;
}

const variantClasses: Record<ToastVariant, string> = {
  info: 'border-sky-200 bg-white text-slate-900',
  success: 'border-green-200 bg-white text-slate-900',
  warning: 'border-amber-200 bg-white text-slate-900',
  error: 'border-red-200 bg-white text-slate-900',
};

const roleMap: Record<ToastVariant, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'status',
  error: 'alert',
};

const ariaLiveMap: Record<ToastVariant, 'polite' | 'assertive'> = {
  info: 'polite',
  success: 'polite',
  warning: 'polite',
  error: 'assertive',
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(function Toast(
  { variant = 'info', title, description, icon, onClose, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role={roleMap[variant]}
      aria-live={ariaLiveMap[variant]}
      className={cn(
        'flex items-start gap-3 rounded-md border p-3 text-sm shadow-lg',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {icon && <span className="mt-0.5 shrink-0" aria-hidden="true">{icon}</span>}
      <div className="flex flex-1 flex-col gap-0.5">
        {title && <p className="font-medium">{title}</p>}
        {description && <p className="text-xs text-slate-500">{description}</p>}
        {children}
      </div>
      {onClose && (
        <button
          type="button"
          aria-label="Dismiss notification"
          onClick={onClose}
          className="shrink-0 text-slate-400 hover:text-slate-700"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

export interface ToastViewportProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'top-center'
    | 'bottom-center';
}

const positionClasses = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
} as const;

export const ToastViewport = forwardRef<HTMLDivElement, ToastViewportProps>(
  function ToastViewport({ children, position = 'top-right', className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        aria-live="polite"
        aria-atomic="false"
        className={cn(
          'pointer-events-none fixed z-[1700] flex flex-col gap-2',
          positionClasses[position],
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

ToastViewport.displayName = 'ToastViewport';
