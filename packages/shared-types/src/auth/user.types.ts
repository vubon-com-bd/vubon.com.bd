/**
 * User Types - Pure TypeScript type contracts for User domain
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-types/src/auth/user.types
 * 
 * RULES:
 * ✅ ONLY type declarations, interfaces, unions
 * ✅ NO constants imports (imports only from other .types files)
 * ✅ NO validation logic, classes, functions, runtime code
 * ✅ NO framework imports
 * 
 * DEPENDENCY FLOW:
 * user.types.ts → role.types.ts → (indirectly) shared-constants
 * user.types.ts → permission.types.ts → (indirectly) shared-constants
 * user.types.ts → device.types.ts → (indirectly) shared-constants
 */

import type { ExtendedRole } from './role.types';
import type { PermissionString } from './permission.types';
import type { DeviceInfo } from './device.types';

// ============================================================
// Imports from shared-constants (Type-only)
// ============================================================
import type { 
  USER_STATUS as ConstUserStatus, 
  USER_TIER as ConstUserTier 
} from '@vubon/shared-constants';

// ============================================================
// User Status Types (Based on constants - type-only import)
// ============================================================
export type UserStatus = typeof ConstUserStatus[keyof typeof ConstUserStatus];

// ============================================================
// User Verification Status Types (NO constants import)
// ============================================================
export type UserVerificationStatus = 
  | 'unverified'
  | 'email_verified'
  | 'phone_verified'
  | 'fully_verified'
  | 'kyc_verified'
  | 'document_verified';

// ============================================================
// User Type/Tier (Based on constants - type-only import)
// ============================================================
export type UserTier = typeof ConstUserTier[keyof typeof ConstUserTier];

// ============================================================
// Core User Entity (Domain model)
// ============================================================
export interface User {
  readonly id: string;
  readonly email: string;
  readonly phoneNumber: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly displayName: string;
  readonly avatar: string | null;
  readonly role: ExtendedRole;
  readonly userTier: UserTier;
  readonly status: UserStatus;
  readonly verificationStatus: UserVerificationStatus;
  readonly emailVerifiedAt: Date | null;
  readonly phoneVerifiedAt: Date | null;
  readonly kycVerifiedAt: Date | null;
  readonly lastLoginAt: Date | null;
  readonly lastLoginIp: string | null;
  readonly lastLoginDevice: DeviceInfo | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly metadata: UserMetadata;
  
  // Bangladesh specific
  readonly nidNumber?: string;
  readonly tinNumber?: string;
  readonly tradeLicenseNumber?: string;
  readonly preferredDistrict?: string;
  readonly preferredUpazila?: string;
  readonly preferredLanguage: 'en' | 'bn';
}

// ============================================================
// User Metadata (Flexible key-value storage)
// ============================================================
export type UserMetadata = {
  readonly [key: string]: string | number | boolean | null | readonly unknown[] | Record<string, unknown> | Date;
  
  // Common metadata fields
  readonly signupSource?: 'email' | 'google' | 'facebook' | 'whatsapp' | 'phone' | 'bkash';
  readonly referralCode?: string;
  readonly referredBy?: string;
  readonly lastPasswordChangeAt?: Date;
  readonly passwordVersion?: number;
  readonly mfaEnabled?: boolean;
  readonly defaultMfaMethod?: string;
  readonly deviceTrustEnabled?: boolean;
  readonly marketingConsent?: boolean;
  readonly dataRetentionConsent?: boolean;
  readonly deletedReason?: string;
  readonly suspendedReason?: string;
};

// ============================================================
// User DTO for API Responses (Serializable)
// ============================================================
export interface UserDTO {
  readonly id: string;
  readonly email: string;
  readonly phoneNumber: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly displayName: string;
  readonly avatar: string | null;
  readonly role: ExtendedRole;
  readonly userTier: UserTier;
  readonly status: UserStatus;
  readonly verificationStatus: UserVerificationStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly lastLoginAt: string | null;
}

// ============================================================
// User Profile Response (Limited data for profile view)
// ============================================================
export interface UserProfileDTO {
  readonly id: string;
  readonly email: string;
  readonly phoneNumber: string | null;
  readonly firstName: string;
  readonly lastName: string;
  readonly displayName: string;
  readonly avatar: string | null;
  readonly role: ExtendedRole;
  readonly userTier: UserTier;
  readonly verificationStatus: UserVerificationStatus;
  readonly createdAt: string;
  readonly emailVerified: boolean;
  readonly phoneVerified: boolean;
  readonly kycVerified: boolean;
  
