/**
 * Password Reset Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/password-reset.repository.interface
 * 
 * @description
 * Repository interface for PasswordReset entity persistence.
 * Manages password reset requests, token validation, and cleanup.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Supports pagination and filtering
 * ✅ Bulk operations for maintenance
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Bangladesh specific - Phone-based reset support
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { PasswordReset, PasswordResetStatus, PasswordResetMethod, ResetIdentifier } from '../entities/password-reset.entity';
import { Token } from '../value-objects/token.vo';
import { Phone } from '../value-objects/phone.vo';

// ==================== Types ====================

/**
 * Password reset status filter
 */
export type PasswordResetStatusFilter = PasswordResetStatus | 'all';

/**
 * Password reset filters
 */
export interface PasswordResetFilters {
  userId?: string;
  email?: string;
  phoneNumber?: string;
  status?: PasswordResetStatusFilter;
  method?: PasswordResetMethod;
  fromDate?: Date;
  toDate?: Date;
  isExpired?: boolean;
  isActive?: boolean;
  ipAddress?: string;
  deviceId?: string;
}

/**
 * Password reset statistics
 */
export interface PasswordResetStatistics {
  totalRequests: number;
  activeRequests: number;
  expiredRequests: number;
  usedRequests: number;
  cancelledRequests: number;
  averageResponseTimeMinutes: number;
  completionRate: number;
  requestsLast24h: number;
  requestsLast7Days: number;
  requestsLast30Days: number;
  byMethod: Record<PasswordResetMethod, number>;
  byStatus: Record<PasswordResetStatus, number>;
}

/**
 * Rate limit status for password reset
 */
export interface RateLimitStatus {
  isLimited: boolean;
  remainingRequests: number;
  resetTime?: Date;
  remainingCooldownSeconds: number;
}

/**
 * Bulk delete result
 */
export interface BulkDeleteResult {
  deletedCount: number;
  expiredCount: number;
  usedCount: number;
  cancelledCount: number;
  errors: string[];
}

/**
 * Token validation result
 */
export interface TokenValidationResult {
  isValid: boolean;
  resetRequest?: PasswordReset;
  error?: 'not_found' | 'expired' | 'used' | 'cancelled';
}

// ==================== Repository Interface ====================

/**
 * Password Reset Repository Interface
 * 
 * Manages password reset requests and token lifecycle
 */
export interface PasswordResetRepository extends BaseRepository<PasswordReset> {
  // ========== Find Operations ==========
  
  /**
   * Find password reset request by token value
   * @param token - Token value object
   * @returns Password reset entity or null
   */
  findByToken(token: Token): Promise<PasswordReset | null>;
  
  /**
   * Find password reset request by raw token string
   * @param tokenValue - Raw token string
   * @returns Password reset entity or null
   */
  findByTokenValue(tokenValue: string): Promise<PasswordReset | null>;
  
