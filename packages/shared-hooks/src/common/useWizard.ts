import { useState, useCallback } from 'react';
import { useStep } from './useStep';

export interface WizardStep<T> {
  id: string;
  label: string;
  validate?: (data: T) => boolean;
}

export interface UseWizardOptions<T> {
  steps: WizardStep<T>[];
  initialData: T;
  onComplete?: (data: T) => void | Promise<void>;
}

export interface UseWizardReturn<T> {
  currentStep: number;
  totalSteps: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  progress: number;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
  data: T;
  updateData: (values: Partial<T>) => void;
  setData: (data: T) => void;
  canProceed: () => boolean;
  currentStepData: WizardStep<T> | undefined;
}

export const useWizard = <T extends Record<string, unknown>>(
  options: UseWizardOptions<T>
): UseWizardReturn<T> => {
  const { steps, initialData, onComplete } = options;
  const [data, setData] = useState<T>(initialData);

  const step = useStep({
    totalSteps: steps.length,
    onComplete: () => {
      void onComplete?.(data);
    },
  });

  const updateData = useCallback((values: Partial<T>) => {
    setData((prev) => ({ ...prev, ...values }));
  }, []);

  const canProceed = useCallback((): boolean => {
    const current = steps[step.currentStep];
    if (current?.validate) return current.validate(data);
    return true;
  }, [steps, step.currentStep, data]);

  return {
    ...step,
    data,
    updateData,
    setData,
    canProceed,
    currentStepData: steps[step.currentStep],
  };
};
