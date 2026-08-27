/**
 * Flash Sale Inventory Types
 * Type definitions for flash sale inventory based on shared-constants
 * @module FlashSaleInventoryTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants flash-sales inventory
// ============================================================
import {
  // Inventory Core
  FLASH_SALE_INVENTORY,
  FlashSaleInventoryType,
  FlashSaleInventoryCategory,
  FlashSaleInventoryStatus,
  FlashSaleInventoryAllocation,
  FlashSaleInventoryTracking,
  FlashSaleInventoryUnit,
  flashsalesInventoryGetTypeLabel,
  flashsalesInventoryGetCategoryLabel,
  flashsalesInventoryGetStatusLabel,
  flashsalesInventoryGetAllocationLabel,
  flashsalesInventoryGetTrackingLabel,
  flashsalesInventoryGetUnitLabel,
  flashsalesInventoryIsValidType,
  flashsalesInventoryIsValidCategory,
  flashsalesInventoryIsValidStatus,
  flashsalesInventoryIsAvailable,
  flashsalesInventoryIsSold,
  flashsalesInventoryIsReserved,
  flashsalesInventoryIsDamaged,
  flashsalesInventoryGetDefaultMaxQuantity,
  flashsalesInventoryGetDefaultReorderLevel,
  flashsalesInventoryGetDefaultSafetyStock,
  flashsalesInventoryGetMaxQuantity,
  flashsalesInventoryGetMaxReservations,
  flashsalesInventoryGetReservationTimeoutMinutes,
  flashsalesInventoryGetBufferPercentage,
  // Inventory Status
  FLASH_SALE_INVENTORY_STATUS,
  FlashSaleInventoryStatusType,
  FlashSaleInventoryStatusCategory,
  FlashSaleInventoryStatusColor,
  FlashSaleInventoryStatusPriority,
  FlashSaleInventoryAvailability,
  FlashSaleInventoryStockLevel,
  flashsalesInventoryStatusGetLabel,
  flashsalesInventoryStatusGetCategory,
  flashsalesInventoryStatusGetColor,
  flashsalesInventoryStatusGetPriority,
  flashsalesInventoryStatusIsActive,
  flashsalesInventoryStatusIsApproved,
  flashsalesInventoryStatusIsTerminated,
  flashsalesInventoryStatusCanTransitionTo,
  flashsalesInventoryStatusGetAvailableTransitions,
  flashsalesInventoryStatusCanApprove,
  flashsalesInventoryStatusCanReject,
  flashsalesInventoryStatusCanActivate,
  flashsalesInventoryStatusCanPause,
  flashsalesInventoryStatusCanResume,
  flashsalesInventoryStatusCanSoldOut,
  flashsalesInventoryStatusCanDiscontinue,
  flashsalesInventoryStatusCanDelete,
  flashsalesInventoryStatusGetAvailabilityLabel,
  flashsalesInventoryStatusGetStockLevelLabel,
  flashsalesInventoryStatusIsValid,
  flashsalesInventoryStatusIsValidAvailability,
  flashsalesInventoryStatusIsValidStockLevel,
} from '@vubon/shared-constants';

// ============================================================
// Flash Sale Inventory Extended Types
// ============================================================

/**
 * Flash Sale Inventory
 */
export interface FlashSaleInventory extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  productId: ID;
  variantId?: ID;
  type: FlashSaleInventoryType;
  category: FlashSaleInventoryCategory;
  status: FlashSaleInventoryStatusType;
  allocation: FlashSaleInventoryAllocation;
  tracking: FlashSaleInventoryTracking;
  unit: FlashSaleInventoryUnit;
  availability: FlashSaleInventoryAvailability;
  stockLevel: FlashSaleInventoryStockLevel;
  maxQuantity: number;
  currentQuantity: number;
  reservedQuantity: number;
  soldQuantity: number;
  damagedQuantity: number;
  reorderLevel: number;
  safetyStock: number;
  isAvailable: boolean;
  isSold: boolean;
  isReserved: boolean;
  isDamaged: boolean;
  isActive: boolean;
  isApproved: boolean;
  isTerminated: boolean;
  metadata?: Metadata;
}

/**
 * Flash Sale Inventory Filter
 */
