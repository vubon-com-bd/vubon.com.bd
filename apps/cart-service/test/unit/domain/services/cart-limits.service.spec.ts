/**
 * CartLimitsService — Unit Tests
 */
import { CartLimitsService } from '../../../../src/module/domain/services/cart-limits.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, CART_LIMIT } from '@vubon/shared-constants/business/cart';

const P = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeItem(id: string, qty = 1) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(P),
      sku: 'SKU',
      name: 'Item',
      unitPrice: 100,
      quantity: CartItemQuantityVO.create(qty),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

function makeCart(items: CartItemEntity[] = []) {
  const c = CartEntity.create({
    id: P,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: FUTURE,
      lastActivityAt: NOW,
    },
  });
  c['_items'] = items;
  return c;
}

describe('CartLimitsService', () => {
  const svc = new CartLimitsService();

  describe('constant getters', () => {
    it('maxItems returns config value', () => {
      expect(svc.maxItems()).toBe(CART_LIMIT.MAX_ITEMS);
    });

    it('maxQuantityPerItem returns config value', () => {
      expect(svc.maxQuantityPerItem()).toBe(CART_LIMIT.MAX_QUANTITY_PER_ITEM);
    });

    it('minQuantityPerItem returns config value', () => {
      expect(svc.minQuantityPerItem()).toBe(CART_LIMIT.MIN_QUANTITY_PER_ITEM);
    });
  });

  describe('canAddItem()', () => {
    it('true when below max', () => {
      expect(svc.canAddItem(makeCart([makeItem('a')])).withinLimits).toBe(true);
    });

    it('false when at max', () => {
      const items = Array.from({ length: CART_LIMIT.MAX_ITEMS }, (_, i) => makeItem(`i${i}`));
      const r = svc.canAddItem(makeCart(items));
      expect(r.withinLimits).toBe(false);
      expect(r.reason).toContain('max');
    });
  });

  describe('canSetQuantity()', () => {
    it('true within limits', () => {
      const item = makeItem('a', 5);
      expect(svc.canSetQuantity(item, 5).withinLimits).toBe(true);
    });

    it('false below min', () => {
      const item = makeItem('a', 5);
      const r = svc.canSetQuantity(item, 0);
      expect(r.withinLimits).toBe(false);
    });

    it('false above max', () => {
      const item = makeItem('a', 5);
      const r = svc.canSetQuantity(item, CART_LIMIT.MAX_QUANTITY_PER_ITEM + 1);
      expect(r.withinLimits).toBe(false);
    });
  });

  describe('assertCanAddItem()', () => {
    it('no throw when within limits', () => {
      expect(() => svc.assertCanAddItem(makeCart([makeItem('a')]))).not.toThrow();
    });

    it('throws when at max', () => {
      const items = Array.from({ length: CART_LIMIT.MAX_ITEMS }, (_, i) => makeItem(`i${i}`));
      expect(() => svc.assertCanAddItem(makeCart(items))).toThrow();
    });
  });

  describe('assertQuantityWithinLimits()', () => {
    it('no throw within limits', () => {
      expect(() => svc.assertQuantityWithinLimits(5)).not.toThrow();
    });

    it('throws when over max', () => {
      expect(() => svc.assertQuantityWithinLimits(CART_LIMIT.MAX_QUANTITY_PER_ITEM + 1)).toThrow();
    });
  });

  describe('totalUnits()', () => {
    it('sums all quantities', () => {
      const cart = makeCart([makeItem('a', 3), makeItem('b', 5)]);
      expect(svc.totalUnits(cart)).toBe(8);
    });

    it('0 for empty cart', () => {
      expect(svc.totalUnits(makeCart())).toBe(0);
    });
  });
});
