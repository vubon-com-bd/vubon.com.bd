/**
 * Account Lock Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/account-lock.repository.interface
 * 
 * @description
 * Repository interface for AccountLock entity persistence.
 * Provides methods for managing account locks, failure counts, and lock status.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Domain-focused method names
 * ✅ Supports optimistic locking
 * ✅ Framework-free, infrastructure-agnostic
 * ✅ Bangladesh specific - Progressive lock levels
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { AccountLock, AccountLockReason, LockLevel } from '../entities/account-lock.entity';

// ==================== Types ====================

/**
 * Lock status result
 */
export interface LockStatusResult {
  isLocked: boolean;
  lockLevel?: LockLevel;
  remainingTimeMs: number;
  remainingTimeFormatted: string;
  reason?: AccountLockReason;
  lockedUntil?: Date;
  lockedAt?: Date;
  failureCount: number;
  remainingAttempts: number;
  nextLockLevel?: LockLevel;
}

/**
 * Failure count result
 */
export interface FailureCountResult {
  count: number;
  remainingAttempts: number;
  isAtRisk: boolean;
  lastFailureAt?: Date;
  failuresLastHour: number;
  failuresLastDay: number;
}

/**
 * Bulk unlock result
 */
export interface BulkUnlockResult {
  unlockedCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  unlockedUserIds: string[];
}

/**
 * Account lock statistics
 */
export interface AccountLockStatistics {
  totalLocks: number;
  activeLocks: number;
  expiredLocks: number;
  permanentlyLocked: number;
  averageLockDurationMs: number;
  averageLockDurationFormatted: string;
  mostCommonReason: AccountLockReason;
  lockedUsersByReason: Record<AccountLockReason, number>;
  locksByLevel: Record<LockLevel, number>;
  locksLast24Hours: number;
  locksLast7Days: number;
  locksLast30Days: number;
  // Bangladesh specific
  locksByDistrict?: Array<{ district: string; count: number }>;
  locksByMobileOperator?: Array<{ operator: string; count: number }>;
}

/**
 * Account lock query filters
 */
export interface AccountLockFilters {
  userId?: string;
  reason?: AccountLockReason;
  lockLevel?: LockLevel;
  isLocked?: boolean;
  isExpired?: boolean;
  isPermanent?: boolean;
  fromDate?: Date;
  toDate?: Date;
  minFailureCount?: number;
  maxFailureCount?: number;
  district?: string;
  mobileOperator?: string;
}

/**
 * Lock history entry
 */
export interface LockHistoryEntry {
  id: string;
  userId: string;
  reason: AccountLockReason;
  lockLevel: LockLevel;
  lockedAt: Date;
  lockedUntil?: Date;
  unlockedAt?: Date;
  unlockedBy?: string;
  failureCount: number;
  durationMs: number;
  durationFormatted: string;
}

// ==================== Repository Interface ====================

/**
 * Account Lock Repository Interface
 * 
 * Manages account lock state and failure tracking
 */
export interface AccountLockRepository extends BaseRepository<AccountLock> {
  // ========== Find Operations ==========
  
  /**
   * Find account lock by user ID
   * @param userId - User ID
   * @returns Account lock entity or null if not exists
   */
  findByUserId(userId: string): Promise<AccountLock | null>;
  
  /**
   * Find account lock by user ID with optimistic lock
   * @param userId - User ID
   * @param expectedVersion - Expected version
   * @returns Account lock entity or null
   */
  findByUserIdWithVersion(userId: string, expectedVersion: number): Promise<AccountLock | null>;
  
  /**
   * Find all locked accounts (currently locked)
   * @returns Array of locked account locks
   */
  findLockedAccounts(): Promise<AccountLock[]>;
  
  /**
   * Find locked accounts with pagination
   * @param options - Pagination options
   * @returns Paginated locked accounts
   */
  findLockedAccountsPaginated(options: PaginationOptions): Promise<PaginatedResult<AccountLock>>;
  
  /**
   * Find all expired locks (can be unlocked)
   * @returns Array of expired account locks
   */
  findExpiredLocks(): Promise<AccountLock[]>;
  
