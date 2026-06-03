/**
 * Session Types - Pure TypeScript type contracts for Session domain
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/auth-types/auth/session.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO Redis implementation, JWT parsing, runtime logic
 * ✅ NO functions, classes, enums
 * ✅ NO validation schemas (Zod)
 * ✅ NO framework imports
 */

import type {
  SESSION_STATUS
} from '@vubon/shared-constants';

import type { DeviceInfo, LocationInfo } from './device.types';

// ============================================================
// Session Status Types (Based on constants - NO enums)
// ============================================================
export type SessionStatus = typeof SESSION_STATUS[keyof typeof SESSION_STATUS];

// Extended session status for Bangladesh specific scenarios
export type ExtendedSessionStatus = 
  | SessionStatus
  | 'active_remembered'
  | 'active_trusted'
  | 'revoked_by_user'
  | 'revoked_by_admin'
  | 'revoked_by_security'
  | 'suspended_inactivity'
  | 'suspended_suspicious'
  | 'pending_mfa'
  | 'pending_verification'
  | 'pending_network_reconnect';      // Bangladesh specific: poor network areas

// ============================================================
// Session Token Types
// ============================================================
export interface SessionTokens {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresAt: Date;
  readonly refreshTokenExpiresAt: Date;
  readonly tokenId: string;
}

// ============================================================
// Session Entity (Core domain model)
// ============================================================
export interface Session {
  readonly id: string;
  readonly userId: string;
  readonly tokenId: string;                      // JWT token ID (jti)
  readonly refreshTokenId: string;               // Refresh token ID
  readonly status: ExtendedSessionStatus;
  readonly deviceInfo: DeviceInfo;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly location: LocationInfo | null;
  readonly lastActivityAt: Date;
  readonly lastActivityUrl?: string;
  readonly expiresAt: Date;
  readonly idleTimeoutAt: Date;                  // When session expires due to idle
  readonly absoluteTimeoutAt: Date;              // Hard expiry regardless of activity
  readonly createdAt: Date;
  readonly revokedAt: Date | null;
  readonly revokedReason: string | null;
  readonly revokedBy: string | null;             // user_id or 'system'
  readonly trustLevel: number;                   // 0-4 based on TRUST_LEVELS
  readonly trustExpiresAt: Date | null;
  readonly mfaVerified: boolean;
  readonly mfaVerifiedAt: Date | null;
  readonly mfaMethodUsed: string | null;
  
  // Bangladesh specific
  readonly networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
  readonly mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  readonly district?: string;
  readonly upazila?: string;
  readonly dataSaverEnabled?: boolean;
  readonly isFamilyShared?: boolean;
  readonly familyMemberId?: string;
  readonly sessionTransferId?: string;           // For device-to-device transfer
}

// ============================================================
// Session DTO for API Responses
// ============================================================
export interface SessionDTO {
  readonly id: string;
  readonly deviceInfo: DeviceInfo;
  readonly ipAddress: string;
  readonly location: LocationInfo | null;
  readonly lastActivityAt: string;               // ISO date
  readonly expiresAt: string;                    // ISO date
  readonly createdAt: string;                    // ISO date
  readonly isCurrent: boolean;
  readonly trustLevel: number;
  readonly trustLevelName: string;
  readonly isFamilyShared: boolean;
  readonly deviceName: string | null;
}

// ============================================================
// Create Session Request (API DTO)
// ============================================================
export interface CreateSessionRequest {
  readonly userId: string;
  readonly deviceInfo: DeviceInfo;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly trustDevice: boolean;
  readonly trustDurationDays?: number;
  readonly rememberMe?: boolean;
  readonly mfaVerified?: boolean;
  readonly mfaMethodUsed?: string;
  readonly sessionTransferId?: string;
  readonly isFamilyShared?: boolean;
  readonly familyMemberId?: string;
}

// ============================================================
// Create Session Response (API DTO)
// ============================================================
export interface CreateSessionResponse {
  readonly session: SessionDTO;
  readonly tokens: SessionTokens;
  readonly isNewDevice: boolean;
  readonly requiresMFA: boolean;
  readonly trustLevel: number;
  readonly warningMessage?: string;               // For public/shared devices
}

