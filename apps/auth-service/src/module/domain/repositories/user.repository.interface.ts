/**
 * User Repository Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/user.repository.interface
 * 
 * @description
 * Repository interface for User entity persistence (aggregate root).
 * Manages user accounts, authentication, and user management.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Comprehensive search and filter capabilities
 * ✅ Bulk operations for user management
 * ✅ Statistics and analytics support
 * ✅ Framework-free, infrastructure-agnostic
 */

import { BaseRepository, PaginationOptions, PaginatedResult } from './base.repository.interface';
import { User, UserStatus, UserRole, UserTier } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

// ==================== Types ====================

/**
 * User search filters
 */
export interface UserFilters {
  email?: Email;
  phone?: Phone;
  fullName?: string;
  status?: UserStatus;
  role?: UserRole;
  tier?: UserTier;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isKycVerified?: boolean;
  mfaEnabled?: boolean;
  isActive?: boolean;
  isLocked?: boolean;
  isSuspended?: boolean;
  fromDate?: Date;
  toDate?: Date;
  minTotalSpent?: number;
  maxTotalSpent?: number;
  preferredDistrict?: string;
  preferredUpazila?: string;
  searchTerm?: string;  // Searches in email, name, phone
}

/**
 * User statistics
 */
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  lockedUsers: number;
  suspendedUsers: number;
  deletedUsers: number;
  pendingVerificationUsers: number;
  emailVerifiedUsers: number;
  phoneVerifiedUsers: number;
  kycVerifiedUsers: number;
  mfaEnabledUsers: number;
  byRole: Record<UserRole, number>;
  byStatus: Record<UserStatus, number>;
  byTier: Record<UserTier, number>;
  newUsersLast24h: number;
  newUsersLast7Days: number;
  newUsersLast30Days: number;
  activeUsersLast24h: number;
  activeUsersLast7Days: number;
  averageAgeDays: number;
  averageTotalSpent: number;
  // Bangladesh specific
  usersByDistrict?: Array<{ district: string; count: number }>;
  usersByPreferredLanguage?: Record<string, number>;
}

/**
 * Bulk operation result
 */
export interface BulkOperationResult {
  successCount: number;
  failedCount: number;
  errors: Array<{ id: string; error: string }>;
  successIds: string[];
  failedIds: string[];
}

/**
 * Registration trend data
 */
export interface RegistrationTrend {
  date: string;
  count: number;
  byRole: Record<UserRole, number>;
  byTier: Record<UserTier, number>;
  byProvider?: Record<string, number>;
}

/**
 * User activity summary
 */
export interface UserActivitySummary {
  userId: string;
  email: string;
  phoneNumber?: string;
  fullName: string;
  displayName: string;
  lastLoginAt?: Date;
  loginCount: number;
  totalSessionDuration: number;
  averageSessionDuration: number;
  totalOrders: number;
  totalSpent: number;
  userTier: UserTier;
}

/**
 * User engagement score result
 */
export interface UserEngagementScore {
  userId: string;
  score: number;  // 0-100
  level: 'low' | 'medium' | 'high' | 'very_high';
  factors: {
    loginFrequency: number;
    sessionDuration: number;
    orderFrequency: number;
    totalSpent: number;
    recentActivity: number;
  };
  lastCalculatedAt: Date;
}

/**
 * Retention metrics
 */
export interface RetentionMetrics {
  retentionRate: number;
  churnRate: number;
  cohortAnalysis: Array<{ 
    cohort: string; 
    count: number; 
    retained: number; 
    retentionRate: number;
    byTier?: Record<UserTier, number>;
  }>;
  periodDays: number;
}

/**
 * User lifecycle stages
 */
export interface UserLifecycleStages {
  new: number;        // Registered in last 7 days
  active: number;     // Active in last 30 days
  engaged: number;    // Active in last 7 days + has orders
  atRisk: number;     // Not active in last 30-60 days
  churned: number;    // Not active in last 60+ days
  dormant: number;    // Registered but never active
}

// ==================== Repository Interface ====================

/**
 * User Repository Interface
 * 
 * Manages user account lifecycle and queries
 */
