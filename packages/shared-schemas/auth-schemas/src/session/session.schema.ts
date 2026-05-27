/**
 * Session Schemas - Pure validation for session management
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth-schemas/src/session/session.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO Redis storage, session revocation logic, JWT handling
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
import {
  SESSION_STATUS,
  SESSION_TTL,
  SESSION_SECURITY,
  SESSION_EVENTS,
  DEVICE_TYPES,
} from '@vubon/auth-constants';

import { DeviceInfoSchema } from './device.schema';

// ==================== Primitives (Reusable) ====================

// Session ID Schema
export const SessionIdSchema = z.string().uuid('Invalid session ID format').brand('SessionId');

// Refresh Token Schema
export const RefreshTokenSchema = z
  .string()
  .min(32, 'Invalid refresh token format')
  .max(512, 'Refresh token too long')
  .regex(/^[a-zA-Z0-9\-_]+$/, 'Refresh token contains invalid characters')
  .brand('RefreshToken');

// Access Token Schema
export const AccessTokenSchema = z
  .string()
  .min(32, 'Invalid access token format')
  .max(2048, 'Access token too long')
  .brand('AccessToken');

// Token ID Schema (JTI - JWT ID)
export const TokenIdSchema = z.string().uuid('Invalid token ID format').brand('TokenId');

// Session Status Schema (Based on constants)
export const SessionStatusSchema = z.enum([
  SESSION_STATUS.ACTIVE,
  SESSION_STATUS.EXPIRED,
  SESSION_STATUS.REVOKED,
  SESSION_STATUS.SUSPENDED,
  // Extended statuses
  'active_remembered',
  'active_trusted',
  'revoked_by_user',
  'revoked_by_admin',
  'revoked_by_security',
  'suspended_inactivity',
  'suspended_suspicious',
  'pending_mfa',
  'pending_verification',
  'pending_network_reconnect',
]);

// Session Trust Level Schema
export const SessionTrustLevelSchema = z.enum([
  'untrusted',
  'standard',
  'trusted',
  'high_trust',
  'maximum_trust',
]);

// ==================== Domain Schemas ====================

// Location Info Schema (Bangladesh specific)
export const LocationInfoSchema = z
  .object({
    country: z.string().optional(),
    countryCode: z.string().length(2).optional(),
    city: z.string().optional(),
    district: z.string().optional(),      // Bangladesh specific
    upazila: z.string().optional(),       // Bangladesh specific
    postalCode: z.string().optional(),
    latitude: z.number().min(-90).max(90).nullable(),
    longitude: z.number().min(-180).max(180).nullable(),
    timezone: z.string().optional(),
    isp: z.string().optional(),
    isProxy: z.boolean().optional(),
    isVpn: z.boolean().optional(),
    isTor: z.boolean().optional(),
  })
  .strict()
  .brand('LocationInfo');

// Session Tokens Schema
export const SessionTokensSchema = z
  .object({
    accessToken: AccessTokenSchema,
    refreshToken: RefreshTokenSchema,
    accessTokenExpiresAt: z.date(),
    refreshTokenExpiresAt: z.date(),
    tokenId: TokenIdSchema,
  })
  .strict()
  .brand('SessionTokens');

// Session Entity Schema (Core domain model)
export const SessionSchema = z
  .object({
    id: SessionIdSchema,
    userId: z.string().uuid(),
    tokenId: TokenIdSchema,
    refreshTokenId: TokenIdSchema,
    status: SessionStatusSchema,
    deviceInfo: DeviceInfoSchema,
    ipAddress: z.string().ip('Invalid IP address format'),
    userAgent: z.string().max(1000, 'User agent too long'),
    location: LocationInfoSchema.nullable(),
    lastActivityAt: z.date(),
    lastActivityUrl: z.string().optional(),
    expiresAt: z.date(),
    idleTimeoutAt: z.date(),
    absoluteTimeoutAt: z.date(),
    createdAt: z.date(),
    revokedAt: z.date().nullable(),
    revokedReason: z.string().max(500).optional(),
    revokedBy: z.string().uuid().nullable(),
    trustLevel: SessionTrustLevelSchema.default('untrusted'),
    trustExpiresAt: z.date().nullable(),
    mfaVerified: z.boolean().default(false),
    mfaVerifiedAt: z.date().nullable(),
    mfaMethodUsed: z.string().nullable(),
    // Bangladesh specific
    networkType: z.enum(['2g', '3g', '4g', '5g', 'wifi', 'unknown']).optional(),
    mobileOperator: z.enum(['gp', 'robi', 'banglalink', 'teletalk', 'unknown']).optional(),
    district: z.string().optional(),
    upazila: z.string().optional(),
    dataSaverEnabled: z.boolean().optional(),
    isFamilyShared: z.boolean().default(false),
    familyMemberId: z.string().uuid().optional(),
    sessionTransferId: z.string().uuid().optional(),
  })
  .strict()
  .brand('Session');

// ==================== Request Schemas ====================

// Create Session Request
export const CreateSessionSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID'),
    deviceInfo: DeviceInfoSchema,
    ipAddress: z.string().ip('Invalid IP address'),
    userAgent: z.string().max(1000, 'User agent too long'),
    trustDevice: z.boolean().default(false),
    trustDurationDays: z.number().int().min(1).max(365).optional(),
    rememberMe: z.boolean().default(false),
    mfaVerified: z.boolean().default(false),
    mfaMethodUsed: z.string().optional(),
    sessionTransferId: z.string().uuid().optional(),
    isFamilyShared: z.boolean().default(false),
    familyMemberId: z.string().uuid().optional(),
  })
  .strict()
  .brand('CreateSessionRequest');

// Create Session Response Schema
export const CreateSessionResponseSchema = z
  .object({
    session: z.object({
      id: SessionIdSchema,
      deviceInfo: DeviceInfoSchema,
      ipAddress: z.string().ip(),
      location: LocationInfoSchema.nullable(),
      lastActivityAt: z.date(),
      expiresAt: z.date(),
      createdAt: z.date(),
      isCurrent: z.boolean().default(true),
      trustLevel: SessionTrustLevelSchema,
    }),
    tokens: SessionTokensSchema,
    isNewDevice: z.boolean(),
    requiresMFA: z.boolean(),
    trustLevel: SessionTrustLevelSchema,
    warningMessage: z.string().optional(),
  })
  .strict()
  .brand('CreateSessionResponse');

// Refresh Session Request
export const RefreshSessionSchema = z
  .object({
    refreshToken: RefreshTokenSchema,
    deviceInfo: DeviceInfoSchema.partial().optional(),
    ipAddress: z.string().ip().optional(),
    userAgent: z.string().max(1000).optional(),
  })
  .strict()
  .brand('RefreshSessionRequest');

// Refresh Session Response
export const RefreshSessionResponseSchema = z
  .object({
    accessToken: AccessTokenSchema,
    refreshToken: RefreshTokenSchema,
    accessTokenExpiresIn: z.number().int().positive(),
    refreshTokenExpiresIn: z.number().int().positive(),
    sessionId: SessionIdSchema,
    tokenId: TokenIdSchema,
  })
  .strict()
  .brand('RefreshSessionResponse');

// Terminate Session Request
export const TerminateSessionSchema = z
  .object({
    sessionId: SessionIdSchema,
    userId: z.string().uuid('Invalid user ID'),
    reason: z.string().max(500).optional(),
    revokedBy: z.enum(['user', 'admin', 'system']).default('user'),
  })
  .strict()
  .brand('TerminateSessionRequest');

// Terminate Sessions Request (Bulk)
export const TerminateSessionsSchema = z
  .object({
    userId: z.string().uuid('Invalid user ID'),
    exceptSessionId: SessionIdSchema.optional(),
    exceptDeviceIds: z.array(z.string()).optional(),
    allDevices: z.boolean().default(false),
    deviceTypes: z.array(z.string()).optional(),
    status: z.array(SessionStatusSchema).optional(),
    olderThan: z.date().optional(),
    reason: z.string().max(500).optional(),
    revokedBy: z.enum(['user', 'admin', 'system']).default('user'),
  })
  .strict()
  .brand('TerminateSessionsRequest');

// Terminate Sessions Response
export const TerminateSessionsResponseSchema = z
  .object({
    totalTerminated: z.number().int().min(0),
    terminatedSessionIds: z.array(SessionIdSchema),
    failedCount: z.number().int().min(0),
    failedReason: z.string().optional(),
  })
  .strict()
  .brand('TerminateSessionsResponse');

// Validate Session Request
export const ValidateSessionSchema = z
  .object({
    token: AccessTokenSchema,
    ipAddress: z.string().ip().optional(),
    userAgent: z.string().max(1000).optional(),
    deviceId: z.string().optional(),
  })
  .strict()
  .brand('ValidateSessionRequest');

// Session Validation Response
export const SessionValidationResponseSchema = z
  .object({
    isValid: z.boolean(),
    session: z
      .object({
        id: SessionIdSchema,
        userId: z.string().uuid(),
        deviceInfo: DeviceInfoSchema,
        ipAddress: z.string().ip(),
        location: LocationInfoSchema.nullable(),
        lastActivityAt: z.date(),
        expiresAt: z.date(),
        createdAt: z.date(),
        isCurrent: z.boolean(),
        trustLevel: SessionTrustLevelSchema,
        mfaVerified: z.boolean(),
      })
      .nullable(),
    userId: z.string().uuid().nullable(),
    error: z
      .enum([
        'SESSION_NOT_FOUND',
        'SESSION_EXPIRED',
        'SESSION_REVOKED',
        'SESSION_SUSPENDED',
        'SESSION_IDLE_TIMEOUT',
        'SESSION_ABSOLUTE_TIMEOUT',
        'INVALID_TOKEN',
        'TOKEN_MALFORMED',
        'TOKEN_EXPIRED',
        'TOKEN_REVOKED',
        'DEVICE_MISMATCH',
        'IP_MISMATCH',
        'USER_AGENT_MISMATCH',
        'LOCATION_MISMATCH',
        'MFA_NOT_VERIFIED',
        'SESSION_TRANSFER_PENDING',
        'MAX_CONCURRENT_EXCEEDED',
        'NETWORK_RECONNECT_REQUIRED',
      ])
      .optional(),
    errorDetails: z.string().optional(),
    requiresMFA: z.boolean().default(false),
    tokenNeedsRefresh: z.boolean().default(false),
    sessionExpiringSoon: z.boolean().default(false),
    expiringInSeconds: z.number().int().optional(),
  })
  .strict()
  .brand('SessionValidationResponse');

// Session Heartbeat Request (Keep session alive)
export const SessionHeartbeatSchema = z
  .object({
    sessionId: SessionIdSchema,
    userId: z.string().uuid('Invalid user ID'),
    currentUrl: z.string().url().optional(),
    activityType: z.enum(['page_view', 'api_call', 'user_interaction']).default('page_view'),
  })
  .strict()
  .brand('SessionHeartbeatRequest');

// Session Heartbeat Response
export const SessionHeartbeatResponseSchema = z
  .object({
    success: z.boolean(),
    sessionExtended: z.boolean(),
    newExpiresAt: z.date().optional(),
    remainingIdleSeconds: z.number().int().min(0),
    warningThresholdReached: z.boolean(),
  })
  .strict()
  .brand('SessionHeartbeatResponse');

// Session Filter Schema (For listing sessions)
export const SessionFilterSchema = z
  .object({
    userId: z.string().uuid().optional(),
    status: SessionStatusSchema.optional(),
    deviceId: z.string().optional(),
    deviceType: z.enum([
      DEVICE_TYPES.DESKTOP,
      DEVICE_TYPES.LAPTOP,
      DEVICE_TYPES.MOBILE,
      DEVICE_TYPES.TABLET,
    ]).optional(),
    ipAddress: z.string().ip().optional(),
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
    isCurrent: z.boolean().optional(),
    isFamilyShared: z.boolean().optional(),
    networkType: z.enum(['2g', '3g', '4g', '5g', 'wifi', 'unknown']).optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sortBy: z.enum(['createdAt', 'lastActivityAt', 'expiresAt']).default('lastActivityAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict()
  .brand('SessionFilterRequest');

// Session List Response
export const SessionListResponseSchema = z
  .object({
    sessions: z.array(
      z.object({
        id: SessionIdSchema,
        deviceInfo: DeviceInfoSchema,
        ipAddress: z.string().ip(),
        location: LocationInfoSchema.nullable(),
        lastActivityAt: z.date(),
        expiresAt: z.date(),
        createdAt: z.date(),
        isCurrent: z.boolean(),
        trustLevel: SessionTrustLevelSchema,
      })
    ),
    total: z.number().int().min(0),
    page: z.number().int().positive(),
    limit: z.number().int().min(1).max(100),
    totalPages: z.number().int().min(0),
  })
  .strict()
  .brand('SessionListResponse');

// Session Statistics Response (For admin dashboard)
export const SessionStatisticsResponseSchema = z
  .object({
    totalActive: z.number().int(),
    totalExpired: z.number().int(),
    totalRevoked: z.number().int(),
    totalSuspended: z.number().int(),
    averageSessionDurationSeconds: z.number().min(0),
    medianSessionDurationSeconds: z.number().min(0),
    sessionsByStatus: z.record(SessionStatusSchema, z.number().int()),
    sessionsByDeviceType: z.record(z.string(), z.number().int()),
    sessionsByNetworkType: z.record(z.string(), z.number().int()),
    sessionsPerUser: z.array(
      z.object({
        userId: z.string().uuid(),
        email: z.string().email(),
        count: z.number().int(),
        activeCount: z.number().int(),
      })
    ),
    activeSessionsByHour: z.array(
      z.object({
        hour: z.string(),
        count: z.number().int(),
      })
    ),
    suspiciousSessions: z.number().int(),
    sessionsNeedingCleanup: z.number().int(),
  })
  .strict()
  .brand('SessionStatisticsResponse');

// ==================== Error Schemas ====================

export const SessionErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'session_not_found',
      'session_expired',
      'session_revoked',
      'session_suspended',
      'max_concurrent_sessions_exceeded',
      'invalid_refresh_token',
      'invalid_access_token',
      'token_blacklisted',
      'device_not_trusted',
      'location_changed',
      'ip_changed',
      'user_agent_changed',
      'network_disconnected',
    ]),
    remainingSessions: z.number().int().optional(),
    retryAfterSeconds: z.number().int().optional(),
  })
  .strict()
  .brand('SessionError');

// ==================== Type Exports ====================

export type SessionId = z.infer<typeof SessionIdSchema>;
export type RefreshToken = z.infer<typeof RefreshTokenSchema>;
export type AccessToken = z.infer<typeof AccessTokenSchema>;
export type TokenId = z.infer<typeof TokenIdSchema>;
export type SessionStatus = z.infer<typeof SessionStatusSchema>;
export type SessionTrustLevel = z.infer<typeof SessionTrustLevelSchema>;
export type LocationInfo = z.infer<typeof LocationInfoSchema>;
export type SessionTokens = z.infer<typeof SessionTokensSchema>;
export type Session = z.infer<typeof SessionSchema>;

export type CreateSessionRequest = z.infer<typeof CreateSessionSchema>;
export type CreateSessionResponse = z.infer<typeof CreateSessionResponseSchema>;
export type RefreshSessionRequest = z.infer<typeof RefreshSessionSchema>;
export type RefreshSessionResponse = z.infer<typeof RefreshSessionResponseSchema>;
export type TerminateSessionRequest = z.infer<typeof TerminateSessionSchema>;
export type TerminateSessionsRequest = z.infer<typeof TerminateSessionsSchema>;
export type TerminateSessionsResponse = z.infer<typeof TerminateSessionsResponseSchema>;
export type ValidateSessionRequest = z.infer<typeof ValidateSessionSchema>;
export type SessionValidationResponse = z.infer<typeof SessionValidationResponseSchema>;
export type SessionHeartbeatRequest = z.infer<typeof SessionHeartbeatSchema>;
export type SessionHeartbeatResponse = z.infer<typeof SessionHeartbeatResponseSchema>;
export type SessionFilterRequest = z.infer<typeof SessionFilterSchema>;
export type SessionListResponse = z.infer<typeof SessionListResponseSchema>;
export type SessionStatisticsResponse = z.infer<typeof SessionStatisticsResponseSchema>;
export type SessionError = z.infer<typeof SessionErrorSchema>;
