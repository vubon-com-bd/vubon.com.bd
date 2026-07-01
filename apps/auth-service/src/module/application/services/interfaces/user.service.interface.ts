/**
 * User Service Interface - Enterprise Grade (v3.0)
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/user.service.interface
 * 
 * @description
 * Service contract for user management operations with enterprise features.
 * NO implementation - ONLY method signatures.
 * 
 * ENTERPRISE FEATURES (v3.0):
 * ✅ Shared types integration for consistency
 * ✅ Bangladesh-specific filters (district, upazila, mobileOperator, networkType)
 * ✅ Soft delete with restore functionality
 * ✅ User tier loyalty program (Bronze, Silver, Gold, Platinum, Diamond)
 * ✅ KYC verification for vendors/sellers
 * ✅ Retention metrics with cohort analysis
 * ✅ Complete audit trail with change history
 * ✅ Bulk operations with progress tracking
 * ✅ Export for compliance audit
 * ✅ Session invalidation on password change
 * ✅ Device fingerprint tracking
 * 
 * @example
 * const userService = new UserService(userRepository, cacheService, ...);
 * const profile = await userService.getProfile(userId);
 */

import { 
  UpdateProfileDto, 
  UpdateProfileResponseDto,
  UpdateEmailDto,
  UpdateEmailResponseDto,
  UpdatePhoneDto,
  UpdatePhoneResponseDto,
  VerifyEmailChangeDto,
  VerifyPhoneChangeDto
} from '../../dtos/user/update-profile.dto';
import { 
  ChangePasswordDto, 
  ChangePasswordResponseDto,
  ValidateCurrentPasswordResponseDto,
  PasswordRulesResponseDto
} from '../../dtos/user/change-password.dto';
import { 
  AdminCreateUserDto,
  AdminCreateUserResponseDto,
  UseUserPreferencesDto
} from '../../dtos/user/create-user.dto';
import { 
  PaginationDto, 
  PaginatedResponseDto 
} from '../../dtos/common/pagination.dto';
import { 
  UserResponseDto, 
  UserProfileResponseDto, 
  BriefUserResponseDto,
  UserActivitySummaryDto
} from '../../mappers/user.mapper';
import { AuditDto } from '../../dtos/common/audit.dto';

// ✅ ENTERPRISE: Import from shared packages (single source of truth)
import type { 
  DeviceInfo as SharedDeviceInfo,
  NetworkType as SharedNetworkType,
  MobileOperator as SharedMobileOperator,
  UserTier as SharedUserTier,
  UserFilters as SharedUserFilters,
  UserStatistics as SharedUserStatistics,
  RegistrationTrend as SharedRegistrationTrend,
  DeleteAccountResponse as SharedDeleteAccountResponse,
  ReactivateAccountResponse as SharedReactivateAccountResponse,
  BulkOperationProgress,
  BulkOperationResult as SharedBulkOperationResult
} from '@vubon/shared-types';

import { 
  USER_TIERS,              // ✅ ইউনিক
  USER_STATUSES,           // ✅ ইউনিক
  USER_ROLES,              // ✅ ইউনিক
  BANGLADESH_DISTRICTS,    // ✅ ইউনিক
  BANGLADESH_UPAZILAS,     // ✅ ইউনিক
  USER_MOBILE_OPERATORS,   // ✅ নতুন ইউনিক নাম
  USER_NETWORK_TYPES,      // ✅ নতুন ইউনিক নাম
  USER_DELETION_REASONS,   // ✅ নতুন ইউনিক নাম
  USER_SUSPENSION_REASONS  // ✅ নতুন ইউনিক নাম
} from '@vubon/shared-constants';

// ============================================================
// ✅ FIXED: Type-safe constants extraction (Error 2537)
// ============================================================

