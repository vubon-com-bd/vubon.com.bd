import { useState, useCallback } from 'react';

export interface UseCounterOptions {
  min?: number;
  max?: number;
  step?: number;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export const useCounter = (initialValue = 0, options: UseCounterOptions = {}): UseCounterReturn => {
  const { min = -Infinity, max = Infinity, step = 1 } = options;
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => setCount((c) => Math.min(c + step, max)), [step, max]);
  const decrement = useCallback(() => setCount((c) => Math.max(c - step, min)), [step, min]);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const set = useCallback(
    (value: number) => setCount(Math.min(Math.max(value, min), max)),
    [min, max]
  );

  return { count, increment, decrement, reset, set };
};
