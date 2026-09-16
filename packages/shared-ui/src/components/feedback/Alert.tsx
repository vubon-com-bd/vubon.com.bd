'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly variant?: AlertVariant;
  readonly title?: ReactNode;
  readonly description?: ReactNode;
  readonly icon?: ReactNode;
  readonly onClose?: () => void;
  readonly closable?: boolean;
}

const variantClasses: Record<AlertVariant, string> = {
  info: 'border-sky-200 bg-sky-50 text-sky-900',
  success: 'border-green-200 bg-green-50 text-green-900',
  warning: 'border-amber-200 bg-amber-50 text-amber-900',
  error: 'border-red-200 bg-red-50 text-red-900',
};

const roleMap: Record<AlertVariant, 'status' | 'alert'> = {
  info: 'status',
  success: 'status',
  warning: 'status',
  error: 'alert',
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', title, description, icon, onClose, closable, className, children, ...rest },
  ref,
) {
  const showClose = closable || Boolean(onClose);
  return (
    <div
      ref={ref}
      role={roleMap[variant]}
      className={cn(
        'flex items-start gap-3 rounded-md border p-3 text-sm',
        variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {icon && <span className="mt-0.5 shrink-0" aria-hidden="true">{icon}</span>}
      <div className="flex flex-1 flex-col gap-0.5">
        {title && <p className="font-medium">{title}</p>}
        {description && <p className="text-xs opacity-90">{description}</p>}
        {children}
      </div>
      {showClose && (
        <button
          type="button"
          aria-label="Close alert"
          onClick={onClose}
          className="shrink-0 text-current opacity-60 hover:opacity-100"
        >
          <span aria-hidden="true">×</span>
        </button>
      )}
    </div>
  );
});

Alert.displayName = 'Alert';
