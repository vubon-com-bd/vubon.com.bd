'use client';
import { useCallback, useState } from 'react';

export interface UseStepperResult {
  readonly current: number;
  readonly total: number;
  readonly isFirst: boolean;
  readonly isLast: boolean;
  readonly next: () => void;
  readonly prev: () => void;
  readonly goTo: (step: number) => void;
  readonly reset: () => void;
}

/** UI-only stepper state. */
export function useStepper(totalSteps: number): UseStepperResult {
  const [current, setCurrent] = useState(0);
  const total = Math.max(1, totalSteps);

  const next = useCallback(() => setCurrent((i) => Math.min(i + 1, total - 1)), [total]);
  const prev = useCallback(() => setCurrent((i) => Math.max(i - 1, 0)), []);
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
