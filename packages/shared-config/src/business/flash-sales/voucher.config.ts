/**
 * Voucher Config
 * ভাউচার কনফিগারেশন
 */

import { FLASH_SALE_VOUCHER } from '@vubon/shared-constants';

export interface VoucherConfig {
  enabled: boolean;
  maxDiscount: number;
  minOrderAmount: number;
  maxUsage: number;
  maxPerUser: number;
  validityDays: number;
  status: Record<string, string>;
  types: Record<string, string>;
  categories: Record<string, string>;
  defaults: {
    minOrderAmount: number;
    maxDiscountAmount: number;
    usageLimitPerUser: number;
    usageLimitTotal: number;
    validityDays: number;
  };
}

export const voucherConfig: VoucherConfig = {
  enabled: true,
  maxDiscount: 30,
  minOrderAmount: 200,
  maxUsage: 50,
  maxPerUser: 1,
  validityDays: 30,

  status: {
    active: FLASH_SALE_VOUCHER.STATUS.ACTIVE,
    inactive: FLASH_SALE_VOUCHER.STATUS.INACTIVE,
    used: FLASH_SALE_VOUCHER.STATUS.USED,
    expired: FLASH_SALE_VOUCHER.STATUS.EXPIRED,
    cancelled: FLASH_SALE_VOUCHER.STATUS.CANCELLED,
    pending: FLASH_SALE_VOUCHER.STATUS.PENDING,
    deleted: FLASH_SALE_VOUCHER.STATUS.DELETED,
  },

  types: {
    discount: FLASH_SALE_VOUCHER.TYPES.DISCOUNT,
    gift: FLASH_SALE_VOUCHER.TYPES.GIFT,
    complimentary: FLASH_SALE_VOUCHER.TYPES.COMPLIMENTARY,
    loyalty: FLASH_SALE_VOUCHER.TYPES.LOYALTY,
    flash: FLASH_SALE_VOUCHER.TYPES.FLASH,
  },

  categories: {
    all: FLASH_SALE_VOUCHER.CATEGORIES.ALL,
    electronics: FLASH_SALE_VOUCHER.CATEGORIES.ELECTRONICS,
    fashion: FLASH_SALE_VOUCHER.CATEGORIES.FASHION,
    home: FLASH_SALE_VOUCHER.CATEGORIES.HOME,
    beauty: FLASH_SALE_VOUCHER.CATEGORIES.BEAUTY,
    grocery: FLASH_SALE_VOUCHER.CATEGORIES.GROCERY,
  },

  defaults: {
    minOrderAmount: FLASH_SALE_VOUCHER.DEFAULTS.MIN_ORDER_AMOUNT,
    maxDiscountAmount: FLASH_SALE_VOUCHER.DEFAULTS.MAX_DISCOUNT_AMOUNT,
    usageLimitPerUser: FLASH_SALE_VOUCHER.DEFAULTS.USAGE_LIMIT_PER_USER,
    usageLimitTotal: FLASH_SALE_VOUCHER.DEFAULTS.USAGE_LIMIT_TOTAL,
    validityDays: FLASH_SALE_VOUCHER.DEFAULTS.VALIDITY_DAYS,
  },
} as const;

export type VoucherConfigType = typeof voucherConfig;
