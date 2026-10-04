/**
 * CartValidator — Unit Tests
 */
import { CartValidator } from '../../../../src/module/application/validators/cart.validator.js';

describe('CartValidator', () => {
  describe('validateCreate()', () => {
    it('accepts valid input', () => {
      expect(() =>
        CartValidator.validateCreate({ type: 'user', userId: 'abc' }),
      ).not.toThrow();
    });

    it('accepts guest cart without userId', () => {
      expect(() => CartValidator.validateCreate({ type: 'guest' })).not.toThrow();
    });

    it('throws on invalid type', () => {
      expect(() => CartValidator.validateCreate({ type: 'invalid' })).toThrow();
    });

    it('throws when guest cart has userId', () => {
      expect(() =>
        CartValidator.validateCreate({ type: 'guest', userId: 'abc' }),
      ).toThrow();
    });

    it('throws when user cart has no userId', () => {
      expect(() => CartValidator.validateCreate({ type: 'user' })).toThrow();
    });

    it('throws on invalid currency length', () => {
      expect(() =>
        CartValidator.validateCreate({ type: 'user', userId: 'x', currency: 'BD' }),
      ).toThrow();
    });

    it('accepts 3-letter currency', () => {
      expect(() =>
        CartValidator.validateCreate({ type: 'user', userId: 'x', currency: 'BDT' }),
      ).not.toThrow();
    });

    it('accepts empty input (no type)', () => {
      expect(() => CartValidator.validateCreate({})).not.toThrow();
    });
  });
});
