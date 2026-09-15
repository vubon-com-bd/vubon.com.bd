import { useEffect, useRef, useState } from 'react';

/** Throttled value — updates at most once per `intervalMs`. */
export function useThrottle<T>(value: T, intervalMs = 300): T {
  const [throttled, setThrottled] = useState(value);
  const last = useRef(0);

  useEffect(() => {
    const now = Date.now();
    if (now - last.current >= intervalMs) {
      last.current = now;
      setThrottled(value);
      return;
    }
    const timer = setTimeout(
      () => {
        last.current = Date.now();
        setThrottled(value);
      },
      intervalMs - (now - last.current)
    );
    return () => clearTimeout(timer);
  }, [value, intervalMs]);

  return throttled;
}
