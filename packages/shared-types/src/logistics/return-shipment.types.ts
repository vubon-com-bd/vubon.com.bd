/**
 * Return Shipment Types
 * Type definitions for logistics return shipments based on shared-constants
 * @module ReturnShipmentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants logistics return
// ============================================================
import {
  // Return Shipment Constants
  LOGISTICS_RETURN_SHIPMENT,
  LogisticsReturnShipmentType,
  LogisticsReturnShipmentStatus,
  LogisticsReturnShipmentPriority,
  LogisticsReturnShipmentMethod,
  logisticsReturnShipmentGetTypeLabel,
  logisticsReturnShipmentGetStatusLabel,
  logisticsReturnShipmentGetPriorityLabel,
  logisticsReturnShipmentGetMethodLabel,
  logisticsReturnShipmentIsCompleted,
  logisticsReturnShipmentIsInProgress,
  logisticsReturnShipmentIsRejected,
  logisticsReturnShipmentGetTimeWindow,
  // Return Shipment Status Constants
  LOGISTICS_RETURN_SHIPMENT_STATUS,
  LogisticsReturnShipmentStatusType,
  LogisticsReturnShipmentStatusCategory,
  LogisticsReturnShipmentStatusColor,
  LogisticsReturnShipmentStatusIcon,
  LogisticsReturnShipmentStatusTransition,
  logisticsReturnShipmentStatusGetLabel,
  logisticsReturnShipmentStatusGetCategory,
  logisticsReturnShipmentStatusIsComplete,
  logisticsReturnShipmentStatusIsActive,
  logisticsReturnShipmentStatusCanTransition,
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
// Return Shipment Extended Types
// ============================================================

/**
 * Return shipment item
 */
export interface ReturnShipmentItem extends BaseEntity, Timestamp {
  id: ID;
  returnShipmentId: ID;
  orderId: ID;
  orderItemId: ID;
  productId: ID;
  variantId?: ID;
  sku: string;
  name: string;
  quantity: number;
  reason: LogisticsReturnReason;
  condition: 'new' | 'used' | 'damaged' | 'defective' | 'unused';
  isReturned: boolean;
  returnedAt?: Date;
  metadata?: Metadata;
}

/**
 * Return shipment
 */
export interface ReturnShipment extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  type: LogisticsReturnShipmentType;
  status: LogisticsReturnShipmentStatusType;
  priority: LogisticsReturnShipmentPriority;
  method: LogisticsReturnShipmentMethod;
  items: ReturnShipmentItem[];
  totalItems: number;
  totalQuantity: number;
  timeWindow: number;
  isCompleted: boolean;
  isInProgress: boolean;
  isRejected: boolean;
  reason?: string;
  notes?: string;
  fromAddress: Address;
  toAddress: Address;
  requestedAt: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  completedAt?: Date;
  metadata?: Metadata;
}

/**
 * Return shipment filter
 */
export interface ReturnShipmentFilter {
  ids?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  types?: LogisticsReturnShipmentType[];
  statuses?: LogisticsReturnShipmentStatusType[];
  priorities?: LogisticsReturnShipmentPriority[];
  methods?: LogisticsReturnShipmentMethod[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isCompleted?: boolean;
  isInProgress?: boolean;
  isRejected?: boolean;
  searchTerm?: string;
}

/**
 * Return shipment statistics
 */
export interface ReturnShipmentStatistics {
  orderId: ID;
  totalReturns: number;
  completedReturns: number;
  inProgressReturns: number;
  rejectedReturns: number;
  byType: Record<LogisticsReturnShipmentType, number>;
  byStatus: Record<LogisticsReturnShipmentStatusType, number>;
  byPriority: Record<LogisticsReturnShipmentPriority, number>;
  byMethod: Record<LogisticsReturnShipmentMethod, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalItems: number;
  totalQuantity: number;
  averageTimeWindow: number;
  maxTimeWindow: number;
  minTimeWindow: number;
  completionRate: number;
  inProgressRate: number;
  rejectionRate: number;
  mostFrequentType: LogisticsReturnShipmentType;
  mostFrequentStatus: LogisticsReturnShipmentStatusType;
  mostFrequentPriority: LogisticsReturnShipmentPriority;
  mostFrequentMethod: LogisticsReturnShipmentMethod;
}

/**
 * Return shipment summary
 */
export interface ReturnShipmentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalReturns: number;
  completed: number;
  inProgress: number;
  rejected: number;
  byType: Record<LogisticsReturnShipmentType, number>;
  byStatus: Record<LogisticsReturnShipmentStatusType, number>;
  byPriority: Record<LogisticsReturnShipmentPriority, number>;
  byMethod: Record<LogisticsReturnShipmentMethod, number>;
  returnTrend: {
    date: Date;
    total: number;
    completed: number;
    rejected: number;
  }[];
  topTypes: {
    type: LogisticsReturnShipmentType;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: LogisticsReturnShipmentStatusType;
    count: number;
    label: string;
  }[];
  topPriorities: {
    priority: LogisticsReturnShipmentPriority;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: LogisticsReturnShipmentMethod;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    completionRate: number;
    inProgressRate: number;
    rejectionRate: number;
    averageTimeWindow: number;
  };
}

