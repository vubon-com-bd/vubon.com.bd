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

// ✅ Phase-1 (shared-types) থেকে ইম্পোর্ট
import type { 
  DeviceInfo, 
  SessionFilterOptions as SharedSessionFilterOptions,
  SessionStatistics as SharedSessionStatistics,
  GlobalSessionStatistics as SharedGlobalSessionStatistics,
  NetworkType,
  MobileOperator,
  SessionStatus
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  NETWORK_TYPES, 
  MOBILE_OPERATORS, 
  SESSION_STATUS,
  DEFAULT_IDLE_THRESHOLD_MINUTES,
  MAX_SESSION_EXTENSION_MINUTES
} from '@vubon/shared-constants';

// ============================================================
// Types (Re-export from shared-types for convenience)
// ============================================================

/**
 * Device information interface (Bangladesh specific)
 * @deprecated Import from '@vubon/shared-types' instead
 */
export type DeviceInfo = SharedDeviceInfo;

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
  networkType?: NetworkType;
  mobileOperator?: MobileOperator;
  district?: string;
  status?: SessionStatus;
  fromDate?: Date;
  toDate?: Date;
  /**
   * Filter by specific device ID
   */
  deviceId?: string;
  /**
   * Filter by IP address pattern
   */
  ipAddress?: string;
  /**
   * Whether to include expired sessions
   */
  includeExpired?: boolean;
  /**
   * Sort field
   */
  sortBy?: 'createdAt' | 'lastActivityAt' | 'expiresAt';
  /**
   * Sort order
   */
  sortOrder?: 'asc' | 'desc';
}

/**
 * Session statistics (Bangladesh specific)
 */
export interface SessionStatistics {
  totalSessions: number;
  activeSessions: number;
  expiredSessions: number;
  revokedSessions: number;
  idleSessions: number;
  averageSessionDurationHours: number;
  medianSessionDurationHours: number;
  mostUsedDeviceId: string | null;
  mostUsedDeviceType: string | null;
  // Bangladesh specific
  sessionsByNetworkType?: Record<NetworkType, number>;
  sessionsByMobileOperator?: Record<MobileOperator, number>;
  sessionsByDistrict?: Array<{ district: string; count: number }>;
  /**
   * Active sessions by hour of day
   */
  activeSessionsByHour?: Array<{ hour: number; count: number }>;
  /**
   * Peak concurrent sessions
   */
  peakConcurrentSessions?: number;
  /**
   * Peak concurrent time
   */
  peakConcurrentTime?: Date;
}

/**
 * Global session statistics (admin dashboard)
 */
export interface GlobalSessionStatistics {
  totalActiveSessions: number;
  totalSessionsLast24h: number;
  totalSessionsLast7d: number;
  totalSessionsLast30d: number;
  averageSessionDuration: number;
  medianSessionDuration: number;
  peakConcurrentSessions: number;
  peakConcurrentTime?: Date;
  topDevices: Array<{ deviceId: string; deviceType: string; count: number }>;
  topUsers: Array<{ userId: string; email: string; sessionCount: number }>;
  // Bangladesh specific
  sessionsByNetworkType: Record<NetworkType, number>;
  sessionsByMobileOperator: Record<MobileOperator, number>;
  sessionsByDistrict: Array<{ district: string; count: number }>;
  activeSessionsByHour: Array<{ hour: number; count: number }>;
  /**
   * Anomaly detection summary
   */
  anomalies?: {
    totalAnomalies: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
  };
}

/**
 * Session cleanup result
 */
export interface SessionCleanupResult {
  expiredRevoked: number;
  idleRevoked: number;
  totalCleaned: number;
  durationMs: number;
  /**
   * Number of sessions archived
   */
  archivedCount?: number;
  /**
   * Errors encountered during cleanup
   */
  errors?: string[];
}

/**
 * Session validation result
 */
