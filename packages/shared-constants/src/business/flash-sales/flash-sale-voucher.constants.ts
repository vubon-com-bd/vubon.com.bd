/**
 * Flash Sale Voucher Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-voucher.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_VOUCHER = {
  // Base status from common
  STATUS: STATUS,

  // Voucher specific
  MAX_VOUCHERS_PER_SALE: 100,
  VOUCHER_CACHE_TTL: 3600,

  // Voucher status
  FLASH_SALE_VOUCHER_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    CLAIMED: 'claimed',
    USED: 'used',
    EXPIRED: 'expired',
    CANCELLED: 'cancelled',
  } as const,

  // Voucher type
  FLASH_SALE_VOUCHER_TYPE: {
    DISCOUNT: 'discount',
    FREE_PRODUCT: 'free_product',
    FREE_SHIPPING: 'free_shipping',
    CASHBACK: 'cashback',
    GIFT: 'gift',
  } as const,

  // Voucher distribution
  FLASH_SALE_VOUCHER_DISTRIBUTION: {
    FIRST_COME: 'first_come',
    RANDOM: 'random',
    TARGETED: 'targeted',
    TIERED: 'tiered',
    CUSTOM: 'custom',
  } as const,
} as const;

export type FlashSaleVoucherStatus =
  (typeof FLASH_SALE_VOUCHER.FLASH_SALE_VOUCHER_STATUS)[keyof typeof FLASH_SALE_VOUCHER.FLASH_SALE_VOUCHER_STATUS];
export type FlashSaleVoucherType =
  (typeof FLASH_SALE_VOUCHER.FLASH_SALE_VOUCHER_TYPE)[keyof typeof FLASH_SALE_VOUCHER.FLASH_SALE_VOUCHER_TYPE];
export type FlashSaleVoucherDistribution =
  (typeof FLASH_SALE_VOUCHER.FLASH_SALE_VOUCHER_DISTRIBUTION)[keyof typeof FLASH_SALE_VOUCHER.FLASH_SALE_VOUCHER_DISTRIBUTION];
