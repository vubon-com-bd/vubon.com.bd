/**
 * CouponStatusVO — Unit Tests
 */
import { CouponStatusVO } from '../../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import { COUPON_STATUS } from '@vubon/shared-constants/business/cart';

describe('CouponStatusVO', () => {
  describe('create()', () => {
    it('accepts each valid COUPON_STATUS value', () => {
      Object.values(COUPON_STATUS).forEach((s) => {
        const vo = CouponStatusVO.create(s);
        expect(vo.value).toBe(s);
      });
    });

    it('throws on invalid status', () => {
      expect(() => CouponStatusVO.create('not-a-status')).toThrow();
    });

    it('throws on empty string', () => {
      expect(() => CouponStatusVO.create('')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CouponStatusVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('accepts any string without validation', () => {
      const vo = CouponStatusVO.reconstitute('custom-status');
      expect(vo.value).toBe('custom-status');
    });
  });

  describe('query methods', () => {
    it('isUsable() true only for active', () => {
      expect(CouponStatusVO.create(COUPON_STATUS.ACTIVE).isUsable()).toBe(true);
      expect(CouponStatusVO.create(COUPON_STATUS.EXPIRED).isUsable()).toBe(false);
      expect(CouponStatusVO.create(COUPON_STATUS.DISABLED).isUsable()).toBe(false);
    });

    it('isExpired() true only for expired', () => {
      expect(CouponStatusVO.create(COUPON_STATUS.EXPIRED).isExpired()).toBe(true);
      expect(CouponStatusVO.create(COUPON_STATUS.ACTIVE).isExpired()).toBe(false);
    });

    it('isExhausted() true only for exhausted', () => {
      expect(CouponStatusVO.create(COUPON_STATUS.EXHAUSTED).isExhausted()).toBe(true);
      expect(CouponStatusVO.create(COUPON_STATUS.ACTIVE).isExhausted()).toBe(false);
    });

    it('isScheduled() true only for scheduled', () => {
      expect(CouponStatusVO.create(COUPON_STATUS.SCHEDULED).isScheduled()).toBe(true);
      expect(CouponStatusVO.create(COUPON_STATUS.ACTIVE).isScheduled()).toBe(false);
    });

    it('isDisabled() true only for disabled', () => {
      expect(CouponStatusVO.create(COUPON_STATUS.DISABLED).isDisabled()).toBe(true);
      expect(CouponStatusVO.create(COUPON_STATUS.ACTIVE).isDisabled()).toBe(false);
    });
  });

  describe('equals()', () => {
    it('true for equal statuses', () => {
      const a = CouponStatusVO.create(COUPON_STATUS.ACTIVE);
      const b = CouponStatusVO.create(COUPON_STATUS.ACTIVE);
      expect(a.equals(b)).toBe(true);
    });

    it('false for different statuses', () => {
      const a = CouponStatusVO.create(COUPON_STATUS.ACTIVE);
      const b = CouponStatusVO.create(COUPON_STATUS.EXPIRED);
      expect(a.equals(b)).toBe(false);
    });
  });
});
