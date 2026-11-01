/**
 * Checkout Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  CheckoutNotFoundApplicationError,
  CheckoutSessionNotFoundApplicationError,
  CheckoutExpiredApplicationError,
  CheckoutAlreadyCompletedApplicationError,
  CheckoutStepError,
} from '@application/errors/checkout.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('CheckoutNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new CheckoutNotFoundApplicationError('co-1');
    expect(err.name).toBe('CheckoutNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain('co-1');
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('CheckoutSessionNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new CheckoutSessionNotFoundApplicationError('sess-1');
    expect(err.name).toBe('CheckoutSessionNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
  });
});

describe('CheckoutExpiredApplicationError', () => {
  it('has 400 status with checkout id', () => {
    const err = new CheckoutExpiredApplicationError('co-1');
    expect(err.name).toBe('CheckoutExpiredApplicationError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('co-1');
  });
});

describe('CheckoutAlreadyCompletedApplicationError', () => {
  it('has 400 status', () => {
    const err = new CheckoutAlreadyCompletedApplicationError('co-2');
    expect(err.name).toBe('CheckoutAlreadyCompletedApplicationError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('CheckoutStepError', () => {
  it('includes current and requested step', () => {
    const err = new CheckoutStepError('co-1', 'cart', 'payment_method');
    expect(err.name).toBe('CheckoutStepError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('cart');
    expect(err.message).toContain('payment_method');
  });
});
