/**
 * Vendor Warranty Validator
 * ভেন্ডর ওয়ারেন্টি ভ্যালিডেটর
 */

import { VENDOR_WARRANTY } from '@vubon/shared-constants';
import { VendorWarrantySchema } from '@vubon/shared-schemas';
import type { VendorWarranty } from '@vubon/shared-types';

export interface VendorWarrantyValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: VendorWarranty;
}

export const validateVendorWarranty = (data: unknown): VendorWarrantyValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid warranty data'] },
    };
  }

  const warranty = data as Record<string, unknown>;

  // Vendor ID validation
  if (!warranty.vendorId || typeof warranty.vendorId !== 'string') {
    errors.vendorId = ['Vendor ID is required'];
    valid = false;
  }

  // Type validation - VENDOR_WARRANTY ব্যবহার
  if (warranty.type) {
    const typeValues = Object.values(VENDOR_WARRANTY.TYPES) as string[];
    if (!typeValues.includes(warranty.type as string)) {
      errors.type = ['Invalid warranty type'];
      valid = false;
    }
  } else {
    errors.type = ['Warranty type is required'];
    valid = false;
  }

  // Name validation
  if (!warranty.name || typeof warranty.name !== 'string' || warranty.name.length < 1) {
    errors.name = ['Warranty name is required'];
    valid = false;
  }

  // Coverage validation - VENDOR_WARRANTY ব্যবহার
  if (warranty.coverage) {
    const coverageValues = Object.values(VENDOR_WARRANTY.COVERAGE) as string[];
    if (!coverageValues.includes(warranty.coverage as string)) {
      errors.coverage = ['Invalid coverage type'];
      valid = false;
    }
  } else {
    errors.coverage = ['Coverage is required'];
    valid = false;
  }

  // Duration validation
  if (warranty.durationDays !== undefined) {
    if (typeof warranty.durationDays !== 'number' || warranty.durationDays < 0) {
      errors.durationDays = ['Duration must be a positive number'];
      valid = false;
    }
  } else {
    errors.durationDays = ['Duration is required'];
    valid = false;
  }

  // Status validation - VENDOR_WARRANTY ব্যবহার
  if (warranty.status) {
    const statusValues = Object.values(VENDOR_WARRANTY.STATUS) as string[];
    if (!statusValues.includes(warranty.status as string)) {
      errors.status = ['Invalid warranty status'];
      valid = false;
    }
  }

  try {
    const validatedData = VendorWarrantySchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as VendorWarranty,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorWarrantyCreate = (data: unknown): VendorWarrantyValidationResult => {
  return validateVendorWarranty(data);
};

export const validateVendorWarrantyUpdate = (data: unknown): VendorWarrantyValidationResult => {
  return validateVendorWarranty(data);
};
