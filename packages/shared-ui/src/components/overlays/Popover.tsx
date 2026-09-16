'use client';
import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { cn } from '../../utils/cn';

export type PopoverAlign = 'start' | 'center' | 'end';
export type PopoverSide = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  readonly trigger: ReactNode;
  readonly children: ReactNode;
  readonly side?: PopoverSide;
  readonly align?: PopoverAlign;
  readonly className?: string;
}

const sideClasses: Record<PopoverSide, string> = {
  top: 'bottom-full mb-1',
  bottom: 'top-full mt-1',
  left: 'right-full mr-1 top-1/2 -translate-y-1/2',
  right: 'left-full ml-1 top-1/2 -translate-y-1/2',
};

const alignClasses: Record<PopoverAlign, string> = {
  start: 'left-0',
  center: 'left-1/2 -translate-x-1/2',
  end: 'right-0',
};

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  function Popover(
    { trigger, children, side = 'bottom', align = 'start', className },
    ref,
  ) {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement | null>(null);

    const setRef = (node: HTMLDivElement | null): void => {
      rootRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    useEffect(() => {
      if (!open) return;
      const onDoc = (e: MouseEvent): void => {
        if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
      };
      const onKey = (e: KeyboardEvent): void => {
        if (e.key === 'Escape') setOpen(false);
      };
      document.addEventListener('mousedown', onDoc);
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('mousedown', onDoc);
        document.removeEventListener('keydown', onKey);
      };
    }, [open]);

    return (
      <div ref={setRef} className="relative inline-block">
        <button
          type="button"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center"
        >
          {trigger}
        </button>
        {open && (
          <div
            role="dialog"
            className={cn(
              'absolute z-[1500] rounded-md border border-slate-200 bg-white p-3 shadow-lg',
              sideClasses[side],
              (side === 'top' || side === 'bottom') && alignClasses[align],
              className,
            )}
          >
            {children}
          </div>
        )}
      </div>
    );
  },
);

Popover.displayName = 'Popover';
