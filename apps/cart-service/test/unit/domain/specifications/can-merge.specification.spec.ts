/**
 * CanMergeSpecification unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CanMergeSpecification } from '@domain/specifications/can-merge.specification.js';
import { makeUserCart, makeGuestCart } from '../../../fixtures/index';

describe('CanMergeSpecification', () => {
  it('rejects identical carts', () => {
    const cart = makeUserCart();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source: cart, target: cart })).toBe(false);
  });

  it('rejects empty source', () => {
    const source = makeGuestCart();
    const target = makeUserCart();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source, target })).toBe(false);
  });

  it('rejects inactive target', () => {
    const source = makeGuestCart();
    source.applyItemCountDelta(1);
    const target = makeUserCart();
    target.expire();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source, target })).toBe(false);
  });

  it('satisfied for valid carts', () => {
    const source = makeGuestCart();
    source.applyItemCountDelta(2);
    const target = makeUserCart();
    const spec = new CanMergeSpecification();
    expect(spec.isSatisfiedBy({ source, target })).toBe(true);
  });
});
