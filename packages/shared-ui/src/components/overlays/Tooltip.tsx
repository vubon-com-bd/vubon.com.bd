'use client';
import { forwardRef, useRef, useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  readonly content: ReactNode;
  readonly children: ReactNode;
  readonly placement?: TooltipPlacement;
  readonly delayMs?: number;
  readonly className?: string;
}

const placementClasses: Record<TooltipPlacement, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1',
};

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  function Tooltip(
    { content, children, placement = 'top', delayMs = 300, className },
    ref,
  ) {
    const [open, setOpen] = useState(false);
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = (): void => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setOpen(true), delayMs);
    };
    const hide = (): void => {
      if (timer.current) clearTimeout(timer.current);
      setOpen(false);
    };

    return (
      <span
        ref={ref}
        className="relative inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {children}
        {open && (
          <span
            role="tooltip"
            className={cn(
              'pointer-events-none absolute z-[1800] whitespace-nowrap rounded bg-slate-900 px-2 py-1 text-xs text-white shadow-md',
              placementClasses[placement],
              className,
            )}
          >
            {content}
          </span>
        )}
      </span>
    );
  },
);

Tooltip.displayName = 'Tooltip';
