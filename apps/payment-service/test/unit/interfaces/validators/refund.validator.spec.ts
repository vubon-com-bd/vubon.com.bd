/**
 * RefundHttpValidator — unit tests (ESM-safe)
 */
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';

const validateRequest = jest.fn();

jest.unstable_mockModule('@application/validators/refund.validator', () => ({
  RefundValidator: {
    validateRequest: (...args: unknown[]) => validateRequest(...args),
  },
}));

let RefundHttpValidator: typeof import('@interfaces/validators/refund.validator').RefundHttpValidator;

beforeAll(async () => {
  const mod = await import('@interfaces/validators/refund.validator');
  RefundHttpValidator = mod.RefundHttpValidator;
});

describe('RefundHttpValidator', () => {
  beforeEach(() => {
    validateRequest.mockReset();
  });

  it('passes when app validator passes', () => {
    validateRequest.mockImplementation(() => undefined);
    expect(() => RefundHttpValidator.validateRequest({})).not.toThrow();
  });

  it('throws on invalid', () => {
    validateRequest.mockImplementation(() => {
      throw new Error('Invalid refund');
    });
    expect(() => RefundHttpValidator.validateRequest({})).toThrow('Invalid refund');
  });

  it('throws fallback on non-Error', () => {
    validateRequest.mockImplementation(() => {
      throw 'x';
    });
    expect(() => RefundHttpValidator.validateRequest({})).toThrow('Invalid refund payload');
  });
});
