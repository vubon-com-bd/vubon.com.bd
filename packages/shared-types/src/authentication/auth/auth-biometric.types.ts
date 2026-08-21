/**
 * Authentication Biometric Types Module
 * Biometric authentication types for authentication system
 * Handles fingerprint, facial recognition, voice, and other biometric methods
 */

import { authentication } from '@vubon/shared-constants';
import { UserId, Timestamp, Token } from './core-primitives.types';

// Import biometric constants from shared-constants
const {
  BIOMETRIC_ENABLED_DEFAULT,
  BIOMETRIC_ALLOWED_TYPES,
  BIOMETRIC_SESSION_TIMEOUT,
  BIOMETRIC_MAX_ATTEMPTS,
  BIOMETRIC_CONFIDENCE_THRESHOLD,
  BIOMETRIC_CONFIG,
  BIOMETRIC_TYPE,
  BIOMETRIC_STATUS,
} = authentication;

/**
 * Biometric Type
 * Types of biometric authentication (re-exported from shared-constants)
 */
export type BiometricType = (typeof BIOMETRIC_TYPE)[keyof typeof BIOMETRIC_TYPE];

/**
 * Biometric Status
 * Status of biometric setup (re-exported from shared-constants)
 */
export type BiometricStatus = (typeof BIOMETRIC_STATUS)[keyof typeof BIOMETRIC_STATUS];

/**
 * Biometric Configuration
 * Biometric configuration settings
 */
