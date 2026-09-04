/**
 * Brand Constants
 * ব্র্যান্ড সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const BRAND = {
  // Brand status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Brand types
  TYPES: {
    INTERNATIONAL: 'international',
    LOCAL: 'local',
    PREMIUM: 'premium',
    ECONOMY: 'economy',
  },

  // Default values
  DEFAULTS: {
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
  },
} as const;

export type BrandStatus = (typeof BRAND.STATUS)[keyof typeof BRAND.STATUS];
export type BrandType = (typeof BRAND.TYPES)[keyof typeof BRAND.TYPES];

export const BRAND_STATUS = BRAND.STATUS;
export const BRAND_TYPES = BRAND.TYPES;
