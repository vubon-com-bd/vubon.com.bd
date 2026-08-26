/**
 * Payment Recurring Types
 * Type definitions for recurring payments based on shared-constants
 * @module PaymentRecurringTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Status
  PaymentStatusType,
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
} from '@vubon/shared-constants';

// ============================================================
// Payment Recurring Extended Types
// ============================================================

/**
 * Recurring payment schedule
 */
export interface RecurringPaymentSchedule {
  frequency:
    'daily' | 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'semiannually' | 'annually';
  interval: number;
  dayOfWeek?: number;
  dayOfMonth?: number;
  weekOfMonth?: number;
  monthOfYear?: number;
  startDate: Date;
  endDate?: Date;
  nextPaymentDate: Date;
  lastPaymentDate?: Date;
  trialPeriodDays?: number;
  trialAmount?: number;
}

/**
 * Recurring payment
 */
export interface RecurringPayment extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  subscriptionId?: ID;
  orderId?: ID;
  method: PaymentMethodType;
  gateway: PaymentGatewayType;
  amount: number;
  currency: string;
  status: 'active' | 'paused' | 'cancelled' | 'expired' | 'failed' | 'pending';
  schedule: RecurringPaymentSchedule;
  totalCycles: number;
  completedCycles: number;
  failedCycles: number;
  nextRetryDate?: Date;
  maxRetries: number;
  retryCount: number;
  isActive: boolean;
  isPaused: boolean;
  isCancelled: boolean;
  isExpired: boolean;
  isFailed: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Recurring payment history
 */
export interface RecurringPaymentHistory extends BaseEntity, Timestamp {
  id: ID;
  recurringPaymentId: ID;
  userId: ID;
  cycleNumber: number;
  amount: number;
  currency: string;
  status: 'success' | 'failed' | 'pending' | 'skipped' | 'retry';
  transactionId?: string;
  gatewayReference?: string;
  errorMessage?: string;
  retryCount: number;
  metadata?: Metadata;
}

/**
 * Recurring payment filter
 */
export interface RecurringPaymentFilter {
  ids?: ID[];
  userIds?: ID[];
  subscriptionIds?: ID[];
  orderIds?: ID[];
  statuses?: ('active' | 'paused' | 'cancelled' | 'expired' | 'failed' | 'pending')[];
  methods?: PaymentMethodType[];
  gateways?: PaymentGatewayType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  isActive?: boolean;
  isPaused?: boolean;
  isCancelled?: boolean;
  isExpired?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  hasTrial?: boolean;
  searchTerm?: string;
}

/**
 * Recurring payment statistics
 */
export interface RecurringPaymentStatistics {
  userId: ID;
  totalRecurringPayments: number;
  activePayments: number;
  pausedPayments: number;
  cancelledPayments: number;
  expiredPayments: number;
  failedPayments: number;
  pendingPayments: number;
  byStatus: Record<string, number>;
  byMethod: Record<PaymentMethodType, number>;
  byGateway: Record<PaymentGatewayType, number>;
  byFrequency: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  totalCycles: number;
  completedCycles: number;
  failedCycles: number;
  successRate: number;
  failureRate: number;
  averageRetries: number;
  mostFrequentStatus: string;
  mostFrequentMethod: PaymentMethodType;
  mostFrequentGateway: PaymentGatewayType;
}

/**
 * Recurring payment summary
 */
export interface RecurringPaymentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPayments: number;
  active: number;
  paused: number;
  cancelled: number;
  expired: number;
  failed: number;
  pending: number;
  byStatus: Record<string, number>;
  byMethod: Record<PaymentMethodType, number>;
  byGateway: Record<PaymentGatewayType, number>;
  byFrequency: Record<string, number>;
  recurringTrend: {
    date: Date;
    total: number;
    active: number;
    failed: number;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: PaymentMethodType;
    count: number;
    label: string;
  }[];
  topGateways: {
    gateway: PaymentGatewayType;
    count: number;
    label: string;
  }[];
  topFrequencies: {
    frequency: string;
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
 * Recurring payment configuration
 */
export interface RecurringPaymentConfiguration {
  enabled: boolean;
  defaultMethod: PaymentMethodType;
  defaultGateway: PaymentGatewayType;
  maxRetries: number;
  retryDelayDays: number;
  trialPeriodDays: number;
  trialAmount: number;
  allowPause: boolean;
  allowCancel: boolean;
  requireConfirmation: boolean;
  autoRetry: boolean;
  retryStrategy: 'immediate' | 'daily' | 'weekly' | 'custom';
  notificationOnCreate: boolean;
  notificationOnPayment: boolean;
  notificationOnFailure: boolean;
  notificationOnPause: boolean;
  notificationOnCancel: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: RecurringPaymentAlertConfig;
}

/**
 * Recurring payment alert configuration
 */
export interface RecurringPaymentAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  retryAlert: boolean;
  expiryAlert: boolean;
  highFailureRateAlert: boolean;
  highFailureRateThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Recurring payment history
 */
export interface RecurringPaymentHistoryEntry extends BaseEntity, Timestamp {
  id: ID;
  recurringPaymentId: ID;
  userId: ID;
  action:
    | 'create'
    | 'update'
    | 'pause'
    | 'resume'
    | 'cancel'
    | 'expire'
    | 'payment_success'
    | 'payment_failure'
    | 'retry';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Recurring payment validation
 */
export interface RecurringPaymentValidation {
  isValid: boolean;
  recurringPaymentId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Recurring payment export
 */
export interface RecurringPaymentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: RecurringPaymentFilter;
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
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
};
