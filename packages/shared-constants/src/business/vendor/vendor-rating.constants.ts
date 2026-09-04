/**
 * Vendor Rating Constants
 * ভেন্ডর রেটিং সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';

export const VENDOR_RATING = {
  // Rating types (TYPES ব্যবহার করে)
  TYPES: {
    PRODUCT: 'product',
    SERVICE: TYPES.SERVICE,
    DELIVERY: 'delivery',
    COMMUNICATION: 'communication',
    OVERALL: 'overall',
  },

  // Rating values
  VALUES: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 0,
  },

  // Rating categories
  CATEGORIES: {
    QUALITY: 'quality',
    PRICE: 'price',
    SERVICE: TYPES.SERVICE,
    DELIVERY: 'delivery',
    COMMUNICATION: 'communication',
  },

  // Rating status
  STATUS: {
    PENDING: TYPES.PENDING,
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DELETED: TYPES.DELETED,
    FLAGGED: 'flagged',
  },

  // Default values
  DEFAULTS: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 500,
    MAX_IMAGES: 3,
    MAX_VIDEOS: 1,
  },
} as const;

export type VendorRatingType = (typeof VENDOR_RATING.TYPES)[keyof typeof VENDOR_RATING.TYPES];
export type VendorRatingCategory =
  (typeof VENDOR_RATING.CATEGORIES)[keyof typeof VENDOR_RATING.CATEGORIES];
export type VendorRatingStatus = (typeof VENDOR_RATING.STATUS)[keyof typeof VENDOR_RATING.STATUS];
