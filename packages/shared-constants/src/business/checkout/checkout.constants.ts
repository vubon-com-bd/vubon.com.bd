/**
 * Checkout Constants - Base
 * চেকআউট সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { CART } from '../cart/cart.constants';

export const CHECKOUT = {
  // Checkout status
  STATUS: {
    INITIATED: 'initiated',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    PENDING: STATUS.PENDING,
    EXPIRED: 'expired',
  },

  // Checkout types
  TYPES: {
    GUEST: 'guest',
    REGISTERED: 'registered',
    EXPRESS: 'express',
    BULK: 'bulk',
  },

  // Checkout steps
  STEPS: {
    CART: 'cart',
    SHIPPING: 'shipping',
    PAYMENT: 'payment',
    REVIEW: 'review',
    CONFIRMATION: 'confirmation',
  },

  // Checkout source
  SOURCE: {
    WEB: 'web',
    MOBILE: 'mobile',
    API: 'api',
    POS: 'pos',
    MARKETPLACE: 'marketplace',
  },

  // Cart types (from CART)
  CART_TYPES: {
    REGULAR: CART.TYPES.REGULAR,
    WISHLIST: CART.TYPES.WISHLIST,
    SAVED: CART.TYPES.SAVED,
  },

  // Default values
  DEFAULTS: {
    TIMEOUT: 1800, // 30 minutes
    MAX_ATTEMPTS: 3,
    MIN_ORDER_AMOUNT: 0,
    MAX_ORDER_AMOUNT: 999999,
  },
} as const;

export type CheckoutStatus = (typeof CHECKOUT.STATUS)[keyof typeof CHECKOUT.STATUS];
export type CheckoutType = (typeof CHECKOUT.TYPES)[keyof typeof CHECKOUT.TYPES];
export type CheckoutStep = (typeof CHECKOUT.STEPS)[keyof typeof CHECKOUT.STEPS];
export type CheckoutSource = (typeof CHECKOUT.SOURCE)[keyof typeof CHECKOUT.SOURCE];
