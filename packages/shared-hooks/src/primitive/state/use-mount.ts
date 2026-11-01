import { useEffect, useRef } from 'react';

/**
 * Run a callback exactly once after mount.
 * Uses a ref so changing the callback identity does not re-run.
 */
export function useMount(callback: () => void): void {
  const ref = useRef(callback);
  ref.current = callback;

  useEffect(() => {
    ref.current();
  }, []);
}
