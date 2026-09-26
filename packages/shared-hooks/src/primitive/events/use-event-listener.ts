import { useEffect, useRef } from 'react';

/**
 * Add an event listener. Auto-removes on unmount.
 * SSR-safe — no-op if target is null.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  event: K,
  handler: (ev: WindowEventMap[K]) => void,
  target: Window | HTMLElement | Document | null = typeof window !== 'undefined' ? window : null
): void {
  const ref = useRef(handler);
  ref.current = handler;

  useEffect(() => {
    if (!target) return;
    const listener = (ev: Event): void => {
      ref.current(ev as WindowEventMap[K]);
    };
    target.addEventListener(event, listener);
    return () => target.removeEventListener(event, listener);
  }, [event, target]);
}
