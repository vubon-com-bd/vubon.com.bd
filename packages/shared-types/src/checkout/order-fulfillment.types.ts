/**
 * Order Fulfillment Types
 * Type definitions for order fulfillment based on shared-constants
 * @module OrderFulfillmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

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
  // Delivery Status
  DeliveryStatusType,
  // Delivery Method
  DeliveryMethodType,
} from '@vubon/shared-constants';

// ============================================================
// Order Fulfillment Extended Types
// ============================================================

/**
 * Order fulfillment
 */
export interface OrderFulfillment extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  status:
    | 'pending'
    | 'processing'
    | 'picking'
    | 'packing'
    | 'shipped'
    | 'delivered'
    | 'failed'
    | 'cancelled';
  priority: OrderPriority;
  items: OrderFulfillmentItem[];
  shippingAddress: Address;
  deliveryMethod: DeliveryMethodType;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  pickedAt?: Date;
  packedAt?: Date;
  shippedAt?: Date;
  deliveredAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Order fulfillment item
 */
export interface OrderFulfillmentItem extends BaseEntity, Timestamp {
  id: ID;
  fulfillmentId: ID;
  orderId: ID;
  orderItemId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  quantity: number;
  pickedQuantity: number;
  packedQuantity: number;
  shippedQuantity: number;
  status: 'pending' | 'picked' | 'packed' | 'shipped' | 'delivered' | 'failed' | 'cancelled';
  metadata?: Metadata;
}

/**
 * Order fulfillment filter
 */
export interface OrderFulfillmentFilter {
  orderIds?: ID[];
  userIds?: ID[];
  statuses?: (
    | 'pending'
    | 'processing'
    | 'picking'
    | 'packing'
    | 'shipped'
    | 'delivered'
    | 'failed'
    | 'cancelled'
  )[];
  priorities?: OrderPriority[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  hasTrackingNumber?: boolean;
  hasCarrier?: boolean;
  isDelivered?: boolean;
  isFailed?: boolean;
  searchTerm?: string;
  carrier?: string;
}

/**
 * Order fulfillment statistics
 */
export interface OrderFulfillmentStatistics {
  orderId: ID;
  totalItems: number;
  pickedItems: number;
  packedItems: number;
  shippedItems: number;
  deliveredItems: number;
  failedItems: number;
  byStatus: Record<string, number>;
  byPriority: Record<OrderPriority, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averagePickingTime: number;
  averagePackingTime: number;
  averageShippingTime: number;
  averageDeliveryTime: number;
  onTimeDeliveryRate: number;
  delayedDeliveryRate: number;
  failedDeliveryRate: number;
  mostFrequentStatus: string;
  mostFrequentPriority: OrderPriority;
}

/**
 * Order fulfillment summary
 */
export interface OrderFulfillmentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFulfillments: number;
  pending: number;
  processing: number;
  picking: number;
  packing: number;
  shipped: number;
  delivered: number;
  failed: number;
  cancelled: number;
  byStatus: Record<string, number>;
  byPriority: Record<OrderPriority, number>;
  fulfillmentTrend: {
    date: Date;
    total: number;
    delivered: number;
    failed: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: OrderPriority;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    averageFulfillmentTime: number;
    onTimeDeliveryRate: number;
    failedDeliveryRate: number;
  };
}

/**
 * Order fulfillment configuration
 */
export interface OrderFulfillmentConfiguration {
  enabled: boolean;
  autoProcess: boolean;
  processingDelayMinutes: number;
  pickingStrategy: 'fifo' | 'lifo' | 'priority' | 'location';
  packingStrategy: 'individual' | 'combined' | 'optimized';
  requirePicking: boolean;
  requirePacking: boolean;
  requireShipping: boolean;
  allowPartialFulfillment: boolean;
  maxItemsPerBatch: number;
  trackingRequired: boolean;
  carrierRequired: boolean;
  notificationOnPick: boolean;
  notificationOnPack: boolean;
  notificationOnShip: boolean;
  notificationOnDeliver: boolean;
  notificationOnFail: boolean;
  alertConfig?: OrderFulfillmentAlertConfig;
}

/**
 * Order fulfillment alert configuration
 */
export interface OrderFulfillmentAlertConfig {
  enabled: boolean;
  delayAlert: boolean;
  delayThreshold: number;
  failureAlert: boolean;
  inventoryShortageAlert: boolean;
  highPriorityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Order fulfillment history
 */
export interface OrderFulfillmentHistory extends BaseEntity, Timestamp {
  id: ID;
  fulfillmentId: ID;
  orderId: ID;
  userId: ID;
  action:
    'create' | 'process' | 'pick' | 'pack' | 'ship' | 'deliver' | 'fail' | 'cancel' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Order fulfillment validation
 */
export interface OrderFulfillmentValidation {
  isValid: boolean;
  fulfillmentId: ID;
  orderId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Order fulfillment export
 */
export interface OrderFulfillmentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderFulfillmentFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Order fulfillment batch
 */
export interface OrderFulfillmentBatch extends BaseEntity, Timestamp {
  id: ID;
  name: string;
  status: 'created' | 'processing' | 'completed' | 'failed';
  fulfillments: OrderFulfillment[];
  totalItems: number;
  processedItems: number;
  failedItems: number;
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Order fulfillment timeline
 */
export interface OrderFulfillmentTimeline {
  orderId: ID;
  orderNumber: string;
  userId: ID;
  events: {
    status: string;
    timestamp: Date;
    description: string;
  }[];
  currentStatus: string;
  progress: number;
  estimatedCompletion?: Date;
  actualCompletion?: Date;
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
  // Delivery Status
  DeliveryStatusType,
  // Delivery Method
  DeliveryMethodType,
};
