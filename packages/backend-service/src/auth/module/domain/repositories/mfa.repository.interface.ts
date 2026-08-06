import type { MFA } from '../entities/mfa.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { MFAType, MFAStatus } from '../entities/mfa.entity';
import type { UserId } from '../value-objects';

/**
 * MFA Repository Interface
 * Extends the base repository with MFA-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface IMfaRepository extends IBaseRepository<MFA> {
  /**
   * Find MFA configuration by user ID (Value Object)
   * @param userId - The UserId value object of the user
   * @returns The found MFA configuration or null if not found
   */
  findByUserId(userId: UserId): Promise<MFA | null>;

  /**
   * Find MFA configuration by user ID and MFA type
   * @param userId - The UserId value object of the user
   * @param type - The MFA type (TOTP, SMS, EMAIL)
   * @returns The found MFA configuration or null if not found
   */
  findByUserIdAndType(userId: UserId, type: MFAType): Promise<MFA | null>;

  /**
   * Find all MFA configurations for a user
   * @param userId - The UserId value object of the user
   * @returns An array of MFA configurations
   */
  findAllByUserId(userId: UserId): Promise<MFA[]>;

  /**
   * Update MFA status
   * @param id - The unique identifier of the MFA configuration
   * @param status - The new status (PENDING, ENABLED, DISABLED, LOCKED)
   * @returns True if update was successful, false if not found
   */
  updateStatus(id: string, status: MFAStatus): Promise<boolean>;

  /**
   * Increment failed attempts counter
   * @param id - The unique identifier of the MFA configuration
   * @param maxFailedAttempts - Maximum allowed failed attempts before lockout
   * @param lockoutDurationMinutes - Lockout duration in minutes
   * @returns The updated MFA configuration or null if not found
   */
  incrementFailedAttempts(
    id: string,
    maxFailedAttempts: number,
    lockoutDurationMinutes: number
  ): Promise<MFA | null>;

  /**
   * Reset failed attempts counter
   * @param id - The unique identifier of the MFA configuration
   * @returns The updated MFA configuration or null if not found
   */
  resetFailedAttempts(id: string): Promise<MFA | null>;

  /**
   * Update backup codes
   * @param id - The unique identifier of the MFA configuration
   * @param backupCodes - Array of backup code strings
   * @returns The updated MFA configuration or null if not found
   */
  updateBackupCodes(id: string, backupCodes: string[]): Promise<MFA | null>;

  /**
   * Find all locked MFA configurations
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing MFA configurations and total count
   */
  findLocked(
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Find all enabled MFA configurations
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing MFA configurations and total count
   */
  findEnabled(
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Find all pending MFA configurations
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing MFA configurations and total count
   */
  findPending(
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Check if a user has MFA enabled
   * @param userId - The UserId value object of the user
   * @returns True if MFA is enabled for the user, false otherwise
   */
  isEnabled(userId: UserId): Promise<boolean>;

  /**
   * Get the count of MFA configurations by status
   * @param status - The MFA status to filter by
   * @returns The number of MFA configurations with the given status
   */
  countByStatus(status: MFAStatus): Promise<number>;
}
