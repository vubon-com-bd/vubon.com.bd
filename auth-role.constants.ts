/**
 * Auth Role Constants
 * @module shared-constants/auth/auth-role
 *
 * Note: Does NOT spread COMMON_ROLES — that would copy all common roles
 * into this enum and cause drift. Roles live in common/roles.constants.
 * Only auth-scoped roles are defined here; common roles are referenced.
 */

import { ROLES as COMMON_ROLES } from '../common/roles.constants';

export const AUTH_ROLES = {
  // Referenced from common (single source of truth)
  GUEST: COMMON_ROLES.GUEST,
  CUSTOMER: COMMON_ROLES.CUSTOMER,

  // Auth-specific roles
  AUTH_USER: 'auth_user',
  AUTH_GUEST: 'auth_guest',
  AUTH_SERVICE: 'auth_service',
} as const;

export type AuthRoleValue = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];
