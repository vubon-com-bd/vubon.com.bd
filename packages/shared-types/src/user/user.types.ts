/**
 * User Types
 * Type definitions for user management based on shared-constants
 * @module UserTypes
 */

import {
  BaseEntity,
  Timestamp,
  Metadata,
  ID,
  Email,
  PhoneNumber,
  FullName,
  Address as BaseAddress,
  DeviceInfo,
} from '../common/core-primitives.types';

// ============================================================
// Import from shared-constants user core
// ============================================================
import {
  // Core User
  USER,
  UserLevel,
  isActiveUser,
  isEligibleForLevelUpgrade,
  getUserLevel,
  getNextLevelThreshold,
  getLevelName,
  getUserStatusMessage,
  // User Status
  USER_STATUS,
  USER_STATUS_LABELS,
  USER_STATUS_COLORS,
  ACTIVE_USER_STATUSES,
  INACTIVE_USER_STATUSES,
  RESTRICTED_USER_STATUSES,
  VERIFICATION_REQUIRED_STATUSES,
  UserStatus,
  isUserActive,
  isUserRestricted,
  canUserLogin,
  getUserStatusLabel,
  getUserStatusColor,
  // User Type
  USER_TYPE,
  USER_TYPE_LABELS,
  USER_TYPE_DESCRIPTIONS,
  BUSINESS_USER_TYPES,
  CONSUMER_USER_TYPES,
  VERIFICATION_REQUIRED_TYPES,
  UserType,
  isBusinessUser,
  isConsumerUser,
  requiresVerification,
  getUserTypeLabel,
  getUserTypeDescription,
  // User Role
  USER_ROLE,
  USER_ROLE_LABELS,
  USER_ROLE_PRIORITY,
  CUSTOMER_ROLES,
  STAFF_ROLES,
  ADMIN_ROLES,
  VENDOR_ROLES,
  MANAGEMENT_ROLES,
  UserRole,
  isCustomer,
  isStaff,
  isAdminRole,
  isVendor,
  isManagement,
  getRolePriority,
  hasHigherPriority,
  getUserRoleLabel,
  // User Permission
  USER_PERMISSION,
  USER_PERMISSION_CATEGORIES,
  UserPermission,
  UserPermissionCategory,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getCategoryPermissions,
  isSystemPermission,
  isAdminPermission,
  getPermissionResource,
  getPermissionAction,
  // User Verification Status
  CoreUserVerificationStatus,
} from '@vubon/shared-constants';

// ============================================================
// Import from shared-constants user sub-modules
// ============================================================
import {
  // Address
  UserAddressType,
  UserAddressStatus,
} from '@vubon/shared-constants';

import {
  // KYC
  UserKYCType,
  UserKYCStatus,
} from '@vubon/shared-constants';

import {
  // Activity
  UserActivityType,
  UserActivityStatus,
  UserActivitySeverity,
  UserActivityCategory,
} from '@vubon/shared-constants';

import {
  // Analytics
  UserAnalyticsType,
  UserAnalyticsStatus,
  UserAnalyticsScope,
  UserAnalyticsEvent,
  UserAnalyticsDimension,
  UserAnalyticsMetric,
  UserAnalyticsSegment,
  UserAnalyticsCohort,
  UserAnalyticsGranularity,
} from '@vubon/shared-constants';

// ============================================================
// Import from user-kyc.types for UserKYCDocument type
// ============================================================
import type { UserKYCDocument } from './user-kyc.types';

// ============================================================
// User Core Types
// ============================================================

/**
 * Complete user interface
 */
export interface User extends BaseEntity, Timestamp {
  id: ID;
  email: Email;
  phone?: PhoneNumber;
  username?: string;
  name: FullName;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  level: UserLevel;
  status: UserStatus;
  type: UserType;
  role: UserRole;
  permissions: UserPermission[];
  isActive: boolean;
  isRestricted: boolean;
  canLogin: boolean;
  isBusiness: boolean;
  isConsumer: boolean;
  requiresVerification: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt?: Date;
  lastActivityAt?: Date;
  metadata?: Metadata;
}

/**
 * User contact information
 */
export interface UserContact extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  email: Email;
  phone?: PhoneNumber;
  alternativeEmail?: Email;
  alternativePhone?: PhoneNumber;
  isPrimary: boolean;
  isVerified: boolean;
  metadata?: Metadata;
}

