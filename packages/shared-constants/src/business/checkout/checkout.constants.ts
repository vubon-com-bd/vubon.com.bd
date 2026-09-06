/**
 * Checkout Main Constants
 * @module shared-constants/business/checkout/checkout.constants
 */

import { STATUS } from '../../common/status.constants';

export const CHECKOUT = {
  // Checkout status from common
  STATUS: STATUS,

  // Checkout specific
  MAX_CHECKOUT_ATTEMPTS: 3,
  CHECKOUT_TIMEOUT_MINUTES: 30,
  DEFAULT_CHECKOUT_STATUS: 'pending',
  CHECKOUT_CACHE_TTL: 3600,
  MAX_ADDRESSES_PER_CHECKOUT: 2,
  MIN_CHECKOUT_AMOUNT: 0,
  MAX_CHECKOUT_AMOUNT: 99999999.99,

  // Checkout type
  CHECKOUT_TYPE: {
    REGULAR: 'regular',
    GUEST: 'guest',
    EXPRESS: 'express',
    BULK: 'bulk',
    SUBSCRIPTION: 'subscription',
  } as const,

  // Checkout status values
  CHECKOUT_STATUS_VALUES: {
    PENDING: 'pending',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed',
    FAILED: 'failed',
    CANCELLED: 'cancelled',
    EXPIRED: 'expired',
  } as const,
} as const;

export type CheckoutType = (typeof CHECKOUT.CHECKOUT_TYPE)[keyof typeof CHECKOUT.CHECKOUT_TYPE];
export type CheckoutStatusValue =
  (typeof CHECKOUT.CHECKOUT_STATUS_VALUES)[keyof typeof CHECKOUT.CHECKOUT_STATUS_VALUES];
