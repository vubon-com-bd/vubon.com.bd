import { RoleObject } from '../common/role.types';
import { USER_ROLES } from '@vubon/shared-constants/src/user/user-role.constants';

/**
 * User role value
 */
export type UserRoleValue = (typeof USER_ROLES)[keyof typeof USER_ROLES];

/**
 * User role interface
 */
export interface UserRole extends Omit<RoleObject, 'type'> {
  type: UserRoleValue;
  category: 'user';
}

/**
 * User role key type
 */
export type UserRoleKey = keyof typeof USER_ROLES;
