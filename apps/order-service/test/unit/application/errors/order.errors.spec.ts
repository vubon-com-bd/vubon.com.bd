/**
 * Order Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  OrderNotFoundApplicationError,
  OrderNumberNotFoundApplicationError,
  OrderInitiationError,
  OrderProcessingError,
  OrderIdempotencyConflictError,
  OrderServiceUnavailableError,
  OrderValidationError,
} from '@application/errors/order.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('OrderNotFoundApplicationError', () => {
  it('has correct name and 404 status', () => {
    const err = new OrderNotFoundApplicationError('order-123');
    expect(err.name).toBe('OrderNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain('order-123');
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('OrderNumberNotFoundApplicationError', () => {
  it('has correct name and 404 status', () => {
    const err = new OrderNumberNotFoundApplicationError('ORD-2024-000123');
    expect(err.name).toBe('OrderNumberNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain('ORD-2024-000123');
  });
});

describe('OrderInitiationError', () => {
  it('has correct name and 400 status', () => {
    const err = new OrderInitiationError('missing payment');
    expect(err.name).toBe('OrderInitiationError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('missing payment');
  });
});

describe('OrderProcessingError', () => {
  it('has correct name and 400 status', () => {
    const err = new OrderProcessingError('ord-1', 'invalid state');
    expect(err.name).toBe('OrderProcessingError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('ord-1');
    expect(err.message).toContain('invalid state');
  });
});

describe('OrderIdempotencyConflictError', () => {
  it('has correct name and 409 status', () => {
    const err = new OrderIdempotencyConflictError('key-123', 'ord-456');
    expect(err.name).toBe('OrderIdempotencyConflictError');
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain('key-123');
    expect(err.message).toContain('ord-456');
  });

  it('works without existing id', () => {
    const err = new OrderIdempotencyConflictError('key-abc');
    expect(err.message).toContain('key-abc');
  });
});

describe('OrderServiceUnavailableError', () => {
  it('has 503 status and includes service name', () => {
    const err = new OrderServiceUnavailableError('payment-service', 'timeout');
    expect(err.name).toBe('OrderServiceUnavailableError');
    expect(err.httpStatus).toBe(503);
    expect(err.message).toContain('payment-service');
    expect(err.message).toContain('timeout');
  });
});

describe('OrderValidationError', () => {
  it('has 422 status', () => {
    const err = new OrderValidationError('Invalid field', 'customerId');
    expect(err.name).toBe('OrderValidationError');
    expect(err.httpStatus).toBe(422);
    expect(err.message).toBe('Invalid field');
  });
});
