import { useEffect, useRef } from 'react';

export function usePrevious<T = unknown>(value: T): T | undefined {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export function usePreviousDistinct<T = unknown>(value: T): T | undefined {
  const ref = useRef<T>();
  const prevValue = ref.current;

  useEffect(() => {
    if (prevValue !== value) {
      ref.current = value;
    }
  });

  return prevValue;
}