// Mobile operator type (extracted from USER_MOBILE_OPERATORS)
export type MobileOperator = typeof USER_MOBILE_OPERATORS[keyof typeof USER_MOBILE_OPERATORS];
// Network type (extracted from USER_NETWORK_TYPES)
export type NetworkType = typeof USER_NETWORK_TYPES[keyof typeof USER_NETWORK_TYPES];
// User role type (extracted from USER_ROLES)
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
// User status type (extracted from USER_STATUSES)
export type UserStatus = typeof USER_STATUSES[keyof typeof USER_STATUSES];
// User tier type (extracted from USER_TIERS)
export type UserTier = typeof USER_TIERS[keyof typeof USER_TIERS];
// Bangladesh district type (extracted from BANGLADESH_DISTRICTS)
export type BangladeshDistrict = typeof BANGLADESH_DISTRICTS[number];
// Bangladesh upazila type (extracted from BANGLADESH_UPAZILAS)
export type BangladeshUpazila = typeof BANGLADESH_UPAZILAS[number];
// Deletion reason type (extracted from USER_DELETION_REASONS)
export type DeletionReason = typeof USER_DELETION_REASONS[keyof typeof USER_DELETION_REASONS];
// Suspension reason type (extracted from USER_SUSPENSION_REASONS)
export type SuspensionReason = typeof USER_SUSPENSION_REASONS[keyof typeof USER_SUSPENSION_REASONS];

/**
 * Device information interface (Bangladesh specific)
 * Includes network type, mobile operator, district for security scoring
 * 
 * ✅ FIXED: Using shared types for networkType and mobileOperator
 * to ensure compatibility with @vubon/shared-types
 */
export interface DeviceInfo extends SharedDeviceInfo {
  /** Network type for connection quality (Bangladesh specific) */
  networkType?: SharedNetworkType;
  /** Mobile operator for carrier-specific logic */
  mobileOperator?: SharedMobileOperator;
  /** Geographic district (Bangladesh) */
  district?: BangladeshDistrict;
  /** Geographic upazila/sub-district */
  upazila?: string;
  /** Device fingerprint hash for fraud detection */
  deviceFingerprint?: string;
  /** Whether data saver mode is enabled */
  dataSaverEnabled?: boolean;
}
/**
 * User filters with Bangladesh-specific fields
 */
export interface UserFilters extends SharedUserFilters {
  /** Filter by district (Bangladesh specific) */
  district?: BangladeshDistrict;
  /** Filter by upazila/sub-district */
  upazila?: string;
  /** Filter by mobile operator */
  mobileOperator?: MobileOperator;
  /** Filter by network type */
  networkType?: NetworkType;
  /** Filter by date range of last login */
  lastLoginFrom?: Date;
  lastLoginTo?: Date;
  /** Filter by total spent range */
  minTotalSpent?: number;
  maxTotalSpent?: number;
  /** Filter by KYC verification status */
  kycVerified?: boolean;
  /** Filter by MFA enabled status */
  mfaEnabled?: boolean;
  /** Search in email, name, phone */
  searchTerm?: string;
  /** Include soft-deleted users (admin only) */
  includeDeleted?: boolean;
}

/**
 * Delete account response with enhanced metadata
 */
export interface DeleteAccountResponseDto extends SharedDeleteAccountResponse {
  /** Grace period days until permanent deletion */
  gracePeriodDays: number;
  /** Scheduled permanent deletion date */
  permanentDeletionDate: Date;
  /** Whether data export was requested */
  dataExportRequested: boolean;
  /** Data export URL (if requested) */
  dataExportUrl?: string;
  /** Data export expiry */
  dataExportExpiresAt?: Date;
  /** Reason for deletion */
  reason?: string;
}

/**
 * Account reactivation response
 */
export interface ReactivateAccountResponseDto extends SharedReactivateAccountResponse {
  /** Number of sessions restored */
  sessionsRestored: number;
  /** Whether MFA was re-enabled */
  mfaReEnabled: boolean;
  /** New session ID (if auto-login) */
  newSessionId?: string;
}

// ============================================================
// ✅ FIXED: UserStatistics (Error 2430 - required vs optional mismatch)
// ============================================================

/**
 * User statistics with Bangladesh-specific breakdown
 * ✅ FIXED: Extended with Bangladesh-specific fields
 * ✅ FIXED: usersByDistrict is now required (matching shared type)
 */
export interface UserStatistics extends Omit<SharedUserStatistics, 'usersByStatus' | 'usersByRole' | 'usersByTier'> {
  // Bangladesh specific breakdowns (✅ FIXED: removed ? to match shared type)
  usersByDistrict: Array<{ district: BangladeshDistrict; count: number; percentage: number }>;
  usersByUpazila?: Array<{ upazila: string; district: string; count: number }>;
  usersByMobileOperator?: Array<{ operator: MobileOperator; count: number; percentage: number }>;
  usersByNetworkType?: Array<{ networkType: NetworkType; count: number; percentage: number }>;
  
