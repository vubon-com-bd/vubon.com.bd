import { describe, it, expect } from '@jest/globals';
import { CartItemValidator } from '../../../../src/module/application/validators/cart-item.validator.js';
import { ApplicationValidationError } from '@vubon/shared-kernel/application/errors/validation.error';

const UUID = '123e4567-e89b-12d3-a456-426614174000';
const UUID2 = '223e4567-e89b-12d3-a456-426614174000';

describe('CartItemValidator', () => {
  describe('validateAdd', () => {
    it('should parse valid add input', () => {
      const result = CartItemValidator.validateAdd({
        cartId: UUID,
        productId: UUID2,
        quantity: 2,
      });
      expect(result.quantity).toBe(2);
    });

    it('should default cartType to user', () => {
      const result = CartItemValidator.validateAdd({
        cartId: UUID,
        productId: UUID2,
        quantity: 1,
      });
      expect(result.cartType).toBe('user');
    });

    it('should throw on quantity below 1', () => {
      expect(() =>
        CartItemValidator.validateAdd({
          cartId: UUID,
          productId: UUID2,
          quantity: 0,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on quantity above 999', () => {
      expect(() =>
        CartItemValidator.validateAdd({
          cartId: UUID,
          productId: UUID2,
          quantity: 1000,
        }),
      ).toThrow(ApplicationValidationError);
    });

    it('should throw on invalid productId', () => {
      expect(() =>
        CartItemValidator.validateAdd({
          cartId: UUID,
          productId: 'bad',
          quantity: 1,
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateUpdate', () => {
    it('should parse update with quantity', () => {
      const result = CartItemValidator.validateUpdate({
        cartId: UUID,
        itemId: UUID2,
        quantity: 5,
      });
      expect(result.quantity).toBe(5);
    });

    it('should parse update with note', () => {
      const result = CartItemValidator.validateUpdate({
        cartId: UUID,
        itemId: UUID2,
        note: 'important',
      });
      expect(result.note).toBe('important');
    });

    it('should throw when no update field provided', () => {
      expect(() =>
        CartItemValidator.validateUpdate({ cartId: UUID, itemId: UUID2 }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateRemove', () => {
    it('should parse valid remove', () => {
      const result = CartItemValidator.validateRemove({
        cartId: UUID,
        itemId: UUID2,
      });
      expect(result.itemId).toBe(UUID2);
    });

    it('should throw on invalid UUID', () => {
      expect(() =>
        CartItemValidator.validateRemove({ cartId: UUID, itemId: 'bad' }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateQuantity', () => {
    it('should parse valid quantity update', () => {
      const result = CartItemValidator.validateQuantity({
        cartId: UUID,
        itemId: UUID2,
        quantity: 3,
      });
      expect(result.quantity).toBe(3);
    });

    it('should throw on non-integer quantity', () => {
      expect(() =>
        CartItemValidator.validateQuantity({
          cartId: UUID,
          itemId: UUID2,
          quantity: 1.5,
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateSelect', () => {
    it('should parse valid select', () => {
      const result = CartItemValidator.validateSelect({
        cartId: UUID,
        itemIds: [UUID2],
        selected: true,
      });
      expect(result.itemIds).toHaveLength(1);
    });

    it('should default selected to true', () => {
      const result = CartItemValidator.validateSelect({
        cartId: UUID,
        itemIds: [UUID2],
      });
      expect(result.selected).toBe(true);
    });

    it('should throw on empty itemIds array', () => {
      expect(() =>
        CartItemValidator.validateSelect({
          cartId: UUID,
          itemIds: [],
        }),
      ).toThrow(ApplicationValidationError);
    });
  });

  describe('validateMoveToSaved', () => {
    it('should parse valid move', () => {
      const result = CartItemValidator.validateMoveToSaved({
        cartId: UUID,
        itemId: UUID2,
        note: 'save later',
      });
      expect(result.note).toBe('save later');
    });
  });
});
