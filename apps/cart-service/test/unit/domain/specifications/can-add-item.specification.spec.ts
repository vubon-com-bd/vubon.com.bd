/**
 * CanAddItemSpecification — Unit Tests
 */
import { CanAddItemSpecification } from '../../../../src/module/domain/specifications/can-add-item.specification.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS, CART_LIMIT } from '@vubon/shared-constants/business/cart';

const P1 = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';
const PAST = '2020-01-01T00:00:00Z';

function makeItem(id: string, qty = 1) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(P1),
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

function makeCart(opts: { items?: CartItemEntity[]; status?: string; expiresAt?: string } = {}) {
  const c = CartEntity.create({
    id: P1,
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
  return c;
}

const baseCtx = {
  productId: P1,
  quantity: 1,
  availableStock: 100,
  isAvailable: true,
};

describe('CanAddItemSpecification', () => {
  const spec = new CanAddItemSpecification();

  describe('isSatisfiedBy()', () => {
    it('true for valid add on active cart', () => {
      const r = spec.isSatisfiedBy({ cart: makeCart(), ctx: baseCtx });
      expect(r).toBe(true);
    });

    it('false when cart not active', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart({ status: CART_STATUS.EXPIRED }),
        ctx: baseCtx,
      });
      expect(r).toBe(false);
    });

    it('false when cart expired by time', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart({ expiresAt: PAST }),
        ctx: { ...baseCtx, now: new Date(NOW) },
      });
      expect(r).toBe(false);
    });

    it('false when cart full', () => {
      const items = Array.from({ length: CART_LIMIT.MAX_ITEMS }, (_, i) => makeItem(`i${i}`));
      const r = spec.isSatisfiedBy({ cart: makeCart({ items }), ctx: baseCtx });
      expect(r).toBe(false);
    });

    it('false when product unavailable', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart(),
        ctx: { ...baseCtx, isAvailable: false },
      });
      expect(r).toBe(false);
    });

    it('false when quantity is zero', () => {
      const r = spec.isSatisfiedBy({ cart: makeCart(), ctx: { ...baseCtx, quantity: 0 } });
      expect(r).toBe(false);
    });

    it('false when quantity is float', () => {
      const r = spec.isSatisfiedBy({ cart: makeCart(), ctx: { ...baseCtx, quantity: 1.5 } });
      expect(r).toBe(false);
    });

    it('false when exceeds max per item', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart(),
        ctx: { ...baseCtx, quantity: CART_LIMIT.MAX_QUANTITY_PER_ITEM + 1 },
      });
      expect(r).toBe(false);
    });

    it('false when exceeds available stock', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart(),
        ctx: { ...baseCtx, quantity: 10, availableStock: 5 },
      });
      expect(r).toBe(false);
    });

    it('false when merged qty exceeds stock', () => {
      const r = spec.isSatisfiedBy({
        cart: makeCart({ items: [makeItem('i1', 5)] }),
        ctx: { ...baseCtx, quantity: 5, availableStock: 8 },
      });
      expect(r).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      expect(spec.explain({ cart: makeCart(), ctx: baseCtx })).toBeNull();
    });

    it('"cart is not active" when not active', () => {
      const r = spec.explain({
        cart: makeCart({ status: CART_STATUS.EXPIRED }),
        ctx: baseCtx,
      });
      expect(r).toBe('cart is not active');
    });

    it('"product unavailable" when unavailable', () => {
      const r = spec.explain({
        cart: makeCart(),
        ctx: { ...baseCtx, isAvailable: false },
      });
      expect(r).toBe('product unavailable');
    });

    it('"quantity must be positive" for zero qty', () => {
      const r = spec.explain({ cart: makeCart(), ctx: { ...baseCtx, quantity: 0 } });
      expect(r).toBe('quantity must be positive');
    });

    it('"insufficient stock" when stock short', () => {
      const r = spec.explain({
        cart: makeCart(),
        ctx: { ...baseCtx, quantity: 10, availableStock: 5 },
      });
      expect(r).toBe('insufficient stock');
    });
  });
});
