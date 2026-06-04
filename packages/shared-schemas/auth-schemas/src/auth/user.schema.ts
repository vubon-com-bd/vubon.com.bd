/**
 * User Schemas - Pure validation for user-related operations
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-schemas/auth/user.schema
 * 
 * RULES:
 * ✅ ONLY Zod schemas - NO business logic
 * ✅ NO database queries, business logic, side effects
 * ✅ NO side effects, NO async
 * ✅ Reusable primitives from constants
 * ✅ Strict mode enabled
 * ✅ Type exports with z.infer
 */

import { z } from 'zod';

// Import constants from shared-constants layer (Enterprise rule)
import {
  REGEX_EMAIL,
  REGEX_PHONE,
  PASSWORD_POLICY,
  ROLES,
  USER_STATUS,
  USER_TIER,
} from '@vubon/shared-constants';

// ==================== Primitives (Reusable) ====================

// User ID Schema
export const UserIdSchema = z.string().uuid('Invalid user ID format').brand('UserId');

// User Email Schema (Based on REGEX_EMAIL constants)
export const UserEmailSchema = z
  .string()
  .min(1, 'Email is required')
  .min(5, 'Email too short')
  .max(255, 'Email too long')
  .email('Invalid email format')
  .regex(REGEX_EMAIL.STRICT, 'Email contains invalid characters')
  .trim()
  .toLowerCase()
  .brand('UserEmail');

