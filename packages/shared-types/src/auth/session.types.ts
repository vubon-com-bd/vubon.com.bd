/**
 * Session-related type definitions for the monorepo
 * All session types are centralized here for consistent usage across packages
 */

import type { SessionDeviceType, SessionOSType, SessionBrowserType } from '@vubon/shared-constants';

/**
 * Session status types
 * Represents the current state of a user session
 */
export type SessionStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED' | 'SUSPENDED' | 'PENDING';

/**
 * Device information interface
 * Contains detailed information about the device used for the session
 */
export interface DeviceInfo {
  /** Unique device identifier */
  deviceId: string;
  /** Device type (e.g., 'desktop', 'mobile', 'tablet') */
  type: SessionDeviceType;
  /** Device name (user-provided or system-generated) */
  name?: string;
  /** Operating system of the device */
  os: SessionOSType;
  /** Operating system version */
  osVersion?: string;
  /** Browser name or application name */
  browser: SessionBrowserType;
  /** Browser version */
  browserVersion?: string;
  /** Whether the device is a mobile device */
  isMobile: boolean;
  /** Device manufacturer */
  manufacturer?: string;
  /** Device model */
  model?: string;
  /** Screen resolution */
  screenResolution?: string;
}

/**
 * Session interface
 * Represents a user session in the system
 */
export interface Session {
  /** Unique session identifier */
  id: string;
  /** User ID associated with the session */
  userId: string;
  /** Session token for authentication */
  token: string;
  /** Refresh token for obtaining new access tokens */
  refreshToken: string;
  /** Refresh token ID for tracking refresh token usage */
  refreshTokenId: string;
  /** Token version for invalidation on password change */
  tokenVersion: number;
  /** Device information for the session */
  deviceInfo: DeviceInfo;
  /** IP address of the client */
  ipAddress: string;
  /** User agent string from the client */
  userAgent: string;
  /** Session expiry timestamp */
  expiresAt: Date;
  /** Timestamp of last activity */
  lastActivityAt: Date;
  /** Current status of the session */
  status: SessionStatus;
  /** Session creation timestamp */
  createdAt: Date;
  /** Session last update timestamp */
  updatedAt: Date;
}

/**
 * Session list response interface
 * Used for paginated session lists
 */
export interface SessionListResponse {
  /** Array of sessions */
  sessions: Session[];
  /** Total number of sessions */
  total: number;
  /** Current page number */
  page?: number;
  /** Number of sessions per page */
  limit?: number;
}

/**
 * Logout request interface
 * Used when logging out from one or more sessions
 */
export interface LogoutRequest {
  /** Session ID to logout from (optional) */
  sessionId?: string;
  /** Whether to logout from all devices */
  allDevices?: boolean;
  /** Reason for logout */
  reason?: string;
}

/**
 * Logout response interface
 * Response after logout operation
 */
export interface LogoutResponse {
  /** Whether the logout was successful */
  success: boolean;
  /** Response message */
  message: string;
  /** Number of sessions that were revoked */
  revokedSessionsCount?: number;
}

/**
 * Revoke session request interface
 * Used to revoke a specific session
 */
export interface RevokeSessionRequest {
  /** Session ID to revoke */
  sessionId: string;
}

/**
 * Revoke all sessions request interface
 * Used to revoke all sessions except the current one
 */
export interface RevokeAllSessionsRequest {
  /** Whether to exclude the current session */
  exceptCurrent?: boolean;
}

/**
 * Session creation request interface
 * Used when creating a new session
 */
export interface CreateSessionRequest {
  /** User ID for the session */
  userId: string;
  /** Device information */
  deviceInfo: Omit<DeviceInfo, 'deviceId'>;
  /** IP address of the client */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
}

/**
 * Session update request interface
 * Used when updating session information
 */
export interface UpdateSessionRequest {
  /** New status for the session */
  status?: SessionStatus;
  /** New expiry timestamp */
  expiresAt?: Date;
  /** Update last activity timestamp */
  updateLastActivity?: boolean;
}

/**
 * Session validation result interface
 * Result of validating a session
 */
export interface SessionValidationResult {
  /** Whether the session is valid */
  isValid: boolean;
  /** Session object if valid */
  session?: Session;
  /** Error message if invalid */
  error?: string;
  /** Error code for client-side handling */
  errorCode?: string;
}

/**
 * Session statistics interface
 * Statistical data about sessions
 */
export interface SessionStatistics {
  /** Total number of sessions */
  totalSessions: number;
  /** Number of active sessions */
  activeSessions: number;
  /** Number of expired sessions */
  expiredSessions: number;
  /** Number of revoked sessions */
  revokedSessions: number;
  /** Average session duration in seconds */
  averageDuration: number;
  /** Sessions by device type */
  sessionsByDevice: Record<string, number>;
  /** Sessions by browser */
  sessionsByBrowser: Record<string, number>;
  /** Timestamp when statistics were calculated */
  calculatedAt: Date;
}

/**
 * Session event interface
 * Used for session-related events
 */
export interface SessionEvent {
  /** Type of session event */
  type: 'created' | 'updated' | 'revoked' | 'expired' | 'refreshed';
  /** Session ID */
  sessionId: string;
  /** User ID */
  userId: string;
  /** Event timestamp */
  timestamp: Date;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Session filter interface
 * Used for filtering sessions in lists
 */
export interface SessionFilter {
  /** Filter by session status */
  status?: SessionStatus;
  /** Filter by user ID */
  userId?: string;
  /** Filter by device type */
  deviceType?: string;
  /** Filter by date range - from */
  fromDate?: Date;
  /** Filter by date range - to */
  toDate?: Date;
  /** Search term for device name or user agent */
  search?: string;
}
