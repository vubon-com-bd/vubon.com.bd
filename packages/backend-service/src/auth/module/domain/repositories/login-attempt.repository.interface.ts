import type { LoginAttempt } from '../entities/login-attempt.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { UserId, IpAddress, Email } from '../value-objects';
import type { LoginAttemptStatus, LoginFailureReason } from '../entities/login-attempt.entity';

/**
 * Login Attempt Repository Interface
 * Extends the base repository with login attempt-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface ILoginAttemptRepository extends IBaseRepository<LoginAttempt> {
  /**
   * Create a new login attempt
   * @param email - The Email value object used for the login attempt
   * @param ipAddress - The IpAddress value object of the client
   * @param userAgent - The user agent string of the client
   * @param userId - Optional UserId value object if the user exists
   * @returns The created login attempt entity
   */
  create(
    email: Email,
    ipAddress: IpAddress,
    userAgent: string,
    userId?: UserId
  ): Promise<LoginAttempt>;

  /**
   * Find all login attempts for a specific user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing login attempts and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: LoginAttempt[];
    total: number;
  }>;

  /**
   * Find all login attempts by email
   * @param email - The Email value object to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing login attempts and total count
   */
  findByEmail(
    email: Email,
    page: number,
    limit: number
  ): Promise<{
    items: LoginAttempt[];
    total: number;
  }>;

  /**
   * Find all login attempts by IP address
   * @param ipAddress - The IpAddress value object to search for
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing login attempts and total count
   */
  findByIpAddress(
    ipAddress: IpAddress,
    page: number,
    limit: number
  ): Promise<{
    items: LoginAttempt[];
    total: number;
  }>;

  /**
   * Find all login attempts by status
   * @param status - The login attempt status to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing login attempts and total count
   */
  findByStatus(
    status: LoginAttemptStatus,
    page: number,
    limit: number
  ): Promise<{
    items: LoginAttempt[];
    total: number;
  }>;

  /**
   * Find all successful login attempts for a user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing successful login attempts and total count
   */
  findSuccessfulByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: LoginAttempt[];
    total: number;
  }>;

  /**
   * Find all failed login attempts for a user
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing failed login attempts and total count
   */
  findFailedByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: LoginAttempt[];
    total: number;
  }>;

  /**
   * Count recent failed login attempts for a specific user
   * @param userId - The UserId value object of the user
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of failed login attempts within the time window
   */
  countRecentFailures(userId: UserId, timeWindowMinutes: number): Promise<number>;

  /**
   * Count recent failed login attempts by email
   * @param email - The Email value object to search for
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of failed login attempts within the time window
   */
  countRecentFailuresByEmail(email: Email, timeWindowMinutes: number): Promise<number>;

  /**
   * Count recent failed login attempts by IP address
   * @param ipAddress - The IpAddress value object to search for
   * @param timeWindowMinutes - The time window in minutes
   * @returns The number of failed login attempts within the time window
   */
  countRecentFailuresByIp(ipAddress: IpAddress, timeWindowMinutes: number): Promise<number>;

  /**
   * Get the last login attempt for a specific user
   * @param userId - The UserId value object of the user
   * @returns The last login attempt or null if not found
   */
  getLastAttemptByUserId(userId: UserId): Promise<LoginAttempt | null>;

  /**
   * Get the last successful login attempt for a specific user
   * @param userId - The UserId value object of the user
   * @returns The last successful login attempt or null if not found
   */
  getLastSuccessfulByUserId(userId: UserId): Promise<LoginAttempt | null>;

  /**
   * Get the last failed login attempt for a specific user
   * @param userId - The UserId value object of the user
   * @returns The last failed login attempt or null if not found
   */
  getLastFailedByUserId(userId: UserId): Promise<LoginAttempt | null>;

  /**
   * Check if a user has exceeded the maximum failed attempts
   * @param userId - The UserId value object of the user
   * @param maxAttempts - The maximum allowed failed attempts
   * @param timeWindowMinutes - The time window in minutes
   * @returns True if the user has exceeded the maximum failed attempts, false otherwise
   */
  hasExceededMaxFailures(
    userId: UserId,
    maxAttempts: number,
    timeWindowMinutes: number
  ): Promise<boolean>;

  /**
   * Delete old login attempts
   * @param olderThanDays - Delete attempts older than this number of days
   * @returns The number of deleted records
   */
  deleteOldRecords(olderThanDays: number): Promise<number>;

  /**
   * Get statistics for login attempts
   * @param fromDate - The start date for statistics
   * @param toDate - The end date for statistics
   * @returns Statistics about login attempts
   */
  getStatistics(
    fromDate: Date,
    toDate: Date
  ): Promise<{
    totalAttempts: number;
    successfulAttempts: number;
    failedAttempts: number;
    lockedAttempts: number;
    rateLimitedAttempts: number;
    successRate: number;
    topIpAddresses: Array<{
      ipAddress: string;
      count: number;
    }>;
    topFailedReasons: Array<{
      reason: LoginFailureReason;
      count: number;
    }>;
  }>;
}
