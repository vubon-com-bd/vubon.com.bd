/**
 * Vendor Verification Types
 * Type definitions for vendor verification based on shared-constants
 * @module VendorVerificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants vendor
// ============================================================
import {
  // Vendor Verification
  VENDOR_VERIFICATION,
  VendorVerificationType,
  VendorVerificationCategory,
  VendorVerificationColor,
  VendorVerificationIcon,
  VendorVerificationDocument,
  VendorVerificationStep,
  vendorVerificationGetLabel,
  vendorVerificationIsVerified,
  vendorVerificationIsPending,
  vendorVerificationIsFailed,
  vendorVerificationGetCategory,
  vendorVerificationGetDocumentLabel,
  vendorVerificationGetStepLabel,
} from '@vubon/shared-constants';

// ============================================================
// Vendor Verification Extended Types (নাম পরিবর্তন করা হয়েছে)
// ============================================================

/**
 * Vendor verification details (রিনেম করা হয়েছে)
 */
export interface VendorVerificationDetails extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  type: VendorVerificationType;
  category: VendorVerificationCategory;
  status: 'pending' | 'verified' | 'failed' | 'expired' | 'cancelled' | 'in_progress';
  isVerified: boolean;
  isPending: boolean;
  isFailed: boolean;
  isExpired: boolean;
  documents: VendorVerificationDocument[];
  steps: VendorVerificationStep[];
  currentStep: number;
  progress: number;
  notes?: string;
  requestedAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  expiresAt?: Date;
  verifiedBy?: ID;
  metadata?: Metadata;
}

/**
 * Vendor verification filter
 */
export interface VendorVerificationFilter {
  ids?: ID[];
  vendorIds?: ID[];
  userIds?: ID[];
  types?: VendorVerificationType[];
  categories?: VendorVerificationCategory[];
  statuses?: ('pending' | 'verified' | 'failed' | 'expired' | 'cancelled' | 'in_progress')[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isVerified?: boolean;
  isPending?: boolean;
  isFailed?: boolean;
  isExpired?: boolean;
  searchTerm?: string;
  verifiedBy?: ID;
}

/**
 * Vendor verification statistics
 */
export interface VendorVerificationStatistics {
  vendorId: ID;
  totalVerifications: number;
  pendingVerifications: number;
  verifiedVerifications: number;
  failedVerifications: number;
  expiredVerifications: number;
  cancelledVerifications: number;
  inProgressVerifications: number;
  byType: Record<VendorVerificationType, number>;
  byCategory: Record<VendorVerificationCategory, number>;
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
  mostFrequentType: VendorVerificationType;
  mostFrequentCategory: VendorVerificationCategory;
  mostFrequentStatus: string;
}

/**
 * Vendor verification summary
 */
export interface VendorVerificationSummary {
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
  inProgress: number;
  byType: Record<VendorVerificationType, number>;
  byCategory: Record<VendorVerificationCategory, number>;
  byStatus: Record<string, number>;
  verificationTrend: {
    date: Date;
    total: number;
    verified: number;
    failed: number;
  }[];
  topTypes: {
    type: VendorVerificationType;
    count: number;
    label: string;
  }[];
  topCategories: {
    category: VendorVerificationCategory;
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
 * Vendor verification configuration
 */
export interface VendorVerificationConfiguration {
  enabled: boolean;
  requireVerification: boolean;
  verificationTypes: VendorVerificationType[];
  autoVerify: boolean;
  requireDocuments: boolean;
  requireSteps: boolean;
  maxAttempts: number;
  verificationTimeoutDays: number;
  allowResend: boolean;
  resendCooldownHours: number;
  notificationOnRequest: boolean;
  notificationOnStart: boolean;
  notificationOnComplete: boolean;
  notificationOnFailure: boolean;
  notificationOnExpiry: boolean;
  alertConfig?: VendorVerificationAlertConfig;
}

/**
 * Vendor verification alert configuration
 */
export interface VendorVerificationAlertConfig {
  enabled: boolean;
  failureAlert: boolean;
  expiryAlert: boolean;
  expiryThresholdDays: number;
  timeoutAlert: boolean;
  suspiciousVerificationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
}

/**
 * Vendor verification history
 */
export interface VendorVerificationHistory extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  vendorId: ID;
  userId: ID;
  action:
    | 'request'
    | 'start'
    | 'complete'
    | 'fail'
    | 'expire'
    | 'cancel'
    | 'resend'
    | 'update'
    | 'verify'
    | 'unverify';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  metadata?: Metadata;
}

/**
 * Vendor verification validation
 */
export interface VendorVerificationValidation {
  isValid: boolean;
  verificationId: ID;
  vendorId: ID;
  errors?: string[];
  warnings?: string[];
  suggestions?: string[];
}

/**
 * Vendor verification export
 */
export interface VendorVerificationExport extends BaseEntity, Timestamp {
  id: ID;
  vendorId: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf' | 'xlsx';
  filter: VendorVerificationFilter;
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
  // Vendor Verification
  VENDOR_VERIFICATION,
  VendorVerificationType,
  VendorVerificationCategory,
  VendorVerificationColor,
  VendorVerificationIcon,
  VendorVerificationDocument,
  VendorVerificationStep,
  vendorVerificationGetLabel,
  vendorVerificationIsVerified,
  vendorVerificationIsPending,
  vendorVerificationIsFailed,
  vendorVerificationGetCategory,
  vendorVerificationGetDocumentLabel,
  vendorVerificationGetStepLabel,
};
