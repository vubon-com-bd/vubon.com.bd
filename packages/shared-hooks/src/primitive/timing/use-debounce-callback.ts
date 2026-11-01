import { useCallback, useEffect, useRef } from 'react';

/**
 * Debounced callback — delays execution until `delayMs` of silence.
 * Cancels pending execution on unmount.
 */
export function useDebounceCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delayMs = 300
): (...args: TArgs) => void {
  const ref = useRef(callback);
  ref.current = callback;
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return useCallback(
    (...args: TArgs) => {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => ref.current(...args), delayMs);
    },
    [delayMs]
  );
}
