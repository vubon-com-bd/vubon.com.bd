/**
 * RefundValidator — Unit Tests (full branch coverage)
 */
import { describe, it, expect } from '@jest/globals';
import { RefundValidator } from '@application/validators/refund.validator';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_PAYMENT_ID = '223e4567-e89b-42d3-a456-426614174001';

describe('RefundValidator', () => {
  describe('validateRequest', () => {
    it('should parse valid input', () => {
      const result = RefundValidator.validateRequest({
        paymentId: VALID_PAYMENT_ID,
        amount: 500,
        reason: 'customer_request',
        idempotencyKey: 'idem-12345678',
      });
      expect(result.paymentId).toBe(VALID_PAYMENT_ID);
    });

    it('should accept minimal input', () => {
      const result = RefundValidator.validateRequest({ paymentId: VALID_PAYMENT_ID });
      expect(result.amount).toBeUndefined();
    });

    it('should throw on invalid paymentId (ZodError with field)', () => {
      try {
        RefundValidator.validateRequest({ paymentId: 'not-uuid' });
        fail('should have thrown');
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationValidationError);
        const err = e as ApplicationValidationError;
        expect(err.field).toBeDefined();
        expect(err.context?.details).toBeDefined();
      }
    });

    it('should throw on null input', () => {
      expect(() => RefundValidator.validateRequest(null)).toThrow(
        ApplicationValidationError,
      );
    });

    it('should throw on negative amount', () => {
      expect(() =>
        RefundValidator.validateRequest({
          paymentId: VALID_PAYMENT_ID,
          amount: -100,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on short idempotencyKey', () => {
      expect(() =>
        RefundValidator.validateRequest({
          paymentId: VALID_PAYMENT_ID,
          idempotencyKey: 'short',
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('safeParseRequest', () => {
    it('should return success: true', () => {
      expect(RefundValidator.safeParseRequest({ paymentId: VALID_PAYMENT_ID }).success).toBe(
        true,
      );
    });

    it('should return success: false', () => {
      expect(RefundValidator.safeParseRequest({ paymentId: 'bad' }).success).toBe(false);
    });
  });
});
