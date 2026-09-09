import { hasPermission as authHasPermission } from '../auth/permission-validator';
import { USER_PERMISSIONS } from '@vubon/shared-constants/src/user/user-permission.constants';

export const hasUserPermission = (permissions: string[], required: string): boolean => {
  return authHasPermission(permissions, required);
};

export const validateUserPermission = (permission: string): boolean => {
  return Object.keys(USER_PERMISSIONS).includes(permission);
};
