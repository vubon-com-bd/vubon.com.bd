/**
 * User Repository Interface - Pure Domain Contract (Enterprise Enhanced)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module domain/repositories/user.repository.interface
 * 
 * @description
 * Repository interface for User entity persistence (aggregate root).
 * Manages user accounts, authentication, and user management.
 * 
 * ENTERPRISE ENHANCEMENTS (v3.0):
 * ✅ Shared types integration from @vubon/shared-types
 * ✅ Cache key generation for query optimization
 * ✅ Distributed locking for concurrent operations
 * ✅ Rate limit integration with infrastructure
 * ✅ Bulk operation progress tracking
 * ✅ Soft delete cascade support
 * ✅ Data retention policy hooks
 * ✅ Sharding support for multi-tenant
 * ✅ Connection pool monitoring
 * ✅ Event sourcing readiness
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions - NO implementation
 * ✅ Extends BaseRepository for consistency
 * ✅ Comprehensive search and filter capabilities
 * ✅ Bulk operations for user management
 * ✅ Statistics and analytics support
 * ✅ Framework-free, infrastructure-agnostic
 */
mport type { 
  PaginationParams as SharedPaginationOptions,
  OffsetPaginationResponse as SharedPaginatedResult,
  DomainEvent,
} from '@vubon/shared-types';

import { BaseRepository } from './base.repository.interface';
import { User, UserStatus, UserRole, UserTier } from '../entities/user.entity';
import { Email } from '../value-objects/email.vo';
import { Phone } from '../value-objects/phone.vo';

// ==================== Types ====================

/**
 * Pagination options (re-export from shared-types)
 */
export type PaginationOptions = SharedPaginationOptions;

/**
 * Paginated result (re-export from shared-types)
 */
export type PaginatedResult<T> = SharedPaginatedResult<T>;

/**
 * ✅ ENTERPRISE: User search filters with enhanced options
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
  
  // ✅ ENTERPRISE: Additional filters
  createdAtRange?: { start: Date; end: Date };
  updatedAtRange?: { start: Date; end: Date };
  lastLoginRange?: { start: Date; end: Date };
  tags?: string[];
  customFields?: Record<string, unknown>;
  includeDeleted?: boolean;
  includeSoftDeleted?: boolean;
}



// ✅ Local type definitions (since they don't exist in shared-types)
export interface CacheKey {
  key: string;
  version?: number;
  ttl?: number;
}

export interface CacheOptions {
  ttl?: number;
  keyPrefix?: string;
  skipCache?: boolean;
}

export interface DistributedLock {
  lockId: string;
  expiresAt: Date;
  release: () => Promise<void>;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  retryAfterSeconds?: number;
}

export type BulkProgressCallback = (progress: {
  total: number;
  completed: number;
  failed: number;
  percentage: number;
  estimatedRemainingMs?: number;
}) => void;


/**
 * ✅ ENTERPRISE: Cache configuration for query results
 */
export interface UserCacheConfig {
  ttlSeconds: number;
  keyPrefix: string;
  invalidationEvents: string[];
  enabled: boolean;
}

/**
 * ✅ ENTERPRISE: Bulk operation result with enhanced tracking
 */
export interface BulkOperationResult {
  successCount: number;
  failedCount: number;
  skippedCount: number;
  errors: Array<{ id: string; error: string; timestamp: Date }>;
  successIds: string[];
  failedIds: string[];
  skippedIds: string[];
  startedAt: Date;
  completedAt: Date;
  durationMs: number;
  operationType: 'activate' | 'deactivate' | 'lock' | 'unlock' | 'assign_role' | 'update_tier';
  metadata?: Record<string, unknown>;
}

/**
 * ✅ ENTERPRISE: Soft delete cascade options
 */
export interface SoftDeleteCascadeOptions {
  softDeleteSessions: boolean;
  softDeleteTokens: boolean;
  softDeleteDevices: boolean;
  softDeleteMfa: boolean;
  deleteReason: string;
  performedBy: string;
}

/**
 * ✅ ENTERPRISE: Data retention policy
 */
export interface DataRetentionPolicy {
  inactiveDays: number;
  action: 'archive' | 'purge' | 'notify';
  archiveDestination?: string;
  excludeRoles?: UserRole[];
  excludeTiers?: UserTier[];
  batchSize: number;
  scheduleCron: string;
}

/**
 * ✅ ENTERPRISE: Shard configuration
 */
export interface ShardConfig {
  shardKey: 'user_id' | 'email_hash' | 'district';
  totalShards: number;
  shardMapping?: Record<string, number>;
}

