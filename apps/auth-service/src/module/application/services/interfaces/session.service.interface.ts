/**
 * Session Service Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/session.service.interface
 * 
 * @description
 * Service contract for session management operations.
 * NO implementation - ONLY method signatures.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions
 * ✅ No business logic
 * ✅ No infrastructure imports
 * ✅ No framework decorators
 * ✅ Complete DTO-based contract
 * ✅ Bangladesh specific - Network type and mobile operator tracking
 */

import { 
  RevokeSessionDto, 
  RevokeSessionResponseDto,
  RevokeSessionsByDeviceDto,
  RevokeSessionsByDeviceResponseDto
} from '../../dtos/session/revoke-session.dto';
import { 
  RevokeAllSessionsDto, 
  RevokeAllSessionsResponseDto,
  BulkRevokeSessionsDto,
  BulkRevokeSessionsResponseDto
} from '../../dtos/session/revoke-all-sessions.dto';
import { 
  PaginationDto, 
  PaginatedResponseDto 
} from '../../dtos/common/pagination.dto';
import { 
  SessionResponseDto, 
  BriefSessionResponseDto, 
  CurrentSessionResponseDto 
} from '../../mappers/session.mapper';

// ============================================================
// Types
// ============================================================

/**
 * Device information interface (Bangladesh specific)
 */
export interface DeviceInfo {
  ipAddress: string;
  userAgent: string;
  deviceId?: string;
  correlationId?: string;
  // Bangladesh specific
  district?: string;
  upazila?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

/**
 * Session extension request
 */
export interface ExtendSessionDto {
  sessionId: string;
  minutes: number;
}

/**
 * Session heartbeat request
 */
export interface SessionHeartbeatDto {
  sessionId: string;
  currentUrl?: string;
  activityType?: 'page_view' | 'api_call' | 'user_interaction';
}

/**
 * Session filter options (Bangladesh specific)
 */
export interface SessionFilterOptions {
  deviceType?: string;
  networkType?: string;
  mobileOperator?: string;
  district?: string;
  status?: string;
  fromDate?: Date;
  toDate?: Date;
}

/**
 * Session statistics
 */
export interface SessionStatistics {
  totalSessions: number;
  activeSessions: number;
  expiredSessions: number;
  revokedSessions: number;
  averageSessionDurationHours: number;
  mostUsedDeviceId: string | null;
  mostUsedDeviceType: string | null;
  // Bangladesh specific
  sessionsByNetworkType?: Record<string, number>;
  sessionsByMobileOperator?: Record<string, number>;
  sessionsByDistrict?: Array<{ district: string; count: number }>;
}

/**
 * Global session statistics (admin dashboard)
 */
export interface GlobalSessionStatistics {
  totalActiveSessions: number;
  totalSessionsLast24h: number;
  totalSessionsLast7d: number;
  averageSessionDuration: number;
  medianSessionDuration: number;
  peakConcurrentSessions: number;
  peakConcurrentTime?: Date;
  topDevices: Array<{ deviceId: string; deviceType: string; count: number }>;
  // Bangladesh specific
  sessionsByNetworkType: Record<string, number>;
  sessionsByMobileOperator: Record<string, number>;
  sessionsByDistrict: Array<{ district: string; count: number }>;
  activeSessionsByHour: Array<{ hour: number; count: number }>;
}

/**
 * Session cleanup result
 */
export interface SessionCleanupResult {
  expiredRevoked: number;
  idleRevoked: number;
  totalCleaned: number;
  durationMs: number;
}

// ============================================================
// Session Service Interface
// ============================================================

export interface SessionService {
  // ============================================================
  // Session Retrieval
  // ============================================================
  
