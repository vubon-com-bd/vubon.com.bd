import { RoleObject } from '../common/role.types';
import { ADMIN_ROLES } from '@vubon/shared-constants';
import { UserRoleKey } from '../user/user-role.types';

export interface AdminRole extends Omit<RoleObject, 'type'> {
  type: keyof typeof ADMIN_ROLES;
  category: 'admin';
  extends: keyof typeof ADMIN_ROLES | null;
  userRoles: UserRoleKey[];
}

export type AdminRoleKey = keyof typeof ADMIN_ROLES;
