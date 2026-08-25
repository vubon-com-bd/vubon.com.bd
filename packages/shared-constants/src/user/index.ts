/**
 * User Constants Index
 * Export all user-related constants and types
 */

// Core User Constants
export {
  USER,
  getUserLevel,
  getNextLevelThreshold,
  getLevelName,
  getUserStatusMessage,
  isActiveUser,
  isEligibleForLevelUpgrade,
} from './user.constants';

export type {
  UserLevel,
  UserVerificationStatus as CoreUserVerificationStatus,
} from './user.constants';

// User Status Constants
export {
  USER_STATUS,
  USER_STATUS_LABELS,
  USER_STATUS_COLORS,
  ACTIVE_USER_STATUSES,
  INACTIVE_USER_STATUSES,
  RESTRICTED_USER_STATUSES,
  VERIFICATION_REQUIRED_STATUSES,
  isUserActive,
  isUserRestricted,
  canUserLogin,
  getUserStatusLabel,
  getUserStatusColor,
} from './user-status.constants';

export type { UserStatus } from './user-status.constants';

// User Type Constants
export {
  USER_TYPE,
  USER_TYPE_LABELS,
  USER_TYPE_DESCRIPTIONS,
  BUSINESS_USER_TYPES,
  CONSUMER_USER_TYPES,
  VERIFICATION_REQUIRED_TYPES,
  isBusinessUser,
  isConsumerUser,
  requiresVerification,
  getUserTypeLabel,
  getUserTypeDescription,
} from './user-type.constants';

export type { UserType } from './user-type.constants';

// User Role Constants
export {
  USER_ROLE,
  USER_ROLE_LABELS,
  USER_ROLE_PRIORITY,
  CUSTOMER_ROLES,
  STAFF_ROLES,
  ADMIN_ROLES,
  VENDOR_ROLES,
  MANAGEMENT_ROLES,
  isCustomer,
  isStaff,
  isAdminRole,
  isVendor,
  isManagement,
  getRolePriority,
  hasHigherPriority,
  getUserRoleLabel,
} from './user-role.constants';

export type { UserRole } from './user-role.constants';

// User Permission Constants
export {
  USER_PERMISSION,
  USER_PERMISSION_CATEGORIES,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  getCategoryPermissions,
  isSystemPermission,
  isAdminPermission,
  getPermissionResource,
  getPermissionAction,
} from './user-permission.constants';

export type { UserPermission, UserPermissionCategory } from './user-permission.constants';

// activity Constants
export * from './activity';

// address Constants
export * from './address';

// contact Constants
export * from './contact';

// kyc Constants
export * from './kyc';

// log Constants
export * from './log';

// preferences Constants
export * from './preferences';

// profile Constants
export * from './profile';

// settings Constants
export * from './settings';

// verification Constants
export * from './verification';
