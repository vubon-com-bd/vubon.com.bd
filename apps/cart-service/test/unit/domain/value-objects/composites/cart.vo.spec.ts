/**
 * CartCompositeVO — Unit Tests
 */
import { CartCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart.vo.js';
import { CartTotalsCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-totals.vo.js';
import { CartIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';
import { CartStatusVO } from '../../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CART_STATUS, CART_TYPE } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER_UUID = '00000000-0000-0000-0000-000000000001';

function baseProps() {
  return {
    id: CartIdVO.create(UUID),
    type: CartTypeVO.create(CART_TYPE.USER),
    status: CartStatusVO.create(CART_STATUS.ACTIVE),
    userId: CartUserIdVO.create(USER_UUID),
    items: [],
    totals: CartTotalsCompositeVO.empty('BDT'),
    currency: 'BDT',
    expiresAt: '2099-12-31T23:59:59Z',
    lastActivityAt: '2026-01-01T00:00:00Z',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  };
}

describe('CartCompositeVO', () => {
  describe('create()', () => {
    it('creates valid user cart', () => {
      const vo = CartCompositeVO.create(baseProps());
      expect(vo.isUserCart()).toBe(true);
    });

    it('throws when guest cart has userId', () => {
      expect(() =>
        CartCompositeVO.create({
          ...baseProps(),
          type: CartTypeVO.create(CART_TYPE.GUEST),
        }),
      ).toThrow();
    });

    it('throws when user cart has no userId', () => {
      expect(() =>
        CartCompositeVO.create({
          ...baseProps(),
          userId: undefined,
        }),
      ).toThrow();
    });
  });

  describe('isGuestCart() / isUserCart()', () => {
    it('isUserCart true for user', () => {
      expect(CartCompositeVO.create(baseProps()).isUserCart()).toBe(true);
    });

    it('isGuestCart true for guest', () => {
      const vo = CartCompositeVO.create({
        ...baseProps(),
        type: CartTypeVO.create(CART_TYPE.GUEST),
        userId: undefined,
      });
      expect(vo.isGuestCart()).toBe(true);
    });
  });

  describe('itemCount / uniqueItemCount', () => {
    it('returns 0 for empty cart', () => {
      const vo = CartCompositeVO.create(baseProps());
      expect(vo.itemCount).toBe(0);
      expect(vo.uniqueItemCount).toBe(0);
    });
  });

  describe('isExpired()', () => {
    it('true after expiresAt', () => {
      const vo = CartCompositeVO.create(baseProps());
      expect(vo.isExpired(new Date('2100-01-01T00:00:00Z'))).toBe(true);
    });

    it('false before expiresAt', () => {
      const vo = CartCompositeVO.create(baseProps());
      expect(vo.isExpired(new Date('2026-06-01T00:00:00Z'))).toBe(false);
    });
  });

  describe('isActive()', () => {
    it('true when status active', () => {
      expect(CartCompositeVO.create(baseProps()).isActive()).toBe(true);
    });

    it('false when not active', () => {
      const vo = CartCompositeVO.create({
        ...baseProps(),
        status: CartStatusVO.create(CART_STATUS.EXPIRED),
      });
      expect(vo.isActive()).toBe(false);
    });
  });

  describe('canCheckout()', () => {
    it('false when cart is empty', () => {
      expect(CartCompositeVO.create(baseProps()).canCheckout()).toBe(false);
    });

    it('false when not active', () => {
      const vo = CartCompositeVO.create({
        ...baseProps(),
        status: CartStatusVO.create(CART_STATUS.EXPIRED),
      });
      expect(vo.canCheckout()).toBe(false);
    });
  });

  describe('withStatus()', () => {
    it('returns new instance with new status', () => {
      const vo = CartCompositeVO.create(baseProps());
      const updated = vo.withStatus(CartStatusVO.create(CART_STATUS.ABANDONED));
      expect(updated.status.value).toBe(CART_STATUS.ABANDONED);
      expect(vo.status.value).toBe(CART_STATUS.ACTIVE);
    });
  });

  describe('withLastActivity()', () => {
    it('updates lastActivityAt', () => {
      const vo = CartCompositeVO.create(baseProps());
      const updated = vo.withLastActivity('2026-06-01T12:00:00Z');
      expect(updated.lastActivityAt).toBe('2026-06-01T12:00:00Z');
    });
  });

  describe('validateTotals()', () => {
    it('returns true when subtotal matches items', () => {
      const vo = CartCompositeVO.create(baseProps());
      expect(vo.validateTotals()).toBe(true);
    });
  });
});
