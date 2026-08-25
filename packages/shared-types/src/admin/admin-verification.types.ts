/**
 * Admin Verification Types
 * Type definitions for admin verification based on shared-constants
 * @module AdminVerificationTypes
 */

import { BaseEntity, Timestamp, Metadata, ID } from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants admin verification
// ============================================================
import {
  // Core Verification Constants
  ADMIN_VERIFICATION,
  ADMIN_VERIFICATION_TYPE_LABELS,
  ADMIN_VERIFICATION_TYPE_ICONS,
  ADMIN_VERIFICATION_STATUS_LABELS,
  ADMIN_VERIFICATION_STATUS_COLORS,
  ADMIN_VERIFICATION_METHOD_LABELS,
  ADMIN_VERIFICATION_LEVEL_LABELS,
  ADMIN_VERIFICATION_LEVEL_PRIORITY,
  ADMIN_VERIFICATION_PURPOSE_LABELS,
  ADMIN_VERIFICATION_CHANNEL_LABELS,
  // Core Verification Types
  AdminverificationType,
  AdminverificationStatus,
  AdminverificationMethod,
  AdminverificationLevel,
  AdminverificationPurpose,
  AdminverificationChannel,
  // Core Verification Functions
  getAdminverificationTypeLabel,
  getAdminverificationTypeIcon,
  getAdminverificationStatusLabel,
  getAdminverificationStatusColor,
  getAdminverificationMethodLabel,
  getAdminverificationLevelLabel,
  getAdminverificationLevelPriority,
  getAdminverificationPurposeLabel,
  getAdminverificationChannelLabel,
  isAdminverificationComplete,
  isAdminverificationFailed,
  isAdminverificationPending,
  isAdminverificationExpired,
  isAdminverificationTerminal,
  getAdminverificationLevelForType,
  getAdminverificationMethodsForType,
} from '@vubon/shared-constants';

// ============================================================
// Admin Verification Extended Types
// ============================================================

/**
 * Admin verification with additional metadata
 */
export interface AdminVerificationExtended extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  type: AdminverificationType;
  status: AdminverificationStatus;
  method: AdminverificationMethod;
  level: AdminverificationLevel;
  purpose: AdminverificationPurpose;
  channel: AdminverificationChannel;
  code?: string;
  token?: string;
  expiresAt: Date;
  verifiedAt?: Date;
  attempts: number;
  maxAttempts: number;
  isComplete: boolean;
  isFailed: boolean;
  isPending: boolean;
  isExpired: boolean;
  isTerminal: boolean;
  metadata?: Metadata;
}

/**
 * Admin verification filter
 */
