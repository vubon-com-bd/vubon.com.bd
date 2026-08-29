/**
 * Fulfillment Item Types
 * Type definitions for logistics fulfillment items based on shared-constants
 * @module FulfillmentItemTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics fulfillment
// ============================================================
import {
  // Fulfillment Constants
  LogisticsFulfillmentType,
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentMethod,
  LogisticsFulfillmentPriority,
  LogisticsFulfillmentCenter,
} from '@vubon/shared-constants';

// ============================================================
// Fulfillment Item Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Fulfillment item filter
 */
export interface FulfillmentItemFilter {
  ids?: ID[];
  fulfillmentIds?: ID[];
  orderIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  isFulfilled?: boolean;
  searchTerm?: string;
  sku?: string;
}

/**
 * Fulfillment item statistics
 */
export interface FulfillmentItemStatistics {
  fulfillmentId: ID;
  totalItems: number;
  totalQuantity: number;
  fulfilledItems: number;
  unfulfilledItems: number;
  byProduct: {
    productId: ID;
    quantity: number;
    isFulfilled: boolean;
  }[];
  dateRange: {
    start: Date;
    end: Date;
  };
  fulfillmentRate: number;
  averageQuantity: number;
  maxQuantity: number;
  minQuantity: number;
}

/**
 * Fulfillment item summary
 */
export interface FulfillmentItemSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  fulfilled: number;
  unfulfilled: number;
  fulfillmentRate: number;
  itemTrend: {
    date: Date;
    quantity: number;
    fulfilled: number;
  }[];
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    isFulfilled: boolean;
  }[];
}

/**
 * Fulfillment item configuration
 */
export interface FulfillmentItemConfiguration {
  enabled: boolean;
  requireQuantity: boolean;
  allowPartialFulfillment: boolean;
  requireVerification: boolean;
  maxItemsPerFulfillment: number;
  maxQuantityPerItem: number;
  notificationOnFulfilled: boolean;
  notificationOnUnfulfilled: boolean;
  alertConfig?: FulfillmentItemAlertConfig;
}

/**
 * Fulfillment item alert configuration
 */
export interface FulfillmentItemAlertConfig {
  enabled: boolean;
  unfulfilledAlert: boolean;
  partialFulfillmentAlert: boolean;
  quantityMismatchAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Fulfillment item history
 */
export interface FulfillmentItemHistory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  fulfillmentId: ID;
  action: 'add' | 'update' | 'fulfill' | 'unfulfill' | 'remove' | 'quantity_change';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Fulfillment item validation
 */
export interface FulfillmentItemValidation {
  isValid: boolean;
  itemId: ID;
  fulfillmentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Fulfillment item export
 */
export interface FulfillmentItemExport extends BaseEntity, Timestamp {
  id: ID;
  fulfillmentId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FulfillmentItemFilter;
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
  // Fulfillment Constants
  LogisticsFulfillmentType,
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentMethod,
  LogisticsFulfillmentPriority,
  LogisticsFulfillmentCenter,
};
