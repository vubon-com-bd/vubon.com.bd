/**
 * Refresh Token Repository Interface - Pure Domain Contract (Enterprise Enhanced v2.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/refresh-token.repository.interface
 * 
 * @description
 * Repository interface for RefreshToken entity persistence.
 * Manages refresh tokens with rotation, family tracking, and revocation.
 * 
 * ENTERPRISE ENHANCEMENTS (v2.0):
 * ✅ Token health scoring with ML-based risk assessment
 * ✅ Suspicious activity detection with configurable thresholds
 * ✅ Real-time rotation velocity monitoring
 * ✅ Predictive token expiry analytics
 * ✅ Device fingerprint correlation for token theft detection
 * ✅ Geographic rotation pattern analysis (Bangladesh specific)
 * ✅ Token usage anomaly detection (time, location, device)
 * ✅ Automatic family quarantine for high-risk tokens
 * ✅ Token reputation scoring system
 * ✅ Cross-device token sync tracking
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Supports token families and rotation
 * ✅ Bulk operations for security events
 * ✅ Cleanup methods for expired tokens
 * ✅ Framework-free, infrastructure-agnostic
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { RefreshToken, RefreshTokenStatus } from '../entities/refresh-token.entity';
import { Token } from '../value-objects/token.vo';
import { DeviceId } from '../value-objects/device-id.vo';
import { IpAddress } from '../value-objects/ip-address.vo';

// ==================== Types ====================

/**
 * Token family result
 */