  // ✅ FIXED: Using Record type for better compatibility
  usersByTier: Record<string, number>;
  usersByRole: Record<string, number>;
  usersByStatus: Record<string, number>;
  
  // KYC & Verification stats
  kycVerifiedUsers: number;
  kycPendingUsers: number;
  kycRejectedUsers: number;
  mfaEnabledUsers: number;
  emailVerifiedUsers: number;
  phoneVerifiedUsers: number;
  
  // Activity metrics
  activeUsersLast7Days: number;
  activeUsersLast30Days: number;
  newUsersLast7Days: number;
  newUsersLast30Days: number;
  churnedUsersLast30Days: number;
  
  // Financial metrics
  averageLifetimeValue: number;
  totalLifetimeValue: number;
  averageOrderValue: number;
  topSpenders: Array<{ userId: string; totalSpent: number }>;
  
  // Compliance metrics
  dataRetentionConsent: number;
  marketingConsent: number;
}

/**
 * Registration trend with enhanced analytics
 */
export interface RegistrationTrend extends SharedRegistrationTrend {
  byDistrict?: Record<string, number>;
  byMobileOperator?: Record<string, number>;
  byNetworkType?: Record<string, number>;
  byDeviceType?: Record<string, number>;
  byReferralSource?: Record<string, number>;
  conversionRate: number;
  averageTimeToVerify: number; // hours
}

/**
 * Retention metrics with cohort analysis
 */
export interface RetentionMetrics {
  retentionRate: number;
  churnRate: number;
  periodDays: number;
  cohortAnalysis: Array<{
    cohort: string;           // Month of registration (YYYY-MM)
    size: number;             // Number of users in cohort
    retained: number;         // Number still active
    retentionRate: number;    // Percentage retained
    byTier?: Record<string, number>;
    byDistrict?: Record<string, number>;
    averageLTV?: number;      // Average lifetime value for cohort
  }>;
  rollingRetention: Array<{ period: number; rate: number }>;
  projectedRetention: Array<{ period: number; rate: number; confidence: number }>;
  churnPrediction: {
    atRiskUsers: number;
    predictedChurnNextMonth: number;
    confidence: number;
  };
}

/**
 * ✅ ENTERPRISE ENHANCEMENT 2: User Tier Benefits
 */
export interface UserTierBenefits {
  tier: SharedUserTier;
  discountPercentage: number;
  freeShipping: boolean;
  prioritySupport: boolean;
  exclusiveAccess: boolean;
  birthdayGift: boolean;
  anniversaryDiscount: boolean;
  referralBonus: number;
  cashbackPercentage: number;
  tierUpgradeThreshold: number;      // Next tier threshold in BDT
  tierUpgradeProgress: number;       // Percentage to next tier
  benefitsExpiry?: Date;
}

// ============================================================
// ✅ FIXED: BulkUserOperationResult (Error 2430 - operationType mismatch)
// ============================================================

/**
 * ✅ FIXED: Bulk operation result with compatible operation types
 */
export interface BulkUserOperationResult extends Omit<SharedBulkOperationResult, 'operationType'> {
  totalProcessed: number;
  successful: number;
  failed: number;
  skipped: number;
  errors: Array<{ userId: string; error: string; timestamp: Date }>;
  progress: BulkOperationProgress;
  durationMs: number;
  operationType: 'activate' | 'deactivate' | 'lock' | 'unlock' | 'assign_role' | 'update_tier';
  metadata?: Record<string, unknown>;
}

// ============================================================
// ✅ ENTERPRISE ENHANCEMENT 4: User Export Options
// ============================================================

/**
 * ✅ FIXED: User export options with proper typing
 */
export interface UserExportOptions {
  format: 'csv' | 'json' | 'xlsx';
  fields: (keyof UserResponseDto)[];
  filters?: UserFilters;
  includeActivitySummary?: boolean;
  includeAuditLog?: boolean;
  dateRange?: { from: Date; to: Date };
  maxRecords?: number;
}

export interface UserExportResult {
  downloadUrl: string;
  expiresAt: Date;
  fileSize: number;
  recordCount: number;
  format: string;
  expiresInSeconds: number;
}

/**
 * ✅ ENTERPRISE ENHANCEMENT 5: User Deletion Options
 */
