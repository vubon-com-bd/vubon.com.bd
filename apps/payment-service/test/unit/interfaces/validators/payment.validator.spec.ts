/**
 * PaymentHttpValidator — unit tests (ESM-safe mocking)
 */
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';

const validateInitiate = jest.fn();
const validateVerify = jest.fn();

jest.unstable_mockModule('@application/validators/payment.validator', () => ({
  PaymentValidator: {
    validateInitiate: (...args: unknown[]) => validateInitiate(...args),
    validateVerify: (...args: unknown[]) => validateVerify(...args),
  },
}));

let PaymentHttpValidator: typeof import('@interfaces/validators/payment.validator').PaymentHttpValidator;

beforeAll(async () => {
  const mod = await import('@interfaces/validators/payment.validator');
  PaymentHttpValidator = mod.PaymentHttpValidator;
});

describe('PaymentHttpValidator', () => {
  beforeEach(() => {
    validateInitiate.mockReset();
    validateVerify.mockReset();
  });

  describe('validateInitiate', () => {
    it('passes when app validator passes', () => {
      validateInitiate.mockImplementation(() => undefined);
      expect(() => PaymentHttpValidator.validateInitiate({})).not.toThrow();
      expect(validateInitiate).toHaveBeenCalledTimes(1);
    });

    it('throws BadRequest on Error', () => {
      validateInitiate.mockImplementation(() => {
        throw new Error('Invalid amount');
      });
      expect(() => PaymentHttpValidator.validateInitiate({})).toThrow('Invalid amount');
    });

    it('throws fallback on non-Error', () => {
      validateInitiate.mockImplementation(() => {
        throw 'string error';
      });
      expect(() => PaymentHttpValidator.validateInitiate({})).toThrow('Invalid payment payload');
    });
  });

  describe('validateVerify', () => {
    it('passes when app validator passes', () => {
      validateVerify.mockImplementation(() => undefined);
      expect(() => PaymentHttpValidator.validateVerify({})).not.toThrow();
    });

    it('throws BadRequest on failure', () => {
      validateVerify.mockImplementation(() => {
        throw new Error('bad verify');
      });
      expect(() => PaymentHttpValidator.validateVerify({})).toThrow('bad verify');
    });
  });
});
