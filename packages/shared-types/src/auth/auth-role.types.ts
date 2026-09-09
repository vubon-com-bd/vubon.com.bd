import { RoleObject } from '../common/role.types';
import { AUTH_ROLES } from '@vubon/shared-constants/src/auth/auth-role.constants';

/**
 * Auth role interface
 */
export interface AuthRole extends RoleObject {
  type: keyof typeof AUTH_ROLES | string;
  category: 'auth';
}

/**
 * Auth role key type
 */
export type AuthRoleKey = keyof typeof AUTH_ROLES;
