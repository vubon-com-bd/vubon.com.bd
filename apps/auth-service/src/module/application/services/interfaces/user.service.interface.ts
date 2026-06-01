/**
 * User Service Interface - Pure Domain Contract
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module application/services/interfaces/user.service.interface
 * 
 * @description
 * Service contract for user management operations.
 * NO implementation - ONLY method signatures.
 * 
 * Enterprise Rules:
 * ✅ ONLY interface definitions
 * ✅ No business logic
 * ✅ No infrastructure imports
 * ✅ No framework decorators
 * ✅ Complete DTO-based contract
 * ✅ Bangladesh specific - District/Upazila support, user tiers
 */

import { 
  UpdateProfileDto, 
  UpdateProfileResponseDto,
  UpdateEmailDto,
  UpdateEmailResponseDto,
  UpdatePhoneDto,
  UpdatePhoneResponseDto,
  VerifyEmailChangeDto,
  VerifyPhoneChangeDto,
  UserPreferencesDto
} from '../../dtos/user/update-profile.dto';
import { 
  ChangePasswordDto, 
  ChangePasswordResponseDto,
  ValidateCurrentPasswordResponseDto,
  PasswordRulesResponseDto
} from '../../dtos/user/change-password.dto';
import { 
  CreateUserDto, 
  CreateUserResponseDto,
  AdminCreateUserDto,
  AdminCreateUserResponseDto,
  UserTier,
  UserPreferencesDto as UserPreferencesDtoType
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

// ============================================================
// Types
// ============================================================

/**
 * Device information interface (Bangladesh specific)
 */
export interface DeviceInfo {
  ipAddress: string;
  userAgent: string;
  deviceId?: string;
  correlationId?: string;
  // Bangladesh specific
  district?: string;
  upazila?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk' | 'unknown';
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown';
}

/**
 * User filters for search (Bangladesh specific)
 */
export interface UserFilters {
  email?: string;
  phone?: string;
  fullName?: string;
  status?: string;
  role?: string;
  tier?: UserTier;
  isEmailVerified?: boolean;
  isPhoneVerified?: boolean;
  isKycVerified?: boolean;
  fromDate?: Date;
  toDate?: Date;
  search?: string;
  district?: string;
  upazila?: string;
  minTotalSpent?: number;
  maxTotalSpent?: number;
}

/**
 * Delete account response
 */
export interface DeleteAccountResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  userId: string;
  deletedAt: string;
  dataRetentionDays: number;
  canReactivate: boolean;
  reactivationDeadline?: string;
}

/**
 * Account reactivation response
 */
export interface ReactivateAccountResponseDto {
  success: boolean;
  message: string;
  messageBn?: string;
  userId: string;
  reactivatedAt: string;
  requiresPasswordReset: boolean;
}

/**
 * User statistics (Bangladesh specific)
 */
export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  suspendedUsers: number;
  lockedUsers: number;
  deletedUsers: number;
  pendingVerificationUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  newUsersThisMonth: number;
  verifiedEmailPercentage: number;
  verifiedPhonePercentage: number;
  kycVerifiedPercentage: number;
  mfaEnabledPercentage: number;
  byRole: Record<string, number>;
  byStatus: Record<string, number>;
  byTier: Record<UserTier, number>;
  usersByDistrict?: Array<{ district: string; count: number }>;
  usersByPreferredLanguage?: Record<string, number>;
}

/**
 * User registration trend
 */
export interface RegistrationTrend {
  date: string;
  count: number;
  byRole: Record<string, number>;
  byTier: Record<UserTier, number>;
}

// ============================================================
// User Service Interface
// ============================================================

export interface UserService {
  // ============================================================
  // Profile Management
  // ============================================================
  
  /**
   * Get user profile
   * @param userId - User ID from JWT
   * @returns User profile
   */
  getProfile(userId: string): Promise<UserProfileResponseDto>;
  