/**
 * Return shipment configuration
 */
export interface ReturnShipmentConfiguration {
  enabled: boolean;
  defaultType: LogisticsReturnShipmentType;
  defaultPriority: LogisticsReturnShipmentPriority;
  defaultMethod: LogisticsReturnShipmentMethod;
  defaultTimeWindow: number;
  requireReason: boolean;
  requireApproval: boolean;
  requireNotes: boolean;
  maxItemsPerReturn: number;
  maxQuantityPerReturn: number;
  autoApprove: boolean;
  autoApproveThreshold: number;
  notificationOnRequest: boolean;
  notificationOnApproval: boolean;
  notificationOnRejection: boolean;
  notificationOnCompletion: boolean;
  alertConfig?: ReturnShipmentAlertConfig;
}

/**
 * Return shipment alert configuration
 */
export interface ReturnShipmentAlertConfig {
  enabled: boolean;
  completionDelayAlert: boolean;
  completionDelayThreshold: number;
  rejectionAlert: boolean;
  highReturnRateAlert: boolean;
  highReturnRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Return shipment history
 */
export interface ReturnShipmentHistory extends BaseEntity, Timestamp {
  id: ID;
  returnShipmentId: ID;
  orderId: ID;
  userId: ID;
  action: 'request' | 'approve' | 'reject' | 'start' | 'complete' | 'update' | 'cancel';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Return shipment validation
 */
export interface ReturnShipmentValidation {
  isValid: boolean;
  returnShipmentId: ID;
  orderId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Return shipment export
 */
export interface ReturnShipmentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: ReturnShipmentFilter;
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
  LOGISTICS_RETURN_SHIPMENT,
  LogisticsReturnShipmentType,
  LogisticsReturnShipmentStatus,
  LogisticsReturnShipmentPriority,
  LogisticsReturnShipmentMethod,
  logisticsReturnShipmentGetTypeLabel,
  logisticsReturnShipmentGetStatusLabel,
  logisticsReturnShipmentGetPriorityLabel,
  logisticsReturnShipmentGetMethodLabel,
  logisticsReturnShipmentIsCompleted,
  logisticsReturnShipmentIsInProgress,
  logisticsReturnShipmentIsRejected,
  logisticsReturnShipmentGetTimeWindow,
  // Return Shipment Status Constants
  LOGISTICS_RETURN_SHIPMENT_STATUS,
  LogisticsReturnShipmentStatusType,
  LogisticsReturnShipmentStatusCategory,
  LogisticsReturnShipmentStatusColor,
  LogisticsReturnShipmentStatusIcon,
  LogisticsReturnShipmentStatusTransition,
  logisticsReturnShipmentStatusGetLabel,
  logisticsReturnShipmentStatusGetCategory,
  logisticsReturnShipmentStatusIsComplete,
  logisticsReturnShipmentStatusIsActive,
  logisticsReturnShipmentStatusCanTransition,
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
