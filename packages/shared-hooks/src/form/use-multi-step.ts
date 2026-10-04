import { useCallback, useState } from 'react';

export function useMultiStep(totalSteps: number): {
  readonly current: number;
  readonly total: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;
  readonly next: () => void;
  readonly prev: () => void;
  readonly goTo: (step: number) => void;
  readonly reset: () => void;
} {
  const [current, setCurrent] = useState(0);
  const total = Math.max(1, totalSteps);

  const next = useCallback(() => setCurrent((s) => Math.min(s + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent((s) => Math.max(s - 1, 0)), []);
  const goTo = useCallback(
    (step: number) => setCurrent(Math.max(0, Math.min(step, total - 1))),
    [total]
  );
  const reset = useCallback(() => setCurrent(0), []);

  return {
    current,
    total,
    isFirst: current === 0,
    isLast: current === total - 1,
    next,
    prev,
    goTo,
    reset,
  };
}
