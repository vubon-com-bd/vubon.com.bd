/**
 * Collection Constants
 * কালেকশন সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const COLLECTION = {
  // Collection status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
    EXPIRED: 'expired',
    DRAFT: 'draft',
    PUBLISHED: 'published',
    SCHEDULED: 'scheduled',
  },

  // Collection types
  TYPES: {
    MANUAL: 'manual',
    AUTOMATED: 'automated',
    SEASONAL: 'seasonal',
    HOLIDAY: 'holiday',
    PROMOTIONAL: 'promotional',
    CURATED: 'curated',
  },

  // Default values
  DEFAULTS: {
    MAX_PRODUCTS: 500,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    DEFAULT_SORT_ORDER: 0,
  },
} as const;

export type CollectionStatus = (typeof COLLECTION.STATUS)[keyof typeof COLLECTION.STATUS];
export type CollectionType = (typeof COLLECTION.TYPES)[keyof typeof COLLECTION.TYPES];

export const COLLECTION_STATUS = COLLECTION.STATUS;
export const COLLECTION_TYPES = COLLECTION.TYPES;
