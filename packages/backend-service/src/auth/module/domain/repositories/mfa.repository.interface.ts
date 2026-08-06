import type { MFA } from '../entities/mfa.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { MFAType, MFAStatus } from '../entities/mfa.entity';
import type { Token } from '../value-objects';

/**
 * MFA Repository Interface
 * Extends the base repository with MFA-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface IMfaRepository extends IBaseRepository<MFA> {
  /**
   * Find MFA configuration by user ID
   * @param userId - The unique identifier of the user
   * @returns The found MFA configuration or null if not found
   */
  findByUserId(userId: string): Promise<MFA | null>;

  /**
   * Find MFA configuration by user ID and MFA type
   * @param userId - The unique identifier of the user
   * @param type - The MFA type (TOTP, SMS, EMAIL)
   * @returns The found MFA configuration or null if not found
   */
  findByUserIdAndType(userId: string, type: MFAType): Promise<MFA | null>;

  /**
   * Find all MFA configurations for a user
   * @param userId - The unique identifier of the user
   * @returns An array of MFA configurations
   */
  findAllByUserId(userId: string): Promise<MFA[]>;

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
   * @returns True if increment was successful, false if not found
   */
  incrementFailedAttempts(
    id: string,
    maxFailedAttempts: number,
    lockoutDurationMinutes: number
  ): Promise<boolean>;

  /**
   * Reset failed attempts counter
   * @param id - The unique identifier of the MFA configuration
   * @returns True if reset was successful, false if not found
   */
  resetFailedAttempts(id: string): Promise<boolean>;

  /**
   * Update backup codes
   * @param id - The unique identifier of the MFA configuration
   * @param backupCodes - Array of backup code strings
   * @returns True if update was successful, false if not found
   */
  updateBackupCodes(id: string, backupCodes: string[]): Promise<boolean>;

  /**
   * Find MFA by secret (for verification)
   * @param secret - The secret string to search for
   * @returns The found MFA configuration or null if not found
   */
  findBySecret(secret: string): Promise<MFA | null>;

  /**
   * Find enabled MFA configurations by user ID
   * @param userId - The unique identifier of the user
   * @returns An array of enabled MFA configurations
   */
  findEnabledByUserId(userId: string): Promise<MFA[]>;

  /**
   * Check if user has MFA enabled
   * @param userId - The unique identifier of the user
   * @returns True if user has at least one enabled MFA method
   */
  hasEnabledMFA(userId: string): Promise<boolean>;

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
   * Find all expired MFA configurations (where verification expired)
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing expired MFA configurations and total count
   */
  findExpired(
    page: number,
    limit: number
  ): Promise<{
    items: MFA[];
    total: number;
  }>;

  /**
   * Update MFA verification timestamp
   * @param id - The unique identifier of the MFA configuration
   * @param verifiedAt - The verification timestamp
   * @returns True if update was successful, false if not found
   */
  updateVerifiedAt(id: string, verifiedAt: Date): Promise<boolean>;
}
