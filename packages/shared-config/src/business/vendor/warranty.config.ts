/**
 * Warranty Config
 * ওয়ারেন্টি কনফিগারেশন
 */

import { VENDOR_WARRANTY } from '@vubon/shared-constants';

export interface WarrantyConfig {
  enabled: boolean;
  types: Record<string, string>;
  coverage: Record<string, string>;
  status: Record<string, string>;
  defaultMonths: number;
  maxMonths: number;
  maxClaims: number;
  defaults: {
    standardDays: number;
    extendedDays: number;
    maxClaims: number;
    processingTime: number;
  };
}

export const warrantyConfig: WarrantyConfig = {
  enabled: true,

  types: {
    standard: VENDOR_WARRANTY.TYPES.STANDARD,
    extended: VENDOR_WARRANTY.TYPES.EXTENDED,
    lifetime: VENDOR_WARRANTY.TYPES.LIFETIME,
    no_warranty: VENDOR_WARRANTY.TYPES.NO_WARRANTY,
    service: VENDOR_WARRANTY.TYPES.SERVICE,
    replacement: VENDOR_WARRANTY.TYPES.REPLACEMENT,
  },

  coverage: {
    parts: VENDOR_WARRANTY.COVERAGE.PARTS,
    labor: VENDOR_WARRANTY.COVERAGE.LABOR,
    parts_and_labor: VENDOR_WARRANTY.COVERAGE.PARTS_AND_LABOR,
    replacement: VENDOR_WARRANTY.COVERAGE.REPLACEMENT,
    repair: VENDOR_WARRANTY.COVERAGE.REPAIR,
    refund: VENDOR_WARRANTY.COVERAGE.REFUND,
  },

  status: {
    active: VENDOR_WARRANTY.STATUS.ACTIVE,
    expired: VENDOR_WARRANTY.STATUS.EXPIRED,
    claimed: VENDOR_WARRANTY.STATUS.CLAIMED,
    cancelled: VENDOR_WARRANTY.STATUS.CANCELLED,
    transferred: VENDOR_WARRANTY.STATUS.TRANSFERRED,
  },

  defaultMonths: 12,
  maxMonths: 24,
  maxClaims: 3,

  defaults: {
    standardDays: VENDOR_WARRANTY.DEFAULTS.STANDARD_DAYS,
    extendedDays: VENDOR_WARRANTY.DEFAULTS.EXTENDED_DAYS,
    maxClaims: VENDOR_WARRANTY.DEFAULTS.MAX_CLAIMS,
    processingTime: VENDOR_WARRANTY.DEFAULTS.PROCESSING_TIME,
  },
} as const;

export type WarrantyConfigType = typeof warrantyConfig;
