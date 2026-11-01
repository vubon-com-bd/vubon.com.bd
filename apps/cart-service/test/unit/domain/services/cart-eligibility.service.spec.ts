/**
 * CartEligibilityService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartEligibilityService } from '@domain/services/cart-eligibility.service.js';
import { makeUserCart } from '../../../fixtures/index';
import { makeCartItem } from '../../../fixtures/index';

describe('CartEligibilityService', () => {
  it('evaluates empty cart as ineligible', () => {
    const cart = makeUserCart();
    const result = CartEligibilityService.evaluate(cart, []);
    expect(result.eligible).toBe(false);
    expect(result.blockingReasons.some((r) => r.includes('empty'))).toBe(true);
  });

  it('evaluates valid cart as eligible', () => {
    const cart = makeUserCart({ total: 200 });
    cart.applyItemCountDelta(1);
    const items = [makeCartItem({ quantity: 1, unitPrice: 200 })];
    const result = CartEligibilityService.evaluate(cart, items);
    expect(result.eligible).toBe(true);
  });

  it('blocks when cart is not active', () => {
    const cart = makeUserCart({ total: 200 });
    cart.expire();
    const items = [makeCartItem()];
    const result = CartEligibilityService.evaluate(cart, items);
    expect(result.eligible).toBe(false);
  });

  it('warns when items unavailable', () => {
    const cart = makeUserCart({ total: 200 });
    const item = makeCartItem();
    item.markOutOfStock();
    const result = CartEligibilityService.evaluate(cart, [item]);
    expect(result.warnings.some((w) => w.includes('unavailable'))).toBe(true);
  });

  it('isEligibleForCheckout() convenience works', () => {
    const cart = makeUserCart({ total: 200 });
    cart.applyItemCountDelta(1);
    const items = [makeCartItem({ quantity: 1, unitPrice: 200 })];
    expect(CartEligibilityService.isEligibleForCheckout(cart, items)).toBe(true);
  });
});
