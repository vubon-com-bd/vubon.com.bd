/**
 * CartItemStatusVO — Unit Tests
 */
import { CartItemStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

describe('CartItemStatusVO', () => {
  describe('create()', () => {
    it('accepts each valid status', () => {
      Object.values(CART_ITEM_STATUS).forEach((s) => {
        const vo = CartItemStatusVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid status', () => {
      expect(() => CartItemStatusVO.create('invalid')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CartItemStatusVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CartItemStatusVO.reconstitute('custom');
      expect(vo.value).toBe('custom');
    });
  });

  describe('query methods', () => {
    it('isRemoved() true only for removed', () => {
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.REMOVED).isRemoved()).toBe(true);
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE).isRemoved()).toBe(false);
    });

    it('isOutOfStock() true only for out_of_stock', () => {
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.OUT_OF_STOCK).isOutOfStock()).toBe(true);
    });

    it('isUnavailable() true only for unavailable', () => {
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.UNAVAILABLE).isUnavailable()).toBe(true);
    });

    it('isSaved() true only for saved', () => {
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.SAVED).isSaved()).toBe(true);
    });

    it('isPurchasable() true only for active', () => {
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE).isPurchasable()).toBe(true);
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.REMOVED).isPurchasable()).toBe(false);
      expect(CartItemStatusVO.create(CART_ITEM_STATUS.OUT_OF_STOCK).isPurchasable()).toBe(false);
    });
  });
});
