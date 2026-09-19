'use client';
import { forwardRef, useEffect, type HTMLAttributes, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from '../../a11y/FocusTrap';
import { cn } from '../../utils/cn';

export type DrawerSide = 'left' | 'right' | 'top' | 'bottom';

export interface DrawerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  readonly open: boolean;
  readonly onClose: () => void;
  readonly side?: DrawerSide;
  readonly title?: ReactNode;
  readonly children: ReactNode;
  readonly size?: number | string;
  readonly closeOnOverlay?: boolean;
  readonly closeOnEsc?: boolean;
}

const sideClasses: Record<DrawerSide, string> = {
  left: 'inset-y-0 left-0 h-full',
  right: 'inset-y-0 right-0 h-full',
  top: 'inset-x-0 top-0 w-full',
  bottom: 'inset-x-0 bottom-0 w-full',
};

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(function Drawer(
  {
    open,
    onClose,
    side = 'right',
    title,
    children,
    size,
    closeOnOverlay = true,
    closeOnEsc = true,
    className,
    ...rest
  },
  ref
) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    if (!open) return;
    if (typeof document === 'undefined') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || typeof document === 'undefined') return null;

  const isVertical = side === 'left' || side === 'right';
  const dimension = size ?? (isVertical ? 360 : 'auto');
  const sizeStyle = isVertical ? { width: dimension } : { height: dimension };

  return createPortal(
    <div
      className="fixed inset-0 z-[1400] bg-black/50"
      onMouseDown={(e) => {
        if (closeOnOverlay && e.target === e.currentTarget) onClose();
      }}
    >
      <FocusTrap>
        <div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'drawer-title' : undefined}
          style={sizeStyle}
          className={cn('absolute flex flex-col bg-white shadow-xl', sideClasses[side], className)}
          {...rest}
        >
          {title && (
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h2 id="drawer-title" className="text-base font-semibold text-slate-900">
                {title}
              </h2>
              <button
                type="button"
                aria-label="Close drawer"
                onClick={onClose}
                className="text-slate-400 hover:text-slate-700"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          )}
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
});

Drawer.displayName = 'Drawer';
