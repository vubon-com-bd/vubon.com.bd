/**
 * Product Inventory Constants (EXTENDS common/status + common/types)
 * @module shared-constants/business/product/inventory.constants
 */

import { STATUS } from '../../common/status.constants';
import { TYPES } from '../../common/types.constants';
import { VERIFICATION } from '../../common/verification.constants';
import { CURRENCY } from '../../common/currency.constants';

export const PRODUCT_INVENTORY = {
  // Base status from common
  STATUS: STATUS,

  // Types from common
  TYPES: TYPES,

  // Verification from common
  VERIFICATION: VERIFICATION,

  // Currency from common
  CURRENCY: CURRENCY,

  // Inventory specific
  DEFAULT_INVENTORY_QUANTITY: 0,
  MIN_INVENTORY_QUANTITY: 0,
  MAX_INVENTORY_QUANTITY: 999999,
  LOW_STOCK_THRESHOLD: 10,
  CRITICAL_STOCK_THRESHOLD: 5,
  INVENTORY_CACHE_TTL: 3600,

  // Inventory status
  PRODUCT_INVENTORY_STATUS: {
    IN_STOCK: 'in_stock',
    OUT_OF_STOCK: 'out_of_stock',
    LOW_STOCK: 'low_stock',
    CRITICAL_STOCK: 'critical_stock',
    PRE_ORDER: 'pre_order',
    BACK_ORDER: 'back_order',
    DISCONTINUED: 'discontinued',
    COMING_SOON: 'coming_soon',
    ON_HOLD: 'on_hold',
    RESERVED: 'reserved',
  } as const,

  // Inventory movement type
  PRODUCT_INVENTORY_MOVEMENT: {
    PURCHASE: 'purchase',
    SALE: 'sale',
    RETURN: 'return',
    REFUND: 'refund',
    TRANSFER: 'transfer',
    ADJUSTMENT: 'adjustment',
    COUNT: 'count',
    RESERVATION: 'reservation',
    CANCELLATION: 'cancellation',
    DAMAGE: 'damage',
    EXPIRY: 'expiry',
    RESTOCK: 'restock',
    RECEIVED: 'received',
    SHIPPED: 'shipped',
  } as const,

  // Inventory type
  PRODUCT_INVENTORY_TYPE: {
    PHYSICAL: 'physical',
    DIGITAL: 'digital',
    VIRTUAL: 'virtual',
    BUNDLE: 'bundle',
    KIT: 'kit',
  } as const,

  // Stock management
  PRODUCT_STOCK_MANAGEMENT: {
    TRACK: 'track',
    NOT_TRACK: 'not_track',
    SEMI_TRACK: 'semi_track',
    ADVANCED: 'advanced',
  } as const,

  // Reorder settings
  PRODUCT_REORDER: {
    MANUAL: 'manual',
    AUTOMATIC: 'automatic',
    THRESHOLD: 'threshold',
    SCHEDULED: 'scheduled',
  } as const,

  // Warehouse type
  PRODUCT_WAREHOUSE_TYPE: {
    MAIN: 'main',
    BRANCH: 'branch',
    FULFILLMENT: 'fulfillment',
    RETAIL: 'retail',
    DISTRIBUTION: 'distribution',
    STORE: 'store',
    VENDOR: 'vendor',
    CUSTOM: 'custom',
  } as const,

  // Inventory validation
  PRODUCT_INVENTORY_VALIDATION: {
    REQUIRES_QUANTITY: true,
    REQUIRES_LOCATION: false,
    REQUIRES_BATCH: false,
    REQUIRES_EXPIRY: false,
    ALLOW_NEGATIVE: false,
  } as const,
} as const;

export type ProductInventoryStatus =
  (typeof PRODUCT_INVENTORY.PRODUCT_INVENTORY_STATUS)[keyof typeof PRODUCT_INVENTORY.PRODUCT_INVENTORY_STATUS];
export type ProductInventoryMovement =
  (typeof PRODUCT_INVENTORY.PRODUCT_INVENTORY_MOVEMENT)[keyof typeof PRODUCT_INVENTORY.PRODUCT_INVENTORY_MOVEMENT];
export type ProductInventoryType =
  (typeof PRODUCT_INVENTORY.PRODUCT_INVENTORY_TYPE)[keyof typeof PRODUCT_INVENTORY.PRODUCT_INVENTORY_TYPE];
export type ProductStockManagement =
  (typeof PRODUCT_INVENTORY.PRODUCT_STOCK_MANAGEMENT)[keyof typeof PRODUCT_INVENTORY.PRODUCT_STOCK_MANAGEMENT];
export type ProductReorderType =
  (typeof PRODUCT_INVENTORY.PRODUCT_REORDER)[keyof typeof PRODUCT_INVENTORY.PRODUCT_REORDER];
export type ProductWarehouseType =
  (typeof PRODUCT_INVENTORY.PRODUCT_WAREHOUSE_TYPE)[keyof typeof PRODUCT_INVENTORY.PRODUCT_WAREHOUSE_TYPE];
