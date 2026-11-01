/**
 * CanAddItemSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanAddItemSpecification } from '@domain/specifications/can-add-item.specification.js';
import { makeUserCart } from '../../../fixtures/index';

describe('CanAddItemSpecification', () => {
  it('satisfied for modifiable cart', () => {
    const cart = makeUserCart();
    const spec = new CanAddItemSpecification();
    expect(
      spec.isSatisfiedBy({ cart, existingItems: [], requestedQuantity: 1 }),
    ).toBe(true);
  });

  it('rejects when cart not modifiable', () => {
    const cart = makeUserCart();
    cart.expire();
    const spec = new CanAddItemSpecification();
    expect(
      spec.isSatisfiedBy({ cart, existingItems: [], requestedQuantity: 1 }),
    ).toBe(false);
  });

  it('rejects invalid quantity', () => {
    const cart = makeUserCart();
    const spec = new CanAddItemSpecification();
    expect(
      spec.isSatisfiedBy({ cart, existingItems: [], requestedQuantity: 0 }),
    ).toBe(false);
    expect(
      spec.isSatisfiedBy({ cart, existingItems: [], requestedQuantity: 1000 }),
    ).toBe(false);
  });

  it('explain() gives human reason', () => {
    const cart = makeUserCart();
    cart.expire();
    const spec = new CanAddItemSpecification();
    const reason = spec.explain({ cart, existingItems: [], requestedQuantity: 1 });
    expect(reason).toMatch(/cannot be modified/i);
  });
});
