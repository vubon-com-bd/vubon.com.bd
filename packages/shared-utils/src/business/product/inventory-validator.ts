/**
 * Inventory Validator
 * ইনভেন্টরি ভ্যালিডেটর
 */

import { INVENTORY_STATUS } from '@vubon/shared-constants';
import { InventorySchema } from '@vubon/shared-schemas';
import type { Inventory } from '@vubon/shared-types';

export interface InventoryValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Inventory;
}

export const validateInventory = (data: unknown): InventoryValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid inventory data'] },
    };
  }

  const inventory = data as Record<string, unknown>;

  // Product ID validation
  if (!inventory.productId || typeof inventory.productId !== 'string') {
    errors.productId = ['Product ID is required'];
    valid = false;
  }

  // Quantity validation
  if (inventory.quantity !== undefined) {
    if (
      typeof inventory.quantity !== 'number' ||
      inventory.quantity < 0 ||
      !Number.isInteger(inventory.quantity)
    ) {
      errors.quantity = ['Quantity must be a non-negative integer'];
      valid = false;
    }
  } else {
    errors.quantity = ['Quantity is required'];
    valid = false;
  }

  // Low stock threshold validation
  if (inventory.lowStockThreshold !== undefined) {
    if (
      typeof inventory.lowStockThreshold !== 'number' ||
      inventory.lowStockThreshold < 0 ||
      !Number.isInteger(inventory.lowStockThreshold)
    ) {
      errors.lowStockThreshold = ['Low stock threshold must be a non-negative integer'];
      valid = false;
    }
  }

  // Status validation - INVENTORY_STATUS থেকে পাওয়া মানগুলোর সাথে তুলনা
  if (inventory.status) {
    const statusValues = Object.values(INVENTORY_STATUS) as string[];
    if (!statusValues.includes(inventory.status as string)) {
      errors.status = ['Invalid inventory status'];
      valid = false;
    }
  }

  try {
    const validatedData = InventorySchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Inventory,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateInventoryCreate = (data: unknown): InventoryValidationResult => {
  return validateInventory(data);
};

export const validateInventoryUpdate = (data: unknown): InventoryValidationResult => {
  return validateInventory(data);
};
