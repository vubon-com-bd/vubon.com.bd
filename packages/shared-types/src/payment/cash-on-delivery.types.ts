/**
 * Cash on Delivery Types
 * Type definitions for Cash on Delivery (COD) payments based on shared-constants
 * @module CashOnDeliveryTypes
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
// Cash on Delivery Extended Types
// ============================================================

/**
 * COD payment
 */
export interface CashOnDeliveryPayment extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  amount: number;
  currency: string;
  status:
    | 'pending'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'refunded'
    | 'collected'
    | 'uncollected';
  collectedAt?: Date;
  collectedBy?: ID;
  collectionMethod: 'hand_over' | 'courier' | 'agent' | 'store_pickup' | 'others';
  failureReason?: string;
  refundedAt?: Date;
  metadata?: Metadata;
}

/**
 * COD payment filter
 */
export interface CashOnDeliveryFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  statuses?: (
    | 'pending'
    | 'processing'
    | 'completed'
    | 'failed'
    | 'cancelled'
    | 'refunded'
    | 'collected'
    | 'uncollected'
  )[];
  collectionMethods?: ('hand_over' | 'courier' | 'agent' | 'store_pickup' | 'others')[];
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
  isCollected?: boolean;
  isUncollected?: boolean;
  searchTerm?: string;
  collectedBy?: ID;
}

/**
 * COD payment statistics
 */
export interface CashOnDeliveryStatistics {
  userId: ID;
  totalPayments: number;
  pendingPayments: number;
  processingPayments: number;
  completedPayments: number;
  failedPayments: number;
  cancelledPayments: number;
  refundedPayments: number;
  collectedPayments: number;
  uncollectedPayments: number;
  byStatus: Record<string, number>;
  byCollectionMethod: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  collectionRate: number;
  uncollectionRate: number;
  averageCollectionTime: number;
  maxCollectionTime: number;
  minCollectionTime: number;
  mostFrequentStatus: string;
  mostFrequentCollectionMethod: string;
}

/**
 * COD payment summary
 */
export interface CashOnDeliverySummary {
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
  collected: number;
  uncollected: number;
  byStatus: Record<string, number>;
  byCollectionMethod: Record<string, number>;
  paymentTrend: {
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
  topCollectionMethods: {
    method: string;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
    totalCollectedAmount: number;
    totalUncollectedAmount: number;
    totalFailedAmount: number;
    totalRefundedAmount: number;
  };
}

/**
 * COD payment configuration
 */
export interface CashOnDeliveryConfiguration {
  enabled: boolean;
  allowedCountries: string[];
  allowedZones: string[];
  minOrderAmount: number;
  maxOrderAmount: number;
  collectionTimeHours: number;
  autoCancelHours: number;
  allowRefund: boolean;
  refundWindowDays: number;
  requireCollectionConfirmation: boolean;
  allowPartialCollection: boolean;
  collectionMethods: ('hand_over' | 'courier' | 'agent' | 'store_pickup' | 'others')[];
  notificationOnCreate: boolean;
  notificationOnProcessing: boolean;
  notificationOnCompletion: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  notificationOnCollection: boolean;
  notificationOnUncollection: boolean;
  alertConfig?: CashOnDeliveryAlertConfig;
}

/**
 * COD payment alert configuration
 */
export interface CashOnDeliveryAlertConfig {
  enabled: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  failureAlert: boolean;
  uncollectionAlert: boolean;
  cancellationAlert: boolean;
  refundAlert: boolean;
  collectionDelayAlert: boolean;
  collectionDelayThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * COD payment history
 */
export interface CashOnDeliveryHistory extends BaseEntity, Timestamp {
  id: ID;
  codPaymentId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action:
    | 'create'
    | 'process'
    | 'complete'
    | 'fail'
    | 'cancel'
    | 'refund'
    | 'collect'
    | 'uncollect'
    | 'update';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * COD payment validation
 */
export interface CashOnDeliveryValidation {
  isValid: boolean;
  codPaymentId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * COD payment export
 */
export interface CashOnDeliveryExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: CashOnDeliveryFilter;
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
