/**
 * Flash Sale Config
 * ফ্ল্যাশ সেল কনফিগারেশন
 */

import { FLASH_SALE } from '@vubon/shared-constants';

export interface FlashSaleConfig {
  enabled: boolean;
  maxParticipants: number;
  minDiscount: number;
  maxDiscount: number;
  duration: {
    min: number;
    max: number;
  };
  maxProducts: number;
  maxQuantityPerUser: number;
  minQuantityPerUser: number;
  status: Record<string, string>;
  types: Record<string, string>;
  visibility: Record<string, string>;
  productTypes: Record<string, string>;
  defaults: {
    minDuration: number;
    maxDuration: number;
    defaultDuration: number;
    maxProducts: number;
    maxQuantityPerUser: number;
    minQuantityPerUser: number;
    maxDiscount: number;
    minDiscount: number;
  };
}

export const flashSaleConfig: FlashSaleConfig = {
  enabled: true,
  maxParticipants: 1000,
  minDiscount: 10,
  maxDiscount: 90,
  duration: {
    min: 1,
    max: 24,
  },
  maxProducts: 100,
  maxQuantityPerUser: 5,
  minQuantityPerUser: 1,

  status: {
    draft: FLASH_SALE.STATUS.DRAFT,
    scheduled: FLASH_SALE.STATUS.SCHEDULED,
    active: FLASH_SALE.STATUS.ACTIVE,
    paused: FLASH_SALE.STATUS.PAUSED,
    ended: FLASH_SALE.STATUS.ENDED,
    cancelled: FLASH_SALE.STATUS.CANCELLED,
    archived: FLASH_SALE.STATUS.ARCHIVED,
    deleted: FLASH_SALE.STATUS.DELETED,
  },

  types: {
    regular: FLASH_SALE.TYPES.REGULAR,
    limited: FLASH_SALE.TYPES.LIMITED,
    daily: FLASH_SALE.TYPES.DAILY,
    weekly: FLASH_SALE.TYPES.WEEKLY,
    monthly: FLASH_SALE.TYPES.MONTHLY,
    holiday: FLASH_SALE.TYPES.HOLIDAY,
    seasonal: FLASH_SALE.TYPES.SEASONAL,
    flash: FLASH_SALE.TYPES.FLASH,
    mega: FLASH_SALE.TYPES.MEGA,
  },

  visibility: {
    public: FLASH_SALE.VISIBILITY.PUBLIC,
    private: FLASH_SALE.VISIBILITY.PRIVATE,
    members_only: FLASH_SALE.VISIBILITY.MEMBERS_ONLY,
    preview: FLASH_SALE.VISIBILITY.PREVIEW,
  },

  productTypes: {
    physical: FLASH_SALE.PRODUCT_TYPES.PHYSICAL,
    digital: FLASH_SALE.PRODUCT_TYPES.DIGITAL,
    service: FLASH_SALE.PRODUCT_TYPES.SERVICE,
    subscription: FLASH_SALE.PRODUCT_TYPES.SUBSCRIPTION,
  },

  defaults: {
    minDuration: FLASH_SALE.DEFAULTS.MIN_DURATION,
    maxDuration: FLASH_SALE.DEFAULTS.MAX_DURATION,
    defaultDuration: FLASH_SALE.DEFAULTS.DEFAULT_DURATION,
    maxProducts: FLASH_SALE.DEFAULTS.MAX_PRODUCTS,
    maxQuantityPerUser: FLASH_SALE.DEFAULTS.MAX_QUANTITY_PER_USER,
    minQuantityPerUser: FLASH_SALE.DEFAULTS.MIN_QUANTITY_PER_USER,
    maxDiscount: FLASH_SALE.DEFAULTS.MAX_DISCOUNT,
    minDiscount: FLASH_SALE.DEFAULTS.MIN_DISCOUNT,
  },
} as const;

export type FlashSaleConfigType = typeof flashSaleConfig;
