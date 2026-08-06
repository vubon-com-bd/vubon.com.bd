import type { AccountLock } from '../entities/account-lock.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { UserId } from '../value-objects';
import type { LockLevel, LockReason } from '../entities/account-lock.entity';

/**
 * Account Lock Repository Interface
 * Extends the base repository with account lock-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface IAccountLockRepository extends IBaseRepository<AccountLock> {
  /**
   * Find an active lock for a specific user
   * @param userId - The UserId value object of the user
   * @returns The found active lock or null if not found
   */
  findActiveLock(userId: UserId): Promise<AccountLock | null>;

  /**
   * Find all locks for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing locks and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: AccountLock[];
    total: number;
  }>;

  /**
   * Find all active locks (not expired and not unlocked)
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing active locks and total count
   */
  findActive(
    page: number,
    limit: number
  ): Promise<{
    items: AccountLock[];
    total: number;
  }>;

  /**
   * Find all expired locks
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing expired locks and total count
   */
  findExpired(
    page: number,
    limit: number
  ): Promise<{
    items: AccountLock[];
    total: number;
  }>;

  /**
   * Find all locks by lock level
   * @param lockLevel - The lock level to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing locks and total count
   */
  findByLockLevel(
    lockLevel: LockLevel,
    page: number,
    limit: number
  ): Promise<{
    items: AccountLock[];
    total: number;
  }>;

  /**
   * Find all locks by lock reason
   * @param reason - The lock reason to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing locks and total count
   */
  findByReason(
    reason: LockReason,
    page: number,
    limit: number
  ): Promise<{
    items: AccountLock[];
    total: number;
  }>;

  /**
   * Unlock an account lock
   * @param lockId - The unique identifier of the lock
   * @param unlockedBy - The user ID who unlocked the account
   * @param unlockReason - The reason for unlocking
   * @param removedByAdminId - The admin ID who removed the lock (optional)
   * @returns True if unlock was successful, false if lock not found
   */
  unlock(
    lockId: string,
    unlockedBy: string,
    unlockReason: string,
    removedByAdminId?: string
  ): Promise<boolean>;

  /**
   * Unlock all locks for a specific user
   * @param userId - The UserId value object of the user
   * @param unlockedBy - The user ID who unlocked the account
   * @param unlockReason - The reason for unlocking
   * @returns Number of locks unlocked
   */
  unlockAllByUserId(userId: UserId, unlockedBy: string, unlockReason: string): Promise<number>;

  /**
   * Escalate the lock level for a specific user
   * @param userId - The UserId value object of the user
   * @param reason - The reason for escalation
   * @param details - Additional details for escalation
   * @returns The escalated lock or null if not found
   */
  escalateLock(
    userId: UserId,
    reason?: string,
    details?: Record<string, unknown>
  ): Promise<AccountLock | null>;

  /**
   * Check if a user has an active lock
   * @param userId - The UserId value object of the user
   * @returns True if the user has an active lock, false otherwise
   */
  hasActiveLock(userId: UserId): Promise<boolean>;

  /**
   * Get the count of active locks by lock level
   * @param lockLevel - The lock level to filter by
   * @returns The number of active locks with the given lock level
   */
  countActiveByLockLevel(lockLevel: LockLevel): Promise<number>;

  /**
   * Get the count of active locks by lock reason
   * @param reason - The lock reason to filter by
   * @returns The number of active locks with the given lock reason
   */
  countActiveByReason(reason: LockReason): Promise<number>;

  /**
   * Clean up expired locks (set status to expired)
   * @returns Number of locks cleaned up
   */
  cleanupExpiredLocks(): Promise<number>;
}
