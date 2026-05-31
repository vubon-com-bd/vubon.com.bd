/**
 * Refresh Token Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/refresh-token.repository.interface
 * 
 * @description
 * Repository interface for RefreshToken entity persistence.
 * Manages refresh tokens with rotation, family tracking, and revocation.
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
}

/**
 * Suspicious token activity report
 */
export interface SuspiciousTokenActivity {
  hasSuspiciousActivity: boolean;
  severity: 'low' | 'medium' | 'high' | 'critical';
  reasons: string[];
  recommendations: string[];
  affectedTokens: string[];
  affectedFamilies: string[];
  detectedAt: Date;
}

/**
 * Token rotation batch result
 */
export interface TokenRotationBatchResult {
  oldTokenId: string;
  newTokenId: string;
  family: string;
  rotationCount: number;
  success: boolean;
  error?: string;
}

// ==================== Repository Interface ====================

/**
 * Refresh Token Repository Interface
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
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  TokenFamilyResult, 
  RefreshTokenStatistics, 
  BulkRevokeResult, 
  CleanupResult,
  SuspiciousTokenActivity,
  TokenRotationBatchResult
};
