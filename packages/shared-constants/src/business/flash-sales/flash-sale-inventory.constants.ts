/**
 * Flash Sale Inventory Constants
 * ফ্ল্যাশ সেল ইনভেন্টরি সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const FLASH_INVENTORY = {
  // Inventory status
  STATUS: {
    AVAILABLE: 'available',
    RESERVED: 'reserved',
    SOLD: 'sold',
    OUT_OF_STOCK: 'out_of_stock',
    PENDING: STATUS.PENDING,
    DELETED: STATUS.DELETED,
  },

  // Inventory types
  TYPES: {
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    SERVICE: 'service',
  },

  // Allocation types
  ALLOCATION: {
    FIXED: 'fixed',
    DYNAMIC: 'dynamic',
    PER_USER: 'per_user',
    TOTAL: 'total',
  },

  // Default values
  DEFAULTS: {
    MIN_STOCK: 1,
    MAX_STOCK: 99999,
    RESERVATION_TIMEOUT: 300, // 5 minutes
    PER_USER_LIMIT: 5,
  },
} as const;

export type FlashInventoryStatus =
  (typeof FLASH_INVENTORY.STATUS)[keyof typeof FLASH_INVENTORY.STATUS];
export type FlashInventoryType = (typeof FLASH_INVENTORY.TYPES)[keyof typeof FLASH_INVENTORY.TYPES];
export type FlashAllocationType =
  (typeof FLASH_INVENTORY.ALLOCATION)[keyof typeof FLASH_INVENTORY.ALLOCATION];