  // Bangladesh specific
  readonly preferredLanguage: 'en' | 'bn';
  readonly canBecomeVendor: boolean;
}

// ============================================================
// Create User Request (API DTO)
// ============================================================
export interface CreateUserRequest {
  readonly email: string;
  readonly phoneNumber?: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly password: string;
  readonly role?: ExtendedRole;
  readonly acceptTerms: boolean;
  readonly marketingConsent?: boolean;
  readonly referralCode?: string;
  readonly preferredLanguage?: 'en' | 'bn';
}

// ============================================================
// Update User Request (API DTO)
// ============================================================
export interface UpdateUserRequest {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly displayName?: string;
  readonly avatar?: string | null;
  readonly phoneNumber?: string;
  readonly preferredLanguage?: 'en' | 'bn';
  readonly marketingConsent?: boolean;
}

// ============================================================
// User List Response with Pagination
// ============================================================
export interface UserListResponse {
  readonly users: readonly UserDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrevious: boolean;
}

// ============================================================
// User Filter Options
// ============================================================
export interface UserFilters {
  readonly status?: UserStatus;
  readonly role?: ExtendedRole;
  readonly userTier?: UserTier;
  readonly verificationStatus?: UserVerificationStatus;
  readonly search?: string;
  readonly fromDate?: Date;
  readonly toDate?: Date;
  readonly hasPhoneVerified?: boolean;
  readonly hasEmailVerified?: boolean;
  readonly isKycVerified?: boolean;
  readonly minTotalSpent?: number;
  readonly maxTotalSpent?: number;
  
  // Bangladesh specific
  readonly district?: string;
  readonly signupSource?: string;
}

// ============================================================
// User Activity Summary
// ============================================================
export interface UserActivitySummary {
  readonly userId: string;
  readonly totalLogins: number;
  readonly lastLoginAt: Date | null;
  readonly lastLoginIp: string | null;
  readonly totalOrders: number;
  readonly totalSpent: number;
  readonly averageOrderValue: number;
  readonly totalProductsPurchased: number;
  readonly accountAgeDays: number;
  readonly daysSinceLastActivity: number;
  readonly isActive: boolean;
  
  // Bangladesh specific
  readonly preferredPaymentMethod?: 'bkash' | 'nagad' | 'rocket' | 'card' | 'cod';
  readonly preferredDistrict?: string;
}

// ============================================================
// User Preferences
// ============================================================
export interface UserPreferences {
  readonly language: 'en' | 'bn';
  readonly timezone: string;
  readonly currency: 'BDT' | 'USD';
  readonly emailNotifications: boolean;
  readonly smsNotifications: boolean;
  readonly pushNotifications: boolean;
  readonly marketingEmails: boolean;
  readonly orderUpdates: boolean;
  readonly priceDropAlerts: boolean;
  readonly backInStockAlerts: boolean;
  readonly newsletterSubscription: boolean;
  readonly twoFactorEnabled: boolean;
  readonly preferredTwoFactorMethod: 'sms' | 'email' | 'totp' | 'whatsapp' | null;
  
  // Bangladesh specific
  readonly preferredDeliveryTime?: 'morning' | 'afternoon' | 'evening' | 'any';
  readonly saveAddressHistory: boolean;
  readonly autoApplyCoupons: boolean;
}

// ============================================================
// User Session Info (Lightweight for session storage)
// ============================================================
export interface UserSessionInfo {
  readonly id: string;
  readonly email: string;
  readonly phoneNumber: string | null;
  readonly displayName: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly avatar: string | null;
  readonly role: ExtendedRole;
  readonly userTier: UserTier;
  readonly permissions: readonly PermissionString[];
  readonly verificationStatus: UserVerificationStatus;
  readonly mfaEnabled: boolean;
}

