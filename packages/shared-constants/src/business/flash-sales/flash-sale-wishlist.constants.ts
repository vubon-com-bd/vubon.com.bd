/**
 * Flash Sale Wishlist Constants (EXTENDS common/status)
 * @module shared-constants/business/flash-sales/flash-sale-wishlist.constants
 */

import { STATUS } from '../../common/status.constants';

export const FLASH_SALE_WISHLIST = {
  // Base status from common
  STATUS: STATUS,

  // Wishlist specific
  MAX_WISHLIST_ITEMS: 50,
  WISHLIST_CACHE_TTL: 86400,

  // Wishlist status
  FLASH_SALE_WISHLIST_STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    ADDED: 'added',
    REMOVED: 'removed',
    PURCHASED: 'purchased',
    NOTIFIED: 'notified',
  } as const,

  // Wishlist type
  FLASH_SALE_WISHLIST_TYPE: {
    PRODUCT: 'product',
    VARIANT: 'variant',
    BUNDLE: 'bundle',
    CATEGORY: 'category',
    BRAND: 'brand',
  } as const,

  // Wishlist notification
  FLASH_SALE_WISHLIST_NOTIFICATION: {
    PRICE_DROP: 'price_drop',
    BACK_IN_STOCK: 'back_in_stock',
    SALE_START: 'sale_start',
    SALE_END: 'sale_end',
    EXCLUSIVE_OFFER: 'exclusive_offer',
  } as const,
} as const;

export type FlashSaleWishlistStatus =
  (typeof FLASH_SALE_WISHLIST.FLASH_SALE_WISHLIST_STATUS)[keyof typeof FLASH_SALE_WISHLIST.FLASH_SALE_WISHLIST_STATUS];
export type FlashSaleWishlistType =
  (typeof FLASH_SALE_WISHLIST.FLASH_SALE_WISHLIST_TYPE)[keyof typeof FLASH_SALE_WISHLIST.FLASH_SALE_WISHLIST_TYPE];
export type FlashSaleWishlistNotification =
  (typeof FLASH_SALE_WISHLIST.FLASH_SALE_WISHLIST_NOTIFICATION)[keyof typeof FLASH_SALE_WISHLIST.FLASH_SALE_WISHLIST_NOTIFICATION];
