/**
 * Vendor Status Constants
 * ভেন্ডর স্ট্যাটাস সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { VENDOR } from './vendor.constants';

export const VENDOR_STATUS = {
  // Common statuses
  ...STATUS,

  // Vendor specific statuses
  ACTIVE: VENDOR.STATUS.ACTIVE,
  INACTIVE: VENDOR.STATUS.INACTIVE,
  PENDING: VENDOR.STATUS.PENDING,
  SUSPENDED: VENDOR.STATUS.SUSPENDED,
  DELETED: VENDOR.STATUS.DELETED,
  APPROVED: VENDOR.STATUS.APPROVED,
  REJECTED: VENDOR.STATUS.REJECTED,
  VERIFIED: VENDOR.STATUS.VERIFIED,
  UNVERIFIED: VENDOR.STATUS.UNVERIFIED,
  ON_HOLD: VENDOR.STATUS.ON_HOLD,

  // Additional vendor statuses
  REGISTERED: 'registered',
  ONBOARDING: 'onboarding',
  COMPLETED: 'completed',
  EXPIRED: 'expired',
} as const;

export type VendorStatusType = (typeof VENDOR_STATUS)[keyof typeof VENDOR_STATUS];
