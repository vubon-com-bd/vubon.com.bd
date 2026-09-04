/**
 * Review Constants
 * রিভিউ সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const REVIEW = {
  // Review status
  STATUS: {
    PENDING: STATUS.PENDING,
    APPROVED: STATUS.APPROVED,
    REJECTED: STATUS.REJECTED,
    DELETED: STATUS.DELETED,
    FLAGGED: 'flagged',
    HIDDEN: 'hidden',
  },

  // Rating values
  RATINGS: {
    MIN: 1,
    MAX: 5,
    DEFAULT: 0,
  },

  // Review types
  TYPES: {
    PRODUCT: 'product',
    SELLER: 'seller',
    SERVICE: 'service',
  },

  // Default values
  DEFAULTS: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 1000,
    MAX_IMAGES: 5,
    MAX_VIDEOS: 2,
  },
} as const;

export type ReviewStatus = (typeof REVIEW.STATUS)[keyof typeof REVIEW.STATUS];
export type ReviewType = (typeof REVIEW.TYPES)[keyof typeof REVIEW.TYPES];

export const REVIEW_STATUS = REVIEW.STATUS;
export const REVIEW_TYPES = REVIEW.TYPES;
