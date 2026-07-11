/**
 * Login Attempt Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module domain/repositories/login-attempt.repository.interface
 *
 * @description
 * Repository interface for LoginAttempt entity persistence.
 * Tracks login attempts for security monitoring and fraud detection.
 *
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Supports analytics, rate limiting, and fraud detection
 *
 * @example
 * // In application layer
 * const attempts = await loginAttemptRepo.findRecentFailures(userId, 30);
 * if (attempts.length >= 5) {
 *   // Trigger security action
 * }
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { LoginAttempt, LoginResult, RiskLevel } from '../entities/login-attempt.entity';
import { Email } from '../value-objects/email.vo';
import { IpAddress } from '../value-objects/ip-address.vo';
import { DeviceId } from '../value-objects/device-id.vo';

// ============================================================
// Types
// ============================================================

/**
 * Login attempt statistics
 */
export interface LoginAttemptStatistics {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  lockedAttempts: number;
  mfaRequiredAttempts: number;
  suspiciousAttempts: number;
  successRate: number;
  failureRate: number;
  uniqueUsers: number;
  uniqueIPs: number;
  uniqueDevices: number;
  byResult: Record<LoginResult, number>;
  byRiskLevel: Record<RiskLevel, number>;
  byHour: Array<{ hour: string; total: number; success: number; failed: number }>;
  timeframe: { from: Date; to: Date };
}

/**
 * Failed attempt summary (for admin dashboard)
 */
export interface FailedAttemptSummary {
  period: 'hour' | 'day' | 'week' | 'month';
  totalFailed: number;
  uniqueIPs: number;
  uniqueUsers: number;
  topReasons: Array<{ reason: string; count: number }>;
  topIPs: Array<{ ip: string; count: number; location?: string }>;
  trendPercentage: number;
}

/**
 * Login attempt filters
 */
export interface LoginAttemptFilters {
  userId?: string;
  email?: string;
  ipAddress?: IpAddress;
  deviceId?: DeviceId;
  result?: LoginResult;
  riskLevel?: RiskLevel;
  fromDate?: Date;
  toDate?: Date;
  isMfaVerified?: boolean;
  isSuspicious?: boolean;
}

/**
 * Risk pattern detection result
 */
export interface RiskPatternResult {
  patternType: 'brute_force' | 'credential_stuffing' | 'distributed_attack' | 'slow_loris' | 'none';
  detected: boolean;
  confidence: number;
  affectedUsers: string[];
  affectedIPs: string[];
  timeframe: { from: Date; to: Date };
  recommendation: string;
}

/**
 * Rate limit check result
 */
export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  reason?: string;
}

// ============================================================
// Repository Interface
// ============================================================

export interface LoginAttemptRepository extends BaseRepository<LoginAttempt> {
  // ========== Find Operations ==========

