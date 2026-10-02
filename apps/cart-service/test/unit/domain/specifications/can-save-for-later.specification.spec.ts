/**
 * CanSaveForLaterSpecification — Unit Tests
 */
import { CanSaveForLaterSpecification } from '../../../../src/module/domain/specifications/can-save-for-later.specification.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const P = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const OTHER_USER = '00000000-0000-0000-0000-000000000002';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeItem(id = 'i1', status = CART_ITEM_STATUS.ACTIVE) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(P),
      sku: 'SKU',
      name: 'Item',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(2),
      discountAmount: 0,
      status: CartItemStatusVO.create(status),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

function makeCart(opts: { items?: CartItemEntity[]; userId?: string } = {}) {
  return CartEntity.create({
    id: P,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(opts.userId ?? USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
}

describe('CanSaveForLaterSpecification', () => {
  const spec = new CanSaveForLaterSpecification();

  describe('isSatisfiedBy()', () => {
    it('true for active item with matching user', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart(),
        item: makeItem(),
        ctx: { userId: CartUserIdVO.create(USER), existingSavedCount: 0 },
      });
      expect(r).toBe(true);
    });

    it('false when cart belongs to another user', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart({ userId: OTHER_USER }),
        item: makeItem(),
        ctx: { userId: CartUserIdVO.create(USER), existingSavedCount: 0 },
      });
      expect(r).toBe(false);
    });

    it('false when item already removed', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart(),
        item: makeItem('i1', CART_ITEM_STATUS.REMOVED),
        ctx: { userId: CartUserIdVO.create(USER), existingSavedCount: 0 },
      });
      expect(r).toBe(false);
    });

    it('false when saved limit reached', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart(),
        item: makeItem(),
        ctx: {
          userId: CartUserIdVO.create(USER),
          existingSavedCount: 100,
          maxSavedItems: 100,
        },
      });
      expect(r).toBe(false);
    });

    it('uses default max of 100', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart(),
        item: makeItem(),
        ctx: { userId: CartUserIdVO.create(USER), existingSavedCount: 100 },
      });
      expect(r).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      const r = spec.explain({
        cart: makeCart(),
        item: makeItem(),
        ctx: { userId: CartUserIdVO.create(USER), existingSavedCount: 0 },
      });
      expect(r).toBeNull();
    });

    it('"user mismatch"', () => {
      const r = spec.explain({
        cart: makeCart({ userId: OTHER_USER }),
        item: makeItem(),
        ctx: { userId: CartUserIdVO.create(USER), existingSavedCount: 0 },
      });
      expect(r).toBe('user mismatch');
    });

    it('"item already removed"', () => {
      const r = spec.explain({
        cart: makeCart(),
        item: makeItem('i1', CART_ITEM_STATUS.REMOVED),
        ctx: { userId: CartUserIdVO.create(USER), existingSavedCount: 0 },
      });
      expect(r).toBe('item already removed');
    });
  });
});