export interface BiometricConfig {
  userId: UserId;
  type: BiometricType;
  enabled: boolean;
  primary: boolean;
  configuredAt: Timestamp;
  lastUsedAt?: Timestamp;
  confidenceThreshold: number;
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Setup Request
 * Request to setup biometric authentication
 */
export interface BiometricSetupRequest {
  userId: UserId;
  type: BiometricType;
  deviceName?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Setup Response
 * Response after biometric setup
 */
export interface BiometricSetupResponse {
  success: boolean;
  data?: {
    setupId: string;
    type: BiometricType;
    status: BiometricStatus;
    setupToken: Token;
    expiresAt: Timestamp;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Biometric Verification Request
 * Request to verify biometric
 */
export interface BiometricVerificationRequest {
  userId: UserId;
  type: BiometricType;
  biometricData: string;
  deviceId?: string;
  confidenceThreshold?: number;
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Verification Response
 * Response after biometric verification
 */
export interface BiometricVerificationResponse {
  success: boolean;
  data?: {
    verified: boolean;
    type: BiometricType;
    verifiedAt: Timestamp;
    confidence: number;
    confidenceThreshold: number;
    sessionId?: string;
    token?: Token;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Biometric Disable Request
 * Request to disable biometric
 */
export interface BiometricDisableRequest {
  userId: UserId;
  type?: BiometricType;
  reason: string;
  adminUserId?: UserId;
}

/**
 * Biometric Disable Response
 * Response after biometric disable
 */
export interface BiometricDisableResponse {
  success: boolean;
  data?: {
    disabled: boolean;
    type: BiometricType;
    disabledAt: Timestamp;
    allTypesDisabled: boolean;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Biometric Device
 * Device registered for biometric
 */
export interface BiometricDevice {
  deviceId: string;
  userId: UserId;
  deviceName: string;
  deviceType: string;
  biometricType: BiometricType;
  trusted: boolean;
  registeredAt: Timestamp;
  lastUsedAt?: Timestamp;
  expiresAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Session
 * Biometric verification session
 */
export interface BiometricSession {
  sessionId: string;
  userId: UserId;
  type: BiometricType;
  status: BiometricStatus;
  startedAt: Timestamp;
  expiresAt: Timestamp;
  completedAt?: Timestamp;
  attempts: number;
  maxAttempts: number;
  confidenceScore: number;
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Audit Log
 * Audit log for biometric operations
 */
export interface BiometricAuditLog {
  id: string;
  userId: UserId;
  operation: 'setup' | 'verify' | 'disable' | 'enable' | 'update';
  type: BiometricType;
  success: boolean;
  confidenceScore?: number;
  ipAddress?: string;
  userAgent?: string;
  deviceId?: string;
  metadata?: Record<string, unknown>;
  timestamp: Timestamp;
}

/**
 * Biometric Statistics
 * Statistical data about biometric
 */
export interface BiometricStatistics {
  totalUsers: number;
  enabledUsers: number;
  disabledUsers: number;
  byType: Record<BiometricType, number>;
  byStatus: Record<BiometricStatus, number>;
  successRate: number;
  failureRate: number;
  averageVerificationTime: number;
  averageConfidenceScore: number;
  falseAcceptanceRate: number;
  falseRejectionRate: number;
  timestamp: Timestamp;
}

/**
 * Biometric Policy
 * Biometric policy settings
 */
export interface BiometricPolicy {
  required: boolean;
  allowedTypes: BiometricType[];
  defaultType: BiometricType;
  maxAttempts: number;
  lockoutDuration: number;
  confidenceThreshold: number;
  sessionTimeout: number;
  requireForRoles: string[];
  exemptForRoles: string[];
  requireLiveDetection: boolean;
  requireDeviceBinding: boolean;
}

/**
 * Biometric Filter
 * Filter criteria for biometric queries
 */
export interface BiometricFilter {
  userId?: UserId[];
  type?: BiometricType[];
  status?: BiometricStatus[];
  deviceId?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  trusted?: boolean;
}

/**
 * Biometric Response Builder
 * Helper for building biometric responses
 */
export interface BiometricResponseBuilder {
  setupSuccess(response: BiometricSetupResponse): BiometricSetupResponse;
  verifySuccess(response: BiometricVerificationResponse): BiometricVerificationResponse;
  disableSuccess(response: BiometricDisableResponse): BiometricDisableResponse;
  error(code: string, message: string, details?: Record<string, unknown>): BiometricErrorResponse;
}

/**
 * Biometric Error Response
 * Error response for biometric operations
 */
export interface BiometricErrorResponse {
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
 * Biometric Constants
 * Biometric-related constants (re-exported from shared-constants)
 */
export const BIOMETRIC_TYPES = BIOMETRIC_TYPE;
export const BIOMETRIC_STATUSES = BIOMETRIC_STATUS;
export const BIOMETRIC_CONFIG_DEFAULT = BIOMETRIC_CONFIG;

/**
 * Default Biometric Configuration
 */
export const DEFAULT_BIOMETRIC_CONFIG = {
  enabledDefault: BIOMETRIC_ENABLED_DEFAULT,
  allowedTypes: BIOMETRIC_ALLOWED_TYPES,
  sessionTimeout: BIOMETRIC_SESSION_TIMEOUT,
  maxAttempts: BIOMETRIC_MAX_ATTEMPTS,
  confidenceThreshold: BIOMETRIC_CONFIDENCE_THRESHOLD,
} as const;

/**
 * Biometric Webhook
 * Webhook payload for biometric events
 */
export interface BiometricWebhook {
  event: string;
  userId: UserId;
  type: BiometricType;
  status: BiometricStatus;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Biometric Template
 * Biometric template data
 */
export interface BiometricTemplate {
  id: string;
  userId: UserId;
  type: BiometricType;
  template: string;
  version: string;
  confidenceThreshold: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  expiresAt?: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Challenge
 * Biometric challenge for verification
 */
export interface BiometricChallenge {
  challengeId: string;
  userId: UserId;
  type: BiometricType;
  challenge: string;
  expiresAt: Timestamp;
  createdAt: Timestamp;
  used: boolean;
  metadata?: Record<string, unknown>;
}

/**
 * Biometric Verification Result
 * Result of biometric verification
 */
export interface BiometricVerificationResult {
  verified: boolean;
  type: BiometricType;
  confidence: number;
  thresholdMet: boolean;
  matchingTemplateId?: string;
  verificationTime: number;
  timestamp: Timestamp;
  errors?: string[];
}
