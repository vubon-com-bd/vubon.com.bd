// External libraries
// No external imports needed

// Shared packages
// No shared package imports needed

// Project files
// No project file imports needed

export enum CheckoutStep {
  CART = 'CART',
  ADDRESS = 'ADDRESS',
  DELIVERY = 'DELIVERY',
  PAYMENT = 'PAYMENT',
  REVIEW = 'REVIEW',
  CONFIRMATION = 'CONFIRMATION',
}

export const CHECKOUT_STEP_META = {
  [CheckoutStep.CART]: {
    label: 'কার্ট',
    order: 1,
    icon: 'shopping-cart',
    validationRules: ['cart_not_empty', 'cart_total_valid'] as const,
    completionConditions: ['cart_items_verified', 'total_amount_checked'] as const,
  },
  [CheckoutStep.ADDRESS]: {
    label: 'ঠিকানা',
    order: 2,
    icon: 'map-marker',
    validationRules: ['address_required', 'address_verified'] as const,
    completionConditions: ['shipping_address_filled', 'billing_address_filled'] as const,
  },
  [CheckoutStep.DELIVERY]: {
    label: 'ডেলিভারি',
    order: 3,
    icon: 'truck',
    validationRules: ['delivery_method_selected', 'delivery_time_valid'] as const,
    completionConditions: ['delivery_option_confirmed', 'delivery_charge_calculated'] as const,
  },
  [CheckoutStep.PAYMENT]: {
    label: 'পেমেন্ট',
    order: 4,
    icon: 'credit-card',
    validationRules: ['payment_method_selected', 'payment_details_valid'] as const,
    completionConditions: ['payment_authorized', 'payment_confirmed'] as const,
  },
  [CheckoutStep.REVIEW]: {
    label: 'রিভিউ',
    order: 5,
    icon: 'clipboard-check',
    validationRules: ['all_data_complete', 'terms_accepted'] as const,
    completionConditions: ['order_details_confirmed', 'final_approval_given'] as const,
  },
  [CheckoutStep.CONFIRMATION]: {
    label: 'নিশ্চিতকরণ',
    order: 6,
    icon: 'check-double',
    validationRules: [] as const,
    completionConditions: ['order_placed', 'confirmation_sent'] as const,
  },
} as const;

export type CheckoutStepMeta = typeof CHECKOUT_STEP_META;

export const STEP_ORDER = [
  CheckoutStep.CART,
  CheckoutStep.ADDRESS,
  CheckoutStep.DELIVERY,
  CheckoutStep.PAYMENT,
  CheckoutStep.REVIEW,
  CheckoutStep.CONFIRMATION,
] as const;

export type StepOrder = typeof STEP_ORDER;

export const STEP_VALIDATION_MAP: Record<CheckoutStep, readonly string[]> = {
  [CheckoutStep.CART]: CHECKOUT_STEP_META[CheckoutStep.CART].validationRules,
  [CheckoutStep.ADDRESS]: CHECKOUT_STEP_META[CheckoutStep.ADDRESS].validationRules,
  [CheckoutStep.DELIVERY]: CHECKOUT_STEP_META[CheckoutStep.DELIVERY].validationRules,
  [CheckoutStep.PAYMENT]: CHECKOUT_STEP_META[CheckoutStep.PAYMENT].validationRules,
  [CheckoutStep.REVIEW]: CHECKOUT_STEP_META[CheckoutStep.REVIEW].validationRules,
  [CheckoutStep.CONFIRMATION]: CHECKOUT_STEP_META[CheckoutStep.CONFIRMATION].validationRules,
} as const;

export type StepValidationMap = typeof STEP_VALIDATION_MAP;

export const STEP_COMPLETION_MAP: Record<CheckoutStep, readonly string[]> = {
  [CheckoutStep.CART]: CHECKOUT_STEP_META[CheckoutStep.CART].completionConditions,
  [CheckoutStep.ADDRESS]: CHECKOUT_STEP_META[CheckoutStep.ADDRESS].completionConditions,
  [CheckoutStep.DELIVERY]: CHECKOUT_STEP_META[CheckoutStep.DELIVERY].completionConditions,
  [CheckoutStep.PAYMENT]: CHECKOUT_STEP_META[CheckoutStep.PAYMENT].completionConditions,
  [CheckoutStep.REVIEW]: CHECKOUT_STEP_META[CheckoutStep.REVIEW].completionConditions,
  [CheckoutStep.CONFIRMATION]: CHECKOUT_STEP_META[CheckoutStep.CONFIRMATION].completionConditions,
} as const;

export type StepCompletionMap = typeof STEP_COMPLETION_MAP;

export function getNextStep(currentStep: CheckoutStep): CheckoutStep | null {
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  if (currentIndex === -1 || currentIndex === STEP_ORDER.length - 1) {
    return null;
  }
  return STEP_ORDER[currentIndex + 1];
}

export function getPreviousStep(currentStep: CheckoutStep): CheckoutStep | null {
  const currentIndex = STEP_ORDER.indexOf(currentStep);
  if (currentIndex <= 0) {
    return null;
  }
  return STEP_ORDER[currentIndex - 1];
}
