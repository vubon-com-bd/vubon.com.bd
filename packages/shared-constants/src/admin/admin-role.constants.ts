/**
 * Admin Role Constants
 * অ্যাডমিন রোল সম্পর্কিত কনস্ট্যান্টস
 */

import { ROLES } from '../common';
import { AUTH_ROLE } from '../auth/auth-role.constants';

export const ADMIN_ROLES = {
  // From common ROLES
  SUPER_ADMIN: ROLES.SUPER_ADMIN,
  ADMIN: ROLES.ADMIN,
  MODERATOR: ROLES.MODERATOR,
  MANAGER: ROLES.MANAGER,
  SUPPORT: ROLES.SUPPORT,

  // From auth roles
  AUTH_SERVICE: AUTH_ROLE.AUTH_SERVICE,
  AUTH_ADMIN: AUTH_ROLE.AUTH_ADMIN,
  AUTH_MANAGER: AUTH_ROLE.AUTH_MANAGER,
  AUTH_SUPPORT: AUTH_ROLE.AUTH_SUPPORT,
  AUTH_USER: AUTH_ROLE.AUTH_USER,

  // Additional admin roles
  SYSTEM_ADMIN: 'system_admin',
  CONTENT_ADMIN: 'content_admin',
  USER_ADMIN: 'user_admin',
  FINANCE_ADMIN: 'finance_admin',
  REPORT_ADMIN: 'report_admin',
  SETTINGS_ADMIN: 'settings_admin',
} as const;

export type AdminRoleValue = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];

// Admin role hierarchy
export const ADMIN_ROLE_HIERARCHY: Record<AdminRoleValue, number> = {
  [ADMIN_ROLES.SUPER_ADMIN]: 100,
  [ADMIN_ROLES.SYSTEM_ADMIN]: 95,
  [ADMIN_ROLES.ADMIN]: 90,
  [ADMIN_ROLES.AUTH_ADMIN]: 88,
  [ADMIN_ROLES.FINANCE_ADMIN]: 85,
  [ADMIN_ROLES.MANAGER]: 80,
  [ADMIN_ROLES.AUTH_SERVICE]: 78,
  [ADMIN_ROLES.AUTH_MANAGER]: 75,
  [ADMIN_ROLES.CONTENT_ADMIN]: 70,
  [ADMIN_ROLES.USER_ADMIN]: 70,
  [ADMIN_ROLES.REPORT_ADMIN]: 65,
  [ADMIN_ROLES.SETTINGS_ADMIN]: 65,
  [ADMIN_ROLES.MODERATOR]: 60,
  [ADMIN_ROLES.AUTH_SUPPORT]: 42,
  [ADMIN_ROLES.AUTH_USER]: 40,
  [ADMIN_ROLES.SUPPORT]: 40,
};

// Admin role permissions mapping
export const ADMIN_ROLE_PERMISSIONS: Record<AdminRoleValue, string[]> = {
  [ADMIN_ROLES.SUPER_ADMIN]: ['*'],
  [ADMIN_ROLES.SYSTEM_ADMIN]: ['system.*', 'admin.*', 'user.*', 'settings.*'],
  [ADMIN_ROLES.ADMIN]: ['admin.*', 'user.*', 'content.*', 'report.*'],
  [ADMIN_ROLES.AUTH_ADMIN]: ['auth.*', 'user.*', 'session.*', 'token.*'],
  [ADMIN_ROLES.FINANCE_ADMIN]: ['finance.*', 'report.*', 'payment.*'],
  [ADMIN_ROLES.MANAGER]: ['admin.read', 'user.*', 'report.*', 'content.*'],
  [ADMIN_ROLES.AUTH_SERVICE]: ['auth.*', 'session.*', 'token.*'],
  [ADMIN_ROLES.AUTH_MANAGER]: ['auth.read', 'auth.update', 'session.read'],
  [ADMIN_ROLES.CONTENT_ADMIN]: ['content.*', 'media.*', 'page.*'],
  [ADMIN_ROLES.USER_ADMIN]: ['user.*', 'role.*', 'permission.*'],
  [ADMIN_ROLES.REPORT_ADMIN]: ['report.*', 'analytics.*'],
  [ADMIN_ROLES.SETTINGS_ADMIN]: ['settings.*', 'config.*'],
  [ADMIN_ROLES.MODERATOR]: ['content.*', 'user.read', 'report.read'],
  [ADMIN_ROLES.AUTH_SUPPORT]: ['auth.read', 'session.read', 'user.read'],
  [ADMIN_ROLES.AUTH_USER]: ['auth.read', 'user.read'],
  [ADMIN_ROLES.SUPPORT]: ['ticket.*', 'user.read'],
};
