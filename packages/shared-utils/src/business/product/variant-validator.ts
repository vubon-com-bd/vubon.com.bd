/**
 * Variant Validator
 * ভেরিয়েন্ট ভ্যালিডেটর
 */

import { VARIANT_STATUS } from '@vubon/shared-constants';
import { VariantSchema } from '@vubon/shared-schemas';
import type { Variant } from '@vubon/shared-types';

export interface VariantValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Variant;
}

export const validateVariant = (data: unknown): VariantValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid variant data'] },
    };
  }

  const variant = data as Record<string, unknown>;

  // Name validation
  if (!variant.name || typeof variant.name !== 'string' || variant.name.length < 1) {
    errors.name = ['Variant name is required'];
    valid = false;
  }

  // SKU validation
  if (!variant.sku || typeof variant.sku !== 'string' || variant.sku.length < 1) {
    errors.sku = ['SKU is required'];
    valid = false;
  }

  // Price validation
  if (variant.price !== undefined) {
    if (typeof variant.price !== 'number' || variant.price < 0) {
      errors.price = ['Price must be a positive number'];
      valid = false;
    }
  } else {
    errors.price = ['Price is required'];
    valid = false;
  }

  // Stock validation
  if (variant.stock !== undefined) {
    if (
      typeof variant.stock !== 'number' ||
      variant.stock < 0 ||
      !Number.isInteger(variant.stock)
    ) {
      errors.stock = ['Stock must be a non-negative integer'];
      valid = false;
    }
  }

  // Product ID validation
  if (!variant.productId || typeof variant.productId !== 'string') {
    errors.productId = ['Product ID is required'];
    valid = false;
  }

  // Status validation - VARIANT_STATUS থেকে পাওয়া মানগুলোর সাথে তুলনা
  if (variant.status) {
    const statusValues = Object.values(VARIANT_STATUS) as string[];
    if (!statusValues.includes(variant.status as string)) {
      errors.status = ['Invalid variant status'];
      valid = false;
    }
  }

  try {
    const validatedData = VariantSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Variant,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateVariantCreate = (data: unknown): VariantValidationResult => {
  return validateVariant(data);
};

export const validateVariantUpdate = (data: unknown): VariantValidationResult => {
  return validateVariant(data);
};
