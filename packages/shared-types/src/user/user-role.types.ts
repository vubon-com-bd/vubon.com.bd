import { RoleObject } from '../common/role.types';
import { USER_ROLES } from '@vubon/shared-constants/src/user/user-role.constants';

/**
 * User role interface
 */
export interface UserRole extends RoleObject {
  type: keyof typeof USER_ROLES | string;
  category: 'user';
}

/**
 * User role key type
 */
export type UserRoleKey = keyof typeof USER_ROLES;
