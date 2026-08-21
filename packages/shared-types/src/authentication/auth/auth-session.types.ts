/**
 * Authentication Session Types Module
 * Session management types for authentication system
 * Handles user sessions, device tracking, and session lifecycle
 */

import {
  UserId,
  SessionId,
  Timestamp,
  Token,
  RefreshToken,
  IPAddress,
  UserAgent,
  DeviceInfo,
} from './core-primitives.types';
import { SessionInfo } from './auth.types';

/**
 * Session Status
 * Current status of a user session
 */
export type SessionStatus =
  'active' | 'inactive' | 'expired' | 'terminated' | 'suspended' | 'pending';

/**
 * Session Type
 * Type of session based on authentication method
 */
export type SessionType = 'web' | 'mobile' | 'api' | 'oauth' | 'social' | 'service' | 'admin';

/**
 * Session Creation Request
 * Request to create a new session
 */
export interface SessionCreationRequest {
  userId: UserId;
  deviceId: string;
  deviceName?: string;
  deviceType?: 'desktop' | 'mobile' | 'tablet' | 'tv' | 'other';
  ipAddress: IPAddress;
  userAgent: UserAgent;
  sessionType: SessionType;
  rememberMe?: boolean;
  expiresIn?: number;
  location?: string;
  metadata?: Record<string, unknown>;
}

/**
 * Session Creation Response
 * Response after session creation
 */
