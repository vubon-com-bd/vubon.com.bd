/**
 * Payment Method Types
 * Type definitions for payment methods based on shared-constants
 * @module PaymentMethodTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

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
} from '@vubon/shared-constants';

// ============================================================
// Payment Method Extended Types (শুধুমাত্র নতুন টাইপ)
// ============================================================

/**
 * Payment method filter
 */
export interface PaymentMethodFilter {
  ids?: ID[];
  userIds?: ID[];
  types?: PaymentMethodType[];
  categories?: PaymentMethodCategory[];
  statuses?: PaymentMethodStatus[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isActive?: boolean;
  isCard?: boolean;
  isMobile?: boolean;
  isCash?: boolean;
  isOnline?: boolean;
  searchTerm?: string;
}

/**
 * Payment method statistics
 */
export interface PaymentMethodStatistics {
  userId: ID;
  totalMethods: number;
  activeMethods: number;
  byType: Record<PaymentMethodType, number>;
  byCategory: Record<PaymentMethodCategory, number>;
  byStatus: Record<PaymentMethodStatus, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  cardMethods: number;
  mobileMethods: number;
  cashMethods: number;
  onlineMethods: number;
  mostFrequentType: PaymentMethodType;
  mostFrequentCategory: PaymentMethodCategory;
  mostFrequentStatus: PaymentMethodStatus;
}

/**
 * Payment method summary
 */
export interface PaymentMethodSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalMethods: number;
  active: number;
  byType: Record<PaymentMethodType, number>;
  byCategory: Record<PaymentMethodCategory, number>;
  byStatus: Record<PaymentMethodStatus, number>;
  methodTrend: {
    date: Date;
    total: number;
    active: number;
  }[];
  topTypes: {
    type: PaymentMethodType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: PaymentMethodCategory;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: PaymentMethodStatus;
    count: number;
    label: string;
  }[];
}

/**
 * Payment method configuration
 */
export interface PaymentMethodConfiguration {
  enabled: boolean;
  defaultMethod: PaymentMethodType;
  defaultCategory: PaymentMethodCategory;
  allowMultipleMethods: boolean;
  requireVerification: boolean;
  requireConfirmation: boolean;
  maxMethodsPerUser: number;
  autoSelectDefault: boolean;
  notificationOnAdd: boolean;
  notificationOnRemove: boolean;
  notificationOnUpdate: boolean;
  alertConfig?: PaymentMethodAlertConfig;
}

/**
 * Payment method alert configuration
 */
export interface PaymentMethodAlertConfig {
  enabled: boolean;
  duplicateMethodAlert: boolean;
  inactiveMethodAlert: boolean;
  verificationFailureAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Payment method history
 */
export interface PaymentMethodHistory extends BaseEntity, Timestamp {
  id: ID;
  methodId: ID;
  userId: ID;
  action: 'add' | 'update' | 'remove' | 'activate' | 'deactivate' | 'verify' | 'unverify';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Payment method validation
 */
export interface PaymentMethodValidation {
  isValid: boolean;
  methodId: ID;
  userId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Payment method verification
 */
export interface PaymentMethodVerification extends BaseEntity, Timestamp {
  id: ID;
  methodId: ID;
  userId: ID;
  method: 'micro_deposit' | 'code' | 'manual' | '3ds';
  status: 'pending' | 'verified' | 'failed' | 'expired';
  verifiedAt?: Date;
  expiresAt?: Date;
  attempts: number;
  maxAttempts: number;
  metadata?: Metadata;
}

/**
 * Payment method export
 */
export interface PaymentMethodExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PaymentMethodFilter;
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
};