/**
 * User statistics (Enhanced)
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
  
  // ✅ ENTERPRISE: Enhanced statistics
  churnRate30Days: number;
  retentionRate30Days: number;
  averageSessionsPerUser: number;
  averageOrdersPerUser: number;
  lifetimeValueAvg: number;
  userGrowthRate: number;
  engagementRate: number;
  
  // Bangladesh specific
  usersByDistrict?: Array<{ district: string; count: number; percentage: number }>;
  usersByUpazila?: Array<{ upazila: string; district: string; count: number }>;
  usersByPreferredLanguage?: Record<string, number>;
  usersByMobileOperator?: Record<string, number>;
  usersByNetworkType?: Record<string, number>;
}

/**
 * ✅ ENTERPRISE: User performance metrics
 */
export interface UserPerformanceMetrics {
  cacheHitRate: number;
  cacheMissRate: number;
  averageQueryTimeMs: number;
  p95QueryTimeMs: number;
  p99QueryTimeMs: number;
  connectionPoolUsage: number;
  activeConnections: number;
  shardDistribution: Record<number, number>;
  lastMetricsAt: Date;
}

/**
 * Registration trend data (Enhanced)
 */
export interface RegistrationTrend {
  date: string;
  count: number;
  byRole: Record<UserRole, number>;
  byTier: Record<UserTier, number>;
  byProvider?: Record<string, number>;
  
  // ✅ ENTERPRISE: Enhanced trend data
  byDistrict?: Record<string, number>;
  byDeviceType?: Record<string, number>;
  cumulativeCount: number;
  weekOverWeekGrowth: number;
  monthOverMonthGrowth: number;
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
  
  // ✅ ENTERPRISE: Enhanced activity data
  lastOrderAt?: Date;
  lastPasswordChangeAt?: Date;
  lastMfaChangeAt?: Date;
  totalFailedLogins: number;
  totalSupportTickets: number;
  averageOrderValue: number;
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
    socialActivity?: number;
    referralCount?: number;
  };
  lastCalculatedAt: Date;
  trend: 'increasing' | 'decreasing' | 'stable';
  percentile: number;
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
    byDistrict?: Record<string, number>;
  }>;
  periodDays: number;
  rollingRetention: Array<{ period: number; rate: number }>;
  projectedRetention: Array<{ period: number; rate: number; confidence: number }>;
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
  
  // ✅ ENTERPRISE: Enhanced stages
  returning: number;  // Previously churned, now active again
  vip: number;        // High value users (top 10% by spend)
  advocate: number;   // Users who refer others
}

// ==================== Repository Interface ====================

/**
 * User Repository Interface
 * 
 * Manages user account lifecycle and queries
 * ✅ ENTERPRISE ENHANCED: Added cache, distributed locking, bulk progress
 */
export interface UserRepository extends BaseRepository<User> {
  
  // ========== ✅ ENTERPRISE: Cache Management ==========
  
  /**
   * Get cache key for query (for infrastructure implementation)
   */
  getCacheKey(queryName: string, params: Record<string, unknown>): CacheKey;
  
  /**
   * Invalidate user-related cache entries
   */
  invalidateUserCache(userId: string): Promise<void>;
  
  /**
   * Invalidate cache by pattern
   */
  invalidateCacheByPattern(pattern: string): Promise<number>;
  
  /**
   * Get cache statistics
   */
  getCacheStats(): Promise<{ hits: number; misses: number; hitRate: number }>;
  
  // ========== ✅ ENTERPRISE: Distributed Locking ==========
  
  /**
   * Acquire distributed lock for user operation
   */
  acquireUserLock(userId: string, ttlSeconds?: number): Promise<DistributedLock>;
  
  /**
   * Execute operation with distributed lock
   */
  withUserLock<T>(userId: string, operation: () => Promise<T>, ttlSeconds?: number): Promise<T>;
  
  // ========== ✅ ENTERPRISE: Rate Limit Integration ==========
  
  /**
   * Check rate limit for user operation
   */
  checkRateLimit(userId: string, operation: string): Promise<RateLimitResult>;
  
  /**
   * Record rate limit usage
   */
  recordRateLimitUsage(userId: string, operation: string): Promise<void>;
  
  // ========== Basic Queries ==========
  
  /**
   * Find user by email
   * @param email - Email value object
   * @param useCache - Whether to use cache (default: true)
   * @returns User or null
   */
  findByEmail(email: Email, useCache?: boolean): Promise<User | null>;
  
