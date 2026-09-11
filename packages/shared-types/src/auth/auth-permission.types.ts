import { PermissionObject } from '../common/permission.types';
import { AUTH_PERMISSIONS } from '@vubon/shared-constants/src/auth/auth-permission.constants';

/**
 * Auth permission value
 */
export type AuthPermissionValue = (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS];

/**
 * Auth permission interface
 */
export interface AuthPermission extends Omit<PermissionObject, 'type'> {
  type: AuthPermissionValue;
  category: 'auth';
}

/**
 * Auth permission key type
 */
export type AuthPermissionKey = keyof typeof AUTH_PERMISSIONS;
