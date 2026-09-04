/**
 * Checkout Status Constants
 * চেকআউট স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { CHECKOUT } from './checkout.constants';

export const CHECKOUT_STATUS = {
  // Common statuses
  ...STATUS,

  // Checkout specific statuses
  INITIATED: CHECKOUT.STATUS.INITIATED,
  IN_PROGRESS: CHECKOUT.STATUS.IN_PROGRESS,
  COMPLETED: CHECKOUT.STATUS.COMPLETED,
  FAILED: CHECKOUT.STATUS.FAILED,
  CANCELLED: CHECKOUT.STATUS.CANCELLED,
  EXPIRED: CHECKOUT.STATUS.EXPIRED,

  // Additional checkout statuses
  AWAITING_PAYMENT: 'awaiting_payment',
  PAYMENT_RECEIVED: 'payment_received',
  PROCESSING: 'processing',
  READY_TO_SHIP: 'ready_to_ship',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  RETURNED: 'returned',
  REFUNDED: 'refunded',
} as const;

export type CheckoutStatusType = (typeof CHECKOUT_STATUS)[keyof typeof CHECKOUT_STATUS];
