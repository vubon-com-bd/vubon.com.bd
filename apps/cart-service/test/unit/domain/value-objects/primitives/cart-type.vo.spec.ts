/**
 * CartTypeVO — Unit Tests
 */
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CART_TYPE } from '@vubon/shared-constants/business/cart';

describe('CartTypeVO', () => {
  describe('create()', () => {
    it('accepts each valid CART_TYPE value', () => {
      Object.values(CART_TYPE).forEach((t) => {
        const vo = CartTypeVO.create(t);
        expect(vo.value).toBe(t);
      });
    });

    it('throws on invalid type', () => {
      expect(() => CartTypeVO.create('not-a-type')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CartTypeVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('accepts value without validation', () => {
      const vo = CartTypeVO.reconstitute('custom');
      expect(vo.value).toBe('custom');
    });
  });

  describe('query methods', () => {
    it('isGuest() true only for guest', () => {
      expect(CartTypeVO.create(CART_TYPE.GUEST).isGuest()).toBe(true);
      expect(CartTypeVO.create(CART_TYPE.USER).isGuest()).toBe(false);
    });

    it('isUser() true only for user', () => {
      expect(CartTypeVO.create(CART_TYPE.USER).isUser()).toBe(true);
      expect(CartTypeVO.create(CART_TYPE.GUEST).isUser()).toBe(false);
    });

    it('isWishlist() true only for wishlist', () => {
      expect(CartTypeVO.create(CART_TYPE.WISHLIST).isWishlist()).toBe(true);
    });

    it('isSaved() true only for saved', () => {
      expect(CartTypeVO.create(CART_TYPE.SAVED).isSaved()).toBe(true);
    });

    it('isSubscription() true only for subscription', () => {
      expect(CartTypeVO.create(CART_TYPE.SUBSCRIPTION).isSubscription()).toBe(true);
    });
  });
});
