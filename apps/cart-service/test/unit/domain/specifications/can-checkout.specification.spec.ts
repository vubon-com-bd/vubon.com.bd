/**
 * CanCheckoutSpecification — Unit Tests
 */
import { CanCheckoutSpecification } from '../../../../src/module/domain/specifications/can-checkout.specification.js';
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
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';
const PAST = '2020-01-01T00:00:00Z';

function makeItem(available = true, price = 100, qty = 2) {
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
      isAvailable: available,
      currency: 'BDT',
    },
  });
}

function makeCart(opts: {
  items?: CartItemEntity[];
  status?: string;
  expiresAt?: string;
  recalc?: boolean;
} = {}) {
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
  if (opts.recalc) c.recalculateTotals({ now: NOW });
  return c;
}

describe('CanCheckoutSpecification', () => {
  const spec = new CanCheckoutSpecification();

  describe('isSatisfiedBy()', () => {
    it('true for active non-empty cart', () => {
      const r = spec.isSatisfiedBy({ cart: makeCart({ items: [makeItem()] }) });
      expect(r).toBe(true);
    });

    it('false for empty cart', () => {
      const r = spec.isSatisfiedBy({ cart: makeCart() });
      expect(r).toBe(false);
    });

    it('false when cart not active', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart({ items: [makeItem()], status: CART_STATUS.EXPIRED }),
      });
      expect(r).toBe(false);
    });

    it('false when cart expired', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart({ items: [makeItem()], expiresAt: PAST }),
        ctx: { now: new Date(NOW) },
      });
      expect(r).toBe(false);
    });

    it('false when any item unavailable', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart({ items: [makeItem(true), makeItem(false)] }),
      });
      expect(r).toBe(false);
    });

    it('false when subtotal below minimum', () => {
      const cart = makeCart({ items: [makeItem(true, 100, 1)], recalc: true });
      const r = spec.isSatisfiedBy({ cart, ctx: { minimumOrderAmount: 500 } });
      expect(r).toBe(false);
    });

    it('true when subtotal meets minimum', () => {
      const cart = makeCart({ items: [makeItem(true, 300, 2)], recalc: true });
      const r = spec.isSatisfiedBy({ cart, ctx: { minimumOrderAmount: 500 } });
      expect(r).toBe(true);
    });
  });

  describe('explain()', () => {
    it('"cart is empty" for empty cart', () => {
      expect(spec.explain({ cart: makeCart() })).toBe('cart is empty');
    });

    it('"some items unavailable" when item blocked', () => {
      const cart = makeCart({ items: [makeItem(false)] });
      const r = spec.explain({ cart });
      expect(r).toBe('some items unavailable');
    });

    it('null when eligible', () => {
      expect(spec.explain({ cart: makeCart({ items: [makeItem()] }) })).toBeNull();
    });
  });

  describe('eligibleItemCount()', () => {
    it('counts purchasable items', () => {
      const cart = makeCart({ items: [makeItem(true), makeItem(true)] });
      expect(spec.eligibleItemCount(cart)).toBe(2);
    });

    it('excludes unavailable items', () => {
      const cart = makeCart({ items: [makeItem(true), makeItem(false)] });
      expect(spec.eligibleItemCount(cart)).toBe(1);
    });

    it('0 for empty cart', () => {
      expect(spec.eligibleItemCount(makeCart())).toBe(0);
    });
  });
});