  /**
   * Find password reset request by email
   * @param email - Email address
   * @param options - Pagination options
   * @returns Paginated password reset requests
   */
  findByEmail(
    email: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find password reset request by phone number (Bangladesh specific)
   * @param phone - Phone number
   * @param options - Pagination options
   * @returns Paginated password reset requests
   */
  findByPhone(
    phone: Phone,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find all password reset requests by user ID
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated password reset requests
   */
  findByUserId(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find active (pending and not expired) password reset requests by user ID
   * @param userId - User ID
   * @returns Array of active password reset requests
   */
  findActiveByUserId(userId: string): Promise<PasswordReset[]>;
  
  /**
   * Find requests by status
   * @param status - Request status
   * @param options - Pagination options
   * @returns Paginated requests
   */
  findByStatus(
    status: PasswordResetStatus,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find expired requests
   * @param options - Pagination options
   * @returns Paginated expired requests
   */
  findExpiredRequests(options: PaginationOptions): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find requests by method (email, SMS, WhatsApp)
   * @param method - Reset method
   * @param options - Pagination options
   * @returns Paginated requests
   */
  findByMethod(
    method: PasswordResetMethod,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  /**
   * Find requests by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated requests
   */
  findByFilters(
    filters: PasswordResetFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordReset>>;
  
  // ========== Token Validation ==========
  
  /**
   * Validate token and return request
   * @param token - Token value
   * @returns Token validation result
   */
  validateToken(token: string): Promise<TokenValidationResult>;
  
  /**
   * Check if token exists and is valid
   * @param token - Token value
   * @returns True if token exists and is valid
   */
  isValidToken(token: string): Promise<boolean>;
  
  /**
   * Get validated request by token
   * @param token - Token value
   * @returns Validated request or null
   */
  getValidatedRequestByToken(token: string): Promise<PasswordReset | null>;
  
  // ========== Status Operations ==========
  
  /**
   * Mark password reset request as used
   * @param id - Request ID
   * @returns void
   */
  markUsed(id: string): Promise<void>;
  
  /**
   * Mark request as used by token
   * @param token - Token value
   * @returns void
   */
  markUsedByToken(token: string): Promise<void>;
  
  /**
   * Mark request as expired
   * @param id - Request ID
   * @returns void
   */
  markExpired(id: string): Promise<void>;
  
  /**
   * Cancel request
   * @param id - Request ID
   * @param reason - Cancellation reason
   * @returns void
   */
  cancelRequest(id: string, reason: string): Promise<void>;
  
  // ========== Rate Limiting ==========
  
  /**
   * Get rate limit status for user
   * @param userId - User ID
   * @returns Rate limit status
   */
  getRateLimitStatus(userId: string): Promise<RateLimitStatus>;
  
  /**
   * Get rate limit status by email
   * @param email - Email address
   * @returns Rate limit status
   */
  getRateLimitStatusByEmail(email: string): Promise<RateLimitStatus>;
  
  /**
   * Get rate limit status by phone (Bangladesh specific)
   * @param phone - Phone number
   * @returns Rate limit status
   */
  getRateLimitStatusByPhone(phone: Phone): Promise<RateLimitStatus>;
  
  /**
   * Get request count for user in time window
   * @param userId - User ID
   * @param windowHours - Time window in hours
   * @returns Request count
   */
  getRequestCountInWindow(userId: string, windowHours: number): Promise<number>;
  
  // ========== Delete Operations ==========
  
  /**
   * Delete all password reset requests for a user
   * @param userId - User ID
   * @returns Number of deleted requests
   */
  deleteByUserId(userId: string): Promise<number>;
  
  /**
   * Delete all expired password reset requests (cleanup)
   * @returns Bulk delete result
   */
  deleteExpired(): Promise<BulkDeleteResult>;
  
  /**
   * Delete requests older than retention period
   * @param retentionDays - Days to retain
   * @returns Bulk delete result
   */
  deleteOldRequests(retentionDays: number): Promise<BulkDeleteResult>;
  
  /**
   * Delete requests by email
   * @param email - Email address
   * @returns Number of deleted requests
   */
  deleteByEmail(email: string): Promise<number>;
  
  /**
   * Delete requests by phone (Bangladesh specific)
   * @param phone - Phone number
   * @returns Number of deleted requests
   */
  deleteByPhone(phone: Phone): Promise<number>;
  
  // ========== Check Operations ==========
  
  /**
   * Check if active reset request exists for user
   * @param userId - User ID
   * @returns True if active request exists
   */
  hasActiveRequest(userId: string): Promise<boolean>;
  
  /**
   * Check if active reset request exists by email
   * @param email - Email address
   * @returns True if active request exists
   */
  hasActiveRequestByEmail(email: string): Promise<boolean>;
  
  /**
   * Check if active reset request exists by phone (Bangladesh specific)
   * @param phone - Phone number
   * @returns True if active request exists
   */
  hasActiveRequestByPhone(phone: Phone): Promise<boolean>;
  
  // ========== Get Operations ==========
  
  /**
   * Get the most recent password reset request for user
   * @param userId - User ID
   * @returns Most recent request or null
   */
  getMostRecentByUserId(userId: string): Promise<PasswordReset | null>;
  
  /**
   * Get the most recent active request for user
   * @param userId - User ID
   * @returns Most recent active request or null
   */
  getMostRecentActiveByUserId(userId: string): Promise<PasswordReset | null>;
  
  /**
   * Get request by email (most recent)
   * @param email - Email address
   * @returns Most recent request or null
   */
  getMostRecentByEmail(email: string): Promise<PasswordReset | null>;
  
  /**
   * Get request by phone (most recent - Bangladesh specific)
   * @param phone - Phone number
   * @returns Most recent request or null
   */
  getMostRecentByPhone(phone: Phone): Promise<PasswordReset | null>;
  
  // ========== Count Operations ==========
  
  /**
   * Count active requests by user
   * @param userId - User ID
   * @returns Number of active requests
   */
  countActiveByUserId(userId: string): Promise<number>;
  
  /**
   * Count requests by status
   * @param status - Request status
   * @returns Count of requests
   */
  countByStatus(status: PasswordResetStatus): Promise<number>;
  
  /**
   * Count requests by method
   * @param method - Reset method
   * @returns Count of requests
   */
  countByMethod(method: PasswordResetMethod): Promise<number>;
  
  /**
   * Count requests in date range
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Count of requests
   */
  countInDateRange(fromDate: Date, toDate: Date): Promise<number>;
  
  /**
   * Count requests by user in date range
   * @param userId - User ID
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Count of requests
   */
  countByUserInDateRange(
    userId: string,
    fromDate: Date,
    toDate: Date
  ): Promise<number>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get password reset statistics
   * @returns Password reset statistics
   */
  getStatistics(): Promise<PasswordResetStatistics>;
  
  /**
   * Get daily reset requests for analytics
   * @param days - Number of days to analyze
   * @returns Daily request data
   */
  getDailyRequests(days: number): Promise<Array<{ date: string; count: number; completed: number }>>;
  
  /**
   * Get reset completion rate by method
   * @returns Completion rate by method
   */
  getCompletionRateByMethod(): Promise<Record<PasswordResetMethod, number>>;
  
  // ========== Batch Operations ==========
  
  /**
   * Invalidate all requests for user (security incident)
   * @param userId - User ID
   * @param reason - Invalidation reason
   * @returns Number of invalidated requests
   */
  invalidateAllByUserId(userId: string, reason: string): Promise<number>;
  
  /**
   * Batch update status
   * @param updates - Map of request IDs to status
   * @returns Number of updated records
   */
  batchUpdateStatus(updates: Map<string, PasswordResetStatus>): Promise<number>;
  
  /**
   * Batch expire requests
   * @param ids - Array of request IDs
   * @returns Number of expired requests
   */
  batchExpire(ids: string[]): Promise<number>;
  
  // ========== Save Operations ==========
  
  /**
   * Save with expiration check
   * @param reset - Password reset entity
   * @returns void
   */
  saveWithExpiryCheck(reset: PasswordReset): Promise<void>;
  
  /**
   * Save and invalidate other active requests for same user
   * @param reset - Password reset entity
   * @returns void
   */
  saveAndInvalidateOthers(reset: PasswordReset): Promise<void>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  PasswordResetFilters, 
  PasswordResetStatistics, 
  RateLimitStatus, 
  BulkDeleteResult,
  TokenValidationResult
};
