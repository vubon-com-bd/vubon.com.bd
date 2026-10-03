'use client';
import { forwardRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FocusTrap } from '../../a11y/FocusTrap';
import { cn } from '../../utils/cn';

export interface LightboxProps {
  readonly open: boolean;
  readonly src: string;
  readonly alt: string;
  readonly onClose: () => void;
  readonly caption?: string;
  readonly className?: string;
}

export const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(function Lightbox(
  { open, src, alt, onClose, caption, className },
  ref
) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[1500] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <FocusTrap>
        <div
          ref={ref}
          className={cn('relative max-h-full max-w-5xl', className)}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={src} alt={alt} className="max-h-[85vh] max-w-full object-contain" />
          {caption && <p className="mt-2 text-center text-sm text-white/80">{caption}</p>}
          <button
            type="button"
            aria-label="Close preview"
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full bg-black/50 px-2 text-white hover:bg-black/80"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </FocusTrap>
    </div>,
    document.body
  );
});

Lightbox.displayName = 'Lightbox';
