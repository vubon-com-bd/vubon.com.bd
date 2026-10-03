/**
 * CartCalculationService — Unit Tests
 */
import { CartCalculationService } from '../../../../src/module/domain/services/cart-calculation.service.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartTotalsCompositeVO } from '../../../../src/module/domain/value-objects/composites/cart-totals.vo.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CartTaxRateVO } from '../../../../src/module/domain/value-objects/primitives/cart-tax-rate.vo.js';
import { CART_STATUS, CART_TYPE, CART_ITEM_STATUS } from '@vubon/shared-constants/business/cart';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

function makeItem(id: string, price = 100, qty = 2, discount = 0) {
  return CartItemEntity.create({
    id,
    now: NOW,
    props: {
      productId: CartProductIdVO.create(UUID),
      sku: 'SKU-1',
      name: 'Item',
      unitPrice: price,
      quantity: CartItemQuantityVO.create(qty),
      discountAmount: discount,
      status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
      isAvailable: true,
      currency: 'BDT',
    },
  });
}

function makeCart(items: CartItemEntity[] = []): CartEntity {
  const c = CartEntity.create({
    id: UUID,
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

describe('CartCalculationService', () => {
  const svc = new CartCalculationService();

  describe('calculate()', () => {
    it('empty cart → 0 total', () => {
      const t = svc.calculate({ cart: makeCart() });
      expect(t.subtotal).toBe(0);
      expect(t.grandTotal).toBe(0);
    });

    it('single item → subtotal = price × qty', () => {
      const cart = makeCart([makeItem('a', 100, 2)]);
      const t = svc.calculate({ cart });
      expect(t.subtotal).toBe(200);
    });

    it('multiple items sum', () => {
      const cart = makeCart([makeItem('a', 100, 2), makeItem('b', 50, 3)]);
      const t = svc.calculate({ cart });
      expect(t.subtotal).toBe(350);
    });

    it('applies coupon discount', () => {
      const cart = makeCart([makeItem('a', 100, 2)]);
      const t = svc.calculate({ cart, couponDiscount: 50 });
      expect(t.couponDiscount).toBe(50);
      expect(t.grandTotal).toBe(150);
    });

    it('applies voucher discount', () => {
      const cart = makeCart([makeItem('a', 100, 2)]);
      const t = svc.calculate({ cart, voucherDiscount: 50 });
      expect(t.voucherDiscount).toBe(50);
    });

    it('applies tax on post-discount amount', () => {
      const cart = makeCart([makeItem('a', 100, 2)]);
      const t = svc.calculate({ cart, taxRate: CartTaxRateVO.create(15) });
      expect(t.taxAmount).toBe(30);
    });

    it('adds shipping cost', () => {
      const cart = makeCart([makeItem('a', 100, 2)]);
      const t = svc.calculate({ cart, shippingCost: 50 });
      expect(t.shippingAmount).toBe(50);
      expect(t.grandTotal).toBe(250);
    });

    it('full calculation flow', () => {
      const cart = makeCart([makeItem('a', 100, 2)]);
      const t = svc.calculate({
        cart,
        couponDiscount: 20,
        voucherDiscount: 10,
        taxRate: CartTaxRateVO.create(10),
        shippingCost: 30,
      });
      // subtotal 200
      // after coupon 180
      // after voucher 170
      // tax 17
      // + shipping 30 = 217
      expect(t.grandTotal).toBe(217);
    });
  });

  describe('subtotal()', () => {
    it('returns subtotal only', () => {
      const cart = makeCart([makeItem('a', 100, 2)]);
      expect(svc.subtotal(cart)).toBe(200);
    });

    it('empty cart → 0', () => {
      expect(svc.subtotal(makeCart())).toBe(0);
    });
  });

  describe('itemDiscountTotal()', () => {
    it('sums item-level discounts', () => {
      const cart = makeCart([
        makeItem('a', 100, 2, 20),
        makeItem('b', 50, 2, 10),
      ]);
      expect(svc.itemDiscountTotal(cart)).toBe(30);
    });
  });

  describe('effectiveSubtotal()', () => {
    it('subtracts item discounts from subtotal', () => {
      const cart = makeCart([makeItem('a', 100, 2, 20)]);
      expect(svc.effectiveSubtotal(cart)).toBe(180);
    });
  });

  describe('allItemsPurchasable()', () => {
    it('true when all items available + active', () => {
      const cart = makeCart([makeItem('a'), makeItem('b')]);
      expect(svc.allItemsPurchasable(cart)).toBe(true);
    });

    it('false when any item unavailable', () => {
      const unavailableItem = CartItemEntity.create({
        id: 'b',
        now: NOW,
        props: {
          productId: CartProductIdVO.create(UUID),
          sku: 'SKU',
          name: 'Item',
          unitPrice: 100,
          quantity: CartItemQuantityVO.create(1),
          discountAmount: 0,
          status: CartItemStatusVO.create(CART_ITEM_STATUS.ACTIVE),
          isAvailable: false,
          currency: 'BDT',
        },
      });
      const cart = makeCart([makeItem('a'), unavailableItem]);
      expect(svc.allItemsPurchasable(cart)).toBe(false);
    });
  });
});
