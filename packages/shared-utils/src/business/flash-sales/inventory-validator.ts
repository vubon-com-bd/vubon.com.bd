/**
 * Flash Sale Inventory Validator
 * ফ্ল্যাশ সেল ইনভেন্টরি ভ্যালিডেটর
 */

import { INVENTORY_STATUS } from '@vubon/shared-constants';
import { FlashSaleInventorySchema } from '@vubon/shared-schemas';
import type { FlashSaleInventory } from '@vubon/shared-types';

export interface FlashSaleInventoryValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: FlashSaleInventory;
}

export const validateFlashSaleInventory = (data: unknown): FlashSaleInventoryValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid inventory data'] },
    };
  }

  const inventory = data as Record<string, unknown>;

  // Flash sale ID validation
  if (!inventory.flashSaleId || typeof inventory.flashSaleId !== 'string') {
    errors.flashSaleId = ['Flash sale ID is required'];
    valid = false;
  }

  // Product ID validation
  if (!inventory.productId || typeof inventory.productId !== 'string') {
    errors.productId = ['Product ID is required'];
    valid = false;
  }

  // Quantity validation
  if (inventory.quantity !== undefined) {
    if (typeof inventory.quantity !== 'number' || inventory.quantity < 0) {
      errors.quantity = ['Quantity must be a positive number'];
      valid = false;
    }
  } else {
    errors.quantity = ['Quantity is required'];
    valid = false;
  }

  // Status validation using INVENTORY_STATUS
  if (inventory.status) {
    const statusValues = Object.values(INVENTORY_STATUS) as string[];
    if (!statusValues.includes(inventory.status as string)) {
      errors.status = ['Invalid inventory status'];
      valid = false;
    }
  }

  // Allocation type validation
  if (inventory.allocationType) {
    const validTypes = ['fixed', 'dynamic', 'per_user', 'total'];
    if (!validTypes.includes(inventory.allocationType as string)) {
      errors.allocationType = ['Invalid allocation type'];
      valid = false;
    }
  }

  try {
    const validatedData = FlashSaleInventorySchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as FlashSaleInventory,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateFlashSaleInventoryCreate = (
  data: unknown
): FlashSaleInventoryValidationResult => {
  return validateFlashSaleInventory(data);
};

export const validateFlashSaleInventoryUpdate = (
  data: unknown
): FlashSaleInventoryValidationResult => {
  return validateFlashSaleInventory(data);
};
