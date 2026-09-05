/**
 * Checkout Validator
 * চেকআউট ভ্যালিডেটর
 */

import { CHECKOUT_STATUS } from '@vubon/shared-constants';
import { CheckoutSchema } from '@vubon/shared-schemas';
import type { Checkout } from '@vubon/shared-types';

export interface CheckoutValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Checkout;
}

export interface CheckoutStepDataValidation {
  step: string;
  valid: boolean;
  errors: string[];
}

export const validateCheckout = (data: unknown): CheckoutValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid checkout data'] },
    };
  }

  const checkout = data as Record<string, unknown>;

  // User ID validation
  if (!checkout.userId || typeof checkout.userId !== 'string') {
    errors.userId = ['User ID is required'];
    valid = false;
  }

  // Cart ID validation
  if (!checkout.cartId || typeof checkout.cartId !== 'string') {
    errors.cartId = ['Cart ID is required'];
    valid = false;
  }

  // Session ID validation
  if (!checkout.sessionId || typeof checkout.sessionId !== 'string') {
    errors.sessionId = ['Session ID is required'];
    valid = false;
  }

  // Status validation
  if (checkout.status) {
    const statusValues = Object.values(CHECKOUT_STATUS) as string[];
    if (!statusValues.includes(checkout.status as string)) {
      errors.status = ['Invalid checkout status'];
      valid = false;
    }
  }

  // Expiry validation
  if (checkout.expiresAt) {
    const expiryDate = new Date(checkout.expiresAt as string);
    if (isNaN(expiryDate.getTime())) {
      errors.expiresAt = ['Invalid expiry date'];
      valid = false;
    }
  }

  // Billing address validation
  if (checkout.billingAddress) {
    const billing = checkout.billingAddress as Record<string, unknown>;
    if (!billing.street || typeof billing.street !== 'string') {
      errors['billingAddress.street'] = ['Street is required'];
      valid = false;
    }
    if (!billing.city || typeof billing.city !== 'string') {
      errors['billingAddress.city'] = ['City is required'];
      valid = false;
    }
    if (!billing.country || typeof billing.country !== 'string') {
      errors['billingAddress.country'] = ['Country is required'];
      valid = false;
    }
  }

  try {
    const validatedData = CheckoutSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Checkout,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateCheckoutStepData = (
  step: string,
  data: unknown
): CheckoutStepDataValidation => {
  const errors: string[] = [];
  let valid = true;

  const validSteps = [
    'cart',
    'shipping',
    'payment',
    'review',
    'confirmation',
    'login',
    'billing',
    'shipping_method',
    'payment_method',
    'order_complete',
  ];

  if (!validSteps.includes(step)) {
    errors.push(`Invalid step: ${step}`);
    valid = false;
  }

  if (!data || typeof data !== 'object') {
    errors.push('Step data is required');
    valid = false;
  }

  // Step-specific validation
  if (step === 'shipping') {
    const shippingData = data as Record<string, unknown>;
    if (!shippingData.address) {
      errors.push('Shipping address is required');
      valid = false;
    }
    if (!shippingData.method) {
      errors.push('Shipping method is required');
      valid = false;
    }
  }

  if (step === 'payment') {
    const paymentData = data as Record<string, unknown>;
    if (!paymentData.method) {
      errors.push('Payment method is required');
      valid = false;
    }
  }

  return {
    step,
    valid,
    errors,
  };
};

export const validateCheckoutCreate = (data: unknown): CheckoutValidationResult => {
  return validateCheckout(data);
};

export const validateCheckoutUpdate = (data: unknown): CheckoutValidationResult => {
  return validateCheckout(data);
};