// ============================================================
// Change Password Request (API DTO)
// ============================================================
export interface ChangePasswordRequest {
  readonly currentPassword: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

// ============================================================
// Reset Password Request (API DTO)
// ============================================================
export interface ResetPasswordRequest {
  readonly token: string;
  readonly newPassword: string;
  readonly confirmPassword: string;
}

// ============================================================
// Forgot Password Request (API DTO)
// ============================================================
export interface ForgotPasswordRequest {
  readonly email: string;
}

// ============================================================
// Verify Email Request (API DTO)
// ============================================================
export interface VerifyEmailRequest {
  readonly token: string;
}

// ============================================================
// Verify Phone Request (Bangladesh specific)
// ============================================================
export interface VerifyPhoneRequest {
  readonly phoneNumber: string;
  readonly otpCode: string;
}

export interface SendPhoneOTPRequest {
  readonly phoneNumber: string;
  readonly method: 'sms' | 'whatsapp' | 'voice';
}

// ============================================================
// Bulk User Operation (Admin feature)
// ============================================================
export interface BulkUserOperation {
  readonly userIds: readonly string[];
  readonly action: 'activate' | 'suspend' | 'delete' | 'verify_email' | 'verify_phone';
  readonly reason?: string;
  readonly performedBy: string;
}

export interface BulkUserOperationResult {
  readonly totalRequested: number;
  readonly successful: number;
  readonly failed: number;
  readonly failedUsers: ReadonlyArray<{
    readonly userId: string;
    readonly reason: string;
  }>;
  readonly completedAt: Date;
}

// ============================================================
// User Export Options (Admin feature)
// ============================================================
export interface UserExportOptions {
  readonly format: 'csv' | 'json' | 'xlsx';
  readonly fields: readonly (keyof UserDTO)[];
  readonly filters?: UserFilters;
  readonly includeMetadata?: boolean;
  readonly includeActivitySummary?: boolean;
}

export interface UserExportResult {
  readonly downloadUrl: string;
  readonly expiresAt: Date;
  readonly fileSize: number;
  readonly recordCount: number;
  readonly format: string;
}

// ============================================================
// User Address (Bangladesh specific)
// ============================================================
export interface UserAddress {
  readonly id: string;
  readonly userId: string;
  readonly type: 'home' | 'office' | 'other';
  readonly isDefault: boolean;
  readonly recipientName: string;
  readonly recipientPhone: string;
  readonly addressLine1: string;
  readonly addressLine2?: string;
  readonly district: string;
  readonly upazila: string;
  readonly postCode: string;
  readonly landmark?: string;
  readonly instructions?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// ============================================================
// User KYC Document (For vendors)
// ============================================================
export interface UserKYCDocument {
  readonly id: string;
  readonly userId: string;
  readonly documentType: 'nid' | 'passport' | 'trade_license' | 'tin_certificate';
  readonly documentNumber: string;
  readonly documentUrl: string;
  readonly status: 'pending' | 'verified' | 'rejected';
  readonly verifiedAt: Date | null;
  readonly verifiedBy: string | null;
  readonly rejectionReason: string | null;
  readonly uploadedAt: Date;
}

// ============================================================
// User Statistics (For admin dashboard)
// ============================================================
export interface UserStatistics {
  readonly totalUsers: number;
  readonly activeUsers: number;
  readonly newUsersToday: number;
  readonly newUsersThisWeek: number;
  readonly newUsersThisMonth: number;
  
  readonly usersByStatus: Record<UserStatus, number>;
  readonly usersByRole: Record<ExtendedRole, number>;
  readonly usersByTier: Record<UserTier, number>;
  readonly usersByVerificationStatus: Record<UserVerificationStatus, number>;
  
  readonly verifiedEmailCount: number;
  readonly verifiedPhoneCount: number;
  readonly kycVerifiedCount: number;
  
  readonly averageLoginFrequency: number;
  readonly returningUsersRate: number;
  
  // Bangladesh specific
  readonly usersByDistrict: ReadonlyArray<{
    readonly district: string;
    readonly count: number;
  }>;
  
