/**
 * Payment Transaction Types
 * Type definitions for payment transactions based on shared-constants
 * @module PaymentTransactionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Transaction Type
  TRANSACTION_TYPE,
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  TransactionDefault,
  transactiontypeGetTypeLabel,
  transactiontypeGetCategoryLabel,
  transactiontypeGetDirectionLabel,
  transactiontypeIsPayment,
  transactiontypeIsRefund,
  transactiontypeIsAdjustment,
  transactiontypeGetDefaultType,
  // Transaction Status
  TRANSACTION_STATUS,
  TransactionStatusType,
  TransactionStatusColor,
  TransactionStatusCategory,
  TransactionStatusOrder,
  TransactionStatusTransition,
  transactionstatusGetStatusLabel,
  transactionstatusGetStatusColor,
  transactionstatusGetStatusCategory,
  transactionstatusIsCompleted,
  transactionstatusIsFailed,
  transactionstatusIsRefunded,
  transactionstatusIsPending,
  transactionstatusCanTransition,
} from '@vubon/shared-constants';

// ============================================================
// Payment Transaction Extended Types
// ============================================================

/**
 * Payment transaction
 */
export interface PaymentTransaction extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  type: TransactionTypeType;
  category: TransactionCategory;
  direction: TransactionDirection;
  status: TransactionStatusType;
  amount: number;
  currency: string;
  reference?: string;
  description?: string;
  gatewayTransactionId?: string;
  gatewayReference?: string;
  isPayment: boolean;
  isRefund: boolean;
  isAdjustment: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isRefunded: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Transaction filter
 */
export interface TransactionFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  types?: TransactionTypeType[];
  categories?: TransactionCategory[];
  directions?: TransactionDirection[];
  statuses?: TransactionStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  isPayment?: boolean;
  isRefund?: boolean;
  isAdjustment?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isRefunded?: boolean;
  isPending?: boolean;
  searchTerm?: string;
  reference?: string;
  gatewayTransactionId?: string;
}

/**
 * Transaction statistics
 */
export interface TransactionStatistics {
  paymentId: ID;
  totalTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
  refundedTransactions: number;
  pendingTransactions: number;
  byType: Record<TransactionTypeType, number>;
  byCategory: Record<TransactionCategory, number>;
  byDirection: Record<TransactionDirection, number>;
  byStatus: Record<TransactionStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  paymentAmount: number;
  refundAmount: number;
  adjustmentAmount: number;
  mostFrequentType: TransactionTypeType;
  mostFrequentCategory: TransactionCategory;
  mostFrequentStatus: TransactionStatusType;
}

/**
 * Transaction summary
 */
export interface TransactionSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTransactions: number;
  completed: number;
  failed: number;
  refunded: number;
  pending: number;
  byType: Record<TransactionTypeType, number>;
  byCategory: Record<TransactionCategory, number>;
  byDirection: Record<TransactionDirection, number>;
  byStatus: Record<TransactionStatusType, number>;
  transactionTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: TransactionTypeType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: TransactionCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: TransactionStatusType;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    paymentTotal: number;
    refundTotal: number;
    adjustmentTotal: number;
    netTotal: number;
  };
}

/**
 * Transaction configuration
 */
export interface TransactionConfiguration {
  enabled: boolean;
  defaultType: TransactionTypeType;
  defaultCategory: TransactionCategory;
  defaultDirection: TransactionDirection;
  requireReference: boolean;
  requireDescription: boolean;
  autoComplete: boolean;
  refundWindowDays: number;
  maxRefundPercentage: number;
  maxRefundAmount: number;
  notificationOnCreate: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  alertConfig?: TransactionAlertConfig;
}

/**
 * Transaction alert configuration
 */
export interface TransactionAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  refundAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  suspiciousActivityAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Transaction history
 */
export interface TransactionHistory extends BaseEntity, Timestamp {
  id: ID;
  transactionId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'update' | 'complete' | 'fail' | 'refund' | 'cancel';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Transaction validation
 */
export interface TransactionValidation {
  isValid: boolean;
  transactionId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Transaction refund
 */
export interface TransactionRefund extends BaseEntity, Timestamp {
  id: ID;
  transactionId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  amount: number;
  currency: string;
  reason: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  gatewayReference?: string;
  metadata?: Metadata;
}

/**
 * Transaction export
 */
export interface TransactionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: TransactionFilter;
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
  // Transaction Type
  TRANSACTION_TYPE,
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  TransactionDefault,
  transactiontypeGetTypeLabel,
  transactiontypeGetCategoryLabel,
  transactiontypeGetDirectionLabel,
  transactiontypeIsPayment,
  transactiontypeIsRefund,
  transactiontypeIsAdjustment,
  transactiontypeGetDefaultType,
  // Transaction Status
  TRANSACTION_STATUS,
  TransactionStatusType,
  TransactionStatusColor,
  TransactionStatusCategory,
  TransactionStatusOrder,
  TransactionStatusTransition,
  transactionstatusGetStatusLabel,
  transactionstatusGetStatusColor,
  transactionstatusGetStatusCategory,
  transactionstatusIsCompleted,
  transactionstatusIsFailed,
  transactionstatusIsRefunded,
  transactionstatusIsPending,
  transactionstatusCanTransition,
};
