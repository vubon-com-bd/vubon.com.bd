'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Progress } from '../../primitives/Progress';
import { cn } from '../../utils/cn';

export interface ProgressOverlayProps extends HTMLAttributes<HTMLDivElement> {
  readonly value: number;
  readonly max?: number;
  readonly label?: ReactNode;
  readonly fullscreen?: boolean;
}

export const ProgressOverlay = forwardRef<HTMLDivElement, ProgressOverlayProps>(
  function ProgressOverlay({ value, max = 100, label, fullscreen, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        className={cn(
          'flex flex-col items-center justify-center gap-3',
          fullscreen ? 'fixed inset-0 z-[1400] bg-white/80 backdrop-blur-sm' : 'py-6',
          className
        )}
        {...rest}
      >
        {label && <p className="text-sm text-slate-600">{label}</p>}
        <div className="w-64">
          <Progress value={value} max={max} showValue />
        </div>
      </div>
    );
  }
);

ProgressOverlay.displayName = 'ProgressOverlay';
