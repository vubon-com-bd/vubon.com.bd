/**
 * WebhookHttpValidator — unit tests (ESM-safe)
 */
import { describe, it, expect, jest, beforeEach, beforeAll } from '@jest/globals';

const validateProvider = jest.fn();
const validateBkash = jest.fn();
const validateNagad = jest.fn();
const validateStripe = jest.fn();
const validateSslcommerz = jest.fn();

jest.unstable_mockModule('@application/validators/webhook.validator', () => ({
  WebhookValidator: {
    validateProvider: (...args: unknown[]) => validateProvider(...args),
    validateBkash: (...args: unknown[]) => validateBkash(...args),
    validateNagad: (...args: unknown[]) => validateNagad(...args),
    validateStripe: (...args: unknown[]) => validateStripe(...args),
    validateSslcommerz: (...args: unknown[]) => validateSslcommerz(...args),
  },
}));

let WebhookHttpValidator: typeof import('@interfaces/validators/webhook.validator').WebhookHttpValidator;

beforeAll(async () => {
  const mod = await import('@interfaces/validators/webhook.validator');
  WebhookHttpValidator = mod.WebhookHttpValidator;
});

describe('WebhookHttpValidator', () => {
  beforeEach(() => {
    validateProvider.mockReset();
    validateBkash.mockReset();
    validateNagad.mockReset();
    validateStripe.mockReset();
    validateSslcommerz.mockReset();
  });

  describe('validateProvider', () => {
    it('returns provider when valid', () => {
      validateProvider.mockImplementation(() => 'bkash');
      const result = WebhookHttpValidator.validateProvider('bkash');
      expect(result).toBe('bkash');
    });

    it('throws BadRequest on invalid provider', () => {
      validateProvider.mockImplementation(() => {
        throw new Error('Unknown provider');
      });
      expect(() => WebhookHttpValidator.validateProvider('invalid')).toThrow('Unknown provider');
    });
  });

  describe('validatePayload', () => {
    it('validates bkash payload', () => {
      validateBkash.mockImplementation(() => ({}));
      expect(() => WebhookHttpValidator.validatePayload('bkash', {})).not.toThrow();
      expect(validateBkash).toHaveBeenCalled();
    });

    it('validates nagad payload', () => {
      validateNagad.mockImplementation(() => ({}));
      expect(() => WebhookHttpValidator.validatePayload('nagad', {})).not.toThrow();
    });

    it('validates stripe payload', () => {
      validateStripe.mockImplementation(() => ({}));
      expect(() => WebhookHttpValidator.validatePayload('stripe', {})).not.toThrow();
    });

    it('validates sslcommerz payload', () => {
      validateSslcommerz.mockImplementation(() => ({}));
      expect(() => WebhookHttpValidator.validatePayload('sslcommerz', {})).not.toThrow();
    });
  });
});
