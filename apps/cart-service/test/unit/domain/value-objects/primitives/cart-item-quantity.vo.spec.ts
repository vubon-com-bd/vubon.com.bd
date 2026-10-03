/**
 * CartItemQuantityVO — Unit Tests
 */
import { CartItemQuantityVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CART_LIMIT } from '@vubon/shared-constants/business/cart';

describe('CartItemQuantityVO', () => {
  describe('create()', () => {
    it('creates VO from valid integer', () => {
      const vo = CartItemQuantityVO.create(5);
      expect(vo.value).toBe(5);
    });

    it('accepts minimum quantity', () => {
      expect(CartItemQuantityVO.create(CART_LIMIT.MIN_QUANTITY_PER_ITEM).value).toBe(
        CART_LIMIT.MIN_QUANTITY_PER_ITEM,
      );
    });

    it('accepts maximum quantity', () => {
      expect(CartItemQuantityVO.create(CART_LIMIT.MAX_QUANTITY_PER_ITEM).value).toBe(
        CART_LIMIT.MAX_QUANTITY_PER_ITEM,
      );
    });

    it('throws on zero', () => {
      expect(() => CartItemQuantityVO.create(0)).toThrow();
    });

    it('throws on negative', () => {
      expect(() => CartItemQuantityVO.create(-1)).toThrow();
    });

    it('throws on float', () => {
      expect(() => CartItemQuantityVO.create(2.5)).toThrow();
    });

    it('throws on NaN', () => {
      expect(() => CartItemQuantityVO.create(NaN)).toThrow();
    });

    it('throws on Infinity', () => {
      expect(() => CartItemQuantityVO.create(Infinity)).toThrow();
    });

    it('throws when exceeding max', () => {
      expect(() => CartItemQuantityVO.create(CART_LIMIT.MAX_QUANTITY_PER_ITEM + 1)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CartItemQuantityVO.reconstitute(999999);
      expect(vo.value).toBe(999999);
    });
  });

  describe('add()', () => {
    it('sums two quantities', () => {
      const a = CartItemQuantityVO.create(2);
      const b = CartItemQuantityVO.create(3);
      expect(a.add(b).value).toBe(5);
    });

    it('throws if result exceeds max', () => {
      const a = CartItemQuantityVO.create(CART_LIMIT.MAX_QUANTITY_PER_ITEM);
      const b = CartItemQuantityVO.create(1);
      expect(() => a.add(b)).toThrow();
    });
  });

  describe('subtract()', () => {
    it('subtracts two quantities', () => {
      const a = CartItemQuantityVO.create(5);
      const b = CartItemQuantityVO.create(2);
      expect(a.subtract(b).value).toBe(3);
    });

    it('throws when result below min', () => {
      const a = CartItemQuantityVO.create(1);
      const b = CartItemQuantityVO.create(1);
      expect(() => a.subtract(b)).toThrow();
    });
  });

  describe('exceedsMax()', () => {
    it('false when within max', () => {
      expect(CartItemQuantityVO.create(5).exceedsMax()).toBe(false);
    });

    it('true when over max (reconstituted)', () => {
      const vo = CartItemQuantityVO.reconstitute(CART_LIMIT.MAX_QUANTITY_PER_ITEM + 1);
      expect(vo.exceedsMax()).toBe(true);
    });
  });

  describe('isZero / isPositive getters', () => {
    it('isZero is false for positive value', () => {
      expect(CartItemQuantityVO.create(1).isZero).toBe(false);
    });

    it('isPositive is true for positive value', () => {
      expect(CartItemQuantityVO.create(1).isPositive).toBe(true);
    });

    it('isZero is true for reconstituted 0', () => {
      expect(CartItemQuantityVO.reconstitute(0).isZero).toBe(true);
    });

    it('isPositive is false for reconstituted 0', () => {
      expect(CartItemQuantityVO.reconstitute(0).isPositive).toBe(false);
    });
  });

  describe('toNumber()', () => {
    it('returns numeric value', () => {
      expect(CartItemQuantityVO.create(5).toNumber()).toBe(5);
    });
  });
});
