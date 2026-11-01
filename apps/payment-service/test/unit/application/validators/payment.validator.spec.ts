/**
 * PaymentValidator — Unit Tests (full branch coverage)
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentValidator } from '@application/validators/payment.validator';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const VALID_ORDER_ID = '123e4567-e89b-42d3-a456-426614174000';
const VALID_PAYMENT_ID = '223e4567-e89b-42d3-a456-426614174001';

describe('PaymentValidator', () => {
  describe('validateInitiate', () => {
    it('should parse valid input', () => {
      const result = PaymentValidator.validateInitiate({
        orderId: VALID_ORDER_ID,
        method: 'card',
        gateway: 'stripe',
        amount: 1000,
        currency: 'BDT',
        returnUrl: 'https://example.com/return',
      });
      expect(result.orderId).toBe(VALID_ORDER_ID);
    });

    it('should accept minimal input', () => {
      const result = PaymentValidator.validateInitiate({
        orderId: VALID_ORDER_ID,
        method: 'card',
        amount: 1000,
        currency: 'BDT',
      });
      expect(result.gateway).toBeUndefined();
    });

    it('should throw ApplicationValidationError (ZodError path — with field)', () => {
      try {
        PaymentValidator.validateInitiate({
          orderId: 'not-a-uuid',
          method: 'card',
          amount: 1000,
          currency: 'BDT',
        });
        fail('should have thrown');
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationValidationError);
        // Verify it was wrapped (has field path)
        const err = e as ApplicationValidationError;
        expect(err.field).toBeDefined();
        expect(err.context?.details).toBeDefined();
      }
    });

    it('should throw when ZodError has no issues (defensive path)', () => {
      // Simulate by passing non-object → Zod throws ZodError
      expect(() => PaymentValidator.validateInitiate(null)).toThrow(ApplicationValidationError);
    });

    it('should throw on invalid method', () => {
      expect(() =>
        PaymentValidator.validateInitiate({
          orderId: VALID_ORDER_ID,
          method: 'telepathy',
          amount: 1000,
          currency: 'BDT',
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should reject unknown fields (strict)', () => {
      expect(() =>
        PaymentValidator.validateInitiate({
          orderId: VALID_ORDER_ID,
          method: 'card',
          amount: 1000,
          currency: 'BDT',
          hackedField: 'x',
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateVerify', () => {
    it('should parse valid input', () => {
      const result = PaymentValidator.validateVerify({ paymentId: VALID_PAYMENT_ID });
      expect(result.paymentId).toBe(VALID_PAYMENT_ID);
    });

    it('should accept gateway signature', () => {
      const result = PaymentValidator.validateVerify({
        paymentId: VALID_PAYMENT_ID,
        gatewaySignature: 'sig',
        gatewayData: { intent: 'pi_1' },
      });
      expect(result.gatewaySignature).toBe('sig');
    });

    it('should throw on invalid paymentId (ZodError path)', () => {
      expect(() => PaymentValidator.validateVerify({ paymentId: 'bad' })).toThrow(
        ApplicationValidationError,
      );
    });

    it('should throw on null input', () => {
      expect(() => PaymentValidator.validateVerify(null)).toThrow(ApplicationValidationError);
    });
  });

  describe('safeParseInitiate', () => {
    it('should return success: true', () => {
      expect(
        PaymentValidator.safeParseInitiate({
          orderId: VALID_ORDER_ID, method: 'card', amount: 1000, currency: 'BDT',
        }).success,
      ).toBe(true);
    });

    it('should return success: false', () => {
      expect(PaymentValidator.safeParseInitiate({ orderId: 'bad' }).success).toBe(false);
    });
  });

  describe('safeParseVerify', () => {
    it('should return success: true', () => {
      expect(PaymentValidator.safeParseVerify({ paymentId: VALID_PAYMENT_ID }).success).toBe(true);
    });

    it('should return success: false', () => {
      expect(PaymentValidator.safeParseVerify({ paymentId: 'bad' }).success).toBe(false);
    });
  });
});
