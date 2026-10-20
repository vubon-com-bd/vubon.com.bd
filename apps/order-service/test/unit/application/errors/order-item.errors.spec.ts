/**
 * Order Item Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  OrderItemNotFoundApplicationError,
  OrderItemAddError,
  OrderItemRemoveError,
  OrderItemUpdateError,
} from '@application/errors/order-item.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('OrderItemNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new OrderItemNotFoundApplicationError('item-1');
    expect(err.name).toBe('OrderItemNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain('item-1');
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('OrderItemAddError', () => {
  it('has 400 status', () => {
    const err = new OrderItemAddError('ord-1', 'quantity exceeded');
    expect(err.name).toBe('OrderItemAddError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('ord-1');
    expect(err.message).toContain('quantity exceeded');
  });
});

describe('OrderItemRemoveError', () => {
  it('has 400 status', () => {
    const err = new OrderItemRemoveError('ord-1', 'item locked');
    expect(err.name).toBe('OrderItemRemoveError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('OrderItemUpdateError', () => {
  it('has 400 status', () => {
    const err = new OrderItemUpdateError('item-1', 'not editable');
    expect(err.name).toBe('OrderItemUpdateError');
    expect(err.httpStatus).toBe(400);
  });
});
