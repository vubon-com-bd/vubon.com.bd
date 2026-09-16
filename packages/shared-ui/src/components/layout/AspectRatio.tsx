'use client';
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type AspectRatioValue = '1/1' | '4/3' | '16/9' | '21/9' | '3/2' | '2/3' | '9/16';

export interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
  readonly ratio?: AspectRatioValue | number;
  readonly children: ReactNode;
}

function parseRatio(ratio: AspectRatioValue | number): number {
  if (typeof ratio === 'number') return ratio;
  const [w, h] = ratio.split('/').map(Number);
  if (!w || !h) return 1;
  return w / h;
}

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  function AspectRatio({ ratio = '16/9', children, className, style, ...rest }, ref) {
    const value = parseRatio(ratio);
    return (
      <div
        ref={ref}
        className={cn('relative w-full overflow-hidden', className)}
        style={{ aspectRatio: `${value}`, ...style }}
        {...rest}
      >
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  },
);

AspectRatio.displayName = 'AspectRatio';
