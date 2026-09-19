import { useCallback, useEffect, useRef } from 'react';

/**
 * Throttled callback — runs at most once per `intervalMs`.
 * Trailing edge: schedules the last call.
 */
export function useThrottleCallback<TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  intervalMs = 300
): (...args: TArgs) => void {
  const ref = useRef(callback);
  ref.current = callback;
  const lastRun = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastArgs = useRef<TArgs | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  return useCallback(
    (...args: TArgs) => {
      const now = Date.now();
      const elapsed = now - lastRun.current;
      lastArgs.current = args;
      if (elapsed >= intervalMs) {
        lastRun.current = now;
        ref.current(...args);
        return;
      }
      if (timer.current) return;
      timer.current = setTimeout(() => {
        timer.current = null;
        lastRun.current = Date.now();
        if (lastArgs.current) ref.current(...lastArgs.current);
      }, intervalMs - elapsed);
    },
    [intervalMs]
  );
}
