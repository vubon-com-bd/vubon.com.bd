import { useState, useCallback } from 'react';

export interface UseStepOptions {
  totalSteps: number;
  initialStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
}

export interface UseStepReturn {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  goToStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;
  reset: () => void;
}

export const useStep = (options: UseStepOptions): UseStepReturn => {
  const { totalSteps, initialStep = 0, onStepChange, onComplete } = options;
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToStep = useCallback(
    (step: number) => {
      const next = Math.max(0, Math.min(step, totalSteps - 1));
      setCurrentStep(next);
      onStepChange?.(next);
    },
    [totalSteps, onStepChange]
  );

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) goToStep(currentStep + 1);
    else onComplete?.();
  }, [currentStep, totalSteps, goToStep, onComplete]);

  const previousStep = useCallback(() => {
    if (currentStep > 0) goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const reset = useCallback(() => goToStep(initialStep), [goToStep, initialStep]);

  return {
    currentStep,
    totalSteps,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
    progress: totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0,
    goToStep,
    nextStep,
    previousStep,
    reset,
  };
};
