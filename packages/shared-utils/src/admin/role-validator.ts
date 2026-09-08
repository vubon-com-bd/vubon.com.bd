import { ADMIN_ROLES } from '@vubon/shared-constants';
import { USER_ROLES } from '@vubon/shared-constants';

export const validateAdminRole = (role: string): boolean => {
  return Object.keys(ADMIN_ROLES).includes(role) || Object.keys(USER_ROLES).includes(role);
};

export const validateRolePermissions = (_role: string, _permissions: string[]): boolean => {
  // Implementation for role permission validation
  return true;
};
