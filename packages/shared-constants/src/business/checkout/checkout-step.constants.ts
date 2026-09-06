/**
 * Checkout Step Constants (EXTENDS common/types)
 * @module shared-constants/business/checkout/checkout-step.constants
 */

import { TYPES } from '../../common/types.constants';

export const CHECKOUT_STEP = {
  // Base types from common
  ...TYPES,

  // Checkout steps
  CHECKOUT_STEPS: {
    CART: 'cart',
    ADDRESS: 'address',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    REVIEW: 'review',
    CONFIRMATION: 'confirmation',
  } as const,

  // Step status
  CHECKOUT_STEP_STATUS: {
    PENDING: 'pending',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    FAILED: 'failed',
    SKIPPED: 'skipped',
    LOCKED: 'locked',
  } as const,

  // Step validation
  CHECKOUT_STEP_VALIDATION: {
    REQUIRED: 'required',
    OPTIONAL: 'optional',
    CONDITIONAL: 'conditional',
  } as const,

  // Step navigation
  CHECKOUT_STEP_NAVIGATION: {
    FORWARD: 'forward',
    BACKWARD: 'backward',
    DIRECT: 'direct',
  } as const,
} as const;

export type CheckoutStep =
  (typeof CHECKOUT_STEP.CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEP.CHECKOUT_STEPS];
export type CheckoutStepStatus =
  (typeof CHECKOUT_STEP.CHECKOUT_STEP_STATUS)[keyof typeof CHECKOUT_STEP.CHECKOUT_STEP_STATUS];
export type CheckoutStepValidation =
  (typeof CHECKOUT_STEP.CHECKOUT_STEP_VALIDATION)[keyof typeof CHECKOUT_STEP.CHECKOUT_STEP_VALIDATION];
export type CheckoutStepNavigation =
  (typeof CHECKOUT_STEP.CHECKOUT_STEP_NAVIGATION)[keyof typeof CHECKOUT_STEP.CHECKOUT_STEP_NAVIGATION];

export const CHECKOUT_STEP_LABELS: Record<CheckoutStep, string> = {
  cart: 'Shopping Cart',
  address: 'Shipping Address',
  shipping: 'Shipping Method',
  payment: 'Payment Method',
  review: 'Review Order',
  confirmation: 'Order Confirmation',
};

export const CHECKOUT_STEP_STATUS_LABELS: Record<CheckoutStepStatus, string> = {
  pending: 'Pending',
  active: 'Active',
  completed: 'Completed',
  failed: 'Failed',
  skipped: 'Skipped',
  locked: 'Locked',
};

export const CHECKOUT_STEP_STATUS_COLORS: Record<CheckoutStepStatus, string> = {
  pending: '#eab308',
  active: '#60a5fa',
  completed: '#22c55e',
  failed: '#ef4444',
  skipped: '#9ca3af',
  locked: '#dc2626',
};

export const CHECKOUT_STEP_ORDER: CheckoutStep[] = [
  'cart',
  'address',
  'shipping',
  'payment',
  'review',
  'confirmation',
] as const;
