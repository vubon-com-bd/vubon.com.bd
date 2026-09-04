/**
 * Vendor Payout Status Constants
 * ভেন্ডর পেআউট স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { PAYOUT } from './vendor-payout.constants';

export const PAYOUT_STATUS = {
  // Common statuses
  ...STATUS,

  // Payout specific statuses
  PENDING: PAYOUT.STATUS.PENDING,
  PROCESSING: PAYOUT.STATUS.PROCESSING,
  COMPLETED: PAYOUT.STATUS.COMPLETED,
  FAILED: PAYOUT.STATUS.FAILED,
  CANCELLED: PAYOUT.STATUS.CANCELLED,
  APPROVED: PAYOUT.STATUS.APPROVED,
  REJECTED: PAYOUT.STATUS.REJECTED,
  ON_HOLD: PAYOUT.STATUS.ON_HOLD,

  // Additional payout statuses
  SCHEDULED: 'scheduled',
  INITIATED: 'initiated',
  CONFIRMED: 'confirmed',
} as const;

export type PayoutStatusType = (typeof PAYOUT_STATUS)[keyof typeof PAYOUT_STATUS];
