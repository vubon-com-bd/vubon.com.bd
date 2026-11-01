/**
 * CartCouponEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { makeCartCoupon } from '../../../fixtures/index';

describe('CartCouponEntity', () => {
  it('is usable when active', () => {
    const c = makeCartCoupon();
    expect(c.isUsable()).toBe(true);
  });

  it('canBeApplied() checks min order', () => {
    const c = makeCartCoupon({ minOrderAmount: 500 });
    expect(c.meetsMinOrder(400)).toBe(false);
    expect(c.meetsMinOrder(500)).toBe(true);
    expect(c.meetsMinOrder(600)).toBe(true);
  });

  it('isExpired() with default now works', () => {
    const c = makeCartCoupon({ expiresAt: '2020-01-01T00:00:00.000Z' });
    expect(c.isExpired()).toBe(true);
  });

  it('updateAppliedAmount() sets amount', () => {
    const c = makeCartCoupon();
    c.updateAppliedAmount(25);
    expect(c.appliedDiscountAmount).toBe(25);
  });

  it('updateAppliedAmount() rejects negative', () => {
    const c = makeCartCoupon();
    expect(() => c.updateAppliedAmount(-5)).toThrow();
  });

  it('disable() moves to disabled', () => {
    const c = makeCartCoupon();
    c.disable();
    expect(c.isUsable()).toBe(false);
  });
});