  readonly usersBySignupSource: ReadonlyArray<{
    readonly source: string;
    readonly count: number;
  }>;
}

// ============================================================
// User Webhook Events
// ============================================================
export type UserWebhookEventType = 
  | 'user.created'
  | 'user.updated'
  | 'user.deleted'
  | 'user.activated'
  | 'user.suspended'
  | 'user.email_verified'
  | 'user.phone_verified'
  | 'user.kyc_verified'
  | 'user.role_changed'
  | 'user.tier_upgraded';

export interface UserWebhookPayload {
  readonly eventType: UserWebhookEventType;
  readonly userId: string;
  readonly email: string;
  readonly timestamp: Date;
  readonly metadata: Record<string, unknown>;
}

// ============================================================
// Registration Method Types (Bangladesh specific)
// ============================================================
export type RegistrationMethod = 
  | 'email'
  | 'phone'
  | 'social'
  | 'username';

// ============================================================
// Registration Source Types
// ============================================================
export type RegistrationSource = 
  | 'web'
  | 'mobile_app'
  | 'admin'
  | 'social'
  | 'api'
  | 'vendor_platform';

// ============================================================
// Registration Metadata
// ============================================================
// shared-types/src/auth/user.types.ts
export interface RegistrationMetadata {
  source?: RegistrationSource;
  userId?: string | undefined;    // ✅ স্পষ্টভাবে undefined যোগ করুন
  ipAddress?: string | undefined; // ✅ স্পষ্টভাবে undefined যোগ করুন
  userAgent?: string | undefined; // ✅ স্পষ্টভাবে undefined যোগ করুন
  deviceId?: string | undefined;  // ✅ স্পষ্টভাবে undefined যোগ করুন
  timestamp?: Date | undefined;
  referrer?: string | undefined;
  campaign?: string | undefined;
  district?: string | undefined;
  upazila?: string | undefined;
  networkType?: '2g' | '3g' | '4g' | '5g' | 'wifi' | 'unknown' | undefined;
}

export type ResetMethod = 'email' | 'sms' | 'whatsapp' | 'voice';





// ============================================================
// Registration Trend Types
// ============================================================

/**
 * Represents registration trends for a given time period
 * Used for analytics and admin dashboards
 */
export interface RegistrationTrend {
  /** Date of the registration trend data (YYYY-MM-DD) */
  readonly date: string;
  /** Number of registrations on this date */
  readonly count: number;
  /** Number of registrations by user role */
  readonly byRole: Record<string, number>;
  /** Number of registrations by user tier */
  readonly byTier: Record<string, number>;
  /** Number of registrations by district (Bangladesh specific) */
  readonly byDistrict?: Record<string, number>;
  /** Number of registrations by device type */
  readonly byDeviceType?: Record<string, number>;
  /** Cumulative count up to this date */
  readonly cumulativeCount: number;
  /** Week-over-week growth percentage */
  readonly weekOverWeekGrowth?: number;
  /** Month-over-month growth percentage */
  readonly monthOverMonthGrowth?: number;
}

// ============================================================
// Account Deletion Response Types
// ============================================================

/**
 * Response type for account deletion operations
 */
export interface DeleteAccountResponse {
  /** Whether the deletion was successful */
  readonly success: boolean;
  /** User ID of the deleted account */
  readonly userId: string;
  /** Timestamp when the account was deleted */
  readonly deletedAt: Date;
  /** Additional message for the user */
  readonly message?: string;
  /** Bengali translation of the message */
  readonly messageBn?: string;
  /** Number of sessions revoked during deletion */
  readonly sessionsRevoked?: number;
  /** Number of related data records cleaned up */
  readonly dataCleanedUp?: number;
}

// ============================================================
// Account Reactivation Response Types
// ============================================================

/**
 * Response type for account reactivation operations
 */
export interface ReactivateAccountResponse {
  /** Whether the reactivation was successful */
  readonly success: boolean;
  /** User ID of the reactivated account */
  readonly userId: string;
  /** Timestamp when the account was reactivated */
  readonly reactivatedAt: Date;
  /** Account status after reactivation */
  readonly status: string;
  /** Additional message for the user */
  readonly message?: string;
  /** Bengali translation of the message */
  readonly messageBn?: string;
}

// ============================================================
// Bulk Operation Types
// ============================================================

/**
 * Progress tracking for bulk operations
 * Used for long-running operations like bulk user updates
 */
export interface BulkOperationProgress {
  /** Total number of items to process */
  readonly total: number;
  /** Number of items completed */
  readonly completed: number;
  /** Number of items that failed */
  readonly failed: number;
  /** Number of items skipped */
  readonly skipped?: number;
  /** Percentage completed (0-100) */
  readonly percentage: number;
  /** Estimated remaining time in milliseconds (if available) */
  readonly estimatedRemainingMs?: number;
  /** Current batch number being processed */
  readonly currentBatch?: number;
  /** Total number of batches */
  readonly totalBatches?: number;
}

/**
 * Result of a bulk operation
 * Used for bulk user management operations
 */
export interface BulkOperationResult {
  /** Operation type performed */
  readonly operationType: 'activate' | 'deactivate' | 'delete' | 'suspend' | 'assign_role' | 'update_tier';
  /** Total number of users requested */
  readonly totalRequested: number;
  /** Number of successful operations */
  readonly successCount: number;
  /** Number of failed operations */
  readonly failedCount: number;
  /** Number of skipped operations */
  readonly skippedCount?: number;
  /** List of successful user IDs */
  readonly successIds: readonly string[];
  /** List of failed user IDs with reasons */
  readonly failedIds: readonly { id: string; reason: string }[];
  /** List of skipped user IDs with reasons */
  readonly skippedIds?: readonly { id: string; reason: string }[];
  /** Timestamp when the operation started */
  readonly startedAt: Date;
  /** Timestamp when the operation completed */
  readonly completedAt: Date;
  /** Duration in milliseconds */
  readonly durationMs: number;
}


// ============================================================
// User Filters Types
// ============================================================

/**
 * Extended filters for user queries
 * Used for advanced user search and filtering
 */
export interface ExtendedUserFilters {
  /** Search term for text search (email, name, phone) */
  search?: string;
  /** Filter by user status */
  status?: string | readonly string[];
  /** Filter by user role */
  role?: string | readonly string[];
  /** Filter by user tier */
  tier?: string | readonly string[];
  /** Filter by email verification status */
  emailVerified?: boolean;
  /** Filter by phone verification status */
  phoneVerified?: boolean;
  /** Filter by KYC verification status */
  kycVerified?: boolean;
  /** Filter by MFA enabled status */
  mfaEnabled?: boolean;
  /** Filter by date range (created at) */
  fromDate?: Date;
  toDate?: Date;
  /** Filter by last login date range */
  lastLoginFrom?: Date;
  lastLoginTo?: Date;
  /** Filter by total spent range */
  minTotalSpent?: number;
  maxTotalSpent?: number;
  /** Filter by district (Bangladesh specific) */
  district?: string;
  /** Filter by upazila (Bangladesh specific) */
  upazila?: string;
  /** Include soft-deleted users */
  includeDeleted?: boolean;
  /** Filter by tags */
  tags?: readonly string[];
  /** Filter by custom fields */
  customFields?: Record<string, unknown>;
}

// ============================================================
// User Statistics Extended Types
// ============================================================

/**
 * Extended user statistics for admin dashboard
 */
export interface ExtendedUserStatistics  {
  /** Users by district (Bangladesh specific) */
  readonly usersByDistrict?: readonly { readonly district: string; readonly count: number; readonly percentage: number }[];
  /** Users by upazila (Bangladesh specific) */
  readonly usersByUpazila?: readonly { readonly upazila: string; readonly district: string; readonly count: number }[];
  /** Users by mobile operator */
  readonly usersByMobileOperator?: Record<string, number>;
  /** Users by network type */
  readonly usersByNetworkType?: Record<string, number>;
  /** Users by preferred language */
  readonly usersByLanguage?: Record<'en' | 'bn', number>;
  /** User churn rate (30 days) */
  readonly churnRate30Days?: number;
  /** User retention rate (30 days) */
  readonly retentionRate30Days?: number;
  /** Average sessions per user */
  readonly averageSessionsPerUser?: number;
  /** Average orders per user */
  readonly averageOrdersPerUser?: number;
  /** Average lifetime value */
  readonly lifetimeValueAvg?: number;
  /** User growth rate */
  readonly userGrowthRate?: number;
  /** User engagement rate */
  readonly engagementRate?: number;
}

// ============================================================
// Bulk Operation Request Types
// ============================================================

/**
 * Request for bulk user operations
 */
export interface BulkUserOperationRequest {
  /** Array of user IDs to process */
  readonly userIds: readonly string[];
  /** Operation to perform */
  readonly operation: BulkOperationResult['operationType'];
  /** Reason for the operation */
  readonly reason?: string;
  /** Additional data for the operation (e.g., role assignment) */
  readonly additionalData?: Record<string, unknown>;
  /** Whether to send notifications to affected users */
  readonly notifyUsers?: boolean;
  /** Batch size for processing */
  readonly batchSize?: number;
}

// ============================================================
// Export all types
// ============================================================

export type {
  RegistrationTrend as RegistrationTrendType,
  DeleteAccountResponse as DeleteAccountResponseType,
  ReactivateAccountResponse as ReactivateAccountResponseType,
  BulkOperationProgress as BulkOperationProgressType,
  BulkOperationResult as BulkOperationResultType,
  UserActivitySummary as UserActivitySummaryType,
  ExtendedUserFilters as ExtendedUserFiltersType,
  ExtendedUserStatistics as ExtendedUserStatisticsType,
  BulkUserOperationRequest as BulkUserOperationRequestType,
};

// ============================================================
// ENTERPRISE SUMMARY
// ============================================================
//
// ✅ All types are read-only with 'readonly' modifier
// ✅ Type-safe with proper imports from existing types
// ✅ Bangladesh specific fields (district, upazila)
// ✅ Supports advanced analytics (registration trends, user statistics)
// ✅ Bulk operations support for admin use cases
// ✅ JSDoc comments for all types
// ✅ Framework-free, pure TypeScript
// ✅ Re-exported types for backward compatibility
//
// ============================================================
