/**
 * Email Verification Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/email-verification.repository.interface
 * 
 * @description
 * Repository interface for EmailVerification entity persistence.
 * Manages email verification tokens and their lifecycle.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Supports batch operations and cleanup
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { EmailVerification, EmailVerificationStatus } from '../entities/email-verification.entity';
import { Token } from '../value-objects/token.vo';
import { Email } from '../value-objects/email.vo';

// ==================== Types ====================

/**
 * Email verification statistics
 */
export interface EmailVerificationStatistics {
  totalVerifications: number;
  pendingVerifications: number;
  verifiedVerifications: number;
  expiredVerifications: number;
  revokedVerifications: number;
  averageVerificationTimeHours: number;
  verificationRate: number;
  // Time series data
  dailyVerifications?: Array<{ date: string; sent: number; verified: number }>;
}

/**
 * Email verification filters
 */
export interface EmailVerificationFilters {
  userId?: string;
  email?: string;
  emailDomain?: string;      // Filter by email domain (e.g., gmail.com)
  status?: EmailVerificationStatus;
  fromDate?: Date;
  toDate?: Date;
  isExpired?: boolean;
  isVerified?: boolean;
  resendCountMin?: number;
  resendCountMax?: number;
}

/**
 * Bulk operation result
 */
export interface BulkOperationResult {
  successCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  successIds: string[];
}

/**
 * Verification rate result
 */
export interface VerificationRateResult {
  totalSent: number;
  totalVerified: number;
  rate: number;
  byDomain?: Array<{ domain: string; sent: number; verified: number; rate: number }>;
}

// ==================== Repository Interface ====================

/**
 * Email Verification Repository Interface
 * 
 * Manages email verification token lifecycle
 */
export interface EmailVerificationRepository extends BaseRepository<EmailVerification> {
  // ========== Basic Find Operations ==========
  
  /**
   * Find verification by user ID
   * @param userId - User ID
   * @returns Email verification entity or null
   */
  findByUserId(userId: string): Promise<EmailVerification | null>;
  
  /**
   * Find verification by user ID and status
   * @param userId - User ID
   * @param status - Verification status
   * @returns Email verification entity or null
   */
  findByUserIdAndStatus(
    userId: string,
    status: EmailVerificationStatus
  ): Promise<EmailVerification | null>;
  
  /**
   * Find verification by token
   * @param token - Verification token
   * @returns Email verification entity or null
   */
  findByToken(token: Token): Promise<EmailVerification | null>;
  
  /**
   * Find verification by token value (string)
   * @param tokenValue - Raw token string
   * @returns Email verification entity or null
   */
  findByTokenValue(tokenValue: string): Promise<EmailVerification | null>;
  
  /**
   * Find verification by email
   * @param email - Email address
   * @returns Email verification entity or null
   */
  findByEmail(email: Email): Promise<EmailVerification | null>;
  
