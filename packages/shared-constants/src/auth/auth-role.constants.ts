/**
 * Auth Role Constants
 * প্রমাণীকরণ রোল সম্পর্কিত কনস্ট্যান্টস
 */

import { ROLES, ROLE_HIERARCHY } from '../common';

export const AUTH_ROLE = {
  ...ROLES,

  // Additional auth-specific roles
  AUTH_SERVICE: 'auth_service',
  AUTH_ADMIN: 'auth_admin',
  AUTH_MANAGER: 'auth_manager',
  AUTH_SUPPORT: 'auth_support',
  AUTH_USER: 'auth_user',
} as const;

export type AuthRole = (typeof AUTH_ROLE)[keyof typeof AUTH_ROLE];

// Auth role hierarchy
export const AUTH_ROLE_HIERARCHY: Record<AuthRole, number> = {
  ...ROLE_HIERARCHY,
  [AUTH_ROLE.AUTH_SERVICE]: 90,
  [AUTH_ROLE.AUTH_ADMIN]: 85,
  [AUTH_ROLE.AUTH_MANAGER]: 75,
  [AUTH_ROLE.AUTH_SUPPORT]: 45,
  [AUTH_ROLE.AUTH_USER]: 25,
};