export interface FlashSaleInventoryFilter {
  ids?: ID[];
  flashSaleIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  types?: FlashSaleInventoryType[];
  categories?: FlashSaleInventoryCategory[];
  statuses?: FlashSaleInventoryStatusType[];
  allocations?: FlashSaleInventoryAllocation[];
  trackings?: FlashSaleInventoryTracking[];
  units?: FlashSaleInventoryUnit[];
  availabilities?: FlashSaleInventoryAvailability[];
  stockLevels?: FlashSaleInventoryStockLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isAvailable?: boolean;
  isSold?: boolean;
  isReserved?: boolean;
  isDamaged?: boolean;
  isActive?: boolean;
  isApproved?: boolean;
  isTerminated?: boolean;
  minQuantity?: number;
  maxQuantity?: number;
  searchTerm?: string;
}

/**
 * Flash Sale Inventory Statistics
 */
export interface FlashSaleInventoryStatistics {
  flashSaleId: ID;
  totalInventory: number;
  activeInventory: number;
  approvedInventory: number;
  terminatedInventory: number;
  availableInventory: number;
  soldInventory: number;
  reservedInventory: number;
  damagedInventory: number;
  byType: Record<FlashSaleInventoryType, number>;
  byCategory: Record<FlashSaleInventoryCategory, number>;
  byStatus: Record<FlashSaleInventoryStatusType, number>;
  byAllocation: Record<FlashSaleInventoryAllocation, number>;
  byTracking: Record<FlashSaleInventoryTracking, number>;
  byUnit: Record<FlashSaleInventoryUnit, number>;
  byAvailability: Record<FlashSaleInventoryAvailability, number>;
  byStockLevel: Record<FlashSaleInventoryStockLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalMaxQuantity: number;
  totalCurrentQuantity: number;
  totalReservedQuantity: number;
  totalSoldQuantity: number;
  totalDamagedQuantity: number;
  mostFrequentType: FlashSaleInventoryType;
  mostFrequentCategory: FlashSaleInventoryCategory;
  mostFrequentStatus: FlashSaleInventoryStatusType;
}

/**
 * Flash Sale Inventory Summary
 */
export interface FlashSaleInventorySummary {
  period: {
    start: Date;
    end: Date;
  };
  totalInventory: number;
  active: number;
  approved: number;
  terminated: number;
  available: number;
  sold: number;
  reserved: number;
  damaged: number;
  byType: Record<FlashSaleInventoryType, number>;
  byCategory: Record<FlashSaleInventoryCategory, number>;
  byStatus: Record<FlashSaleInventoryStatusType, number>;
  byAllocation: Record<FlashSaleInventoryAllocation, number>;
  byTracking: Record<FlashSaleInventoryTracking, number>;
  byUnit: Record<FlashSaleInventoryUnit, number>;
  byAvailability: Record<FlashSaleInventoryAvailability, number>;
  byStockLevel: Record<FlashSaleInventoryStockLevel, number>;
  inventoryTrend: {
    date: Date;
    total: number;
    available: number;
    sold: number;
  }[];
  topTypes: {
    type: FlashSaleInventoryType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: FlashSaleInventoryCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: FlashSaleInventoryStatusType;
    count: number;
    label: string;
  }[];
  quantitySummary: {
    totalMaxQuantity: number;
    totalCurrentQuantity: number;
    totalReservedQuantity: number;
    totalSoldQuantity: number;
    totalDamagedQuantity: number;
  };
}

/**
 * Flash Sale Inventory Configuration
 */
export interface FlashSaleInventoryConfiguration {
  enabled: boolean;
  defaultType: FlashSaleInventoryType;
  defaultCategory: FlashSaleInventoryCategory;
  defaultStatus: FlashSaleInventoryStatusType;
  defaultAllocation: FlashSaleInventoryAllocation;
  defaultTracking: FlashSaleInventoryTracking;
  defaultUnit: FlashSaleInventoryUnit;
  defaultMaxQuantity: number;
  defaultReorderLevel: number;
  defaultSafetyStock: number;
  maxQuantity: number;
  maxReservations: number;
  reservationTimeoutMinutes: number;
  bufferPercentage: number;
  requireApproval: boolean;
  allowPause: boolean;
  allowResume: boolean;
  allowSoldOut: boolean;
  allowDiscontinue: boolean;
  allowDelete: boolean;
  notificationOnCreate: boolean;
  notificationOnApprove: boolean;
  notificationOnReject: boolean;
  notificationOnActivate: boolean;
  notificationOnPause: boolean;
  notificationOnResume: boolean;
  notificationOnSoldOut: boolean;
  notificationOnDiscontinue: boolean;
  notificationOnDelete: boolean;
  alertConfig?: FlashSaleInventoryAlertConfig;
}

/**
 * Flash Sale Inventory Alert Configuration
 */
