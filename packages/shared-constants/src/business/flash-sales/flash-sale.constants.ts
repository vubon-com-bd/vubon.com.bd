/**
 * Flash Sale Constants - Base
 * ফ্ল্যাশ সেল সম্পর্কিত মূল কনস্ট্যান্টস
 */

import { STATUS } from '../../common';
import { PRODUCT } from '../product/product.constants';

export const FLASH_SALE = {
  // Flash sale status
  STATUS: {
    DRAFT: 'draft',
    SCHEDULED: 'scheduled',
    ACTIVE: 'active',
    PAUSED: 'paused',
    ENDED: 'ended',
    CANCELLED: 'cancelled',
    ARCHIVED: 'archived',
    DELETED: STATUS.DELETED,
  },

  // Flash sale types
  TYPES: {
    REGULAR: 'regular',
    LIMITED: 'limited',
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
    HOLIDAY: 'holiday',
    SEASONAL: 'seasonal',
    FLASH: 'flash',
    MEGA: 'mega',
  },

  // Flash sale visibility
  VISIBILITY: {
    PUBLIC: 'public',
    PRIVATE: 'private',
    MEMBERS_ONLY: 'members_only',
    PREVIEW: 'preview',
  },

  // Product types (from PRODUCT)
  PRODUCT_TYPES: {
    PHYSICAL: PRODUCT.TYPES.PHYSICAL,
    DIGITAL: PRODUCT.TYPES.DIGITAL,
    SERVICE: PRODUCT.TYPES.SERVICE,
    SUBSCRIPTION: PRODUCT.TYPES.SUBSCRIPTION,
  },

  // Default values
  DEFAULTS: {
    MIN_DURATION: 60, // 1 hour
    MAX_DURATION: 86400, // 24 hours
    DEFAULT_DURATION: 3600, // 1 hour
    MAX_PRODUCTS: 100,
    MAX_QUANTITY_PER_USER: 5,
    MIN_QUANTITY_PER_USER: 1,
    MAX_DISCOUNT: 90, // 90%
    MIN_DISCOUNT: 5, // 5%
  },
} as const;

export type FlashSaleStatus = (typeof FLASH_SALE.STATUS)[keyof typeof FLASH_SALE.STATUS];
export type FlashSaleType = (typeof FLASH_SALE.TYPES)[keyof typeof FLASH_SALE.TYPES];
export type FlashSaleVisibility =
  (typeof FLASH_SALE.VISIBILITY)[keyof typeof FLASH_SALE.VISIBILITY];
