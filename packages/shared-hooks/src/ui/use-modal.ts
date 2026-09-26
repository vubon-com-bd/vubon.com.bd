import { useCallback, useEffect, useRef, useState } from 'react';

export interface ModalState {
  readonly open: boolean;
  readonly modalRef: React.RefObject<HTMLDivElement>;
  readonly openModal: () => void;
  readonly closeModal: () => void;
  readonly toggle: () => void;
  readonly setOpen: (value: boolean) => void;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Modal state with:
 *  - ESC key handling
 *  - click-outside close
 *  - basic focus trap
 *  - returns `modalRef` to attach to the modal container
 */
export function useModal(initial = false): ModalState {
  const [open, setOpen] = useState(initial);
  const modalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  // ESC + focus trap
  useEffect(() => {
    if (!open) return;
    if (typeof window === 'undefined') return;

    const onKey = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const el = modalRef.current;
        if (!el) return;
        const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
          (f) => !f.hasAttribute('disabled')
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    // Focus first element
    const t = setTimeout(() => {
      const first = modalRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
      first?.focus();
    }, 0);

    return () => {
      document.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open]);

  // click-outside
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent): void => {
      const el = modalRef.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (target && !el.contains(target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  return { open, modalRef, openModal, closeModal, toggle, setOpen };
}