export interface SessionValidationResult {
  isValid: boolean;
  isExpired: boolean;
  isIdle: boolean;
  isRevoked: boolean;
  belongsToUser: boolean;
  remainingTimeMinutes: number;
  idleTimeMinutes: number;
  sessionId: string;
  userId?: string;
}

/**
 * Session activity summary for user
 */
export interface SessionActivitySummary {
  userId: string;
  totalSessions: number;
  activeSessions: number;
  averageSessionDuration: number;
  mostActiveDeviceType: string;
  mostActiveNetworkType: NetworkType;
  mostActiveDistrict?: string;
  lastSessionAt?: Date;
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
  // Session Validation
  // ============================================================
  
  /**
   * Validate session (check if active and valid)
   * @param sessionId - Session ID
   * @returns Validation result with detailed status
   */
  validateSession(sessionId: string): Promise<SessionValidationResult>;
  
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
   * @param idleThresholdMinutes - Idle threshold in minutes (default: from constants)
   * @returns True if session is idle
   */
  isSessionIdle(
    sessionId: string, 
    idleThresholdMinutes?: number
  ): Promise<boolean>;
  
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
  // Session Management
  // ============================================================
  
  /**
   * Extend session expiration
   * @param userId - User ID from JWT
   * @param dto - Extension request
   * @param deviceInfo - Device context
   * @returns Updated session
   * @throws {ValidationError} If extension exceeds maximum allowed
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
  
  /**
   * Get session activity summary for user
   * @param userId - User ID
   * @returns Session activity summary
   */
  getSessionActivitySummary(userId: string): Promise<SessionActivitySummary>;
  
  // ============================================================
  // Admin Operations
  // ============================================================
  
  /**
   * Get all active sessions (admin dashboard)
   * @param adminId - Admin ID
   * @param options - Pagination options
   * @param filters - Optional filters
   * @returns Paginated active sessions
   */
  getAllActiveSessions(
    adminId: string,
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
   * Get sessions by IP address (admin)
   * @param adminId - Admin ID
   * @param ipAddress - IP address
   * @param options - Pagination options
   * @returns Paginated sessions
   */
  getSessionsByIpAddress(
    adminId: string,
    ipAddress: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>>;
  
  /**
   * Cleanup stale/expired sessions (scheduled job)
   * @returns Cleanup result
   */
  cleanupStaleSessions(): Promise<SessionCleanupResult>;
  
  // ============================================================
  // Session Monitoring & Analytics
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
    byNetworkType: Record<NetworkType, number>;
    byMobileOperator: Record<MobileOperator, number>;
    byDistrict: Array<{ district: string; count: number }>;
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
    descriptionBn?: string;
    detectedAt: Date;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recommendation?: string;
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
  
  /**
   * Get user session timeline (for security audit)
   * @param adminId - Admin ID
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Session timeline
   */
  getUserSessionTimeline(
    adminId: string,
    userId: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<{
    sessionId: string;
    createdAt: Date;
    expiresAt: Date;
    lastActivityAt: Date;
    deviceInfo: DeviceInfo;
    ipAddress: string;
    location?: string;
    status: string;
  }>>;
  
  /**
   * Force expire all idle sessions (emergency)
   * @param adminId - Admin ID
   * @param reason - Reason for forced expiration
   * @param idleThresholdMinutes - Idle threshold in minutes
   * @returns Number of sessions expired
   */
  forceExpireIdleSessions(
    adminId: string,
    reason: string,
    idleThresholdMinutes?: number
  ): Promise<number>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  SessionFilterOptions as SessionFilterOptionsType,
  SessionStatistics as SessionStatisticsType,
  GlobalSessionStatistics as GlobalSessionStatisticsType,
  SessionCleanupResult as SessionCleanupResultType,
  SessionHeartbeatDto as SessionHeartbeatDtoType,
  SessionValidationResult as SessionValidationResultType,
  SessionActivitySummary as SessionActivitySummaryType
};
