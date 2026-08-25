/**
 * Auth Verification Types
 * Type definitions for authentication verification based on shared-constants
 * @module AuthVerificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants auth verification
// ============================================================
import {
  // Verification Constants
  AUTH_VERIFICATION,
  AUTH_IDENTITY_VERIFICATION_TYPES,
  AUTH_DOCUMENT_VERIFICATION_TYPES,
  AUTH_CONTACT_VERIFICATION_TYPES,
  AUTH_COMPLETED_VERIFICATION_STATUSES,
  AUTH_IN_PROGRESS_VERIFICATION_STATUSES,
  AUTH_FAILED_VERIFICATION_STATUSES,
  // Verification Types
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationEvent,
  AuthVerificationChannel,
  AuthVerificationLevel,
  // Verification Functions
  isAuthVerificationComplete,
  isAuthVerificationInProgress,
  isAuthVerificationFailed,
  isAuthIdentityVerification,
  isAuthDocumentVerification,
  isAuthContactVerification,
  getAuthVerificationExpiry,
  getAuthVerificationTypeLabel,
  getAuthVerificationStatusLabel,
  getAuthVerificationChannelLabel,
  getAuthVerificationLevel,
} from '@vubon/shared-constants';

// ============================================================
// Auth Verification Extended Types
// ============================================================

/**
 * Auth verification with additional metadata
 */
export interface AuthVerificationExtended extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: AuthVerificationType;
  status: AuthVerificationStatus;
  channel: AuthVerificationChannel;
  level: AuthVerificationLevel;
  code?: string;
  token?: string;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  isComplete: boolean;
  isInProgress: boolean;
  isFailed: boolean;
  isIdentity: boolean;
  isDocument: boolean;
  isContact: boolean;
  metadata?: Metadata;
}

/**
 * Auth verification filter
 */
export interface AuthVerificationFilter {
  userIds?: ID[];
  types?: AuthVerificationType[];
  statuses?: AuthVerificationStatus[];
  channels?: AuthVerificationChannel[];
  levels?: AuthVerificationLevel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isInProgress?: boolean;
  isFailed?: boolean;
  isIdentity?: boolean;
  isDocument?: boolean;
  isContact?: boolean;
  expiresBefore?: Date;
  expiresAfter?: Date;
  searchTerm?: string;
}

/**
 * Auth verification statistics
 */
export interface AuthVerificationStatistics {
  userId: ID;
  totalVerifications: number;
  completeVerifications: number;
  inProgressVerifications: number;
  failedVerifications: number;
  byType: Record<AuthVerificationType, number>;
  byStatus: Record<AuthVerificationStatus, number>;
  byChannel: Record<AuthVerificationChannel, number>;
  byLevel: Record<AuthVerificationLevel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCompletionTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: AuthVerificationType;
  mostFrequentChannel: AuthVerificationChannel;
  mostFrequentLevel: AuthVerificationLevel;
}

/**
 * Auth verification summary
 */
export interface AuthVerificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  complete: number;
  inProgress: number;
  failed: number;
  byType: Record<AuthVerificationType, number>;
  byStatus: Record<AuthVerificationStatus, number>;
  byChannel: Record<AuthVerificationChannel, number>;
  byLevel: Record<AuthVerificationLevel, number>;
  verificationTrend: {
    date: Date;
    total: number;
    complete: number;
    failed: number;
  }[];
  topTypes: {
    type: AuthVerificationType;
    count: number;
    label: string;
  }[];
  topChannels: {
    channel: AuthVerificationChannel;
    count: number;
    label: string;
  }[];
}

/**
 * Auth verification configuration
 */
export interface AuthVerificationConfiguration {
  enabled: boolean;
  defaultLevel: AuthVerificationLevel;
  defaultChannels: AuthVerificationChannel[];
  defaultExpiryMinutes: number;
  maxAttempts: number;
  codeLength: number;
  requireMFA: boolean;
  requireBiometric: boolean;
  requireIdentityVerification: boolean;
  requireDocumentVerification: boolean;
  requireContactVerification: boolean;
  notificationOnSuccess: boolean;
  notificationOnFailure: boolean;
  notificationOnAttempt: boolean;
  alertConfig?: AuthVerificationAlertConfig;
}

/**
 * Auth verification alert configuration
 */
export interface AuthVerificationAlertConfig {
  enabled: boolean;
  failedAttemptAlert: boolean;
  maxAttemptsAlert: boolean;
  expiredVerificationAlert: boolean;
  suspiciousVerificationAlert: boolean;
  notificationChannels: ('email' | 'sms' | 'slack' | 'webhook')[];
  cooldownMinutes: number;
  failedAttemptThreshold: number;
}

/**
 * Auth verification history
 */
export interface AuthVerificationHistory extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  userId: ID;
  action: 'create' | 'attempt' | 'verify' | 'fail' | 'expire' | 'resend' | 'cancel';
  changes?: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Auth verification attempt
 */
export interface AuthVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
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
 * Auth verification template
 */
export interface AuthVerificationTemplate extends BaseEntity, Timestamp {
  id: ID;
  type: AuthVerificationType;
  channel: AuthVerificationChannel;
  subject: string;
  body: string;
  language: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Auth verification export
 */
export interface AuthVerificationExport extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AuthVerificationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Auth verification audit
 */
export interface AuthVerificationAudit extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  userId: ID;
  action: 'create' | 'verify' | 'fail' | 'expire' | 'resend' | 'cancel';
  changes: {
    field: string;
    oldValue: unknown;
    newValue: unknown;
  }[];
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Constants
  AUTH_VERIFICATION,
  AUTH_IDENTITY_VERIFICATION_TYPES,
  AUTH_DOCUMENT_VERIFICATION_TYPES,
  AUTH_CONTACT_VERIFICATION_TYPES,
  AUTH_COMPLETED_VERIFICATION_STATUSES,
  AUTH_IN_PROGRESS_VERIFICATION_STATUSES,
  AUTH_FAILED_VERIFICATION_STATUSES,
  // Types
  AuthVerificationType,
  AuthVerificationStatus,
  AuthVerificationEvent,
  AuthVerificationChannel,
  AuthVerificationLevel,
  // Functions
  isAuthVerificationComplete,
  isAuthVerificationInProgress,
  isAuthVerificationFailed,
  isAuthIdentityVerification,
  isAuthDocumentVerification,
  isAuthContactVerification,
  getAuthVerificationExpiry,
  getAuthVerificationTypeLabel,
  getAuthVerificationStatusLabel,
  getAuthVerificationChannelLabel,
  getAuthVerificationLevel,
};
