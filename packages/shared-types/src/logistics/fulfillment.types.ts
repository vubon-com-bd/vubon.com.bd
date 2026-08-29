/**
 * Fulfillment Types
 * Type definitions for logistics fulfillment based on shared-constants
 * @module FulfillmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics fulfillment
// ============================================================
import {
  // Fulfillment Constants
  LOGISTICS_FULFILLMENT,
  LogisticsFulfillmentType,
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentMethod,
  LogisticsFulfillmentPriority,
  LogisticsFulfillmentCenter,
  logisticsFulfillmentGetTypeLabel,
  logisticsFulfillmentGetStatusLabel,
  logisticsFulfillmentGetMethodLabel,
  logisticsFulfillmentGetPriorityLabel,
  logisticsFulfillmentGetTimeEstimate,
  logisticsFulfillmentIsComplete,
  logisticsFulfillmentIsInProgress,
  logisticsFulfillmentGetCenterLabel,
  // Fulfillment Status Constants
  LOGISTICS_FULFILLMENT_STATUS,
  LogisticsFulfillmentStatusType,
  LogisticsFulfillmentStatusCategory,
  LogisticsFulfillmentStatusColor,
  LogisticsFulfillmentStatusIcon,
  LogisticsFulfillmentStatusTransition,
  logisticsFulfillmentStatusGetLabel,
  logisticsFulfillmentStatusGetCategory,
  logisticsFulfillmentStatusIsComplete,
  logisticsFulfillmentStatusIsInProgress,
  logisticsFulfillmentStatusCanTransition,
  // Fulfillment Type Constants
  LOGISTICS_FULFILLMENT_TYPE,
  LogisticsFulfillmentTypeCategory,
  LogisticsFulfillmentTypeIcon,
  LogisticsFulfillmentTypeColor,
  logisticsFulfillmentTypeGetLabel,
  logisticsFulfillmentTypeGetIcon,
  logisticsFulfillmentTypeGetColor,
  logisticsFulfillmentTypeGetPriority,
  logisticsFulfillmentTypeGetTimeWindow,
  logisticsFulfillmentTypeGetPriceMultiplier,
} from '@vubon/shared-constants';

// ============================================================
// Fulfillment Extended Types
// ============================================================

/**
 * Fulfillment item
 */
export interface FulfillmentItem extends BaseEntity, Timestamp {
  id: ID;
  fulfillmentId: ID;
  orderId: ID;
  orderItemId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  quantity: number;
  isFulfilled: boolean;
  fulfilledAt?: Date;
  metadata?: Metadata;
}

/**
 * Fulfillment
 */
export interface Fulfillment extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  type: LogisticsFulfillmentType;
  status: LogisticsFulfillmentStatusType;
  method: LogisticsFulfillmentMethod;
  priority: LogisticsFulfillmentPriority;
  center: LogisticsFulfillmentCenter;
  items: FulfillmentItem[];
  totalItems: number;
  totalQuantity: number;
  isComplete: boolean;
  isInProgress: boolean;
  timeEstimate: number;
  startedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Fulfillment filter
 */
export interface FulfillmentFilter {
  ids?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  types?: LogisticsFulfillmentType[];
  statuses?: LogisticsFulfillmentStatusType[];
  methods?: LogisticsFulfillmentMethod[];
  priorities?: LogisticsFulfillmentPriority[];
  centers?: LogisticsFulfillmentCenter[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isInProgress?: boolean;
  searchTerm?: string;
}

/**
 * Fulfillment statistics
 */
export interface FulfillmentStatistics {
  orderId: ID;
  totalFulfillments: number;
  completeFulfillments: number;
  inProgressFulfillments: number;
  byType: Record<LogisticsFulfillmentType, number>;
  byStatus: Record<LogisticsFulfillmentStatusType, number>;
  byMethod: Record<LogisticsFulfillmentMethod, number>;
  byPriority: Record<LogisticsFulfillmentPriority, number>;
  byCenter: Record<LogisticsFulfillmentCenter, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  averageTimeEstimate: number;
  maxTimeEstimate: number;
  minTimeEstimate: number;
  completionRate: number;
  inProgressRate: number;
  mostFrequentType: LogisticsFulfillmentType;
  mostFrequentStatus: LogisticsFulfillmentStatusType;
  mostFrequentMethod: LogisticsFulfillmentMethod;
  mostFrequentCenter: LogisticsFulfillmentCenter;
}

/**
 * Fulfillment summary
 */
export interface FulfillmentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalFulfillments: number;
  complete: number;
  inProgress: number;
  byType: Record<LogisticsFulfillmentType, number>;
  byStatus: Record<LogisticsFulfillmentStatusType, number>;
  byMethod: Record<LogisticsFulfillmentMethod, number>;
  byPriority: Record<LogisticsFulfillmentPriority, number>;
  byCenter: Record<LogisticsFulfillmentCenter, number>;
  fulfillmentTrend: {
    date: Date;
    total: number;
    complete: number;
    inProgress: number;
  }[];
  topTypes: {
    type: LogisticsFulfillmentType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsFulfillmentStatusType;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: LogisticsFulfillmentMethod;
    count: number;
    label: string;
  }[];
  topCenters: {
    center: LogisticsFulfillmentCenter;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    completionRate: number;
    inProgressRate: number;
    averageTimeEstimate: number;
    maxTimeEstimate: number;
    minTimeEstimate: number;
  };
}

