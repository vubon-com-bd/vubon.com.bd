import { describe, it, expect } from '@jest/globals';
import { CartValidator } from '../../../../src/module/application/validators/cart.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

describe('CartValidator', () => {
  describe('validateCreate', () => {
    it('should parse valid create input with defaults', () => {
      const result = CartValidator.validateCreate({});
      expect(result.type).toBe('user');
      expect(result.currency).toBe('BDT');
    });

    it('should parse valid create with all fields', () => {
      const result = CartValidator.validateCreate({
        type: 'guest',
        currency: 'USD',
        sessionId: 'session-abc-123456',
        notes: 'test note',
        idempotencyKey: 'idem-key-16-chars-long-abc',
      });
      expect(result.type).toBe('guest');
      expect(result.currency).toBe('USD');
    });

    it('should throw ApplicationValidationError on invalid type', () => {
      expect(() =>
        CartValidator.validateCreate({ type: 'invalid-type' }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on currency with wrong length', () => {
      expect(() =>
        CartValidator.validateCreate({ currency: 'US' }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on notes exceeding 500 chars', () => {
      expect(() =>
        CartValidator.validateCreate({ notes: 'x'.repeat(501) }),
      ).toThrow(ApplicationValidationError);
    });

    it('should include field path in error', () => {
      try {
        CartValidator.validateCreate({ type: 'bad' });
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationValidationError);
        const err = e as ApplicationValidationError;
        expect(err.field).toBe('type');
      }
    });
  });

  describe('validateUpdate', () => {
    it('should parse valid update', () => {
      const result = CartValidator.validateUpdate({
        cartId: '123e4567-e89b-12d3-a456-426614174000',
        notes: 'updated',
      });
      expect(result.notes).toBe('updated');
    });

    it('should throw when no fields provided', () => {
      expect(() =>
        CartValidator.validateUpdate({
          cartId: '123e4567-e89b-12d3-a456-426614174000',
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on invalid UUID', () => {
      expect(() =>
        CartValidator.validateUpdate({ cartId: 'not-uuid', notes: 'x' }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateClear', () => {
    it('should parse valid clear input', () => {
      const result = CartValidator.validateClear({
        cartId: '123e4567-e89b-12d3-a456-426614174000',
        reason: 'user request',
      });
      expect(result.cartId).toBe('123e4567-e89b-12d3-a456-426614174000');
    });

    it('should throw on invalid cartId', () => {
      expect(() =>
        CartValidator.validateClear({ cartId: 'bad' }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateDelete', () => {
    it('should parse valid delete input', () => {
      const result = CartValidator.validateDelete({
        cartId: '123e4567-e89b-12d3-a456-426614174000',
        hardDelete: true,
      });
      expect(result.hardDelete).toBe(true);
    });

    it('should default hardDelete to false', () => {
      const result = CartValidator.validateDelete({
        cartId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.hardDelete).toBe(false);
    });
  });

  describe('validateRecover', () => {
    it('should parse valid recover input', () => {
      const result = CartValidator.validateRecover({
        abandonedCartId: '123e4567-e89b-12d3-a456-426614174000',
        sendNotification: false,
      });
      expect(result.sendNotification).toBe(false);
    });

    it('should default sendNotification to true', () => {
      const result = CartValidator.validateRecover({
        abandonedCartId: '123e4567-e89b-12d3-a456-426614174000',
      });
      expect(result.sendNotification).toBe(true);
    });

    it('should throw on invalid recoveryDiscountPercent', () => {
      expect(() =>
        CartValidator.validateRecover({
          abandonedCartId: '123e4567-e89b-12d3-a456-426614174000',
          recoveryDiscountPercent: 150,
        }),
      ).toThrow(ApplicationValidationError);
    });
  });
});
