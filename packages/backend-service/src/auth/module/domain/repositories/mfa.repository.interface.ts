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
   * Find all MFA configurations for a specific user (Value Object)
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing MFA configurations and total count
   */
  findByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Find an MFA configuration by user ID and MFA type (Value Object)
   * @param userId - The UserId value object of the user
   * @param type - The MFA type (TOTP, SMS, EMAIL)
   * @returns The found MFA configuration or null if not found
   */
  findByUserIdAndType(userId: UserId, type: MFAType): Promise<MFA | null>;

  /**
   * Find all MFA configurations by status
   * @param status - The MFA status to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing MFA configurations and total count
   */
  findByStatus(
    status: MFAStatus,
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Find all enabled MFA configurations for a user (Value Object)
   * @param userId - The UserId value object of the user
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing enabled MFA configurations and total count
   */
  findEnabledByUserId(
    userId: UserId,
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Update the status of an MFA configuration
   * @param id - The unique identifier of the MFA configuration
   * @param status - The new status to set
   * @returns True if update was successful, false if MFA configuration not found
   */
  updateStatus(id: string, status: MFAStatus): Promise<boolean>;

  /**
   * Increment the failed attempts counter for an MFA configuration
   * @param id - The unique identifier of the MFA configuration
   * @returns True if update was successful, false if MFA configuration not found
   */
  incrementFailedAttempts(id: string): Promise<boolean>;

  /**
   * Reset the failed attempts counter for an MFA configuration
   * @param id - The unique identifier of the MFA configuration
   * @returns True if update was successful, false if MFA configuration not found
   */
  resetFailedAttempts(id: string): Promise<boolean>;

  /**
   * Update the backup codes for an MFA configuration
   * @param id - The unique identifier of the MFA configuration
   * @param backupCodes - Array of new backup codes
   * @returns True if update was successful, false if MFA configuration not found
   */
  updateBackupCodes(id: string, backupCodes: string[]): Promise<boolean>;

  /**
   * Check if a user has any MFA configuration
   * @param userId - The UserId value object of the user
   * @returns True if the user has any MFA configuration, false otherwise
   */
  userHasMFA(userId: UserId): Promise<boolean>;

  /**
   * Check if a user has a specific MFA type
   * @param userId - The UserId value object of the user
   * @param type - The MFA type to check
   * @returns True if the user has the specified MFA type, false otherwise
   */
  userHasMFAType(userId: UserId, type: MFAType): Promise<boolean>;

  /**
   * Find all locked MFA configurations
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing locked MFA configurations and total count
   */
  findLocked(
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Unlock all MFA configurations that have passed their lock duration
   * @returns Number of MFA configurations unlocked
   */
  unlockExpiredLocked(): Promise<number>;
}
