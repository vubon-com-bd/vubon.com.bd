/**
 * Authentication Login Attempt Types Module
 * Login attempt tracking and monitoring types for authentication system
 * Handles login attempts, monitoring, analytics, and security metrics
 */

import { UserId, Email, Timestamp, IPAddress } from './core-primitives.types';

/**
 * Login Attempt Status
 * Status of a login attempt
 */
export type LoginAttemptStatus =
  | 'success'
  | 'failed'
  | 'blocked'
  | 'pending'
  | 'timeout'
  | 'suspicious'
  | 'flagged'
  | 'review_required';

/**
 * Login Attempt Result
 * Result of a login attempt
 */
export type LoginAttemptResult =
  | 'allowed'
  | 'denied'
  | 'requires_mfa'
  | 'requires_verification'
  | 'account_locked'
  | 'throttled'
  | 'blocked_ip'
  | 'invalid_credentials'
  | 'expired'
  | 'disabled';

/**
 * Login Attempt Type
 * Type of login attempt
 */
export type LoginAttemptType =
  'standard' | 'social' | 'mfa' | 'oauth' | 'api' | 'admin' | 'service' | 'automated';

/**
 * Login Attempt
 * Record of a login attempt
 */
export interface LoginAttempt {
  id: string;
  userId?: UserId;
  email: Email;
  status: LoginAttemptStatus;
  result: LoginAttemptResult;
  type: LoginAttemptType;
  timestamp: Timestamp;
  ipAddress: IPAddress;
  deviceId?: string;
  userAgent?: string;
  location?: string;
  country?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  metadata?: Record<string, unknown>;
  failureReason?: string;
  attemptsCount: number;
}

/**
 * Login Attempt Request
 * Request to record a login attempt
 */
