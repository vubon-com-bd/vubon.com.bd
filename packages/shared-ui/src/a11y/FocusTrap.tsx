'use client';
import { forwardRef, useEffect, useRef, type HTMLAttributes, type ReactNode } from 'react';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'textarea:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export interface FocusTrapProps extends HTMLAttributes<HTMLDivElement> {
  readonly children: ReactNode;
  readonly active?: boolean;
  readonly initialFocus?: 'first' | 'container' | 'none';
  readonly restoreFocus?: boolean;
}

/**
 * Traps keyboard focus inside the container.
 * Useful for modals, drawers, dialogs.
 */
export const FocusTrap = forwardRef<HTMLDivElement, FocusTrapProps>(function FocusTrap(
  { children, active = true, initialFocus = 'first', restoreFocus = true, ...rest },
  ref
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Combine external ref
  const setRef = (node: HTMLDivElement | null): void => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    if (!active) return;
    const container = innerRef.current;
    if (!container) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('disabled') && el.tabIndex !== -1
      );

    // Initial focus
    if (initialFocus === 'first') {
      const first = getFocusable()[0];
      if (first) {
        first.focus();
      } else {
        container.focus();
      }
    } else if (initialFocus === 'container') {
      container.focus();
    }

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || active === container) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (restoreFocus) {
        previouslyFocused.current?.focus();
      }
    };
  }, [active, initialFocus, restoreFocus]);

  return (
    <div ref={setRef} tabIndex={-1} {...rest}>
      {children}
    </div>
  );
});

FocusTrap.displayName = 'FocusTrap';
