/**
 * Checkout Step Constants
 * Step definitions for checkout process
 */

export const CHECKOUT_STEP = {
  // Checkout Steps
  STEPS: {
    CART: 'cart',
    INFORMATION: 'information',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    REVIEW: 'review',
    CONFIRMATION: 'confirmation',
    COMPLETE: 'complete',
  } as const,

  // Step Statuses
  STATUSES: {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    SKIPPED: 'skipped',
    FAILED: 'failed',
    LOCKED: 'locked',
  } as const,

  // Step Positions
  POSITIONS: {
    FIRST: 1,
    SECOND: 2,
    THIRD: 3,
    FOURTH: 4,
    FIFTH: 5,
    SIXTH: 6,
    SEVENTH: 7,
  } as const,

  // Step Icons (for UI)
  ICONS: {
    CART: '🛒',
    INFORMATION: '📝',
    SHIPPING: '🚚',
    PAYMENT: '💳',
    REVIEW: '📋',
    CONFIRMATION: '✅',
    COMPLETE: '🎉',
  } as const,

  // Step Defaults
  DEFAULTS: {
    DEFAULT_STEP: 'information',
    DEFAULT_STATUS: 'pending',
  } as const,
} as const;

// Checkout Steps
export type CheckoutStepType = (typeof CHECKOUT_STEP.STEPS)[keyof typeof CHECKOUT_STEP.STEPS];

// Step Statuses
export type CheckoutStepStatus =
  (typeof CHECKOUT_STEP.STATUSES)[keyof typeof CHECKOUT_STEP.STATUSES];

// Step Positions
export type CheckoutStepPosition =
  (typeof CHECKOUT_STEP.POSITIONS)[keyof typeof CHECKOUT_STEP.POSITIONS];

// Step Icons
export type CheckoutStepIcon = (typeof CHECKOUT_STEP.ICONS)[keyof typeof CHECKOUT_STEP.ICONS];

// Step Defaults
export type CheckoutStepDefault =
  (typeof CHECKOUT_STEP.DEFAULTS)[keyof typeof CHECKOUT_STEP.DEFAULTS];

// Utility Functions
export function checkoutstepGetStepLabel(step: CheckoutStepType): string {
  const labels: Record<CheckoutStepType, string> = {
    [CHECKOUT_STEP.STEPS.CART]: 'Cart',
    [CHECKOUT_STEP.STEPS.INFORMATION]: 'Information',
    [CHECKOUT_STEP.STEPS.SHIPPING]: 'Shipping',
    [CHECKOUT_STEP.STEPS.PAYMENT]: 'Payment',
    [CHECKOUT_STEP.STEPS.REVIEW]: 'Review',
    [CHECKOUT_STEP.STEPS.CONFIRMATION]: 'Confirmation',
    [CHECKOUT_STEP.STEPS.COMPLETE]: 'Complete',
  };
  return labels[step] || 'Unknown Step';
}

export function checkoutstepGetStepStatusLabel(status: CheckoutStepStatus): string {
  const labels: Record<CheckoutStepStatus, string> = {
    [CHECKOUT_STEP.STATUSES.PENDING]: 'Pending',
    [CHECKOUT_STEP.STATUSES.ACTIVE]: 'Active',
    [CHECKOUT_STEP.STATUSES.COMPLETED]: 'Completed',
    [CHECKOUT_STEP.STATUSES.SKIPPED]: 'Skipped',
    [CHECKOUT_STEP.STATUSES.FAILED]: 'Failed',
    [CHECKOUT_STEP.STATUSES.LOCKED]: 'Locked',
  };
  return labels[status] || 'Unknown Status';
}

export function checkoutstepGetStepPosition(step: CheckoutStepType): CheckoutStepPosition {
  const positions: Record<CheckoutStepType, CheckoutStepPosition> = {
    [CHECKOUT_STEP.STEPS.CART]: CHECKOUT_STEP.POSITIONS.FIRST,
    [CHECKOUT_STEP.STEPS.INFORMATION]: CHECKOUT_STEP.POSITIONS.SECOND,
    [CHECKOUT_STEP.STEPS.SHIPPING]: CHECKOUT_STEP.POSITIONS.THIRD,
    [CHECKOUT_STEP.STEPS.PAYMENT]: CHECKOUT_STEP.POSITIONS.FOURTH,
    [CHECKOUT_STEP.STEPS.REVIEW]: CHECKOUT_STEP.POSITIONS.FIFTH,
    [CHECKOUT_STEP.STEPS.CONFIRMATION]: CHECKOUT_STEP.POSITIONS.SIXTH,
    [CHECKOUT_STEP.STEPS.COMPLETE]: CHECKOUT_STEP.POSITIONS.SEVENTH,
  };
  return positions[step] || CHECKOUT_STEP.POSITIONS.FIRST;
}

export function checkoutstepGetStepIcon(step: CheckoutStepType): CheckoutStepIcon {
  const icons: Record<CheckoutStepType, CheckoutStepIcon> = {
    [CHECKOUT_STEP.STEPS.CART]: CHECKOUT_STEP.ICONS.CART,
    [CHECKOUT_STEP.STEPS.INFORMATION]: CHECKOUT_STEP.ICONS.INFORMATION,
    [CHECKOUT_STEP.STEPS.SHIPPING]: CHECKOUT_STEP.ICONS.SHIPPING,
    [CHECKOUT_STEP.STEPS.PAYMENT]: CHECKOUT_STEP.ICONS.PAYMENT,
    [CHECKOUT_STEP.STEPS.REVIEW]: CHECKOUT_STEP.ICONS.REVIEW,
    [CHECKOUT_STEP.STEPS.CONFIRMATION]: CHECKOUT_STEP.ICONS.CONFIRMATION,
    [CHECKOUT_STEP.STEPS.COMPLETE]: CHECKOUT_STEP.ICONS.COMPLETE,
  };
  return icons[step] || CHECKOUT_STEP.ICONS.CART;
}

export function checkoutstepIsValidStep(step: string): step is CheckoutStepType {
  return Object.values(CHECKOUT_STEP.STEPS).includes(step as CheckoutStepType);
}

export function checkoutstepIsActive(status: CheckoutStepStatus): boolean {
  return status === CHECKOUT_STEP.STATUSES.ACTIVE;
}

export function checkoutstepIsCompleted(status: CheckoutStepStatus): boolean {
  return status === CHECKOUT_STEP.STATUSES.COMPLETED;
}

export function checkoutstepCanProceed(status: CheckoutStepStatus): boolean {
  const canProceedStatuses: CheckoutStepStatus[] = [
    CHECKOUT_STEP.STATUSES.COMPLETED,
    CHECKOUT_STEP.STATUSES.SKIPPED,
  ];
  return canProceedStatuses.includes(status);
}

export function checkoutstepIsLocked(status: CheckoutStepStatus): boolean {
  return status === CHECKOUT_STEP.STATUSES.LOCKED;
}

export function checkoutstepGetDefaultStep(): CheckoutStepType {
  return CHECKOUT_STEP.DEFAULTS.DEFAULT_STEP;
}
