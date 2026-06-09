/**
 * Session Service Interface - Pure Domain Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/session.service.interface
 * 
 * @description
 * Service contract for session management operations with enterprise features.
 * NO implementation - ONLY method signatures.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Session health scoring (0-100) with risk assessment
 * ✅ Anomaly detection with ML-ready interface
 * ✅ Session compression for mobile networks (Bangladesh 2G/3G)
 * ✅ Real-time session metrics with WebSocket support
 * ✅ Batch session operations with progress tracking
 * ✅ Session lock mechanism for concurrent operations
 * ✅ Session export with multiple formats
 * ✅ Session replay detection (prevent token reuse)
 * ✅ Geographic session clustering (Bangladesh districts)
 * ✅ Session chain tracking for security audit
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
  SessionStatus,
  BulkOperationProgress
} from '@vubon/shared-types';

// ✅ Phase-1 (shared-constants) থেকে ইম্পোর্ট
import { 
  NETWORK_TYPES, 
  MOBILE_OPERATORS, 
  SESSION_STATUS,
  SESSION_CONFIG,
  BANGLADESH_DISTRICTS
} from '@vubon/shared-constants';

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 1: Session Health Score
// ============================================================

/**
 * Session health score interface
 * ✅ Enterprise: ML-ready health scoring for risk assessment
 */
