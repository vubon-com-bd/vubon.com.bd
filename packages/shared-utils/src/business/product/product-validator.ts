/**
 * Product Validator
 * প্রোডাক্ট ভ্যালিডেটর
 */

import { REGEX } from '@vubon/shared-constants';
import { PRODUCT_STATUS } from '@vubon/shared-constants';
import { ProductSchema } from '@vubon/shared-schemas';
import type { Product } from '@vubon/shared-types';

export interface ProductValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Product;
}

export const validateProduct = (data: unknown): ProductValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid product data'] },
    };
  }

  const product = data as Record<string, unknown>;

  // Name validation
  if (!product.name || typeof product.name !== 'string' || product.name.length < 1) {
    errors.name = ['Product name is required'];
    valid = false;
  } else if (product.name.length > 255) {
    errors.name = ['Product name must be less than 255 characters'];
    valid = false;
  }

  // Slug validation
  if (product.slug && typeof product.slug === 'string') {
    if (!REGEX.SLUG.test(product.slug)) {
      errors.slug = ['Invalid slug format'];
      valid = false;
    }
  } else {
    errors.slug = ['Slug is required'];
    valid = false;
  }

  // Description validation
  if (
    !product.description ||
    typeof product.description !== 'string' ||
    product.description.length < 1
  ) {
    errors.description = ['Description is required'];
    valid = false;
  } else if (product.description.length > 5000) {
    errors.description = ['Description must be less than 5000 characters'];
    valid = false;
  }

  // Status validation - PRODUCT_STATUS থেকে পাওয়া মানগুলোর সাথে তুলনা
  if (product.status) {
    const statusValues = Object.values(PRODUCT_STATUS) as string[];
    if (!statusValues.includes(product.status as string)) {
      errors.status = ['Invalid product status'];
      valid = false;
    }
  } else {
    errors.status = ['Status is required'];
    valid = false;
  }

  // Price validation
  if (product.price !== undefined) {
    if (typeof product.price !== 'number' || product.price < 0) {
      errors.price = ['Price must be a positive number'];
      valid = false;
    }
  } else {
    errors.price = ['Price is required'];
    valid = false;
  }

  // SKU validation
  if (!product.sku || typeof product.sku !== 'string' || product.sku.length < 1) {
    errors.sku = ['SKU is required'];
    valid = false;
  }

  // Stock validation
  if (product.stock !== undefined) {
    if (
      typeof product.stock !== 'number' ||
      product.stock < 0 ||
      !Number.isInteger(product.stock)
    ) {
      errors.stock = ['Stock must be a non-negative integer'];
      valid = false;
    }
  }

  // Try Zod schema validation
  try {
    const validatedData = ProductSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Product,
    };
  } catch (err) {
    // Zod errors already captured above, error variable ব্যবহার করা হয়েছে
    console.error('Zod validation error:', err);
    return {
      valid,
      errors,
    };
  }
};

export const validateProductCreate = (data: unknown): ProductValidationResult => {
  const result = validateProduct(data);
  if (result.valid && result.data) {
    // Additional validation for creation
    const product = result.data;
    if (!product.categoryId) {
      result.valid = false;
      result.errors.categoryId = ['Category ID is required'];
    }
    if (!product.vendorId) {
      result.valid = false;
      result.errors.vendorId = ['Vendor ID is required'];
    }
  }
  return result;
};

export const validateProductUpdate = (data: unknown): ProductValidationResult => {
  const result = validateProduct(data);
  // For updates, we only validate provided fields
  return result;
};
