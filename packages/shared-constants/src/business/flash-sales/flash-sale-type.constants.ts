/**
 * Flash Sale Type Constants
 * ফ্ল্যাশ সেল টাইপ সম্পর্কিত কনস্ট্যান্টস
 */

import { TYPES } from '../../common';
import { FLASH_SALE } from './flash-sale.constants';

export const FLASH_SALE_TYPES = {
  // Common types
  ...TYPES,

  // Flash sale specific types
  REGULAR: FLASH_SALE.TYPES.REGULAR,
  LIMITED: FLASH_SALE.TYPES.LIMITED,
  DAILY: FLASH_SALE.TYPES.DAILY,
  WEEKLY: FLASH_SALE.TYPES.WEEKLY,
  MONTHLY: FLASH_SALE.TYPES.MONTHLY,
  HOLIDAY: FLASH_SALE.TYPES.HOLIDAY,
  SEASONAL: FLASH_SALE.TYPES.SEASONAL,
  FLASH: FLASH_SALE.TYPES.FLASH,
  MEGA: FLASH_SALE.TYPES.MEGA,

  // Additional flash sale types
  EXPRESS: 'express',
  SUPER: 'super',
  ULTIMATE: 'ultimate',
  WAREHOUSE: 'warehouse',
  CLEARANCE: 'clearance',
} as const;

export type FlashSaleTypeValue = (typeof FLASH_SALE_TYPES)[keyof typeof FLASH_SALE_TYPES];
