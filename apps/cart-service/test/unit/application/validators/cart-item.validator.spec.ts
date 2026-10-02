/**
 * CartItemValidator — Unit Tests
 */
import { CartItemValidator } from '../../../../src/module/application/validators/cart-item.validator.js';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';

const validInput = {
  productId: 'p-1',
  quantity: 2,
  unitPrice: 100,
};

describe('CartItemValidator', () => {
  describe('validateAdd()', () => {
    it('accepts valid input', () => {
      expect(() => CartItemValidator.validateAdd(validInput)).not.toThrow();
    });

    it('throws on empty productId', () => {
      expect(() =>
        CartItemValidator.validateAdd({ ...validInput, productId: '' }),
      ).toThrow();
    });

    it('throws on non-integer quantity', () => {
      expect(() =>
        CartItemValidator.validateAdd({ ...validInput, quantity: 1.5 }),
      ).toThrow();
    });

    it('throws on zero quantity', () => {
      expect(() => CartItemValidator.validateAdd({ ...validInput, quantity: 0 })).toThrow();
    });

    it('throws on quantity above max', () => {
      expect(() =>
        CartItemValidator.validateAdd({
          ...validInput,
          quantity: CART_LIMIT.MAX_QUANTITY_PER_ITEM + 1,
        }),
      ).toThrow();
    });

    it('throws on negative unit price', () => {
      expect(() =>
        CartItemValidator.validateAdd({ ...validInput, unitPrice: -1 }),
      ).toThrow();
    });

    it('throws on invalid currency', () => {
      expect(() =>
        CartItemValidator.validateAdd({ ...validInput, currency: 'BD' }),
      ).toThrow();
    });

    it('accepts valid currency', () => {
      expect(() =>
        CartItemValidator.validateAdd({ ...validInput, currency: 'BDT' }),
      ).not.toThrow();
    });
  });
});
