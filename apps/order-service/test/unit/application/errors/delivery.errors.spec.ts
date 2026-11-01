/**
 * Delivery Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  DeliveryNotFoundApplicationError,
  DeliveryMethodNotFoundApplicationError,
  DeliveryScheduleError,
  DeliveryRescheduleError,
  DeliveryConfirmError,
} from '@application/errors/delivery.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('DeliveryNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new DeliveryNotFoundApplicationError('del-1');
    expect(err.name).toBe('DeliveryNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('DeliveryMethodNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new DeliveryMethodNotFoundApplicationError('meth-1');
    expect(err.name).toBe('DeliveryMethodNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
  });
});

describe('DeliveryScheduleError', () => {
  it('has 400 status', () => {
    const err = new DeliveryScheduleError('ord-1', 'no courier');
    expect(err.name).toBe('DeliveryScheduleError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('no courier');
  });
});

describe('DeliveryRescheduleError', () => {
  it('has 400 status', () => {
    const err = new DeliveryRescheduleError('del-1', 'cannot reschedule');
    expect(err.name).toBe('DeliveryRescheduleError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('DeliveryConfirmError', () => {
  it('has 400 status', () => {
    const err = new DeliveryConfirmError('del-1', 'no signature');
    expect(err.name).toBe('DeliveryConfirmError');
    expect(err.httpStatus).toBe(400);
  });
});
