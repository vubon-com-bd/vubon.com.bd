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

import type { Role, ExtendedRole } from './role.types';
import type { PermissionString } from './permission.types';
import type { DeviceInfo } from './device.types';

// ============================================================
// Imports from shared-constants (Type-only)
// ============================================================
import type { 
  USER_STATUS as ConstUserStatus, 
  USER_TIER as ConstUserTier 
} from '@vubon/auth-constants';

// ============================================================
// User Status Types (Based on constants - type-only import)
// ============================================================
export type UserStatus = typeof ConstUserStatus[keyof typeof ConstUserStatus];

// ============================================================
// User Verification Status Types (NO constants import)
// ============================================================
export type UserVerificationStatus = 
  | 'unverified'                // No verification completed
  | 'email_verified'            // Email verified only
  | 'phone_verified'            // Phone verified only (Bangladesh specific)
  | 'fully_verified'            // Both email and phone verified
  | 'kyc_verified'              // KYC completed (for vendors)
  | 'document_verified';        // Additional document verification

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
  readonly role: ExtendedRole;           // From role.types.ts
  readonly userTier: UserTier;
  readonly status: UserStatus;
  readonly verificationStatus: UserVerificationStatus;
  readonly emailVerifiedAt: Date | null;
  readonly phoneVerifiedAt: Date | null;
  readonly kycVerifiedAt: Date | null;
  readonly lastLoginAt: Date | null;
  readonly lastLoginIp: string | null;
  readonly lastLoginDevice: DeviceInfo | null;  // From device.types.ts
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
  readonly metadata: UserMetadata;
  
  // Bangladesh specific
  readonly nidNumber?: string;              // National ID (for KYC)
  readonly tinNumber?: string;              // Tax ID (for sellers)
  readonly tradeLicenseNumber?: string;     // For vendors
  readonly preferredDistrict?: string;
  readonly preferredUpazila?: string;
  readonly preferredLanguage: 'en' | 'bn';  // Bengali support
}

// ============================================================
// User Metadata (Flexible key-value storage)
// ============================================================
export type UserMetadata = {
  readonly [key: string]: string | number | boolean | null | readonly unknown[] | Record<string, unknown>;
  
  // Common metadata fields (NO constants)
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
  readonly role: ExtendedRole;              // From role.types.ts
  readonly userTier: UserTier;
  readonly status: UserStatus;
  readonly verificationStatus: UserVerificationStatus;
  readonly createdAt: string;               // ISO date string
  readonly updatedAt: string;               // ISO date string
  readonly lastLoginAt: string | null;      // ISO date string
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
  readonly role: ExtendedRole;              // From role.types.ts
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
  readonly role?: ExtendedRole;             // From role.types.ts
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
  readonly role?: ExtendedRole;             // From role.types.ts
  readonly userTier?: UserTier;
  readonly verificationStatus?: UserVerificationStatus;
  readonly search?: string;                  // Search in email, name, phone
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
  readonly timezone: string;                // e.g., 'Asia/Dhaka'
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
  readonly role: ExtendedRole;              // From role.types.ts
  readonly userTier: UserTier;
  readonly permissions: readonly PermissionString[];  // From permission.types.ts
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
  readonly usersByRole: Record<ExtendedRole, number>;     // From role.types.ts
  readonly usersByTier: Record<UserTier, number>;
  readonly usersByVerificationStatus: Record<UserVerificationStatus, number>;
  
  readonly verifiedEmailCount: number;
  readonly verifiedPhoneCount: number;
  readonly kycVerifiedCount: number;
  
  readonly averageLoginFrequency: number;      // Logins per week
  readonly returningUsersRate: number;         // Percentage
  
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
