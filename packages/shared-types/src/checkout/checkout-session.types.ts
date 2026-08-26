/**
 * Checkout Session Types
 * Type definitions for checkout sessions based on shared-constants
 * @module CheckoutSessionTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Checkout Core
  CheckoutType,
  CheckoutMode,
  CheckoutStep,
  CheckoutDefault,
  CheckoutLimit,
  // Checkout Status
  CheckoutStatusType,
  CheckoutStatusColor,
  CheckoutStatusCategory,
  // Checkout Step
  CheckoutStepType,
  CheckoutStepStatus,
  CheckoutStepPosition,
  // Payment Method
  PaymentMethodType,
  PaymentMethodCategory,
  PaymentMethodStatus,
  // Payment Status
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  // Payment Gateway
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
  TransactionStatusColor,
  TransactionStatusCategory,
  // Delivery Method
  DeliveryMethodType,
  DeliveryCategory,
  DeliveryMethodStatus,
  // Delivery Status
  DeliveryStatusType,
  DeliveryStatusColor,
  DeliveryStatusCategory,
  // Order Status
  OrderStatusType,
  OrderStatusColor,
  OrderStatusCategory,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
  // Checkout Error
  CheckoutErrorCode,
  CheckoutErrorSeverity,
  CheckoutErrorSource,
  // Payment Error
  PaymentErrorCode,
  PaymentErrorSeverity,
  PaymentErrorCategory,
} from '@vubon/shared-constants';

// ============================================================
// Checkout Session Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

// Note: CheckoutSession is defined in checkout.types.ts

/**
 * Checkout session filter
 */
export interface CheckoutSessionFilter {
  userIds?: ID[];
  types?: CheckoutType[];
  modes?: CheckoutMode[];
  statuses?: CheckoutStatusType[];
  steps?: CheckoutStepType[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCompleted?: boolean;
  isGuest?: boolean;
  isRegistered?: boolean;
  isExpress?: boolean;
  expiresBefore?: Date;
  expiresAfter?: Date;
  searchTerm?: string;
}

/**
 * Checkout session statistics
 */
export interface CheckoutSessionStatistics {
  totalSessions: number;
  activeSessions: number;
  completedSessions: number;
  expiredSessions: number;
  byType: Record<CheckoutType, number>;
  byMode: Record<CheckoutMode, number>;
  byStatus: Record<CheckoutStatusType, number>;
  byStep: Record<CheckoutStepType, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageSessionDuration: number;
  averageCompletionTime: number;
  conversionRate: number;
  abandonmentRate: number;
  mostFrequentType: CheckoutType;
  mostFrequentStep: CheckoutStepType;
}

/**
 * Checkout session summary
 */
export interface CheckoutSessionSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  active: number;
  completed: number;
  expired: number;
  byType: Record<CheckoutType, number>;
  byMode: Record<CheckoutMode, number>;
  byStatus: Record<CheckoutStatusType, number>;
  byStep: Record<CheckoutStepType, number>;
  sessionTrend: {
    date: Date;
    total: number;
    active: number;
    completed: number;
  }[];
  topTypes: {
    type: CheckoutType;
    count: number;
    label: string;
  }[];
  topSteps: {
    step: CheckoutStepType;
    count: number;
    label: string;
  }[];
}

/**
 * Checkout session configuration
 */
export interface CheckoutSessionConfiguration {
  enabled: boolean;
  defaultType: CheckoutType;
  defaultMode: CheckoutMode;
  defaultCurrency: string;
  sessionTimeout: number;
  allowGuestCheckout: boolean;
  allowExpressCheckout: boolean;
  requireShipping: boolean;
  requireBilling: boolean;
  requirePayment: boolean;
  autoExpire: boolean;
  expireAfterMinutes: number;
  notificationOnComplete: boolean;
  notificationOnAbandon: boolean;
  notificationOnExpire: boolean;
  alertConfig?: CheckoutSessionAlertConfig;
}

/**
 * Checkout session alert configuration
 */
export interface CheckoutSessionAlertConfig {
  enabled: boolean;
  abandonmentAlert: boolean;
  abandonmentThreshold: number;
  sessionTimeoutAlert: boolean;
  sessionExpiryAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Checkout session history
 */
export interface CheckoutSessionHistory extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  action: 'create' | 'update' | 'step_change' | 'complete' | 'abandon' | 'expire' | 'extend';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Checkout session step
 */
export interface CheckoutSessionStep extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  step: CheckoutStepType;
  status: CheckoutStepStatus;
  position: CheckoutStepPosition;
  enteredAt: Date;
  completedAt?: Date;
  duration?: number;
  metadata?: Metadata;
}

/**
 * Checkout session payment
 */
export interface CheckoutSessionPayment extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  method: PaymentMethodType;
  gateway: PaymentGatewayType;
  status: PaymentStatusType;
  amount: number;
  currency: string;
  transactionId?: string;
  gatewayReference?: string;
  metadata?: Metadata;
}

/**
 * Checkout session shipping
 */
export interface CheckoutSessionShipping extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  address: Address;
  method: DeliveryMethodType;
  status: DeliveryStatusType;
  trackingNumber?: string;
  estimatedDelivery?: Date;
  metadata?: Metadata;
}

/**
 * Checkout session order
 */
export interface CheckoutSessionOrder extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  orderType: OrderTypeType;
  orderStatus: OrderStatusType;
  orderNumber: string;
  items: CheckoutSessionItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  metadata?: Metadata;
}

/**
 * Checkout session item
 */
export interface CheckoutSessionItem extends BaseEntity, Timestamp {
  id: ID;
  sessionId: ID;
  userId: ID;
  productId: ID;
  variantId?: ID;
  quantity: number;
  price: number;
  total: number;
  currency: string;
  metadata?: Metadata;
}

/**
 * Checkout session export
 */
export interface CheckoutSessionExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: CheckoutSessionFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Checkout session validation
 */
export interface CheckoutSessionValidation {
  isValid: boolean;
  sessionId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Checkout Core
  CheckoutType,
  CheckoutMode,
  CheckoutStep,
  CheckoutDefault,
  CheckoutLimit,
  // Checkout Status
  CheckoutStatusType,
  CheckoutStatusColor,
  CheckoutStatusCategory,
  // Checkout Step
  CheckoutStepType,
  CheckoutStepStatus,
  CheckoutStepPosition,
  // Payment Method
  PaymentMethodType,
  PaymentMethodCategory,
  PaymentMethodStatus,
  // Payment Status
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  // Payment Gateway
  PaymentGatewayType,
  PaymentGatewayCategory,
  PaymentGatewayStatus,
  // Transaction Type
  TransactionTypeType,
  TransactionCategory,
  TransactionDirection,
  // Transaction Status
  TransactionStatusType,
  TransactionStatusColor,
  TransactionStatusCategory,
  // Delivery Method
  DeliveryMethodType,
  DeliveryCategory,
  DeliveryMethodStatus,
  // Delivery Status
  DeliveryStatusType,
  DeliveryStatusColor,
  DeliveryStatusCategory,
  // Order Status
  OrderStatusType,
  OrderStatusColor,
  OrderStatusCategory,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
  // Checkout Error
  CheckoutErrorCode,
  CheckoutErrorSeverity,
  CheckoutErrorSource,
  // Payment Error
  PaymentErrorCode,
  PaymentErrorSeverity,
  PaymentErrorCategory,
};
