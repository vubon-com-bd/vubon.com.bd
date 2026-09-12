import { useState, useEffect, useRef, useCallback } from 'react';
import { DEBOUNCE } from '@vubon/shared-constants/src/common/use.constants';

/**
 * Debounce a value.
 */
export const useDebounce = <T>(value: T, delay: number = DEBOUNCE.DEFAULT_DELAY): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Debounce a callback.
 */
export const useDebouncedCallback = <TArgs extends unknown[]>(
  callback: (...args: TArgs) => void,
  delay: number = DEBOUNCE.DEFAULT_DELAY
): ((...args: TArgs) => void) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: TArgs) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => callbackRef.current(...args), delay);
    },
    [delay]
  );
};
