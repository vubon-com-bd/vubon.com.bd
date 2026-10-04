/**
 * PriceSyncService — Unit Tests
 */
import { PriceSyncService } from '../../../../src/module/domain/services/price-sync.service.js';
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

function makeItem(id: string, productId: string, price: number, qty = 1) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(productId),
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

describe('PriceSyncService', () => {
  const svc = new PriceSyncService();

  describe('detectChanges()', () => {
    it('detects no changes when prices match', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      const r = svc.detectChanges(cart, [
        { productId: P1, price: 100, currency: 'BDT', available: true },
      ]);
      expect(r.hasChanges).toBe(false);
      expect(r.changes.length).toBe(0);
    });

    it('detects price increase', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      const r = svc.detectChanges(cart, [
        { productId: P1, price: 150, currency: 'BDT', available: true },
      ]);
      expect(r.hasChanges).toBe(true);
      expect(r.changes[0].oldPrice).toBe(100);
      expect(r.changes[0].newPrice).toBe(150);
      expect(r.changes[0].delta).toBe(50);
    });

    it('detects price decrease', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      const r = svc.detectChanges(cart, [
        { productId: P1, price: 80, currency: 'BDT', available: true },
      ]);
      expect(r.changes[0].delta).toBe(-20);
    });

    it('sums total delta accounting for quantity', () => {
      const cart = makeCart([makeItem('i1', P1, 100, 3)]);
      const r = svc.detectChanges(cart, [
        { productId: P1, price: 150, currency: 'BDT', available: true },
      ]);
      expect(r.totalDelta).toBe(150); // 50 * 3
    });

    it('handles multiple items', () => {
      const cart = makeCart([
        makeItem('i1', P1, 100, 1),
        makeItem('i2', P2, 200, 1),
      ]);
      const r = svc.detectChanges(cart, [
        { productId: P1, price: 120, currency: 'BDT', available: true },
        { productId: P2, price: 180, currency: 'BDT', available: true },
      ]);
      expect(r.changes.length).toBe(2);
    });

    it('ignores items not in snapshot', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      const r = svc.detectChanges(cart, []);
      expect(r.hasChanges).toBe(false);
    });
  });

  describe('applyChanges()', () => {
    it('updates item unit prices', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      svc.applyChanges(
        cart,
        [
          {
            itemId: 'i1',
            productId: P1,
            oldPrice: 100,
            newPrice: 150,
            delta: 50,
            deltaPercent: 50,
          },
        ],
        NOW,
      );
      expect(cart.findItem('i1')?.unitPrice).toBe(150);
    });
  });

  describe('detectUnavailable()', () => {
    it('returns items missing from snapshot', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      const unavailable = svc.detectUnavailable(cart, []);
      expect(unavailable.length).toBe(1);
    });

    it('returns items marked unavailable', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      const unavailable = svc.detectUnavailable(cart, [
        { productId: P1, price: 100, currency: 'BDT', available: false },
      ]);
      expect(unavailable.length).toBe(1);
    });

    it('returns empty when all available', () => {
      const cart = makeCart([makeItem('i1', P1, 100)]);
      const unavailable = svc.detectUnavailable(cart, [
        { productId: P1, price: 100, currency: 'BDT', available: true },
      ]);
      expect(unavailable.length).toBe(0);
    });
  });
});
