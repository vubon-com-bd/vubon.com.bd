/**
 * Bank Transfer Types
 * Type definitions for bank transfer payments based on shared-constants
 * @module BankTransferTypes
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
// Bank Transfer Extended Types
// ============================================================

/**
 * Bank account
 */
export interface BankAccount extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  bankName: string;
  bankCode: string;
  branchName: string;
  branchCode?: string;
  accountNumber: string;
  accountType: 'savings' | 'current' | 'checking' | 'business';
  accountHolderName: string;
  routingNumber?: string;
  swiftCode?: string;
  iban?: string;
  isPrimary: boolean;
  isVerified: boolean;
  metadata?: Metadata;
}

/**
 * Bank transfer
 */
export interface BankTransfer extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  fromAccountId: ID;
  toAccountId: ID;
  amount: number;
  currency: string;
  reference: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'reversed';
  transactionId?: string;
  gatewayReference?: string;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  reversalReason?: string;
  metadata?: Metadata;
}

/**
 * Bank transfer filter
 */
export interface BankTransferFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  fromAccountIds?: ID[];
  toAccountIds?: ID[];
  statuses?: ('pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'reversed')[];
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
  isReversed?: boolean;
  searchTerm?: string;
  reference?: string;
}

/**
 * Bank transfer statistics
 */
export interface BankTransferStatistics {
  userId: ID;
  totalTransfers: number;
  pendingTransfers: number;
  processingTransfers: number;
  completedTransfers: number;
  failedTransfers: number;
  cancelledTransfers: number;
  reversedTransfers: number;
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
  mostFrequentStatus: string;
  mostFrequentBank: string;
}

/**
 * Bank transfer summary
 */
export interface BankTransferSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTransfers: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  cancelled: number;
  reversed: number;
  byStatus: Record<string, number>;
  transferTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
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
  };
}

/**
 * Bank transfer configuration
 */
export interface BankTransferConfiguration {
  enabled: boolean;
  requireAccountVerification: boolean;
  requireApproval: boolean;
  processingTimeHours: number;
  maxTransferAmount: number;
  minTransferAmount: number;
  dailyTransferLimit: number;
  monthlyTransferLimit: number;
  allowInternational: boolean;
  allowDomestic: boolean;
  notificationOnCreate: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  alertConfig?: BankTransferAlertConfig;
}

/**
 * Bank transfer alert configuration
 */
export interface BankTransferAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  failureAlert: boolean;
  suspiciousTransferAlert: boolean;
  dailyLimitAlert: boolean;
  monthlyLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Bank transfer history
 */
export interface BankTransferHistory extends BaseEntity, Timestamp {
  id: ID;
  transferId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'process' | 'complete' | 'fail' | 'cancel' | 'reverse' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Bank transfer validation
 */
export interface BankTransferValidation {
  isValid: boolean;
  transferId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Bank transfer export
 */
export interface BankTransferExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: BankTransferFilter;
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
