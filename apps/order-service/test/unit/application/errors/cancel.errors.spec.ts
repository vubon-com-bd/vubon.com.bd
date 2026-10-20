/**
 * Cancel Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  CancelNotFoundApplicationError,
  CancelRequestError,
  CancelApproveError,
  CancelRejectError,
} from '@application/errors/cancel.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('CancelNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new CancelNotFoundApplicationError('cancel-1');
    expect(err.name).toBe('CancelNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('CancelRequestError', () => {
  it('has 400 status', () => {
    const err = new CancelRequestError('ord-1', 'window expired');
    expect(err.name).toBe('CancelRequestError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('CancelApproveError', () => {
  it('has 400 status', () => {
    const err = new CancelApproveError('cancel-1', 'not in requested status');
    expect(err.name).toBe('CancelApproveError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('CancelRejectError', () => {
  it('has 400 status', () => {
    const err = new CancelRejectError('cancel-1', 'already approved');
    expect(err.name).toBe('CancelRejectError');
    expect(err.httpStatus).toBe(400);
  });
});
