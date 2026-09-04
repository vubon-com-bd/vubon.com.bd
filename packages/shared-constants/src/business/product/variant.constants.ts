/**
 * Variant Constants
 * ভেরিয়েন্ট সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const VARIANT = {
  // Variant status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    DELETED: STATUS.DELETED,
    OUT_OF_STOCK: 'out_of_stock',
  },

  // Variant types
  TYPES: {
    SIZE: 'size',
    COLOR: 'color',
    MATERIAL: 'material',
    STYLE: 'style',
    WEIGHT: 'weight',
    DIMENSION: 'dimension',
    CUSTOM: 'custom',
  },

  // Default values
  DEFAULTS: {
    MAX_ATTRIBUTES: 3,
    MIN_PRICE: 0,
    DEFAULT_QUANTITY: 0,
  },
} as const;

export type VariantStatus = (typeof VARIANT.STATUS)[keyof typeof VARIANT.STATUS];
export type VariantType = (typeof VARIANT.TYPES)[keyof typeof VARIANT.TYPES];

export const VARIANT_STATUS = VARIANT.STATUS;
export const VARIANT_TYPES = VARIANT.TYPES;
