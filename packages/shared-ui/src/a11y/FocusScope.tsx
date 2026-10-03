'use client';
import { forwardRef, useEffect, useRef, type HTMLAttributes } from 'react';

export interface FocusScopeProps extends HTMLAttributes<HTMLDivElement> {
  readonly autoFocus?: boolean;
  readonly contain?: boolean;
  readonly restoreFocus?: boolean;
}

/**
 * Focus management helper.
 * `contain=true` behaves like FocusTrap.
 * `autoFocus=true` focuses the container on mount.
 */
export const FocusScope = forwardRef<HTMLDivElement, FocusScopeProps>(function FocusScope(
  { children, autoFocus = false, contain = false, restoreFocus = true, ...rest },
  ref
) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const setRef = (node: HTMLDivElement | null): void => {
    innerRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  useEffect(() => {
    const container = innerRef.current;
    if (!container) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;

    if (autoFocus) container.focus();

    if (!contain) {
      return () => {
        if (restoreFocus) previouslyFocused.current?.focus();
      };
    }

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key !== 'Tab') return;
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusable.length === 0) {
        e.preventDefault();
        return;
      }
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
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      if (restoreFocus) previouslyFocused.current?.focus();
    };
  }, [autoFocus, contain, restoreFocus]);

  return (
    <div ref={setRef} tabIndex={-1} {...rest}>
      {children}
    </div>
  );
});

FocusScope.displayName = 'FocusScope';
