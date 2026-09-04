/**
 * Checkout Step Constants
 * চেকআউট স্টেপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { CHECKOUT } from './checkout.constants';

export const CHECKOUT_STEPS = {
  // Common types
  ...TYPES,

  // Checkout step specific types
  CART: CHECKOUT.STEPS.CART,
  SHIPPING: CHECKOUT.STEPS.SHIPPING,
  PAYMENT: CHECKOUT.STEPS.PAYMENT,
  REVIEW: CHECKOUT.STEPS.REVIEW,
  CONFIRMATION: CHECKOUT.STEPS.CONFIRMATION,

  // Additional checkout steps
  LOGIN: 'login',
  BILLING: 'billing',
  SHIPPING_METHOD: 'shipping_method',
  PAYMENT_METHOD: 'payment_method',
  ORDER_COMPLETE: 'order_complete',
} as const;

export type CheckoutStepValue = (typeof CHECKOUT_STEPS)[keyof typeof CHECKOUT_STEPS];
