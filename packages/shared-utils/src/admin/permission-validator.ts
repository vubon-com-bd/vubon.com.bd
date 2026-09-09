import { hasUserPermission } from '../user/permission-validator';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants/src/admin/admin-permission.constants';

export const hasAdminPermission = (permissions: string[], required: string): boolean => {
  return hasUserPermission(permissions, required);
};

export const validateAdminPermission = (permission: string): boolean => {
  return Object.keys(ADMIN_PERMISSIONS).includes(permission);
};
