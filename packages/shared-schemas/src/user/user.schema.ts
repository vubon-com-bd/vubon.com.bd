/**
 * User Core Schema
 * Zod schemas for core user management
 */

import { z } from 'zod';
import {
  USER_DEFAULTS,
  USER_VALIDATION,
  USER_LIMITS,
  USER_METADATA,
  USER_PLATFORM,
  USER_PLATFORM_LABELS,
} from '@vubon/shared-constants';
import {
  idSchema,
  emailSchema,
  timestampSchema,
  jsonObjectSchema,
} from '../common/core-primitives.schema';

// ============================================================
// USER CORE SCHEMAS
// ============================================================

/**
 * User platform schema
 */
export const userPlatformSchema = z.enum([
  USER_PLATFORM.WEB,
  USER_PLATFORM.MOBILE,
  USER_PLATFORM.ADMIN,
  USER_PLATFORM.VENDOR,
  USER_PLATFORM.API,
  USER_PLATFORM.DESKTOP,
]);

/**
 * User status schema
 */
export const userStatusSchema = z.enum(['active', 'inactive', 'pending', 'suspended', 'deleted']);

/**
 * User type schema
 */
export const userTypeSchema = z.enum([
  'individual',
  'business',
  'organization',
  'government',
  'non_profit',
  'educational',
  'freelancer',
  'agency',
]);

/**
 * User role schema
 */
export const userRoleSchema = z.enum([
  'super_admin',
  'admin',
  'manager',
  'user',
  'guest',
  'moderator',
  'support',
  'auditor',
  'developer',
  'content_creator',
  'editor',
  'reviewer',
  'analyst',
]);

// ============================================================
// USER RECORD SCHEMA
// ============================================================

/**
 * Core user record schema
 */
