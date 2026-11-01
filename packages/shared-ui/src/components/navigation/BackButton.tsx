'use client';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface BackButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly children?: ReactNode;
  readonly onBack?: () => void;
}

export const BackButton = forwardRef<HTMLButtonElement, BackButtonProps>(function BackButton(
  { children = 'Back', onBack, type = 'button', className, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      onClick={onBack}
      className={cn(
        'inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900',
        className
      )}
      {...rest}
    >
      <span aria-hidden="true">←</span>
      {children}
    </button>
  );
});

BackButton.displayName = 'BackButton';
