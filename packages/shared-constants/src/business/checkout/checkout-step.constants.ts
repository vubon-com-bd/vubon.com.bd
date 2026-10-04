export const CHECKOUT_STEP = {
  CART_REVIEW: 'cart_review',
  SHIPPING_ADDRESS: 'shipping_address',
  SHIPPING_METHOD: 'shipping_method',
  BILLING_ADDRESS: 'billing_address',
  PAYMENT_METHOD: 'payment_method',
  ORDER_REVIEW: 'order_review',
  PAYMENT: 'payment',
  CONFIRMATION: 'confirmation',
} as const;

export const CHECKOUT_STEP_ORDER = {
  cart_review: 1,
  shipping_address: 2,
  shipping_method: 3,
  billing_address: 4,
  payment_method: 5,
  order_review: 6,
  payment: 7,
  confirmation: 8,
} as const;

export const CHECKOUT_STEP_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  SKIPPED: 'skipped',
  FAILED: 'failed',
} as const;

export type CheckoutStepType = (typeof CHECKOUT_STEP)[keyof typeof CHECKOUT_STEP];
export type CheckoutStepStatusType =
  (typeof CHECKOUT_STEP_STATUS)[keyof typeof CHECKOUT_STEP_STATUS];
