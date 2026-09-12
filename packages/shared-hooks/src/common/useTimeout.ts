import { useEffect, useRef, useCallback } from 'react';

export interface UseTimeoutReturn {
  reset: () => void;
  clear: () => void;
}

export const useTimeout = (callback: () => void, delay: number | null): UseTimeoutReturn => {
  const savedCallback = useRef(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const set = useCallback(() => {
    clear();
    if (delay !== null) {
      timeoutRef.current = setTimeout(() => savedCallback.current(), delay);
    }
  }, [delay, clear]);

  useEffect(() => {
    set();
    return clear;
  }, [set, clear]);

  return { reset: set, clear };
};
