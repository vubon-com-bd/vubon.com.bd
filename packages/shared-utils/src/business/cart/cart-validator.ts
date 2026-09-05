/**
 * Cart Validator
 * কার্ট ভ্যালিডেটর
 */

import { CART_STATUS } from '@vubon/shared-constants';
import { CartSchema } from '@vubon/shared-schemas';
import type { Cart } from '@vubon/shared-types';

export interface CartValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Cart;
}

export const validateCart = (data: unknown): CartValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid cart data'] },
    };
  }

  const cart = data as Record<string, unknown>;

  // User ID validation
  if (!cart.userId && !cart.sessionId) {
    errors._global = ['Either userId or sessionId is required'];
    valid = false;
  }

  // Items validation
  if (cart.items && Array.isArray(cart.items)) {
    for (let i = 0; i < cart.items.length; i++) {
      const item = cart.items[i] as Record<string, unknown>;
      if (!item.productId || typeof item.productId !== 'string') {
        errors[`items[${i}].productId`] = ['Product ID is required'];
        valid = false;
      }
      if (item.quantity === undefined || typeof item.quantity !== 'number' || item.quantity < 1) {
        errors[`items[${i}].quantity`] = ['Quantity must be at least 1'];
        valid = false;
      }
      if (item.price === undefined || typeof item.price !== 'number' || item.price < 0) {
        errors[`items[${i}].price`] = ['Price must be a positive number'];
        valid = false;
      }
    }
  } else {
    errors.items = ['Items must be an array'];
    valid = false;
  }

  // Status validation - টাইপ অ্যাসার্শন ছাড়া চেক
  if (cart.status) {
    const statusValues = Object.values(CART_STATUS);
    const statusStr = String(cart.status);
    if (!statusValues.includes(statusStr as (typeof CART_STATUS)[keyof typeof CART_STATUS])) {
      errors.status = ['Invalid cart status'];
      valid = false;
    }
  }

  // Subtotal validation
  if (cart.subtotal !== undefined) {
    if (typeof cart.subtotal !== 'number' || cart.subtotal < 0) {
      errors.subtotal = ['Subtotal must be a positive number'];
      valid = false;
    }
  }

  // Total validation
  if (cart.total !== undefined) {
    if (typeof cart.total !== 'number' || cart.total < 0) {
      errors.total = ['Total must be a positive number'];
      valid = false;
    }
  }

  try {
    const validatedData = CartSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Cart,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateCartItem = (
  data: unknown
): { valid: boolean; errors: Record<string, string[]> } => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid cart item data'] },
    };
  }

  const item = data as Record<string, unknown>;

  if (!item.productId || typeof item.productId !== 'string') {
    errors.productId = ['Product ID is required'];
    valid = false;
  }

  if (item.quantity === undefined || typeof item.quantity !== 'number' || item.quantity < 1) {
    errors.quantity = ['Quantity must be at least 1'];
    valid = false;
  }

  if (item.price === undefined || typeof item.price !== 'number' || item.price < 0) {
    errors.price = ['Price must be a positive number'];
    valid = false;
  }

  return { valid, errors };
};

export const validateCartCreate = (data: unknown): CartValidationResult => {
  return validateCart(data);
};

export const validateCartUpdate = (data: unknown): CartValidationResult => {
  return validateCart(data);
};