// User Phone Schema (Bangladesh specific - Based on REGEX_PHONE)
export const UserPhoneSchema = z
  .string()
  .regex(REGEX_PHONE.BANGLADESH, 'Invalid Bangladesh phone number format. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .optional()
  .nullable()
  .brand('UserPhone');

// User Phone Required Schema
export const UserPhoneRequiredSchema = z
  .string()
  .regex(REGEX_PHONE.BANGLADESH, 'Invalid Bangladesh phone number format. Use format: 01XXXXXXXXX or +8801XXXXXXXXX')
  .transform((val) => {
    if (val.startsWith('0')) {
      return `+88${val}`;
    }
    if (val.startsWith('+880')) {
      return val;
    }
    return `+880${val}`;
  })
  .brand('UserPhoneRequired');

// User First Name Schema (Supports English & Bengali)
export const UserFirstNameSchema = z
  .string()
  .min(1, 'First name is required')
  .min(2, 'First name must be at least 2 characters')
  .max(50, 'First name cannot exceed 50 characters')
  .regex(/^[a-zA-Z\u0980-\u09FF\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes')
  .trim()
  .brand('UserFirstName');

// User Last Name Schema (Supports English & Bengali)
export const UserLastNameSchema = z
  .string()
  .min(1, 'Last name is required')
  .min(2, 'Last name must be at least 2 characters')
  .max(50, 'Last name cannot exceed 50 characters')
  .regex(/^[a-zA-Z\u0980-\u09FF\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes')
  .trim()
  .brand('UserLastName');

// User Display Name Schema
export const UserDisplayNameSchema = z
  .string()
  .min(3, 'Display name must be at least 3 characters')
  .max(100, 'Display name cannot exceed 100 characters')
  .regex(/^[a-zA-Z0-9\u0980-\u09FF\s_.-]+$/, 'Display name contains invalid characters')
  .trim()
  .brand('UserDisplayName');

// User Avatar Schema
export const UserAvatarSchema = z
  .string()
  .url('Invalid avatar URL')
  .regex(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i, 'Avatar must be a valid image URL')
  .optional()
  .nullable()
  .brand('UserAvatar');

// User Password Schema (Based on PASSWORD_POLICY constants)
export const UserPasswordSchema = z
  .string()
  .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
  .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`)
  .brand('UserPassword');

// User Strong Password Schema (With all validations)
export const UserStrongPasswordSchema = z
  .string()
  .min(PASSWORD_POLICY.MIN_LENGTH, `Password must be at least ${PASSWORD_POLICY.MIN_LENGTH} characters`)
  .max(PASSWORD_POLICY.MAX_LENGTH, `Password cannot exceed ${PASSWORD_POLICY.MAX_LENGTH} characters`)
  .superRefine((val, ctx) => {
    if (PASSWORD_POLICY.REQUIRE_UPPERCASE && !/[A-Z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one uppercase letter',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_LOWERCASE && !/[a-z]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one lowercase letter',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_NUMBERS && !/[0-9]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one number',
        path: ['password'],
      });
    }
    if (PASSWORD_POLICY.REQUIRE_SYMBOLS && !/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(val)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one special character',
        path: ['password'],
      });
    }
  })
  .brand('UserStrongPassword');

// User Status Schema (Based on constants)
export const UserStatusSchema = z.enum([
  USER_STATUS.ACTIVE,
  USER_STATUS.INACTIVE,
  USER_STATUS.SUSPENDED,
  USER_STATUS.BANNED,
  USER_STATUS.PENDING_VERIFICATION,
  'deactivated',
  'locked',
]);

// User Verification Status Schema
export const UserVerificationStatusSchema = z.enum([
  'unverified',
  'email_verified',
  'phone_verified',
  'fully_verified',
  'kyc_verified',
  'document_verified',
]);

// User Role Schema (Based on constants)
export const UserRoleSchema = z.enum([
  ROLES.SUPER_ADMIN,
  ROLES.ADMIN,
  ROLES.VENDOR,
  ROLES.CUSTOMER,
  ROLES.GUEST,
  'system_monitor',
  'auditor',
  'content_manager',
  'marketing_manager',
  'analyst',
  'support_agent',
  'support_supervisor',
  'vendor_manager',
  'shop_manager',
  'shop_staff',
  'delivery_manager',
  'delivery_agent',
  'premium_customer',
  'district_manager',
  'upzila_agent',
  'mfs_agent',
]);

// User Tier Schema (Bangladesh specific - loyalty program)
export const UserTierSchema = z.enum([
  USER_TIER.BRONZE,
  USER_TIER.SILVER,
  USER_TIER.GOLD,
  USER_TIER.PLATINUM,
  USER_TIER.DIAMOND,
]);

// User Metadata Schema (Flexible key-value storage)
export const UserMetadataSchema = z
  .record(
    z.string(),
    z.union([
      z.string(),
      z.number(),
      z.boolean(),
      z.null(),
      z.array(z.unknown()),
      z.record(z.unknown()),
    ]).optional()
  )
  .brand('UserMetadata');

// ==================== Domain Schemas ====================

// Core User Schema (Domain model)
export const UserSchema = z
  .object({
    id: UserIdSchema,
    email: UserEmailSchema,
    phoneNumber: UserPhoneSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    displayName: UserDisplayNameSchema,
    avatar: UserAvatarSchema,
    role: UserRoleSchema,
    userTier: UserTierSchema.default('bronze'),
    status: UserStatusSchema,
    verificationStatus: UserVerificationStatusSchema,
    emailVerifiedAt: z.date().nullable(),
    phoneVerifiedAt: z.date().nullable(),
    kycVerifiedAt: z.date().nullable(),
    lastLoginAt: z.date().nullable(),
    lastLoginIp: z.string().ip().nullable(),
    lastLoginDevice: z.record(z.unknown()).nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    deletedAt: z.date().nullable(),
    metadata: UserMetadataSchema.optional(),
    // Bangladesh specific
    nidNumber: z.string().optional().nullable(),
    tinNumber: z.string().optional().nullable(),
    tradeLicenseNumber: z.string().optional().nullable(),
    preferredDistrict: z.string().optional(),
    preferredUpazila: z.string().optional(),
    preferredLanguage: z.enum(['en', 'bn']).default('en'),
  })
  .strict()
  .brand('User');

// ==================== Request Schemas ====================

// Create User Request
export const CreateUserSchema = z
  .object({
    email: UserEmailSchema,
    phoneNumber: UserPhoneSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    password: UserStrongPasswordSchema,
    confirmPassword: UserStrongPasswordSchema,
    role: UserRoleSchema.optional().default(ROLES.CUSTOMER),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions',
    }),
    marketingConsent: z.boolean().default(false),
    referrerCode: z.string().optional().nullable(),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })
  .brand('CreateUserRequest');

// Update User Request
export const UpdateUserSchema = z
  .object({
    firstName: UserFirstNameSchema.optional(),
    lastName: UserLastNameSchema.optional(),
    displayName: UserDisplayNameSchema.optional(),
    avatar: UserAvatarSchema.optional(),
    phoneNumber: UserPhoneSchema.optional(),
    preferredLanguage: z.enum(['en', 'bn']).optional(),
    marketingConsent: z.boolean().optional(),
  })
  .strict()
  .brand('UpdateUserRequest');

// Update User Profile Request (Extended)
export const UpdateUserProfileSchema = z
  .object({
    firstName: UserFirstNameSchema.optional(),
    lastName: UserLastNameSchema.optional(),
    displayName: UserDisplayNameSchema.optional(),
    avatar: UserAvatarSchema.optional(),
    phoneNumber: UserPhoneSchema.optional(),
    preferredLanguage: z.enum(['en', 'bn']).optional(),
    preferredDistrict: z.string().optional(),
    preferredUpazila: z.string().optional(),
    preferences: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()
  .brand('UpdateUserProfileRequest');

// Update User Role Request (Admin only)
export const UpdateUserRoleSchema = z
  .object({
    userId: UserIdSchema,
    role: UserRoleSchema,
    reason: z.string().max(500).optional(),
    expiresAt: z.date().optional(),
  })
  .strict()
  .brand('UpdateUserRoleRequest');

// Update User Status Request (Admin only)
export const UpdateUserStatusSchema = z
  .object({
    userId: UserIdSchema,
    status: UserStatusSchema,
    reason: z.string().min(1, 'Reason is required').max(500),
    duration: z.number().int().positive().optional(),
  })
  .strict()
  .brand('UpdateUserStatusRequest');

// User Filters Schema (For listing users)
export const UserFiltersSchema = z
  .object({
    status: UserStatusSchema.optional(),
    role: UserRoleSchema.optional(),
    userTier: UserTierSchema.optional(),
    verificationStatus: UserVerificationStatusSchema.optional(),
    search: z.string().max(100).optional(),
    fromDate: z.date().optional(),
    toDate: z.date().optional(),
    hasPhoneVerified: z.boolean().optional(),
    hasEmailVerified: z.boolean().optional(),
    isKycVerified: z.boolean().optional(),
    district: z.string().optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().min(1).max(100).default(20),
    sortBy: z.enum(['createdAt', 'updatedAt', 'lastLoginAt', 'firstName', 'lastName']).default('createdAt'),
    sortOrder: z.enum(['asc', 'desc']).default('desc'),
  })
  .strict()
  .brand('UserFilters');

// ==================== Response Schemas ====================

// User Response Schema (Omit sensitive/deleted fields)
export const UserResponseSchema = z.object({
  id: UserIdSchema,
  email: UserEmailSchema,
  phoneNumber: UserPhoneSchema,
  firstName: UserFirstNameSchema,
  lastName: UserLastNameSchema,
  displayName: UserDisplayNameSchema,
  avatar: UserAvatarSchema,
  role: UserRoleSchema,
  userTier: UserTierSchema,
  status: UserStatusSchema,
  verificationStatus: UserVerificationStatusSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  lastLoginAt: z.date().nullable(),
}).brand('UserResponse');

// User Profile Response Schema (Limited fields for profile view)
export const UserProfileResponseSchema = z
  .object({
    id: UserIdSchema,
    email: UserEmailSchema,
    phoneNumber: UserPhoneSchema,
    firstName: UserFirstNameSchema,
    lastName: UserLastNameSchema,
    displayName: UserDisplayNameSchema,
    avatar: UserAvatarSchema,
    role: UserRoleSchema,
    userTier: UserTierSchema,
    verificationStatus: UserVerificationStatusSchema,
    createdAt: z.date(),
    preferredLanguage: z.enum(['en', 'bn']),
    preferredDistrict: z.string().optional(),
    preferredUpazila: z.string().optional(),
  })
  .strict()
  .brand('UserProfileResponse');

// User List Response Schema (Paginated)
export const UserListResponseSchema = z
  .object({
    users: z.array(UserResponseSchema),
    total: z.number().int().min(0),
    page: z.number().int().positive(),
    limit: z.number().int().min(1).max(100),
    totalPages: z.number().int().min(0),
    hasNext: z.boolean(),
    hasPrevious: z.boolean(),
  })
  .strict()
  .brand('UserListResponse');

// User Activity Summary Schema
export const UserActivitySummarySchema = z
  .object({
    userId: UserIdSchema,
    totalLogins: z.number().int().min(0),
    lastLoginAt: z.date().nullable(),
    lastLoginIp: z.string().ip().nullable(),
    totalOrders: z.number().int().min(0),
    totalSpent: z.number().min(0),
    averageOrderValue: z.number().min(0),
    totalProductsPurchased: z.number().int().min(0),
    accountAgeDays: z.number().int().min(0),
    daysSinceLastActivity: z.number().int().min(0),
    isActive: z.boolean(),
    preferredPaymentMethod: z.enum(['bkash', 'nagad', 'rocket', 'card', 'cod']).optional(),
    preferredDistrict: z.string().optional(),
  })
  .strict()
  .brand('UserActivitySummary');

// User Preferences Schema
export const UserPreferencesSchema = z
  .object({
    language: z.enum(['en', 'bn']).default('en'),
    timezone: z.string().default('Asia/Dhaka'),
    currency: z.enum(['BDT', 'USD']).default('BDT'),
    emailNotifications: z.boolean().default(true),
    smsNotifications: z.boolean().default(true),
    pushNotifications: z.boolean().default(true),
    marketingEmails: z.boolean().default(false),
    orderUpdates: z.boolean().default(true),
    priceDropAlerts: z.boolean().default(false),
    backInStockAlerts: z.boolean().default(false),
    newsletterSubscription: z.boolean().default(false),
    twoFactorEnabled: z.boolean().default(false),
    preferredTwoFactorMethod: z.enum(['sms', 'email', 'totp', 'whatsapp']).nullable(),
    preferredDeliveryTime: z.enum(['morning', 'afternoon', 'evening', 'any']).default('any'),
    saveAddressHistory: z.boolean().default(true),
    autoApplyCoupons: z.boolean().default(true),
  })
  .strict()
  .brand('UserPreferences');

// ==================== Error Schemas ====================

export const UserErrorSchema = z
  .object({
    error: z.string(),
    errorCode: z.enum([
      'user_not_found',
      'email_already_exists',
      'phone_already_exists',
      'invalid_password',
      'invalid_role',
      'invalid_status',
      'cannot_delete_system_user',
      'cannot_modify_system_user',
      'insufficient_permissions',
      'account_locked',
      'account_suspended',
      'account_banned',
    ]),
    field: z.string().optional(),
  })
  .strict()
  .brand('UserError');

// ==================== Type Exports (Only unique names) ====================

// Types with `Schema` suffix are values, types with same name without `Schema` are z.infer types
export type UserId = z.infer<typeof UserIdSchema>;
export type UserEmail = z.infer<typeof UserEmailSchema>;
export type UserPhone = z.infer<typeof UserPhoneSchema>;
export type UserPhoneRequired = z.infer<typeof UserPhoneRequiredSchema>;
export type UserFirstName = z.infer<typeof UserFirstNameSchema>;
export type UserLastName = z.infer<typeof UserLastNameSchema>;
export type UserDisplayName = z.infer<typeof UserDisplayNameSchema>;
export type UserAvatar = z.infer<typeof UserAvatarSchema>;
export type UserPassword = z.infer<typeof UserPasswordSchema>;
export type UserStrongPassword = z.infer<typeof UserStrongPasswordSchema>;
export type UserStatus = z.infer<typeof UserStatusSchema>;
export type UserVerificationStatus = z.infer<typeof UserVerificationStatusSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type UserTier = z.infer<typeof UserTierSchema>;
export type UserMetadata = z.infer<typeof UserMetadataSchema>;

export type User = z.infer<typeof UserSchema>;
export type CreateUserRequest = z.infer<typeof CreateUserSchema>;
export type UpdateUserRequest = z.infer<typeof UpdateUserSchema>;
export type UpdateUserProfileRequest = z.infer<typeof UpdateUserProfileSchema>;
export type UpdateUserRoleRequest = z.infer<typeof UpdateUserRoleSchema>;
export type UpdateUserStatusRequest = z.infer<typeof UpdateUserStatusSchema>;
export type UserFilters = z.infer<typeof UserFiltersSchema>;

export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserProfileResponse = z.infer<typeof UserProfileResponseSchema>;
export type UserListResponse = z.infer<typeof UserListResponseSchema>;
export type UserActivitySummary = z.infer<typeof UserActivitySummarySchema>;
export type UserPreferences = z.infer<typeof UserPreferencesSchema>;
export type UserError = z.infer<typeof UserErrorSchema>;