  /**
   * Find locks by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated results
   */
  findByFilters(
    filters: AccountLockFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<AccountLock>>;
  
  /**
   * Find locks by lock level
   * @param lockLevel - Lock level
   * @returns Array of account locks
   */
  findByLockLevel(lockLevel: LockLevel): Promise<AccountLock[]>;
  
  /**
   * Find permanent locks
   * @returns Array of permanent account locks
   */
  findPermanentLocks(): Promise<AccountLock[]>;
  
  // ========== Failure Count Operations ==========
  
  /**
   * Get failure count for a user
   * @param userId - User ID
   * @returns Failure count result with details
   */
  getFailureCountForUser(userId: string): Promise<FailureCountResult>;
  
  /**
   * Increment failure count for a user
   * @param userId - User ID
   * @returns Updated failure count
   * @throws {Error} If increment fails
   */
  incrementFailureCountForUser(userId: string): Promise<number>;
  
  /**
   * Increment failure count with transaction support
   * @param userId - User ID
   * @returns Updated failure count
   */
  incrementFailureCountWithLock(userId: string): Promise<number>;
  
  /**
   * Reset failure count for a user (after successful login)
   * @param userId - User ID
   * @returns void
   */
  resetFailureCountForUser(userId: string): Promise<void>;
  
  /**
   * Batch increment failure counts (for performance)
   * @param increments - Map of user IDs to increment amounts
   * @returns void
   */
  batchIncrementFailureCounts(increments: Map<string, number>): Promise<void>;
  
  // ========== Lock Status Operations ==========
  
  /**
   * Get lock status for a user
   * @param userId - User ID
   * @returns Lock status result
   */
  getLockStatus(userId: string): Promise<LockStatusResult>;
  
  /**
   * Check if user account is currently locked
   * @param userId - User ID
   * @returns true if account is locked
   */
  isUserLocked(userId: string): Promise<boolean>;
  
  /**
   * Get remaining lock time for user
   * @param userId - User ID
   * @returns Remaining lock time in milliseconds
   */
  getRemainingLockTime(userId: string): Promise<number>;
  
  /**
   * Get current lock level for user
   * @param userId - User ID
   * @returns Current lock level or null if not locked
   */
  getCurrentLockLevel(userId: string): Promise<LockLevel | null>;
  
  // ========== Unlock Operations ==========
  
  /**
   * Unlock specific user's account
   * @param userId - User ID
   * @param reason - Unlock reason (optional)
   * @param unlockedBy - Who performed the unlock (admin ID or 'system')
   * @returns void
   */
  unlockUserAccount(userId: string, reason?: string, unlockedBy?: string): Promise<void>;
  
  /**
   * Unlock all expired locks (bulk operation)
   * @returns Result of bulk unlock operation
   */
  unlockAllExpiredLocks(): Promise<BulkUnlockResult>;
  
  /**
   * Unlock all locks for a user
   * @param userId - User ID
   * @returns Number of unlocked locks
   */
  unlockAllForUser(userId: string): Promise<number>;
  
  /**
   * Force unlock all locks (admin emergency)
   * @param reason - Unlock reason
   * @param adminId - Admin ID
   * @returns Bulk unlock result
   */
  forceUnlockAll(reason: string, adminId: string): Promise<BulkUnlockResult>;
  
  // ========== At Risk Detection ==========
  
  /**
   * Find users with high failure count (at risk)
   * @param threshold - Failure count threshold (default 3)
   * @returns Array of user IDs at risk
   */
  findUsersAtRisk(threshold?: number): Promise<string[]>;
  
  /**
   * Find users approaching lock threshold
   * @param thresholdPercent - Percentage of max attempts (default 80)
   * @returns Array of user IDs approaching lock
   */
  findUsersApproachingLock(thresholdPercent?: number): Promise<Array<{
    userId: string;
    currentAttempts: number;
    maxAttempts: number;
    remainingAttempts: number;
  }>>;
  
  // ========== Statistics Operations ==========
  
  /**
   * Get statistics about account locks
   * @returns Lock statistics
   */
  getLockStatistics(): Promise<AccountLockStatistics>;
  
  /**
   * Count locks by filters
   * @param filters - Query filters
   * @returns Count of matching locks
   */
  countByFilters(filters: AccountLockFilters): Promise<number>;
  
  /**
   * Get lock history for a user
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @returns Array of lock history entries
   */
  getLockHistory(userId: string, limit?: number): Promise<LockHistoryEntry[]>;
  
  /**
   * Get lock history with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Paginated lock history
   */
  getLockHistoryPaginated(
    userId: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<LockHistoryEntry>>;
  
  // ========== Cleanup Operations ==========
  
  /**
   * Clean up old lock records (older than retention period)
   * @param retentionDays - Number of days to retain
   * @returns Number of deleted records
   */
  cleanupOldRecords(retentionDays: number): Promise<number>;
  
  /**
   * Archive old lock records
   * @param olderThanDays - Archive records older than N days
   * @returns Number of archived records
   */
  archiveOldRecords(olderThanDays: number): Promise<number>;
  
  /**
   * Delete expired locks older than date
   * @param olderThan - Delete locks older than this date
   * @returns Number of deleted records
   */
  deleteExpiredLocksOlderThan(olderThan: Date): Promise<number>;
  
  // ========== Save Operations ==========
  
  /**
   * Save lock and handle automatic unlocking
   * @param lock - Account lock entity
   * @returns void
   */
  saveWithAutoUnlock(lock: AccountLock): Promise<void>;
  
  /**
   * Save or update lock with optimistic locking
   * @param lock - Account lock entity
   * @returns void
   */
  saveWithOptimisticLock(lock: AccountLock): Promise<void>;
  
  // ========== Event Operations ==========
  
  /**
   * Get locks that need event notification
   * @param since - Since date
   * @returns Array of recent locks
   */
  getLocksForNotification(since: Date): Promise<AccountLock[]>;
  
  /**
   * Mark lock as notified
   * @param lockId - Lock ID
   * @returns void
   */
  markAsNotified(lockId: string): Promise<void>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  LockStatusResult, 
  FailureCountResult, 
  BulkUnlockResult, 
  AccountLockStatistics, 
  AccountLockFilters,
  LockHistoryEntry 
};
