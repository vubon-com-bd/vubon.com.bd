import { useEffect, useRef } from 'react';

/** Runs `callback` after `delayMs`. Cleanup on unmount. */
export function useTimeout(callback: () => void, delayMs: number | null): void {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    if (delayMs === null) return;
    const id = setTimeout(() => ref.current(), delayMs);
    return () => clearTimeout(id);
  }, [delayMs]);
}
