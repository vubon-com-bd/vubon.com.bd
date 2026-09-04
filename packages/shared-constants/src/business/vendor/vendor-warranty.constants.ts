/**
 * Vendor Warranty Constants
 * ভেন্ডর ওয়ারেন্টি সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_WARRANTY = {
  // Warranty types (TYPES ব্যবহার করে)
  TYPES: {
    STANDARD: TYPES.STANDARD,
    EXTENDED: 'extended',
    LIFETIME: 'lifetime',
    NO_WARRANTY: 'no_warranty',
    SERVICE: TYPES.SERVICE,
    REPLACEMENT: 'replacement',
  },

  // Warranty coverage
  COVERAGE: {
    PARTS: 'parts',
    LABOR: 'labor',
    PARTS_AND_LABOR: 'parts_and_labor',
    REPLACEMENT: 'replacement',
    REPAIR: 'repair',
    REFUND: 'refund',
  },

  // Warranty status
  STATUS: {
    ACTIVE: TYPES.ACTIVE,
    EXPIRED: 'expired',
    CLAIMED: 'claimed',
    CANCELLED: 'cancelled',
    TRANSFERRED: 'transferred',
  },

  // Default values
  DEFAULTS: {
    STANDARD_DAYS: 365, // 1 year
    EXTENDED_DAYS: 730, // 2 years
    MAX_CLAIMS: 3,
    PROCESSING_TIME: 7, // days
  },
} as const;

export type VendorWarrantyType = (typeof VENDOR_WARRANTY.TYPES)[keyof typeof VENDOR_WARRANTY.TYPES];
export type VendorWarrantyCoverage =
  (typeof VENDOR_WARRANTY.COVERAGE)[keyof typeof VENDOR_WARRANTY.COVERAGE];
export type VendorWarrantyStatus =
  (typeof VENDOR_WARRANTY.STATUS)[keyof typeof VENDOR_WARRANTY.STATUS];
