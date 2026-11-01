/**
 * CartHttpValidator — Unit Tests
 * @module test/unit/interfaces/validators
 */
import { describe, it, expect } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { CartHttpValidator } from '../../../../src/module/interfaces/validators/cart.validator.js';

describe('CartHttpValidator', () => {
  describe('validateCreate', () => {
    it('should accept valid input', () => {
      expect(() =>
        CartHttpValidator.validateCreate({
          type: 'user',
          currency: 'BDT',
        }),
      ).not.toThrow();
    });

    it('should accept empty input (all optional)', () => {
      expect(() => CartHttpValidator.validateCreate({})).not.toThrow();
    });

    it('should throw BadRequestException on invalid type', () => {
      try {
        CartHttpValidator.validateCreate({ type: 'invalid-type' });
        fail('should have thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });

    it('should throw BadRequestException on invalid currency length', () => {
      try {
        CartHttpValidator.validateCreate({ currency: 'BD' });
        fail('should have thrown');
      } catch (err) {
        expect(err).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('validateUpdate', () => {
    it('should accept valid update', () => {
      expect(() =>
        CartHttpValidator.validateUpdate({
          cartId: '11111111-1111-1111-1111-111111111111',
          notes: 'test',
        }),
      ).not.toThrow();
    });

    it('should throw on missing required cartId', () => {
      expect(() => CartHttpValidator.validateUpdate({ notes: 'test' })).toThrow(
        BadRequestException,
      );
    });
  });

  describe('validateClear', () => {
    it('should accept valid', () => {
      expect(() =>
        CartHttpValidator.validateClear({
          cartId: '11111111-1111-1111-1111-111111111111',
        }),
      ).not.toThrow();
    });
  });

  describe('validateDelete', () => {
    it('should accept valid', () => {
      expect(() =>
        CartHttpValidator.validateDelete({
          cartId: '11111111-1111-1111-1111-111111111111',
        }),
      ).not.toThrow();
    });
  });

  describe('validateRecover', () => {
    it('should accept valid', () => {
      expect(() =>
        CartHttpValidator.validateRecover({
          abandonedCartId: '11111111-1111-1111-1111-111111111111',
        }),
      ).not.toThrow();
    });

    it('should throw on missing abandonedCartId', () => {
      expect(() => CartHttpValidator.validateRecover({})).toThrow(BadRequestException);
    });
  });
});
