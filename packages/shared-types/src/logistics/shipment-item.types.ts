/**
 * Shipment Item Types
 * Type definitions for logistics shipment items based on shared-constants
 * @module ShipmentItemTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics shipment
// ============================================================
import {
  // Shipment Constants
  LOGISTICS_SHIPMENT,
  LogisticsShipmentType,
  LogisticsShipmentStatus,
  LogisticsShipmentPriority,
  LogisticsShipmentMethod,
  LogisticsShipmentPackaging,
  LogisticsShipmentReturnReason,
  logisticsShipmentGetTypeLabel,
  logisticsShipmentGetStatusLabel,
  logisticsShipmentGetPriorityLabel,
  logisticsShipmentGetMethodLabel,
  logisticsShipmentGetPackagingLabel,
  logisticsShipmentIsDelivered,
  logisticsShipmentIsInTransit,
  logisticsShipmentIsFailed,
  logisticsShipmentGetReturnReasonLabel,
  logisticsShipmentGetMaxWeight,
  // Shipment Status Constants
  LOGISTICS_SHIPMENT_STATUS,
  LogisticsShipmentStatusType,
  LogisticsShipmentStatusCategory,
  LogisticsShipmentStatusColor,
  LogisticsShipmentStatusIcon,
  LogisticsShipmentStatusTransition,
  logisticsShipmentStatusGetLabel,
  logisticsShipmentStatusGetCategory,
  logisticsShipmentStatusIsActive,
  logisticsShipmentStatusIsComplete,
  logisticsShipmentStatusCanTransition,
  // Shipment Type Constants
  LOGISTICS_SHIPMENT_TYPE,
  LogisticsShipmentTypeType,
  LogisticsShipmentTypeCategory,
  LogisticsShipmentTypeIcon,
  LogisticsShipmentTypeColor,
  logisticsShipmentTypeGetLabel,
  logisticsShipmentTypeGetCategory,
  logisticsShipmentTypeGetIcon,
  logisticsShipmentTypeGetWeightLimit,
  logisticsShipmentTypeGetSizeLimit,
  // Shipment Priority Constants
  LOGISTICS_SHIPMENT_PRIORITY,
  LogisticsShipmentPriorityType,
  LogisticsShipmentPriorityLevel,
  LogisticsShipmentPriorityColor,
  LogisticsShipmentPriorityIcon,
  logisticsShipmentPriorityGetLabel,
  logisticsShipmentPriorityGetLevel,
  logisticsShipmentPriorityGetDeliveryTime,
  logisticsShipmentPriorityGetPriceMultiplier,
  logisticsShipmentPriorityGetColor,
  logisticsShipmentPriorityGetIcon,
  logisticsShipmentPriorityIsUrgent,
  logisticsShipmentPriorityIsExpress,
} from '@vubon/shared-constants';

// ============================================================
// Shipment Item Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Shipment item filter
 */
export interface ShipmentItemFilter {
  ids?: ID[];
  shipmentIds?: ID[];
  orderIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  minWeight?: number;
  maxWeight?: number;
  isFragile?: boolean;
  isHazardous?: boolean;
  isPerishable?: boolean;
  searchTerm?: string;
  sku?: string;
}

/**
 * Shipment item statistics
 */
export interface ShipmentItemStatistics {
  shipmentId: ID;
  totalItems: number;
  totalQuantity: number;
  totalWeight: number;
  fragileItems: number;
  hazardousItems: number;
  perishableItems: number;
  byProduct: {
    productId: ID;
    quantity: number;
    weight: number;
  }[];
  dateRange: {
    start: Date;
    end: Date;
  };
  averageQuantity: number;
  maxQuantity: number;
  minQuantity: number;
  averageWeight: number;
  maxWeight: number;
  minWeight: number;
}

/**
 * Shipment item summary
 */
export interface ShipmentItemSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  totalWeight: number;
  fragile: number;
  hazardous: number;
  perishable: number;
  itemTrend: {
    date: Date;
    quantity: number;
    weight: number;
  }[];
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    weight: number;
  }[];
  weightSummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
  quantitySummary: {
    total: number;
    average: number;
    max: number;
    min: number;
  };
}

