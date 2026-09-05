/**
 * Price Validator
 * মূল্য ভ্যালিডেটর
 */

import { FLASH_SALE_PRICE } from '@vubon/shared-constants';
import { FlashSalePriceSchema } from '@vubon/shared-schemas';
import type { FlashSalePrice } from '@vubon/shared-types';

export interface PriceValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSalePrice;
}

export const validatePrice = (data: unknown): PriceValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid price data'] },
    };
  }

  const price = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!price.flashSaleId || typeof price.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // Product ID validation
  if (!price.productId || typeof price.productId !== 'string') {
    errors.productId = ['Product ID is required'];
    valid = false;
  }

  // Original price validation
  if (price.originalPrice !== undefined) {
    if (typeof price.originalPrice !== 'number' || price.originalPrice < 0) {
      errors.originalPrice = ['Original price must be a positive number'];
      valid = false;
    }
  } else {
    errors.originalPrice = ['Original price is required'];
    valid = false;
  }

  // Flash price validation
  if (price.flashPrice !== undefined) {
    if (typeof price.flashPrice !== 'number' || price.flashPrice < 0) {
      errors.flashPrice = ['Flash price must be a positive number'];
      valid = false;
    }
  } else {
    errors.flashPrice = ['Flash price is required'];
    valid = false;
  }

  // Discount validation
  if (price.discount !== undefined && (typeof price.discount !== 'number' || price.discount < 0)) {
    errors.discount = ['Discount must be a positive number'];
    valid = false;
  }

  // Discount percentage validation
  if (price.discountPercentage !== undefined) {
    if (
      typeof price.discountPercentage !== 'number' ||
      price.discountPercentage < 0 ||
      price.discountPercentage > 100
    ) {
      errors.discountPercentage = ['Discount percentage must be between 0 and 100'];
      valid = false;
    }
  }

  // FLASH_SALE_PRICE কনস্ট্যান্ট ব্যবহার করে টাইপ চেক
  if (price.type) {
    const typeValues = Object.values(FLASH_SALE_PRICE.TYPES) as string[];
    if (!typeValues.includes(price.type as string)) {
      errors.type = ['Invalid price type'];
      valid = false;
    }
  }

  try {
    const validatedData = FlashSalePriceSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as FlashSalePrice,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validatePriceCreate = (data: unknown): PriceValidationResult => {
  return validatePrice(data);
};

export const validatePriceUpdate = (data: unknown): PriceValidationResult => {
  return validatePrice(data);
};
