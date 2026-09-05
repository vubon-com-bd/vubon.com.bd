/**
 * Product Deal Validator
 * প্রোডাক্ট ডিল ভ্যালিডেটর
 */

import { PRODUCT_DEAL } from '@vubon/shared-constants';
import { ProductDealSchema } from '@vubon/shared-schemas';
import type { ProductDeal } from '@vubon/shared-types';

export interface ProductDealValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: ProductDeal;
}

export const validateProductDeal = (data: unknown): ProductDealValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid product deal data'] },
    };
  }

  const productDeal = data as Record<string, unknown>;

  // Product ID validation
  if (!productDeal.productId || typeof productDeal.productId !== 'string') {
    errors.productId = ['Product ID is required'];
    valid = false;
  }

  // Deal ID validation
  if (!productDeal.dealId || typeof productDeal.dealId !== 'string') {
    errors.dealId = ['Deal ID is required'];
    valid = false;
  }

  // Discount validation
  if (productDeal.discount !== undefined) {
    if (typeof productDeal.discount !== 'number' || productDeal.discount < 0) {
      errors.discount = ['Discount must be a positive number'];
      valid = false;
    }
  } else {
    errors.discount = ['Discount is required'];
    valid = false;
  }

  // Flash price validation
  if (productDeal.flashPrice !== undefined) {
    if (typeof productDeal.flashPrice !== 'number' || productDeal.flashPrice < 0) {
      errors.flashPrice = ['Flash price must be a positive number'];
      valid = false;
    }
  } else {
    errors.flashPrice = ['Flash price is required'];
    valid = false;
  }

  // Quantity validation
  if (productDeal.quantity !== undefined) {
    if (typeof productDeal.quantity !== 'number' || productDeal.quantity < 0) {
      errors.quantity = ['Quantity must be a positive number'];
      valid = false;
    }
  } else {
    errors.quantity = ['Quantity is required'];
    valid = false;
  }

  // Status validation using PRODUCT_DEAL.STATUS
  if (productDeal.status) {
    const statusValues = Object.values(PRODUCT_DEAL.STATUS) as string[];
    if (!statusValues.includes(productDeal.status as string)) {
      errors.status = ['Invalid product deal status'];
      valid = false;
    }
  }

  try {
    const validatedData = ProductDealSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as unknown as ProductDeal,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateProductDealCreate = (data: unknown): ProductDealValidationResult => {
  return validateProductDeal(data);
};

export const validateProductDealUpdate = (data: unknown): ProductDealValidationResult => {
  return validateProductDeal(data);
};
