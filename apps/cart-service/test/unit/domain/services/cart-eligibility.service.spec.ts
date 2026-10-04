/**
 * CartEligibilityService — Unit Tests
 */
import { CartEligibilityService } from '../../../../src/module/domain/services/cart-eligibility.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const P = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';
const PAST = '2020-01-01T00:00:00Z';

function makeItem(qty = 2, price = 100) {
  return CartItemEntity.create({
    id: 'i1',
    now: NOW,
    props: {
      productId: CartProductIdVO.create(P),
      sku: 'SKU',
      name: 'Item',
      unitPrice: price,
      quantity: CartItemQuantityVO.create(qty),
      discountAmount: 0,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

function makeCart(opts: { items?: CartItemEntity[]; status?: string; expiresAt?: string; recalc?: boolean } = {}) {
  const c = CartEntity.create({
    id: P,
    now: NOW,
    props: {
      type: CartTypeVO.create(CART_TYPE.USER),
      status: CartStatusVO.create(opts.status ?? CART_STATUS.ACTIVE),
      userId: CartUserIdVO.create(USER),
      currency: 'BDT',
      expiresAt: opts.expiresAt ?? FUTURE,
      lastActivityAt: NOW,
    },
  });
  c['_items'] = opts.items ?? [];
  if (opts.recalc) {
    c.recalculateTotals({ now: NOW });
  }
  return c;
}

describe('CartEligibilityService', () => {
  const svc = new CartEligibilityService();

  describe('checkCheckoutEligibility()', () => {
    it('eligible for active non-empty cart', () => {
      const r = svc.checkCheckoutEligibility({ cart: makeCart({ items: [makeItem()] }) });
      expect(r.eligible).toBe(true);
      expect(r.reasons.length).toBe(0);
    });

    it('ineligible when empty', () => {
      const r = svc.checkCheckoutEligibility({ cart: makeCart() });
      expect(r.eligible).toBe(false);
      expect(r.reasons).toContain('Cart is empty');
    });

    it('ineligible when not active', () => {
      const r = svc.checkCheckoutEligibility({
        cart: makeCart({ items: [makeItem()], status: CART_STATUS.EXPIRED }),
      });
      expect(r.eligible).toBe(false);
    });

    it('ineligible when expired by time', () => {
      const r = svc.checkCheckoutEligibility({
        cart: makeCart({ items: [makeItem()], expiresAt: PAST }),
        now: new Date(NOW),
      });
      expect(r.eligible).toBe(false);
    });

    it('ineligible when subtotal below minimum', () => {
      // Cart with items but recalc so subtotal = 100 * 1 = 100
      const cart = makeCart({ items: [makeItem(1, 100)], recalc: true });
      const r = svc.checkCheckoutEligibility({ cart, minimumOrderAmount: 500 });
      expect(r.eligible).toBe(false);
    });

    it('eligible when subtotal meets minimum', () => {
      // Cart with items, subtotal = 300 * 2 = 600
      const cart = makeCart({ items: [makeItem(2, 300)], recalc: true });
      const r = svc.checkCheckoutEligibility({ cart, minimumOrderAmount: 500 });
      expect(r.eligible).toBe(true);
    });
  });

  describe('canCheckout()', () => {
    it('true for valid cart', () => {
      expect(svc.canCheckout({ cart: makeCart({ items: [makeItem()] }) })).toBe(true);
    });

    it('false for empty', () => {
      expect(svc.canCheckout({ cart: makeCart() })).toBe(false);
    });
  });

  describe('qualifiesForFreeShipping()', () => {
    it('true when subtotal >= threshold', () => {
      const cart = makeCart({ items: [makeItem(2, 300)], recalc: true });
      // subtotal = 600
      expect(svc.qualifiesForFreeShipping(cart, 500)).toBe(true);
    });

    it('false when below threshold', () => {
      const cart = makeCart({ items: [makeItem(1, 100)], recalc: true });
      // subtotal = 100
      expect(svc.qualifiesForFreeShipping(cart, 500)).toBe(false);
    });

    it('false for zero threshold', () => {
      const cart = makeCart({ items: [makeItem(1, 100)], recalc: true });
      expect(svc.qualifiesForFreeShipping(cart, 0)).toBe(false);
    });
  });

  describe('checkoutableItems()', () => {
    it('counts purchasable items', () => {
      const cart = makeCart({ items: [makeItem(), makeItem()] });
      expect(svc.checkoutableItems(cart)).toBe(2);
    });

    it('0 for empty cart', () => {
      expect(svc.checkoutableItems(makeCart())).toBe(0);
    });
  });

  describe('canGuestCheckout()', () => {
    it('returns value from constant', () => {
      const r = svc.canGuestCheckout();
      expect(typeof r).toBe('boolean');
    });
  });
});
