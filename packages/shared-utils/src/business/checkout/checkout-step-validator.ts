import { CHECKOUT_STEP } from '@vubon/shared-constants/src/business/checkout/checkout-step.constants';

export interface CheckoutStepInput {
  type: string;
  order: number;
}

export const validateCheckoutStep = (
  step: Partial<CheckoutStepInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!step.type) errors.push('Step type is required');
  if (step.type && !Object.keys(CHECKOUT_STEP).includes(step.type)) {
    errors.push('Invalid step type');
  }
  if (step.order !== undefined && step.order < 0) {
    errors.push('Invalid step order');
  }
  return { isValid: errors.length === 0, errors };
};

export const getNextStep = <T extends CheckoutStepInput>(
  currentStep: number,
  steps: T[]
): T | null => {
  const next = steps.find((s) => s.order === currentStep + 1);
  return next || null;
};
