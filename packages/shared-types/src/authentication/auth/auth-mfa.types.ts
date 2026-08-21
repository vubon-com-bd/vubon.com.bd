/**
 * Authentication Multi-Factor Authentication Types Module
 * MFA (Multi-Factor Authentication) types for authentication system
 * Handles 2FA, authenticator apps, backup codes, and MFA recovery
 */

import { UserId, Timestamp, Token } from './core-primitives.types';

/**
 * MFA Method
 * Supported MFA methods
 */
export type MFAMethod =
  | 'authenticator'
  | 'sms'
  | 'email'
  | 'backup_codes'
  | 'security_keys'
  | 'biometric'
  | 'push_notification';

/**
 * MFA Status
 * Current status of MFA setup
 */
export type MFAStatus = 'disabled' | 'pending' | 'enabled' | 'suspended' | 'expired' | 'recovery';

/**
 * MFA Type
 * Types of MFA authentication
 */
export type MFAType = 'two_factor' | 'multi_factor' | 'adaptive' | 'risk_based' | 'step_up';

/**
 * Authenticator Type
 * Types of authenticator apps
 */
export type AuthenticatorType = 'google' | 'microsoft' | 'authy' | 'duo' | 'custom';

/**
 * MFA Configuration
 * Configuration for MFA setup
 */
