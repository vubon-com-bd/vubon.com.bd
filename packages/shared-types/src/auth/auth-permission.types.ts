import { PermissionObject } from '../common/permission.types';
import { AUTH_PERMISSIONS } from '@vubon/shared-constants/src/auth/auth-permission.constants';

/**
 * Auth permission interface
 */
export interface AuthPermission extends PermissionObject {
  type: keyof typeof AUTH_PERMISSIONS | string;
  category: 'auth';
}

/**
 * Auth permission key type
 */
export type AuthPermissionKey = keyof typeof AUTH_PERMISSIONS;