export const userRecordSchema = z.object({
  id: idSchema,
  email: emailSchema,
  phone: z.string().optional(),
  username: z.string().optional(),
  name: z.string().min(1),
  status: userStatusSchema,
  type: userTypeSchema,
  role: userRoleSchema,
  emailVerified: z.boolean().default(false),
  phoneVerified: z.boolean().default(false),
  isActive: z.boolean().default(true),
  createdAt: timestampSchema,
  updatedAt: timestampSchema,
  lastLoginAt: timestampSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER VALIDATION RULES SCHEMA
// ============================================================

/**
 * User validation rules schema
 */
export const userValidationRulesSchema = z.object({
  name: z.object({
    minLength: z.number().int().min(1),
    maxLength: z.number().int().min(1),
    pattern: z.instanceof(RegExp),
  }),
  username: z.object({
    minLength: z.number().int().min(1),
    maxLength: z.number().int().min(1),
    pattern: z.instanceof(RegExp),
  }),
  password: z.object({
    minLength: z.number().int().min(1),
    maxLength: z.number().int().min(1),
    requireUppercase: z.boolean(),
    requireLowercase: z.boolean(),
    requireNumber: z.boolean(),
    requireSpecial: z.boolean(),
  }),
  email: z.object({
    maxLength: z.number().int().min(1),
  }),
  phone: z.object({
    minLength: z.number().int().min(1),
    maxLength: z.number().int().min(1),
  }),
  address: z.object({
    streetMaxLength: z.number().int().min(1),
    cityMaxLength: z.number().int().min(1),
    stateMaxLength: z.number().int().min(1),
    postalCodeMaxLength: z.number().int().min(1),
    countryMaxLength: z.number().int().min(1),
  }),
});

// ============================================================
// USER LIMITS SCHEMA
// ============================================================

/**
 * User limits schema
 */
export const userLimitsSchema = z.object({
  maxAddresses: z.number().int().min(0),
  maxContacts: z.number().int().min(0),
  maxSessions: z.number().int().min(0),
  maxDevices: z.number().int().min(0),
  maxLoginAttempts: z.number().int().min(0),
  maxKycDocuments: z.number().int().min(0),
});

// ============================================================
// USER METADATA HEADERS SCHEMA
// ============================================================

/**
 * User metadata headers schema
 */
export const userMetadataHeadersSchema = z.object({
  userAgentHeader: z.string().min(1),
  ipHeader: z.string().min(1),
  deviceIdHeader: z.string().min(1),
  sessionIdHeader: z.string().min(1),
  platformHeader: z.string().min(1),
  versionHeader: z.string().min(1),
});

// ============================================================
// USER DEFAULTS SCHEMA
// ============================================================

/**
 * User defaults schema
 */
export const userDefaultsSchema = z.object({
  status: userStatusSchema,
  type: userTypeSchema,
  role: userRoleSchema,
  sortOrder: z.enum(['asc', 'desc']),
  itemsPerPage: z.number().int().min(1),
  timezone: z.string().min(1),
  language: z.string().min(1),
  currency: z.string().min(1),
  country: z.string().min(1),
});

// ============================================================
// USER REQUEST SCHEMAS
// ============================================================

/**
 * User create request schema
 */
export const userCreateRequestSchema = z.object({
  email: emailSchema,
  phone: z.string().optional(),
  username: z.string().optional(),
  name: z.string().min(1),
  password: z.string().min(8),
  type: userTypeSchema.optional(),
  role: userRoleSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

/**
 * User update request schema
 */
export const userUpdateRequestSchema = z.object({
  userId: idSchema,
  email: emailSchema.optional(),
  phone: z.string().optional(),
  username: z.string().optional(),
  name: z.string().optional(),
  status: userStatusSchema.optional(),
  type: userTypeSchema.optional(),
  role: userRoleSchema.optional(),
  metadata: jsonObjectSchema.optional(),
});

// ============================================================
// USER RESPONSE SCHEMA
// ============================================================

/**
 * User response schema
 */
export const userResponseSchema = z.object({
  success: z.boolean(),
  user: userRecordSchema.optional(),
  error: z.string().optional(),
});

// ============================================================
// USER FILTER SCHEMA
// ============================================================

/**
 * User filter schema
 */
export const userFilterSchema = z.object({
  userId: idSchema.optional(),
  email: emailSchema.optional(),
  phone: z.string().optional(),
  username: z.string().optional(),
  status: z.union([userStatusSchema, z.array(userStatusSchema)]).optional(),
  type: z.union([userTypeSchema, z.array(userTypeSchema)]).optional(),
  role: z.union([userRoleSchema, z.array(userRoleSchema)]).optional(),
  emailVerified: z.boolean().optional(),
  phoneVerified: z.boolean().optional(),
  isActive: z.boolean().optional(),
  createdDateRange: z
    .object({
      start: z.date().optional(),
      end: z.date().optional(),
    })
    .optional(),
  search: z.string().optional(),
});

// ============================================================
// USER SUMMARY SCHEMA
// ============================================================

/**
 * User summary schema
 */
export const userSummarySchema = z.object({
  totalUsers: z.number().int().min(0),
  activeUsers: z.number().int().min(0),
  inactiveUsers: z.number().int().min(0),
  pendingUsers: z.number().int().min(0),
  suspendedUsers: z.number().int().min(0),
  deletedUsers: z.number().int().min(0),
  usersByType: z.record(userTypeSchema, z.number().int().min(0)),
  usersByRole: z.record(userRoleSchema, z.number().int().min(0)),
  usersByStatus: z.record(userStatusSchema, z.number().int().min(0)),
  verifiedUsers: z.number().int().min(0),
  unverifiedUsers: z.number().int().min(0),
});

// ============================================================
// TYPE INFERENCES
// ============================================================

export type UserPlatform = z.infer<typeof userPlatformSchema>;
export type UserStatus = z.infer<typeof userStatusSchema>;
export type UserType = z.infer<typeof userTypeSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type UserRecord = z.infer<typeof userRecordSchema>;
export type UserValidationRules = z.infer<typeof userValidationRulesSchema>;
export type UserLimits = z.infer<typeof userLimitsSchema>;
export type UserMetadataHeaders = z.infer<typeof userMetadataHeadersSchema>;
export type UserDefaults = z.infer<typeof userDefaultsSchema>;
export type UserCreateRequest = z.infer<typeof userCreateRequestSchema>;
export type UserUpdateRequest = z.infer<typeof userUpdateRequestSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserFilter = z.infer<typeof userFilterSchema>;
export type UserSummary = z.infer<typeof userSummarySchema>;

// ============================================================
// HELPER FUNCTIONS
// ============================================================

/**
 * Check if user platform is valid
 */
export function isValidUserPlatform(platform: string): platform is UserPlatform {
  return Object.values(USER_PLATFORM).includes(platform as UserPlatform);
}

/**
 * Get user platform display name
 */
export function getUserPlatformDisplayName(platform: UserPlatform): string {
  return USER_PLATFORM_LABELS[platform] || platform;
}

/**
 * Get all user platforms
 */
export function getAllUserPlatforms(): UserPlatform[] {
  return Object.values(USER_PLATFORM);
}

/**
 * Check if user platform is mobile
 */
export function isUserPlatformMobile(platform: UserPlatform): boolean {
  return platform === USER_PLATFORM.MOBILE;
}

/**
 * Check if user platform is web
 */
export function isUserPlatformWeb(platform: UserPlatform): boolean {
  return platform === USER_PLATFORM.WEB;
}

/**
 * Check if user platform is admin
 */
export function isUserPlatformAdmin(platform: UserPlatform): boolean {
  return platform === USER_PLATFORM.ADMIN;
}

/**
 * Check if user platform is vendor
 */
export function isUserPlatformVendor(platform: UserPlatform): boolean {
  return platform === USER_PLATFORM.VENDOR;
}

/**
 * Get user validation rules
 */
export function getUserValidationRules(): UserValidationRules {
  return {
    name: {
      minLength: USER_VALIDATION.NAME.MIN_LENGTH,
      maxLength: USER_VALIDATION.NAME.MAX_LENGTH,
      pattern: USER_VALIDATION.NAME.PATTERN,
    },
    username: {
      minLength: USER_VALIDATION.USERNAME.MIN_LENGTH,
      maxLength: USER_VALIDATION.USERNAME.MAX_LENGTH,
      pattern: USER_VALIDATION.USERNAME.PATTERN,
    },
    password: {
      minLength: USER_VALIDATION.PASSWORD.MIN_LENGTH,
      maxLength: USER_VALIDATION.PASSWORD.MAX_LENGTH,
      requireUppercase: USER_VALIDATION.PASSWORD.REQUIRE_UPPERCASE,
      requireLowercase: USER_VALIDATION.PASSWORD.REQUIRE_LOWERCASE,
      requireNumber: USER_VALIDATION.PASSWORD.REQUIRE_NUMBER,
      requireSpecial: USER_VALIDATION.PASSWORD.REQUIRE_SPECIAL,
    },
    email: {
      maxLength: USER_VALIDATION.EMAIL.MAX_LENGTH,
    },
    phone: {
      minLength: USER_VALIDATION.PHONE.MIN_LENGTH,
      maxLength: USER_VALIDATION.PHONE.MAX_LENGTH,
    },
    address: {
      streetMaxLength: USER_VALIDATION.ADDRESS.STREET_MAX_LENGTH,
      cityMaxLength: USER_VALIDATION.ADDRESS.CITY_MAX_LENGTH,
      stateMaxLength: USER_VALIDATION.ADDRESS.STATE_MAX_LENGTH,
      postalCodeMaxLength: USER_VALIDATION.ADDRESS.POSTAL_CODE_MAX_LENGTH,
      countryMaxLength: USER_VALIDATION.ADDRESS.COUNTRY_MAX_LENGTH,
    },
  };
}

/**
 * Get user limits
 */
export function getUserLimits(): UserLimits {
  return {
    maxAddresses: USER_LIMITS.MAX_ADDRESSES,
    maxContacts: USER_LIMITS.MAX_CONTACTS,
    maxSessions: USER_LIMITS.MAX_SESSIONS,
    maxDevices: USER_LIMITS.MAX_DEVICES,
    maxLoginAttempts: USER_LIMITS.MAX_LOGIN_ATTEMPTS,
    maxKycDocuments: USER_LIMITS.MAX_KYC_DOCUMENTS,
  };
}

/**
 * Get user metadata headers
 */
export function getUserMetadataHeaders(): UserMetadataHeaders {
  return {
    userAgentHeader: USER_METADATA.USER_AGENT_HEADER,
    ipHeader: USER_METADATA.IP_HEADER,
    deviceIdHeader: USER_METADATA.DEVICE_ID_HEADER,
    sessionIdHeader: USER_METADATA.SESSION_ID_HEADER,
    platformHeader: USER_METADATA.PLATFORM_HEADER,
    versionHeader: USER_METADATA.VERSION_HEADER,
  };
}

/**
 * Get user defaults
 */
export function getUserDefaults(): UserDefaults {
  return {
    status: USER_DEFAULTS.STATUS as UserStatus,
    type: USER_DEFAULTS.TYPE as UserType,
    role: USER_DEFAULTS.ROLE as UserRole,
    sortOrder: USER_DEFAULTS.SORT_ORDER as 'asc' | 'desc',
    itemsPerPage: USER_DEFAULTS.ITEMS_PER_PAGE,
    timezone: USER_DEFAULTS.TIMEZONE,
    language: USER_DEFAULTS.LANGUAGE,
    currency: USER_DEFAULTS.CURRENCY,
    country: USER_DEFAULTS.COUNTRY,
  };
}

/**
 * Validate email
 */
export function isValidUserEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email) && email.length <= USER_VALIDATION.EMAIL.MAX_LENGTH;
}

/**
 * Validate username
 */
export function isValidUserUsername(username: string): boolean {
  const { MIN_LENGTH, MAX_LENGTH, PATTERN } = USER_VALIDATION.USERNAME;
  return username.length >= MIN_LENGTH && username.length <= MAX_LENGTH && PATTERN.test(username);
}

/**
 * Validate name
 */
export function isValidUserName(name: string): boolean {
  const { MIN_LENGTH, MAX_LENGTH, PATTERN } = USER_VALIDATION.NAME;
  return name.length >= MIN_LENGTH && name.length <= MAX_LENGTH && PATTERN.test(name);
}

/**
 * Validate phone number
 */
export function isValidUserPhone(phone: string): boolean {
  const { MIN_LENGTH, MAX_LENGTH } = USER_VALIDATION.PHONE;
  return phone.length >= MIN_LENGTH && phone.length <= MAX_LENGTH;
}

/**
 * Check if user status is active
 */
export function isUserStatusActive(status: UserStatus): boolean {
  return status === 'active';
}

/**
 * Check if user status is inactive
 */
export function isUserStatusInactive(status: UserStatus): boolean {
  return status === 'inactive' || status === 'suspended';
}

/**
 * Check if user status is pending
 */
export function isUserStatusPending(status: UserStatus): boolean {
  return status === 'pending';
}

/**
 * Check if user status is deleted
 */
export function isUserStatusDeleted(status: UserStatus): boolean {
  return status === 'deleted';
}

/**
 * Check if user is active
 */
export function isUserActive(user: UserRecord): boolean {
  return user.isActive && user.status === 'active';
}

/**
 * Check if user is verified
 */
export function isUserVerified(user: UserRecord): boolean {
  return user.emailVerified && user.phoneVerified;
}

/**
 * Check if user can login
 */
export function canUserLogin(user: UserRecord): boolean {
  return user.isActive && user.status === 'active' && user.emailVerified;
}

/**
 * Get user status color
 */
export function getUserStatusColor(status: UserStatus): string {
  const colors: Record<UserStatus, string> = {
    active: '#4CAF50',
    inactive: '#9E9E9E',
    pending: '#FFC107',
    suspended: '#FF9800',
    deleted: '#F44336',
  };
  return colors[status] || '#9E9E9E';
}

/**
 * Get user status label
 */
export function getUserStatusLabel(status: UserStatus): string {
  const labels: Record<UserStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    suspended: 'Suspended',
    deleted: 'Deleted',
  };
  return labels[status] || status;
}