export interface MFAConfiguration {
  userId: UserId;
  method: MFAMethod;
  enabled: boolean;
  primary: boolean;
  configuredAt: Timestamp;
  lastUsedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Setup Request
 * Request to setup MFA
 */
export interface MFASetupRequest {
  userId: UserId;
  method: MFAMethod;
  phoneNumber?: string;
  email?: string;
  deviceName?: string;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Setup Response
 * Response after MFA setup
 */
export interface MFASetupResponse {
  success: boolean;
  data?: {
    setupId: string;
    method: MFAMethod;
    secret?: string;
    qrCode?: string;
    qrCodeDataURL?: string;
    backupCodes?: string[];
    recoveryCodes?: string[];
    setupToken: Token;
    expiresAt: Timestamp;
    status: MFAStatus;
    provisioningUri?: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * MFA Verification Request
 * Request to verify MFA
 */
export interface MFAVerificationRequest {
  userId: UserId;
  method: MFAMethod;
  code: string;
  deviceId?: string;
  rememberDevice?: boolean;
  backupCode?: string;
  setupId?: string;
}

/**
 * MFA Verification Response
 * Response after MFA verification
 */
export interface MFAVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    method: MFAMethod;
    verifiedAt: Timestamp;
    deviceRemembered: boolean;
    backupCodesRemaining?: number;
    recoveryCodesRemaining?: number;
    sessionId?: string;
    token?: Token;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * MFA Recovery Request
 * Request to recover MFA
 */
export interface MFARecoveryRequest {
  userId: UserId;
  recoveryCode: string;
  newMethod?: MFAMethod;
  newPhoneNumber?: string;
  newEmail?: string;
  deviceId?: string;
}

/**
 * MFA Recovery Response
 * Response after MFA recovery
 */
export interface MFARecoveryResponse {
  success: boolean;
  data?: {
    recovered: boolean;
    method: MFAMethod;
    recoveryAt: Timestamp;
    newSetupId?: string;
    newBackupCodes?: string[];
    newRecoveryCodes?: string[];
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * MFA Backup Codes
 * Backup codes for MFA
 */
export interface MFABackupCodes {
  userId: UserId;
  codes: string[];
  generatedAt: Timestamp;
  expiresAt?: Timestamp;
  usedCount: number;
  maxUses: number;
  remainingCodes: number;
  lastUsedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Recovery Codes
 * Recovery codes for MFA
 */
export interface MFARecoveryCodes {
  userId: UserId;
  codes: string[];
  generatedAt: Timestamp;
  expiresAt?: Timestamp;
  usedCount: number;
  maxUses: number;
  remainingCodes: number;
  lastUsedAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Device
 * Device registered for MFA
 */
export interface MFADevice {
  deviceId: string;
  userId: UserId;
  deviceName: string;
  deviceType: string;
  method: MFAMethod;
  trusted: boolean;
  registeredAt: Timestamp;
  lastUsedAt?: Timestamp;
  expiresAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Session
 * MFA verification session
 */
export interface MFASession {
  sessionId: string;
  userId: UserId;
  method: MFAMethod;
  status: MFAStatus;
  startedAt: Timestamp;
  expiresAt: Timestamp;
  completedAt?: Timestamp;
  attempts: number;
  maxAttempts: number;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Audit Log
 * Audit log for MFA operations
 */
export interface MFAAuditLog {
  id: string;
  userId: UserId;
  operation: 'setup' | 'verify' | 'recover' | 'reset' | 'disable' | 'enable' | 'update';
  method: MFAMethod;
  success: boolean;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * MFA Statistics
 * Statistical data about MFA
 */
export interface MFAStatistics {
  totalUsers: number;
  enabledUsers: number;
  disabledUsers: number;
  pendingUsers: number;
  byMethod: Record<MFAMethod, number>;
  byStatus: Record<MFAStatus, number>;
  successRate: number;
  failureRate: number;
  averageVerificationTime: number;
  recoveryRate: number;
  timestamp: Timestamp;
}

/**
 * MFA Policy
 * MFA policy settings
 */
export interface MFAPolicy {
  required: boolean;
  enforced: boolean;
  allowedMethods: MFAMethod[];
  defaultMethod: MFAMethod;
  maxAttempts: number;
  lockoutDuration: number;
  backupCodesCount: number;
  recoveryCodesCount: number;
  codeLength: number;
  codeExpirySeconds: number;
  requireForRoles: string[];
  exemptForRoles: string[];
  adaptiveMFA: boolean;
  riskBasedMFA: boolean;
  stepUpMFA: boolean;
  rememberDevice: boolean;
  rememberDeviceDuration: number;
  enforceReAuthentication: boolean;
  reAuthenticationInterval: number;
}

/**
 * MFA Risk Assessment
 * Risk assessment for MFA
 */
export interface MFARiskAssessment {
  userId: UserId;
  riskScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  factors: string[];
  requiresMFA: boolean;
  suggestedMethods: MFAMethod[];
  timestamp: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Step-Up Request
 * Request for step-up MFA
 */
export interface MFAStepUpRequest {
  userId: UserId;
  reason: string;
  requiredLevel: 'low' | 'medium' | 'high';
  currentLevel: 'low' | 'medium' | 'high';
  method: MFAMethod;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Step-Up Response
 * Response after step-up MFA
 */
export interface MFAStepUpResponse {
  success: boolean;
  data?: {
    verified: boolean;
    method: MFAMethod;
    verifiedAt: Timestamp;
    newLevel: 'low' | 'medium' | 'high';
    token?: Token;
    sessionId?: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * MFA Reset Request
 * Request to reset MFA
 */
export interface MFAResetRequest {
  userId: UserId;
  reason: string;
  force: boolean;
  adminUserId?: UserId;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Reset Response
 * Response after MFA reset
 */
export interface MFAResetResponse {
  success: boolean;
  data?: {
    reset: boolean;
    resetAt: Timestamp;
    oldMethodsRemoved: number;
    newSetupRequired: boolean;
    backupCodesGenerated?: string[];
    recoveryCodesGenerated?: string[];
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * MFA Disable Request
 * Request to disable MFA
 */
export interface MFADisableRequest {
  userId: UserId;
  method?: MFAMethod;
  code?: string;
  reason: string;
  adminUserId?: UserId;
}

/**
 * MFA Disable Response
 * Response after MFA disable
 */
export interface MFADisableResponse {
  success: boolean;
  data?: {
    disabled: boolean;
    method: MFAMethod;
    disabledAt: Timestamp;
    allMethodsDisabled: boolean;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * MFA Security
 * Security settings for MFA
 */
export interface MFASecurity {
  maxAttempts: number;
  lockoutDuration: number;
  codeLength: number;
  codeExpirySeconds: number;
  backupCodesCount: number;
  recoveryCodesCount: number;
  rememberDeviceDuration: number;
  requireBiometric: boolean;
  requireSecurityKeys: boolean;
  enforceRecoveryCodes: boolean;
  enforceBackupCodes: boolean;
  allowMultipleMethods: boolean;
  requirePrimaryMethod: boolean;
  adaptiveMFA: boolean;
  riskBasedMFA: boolean;
}

/**
 * MFA Filter
 * Filter criteria for MFA queries
 */
export interface MFAFilter {
  userId?: UserId[];
  method?: MFAMethod[];
  status?: MFAStatus[];
  deviceId?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  trusted?: boolean;
}

/**
 * MFA Response Builder
 * Helper for building MFA responses
 */
export interface MFAResponseBuilder {
  setupSuccess(response: MFASetupResponse): MFASetupResponse;
  verifySuccess(response: MFAVerificationResponse): MFAVerificationResponse;
  recoverySuccess(response: MFARecoveryResponse): MFARecoveryResponse;
  resetSuccess(response: MFAResetResponse): MFAResetResponse;
  disableSuccess(response: MFADisableResponse): MFADisableResponse;
  stepUpSuccess(response: MFAStepUpResponse): MFAStepUpResponse;
  error(code: string, message: string, details?: Record<string, unknown>): MFAErrorResponse;
}

/**
 * MFA Error Response
 * Error response for MFA operations
 */
export interface MFAErrorResponse {
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
 * MFA Constants
 * MFA-related constants
 */
export const MFA_METHODS = {
  AUTHENTICATOR: 'authenticator',
  SMS: 'sms',
  EMAIL: 'email',
  BACKUP_CODES: 'backup_codes',
  SECURITY_KEYS: 'security_keys',
  BIOMETRIC: 'biometric',
  PUSH_NOTIFICATION: 'push_notification',
} as const;

export const MFA_STATUS = {
  DISABLED: 'disabled',
  PENDING: 'pending',
  ENABLED: 'enabled',
  SUSPENDED: 'suspended',
  EXPIRED: 'expired',
  RECOVERY: 'recovery',
} as const;

export const MFA_TYPES = {
  TWO_FACTOR: 'two_factor',
  MULTI_FACTOR: 'multi_factor',
  ADAPTIVE: 'adaptive',
  RISK_BASED: 'risk_based',
  STEP_UP: 'step_up',
} as const;

export const AUTHENTICATOR_TYPES = {
  GOOGLE: 'google',
  MICROSOFT: 'microsoft',
  AUTHY: 'authy',
  DUO: 'duo',
  CUSTOM: 'custom',
} as const;

/**
 * Default MFA Configuration
 */
export const DEFAULT_MFA_CONFIG = {
  maxAttempts: 5,
  lockoutDuration: 900, // 15 minutes
  codeLength: 6,
  codeExpirySeconds: 300, // 5 minutes
  backupCodesCount: 10,
  recoveryCodesCount: 10,
  rememberDeviceDuration: 2592000, // 30 days
  requireBiometric: false,
  requireSecurityKeys: false,
  enforceRecoveryCodes: true,
  enforceBackupCodes: true,
  allowMultipleMethods: true,
  requirePrimaryMethod: true,
  adaptiveMFA: true,
  riskBasedMFA: true,
} as const;

/**
 * MFA Webhook
 * Webhook payload for MFA events
 */
export interface MFAWebhook {
  event: string;
  userId: UserId;
  method: MFAMethod;
  status: MFAStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * MFA Challenge
 * MFA challenge for verification
 */
export interface MFAChallenge {
  challengeId: string;
  userId: UserId;
  method: MFAMethod;
  challenge: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  used: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * MFA Recovery Status
 * Status of MFA recovery
 */
export interface MFARecoveryStatus {
  userId: UserId;
  recoveryAvailable: boolean;
  recoveryMethod: MFAMethod;
  recoveryAttempts: number;
  maxRecoveryAttempts: number;
  lastRecoveryAt?: Timestamp;
  recoveryLockedUntil?: Timestamp;
  backupCodesRemaining: number;
  recoveryCodesRemaining: number;
}
