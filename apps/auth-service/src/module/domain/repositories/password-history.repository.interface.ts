/**
 * Password History Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/password-history.repository.interface
 * 
 * @description
 * Repository interface for PasswordHistory entity persistence.
 * Tracks password changes for security, prevents password reuse,
 * and enforces password expiry policies.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Pagination support for large datasets
 * ✅ Bulk operations for performance
 * ✅ Framework-free, infrastructure-agnostic
 */

import { 
  BaseRepository, 
  PaginationOptions, 
  PaginatedResult 
} from './base.repository.interface';
import { PasswordHistory, PasswordChangeContext, PasswordChangeMetadata } from '../entities/password-history.entity';

// ==================== Types ====================

/**
 * Password history statistics
 */
export interface PasswordHistoryStatistics {
  totalChanges: number;
  uniquePasswords: number;
  firstChangeDate: Date | null;
  lastChangeDate: Date | null;
  averageDaysBetweenChanges: number;
  changesByYear: Record<number, number>;
  changesByMonth: Record<string, number>;
  changesByContext: Record<PasswordChangeContext, number>;
  breachRelatedChanges: number;
  expiryRelatedChanges: number;
}

/**
 * Password reuse check result
 */
export interface PasswordReuseResult {
  reused: boolean;
  matchedHistoryId?: string;
  matchedAt?: Date;
  position?: number;  // Which previous password matched (1 = most recent)
}

/**
 * Password expiry status
 */
export interface PasswordExpiryStatus {
  isExpired: boolean;
  lastChangedAt?: Date;
  daysSinceLastChange: number;
  daysUntilExpiry: number;
  expiryDate?: Date;
}

/**
 * Password change recommendation
 */
export interface PasswordChangeRecommendation {
  shouldChange: boolean;
  reason: 'expired' | 'reused' | 'breach' | 'policy' | 'none';
  urgency: 'high' | 'medium' | 'low';
  recommendedDate?: Date;
  message?: string;
  messageBn?: string;
}

/**
 * Password history filters
 */
export interface PasswordHistoryFilters {
  userId?: string;
  startDate?: Date;
  endDate?: Date;
  changedBy?: PasswordChangeContext;
  minStrength?: string;
  ipAddress?: string;
  deviceId?: string;
  isBreachChange?: boolean;
  isExpiryChange?: boolean;
}

/**
 * Bulk delete result
 */
export interface BulkDeleteResult {
  deletedCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
}

// ==================== Repository Interface ====================

/**
 * Password History Repository Interface
 * 
 * Manages password change history for security compliance
 */
export interface PasswordHistoryRepository extends BaseRepository<PasswordHistory> {
  // ========== Find Operations ==========
  
  /**
   * Find all password history entries for a user
   * @param userId - User ID
   * @returns Array of password history entries
   */
  findByUserId(userId: string): Promise<PasswordHistory[]>;
  
  /**
   * Find password history entries for a user with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByUserIdPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  /**
   * Find recent password history entries for a user (limited by count)
   * @param userId - User ID
   * @param limit - Maximum number of entries to return
   * @returns Array of recent password history entries
   */
  findRecentByUserId(userId: string, limit: number): Promise<PasswordHistory[]>;
  
  /**
   * Find password history entries within a time window
   * @param userId - User ID
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Array of password history entries
   */
  findByUserIdAndTimeRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<PasswordHistory[]>;
  
  /**
   * Find password history entries by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByFilters(
    filters: PasswordHistoryFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  /**
   * Find password changes by context (e.g., 'user', 'admin', 'reset')
   * @param userId - User ID
   * @param changedBy - Who initiated the change
   * @returns Array of password history entries
   */
  findByChangeContext(
    userId: string,
    changedBy: PasswordChangeContext
  ): Promise<PasswordHistory[]>;
  
