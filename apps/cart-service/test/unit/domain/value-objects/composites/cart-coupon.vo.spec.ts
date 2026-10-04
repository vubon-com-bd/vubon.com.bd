/**
 * CartCouponCompositeVO — Unit Tests
 */
import { CartCouponCompositeVO } from '../../../../../src/module/domain/value-objects/composites/cart-coupon.vo.js';
import { CouponCodeVO } from '../../../../../src/module/domain/value-objects/primitives/coupon-code.vo.js';
import { CouponStatusVO } from '../../../../../src/module/domain/value-objects/primitives/coupon-status.vo.js';
import {
  COUPON_DISCOUNT_TYPE,
  COUPON_STATUS,
} from '@vubon/shared-constants/business/cart';

function makeProps(overrides: Partial<Parameters<typeof CartCouponCompositeVO.create>[0]> = {}) {
  return {
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
  };
}

describe('CartCouponCompositeVO', () => {
  describe('create()', () => {
    it('creates valid VO', () => {
      const vo = CartCouponCompositeVO.create(makeProps());
      expect(vo.code.value).toBe('SAVE10');
    });

    it('throws on negative discountValue', () => {
      expect(() => CartCouponCompositeVO.create(makeProps({ discountValue: -1 }))).toThrow();
    });

    it('throws on negative maxDiscountAmount', () => {
      expect(() =>
        CartCouponCompositeVO.create(makeProps({ maxDiscountAmount: -1 })),
      ).toThrow();
    });

    it('throws on negative maxUses', () => {
      expect(() => CartCouponCompositeVO.create(makeProps({ maxUses: -1 }))).toThrow();
    });
  });

  describe('isPercentage()', () => {
    it('true for cart_percentage', () => {
      expect(
        CartCouponCompositeVO.create(
          makeProps({ discountType: COUPON_DISCOUNT_TYPE.CART_PERCENTAGE }),
        ).isPercentage(),
      ).toBe(true);
    });

    it('true for product_percentage', () => {
      expect(
        CartCouponCompositeVO.create(
          makeProps({ discountType: COUPON_DISCOUNT_TYPE.PRODUCT_PERCENTAGE }),
        ).isPercentage(),
      ).toBe(true);
    });

    it('false for fixed', () => {
      expect(
        CartCouponCompositeVO.create(
          makeProps({ discountType: COUPON_DISCOUNT_TYPE.CART_FIXED }),
        ).isPercentage(),
      ).toBe(false);
    });
  });

  describe('isFixed()', () => {
    it('true for cart_fixed', () => {
      expect(
        CartCouponCompositeVO.create(
          makeProps({ discountType: COUPON_DISCOUNT_TYPE.CART_FIXED }),
        ).isFixed(),
      ).toBe(true);
    });

    it('false for percentage', () => {
      expect(
        CartCouponCompositeVO.create(
          makeProps({ discountType: COUPON_DISCOUNT_TYPE.CART_PERCENTAGE }),
        ).isFixed(),
      ).toBe(false);
    });
  });

  describe('isFreeShipping()', () => {
    it('true for shipping_free', () => {
      expect(
        CartCouponCompositeVO.create(
          makeProps({ discountType: COUPON_DISCOUNT_TYPE.SHIPPING_FREE }),
        ).isFreeShipping(),
      ).toBe(true);
    });
  });

  describe('isWithinWindow()', () => {
    it('true when now is between validFrom and validUntil', () => {
      const vo = CartCouponCompositeVO.create(makeProps());
      expect(vo.isWithinWindow(new Date('2050-01-01T00:00:00Z'))).toBe(true);
    });

    it('false when now before validFrom', () => {
      const vo = CartCouponCompositeVO.create(makeProps());
      expect(vo.isWithinWindow(new Date('2019-01-01T00:00:00Z'))).toBe(false);
    });

    it('false when now after validUntil', () => {
      const vo = CartCouponCompositeVO.create(makeProps());
      expect(vo.isWithinWindow(new Date('2100-01-01T00:00:00Z'))).toBe(false);
    });
  });

  describe('hasGlobalUsesLeft()', () => {
    it('true when usedCount < maxUses', () => {
      const vo = CartCouponCompositeVO.create(makeProps({ usedCount: 5, maxUses: 10 }));
      expect(vo.hasGlobalUsesLeft()).toBe(true);
    });

    it('false when usedCount == maxUses', () => {
      const vo = CartCouponCompositeVO.create(makeProps({ usedCount: 10, maxUses: 10 }));
      expect(vo.hasGlobalUsesLeft()).toBe(false);
    });
  });

  describe('hasUserUsesLeft()', () => {
    it('true when userUsageCount < maxUsesPerUser', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ userUsageCount: 0, maxUsesPerUser: 1 }),
      );
      expect(vo.hasUserUsesLeft()).toBe(true);
    });

    it('false when userUsageCount == maxUsesPerUser', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ userUsageCount: 1, maxUsesPerUser: 1 }),
      );
      expect(vo.hasUserUsesLeft()).toBe(false);
    });
  });

  describe('meetsMinOrder()', () => {
    it('true when no minOrderAmount', () => {
      const vo = CartCouponCompositeVO.create(makeProps());
      expect(vo.meetsMinOrder(0)).toBe(true);
    });

    it('true when subtotal >= minOrderAmount', () => {
      const vo = CartCouponCompositeVO.create(makeProps({ minOrderAmount: 500 }));
      expect(vo.meetsMinOrder(500)).toBe(true);
      expect(vo.meetsMinOrder(1000)).toBe(true);
    });

    it('false when subtotal < minOrderAmount', () => {
      const vo = CartCouponCompositeVO.create(makeProps({ minOrderAmount: 500 }));
      expect(vo.meetsMinOrder(499)).toBe(false);
    });
  });

  describe('computeDiscount()', () => {
    it('computes 10% of 1000 = 100', () => {
      const vo = CartCouponCompositeVO.create(makeProps({ discountValue: 10 }));
      expect(vo.computeDiscount(1000)).toBe(100);
    });

    it('caps at maxDiscountAmount', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ discountValue: 50, maxDiscountAmount: 200 }),
      );
      expect(vo.computeDiscount(1000)).toBe(200);
    });

    it('computes fixed discount', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ discountType: COUPON_DISCOUNT_TYPE.CART_FIXED, discountValue: 150 }),
      );
      expect(vo.computeDiscount(1000)).toBe(150);
    });

    it('caps fixed at subtotal', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ discountType: COUPON_DISCOUNT_TYPE.CART_FIXED, discountValue: 9999 }),
      );
      expect(vo.computeDiscount(100)).toBe(100);
    });

    it('returns 0 for zero subtotal', () => {
      const vo = CartCouponCompositeVO.create(makeProps());
      expect(vo.computeDiscount(0)).toBe(0);
    });

    it('returns 0 for inactive status', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ status: CouponStatusVO.create(COUPON_STATUS.EXPIRED) }),
      );
      expect(vo.computeDiscount(1000)).toBe(0);
    });

    it('returns 0 outside validity window', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ validFrom: '2099-01-01T00:00:00Z', validUntil: '2099-12-31T00:00:00Z' }),
      );
      expect(vo.computeDiscount(1000)).toBe(0);
    });

    it('returns 0 when user limit exhausted', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ userUsageCount: 5, maxUsesPerUser: 1 }),
      );
      expect(vo.computeDiscount(1000)).toBe(0);
    });

    it('returns 0 when min order not met', () => {
      const vo = CartCouponCompositeVO.create(makeProps({ minOrderAmount: 5000 }));
      expect(vo.computeDiscount(1000)).toBe(0);
    });

    it('returns 0 for free_shipping type (handled by shipping)', () => {
      const vo = CartCouponCompositeVO.create(
        makeProps({ discountType: COUPON_DISCOUNT_TYPE.SHIPPING_FREE }),
      );
      expect(vo.computeDiscount(1000)).toBe(0);
    });
  });
});
