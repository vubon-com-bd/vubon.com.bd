'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../utils/cn';

export interface AuthLayoutProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly title: ReactNode;
  readonly subtitle?: ReactNode;
  readonly logo?: ReactNode;
  readonly footer?: ReactNode;
  readonly children: ReactNode;
}

export const AuthLayout = forwardRef<HTMLDivElement, AuthLayoutProps>(function AuthLayout(
  { title, subtitle, logo, footer, children, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn('flex min-h-screen items-center justify-center bg-slate-50 p-4', className)}
      {...rest}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-2 pb-6 text-center">
          {logo}
          <h1 className="text-xl font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">{children}</div>
        {footer && <div className="mt-4 text-center text-xs text-slate-500">{footer}</div>}
      </div>
    </div>
  );
});

AuthLayout.displayName = 'AuthLayout';