  /**
   * Find login attempts by user ID
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated login attempts
   */
  findByUserId(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  /**
   * Find login attempts by email
   * @param email - Email value object
   * @param options - Pagination options
   * @returns Paginated login attempts
   */
  findByEmail(
    email: Email,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  /**
   * Find login attempts by IP address
   * @param ipAddress - IP address value object
   * @param options - Pagination options
   * @returns Paginated login attempts
   */
  findByIpAddress(
    ipAddress: IpAddress,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  /**
   * Find login attempts by device ID
   * @param deviceId - Device ID value object
   * @param options - Pagination options
   * @returns Paginated login attempts
   */
  findByDeviceId(
    deviceId: DeviceId,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  /**
   * Find login attempts by result
   * @param result - Login result
   * @param options - Pagination options
   * @returns Paginated login attempts
   */
  findByResult(
    result: LoginResult,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  /**
   * Find recent failed attempts for a user
   * @param userId - User ID
   * @param hours - Hours to look back
   * @returns Array of failed attempts
   */
  findRecentFailures(
    userId: string,
    hours: number
  ): Promise<LoginAttempt[]>;

  /**
   * Find recent attempts by IP
   * @param ipAddress - IP address
   * @param hours - Hours to look back
   * @returns Array of attempts
   */
  findRecentByIp(
    ipAddress: IpAddress,
    hours: number
  ): Promise<LoginAttempt[]>;

  /**
   * Find suspicious login attempts
   * @param options - Pagination options
   * @returns Paginated suspicious attempts
   */
  findSuspiciousAttempts(
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  /**
   * Find high-risk login attempts
   * @param options - Pagination options
   * @returns Paginated high-risk attempts
   */
  findHighRiskAttempts(
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  /**
   * Find attempts by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated login attempts
   */
  findByFilters(
    filters: LoginAttemptFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<LoginAttempt>>;

  // ========== Count Operations ==========

  /**
   * Count failed attempts for a user in a time window
   * @param userId - User ID
   * @param windowMinutes - Time window in minutes
   * @returns Count of failed attempts
   */
  countFailedAttempts(
    userId: string,
    windowMinutes: number
  ): Promise<number>;

  /**
   * Count attempts by IP in a time window
   * @param ipAddress - IP address
   * @param windowMinutes - Time window in minutes
   * @returns Count of attempts
   */
  countByIp(
    ipAddress: IpAddress,
    windowMinutes: number
  ): Promise<number>;

  /**
   * Count attempts by result
   * @param result - Login result
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Count of attempts
   */
  countByResult(
    result: LoginResult,
    fromDate: Date,
    toDate: Date
  ): Promise<number>;

  // ========== Existence Checks ==========

  /**
   * Check if user has recent successful login
   * @param userId - User ID
   * @param hours - Hours to look back
   * @returns True if recent success exists
   */
  hasRecentSuccess(
    userId: string,
    hours: number
  ): Promise<boolean>;

  /**
   * Check if IP is rate-limited
   * @param ipAddress - IP address
   * @param maxAttempts - Maximum attempts allowed
   * @param windowMinutes - Time window in minutes
   * @returns Rate limit result
   */
  isIpRateLimited(
    ipAddress: IpAddress,
    maxAttempts: number,
    windowMinutes: number
  ): Promise<RateLimitResult>;

  /**
   * Check if user is rate-limited
   * @param userId - User ID
   * @param maxAttempts - Maximum attempts allowed
   * @param windowMinutes - Time window in minutes
   * @returns Rate limit result
   */
  isUserRateLimited(
    userId: string,
    maxAttempts: number,
    windowMinutes: number
  ): Promise<RateLimitResult>;

  // ========== Statistics Operations ==========

  /**
   * Get login attempt statistics
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Statistics
   */
  getStatistics(
    fromDate: Date,
    toDate: Date
  ): Promise<LoginAttemptStatistics>;

  /**
   * Get failed attempt summary
   * @param period - Time period
   * @returns Failed attempt summary
   */
  getFailedAttemptSummary(
    period: 'hour' | 'day' | 'week' | 'month'
  ): Promise<FailedAttemptSummary>;

  /**
   * Get successful login rate over time
   * @param days - Number of days
   * @returns Daily success rates
   */
  getSuccessRateTrend(
    days: number
  ): Promise<Array<{ date: string; rate: number; attempts: number }>>;

  // ========== Pattern Detection Operations ==========

  /**
   * Detect brute force patterns
   * @param hours - Hours to analyze
   * @returns Risk pattern result
   */
  detectBruteForcePattern(
    hours: number
  ): Promise<RiskPatternResult>;

  /**
   * Detect credential stuffing patterns
   * @param hours - Hours to analyze
   * @returns Risk pattern result
   */
  detectCredentialStuffing(
    hours: number
  ): Promise<RiskPatternResult>;

  /**
   * Detect distributed attack patterns
   * @param hours - Hours to analyze
   * @returns Risk pattern result
   */
  detectDistributedAttack(
    hours: number
  ): Promise<RiskPatternResult>;

  /**
   * Get IP reputation score
   * @param ipAddress - IP address
   * @returns Reputation score (0-100)
   */
  getIpReputation(
    ipAddress: IpAddress
  ): Promise<{
    score: number;
    level: 'trusted' | 'neutral' | 'suspicious' | 'malicious';
    factors: string[];
    lastUpdated: Date;
  }>;

  // ========== Cleanup Operations ==========

  /**
   * Delete old login attempts (cleanup)
   * @param retentionDays - Days to keep
   * @returns Number of deleted records
   */
  deleteOldAttempts(
    retentionDays: number
  ): Promise<number>;

  /**
   * Archive old login attempts
   * @param olderThanDays - Archive attempts older than N days
   * @returns Number of archived records
   */
  archiveOldAttempts(
    olderThanDays: number
  ): Promise<number>;
}
