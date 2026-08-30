/**
 * Authentication Session Types
 * Session management data types
 */

import type {
  SessionStatus,
  SessionType,
  SessionDeviceType,
  SessionPlatform,
  SessionExpiryReason,
} from '@vubon/shared-constants';

import type { ID, Timestamp } from '../common/core-primitives.types';

/**
 * Session Data
 * Complete session information
 */
export interface SessionData {
  /** Session unique identifier */
  id: ID;
  /** User ID associated with the session */
  userId: ID;
  /** Session type */
  type: SessionType;
  /** Current session status */
  status: SessionStatus;
  /** Session creation timestamp */
  createdAt: Timestamp;
  /** Session expiry timestamp */
  expiresAt: Timestamp;
  /** Last activity timestamp */
  lastActivityAt: Timestamp;
  /** Session timeout in milliseconds */
  timeout: number;
  /** Session idle timeout in milliseconds */
  idleTimeout: number;
  /** Device information */
  device: SessionDevice;
  /** IP address of the session */
  ipAddress: string;
  /** User agent string */
  userAgent: string;
  /** Session metadata (optional) */
  metadata?: Record<string, unknown>;
}

/**
 * Session Device
 * Device information for a session
 */
export interface SessionDevice {
  /** Device ID (if registered) */
  deviceId?: ID;
  /** Device type */
  deviceType: SessionDeviceType;
  /** Device platform */
  platform: SessionPlatform;
  /** Device name (user-defined) */
  deviceName?: string;
  /** Device model */
  model?: string;
  /** OS version */
  osVersion?: string;
  /** Browser name and version */
  browser?: string;
}

/**
 * Session Create Request
 * Data required to create a new session
 */
export interface SessionCreateRequest {
  /** User ID */
  userId: ID;
  /** Session type */
  type: SessionType;
  /** Device information */
  device: Omit<SessionDevice, 'deviceId'>;
  /** IP address */
  ipAddress: string;
  /** User agent */
  userAgent: string;
  /** Session timeout (optional, uses default) */
  timeout?: number;
  /** Idle timeout (optional, uses default) */
  idleTimeout?: number;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Session Update Request
 * Data for updating a session
 */
export interface SessionUpdateRequest {
  /** Session status (optional) */
  status?: SessionStatus;
  /** Session expiry (optional) */
  expiresAt?: Timestamp;
  /** Last activity (optional) */
  lastActivityAt?: Timestamp;
  /** IP address (optional) */
  ipAddress?: string;
  /** User agent (optional) */
  userAgent?: string;
  /** Metadata (optional) */
  metadata?: Record<string, unknown>;
}

/**
 * Session Extend Request
 * Data for extending a session
 */
export interface SessionExtendRequest {
  /** Session ID */
  sessionId: ID;
  /** Additional time in milliseconds to extend */
  extensionTime: number;
  /** Maximum allowed session age */
  maxAge?: number;
}

/**
 * Session Terminate Request
 * Data for terminating a session
 */
export interface SessionTerminateRequest {
  /** Session ID to terminate */
  sessionId?: ID;
  /** User ID (to terminate all sessions) */
  userId?: ID;
  /** Terminate all sessions except current */
  exceptCurrent?: boolean;
  /** Reason for termination */
  reason?: SessionExpiryReason;
  /** Force termination (bypass validation) */
  force?: boolean;
}

/**
 * Session Validation Result
 * Result of session validation
 */
export interface SessionValidationResult {
  /** Is session valid */
  isValid: boolean;
  /** Session data (if valid) */
  session?: SessionData;
  /** Reason for invalidation (if invalid) */
  reason?: SessionExpiryReason;
  /** Status code */
  status: SessionStatus;
  /** Message */
  message: string;
}

/**
 * Session List Response
 * Response for listing user sessions
 */
export interface SessionListResponse {
  /** List of sessions */
  sessions: SessionData[];
  /** Total count */
  total: number;
  /** Current session ID (if applicable) */
  currentSessionId?: ID;
}

/**
 * Session Refresh Response
 * Response after session refresh
 */
export interface SessionRefreshResponse {
  /** Session ID */
  sessionId: ID;
  /** New expiry timestamp */
  expiresAt: Timestamp;
  /** Refresh timestamp */
  refreshedAt: Timestamp;
  /** Remaining time in milliseconds */
  remainingTime: number;
}

/**
 * Session Cleanup Result
 * Result of session cleanup operation
 */
export interface SessionCleanupResult {
  /** Number of expired sessions removed */
  expiredRemoved: number;
  /** Number of idle sessions removed */
  idleRemoved: number;
  /** Number of terminated sessions removed */
  terminatedRemoved: number;
  /** Total removed */
  totalRemoved: number;
  /** Cleanup timestamp */
  cleanedAt: Timestamp;
}

/**
 * Session Statistics
 * Session usage statistics
 */
export interface SessionStatistics {
  /** Total active sessions */
  totalActive: number;
  /** Total expired sessions */
  totalExpired: number;
  /** Total idle sessions */
  totalIdle: number;
  /** Active sessions by type */
  activeByType: Record<SessionType, number>;
  /** Active sessions by platform */
  activeByPlatform: Record<SessionPlatform, number>;
  /** Average session duration in milliseconds */
  averageDuration: number;
  /** Peak concurrent sessions */
  peakConcurrent: number;
  /** Timestamp of statistics */
  timestamp: Timestamp;
}

/**
 * Session Heartbeat Request
 * Request to keep session alive
 */
export interface SessionHeartbeatRequest {
  /** Session ID */
  sessionId: ID;
  /** Current activity data (optional) */
  activityData?: {
    page?: string;
    action?: string;
    metadata?: Record<string, unknown>;
  };
}

/**
 * Session Heartbeat Response
 * Response after session heartbeat
 */
export interface SessionHeartbeatResponse {
  /** Session ID */
  sessionId: ID;
  /** Session status */
  status: SessionStatus;
  /** New expiry timestamp */
  expiresAt: Timestamp;
  /** Remaining time in milliseconds */
  remainingTime: number;
  /** Is session about to expire */
  isAboutToExpire: boolean;
}
