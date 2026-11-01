import { useCallback, useEffect, useRef } from 'react';

/**
 * Throttle a callback to the browser's animation frame rate.
 * Returns a stable callback that schedules via `requestAnimationFrame`.
 */
export function useRafCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void
): (...args: TArgs) => void {
  const cbRef = useRef(callback);
  cbRef.current = callback;
  const rafRef = useRef(0);
  const argsRef = useRef<TArgs | null>(null);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return useCallback((...args: TArgs) => {
    argsRef.current = args;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (argsRef.current) cbRef.current(...argsRef.current);
    });
  }, []);
}