  /**
   * Find password changes by IP address (security monitoring)
   * @param ipAddress - IP address
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByIpAddress(
    ipAddress: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  /**
   * Find password changes by device ID (security monitoring)
   * @param deviceId - Device ID
   * @param options - Pagination options
   * @returns Paginated password history entries
   */
  findByDeviceId(
    deviceId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<PasswordHistory>>;
  
  // ========== Single Entry Operations ==========
  
  /**
   * Get the last password history entry for a user
   * @param userId - User ID
   * @returns Last password history entry or null
   */
  getLastEntry(userId: string): Promise<PasswordHistory | null>;
  
  /**
   * Get the first password history entry for a user
   * @param userId - User ID
   * @returns First password history entry or null
   */
  getFirstEntry(userId: string): Promise<PasswordHistory | null>;
  
  /**
   * Get password history entry by user ID and password hash
   * @param userId - User ID
   * @param passwordHash - Hashed password
   * @returns Password history entry or null
   */
  findByUserIdAndHash(userId: string, passwordHash: string): Promise<PasswordHistory | null>;
  
  // ========== Save Operations ==========
  
  /**
   * Save password history entry (create or update)
   * @param history - Password history entity
   * @returns void
   */
  save(history: PasswordHistory): Promise<void>;
  
  /**
   * Save multiple password history entries (batch)
   * @param histories - Array of password history entities
   * @returns void
   */
  saveMany(histories: PasswordHistory[]): Promise<void>;
  
  // ========== Delete Operations ==========
  
  /**
   * Delete password history entry by ID
   * @param id - Entry ID
   * @returns void
   */
  delete(id: string): Promise<void>;
  
  /**
   * Delete all password history entries for a user
   * @param userId - User ID
   * @returns void
   */
  deleteByUserId(userId: string): Promise<void>;
  
  /**
   * Delete old password history entries (older than specified days)
   * @param daysToKeep - Number of days to keep (default 365)
   * @returns Number of deleted entries
   */
  deleteOldEntries(daysToKeep: number): Promise<number>;
  
  /**
   * Delete entries by IDs
   * @param ids - Array of entry IDs
   * @returns Bulk delete result
   */
  deleteByIds(ids: string[]): Promise<BulkDeleteResult>;
  
  // ========== Password Reuse Prevention ==========
  
  /**
   * Check if a password hash was used before (prevent reuse)
   * @param userId - User ID
   * @param hashedPassword - Hashed password to check
   * @param checkCount - Number of previous passwords to check (default 5)
   * @returns True if password was used before
   */
  wasPasswordUsedBefore(
    userId: string,
    hashedPassword: string,
    checkCount?: number
  ): Promise<PasswordReuseResult>;
  
  /**
   * Get previous N passwords for a user
   * @param userId - User ID
   * @param count - Number of previous passwords to retrieve
   * @returns Array of previous password hashes
   */
  getPreviousPasswords(userId: string, count: number): Promise<string[]>;
  
  /**
   * Get all password hashes for a user
   * @param userId - User ID
   * @returns Array of all password hashes
   */
  getAllPasswordHashes(userId: string): Promise<string[]>;
  
  // ========== Password Expiry ==========
  
  /**
   * Get last password change date for a user
   * @param userId - User ID
   * @returns Last password change date or null
   */
  getLastPasswordChangeDate(userId: string): Promise<Date | null>;
  
  /**
   * Check if password age exceeds maximum allowed days
   * @param userId - User ID
   * @param maxAgeDays - Maximum allowed password age in days
   * @returns True if password is expired
   */
  isPasswordExpired(userId: string, maxAgeDays: number): Promise<boolean>;
  
  /**
   * Get password expiry status for a user
   * @param userId - User ID
   * @param maxAgeDays - Maximum allowed password age in days
   * @returns Password expiry status
   */
  getPasswordExpiryStatus(userId: string, maxAgeDays: number): Promise<PasswordExpiryStatus>;
  
  /**
   * Get password change recommendation for a user
   * @param userId - User ID
   * @param maxAgeDays - Maximum allowed password age in days
   * @param checkBreach - Whether to check breach database
   * @returns Password change recommendation
   */
  getChangeRecommendation(
    userId: string,
    maxAgeDays: number,
    checkBreach?: boolean
  ): Promise<PasswordChangeRecommendation>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get password change count for a user
   * @param userId - User ID
   * @returns Number of password changes
   */
  getPasswordChangeCount(userId: string): Promise<number>;
  
  /**
   * Count password changes in a time range
   * @param userId - User ID
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Count of password changes
   */
  countByUserIdAndTimeRange(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<number>;
  
  /**
   * Count password changes by context
   * @param userId - User ID
   * @returns Count by context
   */
  countByContext(userId: string): Promise<Record<PasswordChangeContext, number>>;
  
  /**
   * Get unique password count for a user
   * @param userId - User ID
   * @returns Number of unique passwords
   */
  getUniquePasswordCount(userId: string): Promise<number>;
  
  /**
   * Get password history statistics for a user
   * @param userId - User ID
   * @returns Password history statistics
   */
  getStatistics(userId: string): Promise<PasswordHistoryStatistics>;
  
  /**
   * Get global password statistics (admin)
   * @returns Global statistics
   */
  getGlobalStatistics(): Promise<{
    totalUsersWithHistory: number;
    totalPasswordChanges: number;
    averageChangesPerUser: number;
    averagePasswordAgeDays: number;
    mostCommonChangeContext: PasswordChangeContext;
    breachForcedChanges: number;
    expiryForcedChanges: number;
  }>;
  
  // ========== Admin Operations ==========
  
  /**
   * Find users who haven't changed password in N days
   * @param daysInactive - Number of days since last password change
   * @param options - Pagination options
   * @returns Paginated users with expired passwords
   */
  findUsersWithExpiredPasswords(
    daysInactive: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<{ userId: string; lastChangeDate: Date; email?: string; phone?: string }>>;
  
  /**
   * Get password change frequency (for security monitoring)
   * @param days - Number of days to analyze
   * @returns Password change frequency data
   */
  getChangeFrequency(days: number): Promise<{
    daily: Array<{ date: string; count: number }>;
    weekly: Array<{ week: string; count: number }>;
    monthly: Array<{ month: string; count: number }>;
    byHour: Array<{ hour: number; count: number }>;
  }>;
  
  /**
   * Get recent password changes across all users (admin)
   * @param limit - Maximum number of entries
   * @returns Recent password changes
   */
  getRecentChanges(limit: number): Promise<PasswordHistory[]>;
  
  /**
   * Get password changes by date range
   * @param startDate - Start date
   * @param endDate - End date
   * @returns Password changes in date range
   */
  getChangesByDateRange(
    startDate: Date,
    endDate: Date
  ): Promise<PasswordHistory[]>;
  
  /**
   * Check if a user has any password history
   * @param userId - User ID
   * @returns True if user has password history
   */
  hasHistory(userId: string): Promise<boolean>;
  
  // ========== Archive Operations ==========
  
  /**
   * Archive old password history entries (move to archive table)
   * @param olderThanDays - Archive entries older than N days
   * @returns Number of archived entries
   */
  archiveOldEntries(olderThanDays: number): Promise<number>;
  
  /**
   * Restore archived password history entries
   * @param olderThanDays - Restore entries older than N days
   * @returns Number of restored entries
   */
  restoreArchivedEntries(olderThanDays: number): Promise<number>;
  
  /**
   * Purge archived entries permanently
   * @param olderThanDays - Purge entries older than N days
   * @returns Number of purged entries
   */
  purgeArchivedEntries(olderThanDays: number): Promise<number>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  PasswordHistoryStatistics, 
  PasswordHistoryFilters,
  PasswordReuseResult,
  PasswordExpiryStatus,
  PasswordChangeRecommendation,
  BulkDeleteResult
};
