/**
 * Method Application Errors — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  PaymentMethodNotFoundApplicationError,
  PaymentMethodAddError,
  PaymentMethodUpdateError,
  PaymentMethodDeleteError,
  PaymentMethodInUseError,
  SetDefaultMethodError,
} from '@application/errors/method.errors';

describe('Method Application Errors', () => {
  const METHOD_ID = '223e4567-e89b-42d3-a456-426614174001';

  it('PaymentMethodNotFoundApplicationError — 404', () => {
    const err = new PaymentMethodNotFoundApplicationError(METHOD_ID);
    expect(err.name).toBe('PaymentMethodNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain(METHOD_ID);
  });

  it('PaymentMethodAddError — 400', () => {
    const err = new PaymentMethodAddError('duplicate card');
    expect(err.name).toBe('PaymentMethodAddError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('duplicate card');
  });

  it('PaymentMethodUpdateError — 400', () => {
    const err = new PaymentMethodUpdateError(METHOD_ID, 'not found');
    expect(err.name).toBe('PaymentMethodUpdateError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain(METHOD_ID);
  });

  it('PaymentMethodDeleteError — 400', () => {
    const err = new PaymentMethodDeleteError(METHOD_ID, 'in use');
    expect(err.name).toBe('PaymentMethodDeleteError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain(METHOD_ID);
  });

  it('PaymentMethodInUseError — 409', () => {
    const err = new PaymentMethodInUseError(METHOD_ID);
    expect(err.name).toBe('PaymentMethodInUseError');
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain(METHOD_ID);
  });

  it('SetDefaultMethodError — 400', () => {
    const err = new SetDefaultMethodError(METHOD_ID, 'not found');
    expect(err.name).toBe('SetDefaultMethodError');
    expect(err.httpStatus).toBe(400);
  });
});
