import { useEffect } from 'react';

/** Prevents body scroll while `locked` is true. */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) return;
    if (typeof document === 'undefined') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