  /**
   * Find user by phone number
   * @param phone - Phone value object
   * @param useCache - Whether to use cache (default: true)
   * @returns User or null
   */
  findByPhone(phone: Phone, useCache?: boolean): Promise<User | null>;
  
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
  
  /**
   * Find users by upazila (Bangladesh specific)
   * @param upazila - Upazila name
   * @param district - Optional district filter
   * @param options - Pagination options
   * @returns Paginated users
   */
  findByUpazila(
    upazila: string,
    district?: string,
    options?: PaginationOptions
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
  
  // ========== ✅ ENTERPRISE: Bulk Operations with Progress ==========
  
  /**
   * Bulk activate users with progress tracking
   * @param userIds - Array of user IDs
   * @param onProgress - Progress callback (optional)
   * @returns Bulk operation result
   */
  bulkActivate(
    userIds: string[], 
    onProgress?: BulkProgressCallback
  ): Promise<BulkOperationResult>;
  
  /**
   * Bulk deactivate users with progress tracking
   * @param userIds - Array of user IDs
   * @param onProgress - Progress callback (optional)
   * @returns Bulk operation result
   */
  bulkDeactivate(
    userIds: string[], 
    onProgress?: BulkProgressCallback
  ): Promise<BulkOperationResult>;
  
  /**
   * Bulk lock users with progress tracking
   * @param userIds - Array of user IDs
   * @param reason - Lock reason
   * @param onProgress - Progress callback (optional)
   * @returns Bulk operation result
   */
  bulkLock(
    userIds: string[], 
    reason: string,
    onProgress?: BulkProgressCallback
  ): Promise<BulkOperationResult>;
  
  /**
   * Bulk unlock users with progress tracking
   * @param userIds - Array of user IDs
   * @param onProgress - Progress callback (optional)
   * @returns Bulk operation result
   */
  bulkUnlock(
    userIds: string[], 
    onProgress?: BulkProgressCallback
  ): Promise<BulkOperationResult>;
  
  /**
   * Bulk assign role with progress tracking
   * @param userIds - Array of user IDs
   * @param role - New role
   * @param onProgress - Progress callback (optional)
   * @returns Bulk operation result
   */
  bulkAssignRole(
    userIds: string[], 
    role: UserRole,
    onProgress?: BulkProgressCallback
  ): Promise<BulkOperationResult>;
  
  /**
   * Bulk update user tier (recalculate loyalty tiers)
   * @param userIds - Array of user IDs
   * @param onProgress - Progress callback (optional)
   * @returns Bulk operation result
   */
  bulkRecalculateTiers(
    userIds: string[], 
    onProgress?: BulkProgressCallback
  ): Promise<BulkOperationResult>;
  
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
   * Get user statistics (with cache option)
   * @param useCache - Use cached statistics (default: true)
   * @returns User statistics
   */
  getStatistics(useCache?: boolean): Promise<UserStatistics>;
  
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
   * @returns District distribution with percentages
   */
  getUserDistributionByDistrict(): Promise<Array<{ district: string; count: number; percentage: number }>>;
  
  /**
   * ✅ ENTERPRISE: Get user distribution by upazila
   * @param district - Optional district filter
   * @returns Upazila distribution
   */
  getUserDistributionByUpazila(district?: string): Promise<Array<{ upazila: string; district: string; count: number; percentage: number }>>;
  
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
   * @param onProgress - Progress callback (optional)
   * @returns Bulk operation result
   */
  batchUpdateStatus(
    updates: Map<string, UserStatus>, 
    onProgress?: BulkProgressCallback
  ): Promise<BulkOperationResult>;
  
  // ========== ✅ ENTERPRISE: Soft Delete with Cascade ==========
  
  /**
   * Soft delete user with cascade options
   * @param userId - User ID
   * @param reason - Deletion reason
   * @param cascadeOptions - Cascade delete options
   * @returns void
   */
  softDeleteWithCascade(
    userId: string, 
    reason?: string,
    cascadeOptions?: SoftDeleteCascadeOptions
  ): Promise<void>;
  
  /**
   * Restore soft deleted user and cascaded data
   * @param userId - User ID
   * @returns void
   */
  restoreWithCascade(userId: string): Promise<void>;
  
  /**
   * Permanently delete user (hard delete) with cascade
   * @param userId - User ID
   * @returns void
   */
  permanentDeleteWithCascade(userId: string): Promise<void>;
  
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
  
  // ========== ✅ ENTERPRISE: Data Retention ==========
  
  /**
   * Apply data retention policy for inactive users
   * @param policy - Retention policy configuration
   * @returns Number of affected users
   */
  applyRetentionPolicy(policy: DataRetentionPolicy): Promise<number>;
  
  /**
   * Archive inactive users
   * @param daysInactive - Days of inactivity threshold
   * @param batchSize - Batch size for archiving
   * @returns Archive result
   */
  archiveInactiveUsers(daysInactive: number, batchSize?: number): Promise<{
    archivedCount: number;
    failedCount: number;
    archiveLocation: string;
  }>;
  
  // ========== ✅ ENTERPRISE: Sharding Support ==========
  
  /**
   * Get shard ID for user
   * @param userId - User ID
   * @returns Shard ID
   */
  getShardId(userId: string): number;
  
  /**
   * Set shard configuration
   * @param config - Shard configuration
   */
  setShardConfig(config: ShardConfig): void;
  
  /**
   * Get shard statistics
   */
  getShardStats(): Promise<Record<number, { userCount: number; lastUsed: Date }>>;
  
  // ========== ✅ ENTERPRISE: Performance Monitoring ==========
  
  /**
   * Get repository performance metrics
   */
  getPerformanceMetrics(): Promise<UserPerformanceMetrics>;
  
  /**
   * Reset performance metrics
   */
  resetPerformanceMetrics(): Promise<void>;
  
  /**
   * Get connection pool status
   */
  getConnectionPoolStatus(): Promise<{
    total: number;
    active: number;
    idle: number;
    waiting: number;
    max: number;
  }>;
  
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
   * Export users as stream (for large exports)
   * @param filters - User filters
   * @returns AsyncGenerator for streaming
   */
  exportAsStream(filters?: UserFilters): AsyncGenerator<User, void, unknown>;
  
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
    ipAddress?: string;
    userAgent?: string;
  }>>;
  
