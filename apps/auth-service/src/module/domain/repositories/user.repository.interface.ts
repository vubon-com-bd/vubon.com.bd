/**
 * User repository interface
 * Defines the contract for user data access operations
 */
import type { User } from '../entities/user.entity';

export interface UserRepository {
  /**
   * Find a user by their unique identifier
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find a user by their email address
   */
  findByEmail(email: string): Promise<User | null>;

  /**
   * Find a user by their username
   */
  findByUsername(username: string): Promise<User | null>;

  /**
   * Find a user by their email or username
   */
  findByEmailOrUsername(emailOrUsername: string): Promise<User | null>;

  /**
   * Find a user by their verification token
   */
  findByVerificationToken(token: string): Promise<User | null>;

  /**
   * Find a user by their password reset token
   */
  findByPasswordResetToken(token: string): Promise<User | null>;

  /**
   * Find a user by their refresh token
   */
  findByRefreshToken(token: string): Promise<User | null>;

  /**
   * Find all users with optional pagination and filtering
   */
  findAll(options?: UserFindOptions): Promise<User[]>;

  /**
   * Find all users with pagination metadata
   */
  findAndCount(options?: UserFindOptions): Promise<[User[], number]>;

  /**
   * Save a user entity (create or update)
   */
  save(user: User): Promise<User>;

  /**
   * Create a new user
   */
  create(user: User): Promise<User>;

  /**
   * Update an existing user
   */
  update(user: User): Promise<User>;

  /**
   * Delete a user by their ID (soft delete)
   */
  delete(id: string): Promise<void>;

  /**
   * Permanently delete a user by their ID (hard delete)
   */
  hardDelete(id: string): Promise<void>;

  /**
   * Check if a user exists by email
   */
  existsByEmail(email: string): Promise<boolean>;

  /**
   * Check if a user exists by username
   */
  existsByUsername(username: string): Promise<boolean>;

  /**
   * Count total users with optional filters
   */
  count(filters?: UserFilters): Promise<number>;

  /**
   * Bulk save multiple users
   */
  saveMany(users: User[]): Promise<User[]>;

  /**
   * Bulk delete multiple users (soft delete)
   */
  deleteMany(ids: string[]): Promise<void>;

  /**
   * Find recently active users
   */
  findActiveUsers(since: Date): Promise<User[]>;

  /**
   * Find users by their status
   */
  findByStatus(status: string): Promise<User[]>;

  /**
   * Find users by their role
   */
  findByRole(role: string): Promise<User[]>;

  /**
   * Find users pending verification
   */
  findPendingVerification(): Promise<User[]>;

  /**
   * Find locked users
   */
  findLockedUsers(): Promise<User[]>;

  /**
   * Find users by their last login date range
   */
  findByLastLogin(startDate: Date, endDate: Date): Promise<User[]>;

  /**
   * Search users by name, email, or username
   */
  search(query: string, options?: UserFindOptions): Promise<User[]>;

  /**
   * Begin a database transaction
   */
  transaction<T>(callback: (repository: UserRepository) => Promise<T>): Promise<T>;
}

export interface UserFindOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: UserFilters;
  includeDeleted?: boolean;
}

export interface UserFilters {
  status?: string | string[];
  role?: string | string[];
  isVerified?: boolean;
  isActive?: boolean;
  createdAfter?: Date;
  createdBefore?: Date;
  updatedAfter?: Date;
  updatedBefore?: Date;
  lastLoginAfter?: Date;
  lastLoginBefore?: Date;
  search?: string;
}

export interface UserSortOptions {
  field: keyof User;
  order: 'asc' | 'desc';
}

export interface UserPaginationResult {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface UserBulkOperationResult {
  success: boolean;
  processed: number;
  failed: number;
  errors?: Array<{
    id: string;
    error: string;
  }>;
}

export interface UserSearchResult {
  users: User[];
  total: number;
  query: string;
}

export interface UserRepositoryError extends Error {
  code?: string;
  details?: Record<string, unknown>;
}