/**
 * Shipment item configuration
 */
export interface ShipmentItemConfiguration {
  enabled: boolean;
  requireWeight: boolean;
  requireDimensions: boolean;
  allowFragile: boolean;
  allowHazardous: boolean;
  allowPerishable: boolean;
  maxWeightPerItem: number;
  maxItemsPerShipment: number;
  maxQuantityPerItem: number;
  minQuantityPerItem: number;
  notificationOnFragile: boolean;
  notificationOnHazardous: boolean;
  notificationOnPerishable: boolean;
  alertConfig?: ShipmentItemAlertConfig;
}

/**
 * Shipment item alert configuration
 */
export interface ShipmentItemAlertConfig {
  enabled: boolean;
  highWeightAlert: boolean;
  highWeightThreshold: number;
  fragileItemAlert: boolean;
  hazardousItemAlert: boolean;
  perishableItemAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Shipment item history
 */
export interface ShipmentItemHistory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  shipmentId: ID;
  orderId: ID;
  action: 'add' | 'update' | 'remove' | 'quantity_change' | 'weight_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Shipment item validation
 */
export interface ShipmentItemValidation {
  isValid: boolean;
  itemId: ID;
  shipmentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Shipment item export
 */
export interface ShipmentItemExport extends BaseEntity, Timestamp {
  id: ID;
  shipmentId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ShipmentItemFilter;
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
  // Shipment Constants
  LOGISTICS_SHIPMENT,
  LogisticsShipmentType,
  LogisticsShipmentStatus,
  LogisticsShipmentPriority,
  LogisticsShipmentMethod,
  LogisticsShipmentPackaging,
  LogisticsShipmentReturnReason,
  logisticsShipmentGetTypeLabel,
  logisticsShipmentGetStatusLabel,
  logisticsShipmentGetPriorityLabel,
  logisticsShipmentGetMethodLabel,
  logisticsShipmentGetPackagingLabel,
  logisticsShipmentIsDelivered,
  logisticsShipmentIsInTransit,
  logisticsShipmentIsFailed,
  logisticsShipmentGetReturnReasonLabel,
  logisticsShipmentGetMaxWeight,
  // Shipment Status Constants
  LOGISTICS_SHIPMENT_STATUS,
  LogisticsShipmentStatusType,
  LogisticsShipmentStatusCategory,
  LogisticsShipmentStatusColor,
  LogisticsShipmentStatusIcon,
  LogisticsShipmentStatusTransition,
  logisticsShipmentStatusGetLabel,
  logisticsShipmentStatusGetCategory,
  logisticsShipmentStatusIsActive,
  logisticsShipmentStatusIsComplete,
  logisticsShipmentStatusCanTransition,
  // Shipment Type Constants
  LOGISTICS_SHIPMENT_TYPE,
  LogisticsShipmentTypeType,
  LogisticsShipmentTypeCategory,
  LogisticsShipmentTypeIcon,
  LogisticsShipmentTypeColor,
  logisticsShipmentTypeGetLabel,
  logisticsShipmentTypeGetCategory,
  logisticsShipmentTypeGetIcon,
  logisticsShipmentTypeGetWeightLimit,
  logisticsShipmentTypeGetSizeLimit,
  // Shipment Priority Constants
  LOGISTICS_SHIPMENT_PRIORITY,
  LogisticsShipmentPriorityType,
  LogisticsShipmentPriorityLevel,
  LogisticsShipmentPriorityColor,
  LogisticsShipmentPriorityIcon,
  logisticsShipmentPriorityGetLabel,
  logisticsShipmentPriorityGetLevel,
  logisticsShipmentPriorityGetDeliveryTime,
  logisticsShipmentPriorityGetPriceMultiplier,
  logisticsShipmentPriorityGetColor,
  logisticsShipmentPriorityGetIcon,
  logisticsShipmentPriorityIsUrgent,
  logisticsShipmentPriorityIsExpress,
};
