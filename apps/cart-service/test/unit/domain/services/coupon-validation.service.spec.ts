/**
 * CouponValidationService — Unit Tests
 */
import { CouponValidationService } from '../../../../src/module/domain/services/coupon-validation.service.js';
import { CartCouponCompositeVO } from '../../../../src/module/domain/value-objects/composites/cart-coupon.vo.js';
import { CouponCodeVO } from '../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import { COUPON_DISCOUNT_TYPE, COUPON_STATUS } from '@vubon/shared-constants/business/cart';

function makeCoupon(overrides = {}) {
  return CartCouponCompositeVO.create({
    code: CouponCodeVO.create('SAVE10'),
    status: CouponStatusVO.create(COUPON_STATUS.ACTIVE),
    discountType: COUPON_DISCOUNT_TYPE.CART_PERCENTAGE,
    discountValue: 10,
    maxUses: 100,
    usedCount: 0,
    maxUsesPerUser: 1,
    userUsageCount: 0,
    validFrom: '2020-01-01T00:00:00Z',
    validUntil: '2099-12-31T23:59:59Z',
    stackable: false,
    ...overrides,
  });
}

describe('CouponValidationService', () => {
  const svc = new CouponValidationService();

  describe('validate()', () => {
    it('valid for active coupon within window', () => {
      const r = svc.validate(makeCoupon(), { subtotal: 1000, currency: 'BDT' });
      expect(r.valid).toBe(true);
      expect(r.discount).toBe(100);
    });

    it('invalid when status not usable', () => {
      const r = svc.validate(
        makeCoupon({ status: CouponStatusVO.create(COUPON_STATUS.EXPIRED) }),
        { subtotal: 1000, currency: 'BDT' },
      );
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('COUPON_NOT_ACTIVE');
    });

    it('invalid outside validity window', () => {
      const r = svc.validate(
        makeCoupon({ validFrom: '2099-01-01T00:00:00Z', validUntil: '2099-12-31T00:00:00Z' }),
        { subtotal: 1000, currency: 'BDT' },
      );
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('COUPON_OUT_OF_WINDOW');
    });

    it('invalid when global uses exhausted', () => {
      const r = svc.validate(
        makeCoupon({ usedCount: 100, maxUses: 100 }),
        { subtotal: 1000, currency: 'BDT' },
      );
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('COUPON_EXHAUSTED');
    });

    it('invalid when user uses exhausted', () => {
      const r = svc.validate(
        makeCoupon({ userUsageCount: 1, maxUsesPerUser: 1 }),
        { subtotal: 1000, currency: 'BDT' },
      );
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('COUPON_USER_LIMIT');
    });

    it('invalid when below min order amount', () => {
      const r = svc.validate(
        makeCoupon({ minOrderAmount: 5000 }),
        { subtotal: 1000, currency: 'BDT' },
      );
      expect(r.valid).toBe(false);
      expect(r.errorCode).toBe('COUPON_MIN_ORDER');
    });

    it('returns computed discount on valid', () => {
      const r = svc.validate(
        makeCoupon({ discountValue: 25 }),
        { subtotal: 1000, currency: 'BDT' },
      );
      expect(r.discount).toBe(250);
    });
  });

  describe('computeDiscount()', () => {
    it('returns discount amount', () => {
      const d = svc.computeDiscount(makeCoupon(), 1000);
      expect(d).toBe(100);
    });

    it('returns 0 for zero subtotal', () => {
      const d = svc.computeDiscount(makeCoupon(), 0);
      expect(d).toBe(0);
    });
  });

  describe('canStack()', () => {
    it('true when both stackable', () => {
      const a = makeCoupon({ stackable: true });
      const b = makeCoupon({ stackable: true });
      expect(svc.canStack(a, b)).toBe(true);
    });

    it('false when either not stackable', () => {
      const a = makeCoupon({ stackable: true });
      const b = makeCoupon({ stackable: false });
      expect(svc.canStack(a, b)).toBe(false);
    });
  });
});
