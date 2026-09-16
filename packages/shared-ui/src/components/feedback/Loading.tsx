'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { UI_LABELS } from '@vubon/shared-constants/common';
import { Spinner } from '../../primitives/Spinner';
import { cn } from '../../utils/cn';

export interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  readonly label?: ReactNode;
  readonly fullscreen?: boolean;
  readonly size?: 'sm' | 'md' | 'lg';
}

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(
  { label = UI_LABELS.COMMON.LOADING, fullscreen, size = 'md', className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      className={cn(
        'flex flex-col items-center justify-center gap-2 text-slate-600 dark:text-slate-300',
        fullscreen ? 'fixed inset-0 z-[1400] bg-white/80 backdrop-blur-sm dark:bg-slate-900/80' : 'py-8',
        className,
      )}
      {...rest}
    >
      <Spinner size={size} label={String(label)} />
      {label && <p className="text-sm">{label}</p>}
    </div>
  );
});

Loading.displayName = 'Loading';