/**
 * Fulfillment configuration
 */
export interface FulfillmentConfiguration {
  enabled: boolean;
  defaultType: LogisticsFulfillmentType;
  defaultMethod: LogisticsFulfillmentMethod;
  defaultPriority: LogisticsFulfillmentPriority;
  defaultCenter: LogisticsFulfillmentCenter;
  requireItems: boolean;
  requireQuantity: boolean;
  maxItemsPerFulfillment: number;
  maxQuantityPerFulfillment: number;
  autoAssign: boolean;
  autoAssignStrategy: 'time' | 'cost' | 'preference' | 'capacity';
  notificationOnCreate: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: FulfillmentAlertConfig;
}

/**
 * Fulfillment alert configuration
 */
export interface FulfillmentAlertConfig {
  enabled: boolean;
  completionDelayAlert: boolean;
  completionDelayThreshold: number;
  capacityAlert: boolean;
  capacityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Fulfillment history
 */
export interface FulfillmentHistory extends BaseEntity, Timestamp {
  id: ID;
  fulfillmentId: ID;
  orderId: ID;
  userId: ID;
  action:
    'create' | 'start' | 'complete' | 'update' | 'cancel' | 'assign' | 'item_add' | 'item_remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Fulfillment validation
 */
export interface FulfillmentValidation {
  isValid: boolean;
  fulfillmentId: ID;
  orderId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Fulfillment export
 */
export interface FulfillmentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: FulfillmentFilter;
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
  LOGISTICS_FULFILLMENT,
  LogisticsFulfillmentType,
  LogisticsFulfillmentStatus,
  LogisticsFulfillmentMethod,
  LogisticsFulfillmentPriority,
  LogisticsFulfillmentCenter,
  logisticsFulfillmentGetTypeLabel,
  logisticsFulfillmentGetStatusLabel,
  logisticsFulfillmentGetMethodLabel,
  logisticsFulfillmentGetPriorityLabel,
  logisticsFulfillmentGetTimeEstimate,
  logisticsFulfillmentIsComplete,
  logisticsFulfillmentIsInProgress,
  logisticsFulfillmentGetCenterLabel,
  // Fulfillment Status Constants
  LOGISTICS_FULFILLMENT_STATUS,
  LogisticsFulfillmentStatusType,
  LogisticsFulfillmentStatusCategory,
  LogisticsFulfillmentStatusColor,
  LogisticsFulfillmentStatusIcon,
  LogisticsFulfillmentStatusTransition,
  logisticsFulfillmentStatusGetLabel,
  logisticsFulfillmentStatusGetCategory,
  logisticsFulfillmentStatusIsComplete,
  logisticsFulfillmentStatusIsInProgress,
  logisticsFulfillmentStatusCanTransition,
  // Fulfillment Type Constants
  LOGISTICS_FULFILLMENT_TYPE,
  LogisticsFulfillmentTypeCategory,
  LogisticsFulfillmentTypeIcon,
  LogisticsFulfillmentTypeColor,
  logisticsFulfillmentTypeGetLabel,
  logisticsFulfillmentTypeGetIcon,
  logisticsFulfillmentTypeGetColor,
  logisticsFulfillmentTypeGetPriority,
  logisticsFulfillmentTypeGetTimeWindow,
  logisticsFulfillmentTypeGetPriceMultiplier,
};