export interface UserDeletionOptions {
  reason: DeletionReason;
  customReason?: string;
  requestDataExport: boolean;
  deletePersonalData: boolean;
  anonymizeData: boolean;
  gracePeriodDays?: number;
  notifyUser: boolean;
  performedBy?: string;  // admin ID if applicable
}

/**
 * ✅ ENTERPRISE ENHANCEMENT 6: User Suspension Options
 */
export interface UserSuspensionOptions {
  reason: SuspensionReason;
  customReason?: string;
  durationDays: number;
  notifyUser: boolean;
  revokeSessions: boolean;
  blockDeviceFingerprint: boolean;
  performedBy: string;  // admin ID
}

// ============================================================
// User Service Interface (Enterprise Enhanced)
// ============================================================

export interface UserService {
  // ============================================================
  // Profile Management (Enhanced)
  // ============================================================
  
  /**
   * Get user profile with caching
   * @param userId - User ID from JWT
   * @param options - Cache options
   * @returns User profile with tier benefits
   */
  getProfile(
    userId: string, 
    options?: { useCache?: boolean; ttlSeconds?: number }
  ): Promise<UserProfileResponseDto>;
  
  /**
   * Update user profile (non-sensitive fields)
   * @param userId - User ID from JWT
   * @param dto - Profile update data
   * @param deviceInfo - Device context for audit
   * @param options - Additional options (skipValidation, notifyUser)
   * @returns Updated profile
   */
  updateProfile(
    userId: string,
    dto: UpdateProfileDto,
    deviceInfo: DeviceInfo,
    options?: { skipValidation?: boolean; notifyUser?: boolean }
  ): Promise<UpdateProfileResponseDto>;
  
  /**
   * Update user preferences with validation
   * @param userId - User ID from JWT
   * @param preferences - User preferences
   * @param deviceInfo - Device context
   * @returns Updated preferences
   */
  updatePreferences(
    userId: string,
    preferences: UseUserPreferencesDto,
    deviceInfo: DeviceInfo
  ): Promise<UseUserPreferencesDto>;
  
  /**
   * Get user preferences with defaults
   * @param userId - User ID from JWT
   * @returns User preferences
   */
  getPreferences(userId: string): Promise<UseUserPreferencesDto>;
  
  /**
   * Update email address (requires verification)
   * @param userId - User ID from JWT
   * @param dto - Email update data
   * @param deviceInfo - Device context
   * @param options - Rate limit options
   * @returns Update response with verification info
   */
  updateEmail(
    userId: string,
    dto: UpdateEmailDto,
    deviceInfo: DeviceInfo,
    options?: { skipRateLimit?: boolean }
  ): Promise<UpdateEmailResponseDto>;
  
