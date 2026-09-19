import { useCallback, useState } from 'react';

export interface CounterActions {
  readonly increment: () => void;
  readonly decrement: () => void;
  readonly set: (value: number) => void;
  readonly reset: () => void;
}

export function useCounter(initial = 0): readonly [number, CounterActions] {
  const [value, setValue] = useState(initial);

  const increment = useCallback(() => setValue((v) => v + 1), []);
  const decrement = useCallback(() => setValue((v) => v - 1), []);
  const set = useCallback((v: number) => setValue(v), []);
  const reset = useCallback(() => setValue(initial), [initial]);

  return [value, { increment, decrement, set, reset }] as const;
}
