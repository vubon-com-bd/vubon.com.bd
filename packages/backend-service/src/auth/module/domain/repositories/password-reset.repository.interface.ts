import type { PasswordReset } from '../entities/password-reset.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { UserId, Token, Email } from '../value-objects';
import type { PasswordResetStatus } from '../entities/password-reset.entity';

/**
 * Password Reset Repository Interface
 * Extends the base repository with password reset-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface IPasswordResetRepository extends IBaseRepository<PasswordReset> {
  /**
   * Create a new password reset request
   * @param userId - The UserId value object of the user
   * @param email - The Email value object for the reset
   * @param token - The Token value object for the reset
   * @param requestIpAddress - The IP address of the request
   * @param requestUserAgent - The user agent of the request
   * @param expiresInMinutes - The expiry time in minutes (default: 30)
   * @returns The created password reset entity
   */
  create(
    userId: UserId,
    email: Email,
    token: Token,
    requestIpAddress: string,
    requestUserAgent: string,
    expiresInMinutes?: number
  ): Promise<PasswordReset>;

  /**
   * Find a password reset record by token
   * @param token - The Token value object to search for
   * @returns The found password reset or null if not found
   */
  findByToken(token: Token): Promise<PasswordReset | null>;

  /**
   * Find all password reset records for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing password resets and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: PasswordReset[];
    total: number;
  }>;

  /**
   * Find all password reset records by email
   * @param email - The Email value object to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing password resets and total count
   */
  findByEmail(
    email: Email,
    page: number,
    limit: number
  ): Promise<{
    items: PasswordReset[];
    total: number;
  }>;

  /**
   * Find the most recent pending reset for a user
   * @param userId - The UserId value object of the user
   * @returns The most recent pending reset or null if not found
   */
  findLatestPendingByUserId(userId: UserId): Promise<PasswordReset | null>;

  /**
   * Find the most recent pending reset by email
   * @param email - The Email value object to search for
   * @returns The most recent pending reset or null if not found
   */
  findLatestPendingByEmail(email: Email): Promise<PasswordReset | null>;

  /**
   * Find all pending password resets
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing pending resets and total count
   */
  findPending(
    page: number,
    limit: number
  ): Promise<{
    items: PasswordReset[];
    total: number;
  }>;

  /**
   * Find all completed password resets
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing completed resets and total count
   */
  findCompleted(
    page: number,
    limit: number
  ): Promise<{
    items: PasswordReset[];
    total: number;
  }>;

  /**
   * Find all expired password resets
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing expired resets and total count
   */
  findExpired(
    page: number,
    limit: number
  ): Promise<{
    items: PasswordReset[];
    total: number;
  }>;

  /**
   * Find all failed password resets
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing failed resets and total count
   */
  findFailed(
    page: number,
    limit: number
  ): Promise<{
    items: PasswordReset[];
    total: number;
  }>;

  /**
   * Update the status of a password reset
   * @param id - The unique identifier of the reset
   * @param status - The new status (PENDING, COMPLETED, EXPIRED, FAILED)
   * @param errorMessage - Optional error message for failed resets
   * @returns True if update was successful, false if not found
   */
  updateStatus(id: string, status: PasswordResetStatus, errorMessage?: string): Promise<boolean>;

  /**
   * Complete a password reset
   * @param id - The unique identifier of the reset
   * @param resetIpAddress - The IP address of the reset
   * @param resetUserAgent - The user agent of the reset
   * @returns True if completion was successful, false if not found
   */
  complete(id: string, resetIpAddress: string, resetUserAgent: string): Promise<boolean>;

  /**
   * Increment the attempt counter for a reset
   * @param id - The unique identifier of the reset
   * @param maxAttempts - The maximum allowed attempts before marking as failed
   * @returns The updated reset or null if not found
   */
  incrementAttempts(id: string, maxAttempts: number): Promise<PasswordReset | null>;

  /**
   * Reset a password reset (for resending)
   * @param id - The unique identifier of the reset
   * @param newToken - The new Token value object
   * @param expiresInMinutes - The new expiry time in minutes
   * @returns The updated reset or null if not found
   */
  resetRequest(
    id: string,
    newToken: Token,
    expiresInMinutes: number
  ): Promise<PasswordReset | null>;

  /**
   * Delete all expired password resets
   * @returns The number of deleted records
   */
  deleteExpired(): Promise<number>;

  /**
   * Delete all completed password resets older than specified days
   * @param olderThanDays - Delete completed resets older than this number of days
   * @returns The number of deleted records
   */
  deleteCompleted(olderThanDays: number): Promise<number>;

  /**
   * Get the count of resets by status
   * @param status - The status to filter by
   * @returns The number of resets with the given status
   */
  countByStatus(status: PasswordResetStatus): Promise<number>;

  /**
   * Get the count of recent reset requests
   * @param email - The Email value object to search for
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of reset requests within the time window
   */
  countRecentRequestsByEmail(email: Email, timeWindowMinutes: number): Promise<number>;

  /**
   * Get the count of recent reset requests by IP
   * @param ipAddress - The IP address to check
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of reset requests within the time window
   */
  countRecentRequestsByIp(ipAddress: string, timeWindowMinutes: number): Promise<number>;
}