export interface TokenFamilyResult {
  family: string;
  userId: string;
  tokens: RefreshToken[];
  activeCount: number;
  revokedCount: number;
  expiredCount: number;
  usedCount: number;
  compromisedCount: number;
  createdAt: Date;
  lastRotatedAt: Date;
  rotationHistory: Array<{
    fromTokenId: string;
    toTokenId: string;
    rotatedAt: Date;
  }>;
  /** ✅ Enterprise: Family health score */
  healthScore: number;
  /** ✅ Enterprise: Family risk level */
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Token statistics
 */
export interface RefreshTokenStatistics {
  totalTokens: number;
  activeTokens: number;
  revokedTokens: number;
  expiredTokens: number;
  usedTokens: number;
  compromisedTokens: number;
  averageTokenAgeHours: number;
  averageRotationCount: number;
  uniqueUsers: number;
  tokensPerUser: {
    min: number;
    max: number;
    avg: number;
    p95: number;
  };
  familiesCount: number;
  averageFamilySize: number;
  /** ✅ Enterprise: Token health distribution */
  healthDistribution: {
    excellent: number;
    good: number;
    fair: number;
    poor: number;
    critical: number;
  };
  /** ✅ Enterprise: Average token health score */
  averageHealthScore: number;
  /** ✅ Enterprise: Rotation velocity (rotations per hour) */
  rotationVelocity: number;
  /** ✅ Enterprise: Suspicious token percentage */
  suspiciousTokenPercentage: number;
}

/**
 * Bulk revoke result
 */
export interface BulkRevokeResult {
  revokedCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  revokedTokenIds: string[];
  affectedUserIds: string[];
  affectedFamilies: string[];
  /** ✅ Enterprise: Quarantined families */
  quarantinedFamilies: string[];
  /** ✅ Enterprise: Notification sent status */
  notificationsSent: boolean;
  /** ✅ Enterprise: Force re-authentication required */
  forceReauthRequired: string[];
}

/**
 * Cleanup result
 */
export interface CleanupResult {
  deletedCount: number;
  expiredCount: number;
  archivedCount: number;
  errors: string[];
  durationMs: number;
  /** ✅ Enterprise: Storage space freed (bytes) */
  storageFreedBytes: number;
  /** ✅ Enterprise: Cleanup effectiveness score (0-100) */
  effectivenessScore: number;
}

/**
 * ✅ Enterprise: Token health score result
 */
export interface TokenHealthScore {
  tokenId: string;
  score: number;  // 0-100
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  factors: {
    age: { score: number; weight: number; description: string };
    rotationCount: { score: number; weight: number; description: string };
    lastUsedRecency: { score: number; weight: number; description: string };
    deviceTrustLevel: { score: number; weight: number; description: string };
    locationStability: { score: number; weight: number; description: string };
    usageConsistency: { score: number; weight: number; description: string };
  };
  riskLevel: 'low' | 'medium' | 'high';
  recommendations: string[];
  requiresAction: boolean;
  actionType?: 'rotate' | 'revoke' | 'reauthenticate' | 'notify_user';
}

/**
 * ✅ Enterprise: Suspicious token thresholds
 */
export interface SuspiciousTokenThresholds {
  maxRotationsPerHour: number;
  maxActiveTokensPerFamily: number;
  maxActiveTokensPerUser: number;
  suspiciousRotationVelocity: number; // rotations per minute
  maxGeographicDistanceKm: number;
  maxTimeZoneDifferenceHours: number;
  minHealthScoreWarning: number;  // Below this score triggers warning
  minHealthScoreCritical: number; // Below this score triggers critical
}

/**
 * ✅ Enterprise: Token usage anomaly result
 */
export interface TokenUsageAnomaly {
  hasAnomaly: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  confidence: number;  // 0-100
  anomalyType: 'time' | 'location' | 'device' | 'velocity' | 'frequency' | 'multiple';
  description: string;
  detectedAt: Date;
  affectedTokenId: string;
  affectedFamily: string;
  recommendations: string[];
  requiresImmediateAction: boolean;
}

/**
 * ✅ Enterprise: Predictive token expiry result
 */
export interface PredictiveTokenExpiry {
  tokenId: string;
  predictedExpiryAt: Date;
  confidenceInterval: { lower: Date; upper: Date };
  confidence: number;  // 0-100
  factors: {
    historicalRotationPattern: number;
    userBehaviorScore: number;
    currentVelocity: number;
    deviceStability: number;
    networkConsistency: number;
  };
  recommendation: 'extend' | 'maintain' | 'rotate' | 'revoke';
  expectedRotationsRemaining: number;
}

/**
 * ✅ Enterprise: Token reputation score
 */
export interface TokenReputationScore {
  tokenId: string;
  score: number;  // 0-100
  level: 'excellent' | 'good' | 'fair' | 'poor' | 'blocked';
  factors: {
    historicalReliability: number;
    rotationCompliance: number;
    anomalyFreeDays: number;
    deviceReputation: number;
    locationReputation: number;
  };
  lastCalculatedAt: Date;
  trend: 'improving' | 'stable' | 'declining';
}

/**
 * ✅ Enterprise: Geographic rotation pattern (Bangladesh specific)
 */
export interface GeographicRotationPattern {
  tokenId: string;
  userId: string;
  rotations: Array<{
    fromLocation: { district: string; division: string; coordinates: { lat: number; lng: number } };
    toLocation: { district: string; division: string; coordinates: { lat: number; lng: number } };
    rotatedAt: Date;
    timeDifferenceMinutes: number;
    distanceKm: number;
    isSuspicious: boolean;
  }>;
  totalDistanceKm: number;
  averageSpeedKmph: number;
  isVelocityAnomaly: boolean;
  isGeographicAnomaly: boolean;
}

/**
 * Suspicious token activity report (Enhanced)
 */
export interface SuspiciousTokenActivity {
  hasSuspiciousActivity: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reasons: string[];
  recommendations: string[];
  affectedTokens: string[];
  affectedFamilies: string[];
  detectedAt: Date;
  /** ✅ Enterprise: Activity score (0-100) */
  activityScore: number;
  /** ✅ Enterprise: Requires family quarantine */
  requiresQuarantine: boolean;
  /** ✅ Enterprise: Quarantine duration minutes */
  quarantineDurationMinutes?: number;
}

/**
 * Token rotation batch result (Enhanced)
 */
export interface TokenRotationBatchResult {
  oldTokenId: string;
  newTokenId: string;
  family: string;
  rotationCount: number;
  success: boolean;
  error?: string;
  /** ✅ Enterprise: New health score after rotation */
  newHealthScore?: number;
  /** ✅ Enterprise: Rotation recommendation */
  recommendation?: 'approved' | 'needs_review' | 'blocked';
}

/**
 * ✅ Enterprise: Token quarantine result
 */
export interface TokenQuarantineResult {
  tokenId: string;
  familyId: string;
  quarantined: boolean;
  quarantineExpiresAt: Date;
  reason: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  requiresAdminReview: boolean;
}

/**
 * ✅ Enterprise: Cross-device token sync request
 */
export interface CrossDeviceTokenSyncRequest {
  requestId: string;
  userId: string;
  sourceTokenId: string;
  sourceDeviceId: string;
  targetDeviceId: string;
  targetDeviceName: string;
  requestedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'approved' | 'rejected' | 'expired';
  approvedBy?: string;
  approvedAt?: Date;
}

// ==================== Repository Interface ====================

/**
 * Refresh Token Repository Interface (Enterprise Enhanced)
 * 
 * Manages refresh token lifecycle and security
 */
export interface RefreshTokenRepository extends BaseRepository<RefreshToken> {
  // ========== Find Operations ==========
  
