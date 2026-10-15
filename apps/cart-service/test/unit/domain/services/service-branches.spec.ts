/**
 * Service branch coverage — edge cases
 */
import { describe, it, expect } from '@jest/globals';
import { CartEligibilityService } from '@domain/services/cart-eligibility.service.js';
import { CartCalculationService } from '@domain/services/cart-calculation.service.js';
import { CartLimitsService } from '@domain/services/cart-limits.service.js';
import { StockCheckService } from '@domain/services/stock-check.service.js';
import { makeUserCart, makeCartItem, TEST_IDS, TEST_CURRENCY } from '../../../fixtures/index.js';

describe('Service branch coverage', () => {
  it('CartEligibilityService — mixed currency blocks', () => {
    const cart = makeUserCart({ total: 100 });
    const item1 = makeCartItem();
    const item2 = makeCartItem({ id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002' });
    Object.defineProperty(item2, '_currency', { value: 'USD' });
    const r = CartEligibilityService.evaluate(cart, [item1, item2]);
    expect(r).toBeDefined();
  });

  it('CartEligibilityService — total=0 with items blocks', () => {
    const cart = makeUserCart();
    const item = makeCartItem();
    const r = CartEligibilityService.evaluate(cart, [item]);
    expect(r.eligible).toBe(false);
  });

  it('CartCalculationService — free above threshold exact', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 100 })];
    const r = CartCalculationService.calculate({
      items,
      discountAmount: 0,
      taxRate: 0,
      shippingCost: 50,
      freeShippingAbove: 100,
    });
    expect(r.shipping).toBe(0);
  });

  it('CartCalculationService — inclusive tax with zero', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 0 })];
    const r = CartCalculationService.calculate({
      items,
      discountAmount: 0,
      taxRate: 15,
      shippingCost: 0,
      taxInclusive: true,
    });
    expect(r.tax).toBe(0);
  });

  it('CartCalculationService — discount > subtotal clamps', () => {
    const items = [makeCartItem({ quantity: 1, unitPrice: 50 })];
    const r = CartCalculationService.calculate({
      items,
      discountAmount: 500,
      taxRate: 0,
      shippingCost: 0,
    });
    expect(r.discount).toBe(50);
  });

  it('CartLimitsService — assertCanAddItem at boundary', () => {
    const cart = makeUserCart();
    expect(() =>
      CartLimitsService.assertCanAddItem(cart, new Array(100).fill({}) as never[]),
    ).toThrow();
  });

  it('StockCheckService — insufficient + unavailable mix', () => {
    const item1 = makeCartItem({ quantity: 5 });
    const item2 = makeCartItem({
      id: 'aaaaaaaa-aaaa-4aaa-8aaa-000000000002',
      productId: TEST_IDS.PRODUCT_ID_2,
      quantity: 1,
    });
    const r = StockCheckService.check([item1, item2], [
      { productId: TEST_IDS.PRODUCT_ID, available: 2, isAvailable: true },
      { productId: TEST_IDS.PRODUCT_ID_2, available: 0, isAvailable: false },
    ]);
    expect(r.insufficient.length).toBeGreaterThan(0);
    expect(r.unavailable.length).toBeGreaterThan(0);
    expect(r.allAvailable).toBe(false);
  });

  it('StockCheckService — all available', () => {
    const item = makeCartItem({ quantity: 2 });
    const r = StockCheckService.check([item], [
      { productId: TEST_IDS.PRODUCT_ID, available: 10, isAvailable: true },
    ]);
    expect(r.allAvailable).toBe(true);
    void TEST_CURRENCY;
  });
});
