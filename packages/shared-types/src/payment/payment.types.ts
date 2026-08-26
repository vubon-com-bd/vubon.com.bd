/**
 * Payment Types
 * Type definitions for payment module based on shared-constants
 * @module PaymentTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Currency } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Method
  PAYMENT_METHOD,
  PaymentMethodType,
  PaymentMethodCategory,
  PaymentMethodStatus,
  PaymentMethodIcon,
  PaymentMethodDefault,
  PaymentMethodLimit,
  paymentmethodGetMethodLabel,
  paymentmethodGetCategoryLabel,
  paymentmethodGetStatusLabel,
  paymentmethodGetMethodIcon,
  paymentmethodIsCardMethod,
  paymentmethodIsMobileMethod,
  paymentmethodIsCashMethod,
  paymentmethodIsOnlineMethod,
  paymentmethodGetDefaultMethod,
  paymentmethodIsActive,
  // Payment Status
  PAYMENT_STATUS,
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  PaymentStatusOrder,
  PaymentStatusTransition,
  paymentstatusGetStatusLabel,
  paymentstatusGetStatusColor,
  paymentstatusGetStatusCategory,
  paymentstatusIsCompleted,
  paymentstatusIsFailed,
  paymentstatusIsRefunded,
  paymentstatusIsPending,
  paymentstatusCanTransition,
  // Payment Gateway
  PAYMENT_GATEWAY,
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  PaymentGatewayCurrency,
  PaymentGatewayFee,
  PaymentGatewayDefault,
  PaymentGatewayLimit,
  paymentgatewayGetGatewayLabel,
  paymentgatewayGetCategoryLabel,
  paymentgatewayGetStatusLabel,
  paymentgatewayGetCurrencyLabel,
  paymentgatewayGetFee,
  paymentgatewayIsActive,
  paymentgatewayIsMaintenance,
  paymentgatewayGetDefaultGateway,
  paymentgatewayGetDefaultCurrency,
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
  // Payment Error
  PAYMENT_ERROR,
  PAYMENT_ERROR_MESSAGES,
  PaymentErrorCode,
  PaymentErrorSeverity,
  PaymentErrorCategory,
  PaymentErrorDefault,
  paymenterrorGetMessage,
  paymenterrorGetSeverityLabel,
  paymenterrorGetCategoryLabel,
  paymenterrorIsCardError,
  paymenterrorIsAuthError,
  paymenterrorIsGatewayError,
  paymenterrorIsRetryable,
  paymenterrorIsActionable,
  paymenterrorGetDefaultSeverity,
} from '@vubon/shared-constants';

// ============================================================
// Payment Extended Types
// ============================================================

/**
 * Payment method
 */
export interface PaymentMethod extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: PaymentMethodType;
  category: PaymentMethodCategory;
  status: PaymentMethodStatus;
  isActive: boolean;
  isCard: boolean;
  isMobile: boolean;
  isCash: boolean;
  isOnline: boolean;
  label: string;
  icon?: string;
  config?: Record<string, unknown>;
  metadata?: Metadata;
}

/**
 * Payment
 */
export interface Payment extends BaseEntity, Timestamp {
  id: ID;
  orderId: ID;
  userId: ID;
  method: PaymentMethodType;
  gateway: PaymentGatewayType;
  status: PaymentStatusType;
  amount: number;
  currency: Currency;
  transactionId?: string;
  gatewayReference?: string;
  isCompleted: boolean;
  isFailed: boolean;
  isRefunded: boolean;
  isPending: boolean;
  metadata?: Metadata;
}

/**
 * Payment gateway
 */
export interface PaymentGateway extends BaseEntity, Timestamp {
  id: ID;
  type: PaymentGatewayType;
  category: PaymentGatewayCategory;
  status: PaymentGatewayStatus;
  name: string;
  code: string;
  isActive: boolean;
  isMaintenance: boolean;
  fee: number;
  feeType: 'fixed' | 'percentage';
  currency: PaymentGatewayCurrency;
  config: Record<string, unknown>;
  metadata?: Metadata;
}

/**
 * Transaction
 */
export interface Transaction extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  type: TransactionTypeType;
  category: TransactionCategory;
  direction: TransactionDirection;
  status: TransactionStatusType;
  amount: number;
  currency: Currency;
  reference?: string;
  description?: string;
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
 * Payment filter
 */
export interface PaymentFilter {
  orderIds?: ID[];
  userIds?: ID[];
  methods?: PaymentMethodType[];
  gateways?: PaymentGatewayType[];
  statuses?: PaymentStatusType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  minAmount?: number;
  maxAmount?: number;
  isCompleted?: boolean;
  isFailed?: boolean;
  isRefunded?: boolean;
  isPending?: boolean;
  searchTerm?: string;
}

/**
 * Payment statistics
 */
