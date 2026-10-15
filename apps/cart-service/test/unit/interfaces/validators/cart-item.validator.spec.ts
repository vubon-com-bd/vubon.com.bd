/**
 * CartItemHttpValidator — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { CartItemHttpValidator } from '../../../../src/module/interfaces/validators/cart-item.validator.js';

const CART_ID = '11111111-1111-1111-1111-111111111111';
const ITEM_ID = '22222222-2222-2222-2222-222222222222';
const PRODUCT_ID = '44444444-4444-4444-4444-444444444444';

describe('CartItemHttpValidator', () => {
  describe('validateAdd', () => {
    it('should accept valid add', () => {
      expect(() =>
        CartItemHttpValidator.validateAdd({
          cartId: CART_ID,
          productId: PRODUCT_ID,
          quantity: 2,
        }),
      ).not.toThrow();
    });

    it('should throw on missing productId', () => {
      expect(() =>
        CartItemHttpValidator.validateAdd({ cartId: CART_ID, quantity: 2 }),
      ).toThrow(BadRequestException);
    });

    it('should throw on quantity < 1', () => {
      expect(() =>
        CartItemHttpValidator.validateAdd({
          cartId: CART_ID,
          productId: PRODUCT_ID,
          quantity: 0,
        }),
      ).toThrow(BadRequestException);
    });

    it('should throw on quantity > 999', () => {
      expect(() =>
        CartItemHttpValidator.validateAdd({
          cartId: CART_ID,
          productId: PRODUCT_ID,
          quantity: 1000,
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateUpdate', () => {
    it('should accept valid update', () => {
      expect(() =>
        CartItemHttpValidator.validateUpdate({
          cartId: CART_ID,
          itemId: ITEM_ID,
          quantity: 3,
        }),
      ).not.toThrow();
    });
  });

  describe('validateRemove', () => {
    it('should accept valid', () => {
      expect(() =>
        CartItemHttpValidator.validateRemove({
          cartId: CART_ID,
          itemId: ITEM_ID,
        }),
      ).not.toThrow();
    });
  });

  describe('validateQuantity', () => {
    it('should accept valid quantity', () => {
      expect(() =>
        CartItemHttpValidator.validateQuantity({
          cartId: CART_ID,
          itemId: ITEM_ID,
          quantity: 5,
        }),
      ).not.toThrow();
    });
  });

  describe('validateSelect', () => {
    it('should accept valid select', () => {
      expect(() =>
        CartItemHttpValidator.validateSelect({
          cartId: CART_ID,
          itemIds: [ITEM_ID],
          selected: true,
        }),
      ).not.toThrow();
    });
  });

  describe('validateMoveToSaved', () => {
    it('should accept valid move', () => {
      expect(() =>
        CartItemHttpValidator.validateMoveToSaved({
          cartId: CART_ID,
          itemId: ITEM_ID,
        }),
      ).not.toThrow();
    });
  });
});
