/**
 * Inventory Config
 * ইনভেন্টরি কনফিগারেশন
 */

import { INVENTORY } from '@vubon/shared-constants';

export interface InventoryConfig {
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

export const inventoryConfig: InventoryConfig = {
  enabled: true,
  minStock: 1,
  maxStock: 9999,

  status: {
    active: INVENTORY.STATUS.ACTIVE,
    inactive: INVENTORY.STATUS.INACTIVE,
    deleted: INVENTORY.STATUS.DELETED,
    low_stock: INVENTORY.STATUS.LOW_STOCK,
    out_of_stock: INVENTORY.STATUS.OUT_OF_STOCK,
    in_stock: INVENTORY.STATUS.IN_STOCK,
    back_order: INVENTORY.STATUS.BACK_ORDER,
    pre_order: INVENTORY.STATUS.PRE_ORDER,
    discontinued: INVENTORY.STATUS.DISCONTINUED,
  },

  types: {
    physical: INVENTORY.TYPES.PHYSICAL,
    digital: INVENTORY.TYPES.DIGITAL,
    service: INVENTORY.TYPES.SERVICE,
    rental: INVENTORY.TYPES.RENTAL,
  },

  allocationTypes: {
    fixed: 'fixed',
    dynamic: 'dynamic',
    per_user: 'per_user',
    total: 'total',
  },

  defaults: {
    minStock: 0,
    maxStock: 99999,
    reservationTimeout: 300,
    perUserLimit: 5,
  },
} as const;

export type InventoryConfigType = typeof inventoryConfig;