  /**
   * Find pending verifications (not verified, not expired)
   * @param options - Pagination options
   * @returns Paginated pending verifications
   */
  findPendingVerifications(
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find expired verifications
   * @param options - Pagination options
   * @returns Paginated expired verifications
   */
  findExpiredVerifications(
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find verifications by email domain
   * @param domain - Email domain (e.g., 'gmail.com')
   * @param options - Pagination options
   * @returns Paginated verifications
   */
  findByEmailDomain(
    domain: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find verifications by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated verifications
   */
  findByFilters(
    filters: EmailVerificationFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<EmailVerification>>;
  
  /**
   * Find recent verifications for a user (last N days)
   * @param userId - User ID
   * @param days - Number of days
   * @returns Array of verifications
   */
  findRecentByUser(userId: string, days: number): Promise<EmailVerification[]>;
  
  // ========== Status Check Operations ==========
  
  /**
   * Get pending verification for user (active, not expired)
   * @param userId - User ID
   * @returns Pending verification or null
   */
  getPendingVerification(userId: string): Promise<EmailVerification | null>;
  
  /**
   * Get latest verification for user
   * @param userId - User ID
   * @returns Latest verification or null
   */
  getLatestVerification(userId: string): Promise<EmailVerification | null>;
  
  /**
   * Check if user has pending verification
   * @param userId - User ID
   * @returns True if pending verification exists
   */
  hasPendingVerification(userId: string): Promise<boolean>;
  
  /**
   * Check if email is already verified
   * @param userId - User ID
   * @returns True if email is verified
   */
  isEmailVerified(userId: string): Promise<boolean>;
  
  /**
   * Check if token is valid (exists and not expired)
   * @param tokenValue - Raw token string
   * @returns True if token is valid
   */
  isTokenValid(tokenValue: string): Promise<boolean>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get verification statistics
   * @returns Email verification statistics
   */
  getStatistics(): Promise<EmailVerificationStatistics>;
  
  /**
   * Count verifications by status
   * @param status - Verification status
   * @returns Count of verifications
   */
  countByStatus(status: EmailVerificationStatus): Promise<number>;
  
  /**
   * Count verifications by user
   * @param userId - User ID
   * @returns Number of verifications
   */
  countByUser(userId: string): Promise<number>;
  
  /**
   * Count pending verifications for a user
   * @param userId - User ID
   * @returns Number of pending verifications
   */
  countPendingByUser(userId: string): Promise<number>;
  
  /**
   * Count verifications by date range
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Count by status
   */
  countByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<{
    total: number;
    verified: number;
    expired: number;
    revoked: number;
  }>;
  
  // ========== Cleanup Operations ==========
  
  /**
   * Delete all expired verifications (cleanup)
   * @param olderThanDays - Delete verifications older than N days
   * @returns Number of deleted records
   */
  deleteExpiredVerifications(olderThanDays: number): Promise<number>;
  
  /**
   * Delete verifications by user ID
   * @param userId - User ID
   * @returns Number of deleted records
   */
  deleteByUserId(userId: string): Promise<number>;
  
  /**
   * Delete verifications older than date
   * @param olderThan - Delete verifications older than this date
   * @returns Number of deleted records
   */
  deleteOlderThan(olderThan: Date): Promise<number>;
  
  /**
   * Archive old verifications
   * @param olderThanDays - Archive verifications older than N days
   * @returns Number of archived records
   */
  archiveOldVerifications(olderThanDays: number): Promise<number>;
  
  // ========== Update Operations ==========
  
  /**
   * Mark verification as expired by user ID
   * @param userId - User ID
   * @returns Number of updated records
   */
  expireByUserId(userId: string): Promise<number>;
  
  /**
   * Mark verification as expired by email
   * @param email - Email address
   * @returns Number of updated records
   */
  expireByEmail(email: Email): Promise<number>;
  
  /**
   * Save verification with expiry check
   * @param verification - Email verification entity
   * @returns void
   */
  saveWithExpiryCheck(verification: EmailVerification): Promise<void>;
  
  // ========== Bulk Operations ==========
  
  /**
   * Batch update verification status
   * @param updates - Map of verification IDs to status
   * @returns Bulk operation result
   */
  batchUpdateStatus(
    updates: Map<string, EmailVerificationStatus>
  ): Promise<BulkOperationResult>;
  
  /**
   * Batch expire verifications
   * @param verificationIds - Array of verification IDs
   * @returns Bulk operation result
   */
  batchExpire(verificationIds: string[]): Promise<BulkOperationResult>;
  
  /**
   * Find duplicate verifications (for cleanup)
   * @returns Duplicate verifications
   */
  findDuplicateVerifications(): Promise<Array<{
    userId: string;
    email: string;
    count: number;
    verificationIds: string[];
  }>>;
  
  // ========== Analytics Operations ==========
  
  /**
   * Get verification rate for a date range
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Verification rate
   */
  getVerificationRate(
    startDate: Date,
    endDate: Date
  ): Promise<VerificationRateResult>;
  
  /**
   * Get daily verification metrics
   * @param days - Number of days to look back
   * @returns Daily metrics
   */
  getDailyMetrics(days: number): Promise<Array<{
    date: string;
    sent: number;
    verified: number;
    expired: number;
    verificationRate: number;
  }>>;
  
  /**
   * Get top email domains for verification
   * @param limit - Number of domains to return
   * @returns Top email domains
   */
  getTopEmailDomains(limit: number): Promise<Array<{
    domain: string;
    count: number;
    verifiedCount: number;
    verificationRate: number;
  }>>;
  
  // ========== Audit Operations ==========
  
  /**
   * Export verifications for audit
   * @param filters - Query filters
   * @returns Verifications for audit
   */
  exportForAudit(filters?: EmailVerificationFilters): Promise<EmailVerification[]>;
  
  /**
   * Get verification audit trail for user
   * @param userId - User ID
   * @returns Audit trail entries
   */
  getAuditTrail(userId: string): Promise<Array<{
    id: string;
    email: string;
    status: EmailVerificationStatus;
    createdAt: Date;
    verifiedAt?: Date;
    expiredAt?: Date;
    resendCount: number;
  }>>;
}

// ==================== Type Exports ====================

export type { 
  EmailVerificationStatistics, 
  EmailVerificationFilters, 
  BulkOperationResult,
  VerificationRateResult 
};