  /**
   * Update user profile (non-sensitive fields)
   * @param userId - User ID from JWT
   * @param dto - Profile update data
   * @param deviceInfo - Device context
   * @returns Updated profile
   */
  updateProfile(
    userId: string,
    dto: UpdateProfileDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdateProfileResponseDto>;
  
  /**
   * Update user preferences
   * @param userId - User ID from JWT
   * @param preferences - User preferences
   * @param deviceInfo - Device context
   * @returns Updated preferences
   */
  updatePreferences(
    userId: string,
    preferences: UserPreferencesDtoType,
    deviceInfo: DeviceInfo
  ): Promise<UserPreferencesDtoType>;
  
  /**
   * Get user preferences
   * @param userId - User ID from JWT
   * @returns User preferences
   */
  getPreferences(userId: string): Promise<UserPreferencesDtoType>;
  
  /**
   * Update email address (requires verification)
   * @param userId - User ID from JWT
   * @param dto - Email update data
   * @param deviceInfo - Device context
   * @returns Update response
   */
  updateEmail(
    userId: string,
    dto: UpdateEmailDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdateEmailResponseDto>;
  
  /**
   * Verify email change
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
   * @returns Update response
   */
  updatePhone(
    userId: string,
    dto: UpdatePhoneDto,
    deviceInfo: DeviceInfo
  ): Promise<UpdatePhoneResponseDto>;
  
  /**
   * Verify phone change
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
   * Upload avatar
   * @param userId - User ID from JWT
   * @param file - Avatar file (buffer)
   * @param fileName - Original file name
   * @param deviceInfo - Device context
   * @returns Avatar URL
   */
  uploadAvatar(
    userId: string,
    file: Buffer,
    fileName: string,
    deviceInfo: DeviceInfo
  ): Promise<{ avatarUrl: string }>;
  
  /**
   * Delete avatar
   * @param userId - User ID from JWT
   * @param deviceInfo - Device context
   * @returns Success status
   */
  deleteAvatar(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<{ success: boolean }>;
  
  // ============================================================
  // Password Management
  // ============================================================
  
  /**
   * Change user password
   * @param userId - User ID from JWT
   * @param dto - Password change data
   * @param deviceInfo - Device context
   * @returns Change password response
   */
  changePassword(
    userId: string,
    dto: ChangePasswordDto,
    deviceInfo: DeviceInfo
  ): Promise<ChangePasswordResponseDto>;
  
  /**
   * Validate current password (for sensitive actions)
   * @param userId - User ID from JWT
   * @param password - Current password
   * @returns Validation result
   */
  validateCurrentPassword(
    userId: string,
    password: string
  ): Promise<ValidateCurrentPasswordResponseDto>;
  
  /**
   * Get password validation rules
   * @returns Password rules
   */
  getPasswordRules(): Promise<PasswordRulesResponseDto>;
  
  // ============================================================
  // Account Management
  // ============================================================
  
  /**
   * Delete user account (soft delete)
   * @param userId - User ID from JWT
   * @param deviceInfo - Device context
   * @returns Delete response
   */
  deleteAccount(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<DeleteAccountResponseDto>;
  
  /**
   * Reactivate deleted account
   * @param userId - User ID
   * @param deviceInfo - Device context
   * @returns Reactivation response
   */
  reactivateAccount(
    userId: string,
    deviceInfo: DeviceInfo
  ): Promise<ReactivateAccountResponseDto>;
  
  /**
   * Restore deleted account (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to restore
   * @param deviceInfo - Device context
   * @returns Restored user
   */
  restoreAccount(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Get user by ID (with permission check)
   * @param requesterId - ID of user making request
   * @param targetUserId - ID of user to retrieve
   * @returns User details
   * @throws {ForbiddenError} If not authorized
   */
  getUserById(
    requesterId: string,
    targetUserId: string
  ): Promise<UserResponseDto>;
  
  /**
   * Get user by email
   * @param email - User email
   * @returns User or null
   */
  getUserByEmail(email: string): Promise<UserResponseDto | null>;
  
  /**
   * Get user by phone
   * @param phone - User phone
   * @returns User or null
   */
  getUserByPhone(phone: string): Promise<UserResponseDto | null>;
  
  /**
   * Get user activity summary
   * @param userId - User ID
   * @returns User activity summary
   */
  getUserActivitySummary(userId: string): Promise<UserActivitySummaryDto>;
  
  /**
   * Get user tier benefits
   * @param userId - User ID
   * @returns Tier benefits
   */
  getUserTierBenefits(userId: string): Promise<{
    tier: UserTier;
    discountPercentage: number;
    freeShipping: boolean;
    prioritySupport: boolean;
  }>;
  
  // ============================================================
  // User Listing
  // ============================================================
  
  /**
   * List users with pagination
   * @param options - Pagination options
   * @param filters - Optional filters
   * @returns Paginated users
   */
  listUsers(
    options: PaginationDto,
    filters?: UserFilters
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Search users by filters
   * @param filters - Search filters
   * @param options - Pagination options
   * @returns Paginated users
   */
  searchUsers(
    filters: UserFilters,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by role
   * @param role - User role
   * @param options - Pagination options
   * @returns Paginated users
   */
  getUsersByRole(
    role: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by status
   * @param status - User status
   * @param options - Pagination options
   * @returns Paginated users
   */
  getUsersByStatus(
    status: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by tier (loyalty program)
   * @param tier - User tier
   * @param options - Pagination options
   * @returns Paginated users
   */
  getUsersByTier(
    tier: UserTier,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  /**
   * Get users by district (Bangladesh specific)
   * @param district - District name
   * @param options - Pagination options
   * @returns Paginated users
   */
  getUsersByDistrict(
    district: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<BriefUserResponseDto>>;
  
  // ============================================================
  // Admin Operations
  // ============================================================
  
  /**
   * Create user (admin only)
   * @param adminId - Admin ID
   * @param dto - User creation data
   * @param deviceInfo - Device context
   * @returns Created user
   */
  createUser(
    adminId: string,
    dto: AdminCreateUserDto,
    deviceInfo: DeviceInfo
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
   * Delete user (admin only - hard delete)
   * @param adminId - Admin ID
   * @param targetUserId - User ID to delete
   * @param deviceInfo - Device context
   * @returns Delete response
   */
  deleteUser(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo
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
   * Deactivate user account
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
   * Suspend user account
   * @param adminId - Admin ID
   * @param targetUserId - User ID to suspend
   * @param reason - Suspension reason
   * @param durationDays - Suspension duration in days
   * @param deviceInfo - Device context
   * @returns Suspended user
   */
  suspendUser(
    adminId: string,
    targetUserId: string,
    reason: string,
    durationDays: number,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Change user role (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param newRole - New role
   * @param deviceInfo - Device context
   * @returns Updated user
   */
  changeUserRole(
    adminId: string,
    targetUserId: string,
    newRole: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Change user tier (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param newTier - New tier
   * @param reason - Reason for tier change
   * @param deviceInfo - Device context
   * @returns Updated user
   */
  changeUserTier(
    adminId: string,
    targetUserId: string,
    newTier: UserTier,
    reason: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  /**
   * Verify KYC for user (admin only)
   * @param adminId - Admin ID
   * @param targetUserId - User ID
   * @param deviceInfo - Device context
   * @returns Updated user
   */
  verifyKyc(
    adminId: string,
    targetUserId: string,
    deviceInfo: DeviceInfo
  ): Promise<UserResponseDto>;
  
  // ============================================================
  // User Statistics
  // ============================================================
  
  /**
   * Get user statistics (admin dashboard)
   * @returns User statistics
   */
  getUserStatistics(): Promise<UserStatistics>;
  
  /**
   * Get user registration trends
   * @param days - Number of days to analyze
   * @returns Registration trend data
   */
  getRegistrationTrends(days: number): Promise<RegistrationTrend[]>;
  
  /**
   * Get user retention metrics
   * @param days - Number of days to analyze
   * @returns Retention metrics
   */
  getRetentionMetrics(days: number): Promise<{
    retentionRate: number;
    churnRate: number;
    cohortAnalysis: Array<{
      cohort: string;
      count: number;
      retained: number;
      retentionRate: number;
    }>;
  }>;
  
  // ============================================================
  // Audit & Export
  // ============================================================
  
  /**
   * Export users for audit (admin only)
   * @param adminId - Admin ID
   * @param filters - User filters
   * @returns User data for export
   */
  exportUsersForAudit(
    adminId: string,
    filters?: UserFilters
  ): Promise<UserResponseDto[]>;
  
  /**
   * Get user audit log
   * @param userId - User ID
   * @param options - Pagination options
   * @returns Audit log entries
   */
  getUserAuditLog(
    userId: string,
    options: PaginationDto
  ): Promise<PaginatedResponseDto<AuditDto>>;
  
  /**
   * Get user change history
   * @param userId - User ID
   * @param limit - Maximum number of entries
   * @returns Change history
   */
  getUserChangeHistory(
    userId: string,
    limit?: number
  ): Promise<Array<{
    field: string;
    oldValue: unknown;
    newValue: unknown;
    changedAt: Date;
    changedBy: string;
  }>>;
}

// ============================================================
// Type Exports
// ============================================================

export type { 
  UserFilters as UserFiltersType,
  DeleteAccountResponseDto as DeleteAccountResponseDtoType,
  ReactivateAccountResponseDto as ReactivateAccountResponseDtoType,
  UserStatistics as UserStatisticsType,
  RegistrationTrend as RegistrationTrendType
};
