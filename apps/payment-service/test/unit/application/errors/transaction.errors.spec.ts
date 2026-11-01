/**
 * Transaction Application Errors — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  TransactionNotFoundApplicationError,
  TransactionCreationError,
  TransactionReversalError,
  TransactionApplicationConflictError,
  TransactionQueryError,
} from '@application/errors/transaction.errors';

describe('Transaction Application Errors', () => {
  const TX_ID = '323e4567-e89b-42d3-a456-426614174002';
  const PAYMENT_ID = '423e4567-e89b-42d3-a456-426614174003';

  it('TransactionNotFoundApplicationError — 404', () => {
    const err = new TransactionNotFoundApplicationError(TX_ID);
    expect(err.name).toBe('TransactionNotFoundApplicationError');
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain(TX_ID);
  });

  it('TransactionCreationError — 400', () => {
    const err = new TransactionCreationError(PAYMENT_ID, 'duplicate');
    expect(err.name).toBe('TransactionCreationError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain(PAYMENT_ID);
  });

  it('TransactionReversalError — 400', () => {
    const err = new TransactionReversalError(TX_ID, 'already settled');
    expect(err.name).toBe('TransactionReversalError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain(TX_ID);
  });

  it('TransactionApplicationConflictError — 409', () => {
    const err = new TransactionApplicationConflictError('ref-xyz');
    expect(err.name).toBe('TransactionApplicationConflictError');
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain('ref-xyz');
  });

  it('TransactionQueryError — 400', () => {
    const err = new TransactionQueryError('DB timeout');
    expect(err.name).toBe('TransactionQueryError');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain('DB timeout');
  });
});
