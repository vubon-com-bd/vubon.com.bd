import { describe, it, expect } from '@jest/globals';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';

describe('CouponStatusVO — extended getters', () => {
  it('all status predicates', () => {
    expect(CouponStatusVO.create('inactive').isInactive()).toBe(true);
    expect(CouponStatusVO.create('expired').isExpired()).toBe(true);
    expect(CouponStatusVO.create('scheduled').isScheduled()).toBe(true);
    expect(CouponStatusVO.create('exhausted').isExhausted()).toBe(true);
    expect(CouponStatusVO.create('disabled').isDisabled()).toBe(true);
  });

  it('state transitions with disabled', () => {
    expect(CouponStatusVO.create('disabled').canTransitionTo('active')).toBe(true);
  });

  it('reconstitute()', () => {
    expect(CouponStatusVO.reconstitute('active').value).toBe('active');
  });
});
