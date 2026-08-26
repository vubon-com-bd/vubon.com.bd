/**
 * Crypto Payment Types
 * Type definitions for cryptocurrency payments based on shared-constants
 * @module CryptoPaymentTypes
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
// Crypto Payment Extended Types
// ============================================================

/**
 * Crypto currency
 */
export interface CryptoCurrency extends BaseEntity, Timestamp {
  id: ID;
  code: string;
  name: string;
  symbol: string;
  network:
    | 'bitcoin'
    | 'ethereum'
    | 'binance_smart_chain'
    | 'polygon'
    | 'solana'
    | 'ripple'
    | 'litecoin'
    | 'others';
  decimalPlaces: number;
  isActive: boolean;
  minTransactionAmount: number;
  maxTransactionAmount: number;
  confirmationRequired: number;
  metadata?: Metadata;
}

/**
 * Crypto payment
 */
export interface CryptoPayment extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  cryptoId: ID;
  fromAddress: string;
  toAddress: string;
  amount: number;
  currency: string;
  cryptoAmount: number;
  cryptoCurrency: string;
  exchangeRate: number;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'expired';
  transactionHash?: string;
  blockNumber?: number;
  confirmations: number;
  requiredConfirmations: number;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  refundedAt?: Date;
  expiredAt?: Date;
  metadata?: Metadata;
}

/**
 * Crypto payment filter
 */
export interface CryptoPaymentFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  cryptoIds?: ID[];
  cryptoCurrencies?: string[];
  statuses?: (
    'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'expired'
  )[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  minCryptoAmount?: number;
  maxCryptoAmount?: number;
  minConfirmations?: number;
  maxConfirmations?: number;
  isPending?: boolean;
  isProcessing?: boolean;
  isCompleted?: boolean;
  isFailed?: boolean;
  isCancelled?: boolean;
  isRefunded?: boolean;
  isExpired?: boolean;
  searchTerm?: string;
  transactionHash?: string;
}

/**
 * Crypto payment statistics
 */
export interface CryptoPaymentStatistics {
  userId: ID;
  totalPayments: number;
  pendingPayments: number;
  processingPayments: number;
  completedPayments: number;
  failedPayments: number;
  cancelledPayments: number;
  refundedPayments: number;
  expiredPayments: number;
  byCryptoCurrency: Record<string, number>;
  byNetwork: Record<string, number>;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  totalCryptoAmount: number;
  averageCryptoAmount: number;
  maxCryptoAmount: number;
  minCryptoAmount: number;
  averageConfirmationTime: number;
  maxConfirmationTime: number;
  minConfirmationTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentCryptoCurrency: string;
  mostFrequentNetwork: string;
  mostFrequentStatus: string;
}

/**
 * Crypto payment summary
 */
export interface CryptoPaymentSummary {
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
  expired: number;
  byCryptoCurrency: Record<string, number>;
  byNetwork: Record<string, number>;
  byStatus: Record<string, number>;
  paymentTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topCryptoCurrencies: {
    currency: string;
    count: number;
    label: string;
  }[];
  topNetworks: {
    network: string;
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
    totalCryptoAmount: number;
    averageCryptoAmount: number;
    maxCryptoAmount: number;
    minCryptoAmount: number;
    totalCompletedAmount: number;
    totalFailedAmount: number;
    totalRefundedAmount: number;
  };
}

/**
 * Crypto payment configuration
 */
export interface CryptoPaymentConfiguration {
  enabled: boolean;
  supportedCryptos: string[];
  confirmationRequired: number;
  confirmationTimeoutMinutes: number;
  exchangeRateRefreshMinutes: number;
  minPaymentAmount: number;
  maxPaymentAmount: number;
  minCryptoAmount: number;
  maxCryptoAmount: number;
  dailyPaymentLimit: number;
  monthlyPaymentLimit: number;
  allowRefund: boolean;
  refundWindowDays: number;
  requireAddressVerification: boolean;
  autoComplete: boolean;
  notificationOnCreate: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: CryptoPaymentAlertConfig;
}

/**
 * Crypto payment alert configuration
 */
export interface CryptoPaymentAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  failureAlert: boolean;
  suspiciousPaymentAlert: boolean;
  dailyLimitAlert: boolean;
  monthlyLimitAlert: boolean;
  refundAlert: boolean;
  expiryAlert: boolean;
  exchangeRateAlert: boolean;
  exchangeRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Crypto payment history
 */
export interface CryptoPaymentHistory extends BaseEntity, Timestamp {
  id: ID;
  cryptoPaymentId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'process' | 'complete' | 'fail' | 'cancel' | 'refund' | 'expire' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Crypto payment validation
 */
export interface CryptoPaymentValidation {
  isValid: boolean;
  cryptoPaymentId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Crypto payment export
 */
export interface CryptoPaymentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CryptoPaymentFilter;
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
