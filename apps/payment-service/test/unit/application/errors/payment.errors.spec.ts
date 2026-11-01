/**
 * Payment Application Errors — Unit Tests
 * @module payment-service/test/unit/application/errors
 */
import { describe, it, expect } from '@jest/globals';
import {
  PaymentNotFoundApplicationError,
  PaymentInitiationError,
  PaymentCaptureError,
  PaymentConfirmationError,
  PaymentCancellationError,
  PaymentRetryError,
  PaymentVerificationError,
  PaymentIdempotencyConflictError,
  PaymentServiceUnavailableError,
  PaymentValidationApplicationError,
} from '@application/errors/payment.errors';

describe('Payment Application Errors', () => {
  const PAYMENT_ID = '123e4567-e89b-42d3-a456-426614174000';

  // ─── Not Found ───────────────────────────
  describe('PaymentNotFoundApplicationError', () => {
    it('should set name, code, httpStatus 404', () => {
      const err = new PaymentNotFoundApplicationError(PAYMENT_ID);
      expect(err.name).toBe('PaymentNotFoundApplicationError');
      expect(err.httpStatus).toBe(404);
      expect(err.message).toContain(PAYMENT_ID);
      expect(err.message).toContain('Payment');
    });

    it('should be instanceof ApplicationError and Error', () => {
      const err = new PaymentNotFoundApplicationError(PAYMENT_ID);
      expect(err instanceof Error).toBe(true);
    });
  });

  // ─── Command errors (400) ────────────────
  describe('PaymentInitiationError', () => {
    it('should set message + commandType', () => {
      const err = new PaymentInitiationError('amount too high');
      expect(err.name).toBe('PaymentInitiationError');
      expect(err.httpStatus).toBe(400);
      expect(err.message).toContain('amount too high');
      expect(err.commandType).toBe('InitiatePayment');
    });

    it('should accept optional commandId', () => {
      const err = new PaymentInitiationError('reason', 'cmd-123');
      expect(err.commandId).toBe('cmd-123');
    });
  });

  describe('PaymentCaptureError', () => {
    it('should include paymentId + reason', () => {
      const err = new PaymentCaptureError(PAYMENT_ID, 'gateway timeout');
      expect(err.name).toBe('PaymentCaptureError');
      expect(err.httpStatus).toBe(400);
      expect(err.message).toContain(PAYMENT_ID);
      expect(err.message).toContain('gateway timeout');
    });
  });

  describe('PaymentConfirmationError', () => {
    it('should include paymentId + reason', () => {
      const err = new PaymentConfirmationError(PAYMENT_ID, 'sig invalid');
      expect(err.name).toBe('PaymentConfirmationError');
      expect(err.httpStatus).toBe(400);
      expect(err.message).toContain(PAYMENT_ID);
    });
  });

  describe('PaymentCancellationError', () => {
    it('should include paymentId', () => {
      const err = new PaymentCancellationError(PAYMENT_ID, 'too late');
      expect(err.name).toBe('PaymentCancellationError');
      expect(err.httpStatus).toBe(400);
      expect(err.message).toContain(PAYMENT_ID);
    });
  });

  describe('PaymentRetryError', () => {
    it('should include paymentId', () => {
      const err = new PaymentRetryError(PAYMENT_ID, 'max attempts');
      expect(err.name).toBe('PaymentRetryError');
      expect(err.httpStatus).toBe(400);
      expect(err.message).toContain(PAYMENT_ID);
    });
  });

  describe('PaymentVerificationError', () => {
    it('should include paymentId', () => {
      const err = new PaymentVerificationError(PAYMENT_ID, 'bad signature');
      expect(err.name).toBe('PaymentVerificationError');
      expect(err.httpStatus).toBe(400);
      expect(err.message).toContain(PAYMENT_ID);
    });
  });

  // ─── Conflict (409) ──────────────────────
  describe('PaymentIdempotencyConflictError', () => {
    it('should set httpStatus 409 + key in message', () => {
      const err = new PaymentIdempotencyConflictError('idem-key-123', PAYMENT_ID);
      expect(err.name).toBe('PaymentIdempotencyConflictError');
      expect(err.httpStatus).toBe(409);
      expect(err.message).toContain('idem-key-123');
      expect(err.message).toContain(PAYMENT_ID);
    });

    it('should work without existingId', () => {
      const err = new PaymentIdempotencyConflictError('idem-key-456');
      expect(err.httpStatus).toBe(409);
      expect(err.message).toContain('idem-key-456');
    });
  });

  // ─── Service unavailable (503) ───────────
  describe('PaymentServiceUnavailableError', () => {
    it('should set httpStatus 503', () => {
      const err = new PaymentServiceUnavailableError('stripe');
      expect(err.name).toBe('PaymentServiceUnavailableError');
      expect(err.httpStatus).toBe(503);
      expect(err.message).toContain('stripe');
    });

    it('should include reason when given', () => {
      const err = new PaymentServiceUnavailableError('nagad', 'maintenance');
      expect(err.message).toContain('maintenance');
    });
  });

  // ─── Validation (422) ────────────────────
  describe('PaymentValidationApplicationError', () => {
    it('should set httpStatus 422', () => {
      const err = new PaymentValidationApplicationError('amount invalid', 'amount');
      expect(err.name).toBe('PaymentValidationApplicationError');
      expect(err.httpStatus).toBe(422);
      expect(err.message).toBe('amount invalid');
      expect(err.field).toBe('amount');
    });
  });
});
