/**
 * Inventory Types
 * Type definitions for product inventory based on shared-constants
 * @module InventoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// Import from shared-constants product
import {
  PRODUCTINVENTORY,
  ProductInventoryType,
  ProductInventoryStatus,
  ProductInventoryTracking,
  ProductInventoryDefault,
  ProductInventoryLimit,
  productinventoryGetTypeLabel,
  productinventoryGetStatusLabel,
  productinventoryGetTrackingLabel,
  productinventoryIsInStock,
  productinventoryIsLowStock,
  productinventoryIsOutOfStock,
  productinventoryGetDefaultQuantity,
  productinventoryGetDefaultReorderPoint,
  productinventoryGetDefaultLowStockThreshold,
} from '@vubon/shared-constants';

// Inventory Extended Types
export interface InventoryFilter {
  ids?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  types?: ProductInventoryType[];
  statuses?: ProductInventoryStatus[];
  trackings?: ProductInventoryTracking[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isInStock?: boolean;
  isLowStock?: boolean;
  isOutOfStock?: boolean;
  minQuantity?: number;
  maxQuantity?: number;
  minReservedQuantity?: number;
  maxReservedQuantity?: number;
  minSoldQuantity?: number;
  maxSoldQuantity?: number;
  searchTerm?: string;
}

export interface InventoryStatistics {
  productId: ID;
  totalInventory: number;
  inStockInventory: number;
  lowStockInventory: number;
  outOfStockInventory: number;
  byType: Record<ProductInventoryType, number>;
  byStatus: Record<ProductInventoryStatus, number>;
  byTracking: Record<ProductInventoryTracking, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalQuantity: number;
  averageQuantity: number;
  maxQuantity: number;
  minQuantity: number;
  totalReservedQuantity: number;
  totalSoldQuantity: number;
  mostFrequentType: ProductInventoryType;
  mostFrequentStatus: ProductInventoryStatus;
  mostFrequentTracking: ProductInventoryTracking;
}

export interface InventorySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalInventory: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  byType: Record<ProductInventoryType, number>;
  byStatus: Record<ProductInventoryStatus, number>;
  byTracking: Record<ProductInventoryTracking, number>;
  inventoryTrend: {
    date: Date;
    total: number;
    inStock: number;
    lowStock: number;
  }[];
  topTypes: {
    type: ProductInventoryType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: ProductInventoryStatus;
    count: number;
    label: string;
  }[];
  quantitySummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
  stockStatus: {
    inStock: number;
    lowStock: number;
    outOfStock: number;
  };
}

export interface InventoryConfiguration {
  enabled: boolean;
  defaultType: ProductInventoryType;
  defaultTracking: ProductInventoryTracking;
  defaultQuantity: number;
  defaultReorderPoint: number;
  defaultLowStockThreshold: number;
  trackInventory: boolean;
  allowNegativeInventory: boolean;
  autoUpdateOnOrder: boolean;
  autoUpdateOnReturn: boolean;
  autoUpdateOnAdjustment: boolean;
  notificationOnLowStock: boolean;
  notificationOnOutOfStock: boolean;
  notificationOnRestock: boolean;
  alertConfig?: InventoryAlertConfig;
}

export interface InventoryAlertConfig {
  enabled: boolean;
  lowStockAlert: boolean;
  outOfStockAlert: boolean;
  restockAlert: boolean;
  highReservationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  lowStockThreshold: number;
  highReservationThreshold: number;
}

export interface InventoryHistory extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  productId: ID;
  variantId?: ID;
  action:
    'create' | 'update' | 'stock_in' | 'stock_out' | 'reserve' | 'unreserve' | 'adjust' | 'restock';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

export interface InventoryAdjustment extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  reason: 'sale' | 'return' | 'damage' | 'loss' | 'restock' | 'adjustment' | 'manual';
  note?: string;
  adjustedBy: ID;
  adjustedAt: Date;
  metadata?: Metadata;
}

export interface InventoryReservation extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  orderId?: ID;
  cartId?: ID;
  expiresAt: Date;
  status: 'active' | 'expired' | 'released' | 'converted';
  metadata?: Metadata;
}

export interface InventoryRestock extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  cost: number;
  supplier?: string;
  restockedBy: ID;
  restockedAt: Date;
  metadata?: Metadata;
}

export interface InventoryValidation {
  isValid: boolean;
  inventoryId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

export interface InventoryExport extends BaseEntity, Timestamp {
  id: ID;
  productId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: InventoryFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

// Re-export Everything
export {
  PRODUCTINVENTORY,
  ProductInventoryType,
  ProductInventoryStatus,
  ProductInventoryTracking,
  ProductInventoryDefault,
  ProductInventoryLimit,
  productinventoryGetTypeLabel,
  productinventoryGetStatusLabel,
  productinventoryGetTrackingLabel,
  productinventoryIsInStock,
  productinventoryIsLowStock,
  productinventoryIsOutOfStock,
  productinventoryGetDefaultQuantity,
  productinventoryGetDefaultReorderPoint,
  productinventoryGetDefaultLowStockThreshold,
};
