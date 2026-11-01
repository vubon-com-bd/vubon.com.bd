/**
 * CanCheckoutSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanCheckoutSpecification } from '@domain/specifications/can-checkout.specification.js';
import { makeUserCart } from '../../../fixtures/index';
import { makeCartItem } from '../../../fixtures/index';

describe('CanCheckoutSpecification', () => {
  it('satisfied for valid cart', () => {
    const cart = makeUserCart({ total: 200 });
    cart.applyItemCountDelta(1);
    const spec = new CanCheckoutSpecification();
    const items = [makeCartItem()];
    expect(spec.isSatisfiedBy({ cart, items })).toBe(true);
  });

  it('rejects empty cart', () => {
    const cart = makeUserCart();
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart, items: [] })).toBe(false);
  });

  it('rejects expired cart', () => {
    const cart = makeUserCart({ total: 200 });
    cart.expire();
    const spec = new CanCheckoutSpecification();
    expect(spec.isSatisfiedBy({ cart, items: [makeCartItem()] })).toBe(false);
  });

  it('explain() returns reason', () => {
    const cart = makeUserCart();
    const spec = new CanCheckoutSpecification();
    expect(spec.explain({ cart, items: [] })).toMatch(/empty/i);
  });
});
