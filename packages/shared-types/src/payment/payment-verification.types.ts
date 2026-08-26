/**
 * Payment Verification Types
 * Type definitions for payment verification based on shared-constants
 * @module PaymentVerificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants checkout
// ============================================================
import {
  // Payment Status
  PaymentStatusType,
  PaymentStatusColor,
  PaymentStatusCategory,
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
} from '@vubon/shared-constants';

// ============================================================
// Payment Verification Extended Types
// ============================================================

/**
 * Payment verification
 */
export interface PaymentVerification extends BaseEntity, Timestamp {
  id: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  method: 'micro_deposit' | 'code' | '3ds' | 'manual' | 'bank_transfer' | 'identity';
  status: 'pending' | 'verified' | 'failed' | 'expired' | 'cancelled';
  code?: string;
  token?: string;
  reference?: string;
  attempts: number;
  maxAttempts: number;
  expiresAt: Date;
  verifiedAt?: Date;
  metadata?: Metadata;
}

/**
 * Payment verification filter
 */
export interface PaymentVerificationFilter {
  ids?: ID[];
  paymentIds?: ID[];
  orderIds?: ID[];
  userIds?: ID[];
  methods?: ('micro_deposit' | 'code' | '3ds' | 'manual' | 'bank_transfer' | 'identity')[];
  statuses?: ('pending' | 'verified' | 'failed' | 'expired' | 'cancelled')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isVerified?: boolean;
  isPending?: boolean;
  isFailed?: boolean;
  isExpired?: boolean;
  isCancelled?: boolean;
  searchTerm?: string;
}

/**
 * Payment verification statistics
 */
export interface PaymentVerificationStatistics {
  paymentId: ID;
  totalVerifications: number;
  pendingVerifications: number;
  verifiedVerifications: number;
  failedVerifications: number;
  expiredVerifications: number;
  cancelledVerifications: number;
  byMethod: Record<string, number>;
  byStatus: Record<string, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageVerificationTime: number;
  maxVerificationTime: number;
  minVerificationTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentMethod: string;
  mostFrequentStatus: string;
}

/**
 * Payment verification summary
 */
export interface PaymentVerificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  totalVerifications: number;
  pending: number;
  verified: number;
  failed: number;
  expired: number;
  cancelled: number;
  byMethod: Record<string, number>;
  byStatus: Record<string, number>;
  verificationTrend: {
    date: Date;
    total: number;
    verified: number;
    failed: number;
  }[];
  topMethods: {
    method: string;
    count: number;
    label: string;
  }[];
  topStatuses: {
    status: string;
    count: number;
    label: string;
  }[];
  performanceMetrics: {
    successRate: number;
    failureRate: number;
    averageVerificationTime: number;
  };
}

/**
 * Payment verification configuration
 */
export interface PaymentVerificationConfiguration {
  enabled: boolean;
  defaultMethod: 'micro_deposit' | 'code' | '3ds' | 'manual' | 'bank_transfer' | 'identity';
  requireVerification: boolean;
  requireCode: boolean;
  requireToken: boolean;
  maxAttempts: number;
  expiryMinutes: number;
  autoVerify: boolean;
  autoVerifyAmount: number;
  allowResend: boolean;
  resendCooldownMinutes: number;
  notificationOnPending: boolean;
  notificationOnVerified: boolean;
  notificationOnFailed: boolean;
  notificationOnExpired: boolean;
  alertConfig?: PaymentVerificationAlertConfig;
}

/**
 * Payment verification alert configuration
 */
export interface PaymentVerificationAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  expiryAlert: boolean;
  suspiciousActivityAlert: boolean;
  verificationAttemptAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Payment verification history
 */
export interface PaymentVerificationHistory extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  action: 'create' | 'attempt' | 'verify' | 'fail' | 'expire' | 'cancel' | 'resend';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Payment verification attempt
 */
export interface PaymentVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  paymentId: ID;
  orderId: ID;
  userId: ID;
  code?: string;
  token?: string;
  isSuccess: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Payment verification validation
 */
export interface PaymentVerificationValidation {
  isValid: boolean;
  verificationId: ID;
  paymentId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Payment verification export
 */
export interface PaymentVerificationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: PaymentVerificationFilter;
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
  PaymentStatusColor,
  PaymentStatusCategory,
  // Payment Method
  PaymentMethodType,
  // Payment Gateway
  PaymentGatewayType,
};
