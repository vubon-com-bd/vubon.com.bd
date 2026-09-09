import { PermissionObject } from '../common/permission.types';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants/src/admin/admin-permission.constants';

/**
 * Admin permission interface
 */
export interface AdminPermission extends PermissionObject {
  type: keyof typeof ADMIN_PERMISSIONS | string;
  category: 'admin';
  extends: (keyof typeof ADMIN_PERMISSIONS | string)[];
}

/**
 * Admin permission key type
 */
export type AdminPermissionKey = keyof typeof ADMIN_PERMISSIONS;
