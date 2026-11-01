/**
 * WebhookValidator — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { WebhookValidator } from '@application/validators/webhook.validator';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

describe('WebhookValidator', () => {
  describe('validateProvider', () => {
    it('should accept all supported providers', () => {
      expect(WebhookValidator.validateProvider('bkash')).toBe('bkash');
      expect(WebhookValidator.validateProvider('nagad')).toBe('nagad');
      expect(WebhookValidator.validateProvider('stripe')).toBe('stripe');
      expect(WebhookValidator.validateProvider('sslcommerz')).toBe('sslcommerz');
    });

    it('should throw on unsupported provider', () => {
      expect(() => WebhookValidator.validateProvider('paypal')).toThrow(
        ApplicationValidationError,
      );
    });
  });

  describe('validateBkash', () => {
    it('should accept valid bkash payload', () => {
      const result = WebhookValidator.validateBkash({
        trxID: 'TX123',
        amount: '1000',
        transactionStatus: 'Completed',
      });
      expect(result.trxID).toBe('TX123');
    });

    it('should throw on missing trxID', () => {
      expect(() =>
        WebhookValidator.validateBkash({ amount: '1000', transactionStatus: 'Completed' }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on missing amount', () => {
      expect(() =>
        WebhookValidator.validateBkash({ trxID: 'TX', transactionStatus: 'Completed' }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on non-object payload', () => {
      expect(() => WebhookValidator.validateBkash(null)).toThrow(ApplicationValidationError);
      expect(() => WebhookValidator.validateBkash('string')).toThrow(ApplicationValidationError);
    });
  });

  describe('validateNagad', () => {
    it('should accept valid nagad payload', () => {
      const result = WebhookValidator.validateNagad({
        orderId: 'ORD1',
        amount: '500',
        status: 'Success',
      });
      expect(result.orderId).toBe('ORD1');
    });

    it('should throw on missing fields', () => {
      expect(() => WebhookValidator.validateNagad({ orderId: 'ORD1' })).toThrow(
        ApplicationValidationError,
      );
    });
  });

  describe('validateStripe', () => {
    it('should accept valid stripe payload', () => {
      const result = WebhookValidator.validateStripe({
        id: 'evt_123',
        type: 'payment_intent.succeeded',
      });
      expect(result.id).toBe('evt_123');
    });

    it('should throw on missing type', () => {
      expect(() => WebhookValidator.validateStripe({ id: 'evt_123' })).toThrow(
        ApplicationValidationError,
      );
    });
  });

  describe('validateSslcommerz', () => {
    it('should accept valid payload', () => {
      const result = WebhookValidator.validateSslcommerz({
        tran_id: 'T123',
        amount: '750',
        status: 'VALID',
      });
      expect(result.tran_id).toBe('T123');
    });

    it('should throw on missing amount', () => {
      expect(() =>
        WebhookValidator.validateSslcommerz({ tran_id: 'T123', status: 'VALID' }),
      ).toThrow(ApplicationValidationError);
    });
  });
});
