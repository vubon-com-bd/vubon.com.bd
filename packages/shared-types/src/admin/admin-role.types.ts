import { RoleObject } from '../common/role.types';
import { ADMIN_ROLES } from '@vubon/shared-constants/src/admin/admin-role.constants';

/**
 * Admin role interface
 */
export interface AdminRole extends RoleObject {
  type: keyof typeof ADMIN_ROLES | string;
  category: 'admin';
  extends: keyof typeof ADMIN_ROLES | string | null;
  userRoles: string[];
}

/**
 * Admin role key type
 */
export type AdminRoleKey = keyof typeof ADMIN_ROLES;
