/**
 * Invoice Application Errors — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  InvoiceNotFoundApplicationError,
  InvoiceGenerationError,
  InvoiceSendError,
  InvoiceVoidError,
  InvoiceAlreadyPaidApplicationError,
  InvoiceNumberConflictError,
} from '@application/errors/invoice.errors';

describe('Invoice Application Errors', () => {
  const INVOICE_ID = '823e4567-e89b-42d3-a456-426614174007';
  const ORDER_ID = '923e4567-e89b-42d3-a456-426614174008';

  it('InvoiceNotFoundApplicationError — 404', () => {
    const err = new InvoiceNotFoundApplicationError(INVOICE_ID);
    expect(err.httpStatus).toBe(404);
    expect(err.message).toContain(INVOICE_ID);
  });

  it('InvoiceGenerationError — 400', () => {
    const err = new InvoiceGenerationError(ORDER_ID, 'tax not found');
    expect(err.httpStatus).toBe(400);
    expect(err.message).toContain(ORDER_ID);
  });

  it('InvoiceSendError — 400', () => {
    const err = new InvoiceSendError(INVOICE_ID, 'email bounce');
    expect(err.httpStatus).toBe(400);
  });

  it('InvoiceVoidError — 400', () => {
    const err = new InvoiceVoidError(INVOICE_ID, 'already paid');
    expect(err.httpStatus).toBe(400);
  });

  it('InvoiceAlreadyPaidApplicationError — 409', () => {
    const err = new InvoiceAlreadyPaidApplicationError(INVOICE_ID);
    expect(err.name).toBe('InvoiceAlreadyPaidApplicationError');
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain(INVOICE_ID);
  });

  it('InvoiceNumberConflictError — 409', () => {
    const err = new InvoiceNumberConflictError('INV-2025-000001');
    expect(err.httpStatus).toBe(409);
    expect(err.message).toContain('INV-2025-000001');
  });
});
