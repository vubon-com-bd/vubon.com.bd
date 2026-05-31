/**
 * Session Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/session.repository.interface
 * 
 * @description
 * Repository interface for Session entity persistence.
 * Manages user sessions, activity tracking, and session lifecycle.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Supports session cleanup and maintenance
 * ✅ Batch operations for security events
 * ✅ Pagination for large result sets
 * ✅ Framework-free, infrastructure-agnostic
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { Session, SessionStatus, SessionMetadata } from '../entities/session.entity';
import { Token } from '../value-objects/token.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ==================== Types ====================

/**
 * Session status result
 */
export interface SessionStatusResult {
  isActive: boolean;
  isExpired: boolean;
  isRevoked: boolean;
  isSuspended: boolean;
  isIdle: boolean;
  remainingTimeMinutes: number;
  remainingIdleTimeMinutes: number;
  idleTimeMinutes: number;
  expiresAt: Date;
  idleTimeoutAt: Date;
}

/**
 * Session statistics
 */
export interface SessionStatistics {
  totalSessions: number;
  activeSessions: number;
  expiredSessions: number;
  revokedSessions: number;
  suspendedSessions: number;
  idleSessions: number;
  averageSessionDurationHours: number;
  medianSessionDurationHours: number;
  sessionsPerUser: {
    min: number;
    max: number;
    avg: number;
    p95: number;
  };
  activeSessionsByDevice: Record<string, number>;
  activeSessionsByNetworkType: Record<string, number>;
  activeSessionsByDistrict?: Array<{ district: string; count: number }>;
  peakActiveSessionTime: Date;
  peakActiveSessionCount: number;
}

/**
 * Bulk revoke result
 */
export interface BulkRevokeResult {
  revokedCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  revokedSessionIds: string[];
  affectedUserIds: string[];
}

/**
 * Cleanup result
 */
export interface CleanupResult {
  deletedCount: number;
  expiredCount: number;
  idleExpiredCount: number;
  suspendedCount: number;
  errors: string[];
  durationMs: number;
}

/**
 * Session filters
 */
export interface SessionFilters {
  userId?: string;
  deviceId?: DeviceId;
  ipAddress?: IpAddress;
  status?: SessionStatus;
  networkType?: string;
  district?: string;
  fromDate?: Date;
  toDate?: Date;
  isActive?: boolean;
  isExpired?: boolean;
  isRevoked?: boolean;
  isSuspended?: boolean;
  isIdle?: boolean;
}

/**
 * Session extension result
 */
export interface SessionExtensionResult {
  sessionId: string;
  extended: boolean;
  newExpiresAt: Date;
  extensionCount: number;
  remainingExtensions: number;
}

/**
 * Session activity update result
 */
export interface SessionActivityResult {
  sessionId: string;
  recorded: boolean;
  idleTimeoutReset: boolean;
  newIdleTimeoutAt: Date;
}

// ==================== Repository Interface ====================

/**
 * Session Repository Interface
 * 
 * Manages user session lifecycle and tracking
 */
export interface SessionRepository extends BaseRepository<Session> {
  // ========== Find Operations ==========
  
  /**
   * Find session by token value
   * @param token - Session token value object
   * @returns Session entity or null
   */
  findByToken(token: Token): Promise<Session | null>;
  
  /**
   * Find session by raw token value
   * @param tokenValue - Raw token string
   * @returns Session entity or null
   */
  findByTokenValue(tokenValue: string): Promise<Session | null>;
  
  /**
   * Find all sessions by user ID
   * @param userId - User ID
   * @returns Array of sessions
   */
  findByUserId(userId: string): Promise<Session[]>;
  
  /**
   * Find sessions by user ID with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated sessions
   */
  findByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find active sessions for a user
   * @param userId - User ID
   * @returns Array of active sessions
   */
  findActiveSessions(userId: string): Promise<Session[]>;
  
  /**
   * Find active sessions by user with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated active sessions
   */
  findActiveSessionsPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find sessions by device ID
   * @param deviceId - Device ID value object
   * @returns Array of sessions
   */
  findByDeviceId(deviceId: DeviceId): Promise<Session[]>;
  
