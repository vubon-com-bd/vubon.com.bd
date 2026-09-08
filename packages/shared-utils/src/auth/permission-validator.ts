import { PERMISSIONS } from '@vubon/shared-constants';
import { AUTH_PERMISSIONS } from '@vubon/shared-constants';

export const validatePermission = (permission: string): boolean => {
  return (
    Object.keys(PERMISSIONS).includes(permission) ||
    Object.keys(AUTH_PERMISSIONS).includes(permission)
  );
};

export const hasPermission = (permissions: string[], required: string): boolean => {
  return permissions.includes(required);
};
