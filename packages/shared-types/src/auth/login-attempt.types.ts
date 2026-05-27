/**
 * Login Attempt Types - Pure TypeScript type contracts for Login Tracking
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth-types/auth/login-attempt.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO rate limiting implementation, attempt validation logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  ACCOUNT_LOCKOUT,
  AUTH_RATE_LIMITS,
} from '@vubon/auth-constants';

// ============================================================
// Login Attempt Status (Pure union type - NO enums)
// ============================================================
export type LoginAttemptStatus = 
  | 'success'           // Successful login
  | 'failed'            // Failed login (invalid credentials)
  | 'locked'            // Account is locked
  | 'mfa_required'      // MFA verification needed
  | 'mfa_failed'        // MFA verification failed
  | 'expired'           // Attempt expired
  | 'blocked'           // IP or account blocked
  | 'pending_verification'  // Email/phone not verified
  | 'suspicious'        // Suspicious activity detected
  | 'rate_limited'      // Rate limit exceeded;

// ============================================================
// Login Failure Reasons (Detailed categorization)
// ============================================================
export type LoginFailureReason = 
  // Credential issues
  | 'invalid_credentials'
  | 'invalid_email'
  | 'invalid_password'
  | 'password_expired'
  
  // Account status issues
  | 'account_locked'
  | 'account_suspended'
  | 'account_banned'
  | 'account_deleted'
  | 'account_inactive'
  
  // Verification issues
  | 'email_not_verified'
  | 'phone_not_verified'
  | 'kyc_not_completed'
  
  // MFA issues
  | 'mfa_failed'
  | 'mfa_required'
  | 'mfa_not_enrolled'
  | 'mfa_method_unavailable'
  
  // Security issues
  | 'rate_limited'
  | 'blocked_ip'
  | 'blocked_device'
  | 'suspicious_activity'
  | 'too_many_attempts'
  | 'brute_force_detected'
  | 'sim_swap_detected'        // Bangladesh specific
  
  // Network/location issues
  | 'unusual_location'
  | 'unusual_device'
  | 'unusual_time'
  | 'vpn_detected'
  | 'proxy_detected'
  
  // Technical issues
  | 'internal_error'
  | 'timeout'
  | 'service_unavailable';

// ============================================================
// Login Attempt Entity (Core domain model)
// ============================================================
export interface LoginAttempt {
  readonly id: string;
  readonly userId: string | null;           // null for unknown/non-existent user
  readonly email: string;
  readonly phoneNumber?: string;             // Bangladesh specific (phone login)
  readonly status: LoginAttemptStatus;
  readonly failureReason?: LoginFailureReason;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId?: string;
  readonly sessionId?: string;
  readonly location?: LocationInfo;
  readonly attemptedAt: Date;
  readonly metadata: LoginAttemptMetadata;
}

// ============================================================
// Location Information (Bangladesh specific)
// ============================================================
export interface LocationInfo {
  readonly country: string;
  readonly countryCode: string;
  readonly city: string;
  readonly district?: string;               // Bangladesh district
  readonly upazila?: string;                // Bangladesh upazila
  readonly postalCode?: string;
  readonly latitude?: number;
  readonly longitude?: number;
  readonly timezone?: string;
  readonly isp?: string;
  readonly asn?: string;                    // Autonomous System Number
  readonly isProxy?: boolean;
  readonly isVpn?: boolean;
  readonly isTor?: boolean;
}

// ============================================================
// Login Attempt Metadata
// ============================================================
export interface LoginAttemptMetadata {
  readonly mfaMethod?: string;               // 'totp', 'sms', 'email', 'backup_code'
  readonly mfaSuccess?: boolean;
  readonly mfaAttemptCount?: number;
  readonly sessionId?: string;
  readonly tokenId?: string;
  readonly captchaVerified?: boolean;
  readonly riskScore?: number;               // 0-100
  readonly riskLevel?: 'low' | 'medium' | 'high' | 'critical';
  readonly userAgentHash?: string;
  readonly fingerprintHash?: string;
  readonly referer?: string;
  
  // Bangladesh specific
  readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  readonly isWeekend?: boolean;              // Friday/Saturday in BD
  readonly isNightTime?: boolean;            // 10 PM - 6 AM
  readonly attemptedViaMFS?: boolean;        // bKash/Nagad login
}

// ============================================================
// Create Login Attempt Request (API DTO)
// ============================================================
export interface CreateLoginAttemptRequest {
  readonly email?: string;
  readonly phoneNumber?: string;             // Bangladesh specific
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId?: string;
  readonly sessionId?: string;
  readonly captchaToken?: string;
  readonly metadata?: Partial<LoginAttemptMetadata>;
}

// ============================================================
// Login Attempt Response (API DTO)
// ============================================================
export interface LoginAttemptResponse {
  readonly success: boolean;
  readonly status: LoginAttemptStatus;
  readonly failureReason?: LoginFailureReason;
  readonly requiresMfa: boolean;
  readonly mfaMethods?: ReadonlyArray<string>;
  readonly userId?: string;
  readonly sessionId?: string;
  readonly accessToken?: string;
  readonly refreshToken?: string;
  readonly expiresIn?: number;
  readonly remainingLockTime?: number;       // If account locked
  readonly retryAfterSeconds?: number;       // If rate limited
}

// ============================================================
// Login Attempt DTO (For list/history responses)
// ============================================================
export interface LoginAttemptDTO {
  readonly id: string;
  readonly status: LoginAttemptStatus;
  readonly attemptedAt: string;              // ISO date string
  readonly ipAddress: string;
  readonly location?: LocationInfo;
  readonly deviceInfo?: DeviceSummary;
  readonly failureReason?: LoginFailureReason;
}

// Device summary for login history
export interface DeviceSummary {
  readonly deviceType: string;
  readonly os: string;
  readonly browser: string;
  readonly isMobile: boolean;
}

// ============================================================
// Login Attempt Statistics
// ============================================================
export interface LoginAttemptStatistics {
  readonly totalAttempts: number;
  readonly successAttempts: number;
  readonly failedAttempts: number;
  readonly lockedAttempts: number;
  readonly mfaRequiredAttempts: number;
  readonly successRate: number;               // Percentage (0-100)
  readonly failureRate: number;               // Percentage (0-100)
  
  readonly recentAttempts: ReadonlyArray<LoginAttemptDTO>;
  
  readonly attemptsByHour: ReadonlyArray<{
    readonly hour: string;                   // ISO hour (2024-01-01T00)
    readonly total: number;
    readonly success: number;
    readonly failed: number;
  }>;
  
  readonly attemptsByStatus: Record<LoginAttemptStatus, number>;
  readonly failuresByReason: Partial<Record<LoginFailureReason, number>>;
  
  readonly uniqueIPs: number;
  readonly uniqueDevices: number;
  
  readonly timeframe: {
    readonly from: Date;
    readonly to: Date;
  };
}

// ============================================================
// Login History Response (Paginated)
// ============================================================
export interface LoginHistoryResponse {
  readonly userId: string;
  readonly attempts: ReadonlyArray<LoginAttemptDTO>;
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}

// ============================================================
// Rate Limit Status (Based on constants)
// ============================================================
export interface RateLimitStatus {
  readonly limited: boolean;
  readonly remaining: number;
  readonly resetAt: Date;
  readonly limit: number;
  readonly windowMs: number;
  readonly retryAfterSeconds?: number;
}

// Rate limit by endpoint type
export type RateLimitEndpoint = keyof typeof AUTH_RATE_LIMITS;

export interface RateLimitConfig {
  readonly endpoint: RateLimitEndpoint;
  readonly maxRequests: number;
  readonly windowMs: number;
  readonly current: number;
  readonly remaining: number;
  readonly resetAt: Date;
}

// ============================================================
// Blocked IP Entity
// ============================================================
export interface BlockedIP {
  readonly ipAddress: string;
  readonly reason: string;
  readonly blockedAt: Date;
  readonly expiresAt: Date | null;           // null = permanent
  readonly blockedBy: string;                // 'system' | admin_id
  readonly attemptCount: number;             // How many failed attempts
  readonly unblockedAt?: Date;
  readonly unblockedBy?: string;
  readonly unblockReason?: string;
}

// Block IP request
export interface BlockIPRequest {
  readonly ipAddress: string;
  readonly reason: string;
  readonly durationSeconds?: number;         // null = permanent
  readonly adminId: string;
}

// Unblock IP request
export interface UnblockIPRequest {
  readonly ipAddress: string;
  readonly reason: string;
  readonly adminId: string;
}

// ============================================================
// Blocked Device Entity (Bangladesh specific)
// ============================================================
export interface BlockedDevice {
  readonly deviceId: string;
  readonly userId?: string;
  readonly reason: string;
  readonly blockedAt: Date;
  readonly expiresAt: Date | null;
  readonly blockedBy: string;
  readonly fingerprintHash: string;
}

// ============================================================
// Suspicious Pattern Detection Result
// ============================================================
export interface SuspiciousPattern {
  readonly detected: boolean;
  readonly pattern: string;
  readonly severity: 'low' | 'medium' | 'high' | 'critical';
  readonly confidence: number;               // 0-100
  readonly affectedUsers: ReadonlyArray<string>;
  readonly affectedIPs: ReadonlyArray<string>;
  readonly affectedDevices: ReadonlyArray<string>;
  readonly timeframe: {
    readonly from: Date;
    readonly to: Date;
  };
  readonly recommendation: string;
  readonly mitigationAction?: MitigationAction;
}

export type MitigationAction = 
  | 'block_ips'
  | 'block_devices'
  | 'require_captcha'
  | 'increase_mfa'
  | 'temporary_lock'
  | 'notify_admin'
  | 'rate_limit_reduce';

// ============================================================
// Pattern Detection Types
// ============================================================
export type SuspiciousPatternType = 
  | 'brute_force'
  | 'credential_stuffing'
  | 'password_spraying'
  | 'ip_rotation'
  | 'distributed_attack'
  | 'slow_loris'
  | 'replay_attack'
  | 'session_hijacking';

export interface PatternDetectionResult {
  readonly patternType: SuspiciousPatternType;
  readonly detected: boolean;
  readonly score: number;                    // 0-100
  readonly indicators: ReadonlyArray<string>;
  readonly affectedEntities: {
    readonly ips: ReadonlyArray<string>;
    readonly users: ReadonlyArray<string>;
    readonly devices: ReadonlyArray<string>;
  };
}

// ============================================================
// Login Alert Configuration
// ============================================================
export interface LoginAlertConfig {
  readonly enabled: boolean;
  readonly notifyOnSuspicious: boolean;
  readonly notifyOnNewDevice: boolean;
  readonly notifyOnNewLocation: boolean;
  readonly notifyOnFailedAttempts: number;   // After X failed attempts
  readonly notifyOnAccountLock: boolean;
  readonly channels: ReadonlyArray<'email' | 'sms' | 'push'>;
}

// Login Alert Event
export interface LoginAlertEvent {
  readonly id: string;
  readonly userId: string;
  readonly type: 'suspicious_login' | 'new_device' | 'new_location' | 'failed_attempts' | 'account_locked';
  readonly severity: 'low' | 'medium' | 'high';
  readonly details: LoginAttemptDTO;
  readonly sentAt: Date;
  readonly sentTo: ReadonlyArray<string>;
  readonly readAt?: Date;
}

// ============================================================
// Login Filter Options (For list APIs)
// ============================================================
export interface LoginAttemptFilterOptions {
  readonly userId?: string;
  readonly email?: string;
  readonly phoneNumber?: string;
  readonly status?: LoginAttemptStatus;
  readonly failureReason?: LoginFailureReason;
  readonly ipAddress?: string;
  readonly deviceId?: string;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'attemptedAt' | 'status' | 'ipAddress';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Login Audit Log (For compliance)
// ============================================================
export interface LoginAuditLog {
  readonly id: string;
  readonly userId: string;
  readonly email: string;
  readonly status: LoginAttemptStatus;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly location?: LocationInfo;
  readonly timestamp: Date;
  readonly sessionId?: string;
  readonly deviceId?: string;
  readonly auditData: Record<string, unknown>;
}

// ============================================================
// Login Webhook Events
// ============================================================
export type LoginWebhookEventType = 
  | 'login.success'
  | 'login.failed'
  | 'login.locked'
  | 'login.suspicious'
  | 'login.new_device'
  | 'login.new_location';

export interface LoginWebhookPayload {
  readonly eventType: LoginWebhookEventType;
  readonly userId: string;
  readonly email: string;
  readonly timestamp: Date;
  readonly ipAddress: string;
  readonly deviceInfo?: DeviceSummary;
  readonly location?: LocationInfo;
  readonly metadata?: Record<string, unknown>;
}

// ============================================================
// Login Attempt Cleanup Configuration
// ============================================================
export interface LoginAttemptCleanupConfig {
  readonly enabled: boolean;
  readonly retentionDays: number;            // How long to keep records
  readonly batchSize: number;
  readonly schedule: string;                 // Cron expression
  readonly archiveEnabled: boolean;
  readonly archiveTableName: string;
}

// ============================================================
// Login Session Recovery (Bangladesh specific)
// ============================================================
export interface LoginRecoveryRequest {
  readonly userId: string;
  readonly deviceId: string;
  readonly recoveryMethod: 'email' | 'sms' | 'mfa_backup' | 'admin';
  readonly recoveryCode?: string;
  readonly trustedDeviceConfirmed: boolean;
  readonly requestReason: string;
}

export interface LoginRecoveryResponse {
  readonly success: boolean;
  readonly recoveryId: string;
  readonly status: 'pending' | 'approved' | 'rejected' | 'expired';
  readonly requiresAdditionalVerification: boolean;
  readonly remainingAttempts?: number;
  readonly expiresAt: Date;
}

// ============================================================
// Failed Attempt Summary (For admin dashboard)
// ============================================================
export interface FailedAttemptSummary {
  readonly period: 'hour' | 'day' | 'week' | 'month';
  readonly totalFailed: number;
  readonly uniqueIPs: number;
  readonly uniqueUsers: number;
  readonly topReasons: ReadonlyArray<{ reason: LoginFailureReason; count: number }>;
  readonly topIPs: ReadonlyArray<{ ip: string; count: number; location?: string }>;
  readonly topEmails: ReadonlyArray<{ email: string; count: number }>;
  readonly trendPercentage: number;          // +10% means increased
}
