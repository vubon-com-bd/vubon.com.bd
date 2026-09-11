import { VENDOR_PERMISSION } from '@vubon/shared-constants/src/business/vendor/vendor-permission.constants';

export interface PermissionInput {
  type: string;
}

export const validateVendorPermission = (
  permission: Partial<PermissionInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!permission.type) errors.push('Permission type is required');
  if (permission.type && !Object.keys(VENDOR_PERMISSION).includes(permission.type)) {
    errors.push('Invalid permission type');
  }
  return { isValid: errors.length === 0, errors };
};

export const hasVendorPermission = (permissions: string[], required: string): boolean => {
  return permissions.includes(required);
};
