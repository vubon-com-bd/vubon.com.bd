import { RoleObject } from '../common/role.types';
import { AUTH_ROLES } from '@vubon/shared-constants/src/auth/auth-role.constants';

/**
 * Auth role value
 */
export type AuthRoleValue = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES];

/**
 * Auth role interface
 * Note: `type` here is the role value (e.g. 'admin'),
 * while parent `RoleObject.type` is the category.
 */
export interface AuthRole extends Omit<RoleObject, 'type'> {
  type: AuthRoleValue;
  category: 'auth';
}

/**
 * Auth role key type
 */
export type AuthRoleKey = keyof typeof AUTH_ROLES;
