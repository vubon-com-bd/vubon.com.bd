import { useCallback, useRef } from 'react';

/**
 * Returns a stable callback that always calls the latest `fn`.
 * Useful for event handlers passed to memoized children.
 */
export function useCallbackRef<T extends (...args: never[]) => unknown>(fn: T): T {
  const ref = useRef(fn);
  ref.current = fn;
  return useCallback(((...args: Parameters<T>) => ref.current(...args)) as T, []);
}
