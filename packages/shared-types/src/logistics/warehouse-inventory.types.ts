/**
 * Warehouse Inventory Types
 * Type definitions for logistics warehouse inventory based on shared-constants
 * @module WarehouseInventoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics warehouse
// ============================================================
import {
  // Warehouse Constants
  LOGISTICS_WAREHOUSE,
  LogisticsWarehouseType,
  LogisticsWarehouseStatus,
  LogisticsWarehouseLocation,
  LogisticsWarehouseStorageType,
  LogisticsWarehouseZone,
  logisticsWarehouseGetTypeLabel,
  logisticsWarehouseGetStatusLabel,
  logisticsWarehouseGetLocationLabel,
  logisticsWarehouseGetCapacity,
  logisticsWarehouseGetZoneLabel,
  logisticsWarehouseIsActive,
  logisticsWarehouseIsOperational,
  logisticsWarehouseGetStorageTypeLabel,
  logisticsWarehouseIsWithinOperatingHours,
} from '@vubon/shared-constants';

// ============================================================
// Warehouse Inventory Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Warehouse inventory filter
 */
export interface WarehouseInventoryFilter {
  ids?: ID[];
  warehouseIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  minAvailableQuantity?: number;
  maxAvailableQuantity?: number;
  statuses?: ('in_stock' | 'low_stock' | 'out_of_stock' | 'overstock')[];
  searchTerm?: string;
  sku?: string;
}

/**
 * Warehouse inventory statistics
 */
export interface WarehouseInventoryStatistics {
  warehouseId: ID;
  totalItems: number;
  totalQuantity: number;
  totalReservedQuantity: number;
  totalAvailableQuantity: number;
  inStockItems: number;
  lowStockItems: number;
  outOfStockItems: number;
  overstockItems: number;
  byStatus: Record<string, number>;
  byProduct: {
    productId: ID;
    quantity: number;
    available: number;
  }[];
  dateRange: {
    start: Date;
    end: Date;
  };
  averageQuantity: number;
  maxQuantity: number;
  minQuantity: number;
  averageAvailableQuantity: number;
  maxAvailableQuantity: number;
  minAvailableQuantity: number;
  utilizationRate: number;
  reorderRate: number;
}

/**
 * Warehouse inventory summary
 */
export interface WarehouseInventorySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  totalAvailable: number;
  totalReserved: number;
  inStock: number;
  lowStock: number;
  outOfStock: number;
  overstock: number;
  byStatus: Record<string, number>;
  inventoryTrend: {
    date: Date;
    quantity: number;
    available: number;
    reserved: number;
  }[];
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    available: number;
  }[];
  statusSummary: {
    inStockRate: number;
    lowStockRate: number;
    outOfStockRate: number;
    overstockRate: number;
  };
  stockMetrics: {
    total: number;
    available: number;
    reserved: number;
    utilization: number;
  };
}

/**
 * Warehouse inventory configuration
 */
export interface WarehouseInventoryConfiguration {
  enabled: boolean;
  trackInventory: boolean;
  trackReservations: boolean;
  autoUpdate: boolean;
  updateIntervalMinutes: number;
  lowStockThreshold: number;
  overstockThreshold: number;
  reorderPoint: number;
  notificationOnLowStock: boolean;
  notificationOnOutOfStock: boolean;
  notificationOnOverstock: boolean;
  notificationOnReorder: boolean;
  alertConfig?: WarehouseInventoryAlertConfig;
}

/**
 * Warehouse inventory alert configuration
 */
export interface WarehouseInventoryAlertConfig {
  enabled: boolean;
  lowStockAlert: boolean;
  outOfStockAlert: boolean;
  overstockAlert: boolean;
  reorderAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  lowStockThreshold: number;
  overstockThreshold: number;
}

/**
 * Warehouse inventory history
 */
export interface WarehouseInventoryHistory extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  warehouseId: ID;
  productId: ID;
  variantId?: ID;
  action: 'add' | 'update' | 'reserve' | 'release' | 'adjust' | 'restock';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Warehouse inventory validation
 */
export interface WarehouseInventoryValidation {
  isValid: boolean;
  inventoryId: ID;
  warehouseId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Warehouse inventory reservation
 */
export interface WarehouseInventoryReservation extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  warehouseId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  orderId?: ID;
  shipmentId?: ID;
  expiresAt: Date;
  status: 'active' | 'expired' | 'released' | 'converted';
  metadata?: Metadata;
}

/**
 * Warehouse inventory export
 */
export interface WarehouseInventoryExport extends BaseEntity, Timestamp {
  id: ID;
  warehouseId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: WarehouseInventoryFilter;
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
  // Warehouse Constants
  LOGISTICS_WAREHOUSE,
  LogisticsWarehouseType,
  LogisticsWarehouseStatus,
  LogisticsWarehouseLocation,
  LogisticsWarehouseStorageType,
  LogisticsWarehouseZone,
  logisticsWarehouseGetTypeLabel,
  logisticsWarehouseGetStatusLabel,
  logisticsWarehouseGetLocationLabel,
  logisticsWarehouseGetCapacity,
  logisticsWarehouseGetZoneLabel,
  logisticsWarehouseIsActive,
  logisticsWarehouseIsOperational,
  logisticsWarehouseGetStorageTypeLabel,
  logisticsWarehouseIsWithinOperatingHours,
};
