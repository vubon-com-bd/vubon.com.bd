/**
 * Fulfillment Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  FulfillmentNotFoundApplicationError,
  FulfillmentStartError,
  FulfillmentPackError,
  FulfillmentShipError,
  FulfillmentCompleteError,
} from '@application/errors/fulfillment.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('FulfillmentNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new FulfillmentNotFoundApplicationError('ful-1');
    expect(err.name).toBe('FulfillmentNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('FulfillmentStartError', () => {
  it('has 400 status', () => {
    const err = new FulfillmentStartError('ord-1', 'no items');
    expect(err.name).toBe('FulfillmentStartError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('FulfillmentPackError', () => {
  it('has 400 status', () => {
    const err = new FulfillmentPackError('ful-1', 'already packed');
    expect(err.name).toBe('FulfillmentPackError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('FulfillmentShipError', () => {
  it('has 400 status', () => {
    const err = new FulfillmentShipError('ord-1', 'not packed');
    expect(err.name).toBe('FulfillmentShipError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('FulfillmentCompleteError', () => {
  it('has 400 status', () => {
    const err = new FulfillmentCompleteError('ful-1', 'not shipped');
    expect(err.name).toBe('FulfillmentCompleteError');
    expect(err.httpStatus).toBe(400);
  });
});