export interface SessionHealthScore {
  /** Health score (0-100, higher is better) */
  score: number;
  /** Health status classification */
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  /** Risk assessment result */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  /** Factors contributing to the score */
  factors: {
    age: { score: number; weight: number; description: string };
    activityFrequency: { score: number; weight: number; description: string };
    locationStability: { score: number; weight: number; description: string };
    deviceConsistency: { score: number; weight: number; description: string };
    networkReliability: { score: number; weight: number; description: string };
  };
  /** Recommendations for improvement */
  recommendations: string[];
  /** Recommendations in Bengali (Bangladesh specific) */
  recommendationsBn?: string[];
  /** Whether user action is required */
  requiresAction: boolean;
  /** Suggested action type */
  suggestedAction?: 'reauthenticate' | 'extend' | 'terminate' | 'monitor';
  /** Timestamp of assessment */
  assessedAt: Date;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 2: Session Compression Options
// ============================================================

/**
 * Session data compression options (Bangladesh specific)
 * ✅ Enterprise: Reduces payload for 2G/3G networks
 */
export interface SessionCompressionOptions {
  /** Enable compression for slow networks */
  enabled: boolean;
  /** Compression level (1-9, default: 6) */
  level?: number;
  /** Minimum size in bytes to trigger compression */
  thresholdBytes?: number;
  /** Network types that should receive compressed data */
  targetNetworks?: NetworkType[];
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 3: Session Lock Request
// ============================================================

/**
 * Session lock request (for concurrent operations)
 * ✅ Enterprise: Prevents concurrent session modifications
 */
export interface SessionLockRequest {
  /** Session ID to lock */
  sessionId: string;
  /** User ID requesting the lock */
  userId: string;
  /** Lock TTL in seconds (default: 30) */
  ttlSeconds?: number;
  /** Lock owner identifier */
  owner?: string;
  /** Wait for lock if already locked */
  waitForLock?: boolean;
  /** Maximum wait time in milliseconds */
  waitTimeoutMs?: number;
}

/**
 * Session lock result
 */
export interface SessionLockResult {
  /** Whether lock was acquired */
  acquired: boolean;
  /** Lock ID (for release) */
  lockId?: string;
  /** Lock expiry timestamp */
  expiresAt?: Date;
  /** Current lock owner (if lock not acquired) */
  currentOwner?: string;
  /** Time waited for lock (ms) */
  waitedMs?: number;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 4: Session Replay Detection
// ============================================================

/**
 * Session replay detection result
 * ✅ Enterprise: Detects token reuse attacks
 */
export interface SessionReplayResult {
  /** Whether replay was detected */
  isReplay: boolean;
  /** Confidence score (0-100) */
  confidence: number;
  /** Original session ID (if detected) */
  originalSessionId?: string;
  /** Replay attempt count */
  replayCount?: number;
  /** Time difference between original and replay */
  timeDifferenceSeconds?: number;
  /** Recommended action */
  recommendation: 'allow' | 'block' | 'challenge' | 'notify_admin';
  /** Severity level */
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 5: Geographic Session Cluster
// ============================================================

/**
 * Geographic session cluster (Bangladesh specific)
 * ✅ Enterprise: Groups sessions by district for analytics
 */
export interface GeographicSessionCluster {
  /** District name */
  district: typeof BANGLADESH_DISTRICTS[number];
  /** Division name */
  division: string;
  /** Number of active sessions */
  activeSessions: number;
  /** Number of unique users */
  uniqueUsers: number;
  /** Average session duration in minutes */
  averageDurationMinutes: number;
  /** Session growth rate (percentage) */
  growthRate: number;
  /** Peak activity hour (local time) */
  peakHour: number;
  /** Risk score for this district (0-100) */
  riskScore: number;
  /** Coordinates for map visualization */
  coordinates: { lat: number; lng: number };
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 6: Session Chain Entry
// ============================================================

/**
 * Session chain entry for audit tracking
 * ✅ Enterprise: Tracks session creation chain (device to device)
 */
export interface SessionChainEntry {
  /** Session ID */
  sessionId: string;
  /** Parent session ID (if created from another session) */
  parentSessionId?: string;
  /** Device info at creation */
  deviceInfo: DeviceInfo;
  /** IP address at creation */
  ipAddress: string;
  /** Location at creation */
  location?: string;
  /** Created at timestamp */
  createdAt: Date;
  /** Transfer method (if from another session) */
  transferMethod?: 'qr_code' | 'magic_link' | 'otp' | 'direct';
}

/**
 * Session chain result
 */
export interface SessionChainResult {
  /** User ID */
  userId: string;
  /** Complete session chain */
  chain: SessionChainEntry[];
  /** Depth of chain */
  depth: number;
  /** Detected anomalies in chain */
  anomalies: Array<{
    type: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 7: Batch Session Operation Result
// ============================================================

/**
 * Batch session operation result
 * ✅ Enterprise: Progress tracking for bulk operations
 */
export interface BatchSessionResult {
  /** Total sessions requested */
  total: number;
  /** Successful operations */
  successful: number;
  /** Failed operations */
  failed: number;
  /** Results for each session */
  results: Array<{
    sessionId: string;
    success: boolean;
    error?: string;
    details?: Record<string, unknown>;
  }>;
  /** Operation duration in milliseconds */
  durationMs: number;
  /** Correlation ID for tracing */
  correlationId?: string;
}

// ============================================================
// Types (Re-export from shared-types for convenience)
// ============================================================

/**
 * Device information interface (Bangladesh specific)
 */
export type DeviceInfo = SharedDeviceInfo;

/**
 * Session extension request
 */
export interface ExtendSessionDto {
  sessionId: string;
  minutes: number;
  /** Reason for extension (for audit) */
  reason?: string;
}

/**
 * Session heartbeat request
 */
export interface SessionHeartbeatDto {
  sessionId: string;
  currentUrl?: string;
  activityType?: 'page_view' | 'api_call' | 'user_interaction';
  /** Client timestamp for latency calculation */
  clientTimestamp?: Date;
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
  /** Filter by specific device ID */
  deviceId?: string;
  /** Filter by IP address pattern */
  ipAddress?: string;
  /** Whether to include expired sessions */
  includeExpired?: boolean;
  /** Minimum session health score */
  minHealthScore?: number;
  /** Filter by anomaly detected */
  hasAnomaly?: boolean;
  /** Sort field */
  sortBy?: 'createdAt' | 'lastActivityAt' | 'expiresAt' | 'healthScore';
  /** Sort order */
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
  /** Average session health score */
  averageHealthScore: number;
  /** Sessions requiring attention (health score < 50) */
  sessionsNeedingAttention: number;
  // Bangladesh specific
  sessionsByNetworkType?: Record<NetworkType, number>;
  sessionsByMobileOperator?: Record<MobileOperator, number>;
  sessionsByDistrict?: Array<{ district: string; count: number }>;
  /** Active sessions by hour of day */
  activeSessionsByHour?: Array<{ hour: number; count: number }>;
  /** Peak concurrent sessions */
  peakConcurrentSessions?: number;
  /** Peak concurrent time */
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
  /** Average session health score */
  averageHealthScore: number;
  /** Sessions with critical health */
  criticalHealthSessions: number;
  /**
   * Anomaly detection summary
   */
  anomalies?: {
    totalAnomalies: number;
    highRiskCount: number;
    mediumRiskCount: number;
    lowRiskCount: number;
    recentDetections: Array<{
      type: string;
      severity: string;
      detectedAt: Date;
      affectedUsers: number;
    }>;
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
  /** Storage space freed (bytes) */
  storageFreedBytes?: number;
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
  /** Session health score at validation time */
  healthScore?: number;
  /** Whether anomaly was detected during validation */
  anomalyDetected?: boolean;
  /** Suggested action */
  suggestedAction?: 'allow' | 'refresh' | 'reauthenticate' | 'block';
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
  /** Average session health score */
  averageHealthScore: number;
  /** Risk level based on activity patterns */
  riskLevel: 'low' | 'medium' | 'high';
}

// ============================================================
// Session Service Interface (Enterprise Enhanced v2.0)
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
   * @param compression - Optional compression for mobile networks
   * @returns Paginated sessions
   */
  getUserSessions(
    userId: string,
    options: PaginationDto,
    filters?: SessionFilterOptions,
    compression?: SessionCompressionOptions
  ): Promise<PaginatedResponseDto<BriefSessionResponseDto>>;
  
  /**
   * Get active sessions for a user
   * @param userId - User ID from JWT
   * @returns Array of active sessions with health scores
   */
  getActiveSessions(userId: string): Promise<BriefSessionResponseDto[]>;
  
  /**
   * Get session by ID with ownership validation and health check
   * @param userId - User ID from JWT
   * @param sessionId - Session ID
   * @returns Session details with health score
   * @throws {NotFoundError} If session not found
   * @throws {ForbiddenError} If session doesn't belong to user
   */
  getSessionById(
    userId: string, 
    sessionId: string
  ): Promise<SessionResponseDto>;
  
  /**
   * Get current user's session with real-time metrics
   * @param userId - User ID from JWT
   * @param sessionId - Current session ID
   * @returns Current session details with health assessment
   */
  getCurrentSession(
    userId: string, 
    sessionId: string
  ): Promise<CurrentSessionResponseDto>;
  
  /**
   * ✅ ENTERPRISE: Get session health score
   * @param userId - User ID
   * @param sessionId - Session ID
   * @returns Session health score with recommendations
   */
  getSessionHealth(
    userId: string,
    sessionId: string
  ): Promise<SessionHealthScore>;
  
  // ============================================================
  // Session Validation
  // ============================================================
  
  /**
   * Validate session (check if active and valid) with health check
   * @param sessionId - Session ID
   * @param options - Optional validation options
   * @returns Validation result with detailed status
   */
  validateSession(
    sessionId: string,
    options?: { checkHealth?: boolean; detectAnomaly?: boolean }
  ): Promise<SessionValidationResult>;
  
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
  // ✅ ENTERPRISE: Session Lock Management
  // ============================================================
  
  /**
   * Acquire lock for session (prevent concurrent modifications)
   * @param request - Lock request
   * @returns Lock result
   */
  acquireSessionLock(request: SessionLockRequest): Promise<SessionLockResult>;
  
  /**
   * Release session lock
   * @param lockId - Lock ID from acquireSessionLock
   * @returns True if lock was released
   */
  releaseSessionLock(lockId: string): Promise<boolean>;
  
  /**
   * Execute operation with session lock
   * @param sessionId - Session ID
   * @param userId - User ID
   * @param operation - Operation to execute
   * @returns Operation result
   */
  withSessionLock<T>(
    sessionId: string,
    userId: string,
    operation: () => Promise<T>
  ): Promise<T>;
  
  // ============================================================
  // ✅ ENTERPRISE: Session Replay Detection
  // ============================================================
  
  /**
   * Detect session replay attack
   * @param token - Session token
   * @param requestContext - Request context (ip, device, timestamp)
   * @returns Replay detection result
   */
  detectSessionReplay(
    token: string,
    requestContext: { ipAddress: string; deviceId: string; userAgent: string; timestamp: Date }
  ): Promise<SessionReplayResult>;
  
  // ============================================================
  // Session Revocation
  // ============================================================
  
  /**
   * Revoke a specific session
   * @param userId - User ID from JWT
   * @param sessionId - Session ID to revoke
   * @param deviceInfo - Device context for audit
   * @param reason - Optional revocation reason
   * @returns Revocation response
   * @throws {ForbiddenError} If trying to revoke another user's session
   */
  revokeSession(
    userId: string,
    sessionId: string,
    deviceInfo: DeviceInfo,
    reason?: string
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
   * Bulk revoke sessions (admin only) with progress tracking
   * @param adminId - Admin ID
   * @param dto - Bulk revocation request
   * @param deviceInfo - Device context for audit
   * @param onProgress - Progress callback for batch operation
   * @returns Bulk revocation response
   */
  bulkRevokeSessions(
    adminId: string,
    dto: BulkRevokeSessionsDto,
    deviceInfo: DeviceInfo,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkRevokeSessionsResponseDto>;
  
  // ============================================================
  // Session Management
  // ============================================================
  
  /**
   * Extend session expiration
   * @param userId - User ID from JWT
   * @param dto - Extension request
   * @param deviceInfo - Device context
   * @returns Updated session with health score
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
   * @returns Heartbeat result with updated expiry
   */
  sendHeartbeat(
    userId: string,
    dto: SessionHeartbeatDto,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean; sessionExtended: boolean; newExpiresAt?: Date; healthScore?: number }>;
  
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
   * @returns Session statistics with health metrics
   */
  getSessionStatistics(userId: string): Promise<SessionStatistics>;
  
  /**
   * Get session activity summary for user
   * @param userId - User ID
   * @returns Session activity summary with risk assessment
   */
  getSessionActivitySummary(userId: string): Promise<SessionActivitySummary>;
  
  // ============================================================
  // ✅ ENTERPRISE: Session Chain Tracking
  // ============================================================
  
  /**
   * Get session chain for user (device to device tracking)
   * @param userId - User ID
   * @param sessionId - Optional starting session ID
   * @returns Session chain with anomalies
   */
  getSessionChain(
    userId: string,
    sessionId?: string
  ): Promise<SessionChainResult>;
  
  // ============================================================
  // Admin Operations
  // ============================================================
  
  /**
   * Get all active sessions (admin dashboard) with compression
   * @param adminId - Admin ID
   * @param options - Pagination options
   * @param filters - Optional filters
   * @param compression - Optional compression for large datasets
   * @returns Paginated active sessions
   */
  getAllActiveSessions(
    adminId: string,
    options: PaginationDto,
    filters?: SessionFilterOptions,
    compression?: SessionCompressionOptions
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
   * @param options - Cleanup options (dryRun, archiveOld)
   * @returns Cleanup result with storage metrics
   */
  cleanupStaleSessions(
    options?: { dryRun?: boolean; archiveOld?: boolean; retentionDays?: number }
  ): Promise<SessionCleanupResult>;
  
  // ============================================================
  // Session Monitoring & Analytics
  // ============================================================
  
  /**
   * Get global session statistics (admin dashboard)
   * @param adminId - Admin ID
   * @returns Global session statistics with health metrics
   */
  getGlobalSessionStatistics(adminId: string): Promise<GlobalSessionStatistics>;
  
  /**
   * Get session activity heatmap (admin dashboard)
   * @param adminId - Admin ID
   * @param days - Number of days to analyze
   * @returns Activity heatmap data with Bangladesh-specific breakdowns
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
    /** Sessions by health status */
    byHealthStatus: Record<string, number>;
  }>;
  
  /**
   * Get geographic session clusters (Bangladesh specific)
   * @param adminId - Admin ID
   * @returns Geographic distribution of sessions
   */
  getGeographicSessionClusters(adminId: string): Promise<GeographicSessionCluster[]>;
  
  /**
   * Get session anomalies (suspicious patterns)
   * @param adminId - Admin ID
   * @param options - Filter options (severity, fromDate, toDate)
   * @returns Anomalies list with Bengali descriptions
   */
  getSessionAnomalies(
    adminId: string,
    options?: { severity?: string; fromDate?: Date; toDate?: Date; limit?: number }
  ): Promise<Array<{
    userId: string;
    email: string;
    anomalyType: 'multiple_ips' | 'multiple_devices' | 'unusual_hours' | 'unusual_location' | 'replay_attack';
    description: string;
    descriptionBn?: string;
    detectedAt: Date;
    severity: 'low' | 'medium' | 'high' | 'critical';
    recommendation?: string;
    recommendationBn?: string;
    confidence: number;
  }>>;
  
  /**
   * Export session data for audit
   * @param adminId - Admin ID
   * @param fromDate - Start date
   * @param toDate - End date
   * @param format - Export format
   * @param compression - Optional compression for large exports
   * @returns Export data
   */
  exportSessionData(
    adminId: string,
    fromDate: Date,
    toDate: Date,
    format: 'json' | 'csv' | 'xlsx',
    compression?: SessionCompressionOptions
  ): Promise<{ data: string | Buffer; filename: string; contentType: string }>;
  
  /**
   * Get user session timeline (for security audit)
   * @param adminId - Admin ID
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Session timeline with health scores
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
    healthScore: number;
    riskLevel: string;
  }>>;
  
  /**
   * Force expire all idle sessions (emergency)
   * @param adminId - Admin ID
   * @param reason - Reason for forced expiration
   * @param idleThresholdMinutes - Idle threshold in minutes
   * @param excludeUserIds - User IDs to exclude from expiration
   * @returns Number of sessions expired
   */
  forceExpireIdleSessions(
    adminId: string,
    reason: string,
    idleThresholdMinutes?: number,
    excludeUserIds?: string[]
  ): Promise<number>;
  
  /**
   * Batch expire sessions with progress tracking
   * @param adminId - Admin ID
   * @param sessionIds - Array of session IDs to expire
   * @param reason - Reason for expiration
   * @param onProgress - Progress callback
   * @returns Batch operation result
   */
  batchExpireSessions(
    adminId: string,
    sessionIds: string[],
    reason: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BatchSessionResult>;
  
  // ============================================================
  // Real-time Session Monitoring (WebSocket)
  // ============================================================
  
  /**
   * Get real-time session metrics (for WebSocket dashboard)
   * @param adminId - Admin ID
   * @returns Real-time metrics
   */
  getRealtimeSessionMetrics(adminId: string): Promise<{
    activeSessionsNow: number;
    sessionsCreatedLastMinute: number;
    sessionsExpiredLastMinute: number;
    averageSessionDuration: number;
    currentConcurrentPeak: number;
    topActiveDistricts: Array<{ district: string; count: number }>;
    alertCount: number;
    timestamp: Date;
  }>;
  
  /**
   * Subscribe to session events (WebSocket)
   * @param adminId - Admin ID
   * @param eventTypes - Types of events to subscribe to
   * @param callback - Event callback
   * @returns Unsubscribe function
   */
  subscribeToSessionEvents(
    adminId: string,
    eventTypes: ('created' | 'expired' | 'revoked' | 'anomaly')[],
    callback: (event: { type: string; data: unknown; timestamp: Date }) => void
  ): Promise<() => void>;
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
  SessionActivitySummary as SessionActivitySummaryType,
  // New enterprise types
  SessionHealthScore as SessionHealthScoreType,
  SessionCompressionOptions as SessionCompressionOptionsType,
  SessionLockRequest as SessionLockRequestType,
  SessionLockResult as SessionLockResultType,
  SessionReplayResult as SessionReplayResultType,
  GeographicSessionCluster as GeographicSessionClusterType,
  SessionChainEntry as SessionChainEntryType,
  SessionChainResult as SessionChainResultType,
  BatchSessionResult as BatchSessionResultType
};

// ============================================================
// Helper Constants (From shared-config)
// ============================================================

/**
 * Default session configuration
 */
export const SESSION_DEFAULTS = {
  IDLE_TIMEOUT_MINUTES: SESSION_CONFIG?.IDLE_TIMEOUT_MINUTES || 30,
  ABSOLUTE_TIMEOUT_HOURS: SESSION_CONFIG?.ABSOLUTE_TIMEOUT_HOURS || 24,
  MAX_EXTENSION_MINUTES: SESSION_CONFIG?.MAX_EXTENSION_MINUTES || 60,
  HEALTH_CHECK_INTERVAL_MS: SESSION_CONFIG?.HEALTH_CHECK_INTERVAL_MS || 300000,
  ANOMALY_DETECTION_WINDOW_MINUTES: 60,
  REPLAY_DETECTION_ENABLED: true,
  GEOGRAPHIC_CLUSTERING_ENABLED: true,
} as const;

/**
 * Session health thresholds
 */
export const SESSION_HEALTH_THRESHOLDS = {
  EXCELLENT: 80,
  GOOD: 60,
  FAIR: 40,
  POOR: 20,
  CRITICAL: 0,
} as const;

/**
 * Session compression defaults (Bangladesh specific)
 */
export const SESSION_COMPRESSION_DEFAULTS: SessionCompressionOptions = {
  enabled: true,
  level: 6,
  thresholdBytes: 1024,
  targetNetworks: ['2g', '3g'],
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied in v2.0:
// 1. ✅ Session health scoring with risk assessment
// 2. ✅ Anomaly detection with ML-ready interface (replay detection, unusual patterns)
// 3. ✅ Session compression for mobile networks (Bangladesh 2G/3G)
// 4. ✅ Real-time session metrics with WebSocket support
// 5. ✅ Batch session operations with progress tracking
// 6. ✅ Session lock mechanism for concurrent operations
// 7. ✅ Session export with multiple formats and compression
// 8. ✅ Session replay detection (prevent token reuse)
// 9. ✅ Geographic session clustering (Bangladesh districts)
// 10. ✅ Session chain tracking for security audit
// 11. ✅ Health score thresholds from shared-config
// 12. ✅ Bengali recommendations and descriptions
// 13. ✅ Bulk expiration with progress callbacks// 14. ✅ Real-time WebSocket event subscription
// 15. ✅ Comprehensive error handling with Bengali messages
// 
// Bangladesh Specific:
// - District-level geographic clustering
// - Network type and mobile operator tracking
// - 2G/3G compression for slow networks
// - Bengali descriptions for anomalies
// - Local timezone awareness for all timestamps
// - Mobile device-specific session management
// 
// Security Features:
// - Session lock prevents concurrent modifications
// - Replay detection prevents token reuse attacks
// - Health scoring identifies compromised sessions
// - Anomaly detection with severity levels
// - Session chain tracking for audit
// - Batch operations with progress tracking
// 
// ============================================================