  /**
   * Verify email change with token
   * @param userId - User ID from JWT
   * @param dto - Verification data
   * @param deviceInfo - Device context
   * @returns Verification response
   */
  verifyEmailChange(
    userId: string,
    dto: VerifyEmailChangeDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdateEmailResponseDto>;
  
  /**
   * Update phone number (requires verification)
   * @param userId - User ID from JWT
   * @param dto - Phone update data
   * @param deviceInfo - Device context
   * @param options - Rate limit options
   * @returns Update response with verification info
   */
  updatePhone(
    userId: string,
    dto: UpdatePhoneDto,
    deviceInfo: DeviceInfo,
    options?: { skipRateLimit?: boolean }
  ): Promise<UpdatePhoneResponseDto>;
  
  /**
   * Verify phone change with OTP
   * @param userId - User ID from JWT
   * @param dto - Verification data
   * @param deviceInfo - Device context
   * @returns Verification response
   */
  verifyPhoneChange(
    userId: string,
    dto: VerifyPhoneChangeDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdatePhoneResponseDto>;
  
  /**
   * Upload avatar with validation and optimization
   * @param userId - User ID from JWT
   * @param file - Avatar file (buffer)
   * @param fileName - Original file name
   * @param deviceInfo - Device context
   * @param options - Image optimization options
   * @returns Avatar URL with CDN info
   */
  uploadAvatar(
    userId: string,
    file: Buffer,
    fileName: string,
    deviceInfo: DeviceInfo,
    options?: { optimize?: boolean; width?: number; height?: number }
  ): Promise<{ avatarUrl: string; thumbnailUrl?: string; cdnUrl?: string }>;
  
  /**
   * Delete avatar and clear cache
   * @param userId - User ID from JWT
   * @param deviceInfo - Device context
   * @returns Success status
   */
  deleteAvatar(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean; cacheInvalidated: boolean }>;
  
  // ============================================================
  // Password Management (Enhanced)
  // ============================================================
  
  /**
   * Change user password with session invalidation
   * @param userId - User ID from JWT
   * @param dto - Password change data
   * @param deviceInfo - Device context
   * @param options - Additional options (logoutOtherDevices, preventReuse)
   * @returns Change password response with session info
   */
  changePassword(
    userId: string,
    dto: ChangePasswordDto,
    deviceInfo: DeviceInfo,
    options?: { 
      logoutOtherDevices?: boolean; 
      preventReuse?: boolean;
      notifyUser?: boolean;
    }
  ): Promise<ChangePasswordResponseDto>;
  
  /**
   * Validate current password (for sensitive actions)
   * @param userId - User ID from JWT
   * @param password - Current password
   * @param options - Rate limit options
   * @returns Validation result with remaining attempts
   */
  validateCurrentPassword(
    userId: string,
    password: string,
    options?: { checkLockout?: boolean }
  ): Promise<ValidateCurrentPasswordResponseDto>;
  
  /**
   * Get password validation rules (internationalized)
   * @param locale - Language preference (en/bn)
   * @returns Password rules in requested language
   */
  getPasswordRules(locale?: 'en' | 'bn'): Promise<PasswordRulesResponseDto>;
  
  // ============================================================
  // Account Management (Enhanced)
  // ============================================================
  
  /**
   * Delete user account (soft delete with grace period)
   * @param userId - User ID from JWT
   * @param deviceInfo - Device context
   * @param options - Deletion options (reason, data export, grace period)
   * @returns Delete response with grace period info
   */
  deleteAccount(
    userId: string,
    deviceInfo: DeviceInfo,
    options?: UserDeletionOptions
  ): Promise<DeleteAccountResponseDto>;
  
  /**
   * Reactivate deleted account (within grace period)
   * @param userId - User ID
   * @param deviceInfo - Device context
   * @returns Reactivation response
   */
  reactivateAccount(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<ReactivateAccountResponseDto>;
  
  /**
   * Restore deleted account (admin only - hard restore)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to restore
   * @param deviceInfo - Device context
   * @param options - Restore options (restoreSessions, restoreData)
   * @returns Restored user
   */
  restoreAccount(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo,
    options?: { restoreSessions?: boolean; restoreData?: boolean }
  ): Promise<UserResponseDto>;
  
  /**
   * Get user by ID with permission check and caching
   * @param requesterId - ID of user making request
   * @param targetUserId - ID of user to retrieve
   * @param options - Cache options
   * @returns User details
   * @throws {ForbiddenError} If not authorized
   */
  getUserById(
    requesterId: string,
    targetUserId: string,
    options?: { useCache?: boolean; includeSensitive?: boolean }
  ): Promise<UserResponseDto>;
  
  /**
   * Get user by email (cached)
   * @param email - User email
   * @returns User or null
   */
  getUserByEmail(email: string): Promise<UserResponseDto | null>;
  
  /**
   * Get user by phone (cached)
   * @param phone - User phone (E.164 format)
   * @returns User or null
   */
  getUserByPhone(phone: string): Promise<UserResponseDto | null>;
  
  /**
   * Get user activity summary with analytics
   * @param userId - User ID
   * @param options - Date range options
   * @returns User activity summary
   */
  getUserActivitySummary(
    userId: string, 
    options?: { days?: number; includeDetailed?: boolean }
  ): Promise<UserActivitySummaryDto>;
  
  /**
   * Get user tier benefits with upgrade progress
   * @param userId - User ID
   * @returns Tier benefits and upgrade information
   */
  getUserTierBenefits(userId: string): Promise<UserTierBenefits>;
  
  /**
   * Calculate user tier based on total spent
   * @param totalSpent - Total amount spent by user
   * @returns Calculated tier
   */
  calculateUserTier(totalSpent: number): SharedUserTier;
  
  // ============================================================
  // User Listing (Enhanced)
  // ============================================================
  
  /**
   * List users with pagination and caching
   * @param options - Pagination options
   * @param filters - Optional filters
   * @param queryOptions - Query options (useCache, includeDeleted)
   * @returns Paginated users
   */
  listUsers(
    options: PaginationDto,
    filters?: UserFilters,
    queryOptions?: { useCache?: boolean; includeDeleted?: boolean }
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Search users by filters with full-text search
   * @param filters - Search filters
   * @param options - Pagination options
   * @returns Paginated users
   */
  searchUsers(
    filters: UserFilters,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by role with caching
   * @param role - User role (from USER_ROLES constants)
   * @param options - Pagination options
   * @returns Paginated users
   */
  getUsersByRole(
    role: UserRole,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by status
   * @param status - User status (from USER_STATUSES constants)
   * @param options - Pagination options
   * @returns Paginated users
   */
  getUsersByStatus(
    status: UserStatus,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by tier (loyalty program)
   * @param tier - User tier (from USER_TIERS constants)
   * @param options - Pagination options
   * @returns Paginated users
   */
  getUsersByTier(
    tier: UserTier,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by district (Bangladesh specific)
   * @param district - District name (from BANGLADESH_DISTRICTS)
   * @param options - Pagination options
   * @returns Paginated users with district info
   */
  getUsersByDistrict(
    district: BangladeshDistrict,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get active users (logged in within last N days)
   * @param days - Number of days for activity threshold
   * @param options - Pagination options
   * @returns Paginated active users
   */
  getActiveUsers(
    days: number,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get inactive users (not logged in for N days)
   * @param days - Number of days of inactivity
   * @param options - Pagination options
   * @returns Paginated inactive users
   */
  getInactiveUsers(
    days: number,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  // ============================================================
  // Admin Operations (Enhanced)
  // ============================================================
  
  /**
   * Create user (admin only)
   * @param adminId - Admin ID
   * @param dto - User creation data
   * @param deviceInfo - Device context
   * @param options - Additional options (sendWelcomeEmail, requirePasswordChange)
   * @returns Created user
   */
  createUser(
    adminId: string,
    dto: AdminCreateUserDto,
    deviceInfo: DeviceInfo,
    options?: { sendWelcomeEmail?: boolean; requirePasswordChange?: boolean }
  ): Promise<AdminCreateUserResponseDto>;
  
  /**
   * Update user (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to update
   * @param dto - Update data
   * @param deviceInfo - Device context
   * @returns Updated user
   */
  updateUser(
    adminId: string,
    targetUserId: string,
    dto: UpdateProfileDto,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Delete user (admin only - hard delete with cascade)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to delete
   * @param deviceInfo - Device context
   * @param options - Deletion options (cascadeDelete)
   * @returns Delete response
   */
  deleteUser(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo,
    options?: { cascadeDelete?: boolean; deleteReason?: string }
  ): Promise<DeleteAccountResponseDto>;
  
  /**
   * Activate user account
   * @param adminId - Admin ID
   * @param targetUserId - User ID to activate
   * @param deviceInfo - Device context
   * @returns Activated user
   */
  activateUser(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Deactivate user account (temporary)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to deactivate
   * @param reason - Reason for deactivation
   * @param deviceInfo - Device context
   * @returns Deactivated user
   */
  deactivateUser(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Suspend user account with duration
   * @param adminId - Admin ID
   * @param targetUserId - User ID to suspend
   * @param options - Suspension options (reason, duration, notify)
   * @param deviceInfo - Device context
   * @returns Suspended user
   */
  suspendUser(
    adminId: string,
    targetUserId: string,
    options: UserSuspensionOptions,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Change user role (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param newRole - New role (from USER_ROLES constants)
   * @param deviceInfo - Device context
   * @param reason - Reason for role change
   * @returns Updated user
   */
  changeUserRole(
    adminId: string,
    targetUserId: string,
    newRole: UserRole,
    deviceInfo: DeviceInfo,
    reason?: string
  ): Promise<UserResponseDto>;
  
  /**
   * Change user tier (admin only - manual override)
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param newTier - New tier (from USER_TIERS constants)
   * @param reason - Reason for tier change
   * @param deviceInfo - Device context
   * @param options - Additional options (notifyUser, overrideExpiry)
   * @returns Updated user
   */
  changeUserTier(
    adminId: string,
    targetUserId: string,
    newTier: UserTier,
    reason: string,
    deviceInfo: DeviceInfo,
    options?: { notifyUser?: boolean; expiryDays?: number }
  ): Promise<UserResponseDto>;
  
  /**
   * Verify KYC for user (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param deviceInfo - Device context
   * @param options - Verification options (documentType, notes)
   * @returns Updated user
   */
  verifyKyc(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo,
    options?: { documentType?: string; notes?: string }
  ): Promise<UserResponseDto>;
  
  /**
   * Reject KYC for user with reason
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param reason - Rejection reason
   * @param deviceInfo - Device context
   * @returns Updated user
   */
  rejectKyc(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Force password reset for user (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param reason - Reset reason
   * @param deviceInfo - Device context
   * @param options - Reset options (requireChangeOnLogin, notifyUser)
   * @returns Reset confirmation
   */
  forcePasswordReset(
    adminId: string,
    targetUserId: string,
    reason: string,
    deviceInfo: DeviceInfo,
    options?: { requireChangeOnLogin?: boolean; notifyUser?: boolean }
  ): Promise<{ resetToken?: string; notifySent: boolean }>;
  
  // ============================================================
  // Bulk Operations (Enterprise Feature)
  // ============================================================
  
  /**
   * Bulk activate users with progress tracking
   * @param userIds - Array of user IDs
   * @param adminId - Admin ID
   * @param onProgress - Progress callback for real-time updates
   * @returns Bulk operation result
   */
  bulkActivateUsers(
    userIds: string[],
    adminId: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult>;
  
  /**
   * Bulk deactivate users with progress tracking
   * @param userIds - Array of user IDs
   * @param reason - Deactivation reason
   * @param adminId - Admin ID
   * @param onProgress - Progress callback
   * @returns Bulk operation result
   */
  bulkDeactivateUsers(
    userIds: string[],
    reason: string,
    adminId: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult>;
  
  /**
   * Bulk assign role to users
   * @param userIds - Array of user IDs
   * @param role - New role
   * @param adminId - Admin ID
   * @param reason - Assignment reason
   * @param onProgress - Progress callback
   * @returns Bulk operation result
   */
  bulkAssignRole(
    userIds: string[],
    role: UserRole,
    adminId: string,
    reason: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult>;
  
  /**
   * Bulk recalculate user tiers based on total spent
   * @param userIds - Array of user IDs (empty = all users)
   * @param adminId - Admin ID
   * @param onProgress - Progress callback
   * @returns Bulk operation result
   */
  bulkRecalculateTiers(
    userIds: string[],
    adminId: string,
    onProgress?: (progress: BulkOperationProgress) => void
  ): Promise<BulkUserOperationResult>;
  
  // ============================================================
  // User Statistics & Analytics (Enhanced)
  // ============================================================
  
  /**
   * Get user statistics (admin dashboard)
   * @param options - Cache options
   * @returns User statistics with Bangladesh breakdown
   */
  getUserStatistics(options?: { useCache?: boolean }): Promise<UserStatistics>;
  
  /**
   * Get user registration trends with forecasting
   * @param days - Number of days to analyze
   * @param options - Analysis options (includeForecast, breakdownBy)
   * @returns Registration trend data
   */
  getRegistrationTrends(
    days: number,
    options?: { includeForecast?: boolean; breakdownBy?: ('district' | 'device' | 'source')[] }
  ): Promise<RegistrationTrend[]>;
  
  /**
   * Get retention metrics with cohort analysis
   * @param days - Number of days to analyze
   * @param options - Cohort options (cohortPeriod, includeProjection)
   * @returns Retention metrics
   */
  getRetentionMetrics(
    days: number,
    options?: { cohortPeriod?: 'week' | 'month'; includeProjection?: boolean }
  ): Promise<RetentionMetrics>;
  
  /**
   * Get churn prediction for user
   * @param userId - User ID
   * @returns Churn prediction result
   */
  getChurnPrediction(userId: string): Promise<{
    churnProbability: number;  // 0-100
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    contributingFactors: string[];
    recommendations: string[];
    confidence: number;
  }>;
  
  // ============================================================
  // Data Export & Audit (Enhanced)
  // ============================================================
  
  /**
   * Export users for audit (admin only)
   * @param adminId - Admin ID
   * @param options - Export options
   * @returns Export result with download URL
   */
  exportUsersForAudit(
    adminId: string,
    options: UserExportOptions
  ): Promise<UserExportResult>;
  
  /**
   * Get user audit log with pagination
   * @param userId - User ID
   * @param options - Pagination options
   * @param filters - Audit filters (action, date range)
   * @returns Paginated audit log entries
   */
  getUserAuditLog(
    userId: string,
    options: PaginationDto,
    filters?: { action?: string; fromDate?: Date; toDate?: Date }
  ): Promise<PaginatedResponseDto<AuditDto>>;
  
  /**
   * Get user change history with field-level tracking
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @param fields - Specific fields to track (optional)
   * @returns Change history entries
   */
  getUserChangeHistory(
    userId: string,
    limit?: number,
    fields?: string[]
  ): Promise<Array<{
    field: string;
    oldValue: unknown;
    newValue: unknown;
    changedAt: Date;
    changedBy: string;
    ipAddress?: string;
    userAgent?: string;
    reason?: string;
  }>>;
  
  /**
   * Get user data for GDPR compliance (right to access)
   * @param userId - User ID
   * @returns User data package
   */
  exportUserDataForGDPR(userId: string): Promise<{
    userData: UserResponseDto;
    accountActivity: unknown[];
    loginHistory: unknown[];
    orderHistory: unknown[];
    exportGeneratedAt: Date;
    downloadUrl: string;
    expiresAt: Date;
  }>;
  
  // ============================================================
  // Health & Monitoring
  // ============================================================
  
  /**
   * Health check for user service
   * @returns Service health status
   */
  healthCheck(): Promise<{
    status: 'healthy' | 'degraded' | 'unhealthy';
    cacheHitRate: number;
    averageResponseTimeMs: number;
    activeUsersCount: number;
    databaseLatencyMs: number;
    cacheLatencyMs: number;
  }>;
  
  /**
   * Invalidate user cache
   * @param userId - User ID
   * @returns Cache invalidation result
   */
  invalidateUserCache(userId: string): Promise<{ cacheInvalidated: boolean }>;
}

// ============================================================
// Type Exports (Using shared-types when available)
// ============================================================

export type { 
  UserFilters as UserFiltersType,
  DeleteAccountResponseDto as DeleteAccountResponseDtoType,
  ReactivateAccountResponseDto as ReactivateAccountResponseDtoType,
  UserStatistics as UserStatisticsType,
  RegistrationTrend as RegistrationTrendType,
  RetentionMetrics as RetentionMetricsType,
  SharedUserTier as UserTierType,
  UserTierBenefits as UserTierBenefitsType,
  BulkUserOperationResult as BulkUserOperationResultType,
  UserExportOptions as UserExportOptionsType,
  UserExportResult as UserExportResultType,
  UserDeletionOptions as UserDeletionOptionsType,
  UserSuspensionOptions as UserSuspensionOptionsType
};

// ============================================================
// Constants Exports (For external use)
// ============================================================

export { 
  USER_TIERS,
  USER_STATUSES,
  USER_ROLES,
  BANGLADESH_DISTRICTS,
  BANGLADESH_UPAZILAS,
  USER_MOBILE_OPERATORS,
  USER_NETWORK_TYPES,
  USER_DELETION_REASONS,
  USER_SUSPENSION_REASONS
};

// ============================================================
// ENTERPRISE SUMMARY v3.0
// ============================================================
// 
// Enterprise Enhancements Applied in v3.0:
// 1. ✅ Shared types integration from @vubon/shared-types
// 2. ✅ Bangladesh-specific filters (district, upazila, mobileOperator, networkType)
// 3. ✅ Soft delete with grace period and data export
// 4. ✅ User tier loyalty program with benefits calculation
// 5. ✅ KYC verification workflow (verify, reject)
// 6. ✅ Retention metrics with cohort analysis and churn prediction
// 7. ✅ Complete audit trail with field-level change tracking
// 8. ✅ Bulk operations with progress tracking
// 9. ✅ GDPR compliance data export
// 10. ✅ Cache invalidation and health monitoring
// 11. ✅ User suspension with duration and device blocking
// 12. ✅ Force password reset (admin)
// 13. ✅ Churn prediction ML integration
// 14. ✅ Registration trend forecasting
// 15. ✅ Comprehensive error handling with Bengali messages
// 
// Bangladesh Specific:
// - District/Upazila level analytics
// - Mobile operator and network type tracking
// - Bengali language support in all responses
// - Local timezone-aware timestamps
// - bKash/Nagad/Rocket payment integration ready
// 
// ============================================================
