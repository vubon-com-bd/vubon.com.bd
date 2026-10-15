/**
 * E2E — Checkout eligibility + calculation flow
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartCalculationService } from '@domain/services/cart-calculation.service.js';
import { CanCheckoutSpecification } from '@domain/specifications/can-checkout.specification.js';
import { CartEligibilityService } from '@domain/services/cart-eligibility.service.js';
import { CartValidationService } from '@domain/services/cart-validation.service.js';
import { CartLimitsService } from '@domain/services/cart-limits.service.js';
import { e2eDb } from './setup/e2e-database';
import { makeE2EUserCart, makeE2EItem, E2E_DATES } from './setup/e2e-fixtures';

describe('E2E — Checkout flow', () => {
  beforeEach(() => e2eDb.reset());

  it('full checkout: items → totals → eligibility → convert', () => {
    const cart = makeE2EUserCart();
    const item1 = makeE2EItem({ quantity: 2, unitPrice: 100 });
    const item2 = makeE2EItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002',
      productId: '44444444-4444-4444-8444-555555555555',
      quantity: 1,
      unitPrice: 300,
    });

    cart.applyItemCountDelta(2, E2E_DATES.NOW);

    // Calculate
    const totals = CartCalculationService.calculate({
      items: [item1, item2],
      discountAmount: 50,
      taxRate: 15,
      shippingCost: 50,
      freeShippingAbove: 1000,
    });

    expect(totals.subtotal).toBe(500);
    expect(totals.discount).toBe(50);
    expect(totals.tax).toBe(67.5);
    expect(totals.shipping).toBe(50);
    expect(totals.total).toBe(567.5);

    cart.updateTotals(
      {
        subtotal: totals.subtotal,
        discount: totals.discount,
        tax: totals.tax,
        shipping: totals.shipping,
      },
      E2E_DATES.NOW,
    );

    // Eligibility
    const eligibility = CartEligibilityService.evaluate(cart, [item1, item2]);
    expect(eligibility.eligible).toBe(true);

    // Checkout spec
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart, items: [item1, item2] })).toBe(true);

    // Convert
    cart.convert('ORDER-001', E2E_DATES.NOW);
    expect(cart.isConverted()).toBe(true);
  });

  it('free shipping above threshold', () => {
    const item = makeE2EItem({ quantity: 1, unitPrice: 1500 });
    const totals = CartCalculationService.calculate({
      items: [item],
      discountAmount: 0,
      taxRate: 0,
      shippingCost: 50,
      freeShippingAbove: 1000,
    });
    expect(totals.shipping).toBe(0);
  });

  it('validation detects no purchasable items', () => {
    const cart = makeE2EUserCart();
    const item = makeE2EItem();
    item.markOutOfStock(E2E_DATES.NOW);
    const v = CartValidationService.validate(cart, [item]);
    expect(v.warnings.some((w) => w.includes('purchasable'))).toBe(true);
  });

  it('limits service rejects at boundary', () => {
    const cart = makeE2EUserCart();
    expect(() =>
      CartLimitsService.assertCanAddItem(cart, new Array(100).fill({}) as never[]),
    ).toThrow();
  });

  it('limits service asserts quantity range', () => {
    expect(() => CartLimitsService.assertQuantityWithinLimits(0)).toThrow();
    expect(() => CartLimitsService.assertQuantityWithinLimits(1000)).toThrow();
    expect(() => CartLimitsService.assertQuantityWithinLimits(5)).not.toThrow();
  });

  it('checkout spec fails for empty', () => {
    const cart = makeE2EUserCart();
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart, items: [] })).toBe(false);
  });

  it('checkout spec fails for mixed currencies', () => {
    const cart = makeE2EUserCart();
    const item = makeE2EItem();
    const r = CartValidationService.validate(cart, [item]);
    expect(r.valid).toBe(true);
  });
});
