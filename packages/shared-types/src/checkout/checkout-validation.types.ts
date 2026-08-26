/**
 * Checkout Validation Types
 * Type definitions for checkout validation based on shared-constants
 * @module CheckoutValidationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID, Address } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Checkout Core
  CheckoutType,
  CheckoutMode,
  CheckoutStepType,
  // Checkout Status
  CheckoutStatusType,
  // Payment Method
  PaymentMethodType,
  PaymentMethodStatus,
  // Payment Status
  PaymentStatusType,
  // Delivery Method
  DeliveryMethodType,
  DeliveryMethodStatus,
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
} from '@vubon/shared-constants';

// ============================================================
// Checkout Validation Types
// ============================================================

/**
 * Checkout validation rule
 */
export interface CheckoutValidationRule {
  id: string;
  name: string;
  description?: string;
  type: 'required' | 'format' | 'range' | 'custom' | 'condition';
  field: string;
  value?: unknown;
  message: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Checkout validation context
 */
export interface CheckoutValidationContext {
  checkoutId: ID;
  userId: ID;
  type: CheckoutType;
  mode: CheckoutMode;
  step: CheckoutStepType;
  status: CheckoutStatusType;
  data: {
    items?: CheckoutValidationItem[];
    payment?: CheckoutValidationPayment;
    shipping?: CheckoutValidationAddress;
    billing?: CheckoutValidationAddress;
    coupon?: CheckoutValidationCoupon;
  };
  metadata?: Metadata;
}

/**
 * Checkout validation item
 */
export interface CheckoutValidationItem {
  productId: ID;
  variantId?: ID;
  quantity: number;
  price: number;
  total: number;
  currency: string;
  metadata?: Metadata;
}

/**
 * Checkout validation payment
 */
export interface CheckoutValidationPayment {
  method: PaymentMethodType;
  status: PaymentMethodStatus;
  amount: number;
  currency: string;
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
  metadata?: Metadata;
}

/**
 * Checkout validation address
 */
export interface CheckoutValidationAddress extends Address {
  userId: ID;
  isVerified: boolean;
  metadata?: Metadata;
}

/**
 * Checkout validation coupon
 */
export interface CheckoutValidationCoupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  expiresAt?: Date;
  maxUses?: number;
  usedCount?: number;
  metadata?: Metadata;
}

/**
 * Checkout validation result
 */
export interface CheckoutValidationResult {
  isValid: boolean;
  checkoutId: ID;
  userId: ID;
  errors: CheckoutValidationError[];
  warnings: CheckoutValidationWarning[];
  suggestions: CheckoutValidationSuggestion[];
  metadata?: Metadata;
}

/**
 * Checkout validation error
 */
export interface CheckoutValidationError {
  code: string;
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  metadata?: Metadata;
}

/**
 * Checkout validation warning
 */
export interface CheckoutValidationWarning {
  code: string;
  field: string;
  message: string;
  suggestion?: string;
  metadata?: Metadata;
}

/**
 * Checkout validation suggestion
 */
export interface CheckoutValidationSuggestion {
  code: string;
  field: string;
  message: string;
  action?: string;
  metadata?: Metadata;
}

/**
 * Checkout validation configuration
 */
export interface CheckoutValidationConfiguration {
  enabled: boolean;
  rules: CheckoutValidationRule[];
  strictMode: boolean;
  validateOnStep: boolean;
  validateOnSubmit: boolean;
  validateRealTime: boolean;
  maxErrorsPerField: number;
  requireAllRules: boolean;
  notificationOnError: boolean;
  notificationOnWarning: boolean;
  alertConfig?: CheckoutValidationAlertConfig;
}

/**
 * Checkout validation alert configuration
 */
export interface CheckoutValidationAlertConfig {
  enabled: boolean;
  errorAlert: boolean;
  warningAlert: boolean;
  validationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Checkout validation history
 */
export interface CheckoutValidationHistory extends BaseEntity, Timestamp {
  id: ID;
  checkoutId: ID;
  userId: ID;
  action: 'validate' | 'error' | 'warning' | 'success';
  errors: CheckoutValidationError[];
  warnings: CheckoutValidationWarning[];
  suggestions: CheckoutValidationSuggestion[];
  isValid: boolean;
  metadata?: Metadata;
}

/**
 * Checkout validation statistics
 */
export interface CheckoutValidationStatistics {
  checkoutId: ID;
  totalValidations: number;
  successValidations: number;
  errorValidations: number;
  warningValidations: number;
  byErrorCode: Record<string, number>;
  byWarningCode: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageValidationTime: number;
  errorRate: number;
  warningRate: number;
  mostFrequentError: string;
  mostFrequentWarning: string;
}

/**
 * Checkout validation summary
 */
export interface CheckoutValidationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalValidations: number;
  success: number;
  errors: number;
  warnings: number;
  byErrorCode: Record<string, number>;
  byWarningCode: Record<string, number>;
  validationTrend: {
    date: Date;
    total: number;
    success: number;
    errors: number;
  }[];
  topErrors: {
    code: string;
    count: number;
    message: string;
  }[];
  topWarnings: {
    code: string;
    count: number;
    message: string;
  }[];
}

/**
 * Checkout validation export
 */
export interface CheckoutValidationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: {
    checkoutIds?: ID[];
    userIds?: ID[];
    dateRange?: {
      start: Date;
      end: Date;
    };
    isValid?: boolean;
    hasErrors?: boolean;
    hasWarnings?: boolean;
  };
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
  // Checkout Core
  CheckoutType,
  CheckoutMode,
  CheckoutStepType,
  // Checkout Status
  CheckoutStatusType,
  // Payment Method
  PaymentMethodType,
  PaymentMethodStatus,
  // Payment Status
  PaymentStatusType,
  // Delivery Method
  DeliveryMethodType,
  DeliveryMethodStatus,
  // Order Status
  OrderStatusType,
  // Order Type
  OrderTypeType,
  OrderCategory,
  OrderPriority,
};
