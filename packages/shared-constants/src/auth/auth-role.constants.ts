/**
 * Auth Role Constants (EXTENDS common/roles)
 * @module shared-constants/auth/auth-role.constants
 */

import { ROLES } from '../common/roles.constants';

export const AUTH_ROLES = {
  // Base roles from common
  ...ROLES,

  // Auth specific roles
  AUTH_SUPER_ADMIN: 'auth_super_admin',
  AUTH_ADMIN: 'auth_admin',
  AUTH_MANAGER: 'auth_manager',
  AUTH_MODERATOR: 'auth_moderator',
  AUTH_DEVELOPER: 'auth_developer',
  AUTH_ANALYST: 'auth_analyst',
  AUTH_SUPPORT: 'auth_support',
  AUTH_VIEWER: 'auth_viewer',
  AUTH_EDITOR: 'auth_editor',
  AUTH_PUBLISHER: 'auth_publisher',
  AUTH_AUDITOR: 'auth_auditor',
  AUTH_COMPLIANCE: 'auth_compliance',
} as const;

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

export const AUTH_ROLE_HIERARCHY: Record<AuthRole, number> = {
  [AUTH_ROLES.SUPER_ADMIN]: 100,
  [AUTH_ROLES.ADMIN]: 90,
  [AUTH_ROLES.MANAGER]: 80,
  [AUTH_ROLES.MODERATOR]: 70,
  [AUTH_ROLES.AUTH_SUPER_ADMIN]: 95,
  [AUTH_ROLES.AUTH_ADMIN]: 85,
  [AUTH_ROLES.AUTH_MANAGER]: 75,
  [AUTH_ROLES.AUTH_MODERATOR]: 65,
  [AUTH_ROLES.AUTH_DEVELOPER]: 60,
  [AUTH_ROLES.AUTH_ANALYST]: 55,
  [AUTH_ROLES.AUTH_SUPPORT]: 50,
  [AUTH_ROLES.AUTH_VIEWER]: 45,
  [AUTH_ROLES.AUTH_EDITOR]: 40,
  [AUTH_ROLES.AUTH_PUBLISHER]: 35,
  [AUTH_ROLES.AUTH_AUDITOR]: 30,
  [AUTH_ROLES.AUTH_COMPLIANCE]: 25,
  [AUTH_ROLES.SUPPORT_AGENT]: 20,
  [AUTH_ROLES.SUPPORT_MANAGER]: 15,
  [AUTH_ROLES.FINANCE]: 12,
  [AUTH_ROLES.ACCOUNTANT]: 10,
  [AUTH_ROLES.AUDITOR]: 8,
  [AUTH_ROLES.OPERATIONS]: 7,
  [AUTH_ROLES.LOGISTICS]: 6,
  [AUTH_ROLES.WAREHOUSE]: 5,
  [AUTH_ROLES.DELIVERY]: 4,
  [AUTH_ROLES.SELLER]: 3,
  [AUTH_ROLES.VENDOR]: 2,
  [AUTH_ROLES.SUPPLIER]: 2,
  [AUTH_ROLES.MARKETING]: 2,
  [AUTH_ROLES.SEO]: 1,
  [AUTH_ROLES.CONTENT]: 1,
  [AUTH_ROLES.DEVELOPER]: 1,
  [AUTH_ROLES.QA]: 1,
  [AUTH_ROLES.DEVOPS]: 1,
  [AUTH_ROLES.ANALYST]: 1,
  [AUTH_ROLES.DATA_SCIENTIST]: 1,
  [AUTH_ROLES.CUSTOMER]: 0,
  [AUTH_ROLES.GUEST]: 0,
  [AUTH_ROLES.PUBLIC]: 0,
};

export const AUTH_ADMIN_ROLES: AuthRole[] = [
  AUTH_ROLES.AUTH_SUPER_ADMIN,
  AUTH_ROLES.AUTH_ADMIN,
  AUTH_ROLES.AUTH_MANAGER,
  AUTH_ROLES.AUTH_MODERATOR,
] as const;

export const AUTH_STAFF_ROLES: AuthRole[] = [
  ...AUTH_ADMIN_ROLES,
  AUTH_ROLES.AUTH_SUPPORT,
  AUTH_ROLES.AUTH_DEVELOPER,
  AUTH_ROLES.AUTH_ANALYST,
] as const;

export const AUTH_ROLE_LABELS: Record<AuthRole, string> = {
  [AUTH_ROLES.SUPER_ADMIN]: 'Super Admin',
  [AUTH_ROLES.ADMIN]: 'Admin',
  [AUTH_ROLES.MANAGER]: 'Manager',
  [AUTH_ROLES.MODERATOR]: 'Moderator',
  [AUTH_ROLES.CUSTOMER]: 'Customer',
  [AUTH_ROLES.SELLER]: 'Seller',
  [AUTH_ROLES.VENDOR]: 'Vendor',
  [AUTH_ROLES.SUPPLIER]: 'Supplier',
  [AUTH_ROLES.SUPPORT_AGENT]: 'Support Agent',
  [AUTH_ROLES.SUPPORT_MANAGER]: 'Support Manager',
  [AUTH_ROLES.OPERATIONS]: 'Operations',
  [AUTH_ROLES.LOGISTICS]: 'Logistics',
  [AUTH_ROLES.WAREHOUSE]: 'Warehouse',
  [AUTH_ROLES.DELIVERY]: 'Delivery',
  [AUTH_ROLES.FINANCE]: 'Finance',
  [AUTH_ROLES.ACCOUNTANT]: 'Accountant',
  [AUTH_ROLES.AUDITOR]: 'Auditor',
  [AUTH_ROLES.MARKETING]: 'Marketing',
  [AUTH_ROLES.SEO]: 'SEO',
  [AUTH_ROLES.CONTENT]: 'Content',
  [AUTH_ROLES.DEVELOPER]: 'Developer',
  [AUTH_ROLES.QA]: 'QA',
  [AUTH_ROLES.DEVOPS]: 'DevOps',
  [AUTH_ROLES.ANALYST]: 'Analyst',
  [AUTH_ROLES.DATA_SCIENTIST]: 'Data Scientist',
  [AUTH_ROLES.GUEST]: 'Guest',
  [AUTH_ROLES.PUBLIC]: 'Public',
  [AUTH_ROLES.AUTH_SUPER_ADMIN]: 'Auth Super Admin',
  [AUTH_ROLES.AUTH_ADMIN]: 'Auth Admin',
  [AUTH_ROLES.AUTH_MANAGER]: 'Auth Manager',
  [AUTH_ROLES.AUTH_MODERATOR]: 'Auth Moderator',
  [AUTH_ROLES.AUTH_DEVELOPER]: 'Auth Developer',
  [AUTH_ROLES.AUTH_ANALYST]: 'Auth Analyst',
  [AUTH_ROLES.AUTH_SUPPORT]: 'Auth Support',
  [AUTH_ROLES.AUTH_VIEWER]: 'Auth Viewer',
  [AUTH_ROLES.AUTH_EDITOR]: 'Auth Editor',
  [AUTH_ROLES.AUTH_PUBLISHER]: 'Auth Publisher',
  [AUTH_ROLES.AUTH_AUDITOR]: 'Auth Auditor',
  [AUTH_ROLES.AUTH_COMPLIANCE]: 'Auth Compliance',
};
