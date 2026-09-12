import { ROLES as COMMON_ROLES } from '../common/roles.constants';

/**
 * Auth Role Constants
 * @module shared-constants/auth/auth-role
 *
 * Note: The auth-specific role list is intentionally small.
 * Roles themselves live in common/roles.constants — do NOT spread
 * USER_ROLES here (it would duplicate and bloat the enum).
 */

export const AUTH_ROLES = {
  ...COMMON_ROLES,
  AUTH_USER: 'auth_user',
  AUTH_GUEST: 'auth_guest',
  AUTH_SERVICE: 'auth_service',
} as const;

export type AuthRoleValue = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];
