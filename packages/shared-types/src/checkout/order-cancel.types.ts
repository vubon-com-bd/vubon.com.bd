/**
 * Order Cancel Types
 * Type definitions for order cancellation based on shared-constants
 * @module OrderCancelTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

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
} from '@vubon/shared-constants';

// ============================================================
// Order Cancel Extended Types
// ============================================================

/**
 * Order cancellation
 */
export interface OrderCancellation extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  approvedBy?: ID;
  approvedAt?: Date;
  rejectedAt?: Date;
  completedAt?: Date;
  refundAmount: number;
  refundStatus: 'pending' | 'processed' | 'completed' | 'failed';
  metadata?: Metadata;
}

/**
 * Order cancellation filter
 */
export interface OrderCancelFilter {
  orderIds?: ID[];
  userIds?: ID[];
  statuses?: ('pending' | 'approved' | 'rejected' | 'completed')[];
  reasons?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minRefundAmount?: number;
  maxRefundAmount?: number;
  searchTerm?: string;
}

/**
 * Order cancellation statistics
 */
export interface OrderCancelStatistics {
  orderId: ID;
  totalCancellations: number;
  pendingCancellations: number;
  approvedCancellations: number;
  rejectedCancellations: number;
  completedCancellations: number;
  byStatus: Record<string, number>;
  byReason: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalRefundAmount: number;
  averageRefundAmount: number;
  maxRefundAmount: number;
  minRefundAmount: number;
  averageCancellationTime: number;
  minCancellationTime: number;
  maxCancellationTime: number;
  mostFrequentReason: string;
  mostFrequentStatus: string;
  cancellationRate: number;
}

/**
 * Order cancellation summary
 */
export interface OrderCancelSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalCancellations: number;
  pending: number;
  approved: number;
  rejected: number;
  completed: number;
  byStatus: Record<string, number>;
  byReason: Record<string, number>;
  cancellationTrend: {
    date: Date;
    total: number;
    approved: number;
    rejected: number;
  }[];
  topReasons: {
    reason: string;
    count: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  financialImpact: {
    totalRefundAmount: number;
    averageRefundAmount: number;
    refundRate: number;
  };
}

/**
 * Order cancellation configuration
 */
export interface OrderCancelConfiguration {
  enabled: boolean;
  allowCancellation: boolean;
  cancellationWindowHours: number;
  requireApproval: boolean;
  requireReason: boolean;
  maxCancellationsPerOrder: number;
  maxCancellationsPerUser: number;
  refundMethod: 'original' | 'store_credit' | 'gift_card';
  restockingFee: number;
  notificationOnRequest: boolean;
  notificationOnApproval: boolean;
  notificationOnRejection: boolean;
  notificationOnCompletion: boolean;
  alertConfig?: OrderCancelAlertConfig;
}

/**
 * Order cancellation alert configuration
 */
export interface OrderCancelAlertConfig {
  enabled: boolean;
  highCancellationRateAlert: boolean;
  highCancellationRateThreshold: number;
  fraudulentCancellationAlert: boolean;
  delayedCancellationAlert: boolean;
  delayedCancellationThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Order cancellation history
 */
export interface OrderCancelHistory extends BaseEntity, Timestamp {
  id: ID;
  cancellationId: ID;
  orderId: ID;
  userId: ID;
  action: 'request' | 'approve' | 'reject' | 'complete' | 'cancel' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Order cancellation validation
 */
export interface OrderCancelValidation {
  isValid: boolean;
  cancellationId: ID;
  orderId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Order cancellation export
 */
export interface OrderCancelExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: OrderCancelFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Order cancellation reason
 */
export interface OrderCancelReason extends BaseEntity, Timestamp {
  id: ID;
  code: string;
  name: string;
  description?: string;
  category: 'customer' | 'payment' | 'shipping' | 'product' | 'other';
  requiresApproval: boolean;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Order cancellation analysis
 */
export interface OrderCancelAnalysis {
  period: {
    start: Date;
    end: Date;
  };
  totalCancellations: number;
  cancellationRate: number;
  averageRefundAmount: number;
  totalRefundAmount: number;
  byReason: {
    reason: string;
    count: number;
    percentage: number;
  }[];
  byCategory: {
    category: string;
    cancellationCount: number;
    cancellationRate: number;
  }[];
  trend: {
    date: Date;
    cancellations: number;
    refundAmount: number;
  }[];
  recommendations: string[];
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
};
