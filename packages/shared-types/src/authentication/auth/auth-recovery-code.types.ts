/**
 * Authentication Recovery Code Types Module
 * Recovery code management for authentication system
 * Handles account recovery, backup codes, recovery links, and emergency access
 */

import { UserId, Email, Timestamp, Token } from './core-primitives.types';

/**
 * Recovery Code Type
 * Types of recovery codes
 */
export type RecoveryCodeType =
  | 'backup'
  | 'recovery'
  | 'emergency'
  | 'one_time'
  | 'multi_use'
  | 'account_recovery'
  | 'password_recovery'
  | 'mfa_recovery'
  | 'email_recovery';

/**
 * Recovery Code Status
 * Current status of recovery code
 */
export type RecoveryCodeStatus =
  'active' | 'used' | 'expired' | 'revoked' | 'pending' | 'suspended';

/**
 * Recovery Method
 * Methods for account recovery
 */
export type RecoveryMethod =
  | 'email'
  | 'sms'
  | 'backup_codes'
  | 'security_questions'
  | 'identity_verification'
  | 'trusted_device'
  | 'trusted_contact'
  | 'manual_verification';

/**
 * Recovery Request
 * Request to initiate recovery
 */
export interface RecoveryRequest {
  userId: UserId;
  method: RecoveryMethod;
  email?: Email;
  phoneNumber?: string;
  trustedContact?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Recovery Response
 * Response after recovery initiation
 */
export interface RecoveryResponse {
  success: boolean;
  data?: {
    recoveryId: string;
    method: RecoveryMethod;
    status: RecoveryCodeStatus;
    sentAt: Timestamp;
    expiresAt: Timestamp;
    verificationMethod: string;
    recoveryToken?: Token;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Recovery Code Generation Request
 * Request to generate recovery codes
 */
export interface RecoveryCodeGenerationRequest {
  userId: UserId;
  type: RecoveryCodeType;
  count?: number;
  length?: number;
  expiryDays?: number;
  maxUses?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Recovery Code Generation Response
 * Response after recovery code generation
 */
export interface RecoveryCodeGenerationResponse {
  success: boolean;
  data?: {
    codes: string[];
    type: RecoveryCodeType;
    generatedAt: Timestamp;
    expiresAt: Timestamp;
    maxUses: number;
    remainingUses: number;
    metadata?: Record<string, unknown>;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Recovery Code Verification Request
 * Request to verify recovery code
 */
export interface RecoveryCodeVerificationRequest {
  userId: UserId;
  code: string;
  type: RecoveryCodeType;
  deviceId?: string;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Recovery Code Verification Response
 * Response after recovery code verification
 */
export interface RecoveryCodeVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    type: RecoveryCodeType;
    verifiedAt: Timestamp;
    remainingUses?: number;
    expiresAt?: Timestamp;
    token?: Token;
    sessionId?: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Account Recovery Request
 * Request to recover account
 */
export interface AccountRecoveryRequest {
  userId: UserId;
  email: Email;
  recoveryMethod: RecoveryMethod;
  securityAnswers?: Record<string, string>;
  identityDocument?: string;
  trustedDeviceId?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Account Recovery Response
 * Response after account recovery
 */
export interface AccountRecoveryResponse {
  success: boolean;
  data?: {
    recovered: boolean;
    recoveryId: string;
    method: RecoveryMethod;
    recoveredAt: Timestamp;
    newPassword?: string;
    resetToken?: Token;
    requiresManualReview: boolean;
    reviewRequired?: string;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Backup Code
 * Backup code information
 */
export interface BackupCode {
  id: string;
  userId: UserId;
  code: string;
  type: RecoveryCodeType;
  status: RecoveryCodeStatus;
  generatedAt: Timestamp;
  usedAt?: Timestamp;
  expiresAt?: Timestamp;
  maxUses: number;
  usedCount: number;
  remainingUses: number;
  metadata?: Record<string, unknown>;
}

/**
 * Recovery History
 * History of recovery attempts
 */
export interface RecoveryHistory {
  id: string;
  userId: UserId;
  method: RecoveryMethod;
  status: RecoveryCodeStatus;
  attemptedAt: Timestamp;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  metadata?: Record<string, unknown>;
  success: boolean;
  errorReason?: string;
}

/**
 * Security Questions
 * Security questions for recovery
 */
export interface SecurityQuestions {
  userId: UserId;
  questions: SecurityQuestion[];
  answeredAt: Timestamp;
  verified: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Security Question
 * Individual security question
 */
export interface SecurityQuestion {
  id: string;
  question: string;
  answerHash: string;
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Trusted Contact
 * Trusted contact for recovery
 */
export interface TrustedContact {
  id: string;
  userId: UserId;
  contactName: string;
  contactEmail: Email;
  contactPhone?: string;
  relationship: string;
  trustedSince: Timestamp;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Trusted Device
 * Trusted device for recovery
 */
export interface TrustedDevice {
  id: string;
  userId: UserId;
  deviceId: string;
  deviceName: string;
  deviceType: string;
  trustedAt: Timestamp;
  lastUsedAt?: Timestamp;
  expiresAt?: Timestamp;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Recovery Policy
 * Recovery policy settings
 */
export interface RecoveryPolicy {
  allowEmailRecovery: boolean;
  allowSMSRecovery: boolean;
  allowBackupCodes: boolean;
  allowSecurityQuestions: boolean;
  allowTrustedDevices: boolean;
  allowTrustedContacts: boolean;
  maxRecoveryAttempts: number;
  recoveryLockoutDuration: number;
  codeExpiryHours: number;
  requireIdentityVerification: boolean;
  requireManualReview: boolean;
  backupCodesCount: number;
  backupCodeLength: number;
  securityQuestionsRequired: number;
  trustedContactRequired: boolean;
  recoveryNotificationEnabled: boolean;
}

/**
 * Recovery Statistics
 * Statistical data about recovery
 */
export interface RecoveryStatistics {
  totalRecoveries: number;
  successfulRecoveries: number;
  failedRecoveries: number;
  byMethod: Record<RecoveryMethod, number>;
  byStatus: Record<RecoveryCodeStatus, number>;
  averageRecoveryTime: number;
  recoveryRate: number;
  backupCodesUsed: number;
  securityQuestionsPassed: number;
  trustDevicesUsed: number;
  timestamp: Timestamp;
}

/**
 * Recovery Filter
 * Filter criteria for recovery queries
 */
export interface RecoveryFilter {
  userId?: UserId[];
  method?: RecoveryMethod[];
  status?: RecoveryCodeStatus[];
  type?: RecoveryCodeType[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  success?: boolean;
}

/**
 * Recovery Response Builder
 * Helper for building recovery responses
 */
export interface RecoveryResponseBuilder {
  success(response: RecoveryResponse): RecoveryResponse;
  codeSuccess(response: RecoveryCodeGenerationResponse): RecoveryCodeGenerationResponse;
  verifySuccess(response: RecoveryCodeVerificationResponse): RecoveryCodeVerificationResponse;
  accountSuccess(response: AccountRecoveryResponse): AccountRecoveryResponse;
  error(code: string, message: string, details?: Record<string, unknown>): RecoveryErrorResponse;
}

/**
 * Recovery Error Response
 * Error response for recovery operations
 */
export interface RecoveryErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: Timestamp;
  requestId?: string;
}

/**
 * Recovery Constants
 * Recovery-related constants
 */
export const RECOVERY_CODE_TYPES = {
  BACKUP: 'backup',
  RECOVERY: 'recovery',
  EMERGENCY: 'emergency',
  ONE_TIME: 'one_time',
  MULTI_USE: 'multi_use',
  ACCOUNT_RECOVERY: 'account_recovery',
  PASSWORD_RECOVERY: 'password_recovery',
  MFA_RECOVERY: 'mfa_recovery',
  EMAIL_RECOVERY: 'email_recovery',
} as const;

export const RECOVERY_CODE_STATUS = {
  ACTIVE: 'active',
  USED: 'used',
  EXPIRED: 'expired',
  REVOKED: 'revoked',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
} as const;

export const RECOVERY_METHODS = {
  EMAIL: 'email',
  SMS: 'sms',
  BACKUP_CODES: 'backup_codes',
  SECURITY_QUESTIONS: 'security_questions',
  IDENTITY_VERIFICATION: 'identity_verification',
  TRUSTED_DEVICE: 'trusted_device',
  TRUSTED_CONTACT: 'trusted_contact',
  MANUAL_VERIFICATION: 'manual_verification',
} as const;

/**
 * Default Recovery Configuration
 */
export const DEFAULT_RECOVERY_CONFIG = {
  maxRecoveryAttempts: 5,
  recoveryLockoutDuration: 3600, // 1 hour
  codeExpiryHours: 24,
  requireIdentityVerification: false,
  requireManualReview: false,
  backupCodesCount: 10,
  backupCodeLength: 8,
  securityQuestionsRequired: 2,
  trustedContactRequired: false,
  recoveryNotificationEnabled: true,
} as const;

/**
 * Recovery Webhook
 * Webhook payload for recovery events
 */
export interface RecoveryWebhook {
  event: string;
  userId: UserId;
  method: RecoveryMethod;
  status: RecoveryCodeStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Recovery Session
 * Active recovery session
 */
export interface RecoverySession {
  id: string;
  userId: UserId;
  method: RecoveryMethod;
  status: RecoveryCodeStatus;
  startedAt: Timestamp;
  expiresAt: Timestamp;
  completedAt?: Timestamp;
  attempts: number;
  maxAttempts: number;
  metadata?: Record<string, unknown>;
}

/**
 * Recovery Code Validation
 * Validation result for recovery code
 */
export interface RecoveryCodeValidation {
  valid: boolean;
  code: string;
  type: RecoveryCodeType;
  status: RecoveryCodeStatus;
  expiresAt?: Timestamp;
  remainingUses?: number;
  isValid: boolean;
  isExpired: boolean;
  isUsed: boolean;
  isRevoked: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Emergency Access Request
 * Request for emergency access
 */
export interface EmergencyAccessRequest {
  userId: UserId;
  requesterId: UserId;
  reason: string;
  duration: number;
  permissions: string[];
  metadata?: Record<string, unknown>;
}

/**
 * Emergency Access Response
 * Response after emergency access
 */
export interface EmergencyAccessResponse {
  success: boolean;
  data?: {
    accessId: string;
    granted: boolean;
    grantedAt: Timestamp;
    expiresAt: Timestamp;
    permissions: string[];
    token?: Token;
    sessionId?: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Recovery Contact
 * Contact for recovery notifications
 */
export interface RecoveryContact {
  id: string;
  userId: UserId;
  contactType: 'email' | 'phone' | 'alternative_email';
  contactValue: string;
  isPrimary: boolean;
  isVerified: boolean;
  verifiedAt?: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Recovery Code Usage
 * Usage record for recovery codes
 */
export interface RecoveryCodeUsage {
  id: string;
  codeId: string;
  userId: UserId;
  usedAt: Timestamp;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  action: string;
  success: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Account Recovery Status
 * Status of account recovery process
 */
export interface AccountRecoveryStatus {
  userId: UserId;
  inProgress: boolean;
  method: RecoveryMethod;
  status: RecoveryCodeStatus;
  startedAt: Timestamp;
  expiresAt: Timestamp;
  attemptsUsed: number;
  maxAttempts: number;
  remainingAttempts: number;
  verified: boolean;
  completedAt?: Timestamp;
  requiresManualReview: boolean;
  reviewStatus?: 'pending' | 'approved' | 'rejected';
}
