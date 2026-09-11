import { RoleObject } from '../common/role.types';
import { ADMIN_ROLES } from '@vubon/shared-constants/src/admin/admin-role.constants';

/**
 * Admin role value
 */
export type AdminRoleValue = (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES];

/**
 * Admin role interface
 */
export interface AdminRole extends Omit<RoleObject, 'type'> {
  type: AdminRoleValue;
  category: 'admin';
  inheritsFrom: AdminRoleValue | null;
  userRoles: string[];
}

/**
 * Admin role key type
 */
export type AdminRoleKey = keyof typeof ADMIN_ROLES;
