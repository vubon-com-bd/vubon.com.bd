/**
 * Vendor Return Policy Constants
 * ভেন্ডর রিটার্ন পলিসি সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_RETURN_POLICY = {
  // Return policy types (TYPES ব্যবহার করে)
  TYPES: {
    STANDARD: TYPES.STANDARD,
    EXTENDED: 'extended',
    NO_RETURN: 'no_return',
    REPLACEMENT: 'replacement',
    STORE_CREDIT: 'store_credit',
  },

  // Return reasons
  REASONS: {
    DAMAGED: 'damaged',
    DEFECTIVE: 'defective',
    WRONG_ITEM: 'wrong_item',
    NOT_AS_DESCRIBED: 'not_as_described',
    CHANGED_MIND: 'changed_mind',
    SIZE_ISSUE: 'size_issue',
    COLOR_ISSUE: 'color_issue',
    QUALITY_ISSUE: 'quality_issue',
    DELIVERY_ISSUE: 'delivery_issue',
  },

  // Return status
  STATUS: {
    PENDING: TYPES.PENDING,
    APPROVED: 'approved',
    REJECTED: 'rejected',
    PROCESSING: 'processing',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled',
  },

  // Default values
  DEFAULTS: {
    RETURN_WINDOW: 7, // days
    REPLACEMENT_WINDOW: 15, // days
    RESTOCKING_FEE: 10, // percentage
    MAX_ITEMS: 10,
  },
} as const;

export type VendorReturnPolicyType =
  (typeof VENDOR_RETURN_POLICY.TYPES)[keyof typeof VENDOR_RETURN_POLICY.TYPES];
export type VendorReturnReason =
  (typeof VENDOR_RETURN_POLICY.REASONS)[keyof typeof VENDOR_RETURN_POLICY.REASONS];
export type VendorReturnStatus =
  (typeof VENDOR_RETURN_POLICY.STATUS)[keyof typeof VENDOR_RETURN_POLICY.STATUS];
