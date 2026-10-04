import { useEffect, useRef } from 'react';

/**
 * requestAnimationFrame loop.
 * `callback` receives elapsed ms. Auto-cancels on unmount.
 * Pass `null` as `enabled` to pause.
 */
export function useRaf(
  callback: (elapsedMs: number, deltaMs: number) => void,
  enabled = true
): void {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;
    let raf = 0;
    let last = performance.now();
    const start = last;
    const tick = (now: number): void => {
      const delta = now - last;
      last = now;
      ref.current(now - start, delta);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled]);
}