/**
 * User address (extends base address with user-specific fields)
 */
export interface UserAddress extends BaseAddress, BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserAddressType;
  status: UserAddressStatus;
  isDefault: boolean;
  isVerified: boolean;
  label?: string;
  metadata?: Metadata;
}

/**
 * User KYC (Know Your Customer)
 */
export interface UserKYC extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserKYCType;
  status: UserKYCStatus;
  documents: UserKYCDocument[];
  submittedAt: Date;
  verifiedAt?: Date;
  rejectedAt?: Date;
  rejectionReason?: string;
  expiryDate?: Date;
  metadata?: Metadata;
}

/**
 * User activity log
 */
export interface UserActivityLog extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserActivityType;
  status: UserActivityStatus;
  severity: UserActivitySeverity;
  category: UserActivityCategory;
  description: string;
  ipAddress?: string;
  userAgent?: string;
  deviceInfo?: DeviceInfo;
  metadata?: Metadata;
}

/**
 * User analytics
 */
export interface UserAnalytics extends BaseEntity, Timestamp {
  id: ID;
  userId: ID;
  type: UserAnalyticsType;
  status: UserAnalyticsStatus;
  scope: UserAnalyticsScope;
  event: UserAnalyticsEvent;
  dimension: UserAnalyticsDimension;
  metric: UserAnalyticsMetric;
  segment: UserAnalyticsSegment;
  cohort: UserAnalyticsCohort;
  granularity: UserAnalyticsGranularity;
  value: number;
  previousValue?: number;
  percentageChange?: number;
  isActive: boolean;
  isCompleted: boolean;
  isFailed: boolean;
  isLifecycleEvent: boolean;
  isEngagementEvent: boolean;
  metadata?: Metadata;
}

// ============================================================
// Re-export Everything
// ============================================================

export {
  // Core User
  USER,
  UserLevel,
  isActiveUser,
  isEligibleForLevelUpgrade,
  getUserLevel,
  getNextLevelThreshold,
  getLevelName,
  getUserStatusMessage,
  // User Status
  USER_STATUS,
  USER_STATUS_LABELS,
  USER_STATUS_COLORS,
  ACTIVE_USER_STATUSES,
  INACTIVE_USER_STATUSES,
  RESTRICTED_USER_STATUSES,
  VERIFICATION_REQUIRED_STATUSES,
  UserStatus,
  isUserActive,
  isUserRestricted,
  canUserLogin,
  getUserStatusLabel,
  getUserStatusColor,
  // User Type
  USER_TYPE,
  USER_TYPE_LABELS,
  USER_TYPE_DESCRIPTIONS,
  BUSINESS_USER_TYPES,
  CONSUMER_USER_TYPES,
  VERIFICATION_REQUIRED_TYPES,
  UserType,
  isBusinessUser,
  isConsumerUser,
  requiresVerification,
  getUserTypeLabel,
  getUserTypeDescription,
  // User Role
  USER_ROLE,
  USER_ROLE_LABELS,
  USER_ROLE_PRIORITY,
  CUSTOMER_ROLES,
  STAFF_ROLES,
  ADMIN_ROLES,
  VENDOR_ROLES,
  MANAGEMENT_ROLES,
  UserRole,
  isCustomer,
  isStaff,
  isAdminRole,
  isVendor,
  isManagement,
  getRolePriority,
  hasHigherPriority,
  getUserRoleLabel,
  // User Permission
  USER_PERMISSION,
  USER_PERMISSION_CATEGORIES,
  UserPermission,
  UserPermissionCategory,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getCategoryPermissions,
  isSystemPermission,
  isAdminPermission,
  getPermissionResource,
  getPermissionAction,
  // User Verification Status
  CoreUserVerificationStatus,
  // Address
  UserAddressType,
  UserAddressStatus,
  // KYC
  UserKYCType,
  UserKYCStatus,
  // Activity
  UserActivityType,
  UserActivityStatus,
  UserActivitySeverity,
  UserActivityCategory,
  // Analytics
  UserAnalyticsType,
  UserAnalyticsStatus,
  UserAnalyticsScope,
  UserAnalyticsEvent,
  UserAnalyticsDimension,
  UserAnalyticsMetric,
  UserAnalyticsSegment,
  UserAnalyticsCohort,
  UserAnalyticsGranularity,
};
