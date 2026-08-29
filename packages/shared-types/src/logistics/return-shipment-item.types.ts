/**
 * Return Shipment Item Types
 * Type definitions for logistics return shipment items based on shared-constants
 * @module ReturnShipmentItemTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics return
// ============================================================
import {
  // Return Shipment Constants
  LogisticsReturnShipmentType,
  LogisticsReturnShipmentStatus,
  LogisticsReturnShipmentPriority,
  LogisticsReturnShipmentMethod,
} from '@vubon/shared-constants';

// ============================================================
// Import from shared-constants logistics return reason
// ============================================================
import {
  // Return Reason Constants
  LOGISTICS_RETURN_REASON,
  LogisticsReturnReason,
  LogisticsReturnReasonCategory,
  LogisticsReturnReasonType,
  LogisticsReturnReasonSeverity,
  logisticsReturnReasonGetLabel,
  logisticsReturnReasonGetBanglaLabel,
  logisticsReturnReasonGetCategory,
  logisticsReturnReasonGetPriority,
  logisticsReturnReasonIsProductIssue,
  // Return Reason Type Constants
  LOGISTICS_RETURN_REASON_TYPE,
  LogisticsReturnReasonTypeCategory,
  LogisticsReturnReasonTypeIcon,
  LogisticsReturnReasonTypeColor,
  logisticsReturnReasonTypeGetLabel,
  logisticsReturnReasonTypeGetIcon,
  logisticsReturnReasonTypeGetColor,
  logisticsReturnReasonTypeGetComplexity,
  logisticsReturnReasonTypeGetResolutionTime,
  logisticsReturnReasonTypeNeedsApproval,
} from '@vubon/shared-constants';

// ============================================================
// Return Shipment Item Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Return shipment item filter
 */
export interface ReturnShipmentItemFilter {
  ids?: ID[];
  returnShipmentIds?: ID[];
  orderIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  reasons?: LogisticsReturnReason[];
  conditions?: ('new' | 'used' | 'damaged' | 'defective' | 'unused')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  isReturned?: boolean;
  searchTerm?: string;
  sku?: string;
}

/**
 * Return shipment item statistics
 */
export interface ReturnShipmentItemStatistics {
  returnShipmentId: ID;
  totalItems: number;
  totalQuantity: number;
  returnedItems: number;
  nonReturnedItems: number;
  byReason: Record<LogisticsReturnReason, number>;
  byCondition: Record<string, number>;
  byProduct: {
    productId: ID;
    quantity: number;
    isReturned: boolean;
  }[];
  dateRange: {
    start: Date;
    end: Date;
  };
  returnRate: number;
  averageQuantity: number;
  maxQuantity: number;
  minQuantity: number;
  mostFrequentReason: LogisticsReturnReason;
  mostFrequentCondition: string;
}

/**
 * Return shipment item summary
 */
export interface ReturnShipmentItemSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  returned: number;
  nonReturned: number;
  returnRate: number;
  byReason: Record<LogisticsReturnReason, number>;
  byCondition: Record<string, number>;
  itemTrend: {
    date: Date;
    quantity: number;
    returned: number;
  }[];
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    isReturned: boolean;
  }[];
  topReasons: {
    reason: LogisticsReturnReason;
    count: number;
    label: string;
  }[];
  topConditions: {
    condition: string;
    count: number;
    label: string;
  }[];
}

/**
 * Return shipment item configuration
 */
export interface ReturnShipmentItemConfiguration {
  enabled: boolean;
  requireReason: boolean;
  requireCondition: boolean;
  allowPartialReturn: boolean;
  allowMultipleReasons: boolean;
  maxItemsPerReturn: number;
  maxQuantityPerItem: number;
  notificationOnReturned: boolean;
  notificationOnNonReturned: boolean;
  alertConfig?: ReturnShipmentItemAlertConfig;
}

/**
 * Return shipment item alert configuration
 */
export interface ReturnShipmentItemAlertConfig {
  enabled: boolean;
  nonReturnedAlert: boolean;
  partialReturnAlert: boolean;
  quantityMismatchAlert: boolean;
  suspiciousReturnAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Return shipment item history
 */
export interface ReturnShipmentItemHistory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  returnShipmentId: ID;
  action:
    'add' | 'update' | 'return' | 'non_return' | 'remove' | 'quantity_change' | 'reason_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Return shipment item validation
 */
export interface ReturnShipmentItemValidation {
  isValid: boolean;
  itemId: ID;
  returnShipmentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Return shipment item export
 */
export interface ReturnShipmentItemExport extends BaseEntity, Timestamp {
  id: ID;
  returnShipmentId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ReturnShipmentItemFilter;
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
  // Return Shipment Constants
  LogisticsReturnShipmentType,
  LogisticsReturnShipmentStatus,
  LogisticsReturnShipmentPriority,
  LogisticsReturnShipmentMethod,
  // Return Reason Constants
  LOGISTICS_RETURN_REASON,
  LogisticsReturnReason,
  LogisticsReturnReasonCategory,
  LogisticsReturnReasonType,
  LogisticsReturnReasonSeverity,
  logisticsReturnReasonGetLabel,
  logisticsReturnReasonGetBanglaLabel,
  logisticsReturnReasonGetCategory,
  logisticsReturnReasonGetPriority,
  logisticsReturnReasonIsProductIssue,
  // Return Reason Type Constants
  LOGISTICS_RETURN_REASON_TYPE,
  LogisticsReturnReasonTypeCategory,
  LogisticsReturnReasonTypeIcon,
  LogisticsReturnReasonTypeColor,
  logisticsReturnReasonTypeGetLabel,
  logisticsReturnReasonTypeGetIcon,
  logisticsReturnReasonTypeGetColor,
  logisticsReturnReasonTypeGetComplexity,
  logisticsReturnReasonTypeGetResolutionTime,
  logisticsReturnReasonTypeNeedsApproval,
};
