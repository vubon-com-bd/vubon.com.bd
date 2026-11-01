import { useEffect, useRef, type RefObject } from 'react';

/** Fires `handler` when a click occurs outside `ref`. */
export function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: () => void
): void {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent): void => {
      const el = ref.current;
      if (!el) return;
      const target = e.target as Node | null;
      if (target && !el.contains(target)) handlerRef.current();
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref]);
}
