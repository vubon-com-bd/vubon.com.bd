import { useEffect, useRef } from 'react';

/** Run a callback exactly once on unmount. */
export function useUnmount(callback: () => void): void {
  const ref = useRef(callback);
  ref.current = callback;
  useEffect(
    () => () => {
      ref.current();
    },
    []
  );
}
