/**
 * Mobile Banking Types
 * Type definitions for mobile banking payments based on shared-constants
 * @module MobileBankingTypes
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
// Mobile Banking Extended Types
// ============================================================

/**
 * Mobile banking account
 */
export interface MobileBankingAccount extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  provider: 'bKash' | 'Nagad' | 'Rocket' | 'SureCash' | 'Upay' | 'Tap' | 'others';
  accountNumber: string;
  accountHolderName: string;
  phoneNumber: string;
  isVerified: boolean;
  isPrimary: boolean;
  metadata?: Metadata;
}

/**
 * Mobile banking transaction
 */
export interface MobileBankingTransaction extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  fromAccountId: ID;
  toAccountId: ID;
  provider: 'bKash' | 'Nagad' | 'Rocket' | 'SureCash' | 'Upay' | 'Tap' | 'others';
  amount: number;
  currency: string;
  reference: string;
  transactionType: 'send_money' | 'payment' | 'cash_out' | 'cash_in' | 'merchant_payment';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'reversed';
  transactionId?: string;
  gatewayReference?: string;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  metadata?: Metadata;
}

/**
 * Mobile banking filter
 */
export interface MobileBankingFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  fromAccountIds?: ID[];
  toAccountIds?: ID[];
  providers?: ('bKash' | 'Nagad' | 'Rocket' | 'SureCash' | 'Upay' | 'Tap' | 'others')[];
  statuses?: ('pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'reversed')[];
  transactionTypes?: ('send_money' | 'payment' | 'cash_out' | 'cash_in' | 'merchant_payment')[];
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
 * Mobile banking statistics
 */
export interface MobileBankingStatistics {
  userId: ID;
  totalTransactions: number;
  pendingTransactions: number;
  processingTransactions: number;
  completedTransactions: number;
  failedTransactions: number;
  cancelledTransactions: number;
  reversedTransactions: number;
  byProvider: Record<string, number>;
  byStatus: Record<string, number>;
  byTransactionType: Record<string, number>;
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
  mostFrequentProvider: string;
  mostFrequentStatus: string;
  mostFrequentTransactionType: string;
}

/**
 * Mobile banking summary
 */
export interface MobileBankingSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalTransactions: number;
  pending: number;
  processing: number;
  completed: number;
  failed: number;
  cancelled: number;
  reversed: number;
  byProvider: Record<string, number>;
  byStatus: Record<string, number>;
  byTransactionType: Record<string, number>;
  transactionTrend: {
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
  topTransactionTypes: {
    type: string;
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
 * Mobile banking configuration
 */
export interface MobileBankingConfiguration {
  enabled: boolean;
  supportedProviders: ('bKash' | 'Nagad' | 'Rocket' | 'SureCash' | 'Upay' | 'Tap' | 'others')[];
  requireAccountVerification: boolean;
  requireApproval: boolean;
  processingTimeMinutes: number;
  maxTransactionAmount: number;
  minTransactionAmount: number;
  dailyTransactionLimit: number;
  monthlyTransactionLimit: number;
  allowMerchantPayment: boolean;
  allowSendMoney: boolean;
  allowCashOut: boolean;
  allowCashIn: boolean;
  notificationOnCreate: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  alertConfig?: MobileBankingAlertConfig;
}

/**
 * Mobile banking alert configuration
 */
export interface MobileBankingAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  failureAlert: boolean;
  suspiciousTransactionAlert: boolean;
  dailyLimitAlert: boolean;
  monthlyLimitAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Mobile banking history
 */
export interface MobileBankingHistory extends BaseEntity, Timestamp {
  id: ID;
  transactionId: ID;
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
 * Mobile banking validation
 */
export interface MobileBankingValidation {
  isValid: boolean;
  transactionId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Mobile banking export
 */
export interface MobileBankingExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: MobileBankingFilter;
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
