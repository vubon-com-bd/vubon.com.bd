/**
 * Dispatch Types
 * Type definitions for logistics dispatch based on shared-constants
 * @module DispatchTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics dispatch
// ============================================================
import {
  // Dispatch Constants
  LOGISTICS_DISPATCH,
  LogisticsDispatchType,
  LogisticsDispatchStatus,
  LogisticsDispatchMethod,
  LogisticsDispatchPriority,
  LogisticsDispatchWindow,
  logisticsDispatchGetTypeLabel,
  logisticsDispatchGetStatusLabel,
  logisticsDispatchGetMethodLabel,
  logisticsDispatchGetPriorityLabel,
  logisticsDispatchGetTimeEstimate,
  logisticsDispatchIsComplete,
  logisticsDispatchIsInTransit,
  logisticsDispatchGetWindowLabel,
  logisticsDispatchGetWindowHours,
  // Dispatch Status Constants
  LOGISTICS_DISPATCH_STATUS,
  LogisticsDispatchStatusType,
  LogisticsDispatchStatusCategory,
  LogisticsDispatchStatusColor,
  LogisticsDispatchStatusIcon,
  LogisticsDispatchStatusTransition,
  logisticsDispatchStatusGetLabel,
  logisticsDispatchStatusGetCategory,
  logisticsDispatchStatusIsActive,
  logisticsDispatchStatusIsComplete,
  logisticsDispatchStatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Dispatch Extended Types
// ============================================================

/**
 * Dispatch item
 */
export interface DispatchItem extends BaseEntity, Timestamp {
  id: ID;
  dispatchId: ID;
  shipmentId: ID;
  shipmentItemId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  quantity: number;
  isDispatched: boolean;
  dispatchedAt?: Date;
  metadata?: Metadata;
}

/**
 * Dispatch
 */
export interface Dispatch extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  shipmentId: ID;
  userId: ID;
  type: LogisticsDispatchType;
  status: LogisticsDispatchStatusType;
  method: LogisticsDispatchMethod;
  priority: LogisticsDispatchPriority;
  window: LogisticsDispatchWindow;
  items: DispatchItem[];
  totalItems: number;
  totalQuantity: number;
  isComplete: boolean;
  isInTransit: boolean;
  timeEstimate: number;
  windowHours: number;
  dispatchedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Dispatch filter
 */
export interface DispatchFilter {
  ids?: ID[];
  orderIds?: ID[];
  shipmentIds?: ID[];
  userIds?: ID[];
  types?: LogisticsDispatchType[];
  statuses?: LogisticsDispatchStatusType[];
  methods?: LogisticsDispatchMethod[];
  priorities?: LogisticsDispatchPriority[];
  windows?: LogisticsDispatchWindow[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isInTransit?: boolean;
  searchTerm?: string;
}

/**
 * Dispatch statistics
 */
export interface DispatchStatistics {
  orderId: ID;
  totalDispatches: number;
  completeDispatches: number;
  inTransitDispatches: number;
  byType: Record<LogisticsDispatchType, number>;
  byStatus: Record<LogisticsDispatchStatusType, number>;
  byMethod: Record<LogisticsDispatchMethod, number>;
  byPriority: Record<LogisticsDispatchPriority, number>;
  byWindow: Record<LogisticsDispatchWindow, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  averageTimeEstimate: number;
  maxTimeEstimate: number;
  minTimeEstimate: number;
  averageWindowHours: number;
  maxWindowHours: number;
  minWindowHours: number;
  completionRate: number;
  inTransitRate: number;
  mostFrequentType: LogisticsDispatchType;
  mostFrequentStatus: LogisticsDispatchStatusType;
  mostFrequentMethod: LogisticsDispatchMethod;
  mostFrequentWindow: LogisticsDispatchWindow;
}

/**
 * Dispatch summary
 */
export interface DispatchSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalDispatches: number;
  complete: number;
  inTransit: number;
  byType: Record<LogisticsDispatchType, number>;
  byStatus: Record<LogisticsDispatchStatusType, number>;
  byMethod: Record<LogisticsDispatchMethod, number>;
  byPriority: Record<LogisticsDispatchPriority, number>;
  byWindow: Record<LogisticsDispatchWindow, number>;
  dispatchTrend: {
    date: Date;
    total: number;
    complete: number;
    inTransit: number;
  }[];
  topTypes: {
    type: LogisticsDispatchType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsDispatchStatusType;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: LogisticsDispatchMethod;
    count: number;
    label: string;
  }[];
  topWindows: {
    window: LogisticsDispatchWindow;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    completionRate: number;
    inTransitRate: number;
    averageTimeEstimate: number;
    averageWindowHours: number;
  };
}

/**
 * Dispatch configuration
 */
export interface DispatchConfiguration {
  enabled: boolean;
  defaultType: LogisticsDispatchType;
  defaultMethod: LogisticsDispatchMethod;
  defaultPriority: LogisticsDispatchPriority;
  defaultWindow: LogisticsDispatchWindow;
  requireItems: boolean;
  requireQuantity: boolean;
  maxItemsPerDispatch: number;
  maxQuantityPerDispatch: number;
  autoAssign: boolean;
  autoAssignStrategy: 'time' | 'cost' | 'preference' | 'capacity';
  notificationOnCreate: boolean;
  notificationOnDispatch: boolean;
  notificationOnComplete: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: DispatchAlertConfig;
}

/**
 * Dispatch alert configuration
 */
export interface DispatchAlertConfig {
  enabled: boolean;
  completionDelayAlert: boolean;
  completionDelayThreshold: number;
  capacityAlert: boolean;
  capacityThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Dispatch history
 */
export interface DispatchHistory extends BaseEntity, Timestamp {
  id: ID;
  dispatchId: ID;
  orderId: ID;
  shipmentId: ID;
  userId: ID;
  action:
    | 'create'
    | 'dispatch'
    | 'complete'
    | 'update'
    | 'cancel'
    | 'assign'
    | 'item_add'
    | 'item_remove';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Dispatch validation
 */
export interface DispatchValidation {
  isValid: boolean;
  dispatchId: ID;
  orderId: ID;
  shipmentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Dispatch export
 */
export interface DispatchExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DispatchFilter;
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
  LOGISTICS_DISPATCH,
  LogisticsDispatchType,
  LogisticsDispatchStatus,
  LogisticsDispatchMethod,
  LogisticsDispatchPriority,
  LogisticsDispatchWindow,
  logisticsDispatchGetTypeLabel,
  logisticsDispatchGetStatusLabel,
  logisticsDispatchGetMethodLabel,
  logisticsDispatchGetPriorityLabel,
  logisticsDispatchGetTimeEstimate,
  logisticsDispatchIsComplete,
  logisticsDispatchIsInTransit,
  logisticsDispatchGetWindowLabel,
  logisticsDispatchGetWindowHours,
  // Dispatch Status Constants
  LOGISTICS_DISPATCH_STATUS,
  LogisticsDispatchStatusType,
  LogisticsDispatchStatusCategory,
  LogisticsDispatchStatusColor,
  LogisticsDispatchStatusIcon,
  LogisticsDispatchStatusTransition,
  logisticsDispatchStatusGetLabel,
  logisticsDispatchStatusGetCategory,
  logisticsDispatchStatusIsActive,
  logisticsDispatchStatusIsComplete,
  logisticsDispatchStatusCanTransition,
};
