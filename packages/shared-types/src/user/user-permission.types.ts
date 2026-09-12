import { PermissionObject } from '../common/permission.types';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';

/**
 * User permission value
 */
export type UserPermissionValue = (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];

/**
 * User permission interface
 */
export interface UserPermission extends Omit<PermissionObject, 'type'> {
  type: UserPermissionValue;
  category: 'user';
}

/**
 * User permission key type
 */
export type UserPermissionKey = keyof typeof USER_PERMISSIONS;