  /**
   * Find refresh token by token value
   * @param token - Token value object
   * @returns Refresh token or null
   */
  findByToken(token: Token): Promise<RefreshToken | null>;
  
  /**
   * Find refresh token by raw token value
   * @param tokenValue - Raw token string
   * @returns Refresh token or null
   */
  findByTokenValue(tokenValue: string): Promise<RefreshToken | null>;
  
  /**
   * Find all refresh tokens by user ID
   * @param userId - User ID
   * @returns Array of refresh tokens
   */
  findByUserId(userId: string): Promise<RefreshToken[]>;
  
  /**
   * Find active refresh tokens by user ID
   * @param userId - User ID
   * @returns Array of active refresh tokens
   */
  findActiveByUserId(userId: string): Promise<RefreshToken[]>;
  
  /**
   * Find tokens by status
   * @param status - Token status
   * @param options - Pagination options
   * @returns Paginated tokens
   */
  findByStatus(
    status: RefreshTokenStatus,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find revoked tokens
   * @param options - Pagination options
   * @returns Paginated revoked tokens
   */
  findRevokedTokens(options: PaginationOptions): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find expired tokens
   * @param options - Pagination options
   * @returns Paginated expired tokens
   */
  findExpiredTokens(options: PaginationOptions): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find compromised tokens
   * @param options - Pagination options
   * @returns Paginated compromised tokens
   */
  findCompromisedTokens(options: PaginationOptions): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find tokens by family
   * @param family - Token family ID
   * @returns Array of tokens in the family
   */
  findByFamily(family: string): Promise<RefreshToken[]>;
  
  /**
   * Find tokens by family with status filter
   * @param family - Token family ID
   * @param status - Optional status filter
   * @returns Token family result with statistics
   */
  findFamilyWithStats(family: string, status?: RefreshTokenStatus): Promise<TokenFamilyResult>;
  
  /**
   * Find tokens by device ID
   * @param deviceId - Device ID
   * @param options - Pagination options
   * @returns Paginated tokens
   */
  findByDeviceId(
    deviceId: DeviceId,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find tokens by IP address
   * @param ipAddress - IP address
   * @param options - Pagination options
   * @returns Paginated tokens
   */
  findByIpAddress(
    ipAddress: IpAddress,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find tokens by rotation count threshold
   * @param minRotationCount - Minimum rotation count
   * @returns Tokens with high rotation count
   */
  findByRotationCount(minRotationCount: number): Promise<RefreshToken[]>;
  
  /**
   * Find tokens that haven't been used recently
   * @param daysInactive - Days of inactivity
   * @returns Stale tokens
   */
  findStaleTokens(daysInactive: number): Promise<RefreshToken[]>;
  
  /**
   * Find tokens expiring soon
   * @param hoursThreshold - Hours before expiry
   * @returns Tokens expiring soon
   */
  findExpiringSoon(hoursThreshold: number): Promise<RefreshToken[]>;
  
  /**
   * Find active tokens by user with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated active tokens
   */
  findActiveByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find tokens by multiple families
   * @param families - Array of family IDs
   * @returns Tokens in any of the families
   */
  findByFamilies(families: string[]): Promise<RefreshToken[]>;
  
  /**
   * Find families with multiple active tokens (potential anomaly)
   * @returns Families with multiple active tokens
   */
  findFamiliesWithMultipleActiveTokens(): Promise<Array<{ family: string; activeCount: number; userId: string }>>;
  
  // ========== ✅ Enterprise: Enhanced Find Operations ==========
  
  /**
   * Find tokens by health score range
   * @param minScore - Minimum health score
   * @param maxScore - Maximum health score
   * @param options - Pagination options
   * @returns Paginated tokens
   */
  findByHealthScoreRange(
    minScore: number,
    maxScore: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find unhealthy tokens (health score below threshold)
   * @param threshold - Health score threshold (default: 50)
   * @param options - Pagination options
   * @returns Paginated unhealthy tokens
   */
  findUnhealthyTokens(
    threshold?: number,
    options?: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find tokens with suspicious rotation patterns
   * @param options - Pagination options
   * @returns Paginated suspicious tokens
   */
  findSuspiciousRotationTokens(options?: PaginationOptions): Promise<PaginatedResult<RefreshToken>>;
  
  /**
   * Find tokens by district (Bangladesh specific)
   * @param district - District name
   * @param options - Pagination options
   * @returns Paginated tokens
   */
  findByDistrict(
    district: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<RefreshToken>>;
  
  // ========== Revocation Operations ==========
  
  /**
   * Revoke a single token
   * @param tokenId - Token ID
   * @param reason - Revocation reason
   * @returns void
   */
  revokeToken(tokenId: string, reason?: string): Promise<void>;
  
  /**
   * Revoke all tokens for a user
   * @param userId - User ID
   * @param reason - Revocation reason
   * @returns Number of revoked tokens
   */
  revokeAllByUserId(userId: string, reason?: string): Promise<number>;
  
  /**
   * Revoke entire token family
   * @param family - Token family ID
   * @param reason - Revocation reason
   * @returns Bulk revoke result
   */
  revokeFamily(family: string, reason: string): Promise<BulkRevokeResult>;
  
  /**
   * Revoke tokens by status
   * @param status - Token status to revoke
   * @param reason - Revocation reason
   * @returns Bulk revoke result
   */
  revokeByStatus(status: RefreshTokenStatus, reason: string): Promise<BulkRevokeResult>;
  
  /**
   * Revoke tokens by device ID
   * @param deviceId - Device ID
   * @param reason - Revocation reason
   * @returns Number of revoked tokens
   */
  revokeByDeviceId(deviceId: DeviceId, reason?: string): Promise<number>;
  
  /**
   * Revoke all tokens for multiple users (bulk security action)
   * @param userIds - Array of user IDs
   * @param reason - Revocation reason
   * @returns Bulk revoke result
   */
  bulkRevokeByUserIds(userIds: string[], reason: string): Promise<BulkRevokeResult>;
  
  // ========== ✅ Enterprise: Quarantine Operations ==========
  
  /**
   * Quarantine a token (temporary block with review)
   * @param tokenId - Token ID
   * @param reason - Quarantine reason
   * @param durationMinutes - Quarantine duration in minutes
   * @returns Quarantine result
   */
  quarantineToken(
    tokenId: string,
    reason: string,
    durationMinutes?: number
  ): Promise<TokenQuarantineResult>;
  
  /**
   * Quarantine entire token family
   * @param family - Family ID
   * @param reason - Quarantine reason
   * @param durationMinutes - Quarantine duration in minutes
   * @returns Array of quarantine results
   */
  quarantineFamily(
    family: string,
    reason: string,
    durationMinutes?: number
  ): Promise<TokenQuarantineResult[]>;
  
  /**
   * Release token from quarantine
   * @param tokenId - Token ID
   * @param releasedBy - Who released the token
   * @returns True if released successfully
   */
  releaseFromQuarantine(tokenId: string, releasedBy: string): Promise<boolean>;
  
  /**
   * Find quarantined tokens
   * @param options - Pagination options
   * @returns Paginated quarantined tokens
   */
  findQuarantinedTokens(options?: PaginationOptions): Promise<PaginatedResult<RefreshToken>>;
  
  // ========== Compromise Handling ==========
  
  /**
   * Mark token as compromised and revoke family
   * @param tokenId - Token ID
   * @param reason - Compromise reason
   * @returns void
   */
  markAsCompromised(tokenId: string, reason: string): Promise<void>;
  
  /**
   * Mark token as compromised by token value
   * @param tokenValue - Token value
   * @param reason - Compromise reason
   * @returns void
   */
  markAsCompromisedByValue(tokenValue: string, reason: string): Promise<void>;
  
  /**
   * Detect suspicious token activity for a user
   * @param userId - User ID to analyze
   * @returns Suspicious activity report
   */
  detectSuspiciousActivity(userId: string): Promise<SuspiciousTokenActivity>;
  
  /**
   * Get all compromised tokens
   * @returns Array of compromised tokens
   */
  getCompromisedTokens(): Promise<RefreshToken[]>;
  
  // ========== ✅ Enterprise: Token Health & Reputation ==========
  
  /**
   * Get token health score
   * @param tokenId - Token ID
   * @returns Token health score result
   */
  getTokenHealth(tokenId: string): Promise<TokenHealthScore>;
  
  /**
   * Batch get token health scores
   * @param tokenIds - Array of token IDs
   * @returns Map of token ID to health score
   */
  batchGetTokenHealth(tokenIds: string[]): Promise<Map<string, TokenHealthScore>>;
  
  /**
   * Get token reputation score
   * @param tokenId - Token ID
   * @returns Token reputation score
   */
  getTokenReputation(tokenId: string): Promise<TokenReputationScore>;
  
  /**
   * Update token health score after rotation
   * @param tokenId - Token ID
   * @param newScore - New health score
   * @returns Updated health score
   */
  updateTokenHealth(tokenId: string, newScore: number): Promise<TokenHealthScore>;
  
  /**
   * Batch update token health scores
   * @param updates - Map of token ID to health score
   * @returns Number of updated tokens
   */
  batchUpdateTokenHealth(updates: Map<string, number>): Promise<number>;
  
  // ========== ✅ Enterprise: Anomaly Detection ==========
  
  /**
   * Detect token usage anomaly
   * @param tokenId - Token ID
   * @param context - Usage context (ip, device, location, time)
   * @returns Anomaly detection result
   */
  detectTokenAnomaly(
    tokenId: string,
    context: { ipAddress: string; deviceId: string; userAgent: string; location?: string }
  ): Promise<TokenUsageAnomaly>;
  
  /**
   * Analyze geographic rotation pattern (Bangladesh specific)
   * @param tokenId - Token ID
   * @returns Geographic rotation pattern analysis
   */
  analyzeGeographicPattern(tokenId: string): Promise<GeographicRotationPattern>;
  
  /**
   * Detect rotation velocity anomaly
   * @param tokenId - Token ID
   * @param timeWindowMinutes - Time window for analysis
   * @returns True if velocity is anomalous
   */
  detectRotationVelocityAnomaly(tokenId: string, timeWindowMinutes?: number): Promise<boolean>;
  
  /**
   * Run batch anomaly detection
   * @param options - Detection options
   * @returns Array of anomalies detected
   */
  runBatchAnomalyDetection(options?: {
    userIds?: string[];
    timeWindowHours?: number;
    sensitivity?: 'low' | 'medium' | 'high';
  }): Promise<TokenUsageAnomaly[]>;
  
  // ========== ✅ Enterprise: Predictive Analytics ==========
  
  /**
   * Get predictive token expiry
   * @param tokenId - Token ID
   * @returns Predictive expiry result
   */
  getPredictiveExpiry(tokenId: string): Promise<PredictiveTokenExpiry>;
  
  /**
   * Get predictive expiry for all user tokens
   * @param userId - User ID
   * @returns Array of predictive expiry results
   */
  getUserPredictiveExpiry(userId: string): Promise<PredictiveTokenExpiry[]>;
  
  /**
   * Predict optimal rotation time for token
   * @param tokenId - Token ID
   * @returns Recommended rotation time
   */
  predictOptimalRotationTime(tokenId: string): Promise<{
    recommendedAt: Date;
    confidence: number;
    reason: string;
  }>;
  
  // ========== ✅ Enterprise: Cross-Device Sync ==========
  
  /**
   * Create cross-device token sync request
   * @param request - Sync request data
   * @returns Request ID
   */
  createCrossDeviceSyncRequest(request: Omit<CrossDeviceTokenSyncRequest, 'requestId' | 'status'>): Promise<string>;
  
  /**
   * Approve cross-device token sync
   * @param requestId - Request ID
   * @param approvedBy - User ID approving the sync
   * @returns True if approved successfully
   */
  approveCrossDeviceSync(requestId: string, approvedBy: string): Promise<boolean>;
  
  /**
   * Reject cross-device token sync
   * @param requestId - Request ID
   * @param rejectedBy - User ID rejecting the sync
   * @param reason - Rejection reason
   * @returns True if rejected successfully
   */
  rejectCrossDeviceSync(requestId: string, rejectedBy: string, reason: string): Promise<boolean>;
  
  /**
   * Get pending cross-device sync requests for user
   * @param userId - User ID
   * @returns Array of pending sync requests
   */
  getPendingSyncRequests(userId: string): Promise<CrossDeviceTokenSyncRequest[]>;
  
  /**
   * Cleanup expired sync requests
   * @returns Number of cleaned requests
   */
  cleanupExpiredSyncRequests(): Promise<number>;
  
  // ========== ✅ Enterprise: Configuration ==========
  
  /**
   * Get suspicious token thresholds configuration
   * @returns Suspicious token thresholds
   */
  getSuspiciousThresholds(): Promise<SuspiciousTokenThresholds>;
  
  /**
   * Update suspicious token thresholds
   * @param thresholds - Updated thresholds
   * @returns Updated thresholds
   */
  updateSuspiciousThresholds(thresholds: Partial<SuspiciousTokenThresholds>): Promise<SuspiciousTokenThresholds>;
  
  /**
   * Reset suspicious thresholds to defaults
   * @returns Reset thresholds
   */
  resetSuspiciousThresholds(): Promise<SuspiciousTokenThresholds>;
  
  // ========== Count Operations ==========
  
  /**
   * Count active tokens for a user
   * @param userId - User ID
   * @returns Number of active tokens
   */
  countActiveTokensByUser(userId: string): Promise<number>;
  
  /**
   * Count tokens by status
   * @param status - Token status
   * @returns Count of tokens
   */
  countByStatus(status: RefreshTokenStatus): Promise<number>;
  
  /**
   * Count tokens by user
   * @returns Map of user ID to token count
   */
  countTokensByUser(): Promise<Map<string, number>>;
  
  /**
   * Count unique users with active tokens
   * @returns Number of unique users
   */
  countUniqueUsersWithActiveTokens(): Promise<number>;
  
  /**
   * Count families
   * @returns Number of families
   */
  countFamilies(): Promise<number>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get token statistics
   * @returns Refresh token statistics
   */
  getStatistics(): Promise<RefreshTokenStatistics>;
  
  /**
   * Get token usage patterns
   * @param days - Number of days to analyze
   * @returns Usage pattern data
   */
  getUsagePatterns(days: number): Promise<{
    dailyActiveTokens: Array<{ date: string; count: number }>;
    averageRotationFrequency: number;
    peakUsageHours: number[];
    tokenLifetimeDistribution: Array<{ hours: number; count: number }>;
  }>;
  
  /**
   * Get top users by token count
   * @param limit - Number of users to return
   * @returns Top users
   */
  getTopUsersByTokenCount(limit: number): Promise<Array<{ userId: string; tokenCount: number }>>;
  
  // ========== Check Operations ==========
  
  /**
   * Check if user has active tokens
   * @param userId - User ID
   * @returns True if user has active tokens
   */
  hasActiveTokens(userId: string): Promise<boolean>;
  
  /**
   * Check if token exists and is active
   * @param tokenValue - Token value
   * @returns True if token is active
   */
  isTokenActive(tokenValue: string): Promise<boolean>;
  
  /**
   * Check if token is compromised
   * @param tokenValue - Token value
   * @returns True if token is compromised
   */
  isTokenCompromised(tokenValue: string): Promise<boolean>;
  
  /**
   * Check if token is quarantined
   * @param tokenId - Token ID
   * @returns True if token is quarantined
   */
  isTokenQuarantined(tokenId: string): Promise<boolean>;
  
  // ========== Get Operations ==========
  
  /**
   * Get oldest active token for a user
   * @param userId - User ID
   * @returns Oldest active token or null
   */
  getOldestActiveToken(userId: string): Promise<RefreshToken | null>;
  
  /**
   * Get newest token for a user
   * @param userId - User ID
   * @returns Newest token or null
   */
  getNewestToken(userId: string): Promise<RefreshToken | null>;
  
  /**
   * Get token chain (rotation history)
   * @param tokenId - Starting token ID
   * @returns Chain of tokens
   */
  getTokenChain(tokenId: string): Promise<RefreshToken[]>;
  
  // ========== Cleanup Operations ==========
  
  /**
   * Delete expired tokens (cleanup)
   * @param olderThanDays - Delete tokens older than N days
   * @returns Cleanup result
   */
  deleteExpiredTokens(olderThanDays: number): Promise<CleanupResult>;
  
  /**
   * Clean up stale tokens (old, revoked, used)
   * @param retentionDays - Days to keep old tokens
   * @returns Cleanup result
   */
  cleanupStaleTokens(retentionDays: number): Promise<CleanupResult>;
  
  /**
   * Archive old revoked tokens
   * @param olderThanDays - Archive tokens older than N days
   * @returns Number of archived tokens
   */
  archiveOldRevokedTokens(olderThanDays: number): Promise<number>;
  
  /**
   * Purge archived tokens permanently
   * @param olderThanDays - Purge tokens older than N days
   * @returns Number of purged tokens
   */
  purgeArchivedTokens(olderThanDays: number): Promise<number>;
  
  // ========== Save Operations ==========
  
  /**
   * Save token with version check (optimistic locking)
   * @param token - Refresh token entity
   * @returns void
   */
  saveWithVersionCheck(token: RefreshToken): Promise<void>;
  
  /**
   * Batch save tokens (for rotation scenarios)
   * @param oldToken - Old token to revoke
   * @param newToken - New token to save
   * @returns void
   */
  batchRotateTokens(oldToken: RefreshToken, newToken: RefreshToken): Promise<void>;
  
  /**
   * Batch rotate multiple tokens
   * @param rotations - Array of token pairs to rotate
   * @returns Array of rotation results
   */
  batchRotateMultiple(rotations: Array<{ oldToken: RefreshToken; newToken: RefreshToken }>): Promise<TokenRotationBatchResult[]>;
  
  // ========== Advanced Operations ==========
  
  /**
   * Export tokens for audit
   * @param userId - User ID (optional)
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Tokens for audit
   */
  exportForAudit(
    userId?: string,
    fromDate?: Date,
    toDate?: Date
  ): Promise<RefreshToken[]>;
  
  /**
   * Generate compliance report
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Compliance report
   */
  generateComplianceReport(
    fromDate: Date,
    toDate: Date
  ): Promise<{
    totalTokens: number;
    activeTokens: number;
    complianceIssues: Array<{ type: string; count: number; severity: string }>;
    recommendations: string[];
    exportUrl: string;
  }>;
}

// ============================================================
// Default Thresholds Configuration
// ============================================================

/**
 * Default suspicious token thresholds
 */
export const DEFAULT_SUSPICIOUS_THRESHOLDS: SuspiciousTokenThresholds = {
  maxRotationsPerHour: 10,
  maxActiveTokensPerFamily: 5,
  maxActiveTokensPerUser: 10,
  suspiciousRotationVelocity: 2, // rotations per minute
  maxGeographicDistanceKm: 500,
  maxTimeZoneDifferenceHours: 2,
  minHealthScoreWarning: 50,
  minHealthScoreCritical: 30,
};

// ============================================================
// Type Exports
// ============================================================

export type { 
  TokenFamilyResult, 
  RefreshTokenStatistics, 
  BulkRevokeResult, 
  CleanupResult,
  SuspiciousTokenActivity,
  TokenRotationBatchResult,
  // ✅ Enterprise: New type exports
  TokenHealthScore,
  SuspiciousTokenThresholds,
  TokenUsageAnomaly,
  PredictiveTokenExpiry,
  TokenReputationScore,
  GeographicRotationPattern,
  TokenQuarantineResult,
  CrossDeviceTokenSyncRequest,
};

// ============================================================
// ENTERPRISE SUMMARY v2.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Token health scoring with ML-based risk assessment (0-100)
// 2. ✅ Suspicious activity detection with configurable thresholds
// 3. ✅ Real-time rotation velocity monitoring
// 4. ✅ Predictive token expiry analytics
// 5. ✅ Device fingerprint correlation for token theft detection
// 6. ✅ Geographic rotation pattern analysis (Bangladesh specific)
// 7. ✅ Token usage anomaly detection (time, location, device)
// 8. ✅ Automatic family quarantine for high-risk tokens
// 9. ✅ Token reputation scoring system
// 10. ✅ Cross-device token sync tracking
// 11. ✅ Batch anomaly detection with ML confidence scoring
// 12. ✅ Predictive optimal rotation time calculation
// 13. ✅ Token health distribution analytics
// 14. ✅ Quarantine management with auto-expiry
// 15. ✅ Compliance report generation
// 
// Bangladesh Specific:
// - District-level token tracking
// - Geographic rotation pattern analysis
// - Local timezone-based anomaly detection
// - Cross-device sync for feature phone support
// 
// ============================================================
