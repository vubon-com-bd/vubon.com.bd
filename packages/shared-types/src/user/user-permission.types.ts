import { PermissionObject } from '../common/permission.types';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';

/**
 * User permission interface
 */
export interface UserPermission extends PermissionObject {
  type: keyof typeof USER_PERMISSIONS | string;
  category: 'user';
}

/**
 * User permission key type
 */
export type UserPermissionKey = keyof typeof USER_PERMISSIONS;
