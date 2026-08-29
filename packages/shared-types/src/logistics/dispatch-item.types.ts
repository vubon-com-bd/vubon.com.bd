/**
 * Dispatch Item Types
 * Type definitions for logistics dispatch items based on shared-constants
 * @module DispatchItemTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics dispatch
// ============================================================
import {
  // Dispatch Constants
  LogisticsDispatchType,
  LogisticsDispatchStatus,
  LogisticsDispatchMethod,
  LogisticsDispatchPriority,
  LogisticsDispatchWindow,
} from '@vubon/shared-constants';

// ============================================================
// Dispatch Item Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Dispatch item filter
 */
export interface DispatchItemFilter {
  ids?: ID[];
  dispatchIds?: ID[];
  shipmentIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  isDispatched?: boolean;
  searchTerm?: string;
  sku?: string;
}

/**
 * Dispatch item statistics
 */
export interface DispatchItemStatistics {
  dispatchId: ID;
  totalItems: number;
  totalQuantity: number;
  dispatchedItems: number;
  undispatchedItems: number;
  byProduct: {
    productId: ID;
    quantity: number;
    isDispatched: boolean;
  }[];
  dateRange: {
    start: Date;
    end: Date;
  };
  dispatchRate: number;
  averageQuantity: number;
  maxQuantity: number;
  minQuantity: number;
}

/**
 * Dispatch item summary
 */
export interface DispatchItemSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  dispatched: number;
  undispatched: number;
  dispatchRate: number;
  itemTrend: {
    date: Date;
    quantity: number;
    dispatched: number;
  }[];
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    isDispatched: boolean;
  }[];
}

/**
 * Dispatch item configuration
 */
export interface DispatchItemConfiguration {
  enabled: boolean;
  requireQuantity: boolean;
  allowPartialDispatch: boolean;
  requireVerification: boolean;
  maxItemsPerDispatch: number;
  maxQuantityPerItem: number;
  notificationOnDispatched: boolean;
  notificationOnUndispatched: boolean;
  alertConfig?: DispatchItemAlertConfig;
}

/**
 * Dispatch item alert configuration
 */
export interface DispatchItemAlertConfig {
  enabled: boolean;
  undispatchedAlert: boolean;
  partialDispatchAlert: boolean;
  quantityMismatchAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Dispatch item history
 */
export interface DispatchItemHistory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  dispatchId: ID;
  action: 'add' | 'update' | 'dispatch' | 'undispatch' | 'remove' | 'quantity_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Dispatch item validation
 */
export interface DispatchItemValidation {
  isValid: boolean;
  itemId: ID;
  dispatchId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Dispatch item export
 */
export interface DispatchItemExport extends BaseEntity, Timestamp {
  id: ID;
  dispatchId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DispatchItemFilter;
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
  // Dispatch Constants
  LogisticsDispatchType,
  LogisticsDispatchStatus,
  LogisticsDispatchMethod,
  LogisticsDispatchPriority,
  LogisticsDispatchWindow,
};
