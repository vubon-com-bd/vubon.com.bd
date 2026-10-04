/**
 * StockCheckService — Unit Tests
 */
import { StockCheckService } from '../../../../src/module/domain/services/stock-check.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const P1 = '11111111-1111-1111-1111-111111111111';
const P2 = '22222222-2222-2222-2222-222222222222';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeItem(id: string, productId: string, qty: number) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(productId),
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

function makeCart(items: CartItemEntity[]): CartEntity {
  const c = CartEntity.create({
    id: P1,
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

describe('StockCheckService', () => {
  const svc = new StockCheckService();

  describe('checkCart()', () => {
    it('all sufficient', () => {
      const cart = makeCart([makeItem('i1', P1, 2)]);
      const r = svc.checkCart(cart, [{ productId: P1, available: 10 }]);
      expect(r.allSufficient).toBe(true);
      expect(r.shortItems.length).toBe(0);
    });

    it('detects short item', () => {
      const cart = makeCart([makeItem('i1', P1, 5)]);
      const r = svc.checkCart(cart, [{ productId: P1, available: 3 }]);
      expect(r.allSufficient).toBe(false);
      expect(r.shortItems.length).toBe(1);
      expect(r.shortItems[0].shortBy).toBe(2);
    });

    it('exact stock is sufficient', () => {
      const cart = makeCart([makeItem('i1', P1, 3)]);
      const r = svc.checkCart(cart, [{ productId: P1, available: 3 }]);
      expect(r.allSufficient).toBe(true);
    });

    it('missing snapshot → treated as 0 stock', () => {
      const cart = makeCart([makeItem('i1', P1, 1)]);
      const r = svc.checkCart(cart, []);
      expect(r.allSufficient).toBe(false);
      expect(r.shortItems[0].shortBy).toBe(1);
    });

    it('multiple items mixed', () => {
      const cart = makeCart([makeItem('i1', P1, 2), makeItem('i2', P2, 5)]);
      const r = svc.checkCart(cart, [
        { productId: P1, available: 10 },
        { productId: P2, available: 3 },
      ]);
      expect(r.allSufficient).toBe(false);
      expect(r.shortItems.length).toBe(1);
    });
  });

  describe('checkItem()', () => {
    it('sufficient when available >= requested', () => {
      const item = makeItem('i1', P1, 2);
      const r = svc.checkItem(item, 5);
      expect(r.sufficient).toBe(true);
      expect(r.shortBy).toBe(0);
    });

    it('insufficient when available < requested', () => {
      const item = makeItem('i1', P1, 5);
      const r = svc.checkItem(item, 3);
      expect(r.sufficient).toBe(false);
      expect(r.shortBy).toBe(2);
    });
  });

  describe('maxAddable()', () => {
    it('returns stock - current qty', () => {
      const cart = makeCart([makeItem('i1', P1, 2)]);
      expect(svc.maxAddable(cart, P1, undefined, 10)).toBe(8);
    });

    it('returns 0 when current qty exceeds stock', () => {
      const cart = makeCart([makeItem('i1', P1, 10)]);
      expect(svc.maxAddable(cart, P1, undefined, 5)).toBe(0);
    });

    it('returns full stock when item not in cart', () => {
      const cart = makeCart([]);
      expect(svc.maxAddable(cart, P1, undefined, 10)).toBe(10);
    });
  });
});