  /**
   * Get all sessions for a user with pagination
   * @param userId - User ID from JWT
   * @param options - Pagination options
   * @param filters - Optional filters (device type, network, etc.)
   * @returns Paginated sessions
   */
  getUserSessions(
    userId: string,
    options: PaginationDto,
    filters?: SessionFilterOptions
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>>;
  
  /**
   * Get active sessions for a user
   * @param userId - User ID from JWT
   * @returns Array of active sessions
   */
  getActiveSessions(userId: string): Promise<BriefSessionResponseDto[]>;
  
  /**
   * Get session by ID with ownership validation
   * @param userId - User ID from JWT
   * @param sessionId - Session ID
   * @returns Session details
   * @throws {NotFoundError} If session not found
   * @throws {ForbiddenError} If session doesn't belong to user
   */
  getSessionById(
    userId: string, 
    sessionId: string
  ): Promise<SessionResponseDto>;
  
  /**
   * Get current user's session
   * @param userId - User ID from JWT
   * @param sessionId - Current session ID
   * @returns Current session details
   */
  getCurrentSession(
    userId: string, 
    sessionId: string
  ): Promise<CurrentSessionResponseDto>;
  
  // ============================================================
  // Session Revocation
  // ============================================================
  
  /**
   * Revoke a specific session
   * @param userId - User ID from JWT
   * @param sessionId - Session ID to revoke
   * @param deviceInfo - Device context for audit
   * @returns Revocation response
   * @throws {ForbiddenError} If trying to revoke another user's session
   */
  revokeSession(
    userId: string,
    sessionId: string,
    deviceInfo: DeviceInfo
  ): Promise<RevokeSessionResponseDto>;
  
  /**
   * Revoke all sessions for a user
   * @param userId - User ID from JWT
   * @param dto - Revoke all request (with confirmation)
   * @param deviceInfo - Device context for audit
   * @returns Revocation response
   */
  revokeAllSessions(
    userId: string,
    dto: RevokeAllSessionsDto,
    deviceInfo: DeviceInfo
  ): Promise<RevokeAllSessionsResponseDto>;
  
  /**
   * Revoke all sessions except current
   * @param userId - User ID from JWT
   * @param currentSessionId - Current session to keep
   * @param deviceInfo - Device context for audit
   * @returns Number of sessions revoked
   */
  revokeAllExceptCurrent(
    userId: string,
    currentSessionId: string,
    deviceInfo: DeviceInfo
  ): Promise<{ sessionsRevoked: number; revokedSessionIds: string[] }>;
  
  /**
   * Revoke sessions by device (Bangladesh specific)
   * @param userId - User ID from JWT
   * @param dto - Revoke by device request
   * @param deviceInfo - Device context for audit
   * @returns Revocation response
   */
  revokeSessionsByDevice(
    userId: string,
    dto: RevokeSessionsByDeviceDto,
    deviceInfo: DeviceInfo
  ): Promise<RevokeSessionsByDeviceResponseDto>;
  
  /**
   * Bulk revoke sessions (admin only)
   * @param adminId - Admin ID
   * @param dto - Bulk revocation request
   * @param deviceInfo - Device context for audit
   * @returns Bulk revocation response
   */
  bulkRevokeSessions(
    adminId: string,
    dto: BulkRevokeSessionsDto,
    deviceInfo: DeviceInfo
  ): Promise<BulkRevokeSessionsResponseDto>;
  
  // ============================================================
  // Session Validation
  // ============================================================
  
  /**
   * Validate session (check if active and valid)
   * @param sessionId - Session ID
   * @returns True if session is valid and active
   */
  validateSession(sessionId: string): Promise<boolean>;
  
  /**
   * Validate session with ownership check
   * @param userId - User ID
   * @param sessionId - Session ID
   * @returns True if session belongs to user and is active
   */
  validateSessionOwnership(
    userId: string, 
    sessionId: string
  ): Promise<boolean>;
  
  /**
   * Check if session is expired
   * @param sessionId - Session ID
   * @returns True if session is expired
   */
  isSessionExpired(sessionId: string): Promise<boolean>;
  
  /**
   * Check if session is idle
   * @param sessionId - Session ID
   * @param idleThresholdMinutes - Idle threshold in minutes
   * @returns True if session is idle
   */
  isSessionIdle(
    sessionId: string, 
    idleThresholdMinutes?: number
  ): Promise<boolean>;
  
  // ============================================================
  // Session Management
  // ============================================================
  
  /**
   * Extend session expiration
   * @param userId - User ID from JWT
   * @param dto - Extension request
   * @param deviceInfo - Device context
   * @returns Updated session
   */
  extendSession(
    userId: string,
    dto: ExtendSessionDto,
    deviceInfo: DeviceInfo
  ): Promise<SessionResponseDto>;
  
  /**
   * Send session heartbeat (keep session alive)
   * @param userId - User ID from JWT
   * @param dto - Heartbeat request
   * @param deviceInfo - Device context
   * @returns Heartbeat result
   */
  sendHeartbeat(
    userId: string,
    dto: SessionHeartbeatDto,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean; sessionExtended: boolean; newExpiresAt?: Date }>;
  
  /**
   * Record user activity (update last activity timestamp)
   * @param userId - User ID from JWT
   * @param sessionId - Session ID
   * @param deviceInfo - Device context
   * @returns void
   */
  recordActivity(
    userId: string,
    sessionId: string,
    deviceInfo: DeviceInfo
  ): Promise<void>;
  
  /**
   * Get count of active sessions for user
   * @param userId - User ID
   * @returns Number of active sessions
   */
  getActiveSessionsCount(userId: string): Promise<number>;
  
  /**
   * Get session statistics for user
   * @param userId - User ID
   * @returns Session statistics
   */
  getSessionStatistics(userId: string): Promise<SessionStatistics>;
  
  // ============================================================
  // Admin Operations
  // ============================================================
  
  /**
   * Get all active sessions (admin dashboard)
   * @param options - Pagination options
   * @param filters - Optional filters
   * @returns Paginated active sessions
   */
  getAllActiveSessions(
    options: PaginationDto,
    filters?: SessionFilterOptions
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>>;
  
  /**
   * Get sessions by user (admin)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to lookup
   * @param options - Pagination options
   * @param filters - Optional filters
   * @returns Paginated sessions
   */
  getSessionsByUser(
    adminId: string,
    targetUserId: string,
    options: PaginationDto,
    filters?: SessionFilterOptions
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>>;
  
  /**
   * Revoke user sessions (admin)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to revoke sessions for
   * @param reason - Reason for revocation
   * @param deviceInfo - Device context
   * @returns Revocation response
   */
  revokeUserSessions(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<RevokeAllSessionsResponseDto>;
  
  /**
   * Get sessions by device (admin)
   * @param adminId - Admin ID
   * @param deviceId - Device ID
   * @param options - Pagination options
   * @returns Paginated sessions
   */
  getSessionsByDevice(
    adminId: string,
    deviceId: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>>;
  
  /**
   * Cleanup stale/expired sessions (scheduled job)
   * @returns Cleanup result
   */
  cleanupStaleSessions(): Promise<SessionCleanupResult>;
  
  // ============================================================
  // Session Monitoring
  // ============================================================
  
  /**
   * Get global session statistics (admin dashboard)
   * @param adminId - Admin ID
   * @returns Global session statistics
   */
  getGlobalSessionStatistics(adminId: string): Promise<GlobalSessionStatistics>;
  
  /**
   * Get session activity heatmap (admin dashboard)
   * @param adminId - Admin ID
   * @param days - Number of days to analyze
   * @returns Activity heatmap data
   */
  getSessionActivityHeatmap(
    adminId: string,
    days?: number
  ): Promise<{
    byHour: Array<{ hour: number; count: number }>;
    byDay: Array<{ day: string; count: number }>;
    byDeviceType: Record<string, number>;
    byNetworkType: Record<string, number>;
  }>;
  
  /**
   * Get session anomalies (suspicious patterns)
   * @param adminId - Admin ID
   * @returns Anomalies list
   */
  getSessionAnomalies(
    adminId: string
  ): Promise<Array<{
    userId: string;
    email: string;
    anomalyType: 'multiple_ips' | 'multiple_devices' | 'unusual_hours' | 'unusual_location';
    description: string;
    detectedAt: Date;
    severity: 'low' | 'medium' | 'high';
  }>>;
  
  /**
   * Export session data for audit
   * @param adminId - Admin ID
   * @param fromDate - Start date
   * @param toDate - End date
   * @param format - Export format
   * @returns Export data
   */
  exportSessionData(
    adminId: string,
    fromDate: Date,
    toDate: Date,
    format: 'json' | 'csv' | 'xlsx'
  ): Promise<{ data: string | Buffer; filename: string; contentType: string }>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  SessionFilterOptions as SessionFilterOptionsType,
  SessionStatistics as SessionStatisticsType,
  GlobalSessionStatistics as GlobalSessionStatisticsType,
  SessionCleanupResult as SessionCleanupResultType,
  SessionHeartbeatDto as SessionHeartbeatDtoType
};
