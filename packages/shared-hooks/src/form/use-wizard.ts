import { useCallback, useState } from 'react';

export interface WizardStep {
  readonly id: string;
  readonly title: string;
  readonly validate?: () => boolean | Promise<boolean>;
}

export function useWizard(steps: readonly WizardStep[]): {
  readonly currentIndex: number;
  readonly currentStep: WizardStep | null;
  readonly completed: ReadonlySet<string>;
  readonly canGoNext: boolean;
  readonly canGoPrev: boolean;
  readonly next: () => Promise<void>;
  readonly prev: () => void;
  readonly goTo: (index: number) => void;
  readonly reset: () => void;
} {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const currentStep = steps[currentIndex] ?? null;

  const next = useCallback(async () => {
    const step = steps[currentIndex];
    if (!step) return;
    if (step.validate) {
      const ok = await step.validate();
      if (!ok) return;
    }
    setCompleted((prev) => new Set(prev).add(step.id));
    setCurrentIndex((i) => Math.min(i + 1, steps.length - 1));
  }, [currentIndex, steps]);

  const prev = useCallback(() => setCurrentIndex((i) => Math.max(i - 1, 0)), []);
  const goTo = useCallback(
    (index: number) => setCurrentIndex(Math.max(0, Math.min(index, steps.length - 1))),
    [steps.length]
  );
  const reset = useCallback(() => {
    setCurrentIndex(0);
    setCompleted(new Set());
  }, []);

  return {
    currentIndex,
    currentStep,
    completed,
    canGoNext: currentIndex < steps.length - 1,
    canGoPrev: currentIndex > 0,
    next,
    prev,
    goTo,
    reset,
  };
}
