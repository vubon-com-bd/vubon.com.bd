import { ROLES as COMMON_ROLES } from '../common/roles.constants';

/**
 * User Roles Constants
 * @module shared-constants/user/user-role
 *
 * Includes all common roles (admin, customer, ...) plus user-specific
 * roles. Object.values() works here because COMMON_ROLES is flat.
 */

export const USER_ROLES = {
  ...COMMON_ROLES,
  USER: 'user',
  PREMIUM_USER: 'premium_user',
  GUEST: 'guest',
} as const;

export type UserRoleValue = (typeof USER_ROLES)[keyof typeof USER_ROLES];
