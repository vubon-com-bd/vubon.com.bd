/**
 * Brand Validator
 * ব্র্যান্ড ভ্যালিডেটর
 */

import { BRAND_STATUS } from '@vubon/shared-constants';
import { BrandSchema } from '@vubon/shared-schemas';
import type { Brand } from '@vubon/shared-types';

export interface BrandValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Brand;
}

export const validateBrand = (data: unknown): BrandValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid brand data'] },
    };
  }

  const brand = data as Record<string, unknown>;

  // Name validation
  if (!brand.name || typeof brand.name !== 'string' || brand.name.length < 2) {
    errors.name = ['Brand name must be at least 2 characters'];
    valid = false;
  } else if (brand.name.length > 100) {
    errors.name = ['Brand name must be less than 100 characters'];
    valid = false;
  }

  // Slug validation
  if (brand.slug && typeof brand.slug === 'string') {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(brand.slug)) {
      errors.slug = ['Invalid slug format'];
      valid = false;
    }
  } else {
    errors.slug = ['Slug is required'];
    valid = false;
  }

  // Status validation - BRAND_STATUS থেকে পাওয়া মানগুলোর সাথে তুলনা
  if (brand.status) {
    const statusValues = Object.values(BRAND_STATUS) as string[];
    if (!statusValues.includes(brand.status as string)) {
      errors.status = ['Invalid brand status'];
      valid = false;
    }
  } else {
    errors.status = ['Status is required'];
    valid = false;
  }

  // Logo validation (optional)
  if (brand.logo && typeof brand.logo === 'string') {
    try {
      new URL(brand.logo);
    } catch {
      errors.logo = ['Invalid logo URL'];
      valid = false;
    }
  }

  // Website validation (optional)
  if (brand.website && typeof brand.website === 'string') {
    try {
      new URL(brand.website);
    } catch {
      errors.website = ['Invalid website URL'];
      valid = false;
    }
  }

  try {
    const validatedData = BrandSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Brand,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateBrandCreate = (data: unknown): BrandValidationResult => {
  return validateBrand(data);
};

export const validateBrandUpdate = (data: unknown): BrandValidationResult => {
  return validateBrand(data);
};
