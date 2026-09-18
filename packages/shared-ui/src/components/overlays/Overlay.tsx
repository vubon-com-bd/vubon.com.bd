'use client';
import { forwardRef, type HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '../../utils/cn';

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  readonly open: boolean;
  readonly onClose?: () => void;
  readonly blur?: boolean;
}

export const Overlay = forwardRef<HTMLDivElement, OverlayProps>(function Overlay(
  { open, onClose, blur, className, ...rest },
  ref
) {
  if (!open || typeof document === 'undefined') return null;
  return createPortal(
    <div
      ref={ref}
      aria-hidden="true"
      onClick={onClose}
      className={cn('fixed inset-0 z-[1300] bg-black/50', blur && 'backdrop-blur-sm', className)}
      {...rest}
    />,
    document.body
  );
});

Overlay.displayName = 'Overlay';
