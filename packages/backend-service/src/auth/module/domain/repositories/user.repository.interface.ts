import type { User } from '../entities/user.entity';
import type { IBaseRepository } from './base.repository.interface';
import type { DefaultRole } from '@vubon/shared-constants';
import type { UserStatus } from '../entities/user.entity';
import type { Email, Phone } from '../value-objects';

/**
 * User Repository Interface
 * Extends the base repository with user-specific operations
 * Follows DIP (Dependency Inversion Principle) - domain layer depends on this abstraction
 */
export interface IUserRepository extends IBaseRepository<User> {
  /**
   * Find a user by their email address (Value Object)
   * @param email - The Email value object to search for
   * @returns The found user or null if not found
   */
  findByEmail(email: Email): Promise<User | null>;

  /**
   * Find a user by their phone number (Value Object)
   * @param phone - The Phone value object to search for
   * @returns The found user or null if not found
   */
  findByPhone(phone: Phone): Promise<User | null>;

  /**
   * Find users by their status
   * @param status - The user status to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing users and total count
   */
  findByStatus(
    status: UserStatus,
    page: number,
    limit: number
  ): Promise<{
    items: User[];
    total: number;
  }>;

  /**
   * Find users by their role
   * @param role - The role to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing users and total count
   */
  findByRole(
    role: DefaultRole,
    page: number,
    limit: number
  ): Promise<{
    items: User[];
    total: number;
  }>;

  /**
   * Soft delete a user (marks as deleted without removing from database)
   * @param id - The unique identifier of the user to soft delete
   * @param reason - Optional reason for deletion
   * @returns True if soft deletion was successful, false if user not found
   */
  softDelete(id: string, reason?: string): Promise<boolean>;

  /**
   * Restore a soft-deleted user
   * @param id - The unique identifier of the user to restore
   * @returns True if restoration was successful, false if user not found
   */
  restore(id: string): Promise<boolean>;

  /**
   * Check if a user exists by email (Value Object)
   * @param email - The Email value object to check
   * @returns True if a user with the email exists, false otherwise
   */
  existsByEmail(email: Email): Promise<boolean>;

  /**
   * Check if a user exists by phone (Value Object)
   * @param phone - The Phone value object to check
   * @returns True if a user with the phone exists, false otherwise
   */
  existsByPhone(phone: Phone): Promise<boolean>;

  /**
   * Update a user's login metadata (last login time, IP, user agent)
   * @param id - The unique identifier of the user
   * @param ipAddress - The IP address of the login
   * @param userAgent - The user agent of the login
   * @returns True if update was successful, false if user not found
   */
  updateLoginMetadata(id: string, ipAddress: string, userAgent: string): Promise<boolean>;

  /**
   * Find users by role with pagination
   * @param role - The role to filter by
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @param sortBy - Field to sort by
   * @param sortOrder - Sort order (asc or desc)
   * @returns A paginated result containing users and total count
   */
  findByRoleWithPagination(
    role: DefaultRole,
    page: number,
    limit: number,
    sortBy?: keyof User,
    sortOrder?: 'asc' | 'desc'
  ): Promise<{
    items: User[];
    total: number;
  }>;

  /**
   * Search users by name or email
   * @param searchTerm - The search term to match against name or email
   * @param page - Page number for pagination (1-indexed)
   * @param limit - Number of items per page
   * @returns A paginated result containing matching users and total count
   */
  searchUsers(
    searchTerm: string,
    page: number,
    limit: number
  ): Promise<{
    items: User[];
    total: number;
  }>;
}
