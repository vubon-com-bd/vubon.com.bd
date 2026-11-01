'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type StatusBannerVariant = 'info' | 'success' | 'warning' | 'error';

export interface StatusBannerProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: StatusBannerVariant;
  readonly children: ReactNode;
  readonly sticky?: boolean;
}

const variantClasses: Record<StatusBannerVariant, string> = {
  info: 'bg-sky-600 text-white',
  success: 'bg-green-600 text-white',
  warning: 'bg-amber-500 text-white',
  error: 'bg-red-600 text-white',
};

export const StatusBanner = forwardRef<HTMLDivElement, StatusBannerProps>(function StatusBanner(
  { variant = 'info', children, sticky, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="status"
      className={cn(
        'flex items-center justify-center gap-2 px-4 py-2 text-sm',
        variantClasses[variant],
        sticky && 'sticky top-0 z-[1200]',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

StatusBanner.displayName = 'StatusBanner';
