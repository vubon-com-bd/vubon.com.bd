/**
 * User Core Types
 * Core user-related types
 */

import type {
  ID,
  Email,
  PhoneNumber,
  Timestamp,
  JsonObject,
} from '../common/core-primitives.types';
import {
  USER_DEFAULTS,
  USER_VALIDATION,
  USER_LIMITS,
  USER_METADATA,
  USER_PLATFORM,
  USER_PLATFORM_LABELS,
} from '@vubon/shared-constants';

// ============================================================
// USER CORE TYPES
// ============================================================

/**
 * User platform type
 */
export type UserPlatform = (typeof USER_PLATFORM)[keyof typeof USER_PLATFORM];

/**
 * User status type
 */
export type UserStatus = 'active' | 'inactive' | 'pending' | 'suspended' | 'deleted';

/**
 * User type
 */
export type UserType =
  | 'individual'
  | 'business'
  | 'organization'
  | 'government'
  | 'non_profit'
  | 'educational'
  | 'freelancer'
  | 'agency';

/**
 * User role type
 */
export type UserRole =
  | 'super_admin'
  | 'admin'
  | 'manager'
  | 'user'
  | 'guest'
  | 'moderator'
  | 'support'
  | 'auditor'
  | 'developer'
  | 'content_creator'
  | 'editor'
  | 'reviewer'
  | 'analyst';

// ============================================================
// USER RECORD
// ============================================================

/**
 * Core user record
 */
export interface UserRecord {
  /** Unique identifier */
  id: ID;
  /** Email address */
  email: Email;
  /** Phone number */
  phone?: PhoneNumber;
  /** Username */
  username?: string;
  /** Full name */
  name: string;
  /** User status */
  status: UserStatus;
  /** User type */
  type: UserType;
  /** User role */
  role: UserRole;
  /** Whether email is verified */
  emailVerified: boolean;
  /** Whether phone is verified */
  phoneVerified: boolean;
  /** Whether account is active */
  isActive: boolean;
  /** When the user was created */
  createdAt: Timestamp;
  /** When the user was updated */
  updatedAt: Timestamp;
  /** When the user was last logged in */
  lastLoginAt?: Timestamp;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER VALIDATION TYPES
// ============================================================

/**
 * User validation rules
 */
export interface UserValidationRules {
  /** Name validation */
  name: {
    minLength: number;
    maxLength: number;
    pattern: RegExp;
  };
  /** Username validation */
  username: {
    minLength: number;
    maxLength: number;
    pattern: RegExp;
  };
  /** Password validation */
  password: {
    minLength: number;
    maxLength: number;
    requireUppercase: boolean;
    requireLowercase: boolean;
    requireNumber: boolean;
    requireSpecial: boolean;
  };
  /** Email validation */
  email: {
    maxLength: number;
  };
  /** Phone validation */
  phone: {
    minLength: number;
    maxLength: number;
  };
  /** Address validation */
  address: {
    streetMaxLength: number;
    cityMaxLength: number;
    stateMaxLength: number;
    postalCodeMaxLength: number;
    countryMaxLength: number;
  };
}

// ============================================================
// USER LIMITS TYPES
// ============================================================

/**
 * User limits
 */
export interface UserLimits {
  /** Maximum addresses per user */
  maxAddresses: number;
  /** Maximum contacts per user */
  maxContacts: number;
  /** Maximum sessions per user */
  maxSessions: number;
  /** Maximum devices per user */
  maxDevices: number;
  /** Maximum login attempts */
  maxLoginAttempts: number;
  /** Maximum KYC documents */
  maxKycDocuments: number;
}

// ============================================================
// USER METADATA TYPES
// ============================================================

/**
 * User metadata headers
 */
export interface UserMetadataHeaders {
  /** User agent header */
  userAgentHeader: string;
  /** IP address header */
  ipHeader: string;
  /** Device ID header */
  deviceIdHeader: string;
  /** Session ID header */
  sessionIdHeader: string;
  /** Platform header */
  platformHeader: string;
  /** Version header */
  versionHeader: string;
}

// ============================================================
// USER DEFAULT TYPES
// ============================================================

/**
 * User defaults
 */
export interface UserDefaults {
  /** Default user status */
  status: UserStatus;
  /** Default user type */
  type: UserType;
  /** Default user role */
  role: UserRole;
  /** Default sort order */
  sortOrder: 'asc' | 'desc';
  /** Default items per page */
  itemsPerPage: number;
  /** Default timezone */
  timezone: string;
  /** Default language */
  language: string;
  /** Default currency */
  currency: string;
  /** Default country */
  country: string;
}

// ============================================================
// USER REQUEST TYPES
// ============================================================

/**
 * User create request
 */
export interface UserCreateRequest {
  /** Email address */
  email: Email;
  /** Phone number */
  phone?: PhoneNumber;
  /** Username */
  username?: string;
  /** Full name */
  name: string;
  /** Password */
  password: string;
  /** User type (default: individual) */
  type?: UserType;
  /** User role (default: user) */
  role?: UserRole;
  /** Additional metadata */
  metadata?: JsonObject;
}

/**
 * User update request
 */
export interface UserUpdateRequest {
  /** User ID */
  userId: ID;
  /** Email address */
  email?: Email;
  /** Phone number */
  phone?: PhoneNumber;
  /** Username */
  username?: string;
  /** Full name */
  name?: string;
  /** User status */
  status?: UserStatus;
  /** User type */
  type?: UserType;
  /** User role */
  role?: UserRole;
  /** Additional metadata */
  metadata?: JsonObject;
}

// ============================================================
// USER RESPONSE TYPES
// ============================================================

/**
 * User response
 */
export interface UserResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** User record if successful */
  user?: UserRecord;
  /** Error message if failed */
  error?: string;
}

// ============================================================
// USER FILTER
// ============================================================

/**
 * User filter
 */
export interface UserFilter {
  /** Filter by user ID */
  userId?: ID;
  /** Filter by email */
  email?: Email;
  /** Filter by phone */
  phone?: PhoneNumber;
  /** Filter by username */
  username?: string;
  /** Filter by status */
  status?: UserStatus | UserStatus[];
  /** Filter by type */
  type?: UserType | UserType[];
  /** Filter by role */
  role?: UserRole | UserRole[];
  /** Filter by email verification status */
  emailVerified?: boolean;
  /** Filter by phone verification status */
  phoneVerified?: boolean;
  /** Filter by active status */
  isActive?: boolean;
  /** Filter by date range (created) */
  createdDateRange?: {
    start?: Date;
    end?: Date;
  };
  /** Search by name, email, username */
  search?: string;
}

// ============================================================
// USER SUMMARY
// ============================================================

/**
 * User summary
 */
export interface UserSummary {
  /** Total users */
  totalUsers: number;
  /** Active users */
  activeUsers: number;
  /** Inactive users */
  inactiveUsers: number;
  /** Pending users */
  pendingUsers: number;
  /** Suspended users */
  suspendedUsers: number;
  /** Deleted users */
  deletedUsers: number;
  /** Users by type */
  usersByType: Record<UserType, number>;
  /** Users by role */
  usersByRole: Record<UserRole, number>;
  /** Users by status */
  usersByStatus: Record<UserStatus, number>;
  /** Verified users */
  verifiedUsers: number;
  /** Unverified users */
  unverifiedUsers: number;
}

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
