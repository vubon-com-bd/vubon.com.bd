/**
 * Category Constants
 * ক্যাটাগরি সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const CATEGORY = {
  // Category status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Category types
  TYPES: {
    MAIN: 'main',
    SUB: 'sub',
    CHILD: 'child',
  },

  // Default values
  DEFAULTS: {
    MAX_DEPTH: 5,
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MAX_DESCRIPTION_LENGTH: 500,
    DEFAULT_SORT_ORDER: 0,
  },
} as const;

export type CategoryStatus = (typeof CATEGORY.STATUS)[keyof typeof CATEGORY.STATUS];
export type CategoryType = (typeof CATEGORY.TYPES)[keyof typeof CATEGORY.TYPES];

export const CATEGORY_STATUS = CATEGORY.STATUS;
export const CATEGORY_TYPES = CATEGORY.TYPES;
