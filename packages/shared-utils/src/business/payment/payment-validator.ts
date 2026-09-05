/**
 * Payment Validator
 * পেমেন্ট ভ্যালিডেটর
 */

import { PAYMENT_STATUS } from '@vubon/shared-constants';
import { PaymentSchema } from '@vubon/shared-schemas';
import type { Payment } from '@vubon/shared-types';

export interface PaymentValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Payment;
}

export const validatePayment = (data: unknown): PaymentValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid payment data'] },
    };
  }

  const payment = data as Record<string, unknown>;

  // Order ID validation
  if (!payment.orderId || typeof payment.orderId !== 'string') {
    errors.orderId = ['Order ID is required'];
    valid = false;
  }

  // User ID validation
  if (!payment.userId || typeof payment.userId !== 'string') {
    errors.userId = ['User ID is required'];
    valid = false;
  }

  // Amount validation
  if (payment.amount !== undefined) {
    if (typeof payment.amount !== 'number' || payment.amount < 0) {
      errors.amount = ['Amount must be a positive number'];
      valid = false;
    }
  } else {
    errors.amount = ['Amount is required'];
    valid = false;
  }

  // Status validation
  if (payment.status) {
    const statusValues = Object.values(PAYMENT_STATUS) as string[];
    if (!statusValues.includes(payment.status as string)) {
      errors.status = ['Invalid payment status'];
      valid = false;
    }
  }

  // Method validation
  if (!payment.method || typeof payment.method !== 'string') {
    errors.method = ['Payment method is required'];
    valid = false;
  }

  // Gateway validation
  if (!payment.gateway || typeof payment.gateway !== 'string') {
    errors.gateway = ['Payment gateway is required'];
    valid = false;
  }

  // Currency validation
  if (payment.currency && typeof payment.currency !== 'string') {
    errors.currency = ['Currency must be a string'];
    valid = false;
  }

  try {
    const validatedData = PaymentSchema.parse(data) as unknown;
    return {
      valid: true,
      errors: {},
      data: validatedData as Payment,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validatePaymentCreate = (data: unknown): PaymentValidationResult => {
  return validatePayment(data);
};

export const validatePaymentUpdate = (data: unknown): PaymentValidationResult => {
  return validatePayment(data);
};

export const validatePaymentStatus = (status: string): boolean => {
  return (Object.values(PAYMENT_STATUS) as string[]).includes(status);
};
