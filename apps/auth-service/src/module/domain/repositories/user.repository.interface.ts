/**
 * User Repository Interface
 * Defines user-specific repository operations
 */

import { User } from '../entities/user.entity.js';
import { IBaseRepository } from './base.repository.interface.js';
import type { UserStatus } from '@vubon/auth-shared-constants';

export interface IUserRepository extends IBaseRepository<User> {
  /**
   * Find a user by their email address
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find a user by their phone number
   */
  findByPhone(phone: string): Promise<User | null>;

  /**
   * Check if a user exists by email
   */
  existsByEmail(email: string): Promise<boolean>;

  /**
   * Check if a user exists by phone
   */
  existsByPhone(phone: string): Promise<boolean>;

  /**
   * Find users by their status
   */
  findByStatus(status: UserStatus): Promise<User[]>;

  /**
   * Find users by their role
   */
  findByRole(role: string): Promise<User[]>;

  /**
   * Find users who are not verified
   */
  findUnverifiedUsers(): Promise<User[]>;

  /**
   * Find users who have been inactive for a certain period
   */
  findInactiveUsers(since: Date): Promise<User[]>;

  /**
   * Update user status
   */
  updateStatus(id: string, status: UserStatus): Promise<User>;

  /**
   * Update user's email verification status
   */
  updateEmailVerification(id: string, isVerified: boolean): Promise<User>;

  /**
   * Update user's phone verification status
   */
  updatePhoneVerification(id: string, isVerified: boolean): Promise<User>;

  /**
   * Update user's password hash
   */
  updatePasswordHash(id: string, newHash: string): Promise<User>;

  /**
   * Find users by email with case-insensitive search
   */
  findByEmailCaseInsensitive(email: string): Promise<User | null>;

  /**
   * Count users by status
   */
  countByStatus(status: UserStatus): Promise<number>;

  /**
   * Count users by role
   */
  countByRole(role: string): Promise<number>;

  /**
   * Get user with their metadata
   */
  findWithMetadata(id: string): Promise<User | null>;

  /**
   * Bulk update user status
   */
  bulkUpdateStatus(ids: string[], status: UserStatus): Promise<number>;

  /**
   * Soft delete a user (deactivate)
   */
  softDelete(id: string): Promise<User>;

  /**
   * Restore a soft-deleted user
   */
  restore(id: string): Promise<User>;

  /**
   * Find recently registered users
   */
  findRecentlyRegistered(days: number): Promise<User[]>;
}
