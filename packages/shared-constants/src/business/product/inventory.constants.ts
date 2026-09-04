/**
 * Inventory Constants
 * ইনভেন্টরি সম্পর্কিত কনস্ট্যান্টস
 */

import { STATUS } from '../../common';

export const INVENTORY = {
  // Inventory status
  STATUS: {
    ACTIVE: STATUS.ACTIVE,
    INACTIVE: STATUS.INACTIVE,
    DELETED: STATUS.DELETED,
    LOW_STOCK: 'low_stock',
    OUT_OF_STOCK: 'out_of_stock',
    IN_STOCK: 'in_stock',
    BACK_ORDER: 'back_order',
    PRE_ORDER: 'pre_order',
    DISCONTINUED: 'discontinued',
  },

  // Inventory types
  TYPES: {
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    SERVICE: 'service',
    RENTAL: 'rental',
  },

  // Inventory movements
  MOVEMENT_TYPES: {
    PURCHASE: 'purchase',
    SALE: 'sale',
    RETURN: 'return',
    ADJUSTMENT: 'adjustment',
    TRANSFER: 'transfer',
    RESTOCK: 'restock',
    DAMAGE: 'damage',
    LOSS: 'loss',
    RENTAL: 'rental',
    RENTAL_RETURN: 'rental_return',
  },

  // Default values
  DEFAULTS: {
    LOW_STOCK_THRESHOLD: 10,
    CRITICAL_STOCK_THRESHOLD: 5,
    DEFAULT_QUANTITY: 0,
    MIN_QUANTITY: 0,
    MAX_QUANTITY: 99999,
  },
} as const;

export type InventoryStatus = (typeof INVENTORY.STATUS)[keyof typeof INVENTORY.STATUS];
export type InventoryType = (typeof INVENTORY.TYPES)[keyof typeof INVENTORY.TYPES];
export type InventoryMovementType =
  (typeof INVENTORY.MOVEMENT_TYPES)[keyof typeof INVENTORY.MOVEMENT_TYPES];

export const INVENTORY_STATUS = INVENTORY.STATUS;
export const INVENTORY_TYPES = INVENTORY.TYPES;
export const INVENTORY_MOVEMENT_TYPES = INVENTORY.MOVEMENT_TYPES;