export interface UserRepository extends BaseRepository<User> {
  // ========== Basic Queries ==========
  
  /**
   * Find user by email
   * @param email - Email value object
   * @returns User or null
   */
  findByEmail(email: Email): Promise<User | null>;
  
  /**
   * Find user by phone number
   * @param phone - Phone value object
   * @returns User or null
   */
  findByPhone(phone: Phone): Promise<User | null>;
  
  /**
   * Find user by email or phone
   * @param identifier - Email or phone string
   * @returns User or null
   */
  findByIdentifier(identifier: string): Promise<User | null>;
  
  /**
   * Find user by email with case-insensitive search
   * @param email - Email string
   * @returns User or null
   */
  findByEmailCaseInsensitive(email: string): Promise<User | null>;
  
  // ========== Find by Status/Role/Tier ==========
  
  /**
   * Find users by status
   * @param status - User status
   * @param options - Pagination options
   * @returns Paginated users
   */
  findByStatus(
    status: UserStatus,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  /**
   * Find users by role
   * @param role - User role
   * @param options - Pagination options
   * @returns Paginated users
   */
  findByRole(
    role: UserRole,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  /**
   * Find users by tier (loyalty program)
   * @param tier - User tier
   * @param options - Pagination options
   * @returns Paginated users
   */
  findByTier(
    tier: UserTier,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  /**
   * Find active users (status = ACTIVE)
   * @param options - Pagination options
   * @returns Paginated active users
   */
  findActiveUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find locked users
   * @param options - Pagination options
   * @returns Paginated locked users
   */
  findLockedUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find suspended users
   * @param options - Pagination options
   * @returns Paginated suspended users
   */
  findSuspendedUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find deleted users (soft deleted)
   * @param options - Pagination options
   * @returns Paginated deleted users
   */
  findDeletedUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find pending verification users
   * @param options - Pagination options
   * @returns Paginated users
   */
  findPendingVerificationUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  // ========== Find by Verification ==========
  
  /**
   * Find users with unverified email
   * @param options - Pagination options
   * @returns Paginated users
   */
  findUnverifiedEmail(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find users with unverified phone
   * @param options - Pagination options
   * @returns Paginated users
   */
  findUnverifiedPhone(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find users without MFA enabled
   * @param options - Pagination options
   * @returns Paginated users
   */
  findWithoutMFA(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find users with MFA enabled
   * @param options - Pagination options
   * @returns Paginated users
   */
  findWithMFA(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Find KYC verified users
   * @param options - Pagination options
   * @returns Paginated users
   */
  findKycVerifiedUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  // ========== Search ==========
  
  /**
   * Search users by name, email, or phone
   * @param searchTerm - Search string
   * @param options - Pagination options
   * @returns Paginated users
   */
  searchUsers(
    searchTerm: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  /**
   * Find users by filters
   * @param filters - Query filters
   * @param options - Pagination options
   * @returns Paginated users
   */
  findByFilters(
    filters: UserFilters,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  /**
   * Find users by district (Bangladesh specific)
   * @param district - District name
   * @param options - Pagination options
   * @returns Paginated users
   */
  findByDistrict(
    district: string,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  // ========== Recently Active ==========
  
  /**
   * Find recently active users (last login within days)
   * @param days - Number of days
   * @param options - Pagination options
   * @returns Paginated users
   */
  findRecentlyActive(
    days: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  /**
   * Find inactive users (no login for days)
   * @param days - Number of days inactive
   * @param options - Pagination options
   * @returns Paginated users
   */
  findInactiveUsers(
    days: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  /**
   * Find users by total spent range
   * @param minSpent - Minimum total spent
   * @param maxSpent - Maximum total spent
   * @param options - Pagination options
   * @returns Paginated users
   */
  findByTotalSpentRange(
    minSpent: number,
    maxSpent: number,
    options: PaginationOptions
  ): Promise<PaginatedResult<User>>;
  
  // ========== Bulk Operations ==========
  
  /**
   * Bulk activate users
   * @param userIds - Array of user IDs
   * @returns Bulk operation result
   */
  bulkActivate(userIds: string[]): Promise<BulkOperationResult>;
  
  /**
   * Bulk deactivate users
   * @param userIds - Array of user IDs
   * @returns Bulk operation result
   */
  bulkDeactivate(userIds: string[]): Promise<BulkOperationResult>;
  
  /**
   * Bulk lock users
   * @param userIds - Array of user IDs
   * @param reason - Lock reason
   * @returns Bulk operation result
   */
  bulkLock(userIds: string[], reason: string): Promise<BulkOperationResult>;
  
  /**
   * Bulk unlock users
   * @param userIds - Array of user IDs
   * @returns Bulk operation result
   */
  bulkUnlock(userIds: string[]): Promise<BulkOperationResult>;
  
  /**
   * Bulk assign role
   * @param userIds - Array of user IDs
   * @param role - New role
   * @returns Bulk operation result
   */
  bulkAssignRole(userIds: string[], role: UserRole): Promise<BulkOperationResult>;
  
  /**
   * Bulk update user tier (recalculate loyalty tiers)
   * @param userIds - Array of user IDs
   * @returns Bulk operation result
   */
  bulkRecalculateTiers(userIds: string[]): Promise<BulkOperationResult>;
  
  // ========== Count Methods ==========
  
  /**
   * Count users by status
   * @param status - User status
   * @returns Count
   */
  countByStatus(status: UserStatus): Promise<number>;
  
  /**
   * Count users by role
   * @param role - User role
   * @returns Count
   */
  countByRole(role: UserRole): Promise<number>;
  
  /**
   * Count users by tier
   * @param tier - User tier
   * @returns Count
   */
  countByTier(tier: UserTier): Promise<number>;
  
  /**
   * Count verified users
   * @returns Count of email verified users
   */
  countVerifiedUsers(): Promise<number>;
  
  /**
   * Count phone verified users
   * @returns Count of phone verified users
   */
  countPhoneVerifiedUsers(): Promise<number>;
  
  /**
   * Count MFA enabled users
   * @returns Count of MFA enabled users
   */
  countMFAEnabledUsers(): Promise<number>;
  
  /**
   * Count users registered between dates
   * @param fromDate - Start date
   * @param toDate - End date
   * @returns Count
   */
  countRegisteredBetween(fromDate: Date, toDate: Date): Promise<number>;
  
  /**
   * Count active users (logged in last 30 days)
   * @returns Count of active users
   */
  countActiveUsers(): Promise<number>;
  
  // ========== Statistics ==========
  
  /**
   * Get user statistics
   * @returns User statistics
   */
  getStatistics(): Promise<UserStatistics>;
  
  /**
   * Get registration trends
   * @param days - Number of days
   * @returns Registration trends
   */
  getRegistrationTrends(days: number): Promise<RegistrationTrend[]>;
  
  /**
   * Get user activity summary
   * @param userId - User ID (optional)
   * @param limit - Limit results
   * @returns User activity summaries
   */
  getUserActivitySummary(userId?: string, limit?: number): Promise<UserActivitySummary[]>;
  
  /**
   * Get user distribution by district (Bangladesh specific)
   * @returns District distribution
   */
  getUserDistributionByDistrict(): Promise<Array<{ district: string; count: number }>>;
  
  // ========== Existence Checks ==========
  
  /**
   * Check if user exists by email
   * @param email - Email to check
   * @returns True if exists
   */
  existsByEmail(email: Email): Promise<boolean>;
  
  /**
   * Check if user exists by phone
   * @param phone - Phone to check
   * @returns True if exists
   */
  existsByPhone(phone: Phone): Promise<boolean>;
  
  /**
   * Check if email is already used by another user
   * @param email - Email to check
   * @param excludeUserId - User ID to exclude
   * @returns True if email is taken
   */
  isEmailTaken(email: Email, excludeUserId?: string): Promise<boolean>;
  
  /**
   * Check if phone is already used by another user
   * @param phone - Phone to check
   * @param excludeUserId - User ID to exclude
   * @returns True if phone is taken
   */
  isPhoneTaken(phone: Phone, excludeUserId?: string): Promise<boolean>;
  
  // ========== Update Operations ==========
  
  /**
   * Update user with optimistic locking
   * @param user - User entity with updated version
   * @returns void
   * @throws {OptimisticLockError} If version mismatch
   */
  updateWithVersion(user: User): Promise<void>;
  
  /**
   * Update last login timestamp
   * @param userId - User ID
   * @returns void
   */
  updateLastLogin(userId: string): Promise<void>;
  
  /**
   * Update user total spent (for tier recalculation)
   * @param userId - User ID
   * @param additionalAmount - Amount to add
   * @returns void
   */
  updateTotalSpent(userId: string, additionalAmount: number): Promise<void>;
  
  /**
   * Batch update user status
   * @param updates - Map of user IDs to status
   * @returns Bulk operation result
   */
  batchUpdateStatus(updates: Map<string, UserStatus>): Promise<BulkOperationResult>;
  
  // ========== Soft Delete ==========
  
  /**
   * Soft delete user
   * @param userId - User ID
   * @param reason - Deletion reason
   * @returns void
   */
  softDelete(userId: string, reason?: string): Promise<void>;
  
  /**
   * Restore soft deleted user
   * @param userId - User ID
   * @returns void
   */
  restore(userId: string): Promise<void>;
  
  /**
   * Permanently delete user (hard delete)
   * @param userId - User ID
   * @returns void
   */
  permanentDelete(userId: string): Promise<void>;
  
  // ========== Audit & Export ==========
  
  /**
   * Export users for audit
   * @param filters - User filters
   * @param options - Pagination options
   * @returns Users for audit
   */
  exportForAudit(
    filters?: UserFilters,
    options?: PaginationOptions
  ): Promise<User[]>;
  
  /**
   * Get user change history
   * @param userId - User ID
   * @param limit - Limit results
   * @returns Change history
   */
  getUserChangeHistory(userId: string, limit?: number): Promise<Array<{
    field: string;
    oldValue: unknown;
    newValue: unknown;
    changedAt: Date;
    changedBy: string;
  }>>;
}

// ============================================================
// Advanced Repository Interface
// ============================================================

/**
 * Advanced User Repository with analytics
 */
export interface AdvancedUserRepository extends UserRepository {
  /**
   * Get user retention metrics
   * @param days - Number of days to analyze
   * @returns Retention metrics
   */
  getRetentionMetrics(days: number): Promise<RetentionMetrics>;
  
  /**
   * Get user engagement score
   * @param userId - User ID
   * @returns Engagement score (0-100)
   */
  getEngagementScore(userId: string): Promise<UserEngagementScore>;
  
  /**
   * Find users at risk of churning
   * @param options - Pagination options
   * @returns Users at risk
   */
  findAtRiskUsers(options: PaginationOptions): Promise<PaginatedResult<User>>;
  
  /**
   * Get user lifecycle stages
   * @returns User distribution by lifecycle stage
   */
  getUserLifecycleStages(): Promise<UserLifecycleStages>;
  
  /**
   * Get cohort analysis by registration month
   * @param months - Number of months to analyze
   * @returns Cohort analysis
   */
  getCohortAnalysis(months: number): Promise<{
    cohorts: Array<{
      cohort: string;
      size: number;
      retention: Record<number, number>;
      averageOrderValue: Record<number, number>;
    }>;
  }>;
  
  /**
   * Predict user churn probability
   * @param userId - User ID
   * @returns Churn probability (0-100)
   */
  predictChurnProbability(userId: string): Promise<number>;
  
  /**
   * Get user lifetime value (LTV) prediction
   * @param userId - User ID
   * @returns Predicted LTV
   */
  getPredictedLTV(userId: string): Promise<{
    predictedLTV: number;
    confidenceInterval: { lower: number; upper: number };
    percentile: number;
  }>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  UserStatistics, 
  UserFilters, 
  BulkOperationResult, 
  RegistrationTrend,
  UserActivitySummary,
  UserEngagementScore,
  RetentionMetrics,
  UserLifecycleStages
};