export interface AdminVerificationFilter {
  adminIds?: ID[];
  types?: AdminverificationType[];
  statuses?: AdminverificationStatus[];
  methods?: AdminverificationMethod[];
  levels?: AdminverificationLevel[];
  purposes?: AdminverificationPurpose[];
  channels?: AdminverificationChannel[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  isComplete?: boolean;
  isFailed?: boolean;
  isPending?: boolean;
  isExpired?: boolean;
  searchTerm?: string;
}

/**
 * Admin verification statistics
 */
export interface AdminVerificationStatistics {
  adminId: ID;
  totalVerifications: number;
  completedVerifications: number;
  failedVerifications: number;
  pendingVerifications: number;
  expiredVerifications: number;
  byType: Record<AdminverificationType, number>;
  byStatus: Record<AdminverificationStatus, number>;
  byMethod: Record<AdminverificationMethod, number>;
  byLevel: Record<AdminverificationLevel, number>;
  byPurpose: Record<AdminverificationPurpose, number>;
  byChannel: Record<AdminverificationChannel, number>;
  dateRange: {
    start: Date;
    end: Date;
  };
  averageCompletionTime: number;
  successRate: number;
  failureRate: number;
  mostFrequentType: AdminverificationType;
  mostFrequentMethod: AdminverificationMethod;
  mostFrequentLevel: AdminverificationLevel;
}

/**
 * Admin verification summary
 */
export interface AdminVerificationSummary {
  period: {
    start: Date;
    end: Date;
  };
  total: number;
  completed: number;
  failed: number;
  pending: number;
  expired: number;
  byType: Record<AdminverificationType, number>;
  byStatus: Record<AdminverificationStatus, number>;
  byMethod: Record<AdminverificationMethod, number>;
  byLevel: Record<AdminverificationLevel, number>;
  verificationTrend: {
    date: Date;
    total: number;
    completed: number;
    failed: number;
  }[];
  topTypes: {
    type: AdminverificationType;
    count: number;
    label: string;
  }[];
  topMethods: {
    method: AdminverificationMethod;
    count: number;
    label: string;
  }[];
}

/**
 * Admin verification configuration
 */
export interface AdminVerificationConfiguration {
  enabled: boolean;
  defaultLevel: AdminverificationLevel;
  defaultMethods: AdminverificationMethod[];
  defaultPurpose: AdminverificationPurpose;
  defaultChannel: AdminverificationChannel;
  codeLength: number;
  codeExpiryMinutes: number;
  maxAttempts: number;
  requireMFA: boolean;
  requireBiometric: boolean;
  requireEmailVerification: boolean;
  requirePhoneVerification: boolean;
  notificationOnVerification: boolean;
  alertConfig?: AdminVerificationAlertConfig;
}

/**
 * Admin verification alert configuration
 */
export interface AdminVerificationAlertConfig {
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
 * Admin verification history
 */
export interface AdminVerificationHistory extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  adminId: ID;
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
 * Admin verification attempt
 */
export interface AdminVerificationAttempt extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  adminId: ID;
  code?: string;
  token?: string;
  isSuccess: boolean;
  errorMessage?: string;
  ipAddress?: string;
  userAgent?: string;
  metadata?: Metadata;
}

/**
 * Admin verification template
 */
export interface AdminVerificationTemplate extends BaseEntity, Timestamp {
  id: ID;
  type: AdminverificationType;
  method: AdminverificationMethod;
  channel: AdminverificationChannel;
  subject: string;
  body: string;
  language: string;
  isActive: boolean;
  metadata?: Metadata;
}

/**
 * Admin verification export
 */
export interface AdminVerificationExport extends BaseEntity, Timestamp {
  id: ID;
  adminId: ID;
  format: 'json' | 'csv' | 'pdf';
  filter: AdminVerificationFilter;
  filename: string;
  fileSize?: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  completedAt?: Date;
  downloadUrl?: string;
  metadata?: Metadata;
}

/**
 * Admin verification audit
 */
export interface AdminVerificationAudit extends BaseEntity, Timestamp {
  id: ID;
  verificationId: ID;
  adminId: ID;
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
  // Core Constants
  ADMIN_VERIFICATION,
  ADMIN_VERIFICATION_TYPE_LABELS,
  ADMIN_VERIFICATION_TYPE_ICONS,
  ADMIN_VERIFICATION_STATUS_LABELS,
  ADMIN_VERIFICATION_STATUS_COLORS,
  ADMIN_VERIFICATION_METHOD_LABELS,
  ADMIN_VERIFICATION_LEVEL_LABELS,
  ADMIN_VERIFICATION_LEVEL_PRIORITY,
  ADMIN_VERIFICATION_PURPOSE_LABELS,
  ADMIN_VERIFICATION_CHANNEL_LABELS,
  // Core Types
  AdminverificationType,
  AdminverificationStatus,
  AdminverificationMethod,
  AdminverificationLevel,
  AdminverificationPurpose,
  AdminverificationChannel,
  // Core Functions
  getAdminverificationTypeLabel,
  getAdminverificationTypeIcon,
  getAdminverificationStatusLabel,
  getAdminverificationStatusColor,
  getAdminverificationMethodLabel,
  getAdminverificationLevelLabel,
  getAdminverificationLevelPriority,
  getAdminverificationPurposeLabel,
  getAdminverificationChannelLabel,
  isAdminverificationComplete,
  isAdminverificationFailed,
  isAdminverificationPending,
  isAdminverificationExpired,
  isAdminverificationTerminal,
  getAdminverificationLevelForType,
  getAdminverificationMethodsForType,
};
