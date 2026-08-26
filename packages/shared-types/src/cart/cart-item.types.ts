/**
 * Cart Item Types
 * Type definitions for cart items based on shared-constants
 * @module CartItemTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import CartItem from cart.types
// ============================================================
import type { CartItem } from './cart.types';

// ============================================================
// Import from shared-constants cart
// ============================================================
import {
  // Cart Item
  CART_ITEM,
  CartItemType,
  CartItemStatus,
  CartItemDiscountType,
  CartItemDefault,
  CartItemLimit,
  CartItemError,
  cartitemGetTypeLabel,
  cartitemGetStatusLabel,
  cartitemGetDiscountTypeLabel,
  cartitemGetErrorLabel,
  cartitemIsAvailable,
  cartitemIsInStock,
  cartitemGetDefaultQuantity,
  cartitemGetMaxQuantity,
} from '@vubon/shared-constants';

// ============================================================
// Cart Item Extended Types
// ============================================================

/**
 * Cart item filter
 */
export interface CartItemFilter {
  cartIds?: ID[];
  userIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  types?: CartItemType[];
  statuses?: CartItemStatus[];
  discountTypes?: CartItemDiscountType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  minPrice?: number;
  maxPrice?: number;
  minTotal?: number;
  maxTotal?: number;
  isAvailable?: boolean;
  isInStock?: boolean;
  searchTerm?: string;
  sku?: string;
}

/**
 * Cart item statistics
 */
export interface CartItemStatistics {
  cartId: ID;
  totalItems: number;
  uniqueProducts: number;
  totalQuantity: number;
  averageQuantity: number;
  averagePrice: number;
  averageTotal: number;
  maxQuantity: number;
  minQuantity: number;
  maxPrice: number;
  minPrice: number;
  maxTotal: number;
  minTotal: number;
  byType: Record<CartItemType, number>;
  byStatus: Record<CartItemStatus, number>;
  byDiscountType: Record<CartItemDiscountType, number>;
  byProduct: {
    productId: ID;
    quantity: number;
    total: number;
  }[];
  byVariant: {
    variantId: ID;
    quantity: number;
    total: number;
  }[];
  dateRange: {
    start: Date;
    end: Date;
  };
  totalValue: number;
}

/**
 * Cart item summary
 */
export interface CartItemSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  totalValue: number;
  averagePrice: number;
  averageQuantity: number;
  byType: Record<CartItemType, number>;
  byStatus: Record<CartItemStatus, number>;
  byDiscountType: Record<CartItemDiscountType, number>;
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    value: number;
  }[];
  topVariants: {
    variantId: ID;
    name: string;
    quantity: number;
    value: number;
  }[];
  itemTrend: {
    date: Date;
    quantity: number;
    value: number;
  }[];
  discountSummary: {
    totalDiscount: number;
    averageDiscount: number;
    maxDiscount: number;
    minDiscount: number;
  };
}

/**
 * Cart item configuration
 */
export interface CartItemConfiguration {
  enabled: boolean;
  defaultQuantity: number;
  maxQuantity: number;
  minQuantity: number;
  maxItemsPerCart: number;
  allowNegativeQuantity: boolean;
  allowZeroQuantity: boolean;
  requireSku: boolean;
  trackInventory: boolean;
  autoRemoveOutOfStock: boolean;
  notificationOnLowStock: boolean;
  lowStockThreshold: number;
  notificationOnPriceChange: boolean;
  alertConfig?: CartItemAlertConfig;
}

/**
 * Cart item alert configuration
 */
export interface CartItemAlertConfig {
  enabled: boolean;
  lowStockAlert: boolean;
  priceChangeAlert: boolean;
  highQuantityAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Cart item history
 */
export interface CartItemHistory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  cartId: ID;
  userId: ID;
  action:
    | 'add'
    | 'update'
    | 'remove'
    | 'quantity_change'
    | 'price_change'
    | 'discount_apply'
    | 'discount_remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Cart item validation
 */
export interface CartItemValidation {
  isValid: boolean;
  item: CartItem;
  cartId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Cart item discount
 */
export interface CartItemDiscount extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  cartId: ID;
  type: CartItemDiscountType;
  amount: number;
  percentage: number;
  maxDiscount?: number;
  minOrderAmount?: number;
  appliedAt: Date;
  expiresAt?: Date;
  metadata?: Metadata;
}

/**
 * Cart item inventory
 */
export interface CartItemInventory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  cartId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  status: 'reserved' | 'allocated' | 'released' | 'out_of_stock';
  reservedAt?: Date;
  allocatedAt?: Date;
  releasedAt?: Date;
  metadata?: Metadata;
}

/**
 * Cart item export
 */
export interface CartItemExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CartItemFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Cart Item
  CART_ITEM,
  CartItemType,
  CartItemStatus,
  CartItemDiscountType,
  CartItemDefault,
  CartItemLimit,
  CartItemError,
  cartitemGetTypeLabel,
  cartitemGetStatusLabel,
  cartitemGetDiscountTypeLabel,
  cartitemGetErrorLabel,
  cartitemIsAvailable,
  cartitemIsInStock,
  cartitemGetDefaultQuantity,
  cartitemGetMaxQuantity,
};
