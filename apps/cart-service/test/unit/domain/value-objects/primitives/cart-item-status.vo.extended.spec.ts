/**
 * CartItemStatusVO extended tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartItemStatusVO } from '@domain/value-objects/primitives/cart-item-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CartItemStatusVO — extended', () => {
  it.each([
    'active', 'out_of_stock', 'unavailable', 'removed', 'saved',
  ])('accepts %s', (s) => {
    expect(CartItemStatusVO.create(s).value).toBe(s);
  });

  it('throws on invalid', () => {
    expect(() => CartItemStatusVO.create('bogus')).toThrow(ValidationError);
  });

  it('active() factory', () => {
    expect(CartItemStatusVO.active().value).toBe('active');
  });

  it('reconstitute() bypasses validation', () => {
    expect(CartItemStatusVO.reconstitute('active').value).toBe('active');
  });

  it('predicates cover all', () => {
    expect(CartItemStatusVO.active().isActiveStatus()).toBe(true);
    expect(CartItemStatusVO.create('out_of_stock').isOutOfStock()).toBe(true);
    expect(CartItemStatusVO.create('unavailable').isUnavailable()).toBe(true);
    expect(CartItemStatusVO.create('removed').isRemoved()).toBe(true);
    expect(CartItemStatusVO.create('saved').isSaved()).toBe(true);
  });

  it('isPurchasable() only for active', () => {
    expect(CartItemStatusVO.active().isPurchasable()).toBe(true);
    expect(CartItemStatusVO.create('removed').isPurchasable()).toBe(false);
  });

  it('state machine transitions', () => {
    const active = CartItemStatusVO.active();
    expect(active.canTransitionTo('out_of_stock')).toBe(true);
    expect(active.canTransitionTo('saved')).toBe(true);
    const removed = CartItemStatusVO.create('removed');
    expect(removed.canTransitionTo('active')).toBe(true);
    expect(removed.canTransitionTo('saved')).toBe(false);
  });
});
