import { jest } from '@jest/globals';

import { CartItemValidator, AddItemHttpSchema, UpdateQuantityHttpSchema } from '../../../../src/module/interfaces/validators/cart-item.validator.js';

const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

const validAddInput = {
  productId: VALID_UUID,
  sku: 'SKU',
  name: 'Item',
  unitPrice: 100,
  quantity: 2,
  currency: 'BDT',
};

describe('CartItemValidator (interfaces)', () => {
  describe('validateAdd()', () => {
    it('accepts valid input', () => {
      expect(() => CartItemValidator.validateAdd(validAddInput)).not.toThrow();
    });

    it('throws on non-UUID productId', () => {
      expect(() => CartItemValidator.validateAdd({ ...validAddInput, productId: 'x' })).toThrow();
    });

    it('throws on quantity above max', () => {
      expect(() => CartItemValidator.validateAdd({ ...validAddInput, quantity: 1000 })).toThrow();
    });

    it('throws on zero quantity', () => {
      expect(() => CartItemValidator.validateAdd({ ...validAddInput, quantity: 0 })).toThrow();
    });

    it('throws on negative price', () => {
      expect(() => CartItemValidator.validateAdd({ ...validAddInput, unitPrice: -1 })).toThrow();
    });

    it('throws on empty sku', () => {
      expect(() => CartItemValidator.validateAdd({ ...validAddInput, sku: '' })).toThrow();
    });
  });

  describe('validateQuantity()', () => {
    it('accepts valid quantity', () => {
      expect(() => CartItemValidator.validateQuantity({ quantity: 5 })).not.toThrow();
    });

    it('throws on zero quantity', () => {
      expect(() => CartItemValidator.validateQuantity({ quantity: 0 })).toThrow();
    });

    it('throws on quantity above max', () => {
      expect(() => CartItemValidator.validateQuantity({ quantity: 1000 })).toThrow();
    });
  });

  describe('schemas exported', () => {
    it('AddItemHttpSchema', () => {
      expect(AddItemHttpSchema).toBeDefined();
    });
    it('UpdateQuantityHttpSchema', () => {
      expect(UpdateQuantityHttpSchema).toBeDefined();
    });
  });
});