export interface LoginAttemptRequest {
  userId?: UserId;
  email: Email;
  type: LoginAttemptType;
  ipAddress: IPAddress;
  deviceId?: string;
  userAgent?: string;
  location?: string;
  country?: string;
  city?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Login Attempt Response
 * Response after recording a login attempt
 */
export interface LoginAttemptResponse {
  success: boolean;
  data?: {
    attemptId: string;
    status: LoginAttemptStatus;
    result: LoginAttemptResult;
    timestamp: Timestamp;
    remainingAttempts: number;
    maxAttempts: number;
    lockoutDuration?: number;
    message: string;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Login Attempt Verification
 * Verification of login attempt
 */
export interface LoginAttemptVerification {
  attemptId: string;
  userId: UserId;
  verified: boolean;
  verifiedAt: Timestamp;
  method: string;
  metadata?: Record<string, unknown>;
}

/**
 * Login Attempt Monitoring
 * Monitoring data for login attempts
 */
export interface LoginAttemptMonitoring {
  userId: UserId;
  totalAttempts: number;
  failedAttempts: number;
  successfulAttempts: number;
  blockedAttempts: number;
  suspiciousAttempts: number;
  lastAttemptAt: Timestamp;
  lastSuccessfulAt?: Timestamp;
  lastFailedAt?: Timestamp;
  consecutiveFailures: number;
  maxConsecutiveFailures: number;
  isRisky: boolean;
  riskScore: number;
  metadata?: Record<string, unknown>;
}

/**
 * Login Attempt Analytics
 * Analytics data for login attempts
 */
export interface LoginAttemptAnalytics {
  period: string;
  totalAttempts: number;
  uniqueUsers: number;
  successRate: number;
  failureRate: number;
  blockedRate: number;
  byStatus: Record<LoginAttemptStatus, number>;
  byResult: Record<LoginAttemptResult, number>;
  byType: Record<LoginAttemptType, number>;
  byIpAddress: Record<string, number>;
  byLocation: Record<string, number>;
  byDevice: Record<string, number>;
  peakAttempts: number;
  peakTimestamp: Timestamp;
  averageAttemptsPerUser: number;
  timestamp: Timestamp;
}

/**
 * Login Attempt Filter
 * Filter criteria for login attempts
 */
export interface LoginAttemptFilter {
  userId?: UserId[];
  email?: Email[];
  status?: LoginAttemptStatus[];
  result?: LoginAttemptResult[];
  type?: LoginAttemptType[];
  ipAddress?: IPAddress[];
  deviceId?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  success?: boolean;
  suspicious?: boolean;
}

/**
 * Login Attempt Statistics
 * Statistical data about login attempts
 */
export interface LoginAttemptStatistics {
  totalAttempts: number;
  successCount: number;
  failureCount: number;
  blockedCount: number;
  successRate: number;
  failureRate: number;
  blockedRate: number;
  uniqueUsers: number;
  uniqueIPs: number;
  averageAttemptsPerUser: number;
  peakHourAttempts: number;
  peakHourTimestamp: Timestamp;
  byDay: Record<string, number>;
  byHour: Record<string, number>;
  byMinute: Record<string, number>;
  timestamp: Timestamp;
}

/**
 * Login Attempt Throttle
 * Throttling configuration for login attempts
 */
export interface LoginAttemptThrottle {
  maxAttempts: number;
  windowDuration: number;
  blockDuration: number;
  enableIPThrottling: boolean;
  enableUserThrottling: boolean;
  enableGlobalThrottling: boolean;
  globalMaxAttempts: number;
  globalWindowDuration: number;
  ipMaxAttempts: number;
  ipWindowDuration: number;
  userMaxAttempts: number;
  userWindowDuration: number;
  escalateAfter: number;
  escalateDuration: number;
}

/**
 * Login Attempt Security
 * Security settings for login attempts
 */
export interface LoginAttemptSecurity {
  maxFailedAttempts: number;
  lockoutDuration: number;
  resetAttemptsAfter: number;
  enableCaptchaAfter: number;
  enableSuspiciousDetection: boolean;
  suspiciousThreshold: number;
  enableIPBlocking: boolean;
  ipBlockDuration: number;
  enableDeviceTracking: boolean;
  enableLocationTracking: boolean;
  enableAnomalyDetection: boolean;
  anomalyThreshold: number;
  requireVerificationAfter: number;
  alertOnSuspicious: boolean;
  alertOnAnomaly: boolean;
}

/**
 * Login Attempt Anomaly
 * Detected anomaly in login attempts
 */
export interface LoginAttemptAnomaly {
  id: string;
  userId?: UserId;
  email: Email;
  type: string;
  description: string;
  detectedAt: Timestamp;
  ipAddress: IPAddress;
  deviceId?: string;
  location?: string;
  metadata?: Record<string, unknown>;
  riskScore: number;
  severity: 'low' | 'medium' | 'high' | 'critical';
  actionTaken: string;
  resolved: boolean;
  resolvedAt?: Timestamp;
}

/**
 * Login Attempt Webhook
 * Webhook payload for login attempt events
 */
export interface LoginAttemptWebhook {
  event: string;
  attemptId: string;
  userId?: UserId;
  email: Email;
  status: LoginAttemptStatus;
  result: LoginAttemptResult;
  timestamp: Timestamp;
  ipAddress: IPAddress;
  data: Record<string, unknown>;
}

/**
 * Login Attempt Response Builder
 * Helper for building login attempt responses
 */
export interface LoginAttemptResponseBuilder {
  success(response: LoginAttemptResponse): LoginAttemptResponse;
  verificationSuccess(response: LoginAttemptVerification): LoginAttemptVerification;
  error(
    code: string,
    message: string,
    details?: Record<string, unknown>
  ): LoginAttemptErrorResponse;
}

/**
 * Login Attempt Error Response
 * Error response for login attempt operations
 */
export interface LoginAttemptErrorResponse {
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
 * Login Attempt Constants
 * Login attempt-related constants
 */
export const LOGIN_ATTEMPT_STATUS = {
  SUCCESS: 'success',
  FAILED: 'failed',
  BLOCKED: 'blocked',
  PENDING: 'pending',
  TIMEOUT: 'timeout',
  SUSPICIOUS: 'suspicious',
  FLAGGED: 'flagged',
  REVIEW_REQUIRED: 'review_required',
} as const;

export const LOGIN_ATTEMPT_RESULT = {
  ALLOWED: 'allowed',
  DENIED: 'denied',
  REQUIRES_MFA: 'requires_mfa',
  REQUIRES_VERIFICATION: 'requires_verification',
  ACCOUNT_LOCKED: 'account_locked',
  THROTTLED: 'throttled',
  BLOCKED_IP: 'blocked_ip',
  INVALID_CREDENTIALS: 'invalid_credentials',
  EXPIRED: 'expired',
  DISABLED: 'disabled',
} as const;

export const LOGIN_ATTEMPT_TYPES = {
  STANDARD: 'standard',
  SOCIAL: 'social',
  MFA: 'mfa',
  OAUTH: 'oauth',
  API: 'api',
  ADMIN: 'admin',
  SERVICE: 'service',
  AUTOMATED: 'automated',
} as const;

/**
 * Default Login Attempt Configuration
 */
export const DEFAULT_LOGIN_ATTEMPT_CONFIG = {
  maxFailedAttempts: 5,
  lockoutDuration: 900, // 15 minutes
  resetAttemptsAfter: 3600, // 1 hour
  enableCaptchaAfter: 3,
  enableSuspiciousDetection: true,
  suspiciousThreshold: 10,
  enableIPBlocking: true,
  ipBlockDuration: 3600, // 1 hour
  enableDeviceTracking: true,
  enableLocationTracking: true,
  enableAnomalyDetection: true,
  anomalyThreshold: 5,
  requireVerificationAfter: 3,
  alertOnSuspicious: true,
  alertOnAnomaly: true,
} as const;

/**
 * Login Attempt Report
 * Report data for login attempts
 */
export interface LoginAttemptReport {
  period: {
    start: Timestamp;
    end: Timestamp;
  };
  summary: {
    total: number;
    successful: number;
    failed: number;
    blocked: number;
    uniqueUsers: number;
    uniqueIPs: number;
  };
  rates: {
    success: number;
    failure: number;
    blocked: number;
  };
  topUsers: Array<{
    userId: UserId;
    email: Email;
    attempts: number;
    failed: number;
    success: number;
  }>;
  topIPs: Array<{
    ipAddress: IPAddress;
    attempts: number;
    failed: number;
    success: number;
    blocked: number;
  }>;
  trends: Array<{
    timestamp: Timestamp;
    attempts: number;
    success: number;
    failure: number;
  }>;
  anomalies: LoginAttemptAnomaly[];
  generatedAt: Timestamp;
}

/**
 * Login Attempt Alert
 * Alert for login attempt events
 */
export interface LoginAttemptAlert {
  id: string;
  type: 'rate_limit' | 'suspicious' | 'anomaly' | 'brute_force' | 'account_lock' | 'ip_block';
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: UserId;
  email: Email;
  ipAddress: IPAddress;
  message: string;
  details: Record<string, unknown>;
  triggeredAt: Timestamp;
  acknowledged: boolean;
  acknowledgedAt?: Timestamp;
  acknowledgedBy?: UserId;
  resolved: boolean;
  resolvedAt?: Timestamp;
}

/**
 * Login Attempt Cleanup
 * Cleanup configuration for old login attempts
 */
export interface LoginAttemptCleanup {
  retentionDays: number;
  batchSize: number;
  cleanupInterval: number;
  archiveBeforeCleanup: boolean;
  archivePath?: string;
  compressArchive: boolean;
  notifyOnCleanup: boolean;
  notifyEmail: Email[];
}