export interface FlashSaleInventoryAlertConfig {
  enabled: boolean;
  lowStockAlert: boolean;
  lowStockThreshold: number;
  outOfStockAlert: boolean;
  highDemandAlert: boolean;
  highDemandThreshold: number;
  reservationTimeoutAlert: boolean;
  reservationTimeoutThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Flash Sale Inventory History
 */
export interface FlashSaleInventoryHistory extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  flashSaleId: ID;
  productId: ID;
  variantId?: ID;
  action:
    | 'create'
    | 'update'
    | 'approve'
    | 'reject'
    | 'activate'
    | 'pause'
    | 'resume'
    | 'sold_out'
    | 'discontinue'
    | 'delete'
    | 'restore'
    | 'quantity_change'
    | 'reserve'
    | 'release'
    | 'sold'
    | 'damage';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Flash Sale Inventory Validation
 */
export interface FlashSaleInventoryValidation {
  isValid: boolean;
  inventoryId: ID;
  flashSaleId: ID;
  productId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Flash Sale Inventory Export
 */
export interface FlashSaleInventoryExport extends BaseEntity, Timestamp {
  id: ID;
  flashSaleId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FlashSaleInventoryFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Flash Sale Inventory Reservation
 */
export interface FlashSaleInventoryReservation extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  flashSaleId: ID;
  productId: ID;
  variantId?: ID;
  userId: ID;
  quantity: number;
  status: 'pending' | 'active' | 'expired' | 'released' | 'converted' | 'cancelled';
  expiresAt: Date;
  metadata?: Metadata;
}

/**
 * Flash Sale Inventory Transaction
 */
export interface FlashSaleInventoryTransaction extends BaseEntity, Timestamp {
  id: ID;
  inventoryId: ID;
  flashSaleId: ID;
  productId: ID;
  variantId?: ID;
  userId: ID;
  type: 'reserve' | 'release' | 'sold' | 'damage' | 'restock' | 'adjust';
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Inventory Core
  FLASH_SALE_INVENTORY,
  FlashSaleInventoryType,
  FlashSaleInventoryCategory,
  FlashSaleInventoryStatus,
  FlashSaleInventoryAllocation,
  FlashSaleInventoryTracking,
  FlashSaleInventoryUnit,
  flashsalesInventoryGetTypeLabel,
  flashsalesInventoryGetCategoryLabel,
  flashsalesInventoryGetStatusLabel,
  flashsalesInventoryGetAllocationLabel,
  flashsalesInventoryGetTrackingLabel,
  flashsalesInventoryGetUnitLabel,
  flashsalesInventoryIsValidType,
  flashsalesInventoryIsValidCategory,
  flashsalesInventoryIsValidStatus,
  flashsalesInventoryIsAvailable,
  flashsalesInventoryIsSold,
  flashsalesInventoryIsReserved,
  flashsalesInventoryIsDamaged,
  flashsalesInventoryGetDefaultMaxQuantity,
  flashsalesInventoryGetDefaultReorderLevel,
  flashsalesInventoryGetDefaultSafetyStock,
  flashsalesInventoryGetMaxQuantity,
  flashsalesInventoryGetMaxReservations,
  flashsalesInventoryGetReservationTimeoutMinutes,
  flashsalesInventoryGetBufferPercentage,
  // Inventory Status
  FLASH_SALE_INVENTORY_STATUS,
  FlashSaleInventoryStatusType,
  FlashSaleInventoryStatusCategory,
  FlashSaleInventoryStatusColor,
  FlashSaleInventoryStatusPriority,
  FlashSaleInventoryAvailability,
  FlashSaleInventoryStockLevel,
  flashsalesInventoryStatusGetLabel,
  flashsalesInventoryStatusGetCategory,
  flashsalesInventoryStatusGetColor,
  flashsalesInventoryStatusGetPriority,
  flashsalesInventoryStatusIsActive,
  flashsalesInventoryStatusIsApproved,
  flashsalesInventoryStatusIsTerminated,
  flashsalesInventoryStatusCanTransitionTo,
  flashsalesInventoryStatusGetAvailableTransitions,
  flashsalesInventoryStatusCanApprove,
  flashsalesInventoryStatusCanReject,
  flashsalesInventoryStatusCanActivate,
  flashsalesInventoryStatusCanPause,
  flashsalesInventoryStatusCanResume,
  flashsalesInventoryStatusCanSoldOut,
  flashsalesInventoryStatusCanDiscontinue,
  flashsalesInventoryStatusCanDelete,
  flashsalesInventoryStatusGetAvailabilityLabel,
  flashsalesInventoryStatusGetStockLevelLabel,
  flashsalesInventoryStatusIsValid,
  flashsalesInventoryStatusIsValidAvailability,
  flashsalesInventoryStatusIsValidStockLevel,
};