  /**
   * Get user event stream (event sourcing)
   * @param userId - User ID
   * @param fromVersion - Starting version
   * @returns Domain events
   */
  getUserEventStream(userId: string, fromVersion?: number): Promise<DomainEvent[]>;
}

// ============================================================
// Advanced Repository Interface
// ============================================================

/**
 * Advanced User Repository with analytics and ML capabilities
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
   * @param useCache - Use cached score (default: true)
   * @returns Engagement score (0-100)
   */
  getEngagementScore(userId: string, useCache?: boolean): Promise<UserEngagementScore>;
  
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
      totalRevenue: Record<number, number>;
    }>;
    summary: {
      averageRetentionRate: number;
      bestCohort: string;
      worstCohort: string;
    };
  }>;
  
  /**
   * Predict user churn probability (ML-based)
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
    factors: Record<string, number>;
  }>;
  
  /**
   * Find similar users (for recommendation engine)
   * @param userId - User ID
   * @param limit - Number of similar users
   * @returns Similar user IDs with similarity scores
   */
  findSimilarUsers(userId: string, limit?: number): Promise<Array<{ userId: string; similarity: number; commonTraits: string[] }>>;
  
  /**
   * Get user segment recommendations (ML-based segmentation)
   * @param segmentType - Type of segmentation
   * @returns User segment distribution
   */
  getUserSegmentation(segmentType: 'behavioral' | 'demographic' | 'value'): Promise<{
    segments: Array<{
      name: string;
      count: number;
      percentage: number;
      characteristics: string[];
      averageEngagement: number;
      retentionRate: number;
    }>;
  }>;
  
  /**
   * Refresh user engagement scores (batch update)
   * @param userIds - Optional specific users (all if not provided)
   * @param onProgress - Progress callback
   * @returns Number of updated users
   */
  refreshEngagementScores(
    userIds?: string[], 
    onProgress?: BulkProgressCallback
  ): Promise<number>;
}


// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied:
// 1. ✅ Shared types integration from @vubon/shared-types
// 2. ✅ Cache key generation and invalidation patterns
// 3. ✅ Distributed locking for concurrent operations
// 4. ✅ Rate limit integration with infrastructure
// 5. ✅ Bulk operation progress tracking (real-time)
// 6. ✅ Soft delete cascade support (related data)
// 7. ✅ Data retention policy hooks
// 8. ✅ Sharding support for multi-tenant
// 9. ✅ Connection pool monitoring metrics
// 10. ✅ Event sourcing readiness (event stream)
// 11. ✅ Async stream export for large datasets
// 12. ✅ ML-based predictions (churn, LTV, similarity)
// 13. ✅ User segmentation for marketing campaigns
// 14. ✅ Performance metrics with percentiles
// 15. ✅ Bangladesh specific upazila-level distribution
// 
// Bangladesh Specific:
// - District and Upazila level user distribution
// - Mobile operator and network type tracking
// - Bengali language performance tracking
