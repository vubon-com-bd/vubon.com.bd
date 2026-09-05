/**
 * Flash Sale Validator
 * ফ্ল্যাশ সেল ভ্যালিডেটর
 */

import { FLASH_SALE_STATUS } from '@vubon/shared-constants';
import { FlashSaleSchema } from '@vubon/shared-schemas';
import type { FlashSale } from '@vubon/shared-types';

export interface FlashSaleValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSale;
}

export const validateFlashSaleData = (data: unknown): FlashSaleValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid flash sale data'] },
    };
  }

  const flashSale = data as Record<string, unknown>;

  // Name validation
  if (!flashSale.name || typeof flashSale.name !== 'string' || flashSale.name.length < 1) {
    errors.name = ['Flash sale name is required'];
    valid = false;
  }

  // Slug validation
  if (flashSale.slug && typeof flashSale.slug === 'string') {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(flashSale.slug)) {
      errors.slug = ['Invalid slug format'];
      valid = false;
    }
  } else {
    errors.slug = ['Slug is required'];
    valid = false;
  }

  // Status validation using FLASH_SALE_STATUS
  if (flashSale.status) {
    const statusValues = Object.values(FLASH_SALE_STATUS) as string[];
    if (!statusValues.includes(flashSale.status as string)) {
      errors.status = ['Invalid flash sale status'];
      valid = false;
    }
  }

  // Date validation
  if (flashSale.startDate) {
    const startDate = new Date(flashSale.startDate as string);
    if (isNaN(startDate.getTime())) {
      errors.startDate = ['Invalid start date'];
      valid = false;
    }
  } else {
    errors.startDate = ['Start date is required'];
    valid = false;
  }

  if (flashSale.endDate) {
    const endDate = new Date(flashSale.endDate as string);
    if (isNaN(endDate.getTime())) {
      errors.endDate = ['Invalid end date'];
      valid = false;
    }
  } else {
    errors.endDate = ['End date is required'];
    valid = false;
  }

  try {
    const validatedData = FlashSaleSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as FlashSale,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateFlashSaleCreate = (data: unknown): FlashSaleValidationResult => {
  return validateFlashSaleData(data);
};

export const validateFlashSaleUpdate = (data: unknown): FlashSaleValidationResult => {
  return validateFlashSaleData(data);
};
