/**
 * CouponStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CouponStatusVO } from '@domain/value-objects/primitives/coupon-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CouponStatusVO', () => {
  it('create() accepts known statuses', () => {
    const statuses = ['active', 'inactive', 'expired', 'scheduled', 'exhausted', 'disabled'];
    for (const s of statuses) {
      expect(CouponStatusVO.create(s).value).toBe(s);
    }
  });

  it('create() throws on invalid', () => {
    expect(() => CouponStatusVO.create('bogus')).toThrow(ValidationError);
  });

  it('active() factory', () => {
    expect(CouponStatusVO.active().value).toBe('active');
  });

  it('isUsable() true for active only', () => {
    expect(CouponStatusVO.active().isUsable()).toBe(true);
    expect(CouponStatusVO.create('disabled').isUsable()).toBe(false);
  });

  it('isFinal() for expired/exhausted', () => {
    expect(CouponStatusVO.create('expired').isFinal()).toBe(true);
    expect(CouponStatusVO.create('exhausted').isFinal()).toBe(true);
    expect(CouponStatusVO.active().isFinal()).toBe(false);
  });

  it('state machine', () => {
    expect(CouponStatusVO.active().canTransitionTo('expired')).toBe(true);
    expect(CouponStatusVO.create('expired').canTransitionTo('active')).toBe(false);
  });
});
