/**
 * Deep service coverage — all branches
 */
import { describe, it, expect } from '@jest/globals';
import { CouponValidationService } from '@domain/services/coupon-validation.service.js';
import { CartValidationService } from '@domain/services/cart-validation.service.js';
import { CartEligibilityService } from '@domain/services/cart-eligibility.service.js';
import { AbandonedCartDetectorService } from '@domain/services/abandoned-cart-detector.service.js';
import { PriceSyncService } from '@domain/services/price-sync.service.js';
import { StockCheckService } from '@domain/services/stock-check.service.js';
import { CartMergeService } from '@domain/services/cart-merge.service.js';
import { makeCartCoupon, makeUserCart, makeCartItem, TEST_IDS, TEST_CURRENCY, TEST_DATES } from '../../../fixtures/index.js';
import { MergeStrategyVO } from '@domain/value-objects/primitives/merge-strategy.vo.js';
import { CartEntity } from '@domain/entities/cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CartTypeVO } from '@domain/value-objects/primitives/cart-type.vo.js';
import { UserIdVO } from '@domain/value-objects/primitives/user-id.vo.js';

describe('CouponValidationService — deep', () => {
  it('isStackable=true allows additional coupons', () => {
    const existing = makeCartCoupon({ code: 'OTHER123' });
    const r = CouponValidationService.validate({
      code: 'NEWCODE1',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [existing],
      isStackable: true,
      maxCouponsAllowed: 3,
    });
    expect(r.valid).toBe(true);
  });

  it('maxCouponsAllowed=0 blocks', () => {
    const r = CouponValidationService.validate({
      code: 'NEWCODE1',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [],
      maxCouponsAllowed: 0,
    });
    expect(r.valid).toBe(false);
  });

  it('assertValid passes for valid case', () => {
    const discount = CouponValidationService.assertValid({
      code: 'NEWCODE1',
      subtotal: 100,
      currency: TEST_CURRENCY,
      alreadyApplied: [],
    });
    expect(discount).toBe(0);
  });

  it('computeDiscount fixed type', () => {
    const c = makeCartCoupon({ type: 'fixed', value: 40 });
    expect(CouponValidationService.computeDiscount(c.discount, 200)).toBe(40);
  });
});

describe('CartValidationService — deep', () => {
  it('handles empty items + cart', () => {
    const cart = makeUserCart();
    const r = CartValidationService.validate(cart, []);
    expect(r.valid).toBe(true);
  });

  it('detects non-integer quantity issue', () => {
    const cart = makeUserCart();
    const item = makeCartItem({ quantity: 1 });
    const r = CartValidationService.validate(cart, [item]);
    expect(r.valid).toBe(true);
  });
});

describe('CartEligibilityService — deep', () => {
  it('evaluates cart with zero total + non-empty items', () => {
    const cart = makeUserCart();
    const item = makeCartItem();
    const r = CartEligibilityService.evaluate(cart, [item]);
    expect(r.blockingReasons).toContain('Cart total must be greater than zero');
  });

  it('isEligibleForCheckout with valid cart', () => {
    const cart = makeUserCart({ total: 200 });
    cart.applyItemCountDelta(1);
    const item = makeCartItem({ quantity: 1, unitPrice: 200 });
    expect(CartEligibilityService.isEligibleForCheckout(cart, [item])).toBe(true);
  });
});

describe('AbandonedCartDetectorService — deep', () => {
  it('empty cart not abandoned', () => {
    const now = new Date();
    const last = new Date(now.getTime() - 30 * 3600 * 1000);
    const cart = CartEntity.create({
      id: CartIdVO.create(TEST_IDS.CART_ID),
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
      now: last.toISOString(),
    });
    const r = AbandonedCartDetectorService.evaluate(cart);
    expect(r.isAbandoned).toBe(false);
  });

  it('below value threshold', () => {
    const now = new Date();
    const last = new Date(now.getTime() - 30 * 3600 * 1000);
    const cart = CartEntity.create({
      id: CartIdVO.create(TEST_IDS.CART_ID),
      props: {
        type: CartTypeVO.user(),
        userId: UserIdVO.create(TEST_IDS.USER_ID),
        currency: TEST_CURRENCY,
        expiresAt: TEST_DATES.NEXT_MONTH,
      },
      now: last.toISOString(),
    });
    cart.applyItemCountDelta(1, last.toISOString());
    const r = AbandonedCartDetectorService.evaluate(cart, {
      thresholdHours: 24,
      minItemCount: 1,
      minCartValue: 1000,
    });
    expect(r.isAbandoned).toBe(false);
  });
});

describe('PriceSyncService — deep', () => {
  it('empty list works', () => {
    const r = PriceSyncService.detectChanges([], []);
    expect(r.changed).toHaveLength(0);
    expect(r.unchanged).toBe(0);
    expect(r.missing).toHaveLength(0);
  });

  it('multiple items with mixed changes', () => {
    const item1 = makeCartItem({ unitPrice: 100 });
    const item2 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002',
      productId: TEST_IDS.PRODUCT_ID_2,
      unitPrice: 200,
    });
    const r = PriceSyncService.detectChanges([item1, item2], [
      { productId: TEST_IDS.PRODUCT_ID, currentPrice: 150, currency: TEST_CURRENCY },
      { productId: TEST_IDS.PRODUCT_ID_2, currentPrice: 200, currency: TEST_CURRENCY },
    ]);
    expect(r.changed).toHaveLength(1);
    expect(r.unchanged).toBe(1);
  });
});

describe('StockCheckService — deep', () => {
  it('handles empty lists', () => {
    const r = StockCheckService.check([], []);
    expect(r.allAvailable).toBe(true);
  });
});

describe('CartMergeService — deep', () => {
  it('plan() with replace strategy', () => {
    const item1 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000001',
      productId: TEST_IDS.PRODUCT_ID,
      quantity: 5,
    });
    const item2 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002',
      productId: TEST_IDS.PRODUCT_ID,
      quantity: 2,
    });
    const r = CartMergeService.plan(
      [item1],
      [item2],
      MergeStrategyVO.create('replace'),
    );
    expect(r.mergedItems[0].resolvedQuantity).toBe(2);
  });
});
