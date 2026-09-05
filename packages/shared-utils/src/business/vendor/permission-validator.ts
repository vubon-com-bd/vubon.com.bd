/**
 * Vendor Permission Validator
 * ভেন্ডর পারমিশন ভ্যালিডেটর
 */

import { VENDOR_PERMISSIONS } from '@vubon/shared-constants';
import { VendorPermissionSchema } from '@vubon/shared-schemas';
import type { VendorPermission } from '@vubon/shared-types';

export interface VendorPermissionValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorPermission;
}

export const validateVendorPermission = (data: unknown): VendorPermissionValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid permission data'] },
    };
  }

  const permission = data as Record<string, unknown>;

  if (!permission.vendorId || typeof permission.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  if (permission.permission) {
    const permissionValues = Object.values(VENDOR_PERMISSIONS) as string[];
    if (!permissionValues.includes(permission.permission as string)) {
      errors.permission = ['Invalid permission'];
      valid = false;
    }
  } else {
    errors.permission = ['Permission is required'];
    valid = false;
  }

  if (!permission.grantedBy || typeof permission.grantedBy !== 'string') {
    errors.grantedBy = ['Granted by is required'];
    valid = false;
  }

  if (permission.grantedAt) {
    const grantedAt = new Date(permission.grantedAt as string);
    if (isNaN(grantedAt.getTime())) {
      errors.grantedAt = ['Invalid granted date'];
      valid = false;
    }
  }

  if (permission.expiresAt) {
    const expiresAt = new Date(permission.expiresAt as string);
    if (isNaN(expiresAt.getTime())) {
      errors.expiresAt = ['Invalid expiry date'];
      valid = false;
    }
  }

  try {
    const validatedData = VendorPermissionSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as VendorPermission,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorPermissionCreate = (data: unknown): VendorPermissionValidationResult => {
  return validateVendorPermission(data);
};

export const validateVendorPermissionUpdate = (data: unknown): VendorPermissionValidationResult => {
  return validateVendorPermission(data);
};
