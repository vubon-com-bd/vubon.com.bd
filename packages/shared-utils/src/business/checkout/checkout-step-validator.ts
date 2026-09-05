/**
 * Checkout Step Validator
 * চেকআউট স্টেপ ভ্যালিডেটর
 */

import { CHECKOUT_STEPS } from '@vubon/shared-constants';

export interface StepValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
}

export interface StepTransitionValidation {
  from: string;
  to: string;
  allowed: boolean;
  reason?: string;
}

export const validateCheckoutStep = (
  step: string,
  data: Record<string, unknown>
): StepValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  // Validate step exists
  const validSteps = Object.values(CHECKOUT_STEPS);
  if (!validSteps.includes(step as (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS])) {
    errors._step = ['Invalid checkout step'];
    valid = false;
  }

  // Step-specific validation
  switch (step) {
    case 'cart':
      if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
        errors.items = ['Cart items are required'];
        valid = false;
      }
      break;

    case 'shipping':
      if (!data.address) {
        errors.address = ['Shipping address is required'];
        valid = false;
      }
      if (!data.method) {
        errors.method = ['Shipping method is required'];
        valid = false;
      }
      break;

    case 'payment':
      if (!data.method) {
        errors.method = ['Payment method is required'];
        valid = false;
      }
      if (data.method === 'card' && !data.cardDetails) {
        errors.cardDetails = ['Card details are required'];
        valid = false;
      }
      break;

    case 'review':
      if (!data.confirmed || data.confirmed !== true) {
        errors.confirmed = ['Order confirmation is required'];
        valid = false;
      }
      break;

    case 'confirmation':
      // No validation needed for confirmation
      break;

    case 'login':
      if (!data.email || typeof data.email !== 'string') {
        errors.email = ['Email is required'];
        valid = false;
      }
      if (!data.password || typeof data.password !== 'string') {
        errors.password = ['Password is required'];
        valid = false;
      }
      break;

    case 'billing':
      if (!data.address) {
        errors.address = ['Billing address is required'];
        valid = false;
      }
      break;

    default:
      errors._step = [`Unknown step: ${step}`];
      valid = false;
  }

  return { valid, errors };
};

export const validateStepTransition = (
  from: string,
  to: string,
  currentData: Record<string, unknown>
): StepTransitionValidation => {
  // Check if steps are valid
  const validSteps = Object.values(CHECKOUT_STEPS);
  if (
    !validSteps.includes(from as (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS]) ||
    !validSteps.includes(to as (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS])
  ) {
    return {
      from,
      to,
      allowed: false,
      reason: 'Invalid step',
    };
  }

  // Define allowed transitions
  const allowedTransitions: Record<string, string[]> = {
    cart: ['shipping', 'login'],
    login: ['shipping', 'billing'],
    shipping: ['payment', 'shipping_method'],
    shipping_method: ['payment'],
    billing: ['shipping', 'payment'],
    payment: ['review', 'payment_method'],
    payment_method: ['review'],
    review: ['confirmation'],
    confirmation: [],
  };

  // Check if transition is allowed
  let allowed = allowedTransitions[from]?.includes(to) || false;

  // Additional validation based on current data
  if (allowed) {
    // Skip login if user is already logged in
    if (from === 'cart' && to === 'login' && currentData.isLoggedIn) {
      allowed = false;
      return {
        from,
        to,
        allowed: false,
        reason: 'User is already logged in',
      };
    }

    // Skip billing if same as shipping
    if (from === 'shipping' && to === 'billing' && currentData.sameAsBilling) {
      allowed = false;
      return {
        from,
        to,
        allowed: false,
        reason: 'Billing address is same as shipping',
      };
    }

    // Check if shipping address is provided
    if (from === 'shipping' && to === 'payment' && !currentData.address) {
      allowed = false;
      return {
        from,
        to,
        allowed: false,
        reason: 'Shipping address is required',
      };
    }

    // Check if payment method is provided
    if (from === 'payment' && to === 'review' && !currentData.method) {
      allowed = false;
      return {
        from,
        to,
        allowed: false,
        reason: 'Payment method is required',
      };
    }
  }

  if (!allowed) {
    return {
      from,
      to,
      allowed: false,
      reason: `Cannot transition from ${from} to ${to}`,
    };
  }

  return {
    from,
    to,
    allowed: true,
  };
};

export const getNextStep = (currentStep: string, data: Record<string, unknown>): string | null => {
  const stepOrder = ['cart', 'login', 'shipping', 'billing', 'payment', 'review', 'confirmation'];

  const currentIndex = stepOrder.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === stepOrder.length - 1) {
    return null;
  }

  // Skip login if user is already logged in
  if (currentStep === 'cart' && data.isLoggedIn) {
    return 'shipping';
  }

  // Skip billing if same as shipping
  if (currentStep === 'shipping' && data.sameAsBilling) {
    return 'payment';
  }

  return stepOrder[currentIndex + 1];
};

export const getPreviousStep = (currentStep: string): string | null => {
  const stepOrder = ['cart', 'login', 'shipping', 'billing', 'payment', 'review', 'confirmation'];

  const currentIndex = stepOrder.indexOf(currentStep);
  if (currentIndex <= 0) {
    return null;
  }

  return stepOrder[currentIndex - 1];
};

// Checkout step statuses
export const STEP_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  FAILED: 'failed',
  SKIPPED: 'skipped',
} as const;

export type StepStatus = (typeof STEP_STATUS)[keyof typeof STEP_STATUS];

export const isValidStepStatus = (status: string): status is StepStatus => {
  return Object.values(STEP_STATUS).includes(status as StepStatus);
};
