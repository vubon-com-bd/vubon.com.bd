import { PaymentValidator } from '../../../../src/module/application/validators/payment.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('PaymentValidator', () => {
  describe('validateInitiate', () => {
    it('passes valid input', () => {
      const out = PaymentValidator.validateInitiate({
        orderId: UUID,
        method: 'mobile_banking',
        amount: 1000,
        currency: 'BDT',
      });
      expect(out.orderId).toBe(UUID);
      expect(out.amount).toBe(1000);
    });

    it('throws on missing orderId', () => {
      expect(() =>
        PaymentValidator.validateInitiate({
          method: 'mobile_banking',
          amount: 1000,
          currency: 'BDT',
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('throws on invalid UUID', () => {
      expect(() =>
        PaymentValidator.validateInitiate({
          orderId: 'not-uuid',
          method: 'mobile_banking',
          amount: 1000,
          currency: 'BDT',
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('throws on zero amount', () => {
      expect(() =>
        PaymentValidator.validateInitiate({
          orderId: UUID,
          method: 'mobile_banking',
          amount: 0,
          currency: 'BDT',
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('throws on invalid currency length', () => {
      expect(() =>
        PaymentValidator.validateInitiate({
          orderId: UUID,
          method: 'mobile_banking',
          amount: 1000,
          currency: 'BD',
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateVerify', () => {
    it('passes valid input', () => {
      const out = PaymentValidator.validateVerify({ paymentId: UUID });
      expect(out.paymentId).toBe(UUID);
    });

    it('throws on missing paymentId', () => {
      expect(() => PaymentValidator.validateVerify({})).toThrow(ApplicationValidationError);
    });
  });

  describe('validateRefund', () => {
    it('passes valid input', () => {
      const out = PaymentValidator.validateRefund({
        paymentId: UUID,
        amount: 500,
        reason: 'damaged',
      });
      expect(out.paymentId).toBe(UUID);
      expect(out.amount).toBe(500);
    });

    it('throws on missing paymentId', () => {
      expect(() => PaymentValidator.validateRefund({ amount: 500 })).toThrow(
        ApplicationValidationError,
      );
    });
  });
});
