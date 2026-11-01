/**
 * Refund Application Errors — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  RefundNotFoundApplicationError,
  RefundRequestError,
  RefundApprovalError,
  RefundRejectionError,
  PartialRefundError,
  RefundNotEligibleApplicationError,
  RefundIdempotencyConflictError,
} from '@application/errors/refund.errors';

describe('Refund Application Errors', () => {
  const REFUND_ID = '523e4567-e89b-42d3-a456-426614174004';
  const PAYMENT_ID = '623e4567-e89b-42d3-a456-426614174005';

  it('RefundNotFoundApplicationError — 404', () => {
    const err = new RefundNotFoundApplicationError(REFUND_ID);
    expect(err.name).toBe('RefundNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain(REFUND_ID);
  });

  it('RefundRequestError — 400', () => {
    const err = new RefundRequestError(PAYMENT_ID, 'window expired');
    expect(err.name).toBe('RefundRequestError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain(PAYMENT_ID);
  });

  it('RefundApprovalError — 400', () => {
    const err = new RefundApprovalError(REFUND_ID, 'not pending');
    expect(err.httpStatus).toBe(400);
  });

  it('RefundRejectionError — 400', () => {
    const err = new RefundRejectionError(REFUND_ID, 'already processed');
    expect(err.httpStatus).toBe(400);
  });

  it('PartialRefundError — 400', () => {
    const err = new PartialRefundError(PAYMENT_ID, 'amount exceeds');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain(PAYMENT_ID);
  });

  it('RefundNotEligibleApplicationError — 422', () => {
    const err = new RefundNotEligibleApplicationError(PAYMENT_ID, 'already refunded');
    expect(err.name).toBe('RefundNotEligibleApplicationError');
    expect(err.httpStatus).toBe(422);
    expect(err.message).toContain('already refunded');
  });

  it('RefundIdempotencyConflictError — 409', () => {
    const err = new RefundIdempotencyConflictError('idem-refund-1', REFUND_ID);
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain('idem-refund-1');
  });

  it('RefundIdempotencyConflictError — without existingId', () => {
    const err = new RefundIdempotencyConflictError('idem-refund-2');
    expect(err.httpStatus).toBe(409);
  });
});
