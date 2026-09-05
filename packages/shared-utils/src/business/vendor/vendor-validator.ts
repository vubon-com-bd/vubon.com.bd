/**
 * Vendor Validator
 * ভেন্ডর ভ্যালিডেটর
 */

import { VENDOR_STATUS } from '@vubon/shared-constants';
import { VendorSchema } from '@vubon/shared-schemas';
import type { Vendor } from '@vubon/shared-types';

export interface VendorValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Vendor;
}

export const validateVendor = (data: unknown): VendorValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid vendor data'] },
    };
  }

  const vendor = data as Record<string, unknown>;

  if (!vendor.userId || typeof vendor.userId !== 'string') {
    errors.userId = ['User ID is required'];
    valid = false;
  }

  if (!vendor.name || typeof vendor.name !== 'string' || vendor.name.length < 2) {
    errors.name = ['Vendor name must be at least 2 characters'];
    valid = false;
  }

  if (vendor.slug && typeof vendor.slug === 'string') {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(vendor.slug)) {
      errors.slug = ['Invalid slug format'];
      valid = false;
    }
  } else {
    errors.slug = ['Slug is required'];
    valid = false;
  }

  if (vendor.status) {
    const statusValues = Object.values(VENDOR_STATUS) as string[];
    if (!statusValues.includes(vendor.status as string)) {
      errors.status = ['Invalid vendor status'];
      valid = false;
    }
  }

  if (vendor.type) {
    const validTypes = [
      'individual',
      'business',
      'manufacturer',
      'distributor',
      'wholesaler',
      'retailer',
      'importer',
      'exporter',
      'dropshipper',
    ] as string[];
    if (!validTypes.includes(vendor.type as string)) {
      errors.type = ['Invalid vendor type'];
      valid = false;
    }
  }

  if (vendor.tier) {
    const validTiers = ['basic', 'silver', 'gold', 'platinum', 'diamond', 'enterprise'] as string[];
    if (!validTiers.includes(vendor.tier as string)) {
      errors.tier = ['Invalid vendor tier'];
      valid = false;
    }
  }

  try {
    const validatedData = VendorSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Vendor,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVendorCreate = (data: unknown): VendorValidationResult => {
  return validateVendor(data);
};

export const validateVendorUpdate = (data: unknown): VendorValidationResult => {
  return validateVendor(data);
};
