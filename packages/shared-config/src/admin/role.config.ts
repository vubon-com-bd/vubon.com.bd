/**
 * Role Configuration
 * অ্যাডমিন রোল কনফিগারেশন
 */

import { ADMIN_ROLES, ADMIN_ROLE_HIERARCHY, ADMIN_ROLE_PERMISSIONS } from '@vubon/shared-constants';

export interface RoleConfig {
  roles: {
    name: string;
    hierarchy: number;
    permissions: string[];
    isSystem: boolean;
    isDefault: boolean;
  }[];
  defaultRole: string;
  maxRolesPerAdmin: number;
  allowCustomRoles: boolean;
}

export const createRoleConfig = (): RoleConfig => {
  const roles = Object.values(ADMIN_ROLES).map((role) => ({
    name: role,
    hierarchy: ADMIN_ROLE_HIERARCHY[role as keyof typeof ADMIN_ROLE_HIERARCHY] || 0,
    permissions: ADMIN_ROLE_PERMISSIONS[role as keyof typeof ADMIN_ROLE_PERMISSIONS] || [],
    isSystem: ['super_admin', 'system_admin', 'admin'].includes(role),
    isDefault: ['admin', 'moderator'].includes(role),
  }));

  return {
    roles,
    defaultRole: ADMIN_ROLES.ADMIN,
    maxRolesPerAdmin: 5,
    allowCustomRoles: false,
  };
};
