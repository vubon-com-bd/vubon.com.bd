/**
 * SubscriptionHttpValidator — unit tests (ESM-safe)
 */
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';

const validateCreate = jest.fn();

jest.unstable_mockModule('@application/validators/subscription.validator', () => ({
  SubscriptionValidator: {
    validateCreate: (...args: unknown[]) => validateCreate(...args),
  },
}));

let SubscriptionHttpValidator: typeof import('@interfaces/validators/subscription.validator').SubscriptionHttpValidator;

beforeAll(async () => {
  const mod = await import('@interfaces/validators/subscription.validator');
  SubscriptionHttpValidator = mod.SubscriptionHttpValidator;
});

describe('SubscriptionHttpValidator', () => {
  beforeEach(() => {
    validateCreate.mockReset();
  });

  it('passes when app validator passes', () => {
    validateCreate.mockImplementation(() => undefined);
    expect(() => SubscriptionHttpValidator.validateCreate({})).not.toThrow();
  });

  it('throws on invalid', () => {
    validateCreate.mockImplementation(() => {
      throw new Error('Invalid plan');
    });
    expect(() => SubscriptionHttpValidator.validateCreate({})).toThrow('Invalid plan');
  });

  it('throws fallback on non-Error', () => {
    validateCreate.mockImplementation(() => {
      throw 'x';
    });
    expect(() => SubscriptionHttpValidator.validateCreate({})).toThrow('Invalid subscription payload');
  });
});
