/**
 * Order Item Types
 * Type definitions for order items based on shared-constants
 * @module OrderItemTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import OrderItem from order.types
// ============================================================
import type { OrderItem } from './order.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
} from '@vubon/shared-constants';

// ============================================================
// Order Item Extended Types
// ============================================================

/**
 * Order item filter
 */
export interface OrderItemFilter {
  orderIds?: ID[];
  userIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
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
  searchTerm?: string;
  sku?: string;
}

/**
 * Order item statistics
 */
export interface OrderItemStatistics {
  orderId: ID;
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
}

/**
 * Order item summary
 */
export interface OrderItemSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  totalRevenue: number;
  averagePrice: number;
  averageQuantity: number;
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    revenue: number;
  }[];
  topVariants: {
    variantId: ID;
    name: string;
    quantity: number;
    revenue: number;
  }[];
  itemTrend: {
    date: Date;
    quantity: number;
    revenue: number;
  }[];
}

/**
 * Order item configuration
 */
export interface OrderItemConfiguration {
  enabled: boolean;
  maxQuantityPerItem: number;
  minQuantityPerItem: number;
  maxItemsPerOrder: number;
  allowNegativeQuantity: boolean;
  allowZeroQuantity: boolean;
  requireSku: boolean;
  trackInventory: boolean;
  updateInventoryOnPlace: boolean;
  notificationOnLowStock: boolean;
  lowStockThreshold: number;
  alertConfig?: OrderItemAlertConfig;
}

/**
 * Order item alert configuration
 */
export interface OrderItemAlertConfig {
  enabled: boolean;
  lowStockAlert: boolean;
  highQuantityAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Order item history
 */
export interface OrderItemHistory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  orderId: ID;
  userId: ID;
  action: 'add' | 'update' | 'remove' | 'return' | 'refund';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Order item validation
 */
export interface OrderItemValidation {
  isValid: boolean;
  item: OrderItem;
  orderId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Order item return
 */
export interface OrderItemReturn extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  orderId: ID;
  userId: ID;
  quantity: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  refundAmount: number;
  refundStatus: 'pending' | 'processed' | 'completed' | 'failed';
  returnedAt?: Date;
  metadata?: Metadata;
}

/**
 * Order item refund
 */
export interface OrderItemRefund extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  orderId: ID;
  userId: ID;
  amount: number;
  currency: string;
  reason: string;
  status: 'pending' | 'processed' | 'completed' | 'failed';
  refundedAt?: Date;
  transactionId?: string;
  metadata?: Metadata;
}

/**
 * Order item inventory
 */
export interface OrderItemInventory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  orderId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  reservedQuantity: number;
  availableQuantity: number;
  status: 'reserved' | 'allocated' | 'picked' | 'shipped' | 'returned';
  reservedAt?: Date;
  allocatedAt?: Date;
  pickedAt?: Date;
  shippedAt?: Date;
  returnedAt?: Date;
  metadata?: Metadata;
}

/**
 * Order item export
 */
export interface OrderItemExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderItemFilter;
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
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
};
