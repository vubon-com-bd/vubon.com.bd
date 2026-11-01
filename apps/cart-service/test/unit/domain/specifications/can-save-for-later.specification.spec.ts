/**
 * CanSaveForLaterSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanSaveForLaterSpecification } from '@domain/specifications/can-save-for-later.specification.js';
import { makeUserCart } from '../../../fixtures/index';
import { makeCartItem } from '../../../fixtures/index';

describe('CanSaveForLaterSpecification', () => {
  it('satisfied for valid item', () => {
    const cart = makeUserCart();
    const item = makeCartItem();
    const spec = new CanSaveForLaterSpecification();
    expect(spec.isSatisfiedBy({ cart, item, alreadySaved: false })).toBe(true);
  });

  it('rejects already saved', () => {
    const cart = makeUserCart();
    const item = makeCartItem();
    const spec = new CanSaveForLaterSpecification();
    expect(spec.isSatisfiedBy({ cart, item, alreadySaved: true })).toBe(false);
  });

  it('rejects removed item', () => {
    const cart = makeUserCart();
    const item = makeCartItem();
    item.markRemoved();
    const spec = new CanSaveForLaterSpecification();
    expect(spec.isSatisfiedBy({ cart, item, alreadySaved: false })).toBe(false);
  });
});
