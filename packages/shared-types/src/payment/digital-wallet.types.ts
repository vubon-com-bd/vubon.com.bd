/**
 * Digital Wallet Types
 * Type definitions for digital wallet payments based on shared-constants
 * @module DigitalWalletTypes
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
// Digital Wallet Extended Types
// ============================================================

/**
 * Digital wallet account
 */
export interface DigitalWalletAccount extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  provider: 'google_pay' | 'apple_pay' | 'samsung_pay' | 'paypal' | 'stripe' | 'square' | 'others';
  walletId: string;
  email: string;
  isVerified: boolean;
  isPrimary: boolean;
  balance?: number;
  currency?: string;
  metadata?: Metadata;
}

/**
 * Digital wallet payment
 */
export interface DigitalWalletPayment extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  fromAccountId: ID;
  toAccountId: ID;
  provider: 'google_pay' | 'apple_pay' | 'samsung_pay' | 'paypal' | 'stripe' | 'square' | 'others';
  amount: number;
  currency: string;
  reference: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  transactionId?: string;
  gatewayReference?: string;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  refundedAt?: Date;
  metadata?: Metadata;
}

/**
 * Digital wallet filter
 */
export interface DigitalWalletFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  fromAccountIds?: ID[];
  toAccountIds?: ID[];
  providers?: (
    'google_pay' | 'apple_pay' | 'samsung_pay' | 'paypal' | 'stripe' | 'square' | 'others'
  )[];
  statuses?: ('pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  isPending?: boolean;
  isProcessing?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isCancelled?: boolean;
  isRefunded?: boolean;
  searchTerm?: string;
  reference?: string;
}

/**
 * Digital wallet statistics
 */
export interface DigitalWalletStatistics {
  userId: ID;
  totalPayments: number;
  pendingPayments: number;
  processingPayments: number;
  completedPayments: number;
  failedPayments: number;
  cancelledPayments: number;
  refundedPayments: number;
  byProvider: Record<string, number>;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  averageProcessingTime: number;
  maxProcessingTime: number;
  minProcessingTime: number;
  successRate: number;
  failureRate: number;
  refundRate: number;
  mostFrequentProvider: string;
  mostFrequentStatus: string;
}

/**
 * Digital wallet summary
 */
export interface DigitalWalletSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPayments: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  cancelled: number;
  refunded: number;
  byProvider: Record<string, number>;
  byStatus: Record<string, number>;
  paymentTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topProviders: {
    provider: string;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    totalCompletedAmount: number;
    totalFailedAmount: number;
    totalRefundedAmount: number;
  };
}

/**
 * Digital wallet configuration
 */
export interface DigitalWalletConfiguration {
  enabled: boolean;
  supportedProviders: (
    'google_pay' | 'apple_pay' | 'samsung_pay' | 'paypal' | 'stripe' | 'square' | 'others'
  )[];
  requireAccountVerification: boolean;
  requireApproval: boolean;
  processingTimeMinutes: number;
  maxPaymentAmount: number;
  minPaymentAmount: number;
  dailyPaymentLimit: number;
  monthlyPaymentLimit: number;
  allowRefund: boolean;
  refundWindowDays: number;
  notificationOnCreate: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  alertConfig?: DigitalWalletAlertConfig;
}

/**
 * Digital wallet alert configuration
 */
export interface DigitalWalletAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  failureAlert: boolean;
  suspiciousPaymentAlert: boolean;
  dailyLimitAlert: boolean;
  monthlyLimitAlert: boolean;
  refundAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Digital wallet history
 */
export interface DigitalWalletHistory extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'process' | 'complete' | 'fail' | 'cancel' | 'refund' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Digital wallet validation
 */
export interface DigitalWalletValidation {
  isValid: boolean;
  paymentId: ID;
  orderId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Digital wallet export
 */
export interface DigitalWalletExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: DigitalWalletFilter;
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
