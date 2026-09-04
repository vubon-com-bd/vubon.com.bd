/**
 * Deal Status Constants
 * ডিল স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { DEAL } from './deal.constants';

export const DEAL_STATUS = {
  // Common statuses
  ...STATUS,

  // Deal specific statuses
  ACTIVE: DEAL.STATUS.ACTIVE,
  INACTIVE: DEAL.STATUS.INACTIVE,
  EXPIRED: DEAL.STATUS.EXPIRED,
  COMPLETED: DEAL.STATUS.COMPLETED,
  CANCELLED: DEAL.STATUS.CANCELLED,
  PENDING: DEAL.STATUS.PENDING,

  // Additional deal statuses
  APPROVED: 'approved',
  REJECTED: 'rejected',
  PENDING_APPROVAL: 'pending_approval',
} as const;

export type DealStatusType = (typeof DEAL_STATUS)[keyof typeof DEAL_STATUS];
