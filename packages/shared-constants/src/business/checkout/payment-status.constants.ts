/**
 * Payment Status Constants
 * পেমেন্ট স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const PAYMENT_STATUS = {
  // Common statuses
  ...STATUS,

  // Payment specific statuses
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
  PARTIAL_REFUNDED: 'partial_refunded',
  AUTHORIZED: 'authorized',
  CAPTURED: 'captured',
  VOIDED: 'voided',
  EXPIRED: 'expired',
  DISPUTED: 'disputed',
  CHARGEBACK: 'chargeback',
} as const;

export type PaymentStatusType = (typeof PAYMENT_STATUS)[keyof typeof PAYMENT_STATUS];
