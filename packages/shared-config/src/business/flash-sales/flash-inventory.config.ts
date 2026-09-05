/**
 * Flash Inventory Config
 * ফ্ল্যাশ ইনভেন্টরি কনফিগারেশন
 */

import { FLASH_SALE_INVENTORY } from '@vubon/shared-constants';

export interface FlashInventoryConfig {
  enabled: boolean;
  minStock: number;
  maxStock: number;
  status: Record<string, string>;
  types: Record<string, string>;
  allocationTypes: Record<string, string>;
  defaults: {
    minStock: number;
    maxStock: number;
    reservationTimeout: number;
    perUserLimit: number;
  };
}

export const flashInventoryConfig: FlashInventoryConfig = {
  enabled: true,
  minStock: 1,
  maxStock: 9999,

  status: {
    available: FLASH_SALE_INVENTORY.STATUS.AVAILABLE,
    reserved: FLASH_SALE_INVENTORY.STATUS.RESERVED,
    sold: FLASH_SALE_INVENTORY.STATUS.SOLD,
    out_of_stock: FLASH_SALE_INVENTORY.STATUS.OUT_OF_STOCK,
    pending: FLASH_SALE_INVENTORY.STATUS.PENDING,
    deleted: FLASH_SALE_INVENTORY.STATUS.DELETED,
  },

  types: {
    physical: FLASH_SALE_INVENTORY.TYPES.PHYSICAL,
    digital: FLASH_SALE_INVENTORY.TYPES.DIGITAL,
    service: FLASH_SALE_INVENTORY.TYPES.SERVICE,
  },

  allocationTypes: {
    fixed: 'fixed',
    dynamic: 'dynamic',
    per_user: 'per_user',
    total: 'total',
  },

  defaults: {
    minStock: 1,
    maxStock: 99999,
    reservationTimeout: 300,
    perUserLimit: 5,
  },
} as const;

export type FlashInventoryConfigType = typeof flashInventoryConfig;
