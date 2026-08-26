/**
 * Card Payment Types
 * Type definitions for card payments based on shared-constants
 * @module CardPaymentTypes
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
// Card Payment Extended Types
// ============================================================

/**
 * Card payment
 */
export interface CardPayment extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: number;
  expiryYear: number;
  cardType: 'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'unionpay' | 'diners' | 'others';
  lastFourDigits: string;
  amount: number;
  currency: string;
  status:
    'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'charged_back';
  transactionId?: string;
  gatewayReference?: string;
  authCode?: string;
  completedAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  refundedAt?: Date;
  chargedBackAt?: Date;
  metadata?: Metadata;
}

/**
 * Card payment filter
 */
export interface CardPaymentFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  cardTypes?: (
    'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'unionpay' | 'diners' | 'others'
  )[];
  statuses?: (
    'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded' | 'charged_back'
  )[];
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
  isChargedBack?: boolean;
  searchTerm?: string;
  lastFourDigits?: string;
}

/**
 * Card payment statistics
 */
export interface CardPaymentStatistics {
  userId: ID;
  totalPayments: number;
  pendingPayments: number;
  processingPayments: number;
  completedPayments: number;
  failedPayments: number;
  cancelledPayments: number;
  refundedPayments: number;
  chargedBackPayments: number;
  byCardType: Record<string, number>;
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
  chargebackRate: number;
  mostFrequentCardType: string;
  mostFrequentStatus: string;
}

/**
 * Card payment summary
 */
export interface CardPaymentSummary {
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
  chargedBack: number;
  byCardType: Record<string, number>;
  byStatus: Record<string, number>;
  paymentTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topCardTypes: {
    cardType: string;
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
    totalChargedBackAmount: number;
  };
}

/**
 * Card payment configuration
 */
export interface CardPaymentConfiguration {
  enabled: boolean;
  supportedCardTypes: (
    'visa' | 'mastercard' | 'amex' | 'discover' | 'jcb' | 'unionpay' | 'diners' | 'others'
  )[];
  requireCVV: boolean;
  requireAddress: boolean;
  requirePostalCode: boolean;
  allowSaveCard: boolean;
  allowMultipleCards: boolean;
  maxCardsPerUser: number;
  processingTimeMinutes: number;
  maxPaymentAmount: number;
  minPaymentAmount: number;
  dailyPaymentLimit: number;
  monthlyPaymentLimit: number;
  enable3DS: boolean;
  enableAVS: boolean;
  enableCVVCheck: boolean;
  notificationOnCreate: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  notificationOnChargeback: boolean;
  alertConfig?: CardPaymentAlertConfig;
}

/**
 * Card payment alert configuration
 */
export interface CardPaymentAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  failureAlert: boolean;
  suspiciousCardAlert: boolean;
  dailyLimitAlert: boolean;
  monthlyLimitAlert: boolean;
  chargebackAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Card payment history
 */
export interface CardPaymentHistory extends BaseEntity, Timestamp {
  id: ID;
  cardPaymentId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action:
    'create' | 'process' | 'complete' | 'fail' | 'cancel' | 'refund' | 'chargeback' | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Card payment validation
 */
export interface CardPaymentValidation {
  isValid: boolean;
  cardPaymentId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Card payment export
 */
export interface CardPaymentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CardPaymentFilter;
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
