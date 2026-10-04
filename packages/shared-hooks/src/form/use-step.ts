import { useCallback, useState } from 'react';

export function useStep(initial = 0): {
  readonly step: number;
  readonly is: (n: number) => boolean;
  readonly next: () => void;
  readonly prev: () => void;
  readonly goTo: (n: number) => void;
  readonly reset: () => void;
} {
  const [step, setStep] = useState(initial);

  const next = useCallback(() => setStep((s) => s + 1), []);
  const prev = useCallback(() => setStep((s) => Math.max(0, s - 1)), []);
  const goTo = useCallback((n: number) => setStep(Math.max(0, n)), []);
  const is = useCallback((n: number) => step === n, [step]);
  const reset = useCallback(() => setStep(initial), [initial]);

  return { step, is, next, prev, goTo, reset };
}
