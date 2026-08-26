/**
 * Payment Split Types
 * Type definitions for payment splitting based on shared-constants
 * @module PaymentSplitTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Status
  PaymentStatusType,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
} from '@vubon/shared-constants';

// ============================================================
// Payment Split Extended Types
// ============================================================

/**
 * Payment split
 */
export interface PaymentSplit extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  amount: number;
  currency: string;
  percentage: number;
  type: 'fixed' | 'percentage';
  recipientType: 'vendor' | 'platform' | 'affiliate' | 'partner' | 'third_party';
  recipientId: ID;
  recipientName: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled';
  transactionId?: string;
  gatewayReference?: string;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Payment split filter
 */
export interface PaymentSplitFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  recipientIds?: ID[];
  recipientTypes?: ('vendor' | 'platform' | 'affiliate' | 'partner' | 'third_party')[];
  statuses?: ('pending' | 'processing' | 'completed' | 'failed' | 'cancelled')[];
  types?: ('fixed' | 'percentage')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  minPercentage?: number;
  maxPercentage?: number;
  isPending?: boolean;
  isProcessing?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isCancelled?: boolean;
  searchTerm?: string;
}

/**
 * Payment split statistics
 */
export interface PaymentSplitStatistics {
  paymentId: ID;
  totalSplits: number;
  pendingSplits: number;
  processingSplits: number;
  completedSplits: number;
  failedSplits: number;
  cancelledSplits: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
  byRecipientType: Record<string, number>;
  byRecipient: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalSplitAmount: number;
  averageSplitAmount: number;
  maxSplitAmount: number;
  minSplitAmount: number;
  averageSplitPercentage: number;
  maxSplitPercentage: number;
  minSplitPercentage: number;
  successRate: number;
  failureRate: number;
  mostFrequentRecipientType: string;
  mostFrequentStatus: string;
}

/**
 * Payment split summary
 */
export interface PaymentSplitSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalSplits: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  cancelled: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
  byRecipientType: Record<string, number>;
  splitTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topRecipientTypes: {
    recipientType: string;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalSplitAmount: number;
    averageSplitAmount: number;
    maxSplitAmount: number;
    minSplitAmount: number;
    averageSplitPercentage: number;
    maxSplitPercentage: number;
    minSplitPercentage: number;
  };
}

/**
 * Payment split configuration
 */
export interface PaymentSplitConfiguration {
  enabled: boolean;
  defaultType: 'fixed' | 'percentage';
  requireRecipient: boolean;
  requireReason: boolean;
  requireNote: boolean;
  maxSplitsPerPayment: number;
  maxTotalPercentage: number;
  minSplitAmount: number;
  autoProcess: boolean;
  processDelayMinutes: number;
  notificationOnCreate: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  alertConfig?: PaymentSplitAlertConfig;
}

/**
 * Payment split alert configuration
 */
export interface PaymentSplitAlertConfig {
  enabled: boolean;
  highSplitRateAlert: boolean;
  highSplitRateThreshold: number;
  splitFailureAlert: boolean;
  suspiciousSplitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Payment split history
 */
export interface PaymentSplitHistory extends BaseEntity, Timestamp {
  id: ID;
  splitId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'process' | 'complete' | 'fail' | 'cancel' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Payment split validation
 */
export interface PaymentSplitValidation {
  isValid: boolean;
  splitId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Payment split note
 */
export interface PaymentSplitNote extends BaseEntity, Timestamp {
  id: ID;
  splitId: ID;
  paymentId: ID;
  userId: ID;
  note: string;
  isInternal: boolean;
  metadata?: Metadata;
}

/**
 * Payment split export
 */
export interface PaymentSplitExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PaymentSplitFilter;
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
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
};