  /**
   * Find sessions by IP address
   * @param ipAddress - IP address
   * @param options - Pagination options
   * @returns Paginated sessions
   */
  findByIpAddress(
    ipAddress: IpAddress,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find sessions by status
   * @param status - Session status
   * @param options - Pagination options
   * @returns Paginated sessions
   */
  findByStatus(
    status: SessionStatus,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find expired sessions
   * @param options - Pagination options
   * @returns Paginated expired sessions
   */
  findExpiredSessions(options: PaginationOptions): Promise<PaginatedResult<Session>>;
  
  /**
   * Find revoked sessions
   * @param options - Pagination options
   * @returns Paginated revoked sessions
   */
  findRevokedSessions(options: PaginationOptions): Promise<PaginatedResult<Session>>;
  
  /**
   * Find suspended sessions
   * @param options - Pagination options
   * @returns Paginated suspended sessions
   */
  findSuspendedSessions(options: PaginationOptions): Promise<PaginatedResult<Session>>;
  
  /**
   * Find idle sessions (inactive for too long)
   * @param idleThresholdMinutes - Minutes of inactivity to consider idle
   * @param options - Pagination options
   * @returns Paginated idle sessions
   */
  findIdleSessions(
    idleThresholdMinutes: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find sessions expiring soon
   * @param hoursThreshold - Hours before expiry
   * @param options - Pagination options
   * @returns Paginated sessions expiring soon
   */
  findExpiringSoon(
    hoursThreshold: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find stale sessions (not used for N days)
   * @param daysInactive - Days of inactivity
   * @param options - Pagination options
   * @returns Paginated stale sessions
   */
  findStaleSessions(
    daysInactive: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find sessions by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated sessions
   */
  findByFilters(
    filters: SessionFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<Session>>;
  
  /**
   * Find current session for user
   * @param userId - User ID
   * @returns Current session or null
   */
  findCurrentSession(userId: string): Promise<Session | null>;
  
  // ========== Status Operations ==========
  
  /**
   * Get session status for a session
   * @param sessionId - Session ID
   * @returns Session status result
   */
  getSessionStatus(sessionId: string): Promise<SessionStatusResult>;
  
  /**
   * Check if session exists by token
   * @param token - Session token
   * @returns True if session exists
   */
  existsByToken(token: Token): Promise<boolean>;
  
  /**
   * Check if user has active sessions
   * @param userId - User ID
   * @returns True if user has active sessions
   */
  hasActiveSessions(userId: string): Promise<boolean>;
  
  /**
   * Check if session is valid
   * @param sessionId - Session ID
   * @returns True if session is valid (active and not expired)
   */
  isValidSession(sessionId: string): Promise<boolean>;
  
  // ========== Revocation Operations ==========
  
  /**
   * Revoke a single session
   * @param sessionId - Session ID
   * @param reason - Revocation reason
   * @returns void
   */
  revokeSession(sessionId: string, reason?: string): Promise<void>;
  
  /**
   * Revoke session by token
   * @param token - Session token
   * @param reason - Revocation reason
   * @returns void
   */
  revokeByToken(token: Token, reason?: string): Promise<void>;
  
  /**
   * Delete all sessions for a user (logout from all devices)
   * @param userId - User ID
   * @param reason - Revocation reason
   * @returns Number of deleted sessions
   */
  deleteAllByUserId(userId: string, reason?: string): Promise<number>;
  
  /**
   * Delete all sessions for multiple users
   * @param userIds - Array of user IDs
   * @param reason - Revocation reason
   * @returns Bulk revoke result
   */
  deleteAllByUserIds(userIds: string[], reason: string): Promise<BulkRevokeResult>;
  
  /**
   * Delete sessions by device ID
   * @param deviceId - Device ID
   * @param reason - Revocation reason
   * @returns Number of deleted sessions
   */
  deleteByDeviceId(deviceId: DeviceId, reason?: string): Promise<number>;
  
  /**
   * Delete sessions by IP address
   * @param ipAddress - IP address
   * @param reason - Revocation reason
   * @returns Number of deleted sessions
   */
  deleteByIpAddress(ipAddress: IpAddress, reason?: string): Promise<number>;
  
  /**
   * Delete all expired sessions (cleanup)
   * @returns Cleanup result
   */
  deleteExpiredSessions(): Promise<CleanupResult>;
  
  /**
   * Delete idle sessions (cleanup)
   * @param idleThresholdMinutes - Minutes of inactivity
   * @returns Cleanup result
   */
  deleteIdleSessions(idleThresholdMinutes: number): Promise<CleanupResult>;
  
  /**
   * Clean up stale sessions (older than retention period)
   * @param retentionDays - Days to keep sessions
   * @returns Cleanup result
   */
  cleanupStaleSessions(retentionDays: number): Promise<CleanupResult>;
  
  /**
   * Revoke all expired sessions (batch)
   * @returns Bulk revoke result
   */
  revokeAllExpired(): Promise<BulkRevokeResult>;
  
  /**
   * Revoke all idle sessions
   * @param idleThresholdMinutes - Minutes of inactivity
   * @returns Bulk revoke result
   */
  revokeAllIdle(idleThresholdMinutes: number): Promise<BulkRevokeResult>;
  
  // ========== Update Operations ==========
  
  /**
   * Extend session expiry
   * @param sessionId - Session ID
   * @param additionalMinutes - Minutes to extend
   * @returns Session extension result
   */
  extendSession(sessionId: string, additionalMinutes: number): Promise<SessionExtensionResult>;
  
  /**
   * Update session activity (reset idle timer)
   * @param sessionId - Session ID
   * @param activityUrl - Optional activity URL
   * @returns Session activity result
   */
  updateActivity(sessionId: string, activityUrl?: string): Promise<SessionActivityResult>;
  
  /**
   * Suspend session
   * @param sessionId - Session ID
   * @param reason - Suspension reason
   * @returns void
   */
  suspendSession(sessionId: string, reason: string): Promise<void>;
  
  /**
   * Reactivate suspended session
   * @param sessionId - Session ID
   * @returns void
   */
  reactivateSession(sessionId: string): Promise<void>;
  
  /**
   * Update session metadata
   * @param sessionId - Session ID
   * @param metadata - Session metadata
   * @returns void
   */
  updateMetadata(sessionId: string, metadata: Partial<SessionMetadata>): Promise<void>;
  
  /**
   * Update session location
   * @param sessionId - Session ID
   * @param location - Location string
   * @returns void
   */
  updateLocation(sessionId: string, location: string): Promise<void>;
  
  /**
   * Mark session as current
   * @param sessionId - Session ID
   * @returns void
   */
  markAsCurrent(sessionId: string): Promise<void>;
  
  /**
   * Unmark all sessions as current for a user
   * @param userId - User ID
   * @returns void
   */
  unmarkAllCurrent(userId: string): Promise<void>;
  
  // ========== Count Operations ==========
  
  /**
   * Count active sessions for a user
   * @param userId - User ID
   * @returns Number of active sessions
   */
  countActiveSessionsByUser(userId: string): Promise<number>;
  
  /**
   * Count sessions by status
   * @param status - Session status
   * @returns Count of sessions
   */
  countByStatus(status: SessionStatus): Promise<number>;
  
  /**
   * Count sessions by user
   * @returns Map of user ID to session count
   */
  countSessionsByUser(): Promise<Map<string, number>>;
  
  /**
   * Count unique users with active sessions
   * @returns Number of unique users
   */
  countUniqueUsersWithActiveSessions(): Promise<number>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get session statistics
   * @returns Session statistics
   */
  getStatistics(): Promise<SessionStatistics>;
  
  /**
   * Get active session count (real-time)
   * @returns Number of active sessions
   */
  getActiveSessionCount(): Promise<number>;
  
  /**
   * Get current active sessions per user
   * @returns Map of user ID to active session count
   */
  getActiveSessionsPerUser(): Promise<Map<string, number>>;
  
  /**
   * Get top users by session count
   * @param limit - Number of users to return
   * @returns Top users
   */
  getTopUsersBySessionCount(limit: number): Promise<Array<{ userId: string; sessionCount: number }>>;
  
  // ========== Save Operations ==========
  
  /**
   * Save session with optimistic locking
   * @param session - Session entity
   * @returns void
   */
  saveWithVersionCheck(session: Session): Promise<void>;
  
  /**
   * Batch update session status
   * @param updates - Map of session IDs to status
   * @returns void
   */
  batchUpdateStatus(updates: Map<string, SessionStatus>): Promise<void>;
  
  // ========== Advanced Operations ==========
  
  /**
   * Get session activity heatmap
   * @param days - Number of days to analyze
   * @returns Activity data by hour
   */
  getActivityHeatmap(days: number): Promise<Array<{ hour: number; count: number }>>;
  
  /**
   * Get user session patterns
   * @param userId - User ID
   * @returns Session pattern analysis
   */
  getUserSessionPatterns(userId: string): Promise<{
    averageSessionDuration: number;
    peakActivityHours: number[];
    deviceUsage: Record<string, number>;
    concurrentDevices: number;
    typicalSessionLength: number;
  }>;
  
  /**
   * Detect anomalous session behavior
   * @param userId - User ID
   * @returns Anomaly detection result
   */
  detectAnomalies(userId: string): Promise<{
    hasAnomaly: boolean;
    severity: 'low' | 'medium' | 'high';
    reasons: string[];
    recommendations: string[];
    anomalousSessions: string[];
  }>;
  
  /**
   * Export sessions for audit
   * @param userId - User ID (optional)
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Sessions for audit
   */
  exportForAudit(
    userId?: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<Session[]>;
  
  /**
   * Archive old sessions
   * @param olderThanDays - Archive sessions older than N days
   * @returns Number of archived sessions
   */
  archiveOldSessions(olderThanDays: number): Promise<number>;
  
  /**
   * Restore archived sessions
   * @param olderThanDays - Restore sessions older than N days
   * @returns Number of restored sessions
   */
  restoreArchivedSessions(olderThanDays: number): Promise<number>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  SessionStatusResult, 
  SessionStatistics, 
  BulkRevokeResult, 
  CleanupResult,
  SessionFilters,
  SessionExtensionResult,
  SessionActivityResult
};
