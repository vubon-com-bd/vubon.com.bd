/**
 * Delivery Item Types
 * Type definitions for logistics delivery items based on shared-constants
 * @module DeliveryItemTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics delivery
// ============================================================
import {
  // Delivery Constants
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  LogisticsDeliveryZone,
} from '@vubon/shared-constants';

// ============================================================
// Delivery Item Extended Types
// ============================================================

/**
 * Delivery item
 */
export interface DeliveryItem extends BaseEntity, Timestamp {
  id: ID;
  deliveryId: ID;
  shipmentId: ID;
  shipmentItemId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  quantity: number;
  weight: number;
  isDelivered: boolean;
  deliveredAt?: Date;
  metadata?: Metadata;
}

/**
 * Delivery item filter
 */
export interface DeliveryItemFilter {
  ids?: ID[];
  deliveryIds?: ID[];
  shipmentIds?: ID[];
  productIds?: ID[];
  variantIds?: ID[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minQuantity?: number;
  maxQuantity?: number;
  isDelivered?: boolean;
  searchTerm?: string;
  sku?: string;
}

/**
 * Delivery item statistics
 */
export interface DeliveryItemStatistics {
  deliveryId: ID;
  totalItems: number;
  totalQuantity: number;
  deliveredItems: number;
  notDeliveredItems: number;
  byProduct: {
    productId: ID;
    quantity: number;
    isDelivered: boolean;
  }[];
  dateRange: {
    start: Date;
    end: Date;
  };
  deliveryRate: number;
  averageQuantity: number;
  maxQuantity: number;
  minQuantity: number;
}

/**
 * Delivery item summary
 */
export interface DeliveryItemSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  delivered: number;
  notDelivered: number;
  deliveryRate: number;
  itemTrend: {
    date: Date;
    quantity: number;
    delivered: number;
  }[];
  topProducts: {
    productId: ID;
    name: string;
    quantity: number;
    isDelivered: boolean;
  }[];
}

/**
 * Delivery item configuration
 */
export interface DeliveryItemConfiguration {
  enabled: boolean;
  requireItemVerification: boolean;
  allowPartialDelivery: boolean;
  requireSignature: boolean;
  maxItemsPerDelivery: number;
  maxQuantityPerItem: number;
  notificationOnDelivered: boolean;
  notificationOnFailed: boolean;
  alertConfig?: DeliveryItemAlertConfig;
}

/**
 * Delivery item alert configuration
 */
export interface DeliveryItemAlertConfig {
  enabled: boolean;
  missedItemAlert: boolean;
  damagedItemAlert: boolean;
  missingItemAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Delivery item history
 */
export interface DeliveryItemHistory extends BaseEntity, Timestamp {
  id: ID;
  itemId: ID;
  deliveryId: ID;
  action: 'add' | 'update' | 'deliver' | 'fail' | 'return' | 'remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Delivery item validation
 */
export interface DeliveryItemValidation {
  isValid: boolean;
  itemId: ID;
  deliveryId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Delivery item export
 */
export interface DeliveryItemExport extends BaseEntity, Timestamp {
  id: ID;
  deliveryId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DeliveryItemFilter;
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
  // Delivery Constants
  LogisticsDeliveryType,
  LogisticsDeliveryStatus,
  LogisticsDeliveryMethod,
  LogisticsDeliveryZone,
};
