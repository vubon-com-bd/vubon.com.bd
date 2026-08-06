import type { EmailVerification } from '../entities/email-verification.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { UserId, Token, Email } from '../value-objects';
import type { EmailVerificationStatus } from '../entities/email-verification.entity';

/**
 * Email Verification Repository Interface
 * Extends the base repository with email verification-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface IEmailVerificationRepository extends IBaseRepository<EmailVerification> {
  /**
   * Create a new email verification record
   * @param userId - The UserId value object of the user
   * @param email - The Email value object to verify
   * @param token - The Token value object for verification
   * @param expiresInHours - The expiry time in hours (default: 24)
   * @returns The created email verification entity
   */
  create(
    userId: UserId,
    email: Email,
    token: Token,
    expiresInHours?: number
  ): Promise<EmailVerification>;

  /**
   * Find an email verification record by token
   * @param token - The Token value object to search for
   * @returns The found email verification or null if not found
   */
  findByToken(token: Token): Promise<EmailVerification | null>;

  /**
   * Find all email verification records for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing email verifications and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: EmailVerification[];
    total: number;
  }>;

  /**
   * Find all email verification records by email
   * @param email - The Email value object to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing email verifications and total count
   */
  findByEmail(
    email: Email,
    page: number,
    limit: number
  ): Promise<{
    items: EmailVerification[];
    total: number;
  }>;

  /**
   * Find the most recent pending verification for a user
   * @param userId - The UserId value object of the user
   * @returns The most recent pending verification or null if not found
   */
  findLatestPendingByUserId(userId: UserId): Promise<EmailVerification | null>;

  /**
   * Find the most recent pending verification by email
   * @param email - The Email value object to search for
   * @returns The most recent pending verification or null if not found
   */
  findLatestPendingByEmail(email: Email): Promise<EmailVerification | null>;

  /**
   * Find all pending email verifications
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing pending verifications and total count
   */
  findPending(
    page: number,
    limit: number
  ): Promise<{
    items: EmailVerification[];
    total: number;
  }>;

  /**
   * Find all expired email verifications
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing expired verifications and total count
   */
  findExpired(
    page: number,
    limit: number
  ): Promise<{
    items: EmailVerification[];
    total: number;
  }>;

  /**
   * Find all verified email verifications
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing verified verifications and total count
   */
  findVerified(
    page: number,
    limit: number
  ): Promise<{
    items: EmailVerification[];
    total: number;
  }>;

  /**
   * Update the status of an email verification
   * @param id - The unique identifier of the verification
   * @param status - The new status (PENDING, VERIFIED, EXPIRED, FAILED)
   * @param errorMessage - Optional error message for failed verifications
   * @returns True if update was successful, false if not found
   */
  updateStatus(
    id: string,
    status: EmailVerificationStatus,
    errorMessage?: string
  ): Promise<boolean>;

  /**
   * Increment the attempt counter for a verification
   * @param id - The unique identifier of the verification
   * @param maxAttempts - The maximum allowed attempts before marking as failed
   * @returns The updated verification or null if not found
   */
  incrementAttempts(id: string, maxAttempts: number): Promise<EmailVerification | null>;

  /**
   * Reset a verification (for resending)
   * @param id - The unique identifier of the verification
   * @param newToken - The new Token value object
   * @param expiresInHours - The new expiry time in hours
   * @returns The updated verification or null if not found
   */
  resetVerification(
    id: string,
    newToken: Token,
    expiresInHours: number
  ): Promise<EmailVerification | null>;

  /**
   * Delete all expired email verifications
   * @returns The number of deleted records
   */
  deleteExpired(): Promise<number>;

  /**
   * Check if a user has a verified email
   * @param userId - The UserId value object of the user
   * @returns True if the user has a verified email, false otherwise
   */
  hasVerifiedEmail(userId: UserId): Promise<boolean>;

  /**
   * Get the count of verifications by status
   * @param status - The status to filter by
   * @returns The number of verifications with the given status
   */
  countByStatus(status: EmailVerificationStatus): Promise<number>;

  /**
   * Get the count of pending verifications for a user
   * @param userId - The UserId value object of the user
   * @returns The number of pending verifications
   */
  countPendingByUserId(userId: UserId): Promise<number>;

  /**
   * Get the count of recent verification attempts
   * @param email - The Email value object to search for
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of verification attempts within the time window
   */
  countRecentAttemptsByEmail(email: Email, timeWindowMinutes: number): Promise<number>;
}
