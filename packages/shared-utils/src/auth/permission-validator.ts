import { PERMISSIONS } from '@vubon/shared-constants/src/common/permissions.constants';
import { AUTH_PERMISSIONS } from '@vubon/shared-constants/src/auth/auth-permission.constants';

export const validatePermission = (permission: string): boolean => {
  return (
    Object.keys(PERMISSIONS).includes(permission) ||
    Object.keys(AUTH_PERMISSIONS).includes(permission)
  );
};

export const hasPermission = (permissions: string[], required: string): boolean => {
  return permissions.includes(required);
};