export interface PaymentStatistics {
  orderId: ID;
  totalPayments: number;
  completedPayments: number;
  failedPayments: number;
  refundedPayments: number;
  pendingPayments: number;
  byMethod: Record<PaymentMethodType, number>;
  byGateway: Record<PaymentGatewayType, number>;
  byStatus: Record<PaymentStatusType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  totalAmount: number;
  averageAmount: number;
  maxAmount: number;
  minAmount: number;
  mostFrequentMethod: PaymentMethodType;
  mostFrequentGateway: PaymentGatewayType;
  mostFrequentStatus: PaymentStatusType;
}

/**
 * Payment summary
 */
export interface PaymentSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalPayments: number;
  completed: number;
  failed: number;
  refunded: number;
  pending: number;
  byMethod: Record<PaymentMethodType, number>;
  byGateway: Record<PaymentGatewayType, number>;
  byStatus: Record<PaymentStatusType, number>;
  paymentTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
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
  topStatuses: {
    status: PaymentStatusType;
    count: number;
    label: string;
  }[];
  financialSummary: {
    totalAmount: number;
    averageAmount: number;
    maxAmount: number;
    minAmount: number;
  };
}

/**
 * Payment configuration
 */
export interface PaymentConfiguration {
  enabled: boolean;
  defaultMethod: PaymentMethodType;
  defaultGateway: PaymentGatewayType;
  defaultCurrency: Currency;
  allowMultipleMethods: boolean;
  requireVerification: boolean;
  requireConfirmation: boolean;
  autoCapture: boolean;
  captureDelayHours: number;
  refundWindowDays: number;
  notificationOnSuccess: boolean;
  notificationOnFailure: boolean;
  notificationOnRefund: boolean;
  alertConfig?: PaymentAlertConfig;
}

/**
 * Payment alert configuration
 */
export interface PaymentAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  fraudAlert: boolean;
  refundAlert: boolean;
  highValueAlert: boolean;
  highValueThreshold: number;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Payment history
 */
export interface PaymentHistory extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'update' | 'capture' | 'refund' | 'cancel' | 'fail' | 'complete';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Payment validation
 */
export interface PaymentValidation {
  isValid: boolean;
  paymentId: ID;
  orderId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Payment refund
 */
export interface PaymentRefund extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  amount: number;
  currency: Currency;
  reason: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  transactionId?: string;
  gatewayReference?: string;
  metadata?: Metadata;
}

/**
 * Payment export
 */
export interface PaymentExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PaymentFilter;
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
  // Payment Method
  PAYMENT_METHOD,
  PaymentMethodType,
  PaymentMethodCategory,
  PaymentMethodStatus,
  PaymentMethodIcon,
  PaymentMethodDefault,
  PaymentMethodLimit,
  paymentmethodGetMethodLabel,
  paymentmethodGetCategoryLabel,
  paymentmethodGetStatusLabel,
  paymentmethodGetMethodIcon,
  paymentmethodIsCardMethod,
  paymentmethodIsMobileMethod,
  paymentmethodIsCashMethod,
  paymentmethodIsOnlineMethod,
  paymentmethodGetDefaultMethod,
  paymentmethodIsActive,
  // Payment Status
  PAYMENT_STATUS,
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  PaymentStatusOrder,
  PaymentStatusTransition,
  paymentstatusGetStatusLabel,
  paymentstatusGetStatusColor,
  paymentstatusGetStatusCategory,
  paymentstatusIsCompleted,
  paymentstatusIsFailed,
  paymentstatusIsRefunded,
  paymentstatusIsPending,
  paymentstatusCanTransition,
  // Payment Gateway
  PAYMENT_GATEWAY,
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  PaymentGatewayCurrency,
  PaymentGatewayFee,
  PaymentGatewayDefault,
  PaymentGatewayLimit,
  paymentgatewayGetGatewayLabel,
  paymentgatewayGetCategoryLabel,
  paymentgatewayGetStatusLabel,
  paymentgatewayGetCurrencyLabel,
  paymentgatewayGetFee,
  paymentgatewayIsActive,
  paymentgatewayIsMaintenance,
  paymentgatewayGetDefaultGateway,
  paymentgatewayGetDefaultCurrency,
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
  // Payment Error
  PAYMENT_ERROR,
  PAYMENT_ERROR_MESSAGES,
  PaymentErrorCode,
  PaymentErrorSeverity,
  PaymentErrorCategory,
  PaymentErrorDefault,
  paymenterrorGetMessage,
  paymenterrorGetSeverityLabel,
  paymenterrorGetCategoryLabel,
  paymenterrorIsCardError,
  paymenterrorIsAuthError,
  paymenterrorIsGatewayError,
  paymenterrorIsRetryable,
  paymenterrorIsActionable,
  paymenterrorGetDefaultSeverity,
};
