/**
 * Payment Refund Types
 * Type definitions for payment refunds based on shared-constants
 * @module PaymentRefundTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Status
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
} from '@vubon/shared-constants';

// ============================================================
// Payment Refund Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Payment refund filter
 */
export interface PaymentRefundFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  statuses?: ('pending' | 'processing' | 'approved' | 'completed' | 'failed' | 'cancelled')[];
  methods?: ('original' | 'store_credit' | 'gift_card' | 'bank_transfer')[];
  reasons?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  isPending?: boolean;
  isProcessing?: boolean;
  isApproved?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isCancelled?: boolean;
  searchTerm?: string;
  approvedBy?: ID;
}

/**
 * Payment refund statistics
 */
export interface PaymentRefundStatistics {
  paymentId: ID;
  totalRefunds: number;
  pendingRefunds: number;
  processingRefunds: number;
  approvedRefunds: number;
  completedRefunds: number;
  failedRefunds: number;
  cancelledRefunds: number;
  byStatus: Record<string, number>;
  byMethod: Record<string, number>;
  byReason: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalRefundAmount: number;
  averageRefundAmount: number;
  maxRefundAmount: number;
  minRefundAmount: number;
  averageRefundTime: number;
  maxRefundTime: number;
  minRefundTime: number;
  refundRate: number;
  mostFrequentReason: string;
  mostFrequentStatus: string;
  mostFrequentMethod: string;
}

/**
 * Payment refund summary
 */
export interface PaymentRefundSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalRefunds: number;
  pending: number;
  processing: number;
  approved: number;
  completed: number;
  failed: number;
  cancelled: number;
  byStatus: Record<string, number>;
  byMethod: Record<string, number>;
  byReason: Record<string, number>;
  refundTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topReasons: {
    reason: string;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: string;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalRefundAmount: number;
    averageRefundAmount: number;
    maxRefundAmount: number;
    minRefundAmount: number;
    refundRate: number;
  };
}

/**
 * Payment refund configuration
 */
export interface PaymentRefundConfiguration {
  enabled: boolean;
  defaultMethod: 'original' | 'store_credit' | 'gift_card' | 'bank_transfer';
  requireApproval: boolean;
  requireReason: boolean;
  requireNote: boolean;
  refundWindowDays: number;
  maxRefundPercentage: number;
  maxRefundAmount: number;
  minRefundAmount: number;
  autoApprove: boolean;
  autoApproveThreshold: number;
  autoApproveDays: number;
  notificationOnRequest: boolean;
  notificationOnApproval: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  alertConfig?: PaymentRefundAlertConfig;
}

/**
 * Payment refund alert configuration
 */
export interface PaymentRefundAlertConfig {
  enabled: boolean;
  highRefundRateAlert: boolean;
  highRefundRateThreshold: number;
  suspiciousRefundAlert: boolean;
  delayedRefundAlert: boolean;
  delayedRefundThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Payment refund history
 */
export interface PaymentRefundHistory extends BaseEntity, Timestamp {
  id: ID;
  refundId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'request' | 'approve' | 'process' | 'complete' | 'fail' | 'cancel' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Payment refund validation
 */
export interface PaymentRefundValidation {
  isValid: boolean;
  refundId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Payment refund note
 */
export interface PaymentRefundNote extends BaseEntity, Timestamp {
  id: ID;
  refundId: ID;
  paymentId: ID;
  userId: ID;
  note: string;
  isInternal: boolean;
  metadata?: Metadata;
}

/**
 * Payment refund export
 */
export interface PaymentRefundExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PaymentRefundFilter;
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
  // Payment Status
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
};
