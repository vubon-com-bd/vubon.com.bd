import { PermissionObject } from '../common/permission.types';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants';
import { UserPermissionKey } from '../user/user-permission.types';

export interface AdminPermission extends Omit<PermissionObject, 'type'> {
  type: keyof typeof ADMIN_PERMISSIONS;
  category: 'admin';
  extends: (keyof typeof ADMIN_PERMISSIONS | UserPermissionKey)[];
}

export type AdminPermissionKey = keyof typeof ADMIN_PERMISSIONS;