export interface SessionCreationResponse {
  success: boolean;
  data?: {
    session: SessionInfo;
    tokens: SessionTokens;
    device: DeviceInfo;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Session Tokens
 * Tokens associated with a session
 */
export interface SessionTokens {
  accessToken: Token;
  refreshToken: RefreshToken;
  accessTokenExpiresAt: Timestamp;
  refreshTokenExpiresAt: Timestamp;
}

/**
 * Session Validation Request
 * Request to validate a session
 */
export interface SessionValidationRequest {
  sessionId: SessionId;
  token?: Token;
  refreshToken?: RefreshToken;
  validateIp?: boolean;
  validateDevice?: boolean;
  validateUserAgent?: boolean;
}

/**
 * Session Validation Response
 * Response after session validation
 */
export interface SessionValidationResponse {
  valid: boolean;
  data?: {
    session: SessionInfo;
    user: SessionUserInfo;
    tokens?: SessionTokens;
    isValid: boolean;
    isExpired: boolean;
    isActive: boolean;
    validationErrors: SessionValidationError[];
  };
  timestamp: Timestamp;
}

/**
 * Session Validation Error
 * Error details for session validation
 */
export interface SessionValidationError {
  code: string;
  message: string;
  field?: string;
  timestamp: Timestamp;
}

/**
 * Session User Info
 * User information in session context
 */
export interface SessionUserInfo {
  id: UserId;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  roles: string[];
  permissions: string[];
}

/**
 * Session Update Request
 * Request to update session information
 */
export interface SessionUpdateRequest {
  sessionId: SessionId;
  userId: UserId;
  lastActivityAt?: Timestamp;
  metadata?: Record<string, unknown>;
  deviceInfo?: Partial<DeviceInfo>;
  extendSession?: boolean;
  extendDuration?: number;
}

/**
 * Session Update Response
 * Response after session update
 */
export interface SessionUpdateResponse {
  success: boolean;
  data?: {
    session: SessionInfo;
    updated: boolean;
    updatedFields: string[];
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Session Termination Request Extended
 * Request to terminate a session
 */
export interface SessionTerminateRequestExtended {
  sessionId?: SessionId;
  userId?: UserId;
  deviceId?: string;
  allDevices?: boolean;
  reason?: string;
  force?: boolean;
  invalidateTokens?: boolean;
}

/**
 * Session Termination Response Extended
 * Response after session termination
 */
export interface SessionTerminateResponseExtended {
  success: boolean;
  data?: {
    terminatedSessions: number;
    terminatedSessionIds: SessionId[];
    remainingSessions: number;
    tokensInvalidated: boolean;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Session List Request Extended
 * Request to list user sessions
 */
export interface SessionListRequestExtended {
  userId: UserId;
  status?: SessionStatus[];
  includeInactive?: boolean;
  includeDeviceInfo?: boolean;
  pagination?: SessionPagination;
  sortBy?: SessionSortField;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Session Pagination
 * Pagination parameters for session list
 */
export interface SessionPagination {
  page: number;
  limit: number;
}

/**
 * Session Sort Field
 * Fields to sort sessions by
 */
export type SessionSortField =
  'createdAt' | 'lastActivityAt' | 'expiresAt' | 'deviceName' | 'status';

/**
 * Session List Response Extended
 * Response after listing sessions
 */
export interface SessionListResponseExtended {
  success: boolean;
  data?: {
    sessions: SessionInfo[];
    total: number;
    active: number;
    currentSessionId?: SessionId;
    pagination: SessionPagination;
  };
  error?: string;
  timestamp: Timestamp;
}

/**
 * Session Activity Request
 * Request to log session activity
 */
export interface SessionActivityRequest {
  sessionId: SessionId;
  userId: UserId;
  activityType: string;
  resource?: string;
  action?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: IPAddress;
  userAgent?: UserAgent;
}

/**
 * Session Activity Response
 * Response after logging session activity
 */
export interface SessionActivityResponse {
  success: boolean;
  data?: {
    activityId: string;
    sessionId: SessionId;
    userId: UserId;
    timestamp: Timestamp;
  };
  error?: string;
}

/**
 * Session Activity Log
 * Log entry for session activity
 */
export interface SessionActivityLog {
  id: string;
  sessionId: SessionId;
  userId: UserId;
  activityType: string;
  resource?: string;
  action?: string;
  metadata: Record<string, unknown>;
  ipAddress?: IPAddress;
  userAgent?: UserAgent;
  timestamp: Timestamp;
}

/**
 * Session Statistics
 * Statistical data about sessions
 */
export interface SessionStatistics {
  totalSessions: number;
  activeSessions: number;
  inactiveSessions: number;
  expiredSessions: number;
  terminatedSessions: number;
  averageSessionDuration: number;
  maxSessionDuration: number;
  minSessionDuration: number;
  sessionsByDevice: Record<string, number>;
  sessionsByType: Record<SessionType, number>;
  sessionsLast24Hours: number;
  sessionsLast7Days: number;
  sessionsLast30Days: number;
  timestamp: Timestamp;
}

/**
 * Session Security
 * Security settings for sessions
 */
export interface SessionSecurity {
  requireMFA: boolean;
  requireDeviceVerification: boolean;
  requireIpVerification: boolean;
  requireUserAgentVerification: boolean;
  maxConcurrentSessions: number;
  sessionTimeoutMinutes: number;
  idleTimeoutMinutes: number;
  rememberMeDurationDays: number;
  enforceSessionPerDevice: boolean;
  enforceDeviceLimit: boolean;
  ipWhitelist?: IPAddress[];
  ipBlacklist?: IPAddress[];
}

/**
 * Session Device
 * Device information for session
 */
export interface SessionDevice {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isTrusted: boolean;
  lastUsedAt: Timestamp;
  createdAt: Timestamp;
  metadata?: Record<string, unknown>;
}

/**
 * Session Location
 * Geographic location of session
 */
export interface SessionLocation {
  country?: string;
  countryCode?: string;
  region?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  isp?: string;
  organization?: string;
  asn?: string;
  accuracyRadius?: number;
}

/**
 * Session Metadata
 * Additional session metadata
 */
export interface SessionMetadata {
  createdAt: Timestamp;
  updatedAt: Timestamp;
  lastActivityAt: Timestamp;
  expiresAt: Timestamp;
  terminatedAt?: Timestamp;
  createdBy: UserId;
  updatedBy?: UserId;
  terminatedBy?: UserId;
  tags: string[];
  notes?: string;
  customFields: Record<string, unknown>;
}

/**
 * Session Expiry
 * Session expiry configuration
 */
export interface SessionExpiry {
  absoluteTimeout: number;
  idleTimeout: number;
  rememberMeTimeout: number;
  refreshTokenTimeout: number;
  extendOnActivity: boolean;
  extendOnRefresh: boolean;
}

/**
 * Session Event
 * Session-related events
 */
export interface SessionEvent {
  type: SessionEventType;
  sessionId: SessionId;
  userId: UserId;
  timestamp: Timestamp;
  data: Record<string, unknown>;
}

/**
 * Session Event Type
 * Types of session events
 */
export type SessionEventType =
  | 'session_created'
  | 'session_validated'
  | 'session_updated'
  | 'session_terminated'
  | 'session_expired'
  | 'session_activity'
  | 'session_refreshed'
  | 'session_invalidated'
  | 'device_registered'
  | 'device_unregistered'
  | 'device_trusted'
  | 'device_untrusted'
  | 'location_changed'
  | 'ip_changed'
  | 'user_agent_changed'
  | 'security_violation'
  | 'concurrent_session_exceeded';

/**
 * Session Filter
 * Filter criteria for session queries
 */
export interface SessionFilter {
  userId?: UserId[];
  status?: SessionStatus[];
  sessionType?: SessionType[];
  deviceId?: string[];
  deviceType?: string[];
  dateRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  lastActivityRange?: {
    start: Timestamp;
    end: Timestamp;
  };
  ipAddress?: IPAddress[];
  location?: string[];
}

/**
 * Session Response Builder
 * Helper for building session responses
 */
export interface SessionResponseBuilder {
  createSuccess(response: SessionCreationResponse): SessionCreationResponse;
  validateSuccess(response: SessionValidationResponse): SessionValidationResponse;
  updateSuccess(response: SessionUpdateResponse): SessionUpdateResponse;
  terminateSuccess(response: SessionTerminateResponseExtended): SessionTerminateResponseExtended;
  listSuccess(response: SessionListResponseExtended): SessionListResponseExtended;
  activitySuccess(response: SessionActivityResponse): SessionActivityResponse;
  error(code: string, message: string, details?: Record<string, unknown>): SessionErrorResponse;
}

/**
 * Session Error Response
 * Error response for session operations
 */
export interface SessionErrorResponse {
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
 * Session Constants
 * Session-related constants
 */
export const SESSION_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  EXPIRED: 'expired',
  TERMINATED: 'terminated',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
} as const;

export const SESSION_TYPES = {
  WEB: 'web',
  MOBILE: 'mobile',
  API: 'api',
  OAUTH: 'oauth',
  SOCIAL: 'social',
  SERVICE: 'service',
  ADMIN: 'admin',
} as const;

export const SESSION_EVENTS = {
  CREATED: 'session_created',
  VALIDATED: 'session_validated',
  UPDATED: 'session_updated',
  TERMINATED: 'session_terminated',
  EXPIRED: 'session_expired',
  ACTIVITY: 'session_activity',
  REFRESHED: 'session_refreshed',
  INVALIDATED: 'session_invalidated',
  DEVICE_REGISTERED: 'device_registered',
  DEVICE_UNREGISTERED: 'device_unregistered',
  DEVICE_TRUSTED: 'device_trusted',
  DEVICE_UNTRUSTED: 'device_untrusted',
  LOCATION_CHANGED: 'location_changed',
  IP_CHANGED: 'ip_changed',
  USER_AGENT_CHANGED: 'user_agent_changed',
  SECURITY_VIOLATION: 'security_violation',
  CONCURRENT_SESSION_EXCEEDED: 'concurrent_session_exceeded',
} as const;

/**
 * Default Session Configuration
 */
export const DEFAULT_SESSION_CONFIG = {
  timeout: 3600, // 1 hour
  idleTimeout: 1800, // 30 minutes
  rememberMeDuration: 2592000, // 30 days
  refreshTokenDuration: 604800, // 7 days
  maxConcurrentSessions: 5,
  requireDeviceVerification: true,
  enforceDeviceLimit: true,
} as const;

/**
 * Session Validation Result
 * Result of session validation with detailed status
 */
export interface SessionValidationDetail {
  sessionId: SessionId;
  userId: UserId;
  isValid: boolean;
  isActive: boolean;
  isExpired: boolean;
  isTerminated: boolean;
  isSuspended: boolean;
  tokenValid: boolean;
  refreshTokenValid: boolean;
  deviceValid: boolean;
  ipValid: boolean;
  userAgentValid: boolean;
  errors: SessionValidationError[];
  warnings: string[];
  timestamp: Timestamp;
}

/**
 * Session Cleanup Result
 * Result of session cleanup operation
 */
export interface SessionCleanupResult {
  success: boolean;
  data?: {
    expiredSessionsRemoved: number;
    inactiveSessionsRemoved: number;
    orphanedSessionsRemoved: number;
    tokensInvalidated: number;
    totalRemoved: number;
    timestamp: Timestamp;
  };
  error?: string;
}

/**
 * Session Migration Request
 * Request to migrate session between devices
 */
export interface SessionMigrationRequest {
  fromSessionId: SessionId;
  toDeviceId: string;
  toDeviceName?: string;
  toDeviceType?: string;
  keepOriginalSession?: boolean;
  transferTokens?: boolean;
  transferMetadata?: boolean;
}

/**
 * Session Migration Response
 * Response after session migration
 */
export interface SessionMigrationResponse {
  success: boolean;
  data?: {
    newSessionId: SessionId;
    originalSessionId: SessionId;
    migrated: boolean;
    tokensTransferred: boolean;
    metadataTransferred: boolean;
    timestamp: Timestamp;
  };
  error?: string;
}

/**
 * Session Security Violation
 * Security violation detected in session
 */
export interface SessionSecurityViolation {
  sessionId: SessionId;
  userId: UserId;
  violationType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  details: Record<string, unknown>;
  detectedAt: Timestamp;
  actionTaken: string;
  reported: boolean;
}