// ============================================================
// Session Validation Result
// ============================================================
export interface SessionValidationResult {
  readonly isValid: boolean;
  readonly session: Session | null;
  readonly userId: string | null;
  readonly error?: SessionError;
  readonly errorDetails?: string;
  readonly requiresMFA: boolean;
  readonly tokenNeedsRefresh: boolean;
  readonly sessionExpiringSoon: boolean;
  readonly expiringInSeconds?: number;
}

// ============================================================
// Session Error Types
// ============================================================
export type SessionError = 
  | 'SESSION_NOT_FOUND'
  | 'SESSION_EXPIRED'
  | 'SESSION_REVOKED'
  | 'SESSION_SUSPENDED'
  | 'SESSION_IDLE_TIMEOUT'
  | 'SESSION_ABSOLUTE_TIMEOUT'
  | 'INVALID_TOKEN'
  | 'TOKEN_MALFORMED'
  | 'TOKEN_EXPIRED'
  | 'TOKEN_REVOKED'
  | 'DEVICE_MISMATCH'
  | 'IP_MISMATCH'
  | 'USER_AGENT_MISMATCH'
  | 'LOCATION_MISMATCH'
  | 'MFA_NOT_VERIFIED'
  | 'SESSION_TRANSFER_PENDING'
  | 'MAX_CONCURRENT_EXCEEDED'
  | 'NETWORK_RECONNECT_REQUIRED';                // Bangladesh specific

// ============================================================
// Session Refresh Request/Response
// ============================================================
export interface RefreshSessionRequest {
  readonly refreshToken: string;
  readonly deviceInfo?: Partial<DeviceInfo>;
  readonly ipAddress?: string;
  readonly userAgent?: string;
}

export interface RefreshSessionResponse {
  readonly accessToken: string;
  readonly refreshToken: string;
  readonly accessTokenExpiresIn: number;
  readonly refreshTokenExpiresIn: number;
  readonly sessionId: string;
  readonly tokenId: string;
}

// ============================================================
// Session Termination Request
// ============================================================
export interface TerminateSessionRequest {
  readonly sessionId: string;
  readonly userId: string;
  readonly reason?: string;
  readonly revokedBy?: string;                   // 'user' | 'admin' | 'system'
}

// ============================================================
// Session Termination Options (Bulk operations)
// ============================================================
export interface TerminateSessionsOptions {
  readonly userId: string;
  readonly exceptSessionId?: string;
  readonly exceptDeviceIds?: readonly string[];
  readonly allDevices?: boolean;
  readonly deviceTypes?: readonly string[];
  readonly status?: readonly ExtendedSessionStatus[];
  readonly olderThan?: Date;
  readonly reason?: string;
  readonly revokedBy: string;
}

export interface TerminateSessionsResult {
  readonly totalTerminated: number;
  readonly terminatedSessionIds: readonly string[];
  readonly failedCount: number;
  readonly failedReason?: string;
}

// ============================================================
// Session Transfer (Device to device - Bangladesh specific)
// ============================================================
export interface SessionTransferRequest {
  readonly fromSessionId: string;
  readonly toDeviceInfo: DeviceInfo;
  readonly transferMethod: 'qr_code' | 'magic_link' | 'otp';
  readonly transferCode?: string;
  readonly userId: string;
}

export interface SessionTransferResponse {
  readonly transferId: string;
  readonly transferMethod: string;
  readonly qrCodeUrl?: string;
  readonly magicLink?: string;
  readonly otpSent?: boolean;
  readonly expiresAt: Date;
  readonly status: 'pending' | 'completed' | 'expired';
}

// ============================================================
// Session Metadata (For audit & logging)
// ============================================================
export interface SessionMetadata {
  readonly sessionId: string;
  readonly userId: string;
  readonly ipAddress: string;
  readonly userAgent: string;
  readonly deviceId: string;
  readonly action: SessionAction;
  readonly timestamp: Date;
  readonly metadata: Record<string, unknown>;
}

export type SessionAction = 
  | 'created'
  | 'refreshed'
  | 'validated'
  | 'terminated'
  | 'expired'
  | 'suspended'
  | 'transferred'
  | 'trust_escalated'
  | 'trust_deescalated';

