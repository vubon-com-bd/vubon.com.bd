import { useEffect, useRef } from 'react';

/** Runs `callback` every `delayMs`. Pass `null` to pause. */
export function useInterval(callback: () => void, delayMs: number | null): void {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    if (delayMs === null) return;
    const id = setInterval(() => ref.current(), delayMs);
    return () => clearInterval(id);
  }, [delayMs]);
}
