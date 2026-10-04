import { useEffect, useRef } from 'react';

/** `useEffect` that skips the first render. */
export function useUpdateEffect(
  effect: () => void | (() => void),
  deps: readonly unknown[] = []
): void {
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    return effect();
  }, deps);
}
