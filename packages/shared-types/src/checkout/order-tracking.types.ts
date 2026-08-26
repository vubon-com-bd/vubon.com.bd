/**
 * Order Tracking Types
 * Type definitions for order tracking based on shared-constants
 * @module OrderTrackingTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import OrderTrackingEvent from order.types
// ============================================================
import type { OrderTrackingEvent } from './order.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Delivery Status
  DeliveryStatusType,
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
} from '@vubon/shared-constants';

// ============================================================
// Order Tracking Extended Types
// ============================================================

/**
 * Order tracking filter
 */
export interface OrderTrackingFilter {
  orderIds?: ID[];
  userIds?: ID[];
  carriers?: string[];
  statuses?: DeliveryStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  hasTrackingNumber?: boolean;
  hasTrackingUrl?: boolean;
  isDelivered?: boolean;
  searchTerm?: string;
  trackingNumber?: string;
}

/**
 * Order tracking statistics
 */
export interface OrderTrackingStatistics {
  orderId: ID;
  totalTrackingEvents: number;
  uniqueCarriers: number;
  byStatus: Record<DeliveryStatusType, number>;
  byCarrier: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageDeliveryTime: number;
  minDeliveryTime: number;
  maxDeliveryTime: number;
  onTimeDeliveryRate: number;
  delayedDeliveryRate: number;
  failedDeliveryRate: number;
  mostFrequentCarrier: string;
  mostFrequentStatus: DeliveryStatusType;
}

/**
 * Order tracking summary
 */
export interface OrderTrackingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalOrders: number;
  totalTrackingEvents: number;
  byStatus: Record<DeliveryStatusType, number>;
  byCarrier: Record<string, number>;
  trackingTrend: {
    date: Date;
    total: number;
    delivered: number;
    inTransit: number;
  }[];
  topCarriers: {
    carrier: string;
    count: number;
  }[];
  topStatuses: {
    status: DeliveryStatusType;
    count: number;
    label: string;
  }[];
  deliveryPerformance: {
    onTime: number;
    delayed: number;
    failed: number;
  };
}

/**
 * Order tracking configuration
 */
export interface OrderTrackingConfiguration {
  enabled: boolean;
  defaultCarrier: string;
  requireTrackingNumber: boolean;
  requireTrackingUrl: boolean;
  updateIntervalHours: number;
  autoUpdate: boolean;
  notificationOnUpdate: boolean;
  notificationOnDeliver: boolean;
  notificationOnDelay: boolean;
  notificationOnFailure: boolean;
  maxRetries: number;
  retryDelayMinutes: number;
  alertConfig?: OrderTrackingAlertConfig;
}

/**
 * Order tracking alert configuration
 */
export interface OrderTrackingAlertConfig {
  enabled: boolean;
  delayAlert: boolean;
  delayThreshold: number;
  failureAlert: boolean;
  carrierErrorAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Order tracking history
 */
export interface OrderTrackingHistory extends BaseEntity, Timestamp {
  id: ID;
  trackingId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'update' | 'event_add' | 'deliver' | 'fail' | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Order tracking event detail
 */
export interface OrderTrackingEventDetail extends BaseEntity, Timestamp {
  id: ID;
  trackingId: ID;
  orderId: ID;
  userId: ID;
  eventType: string;
  description: string;
  location?: string;
  status: DeliveryStatusType;
  isDelivered: boolean;
  isInTransit: boolean;
  isFailed: boolean;
  isPending: boolean;
  timestamp: Date;
  metadata?: Metadata;
}

/**
 * Order tracking validation
 */
export interface OrderTrackingValidation {
  isValid: boolean;
  trackingId: ID;
  orderId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Order tracking export
 */
export interface OrderTrackingExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderTrackingFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Order tracking timeline
 */
export interface OrderTrackingTimeline {
  orderId: ID;
  orderNumber: string;
  userId: ID;
  trackingNumber: string;
  carrier: string;
  events: OrderTrackingEvent[];
  currentStatus: DeliveryStatusType;
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  progress: number;
  isDelivered: boolean;
  isInTransit: boolean;
  isFailed: boolean;
  isPending: boolean;
}

/**
 * Order tracking carrier info
 */
export interface OrderTrackingCarrierInfo {
  carrier: string;
  trackingUrl: string;
  trackingNumber: string;
  isActive: boolean;
  isAvailable: boolean;
  supportPhone?: string;
  supportEmail?: string;
  website?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Delivery Status
  DeliveryStatusType,
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
};
