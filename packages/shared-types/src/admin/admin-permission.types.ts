import { PermissionObject } from '../common/permission.types';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants/src/admin/admin-permission.constants';

/**
 * Admin permission value
 */
export type AdminPermissionValue = (typeof ADMIN_PERMISSIONS)[keyof typeof ADMIN_PERMISSIONS];

/**
 * Admin permission interface
 */
export interface AdminPermission extends Omit<PermissionObject, 'type'> {
  type: AdminPermissionValue;
  category: 'admin';
  inheritsFrom: AdminPermissionValue[];
}

/**
 * Admin permission key type
 */
export type AdminPermissionKey = keyof typeof ADMIN_PERMISSIONS;
