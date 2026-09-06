/**
 * Flash Sale Wishlist Constants
 * ফ্ল্যাশ সেল উইশলিস্ট সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const FLASH_SALE_WISHLIST = {
  // Wishlist status (STATUS থেকে মান ব্যবহার)
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    NOTIFIED: 'notified',
    EXPIRED: 'expired',
  },

  // Default values
  DEFAULTS: {
    MAX_WISHLIST_ITEMS: 50,
    NOTIFICATION_BATCH_SIZE: 100,
  },
} as const;

export type FlashSaleWishlistStatus =
  (typeof FLASH_SALE_WISHLIST.STATUS)[keyof typeof FLASH_SALE_WISHLIST.STATUS];
