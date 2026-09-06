/**
 * User Main Constants
 * @module shared-constants/user/user.constants
 */

import { STATUS } from '../common/status.constants';
import { ROLES } from '../common/roles.constants';
import { PERMISSIONS } from '../common/permissions.constants';

export const USER = {
  // User status from common
  STATUS: STATUS,

  // User roles from common
  ROLES: ROLES,

  // User permissions from common
  PERMISSIONS: PERMISSIONS,

  // User specific
  DEFAULT_USER_TYPE: 'customer',
  DEFAULT_USER_STATUS: 'active',
  MAX_USERNAME_LENGTH: 20,
  MIN_USERNAME_LENGTH: 3,
  MAX_USERS_PER_PAGE: 100,
  DEFAULT_USERS_PER_PAGE: 20,
  USER_CACHE_TTL: 3600, // 1 hour
  USER_SESSION_TIMEOUT: 86400, // 24 hours
} as const;

// Export types from common directly
export type UserStatusType = (typeof STATUS)[keyof typeof STATUS];
export type UserRoleType = (typeof ROLES)[keyof typeof ROLES];
export type UserPermissionType = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Avoid exporting UserStatus, UserRole, UserPermission to prevent conflicts
