/**
 * Return Application Errors — Unit Tests
 * @module order-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  ReturnNotFoundApplicationError,
  ReturnRequestError,
  ReturnApproveError,
  ReturnRejectError,
  ReturnCompleteError,
} from '@application/errors/return.errors.js';
import { ApplicationError } from '@vubon/shared-kernel/application/errors/application.error';

describe('ReturnNotFoundApplicationError', () => {
  it('has 404 status', () => {
    const err = new ReturnNotFoundApplicationError('ret-1');
    expect(err.name).toBe('ReturnNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err).toBeInstanceOf(ApplicationError);
  });
});

describe('ReturnRequestError', () => {
  it('has 400 status', () => {
    const err = new ReturnRequestError('ord-1', 'window expired');
    expect(err.name).toBe('ReturnRequestError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('ReturnApproveError', () => {
  it('has 400 status', () => {
    const err = new ReturnApproveError('ret-1', 'invalid status');
    expect(err.name).toBe('ReturnApproveError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('ReturnRejectError', () => {
  it('has 400 status', () => {
    const err = new ReturnRejectError('ret-1', 'not requested');
    expect(err.name).toBe('ReturnRejectError');
    expect(err.httpStatus).toBe(400);
  });
});

describe('ReturnCompleteError', () => {
  it('has 400 status', () => {
    const err = new ReturnCompleteError('ret-1', 'not received');
    expect(err.name).toBe('ReturnCompleteError');
    expect(err.httpStatus).toBe(400);
  });
});
