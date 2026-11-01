/**
 * E2E — Coupon application flow
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartCouponEntity } from '@domain/entities/cart-coupon.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { CouponCodeVO } from '@domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { CouponDiscountVO } from '@domain/value-objects/primitives/coupon-discount.vo.js';
import { CouponValidationService } from '@domain/services/coupon-validation.service.js';
import { CanApplyCouponSpecification } from '@domain/specifications/can-apply-coupon.specification.js';
import { e2eDb } from './setup/e2e-database';
import { makeE2EUserCart, E2E_IDS, E2E_DATES, E2E_CURRENCY } from './setup/e2e-fixtures';

describe('E2E — Coupon flow', () => {
  beforeEach(() => e2eDb.reset());

  function makeCoupon(opts: {
    code?: string;
    type?: 'percentage' | 'fixed';
    value?: number;
    minOrderAmount?: number;
    maxAmount?: number;
  } = {}) {
    return CartCouponEntity.create({
      id: 'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      props: {
        cartId: CartIdVO.create(E2E_IDS.CART),
        code: CouponCodeVO.create(opts.code ?? 'SAVE20'),
        status: CouponStatusVO.active(),
        discount: CouponDiscountVO.create({
          type: opts.type ?? 'percentage',
          value: opts.value ?? 20,
          maxAmount: opts.maxAmount,
        }),
        appliedDiscountAmount: 0,
        currency: E2E_CURRENCY,
        minOrderAmount: opts.minOrderAmount,
        expiresAt: E2E_DATES.NEXT_MONTH,
      },
      now: E2E_DATES.NOW,
    });
  }

  it('validates coupon with no metadata (lookup needed)', () => {
    const r = CouponValidationService.validate({
      code: 'SAVE20',
      subtotal: 200,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r.valid).toBe(true);
    expect(r.reason).toMatch(/lookup/);
  });

  it('rejects empty cart', () => {
    const r = CouponValidationService.validate({
      code: 'SAVE20',
      subtotal: 0,
      currency: E2E_CURRENCY,
      alreadyApplied: [],
    });
    expect(r.valid).toBe(false);
  });

  it('rejects duplicate active coupon', () => {
    const existing = makeCoupon({ code: 'SAVE20' });
    const r = CouponValidationService.validate({
      code: 'SAVE20',
      subtotal: 200,
      currency: E2E_CURRENCY,
      alreadyApplied: [existing],
    });
    expect(r.valid).toBe(false);
  });

  it('percentage discount applied correctly', () => {
    const c = makeCoupon({ type: 'percentage', value: 10 });
    expect(c.discount.calculate(200)).toBe(20);
  });

  it('fixed discount with cap', () => {
    const c = makeCoupon({ type: 'fixed', value: 500 });
    expect(c.discount.calculate(100)).toBe(100);
  });

  it('applies min-order-amount check', () => {
    const c = makeCoupon({ minOrderAmount: 500 });
    expect(c.meetsMinOrder(400)).toBe(false);
    expect(c.meetsMinOrder(500)).toBe(true);
  });

  it('CanApplyCouponSpecification — reject non-modifiable cart', () => {
    const cart = makeE2EUserCart();
    cart.expire(E2E_DATES.NOW);
    const spec = new CanApplyCouponSpecification();
    expect(
      spec.isSatisfiedBy({ cart, subtotal: 100, alreadyApplied: [], code: 'SAVE20' }),
    ).toBe(false);
  });

  it('CanApplyCouponSpecification — pass for fresh cart', () => {
    const cart = makeE2EUserCart();
    const spec = new CanApplyCouponSpecification();
    expect(
      spec.isSatisfiedBy({ cart, subtotal: 100, alreadyApplied: [], code: 'SAVE20' }),
    ).toBe(true);
  });

  it('update appliedDiscountAmount', () => {
    const c = makeCoupon();
    c.updateAppliedAmount(15, E2E_DATES.NOW);
    expect(c.appliedDiscountAmount).toBe(15);
    e2eDb.coupons.add(c);
    expect(e2eDb.coupons.size).toBe(1);
  });

  it('disable coupon', () => {
    const c = makeCoupon();
    c.disable(E2E_DATES.NOW);
    expect(c.isUsable()).toBe(false);
  });
});
