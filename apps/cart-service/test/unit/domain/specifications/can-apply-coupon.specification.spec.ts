/**
 * CanApplyCouponSpecification — Unit Tests
 */
import { CanApplyCouponSpecification } from '../../../../src/module/domain/specifications/can-apply-coupon.specification.js';
import { CartEntity } from '../../../../src/module/domain/entities/cart.entity.js';
import { CartItemEntity } from '../../../../src/module/domain/entities/cart-item.entity.js';
import { CartCouponCompositeVO } from '../../../../src/module/domain/value-objects/composites/cart-coupon.vo.js';
import { CartStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-status.vo.js';
import { CartTypeVO } from '../../../../src/module/domain/value-objects/primitives/cart-type.vo.js';
import { CartUserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { CartItemQuantityVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-quantity.vo.js';
import { CartItemStatusVO } from '../../../../src/module/domain/value-objects/primitives/cart-item-status.vo.js';
import { CartProductIdVO } from '../../../../src/module/domain/value-objects/primitives/product-id.vo.js';
import { CouponCodeVO } from '../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import {
  CART_STATUS,
  CART_TYPE,
  CART_ITEM_STATUS,
  COUPON_STATUS,
  COUPON_DISCOUNT_TYPE,
} from '@vubon/shared-constants/business/cart';

const P = '11111111-1111-1111-1111-111111111111';
const USER = '00000000-0000-0000-0000-000000000001';
const NOW = '2026-01-01T00:00:00Z';
const FUTURE = '2099-12-31T23:59:59Z';

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

function makeCart(items: CartItemEntity[], recalc = true) {
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
  if (recalc) c.recalculateTotals({ now: NOW });
  return c;
}

function makeCoupon(overrides = {}) {
  return CartCouponCompositeVO.create({
    code: CouponCodeVO.create('SAVE10'),
    status: CouponStatusVO.create(COUPON_STATUS.ACTIVE),
    discountType: COUPON_DISCOUNT_TYPE.CART_PERCENTAGE,
    discountValue: 10,
    maxUses: 100,
    usedCount: 0,
    maxUsesPerUser: 1,
    userUsageCount: 0,
    validFrom: '2020-01-01T00:00:00Z',
    validUntil: '2099-12-31T23:59:59Z',
    stackable: false,
    ...overrides,
  });
}

describe('CanApplyCouponSpecification', () => {
  const spec = new CanApplyCouponSpecification();

  describe('isSatisfiedBy()', () => {
    it('true for active cart + valid coupon', () => {
      const cart = makeCart([makeItem()]);
      const r = spec.isSatisfiedBy({ cart, ctx: { coupon: makeCoupon() } });
      expect(r).toBe(true);
    });

    it('false for empty cart', () => {
      const r = spec.isSatisfiedBy({ cart: makeCart([]), ctx: { coupon: makeCoupon() } });
      expect(r).toBe(false);
    });

    it('false when a coupon already applied', () => {
      const cart = makeCart([makeItem()]);
      cart['_couponCode'] = 'EXISTING';
      const r = spec.isSatisfiedBy({ cart, ctx: { coupon: makeCoupon() } });
      expect(r).toBe(false);
    });

    it('false when coupon status not usable', () => {
      const cart = makeCart([makeItem()]);
      const r = spec.isSatisfiedBy({
        cart,
        ctx: { coupon: makeCoupon({ status: CouponStatusVO.create(COUPON_STATUS.EXPIRED) }) },
      });
      expect(r).toBe(false);
    });

    it('false when coupon outside validity window', () => {
      const cart = makeCart([makeItem()]);
      const r = spec.isSatisfiedBy({
        cart,
        ctx: {
          coupon: makeCoupon({
            validFrom: '2099-01-01T00:00:00Z',
            validUntil: '2099-12-31T00:00:00Z',
          }),
        },
      });
      expect(r).toBe(false);
    });

    it('false when user limit exceeded', () => {
      const cart = makeCart([makeItem()]);
      const r = spec.isSatisfiedBy({
        cart,
        ctx: { coupon: makeCoupon({ userUsageCount: 1, maxUsesPerUser: 1 }) },
      });
      expect(r).toBe(false);
    });

    it('false when min order not met', () => {
      const cart = makeCart([makeItem(1, 100)]);
      const r = spec.isSatisfiedBy({
        cart,
        ctx: { coupon: makeCoupon({ minOrderAmount: 5000 }) },
      });
      expect(r).toBe(false);
    });
  });

  describe('explain()', () => {
    it('null when satisfied', () => {
      const cart = makeCart([makeItem()]);
      expect(spec.explain({ cart, ctx: { coupon: makeCoupon() } })).toBeNull();
    });

    it('"cart is empty"', () => {
      const r = spec.explain({ cart: makeCart([]), ctx: { coupon: makeCoupon() } });
      expect(r).toBe('cart is empty');
    });

    it('"another coupon already applied"', () => {
      const cart = makeCart([makeItem()]);
      cart['_couponCode'] = 'EXISTING';
      const r = spec.explain({ cart, ctx: { coupon: makeCoupon() } });
      expect(r).toBe('another coupon already applied');
    });
  });

  describe('previewDiscount()', () => {
    it('returns discount when satisfied', () => {
      const cart = makeCart([makeItem(2, 100)]); // subtotal 200
      const r = spec.previewDiscount({ cart, ctx: { coupon: makeCoupon() } }); // 10%
      expect(r).toBe(20);
    });

    it('returns 0 when not satisfied', () => {
      const r = spec.previewDiscount({ cart: makeCart([]), ctx: { coupon: makeCoupon() } });
      expect(r).toBe(0);
    });
  });
});