// ============================================================
// Session Statistics (For admin dashboard)
// ============================================================
export interface SessionStatistics {
  readonly totalActive: number;
  readonly totalExpired: number;
  readonly totalRevoked: number;
  readonly totalSuspended: number;
  readonly averageSessionDurationSeconds: number;
  readonly medianSessionDurationSeconds: number;
  
  readonly sessionsByStatus: Record<ExtendedSessionStatus, number>;
  readonly sessionsByDeviceType: Record<string, number>;
  readonly sessionsByNetworkType: Record<string, number>;      // Bangladesh specific
  
  readonly sessionsPerUser: ReadonlyArray<{
    readonly userId: string;
    readonly email: string;
    readonly count: number;
    readonly activeCount: number;
  }>;
  
  readonly activeSessionsByHour: ReadonlyArray<{
    readonly hour: string;
    readonly count: number;
  }>;
  
  readonly mostActiveDevices: ReadonlyArray<{
    readonly deviceId: string;
    readonly sessionCount: number;
    readonly userIds: readonly string[];
  }>;
  
  readonly suspiciousSessions: number;
  readonly sessionsNeedingCleanup: number;
}

// ============================================================
// Session Cleanup Criteria
// ============================================================
export interface SessionCleanupCriteria {
  readonly olderThan?: Date;
  readonly status?: readonly ExtendedSessionStatus[];
  readonly userId?: string;
  readonly deviceId?: string;
  readonly limit?: number;
  readonly batchSize?: number;
}

export interface SessionCleanupResult {
  readonly totalDeleted: number;
  readonly archivedCount: number;
  readonly failedCount: number;
  readonly cleanupCompletedAt: Date;
  readonly cleanupDurationMs: number;
}

// ============================================================
// Session Filter Options (For list APIs)
// ============================================================
export interface SessionFilterOptions {
  readonly userId?: string;
  readonly status?: ExtendedSessionStatus;
  readonly deviceId?: string;
  readonly deviceType?: string;
  readonly ipAddress?: string;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly isCurrent?: boolean;
  readonly isFamilyShared?: boolean;
  readonly networkType?: string;                     // Bangladesh specific
  readonly limit?: number;
  readonly offset?: number;
  readonly sortBy?: 'createdAt' | 'lastActivityAt' | 'expiresAt';
  readonly sortOrder?: 'asc' | 'desc';
}

// ============================================================
// Session Webhook Events
// ============================================================
export type SessionWebhookEventType = 
  | 'session.created'
  | 'session.refreshed'
  | 'session.terminated'
  | 'session.expired'
  | 'session.suspended'
  | 'session.transferred'
  | 'session.max_concurrent_reached';

export interface SessionWebhookPayload {
  readonly eventType: SessionWebhookEventType;
  readonly userId: string;
  readonly sessionId: string;
  readonly timestamp: Date;
  readonly deviceInfo: DeviceInfo;
  readonly ipAddress: string;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// Session Alert Configuration
// ============================================================
export interface SessionAlertConfig {
  readonly enabled: boolean;
  readonly alertOnNewDevice: boolean;
  readonly alertOnNewLocation: boolean;
  readonly alertOnMaxConcurrent: boolean;
  readonly alertOnSuspiciousActivity: boolean;
  readonly alertOnSessionTransfer: boolean;
  readonly channels: ReadonlyArray<'email' | 'sms' | 'push'>;
  readonly cooldownMinutes: number;                 // Prevent spam
}

// ============================================================
// Session Heartbeat (For keeping session alive)
// ============================================================
export interface SessionHeartbeatRequest {
  readonly sessionId: string;
  readonly userId: string;
  readonly currentUrl?: string;
  readonly activityType: 'page_view' | 'api_call' | 'user_interaction';
}

export interface SessionHeartbeatResponse {
  readonly success: boolean;
  readonly sessionExtended: boolean;
  readonly newExpiresAt?: Date;
  readonly remainingIdleSeconds: number;
  readonly warningThresholdReached: boolean;
}

// ============================================================
// Session Public Device Warning (Bangladesh specific)
// ============================================================
export interface PublicDeviceWarning {
  readonly showWarning: boolean;
  readonly warningMessage: string;
  readonly warningMessageBn?: string;
  readonly dontSavePasswordMessage: string;
  readonly clearDataOnLogoutMessage: string;
  readonly autoLogoutMinutes: number;
}
