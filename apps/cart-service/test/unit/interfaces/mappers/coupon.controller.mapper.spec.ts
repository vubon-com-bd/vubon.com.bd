/**
 * CouponControllerMapper — Unit Tests
 * @module test/unit/interfaces/mappers
 */
import { describe, it, expect } from '@jest/globals';
import { CouponControllerMapper } from '../../../../src/module/interfaces/mappers/coupon.controller.mapper.js';
import {
  makeApplyCouponDto,
  makeValidateCouponDto,
  CART_ID,
} from '../../../fixtures/interfaces/http-dto.fixture.js';

describe('CouponControllerMapper', () => {
  describe('toApplyAppDto', () => {
    it('should map code + cartId', () => {
      const http = makeApplyCouponDto();
      const app = CouponControllerMapper.toApplyAppDto(CART_ID, http);
      expect(app.cartId).toBe(CART_ID);
      expect(app.code).toBe('SAVE10');
    });

    it('should propagate idempotencyKey', () => {
      const http = makeApplyCouponDto();
      const app = CouponControllerMapper.toApplyAppDto(CART_ID, http, 'idem-abc');
      expect(app.idempotencyKey).toBe('idem-abc');
    });
  });

  describe('toValidateAppDto', () => {
    it('should map for validation', () => {
      const http = makeValidateCouponDto();
      const app = CouponControllerMapper.toValidateAppDto(CART_ID, http);
      expect(app.code).toBe('SAVE10');
    });
  });

  describe('toCouponHttp', () => {
    it('should map full coupon', () => {
      const app = {
        id: 'c1',
        cartId: CART_ID,
        code: 'SAVE10',
        status: 'active',
        discountType: 'percentage',
        discountValue: 10,
        appliedDiscountAmount: 100,
        currency: 'BDT',
        expiresAt: '2026-12-31',
        appliedAt: '2026-01-01',
        updatedAt: '2026-01-01',
      };
      const http = CouponControllerMapper.toCouponHttp(app as never);
      expect(http.code).toBe('SAVE10');
      expect(http.appliedDiscountAmount).toBe(100);
    });
  });

  describe('toCouponPublicHttp', () => {
    it('should map public coupon', () => {
      const app = {
        id: 'c1',
        code: 'SAVE10',
        discountType: 'percentage',
        discountValue: 10,
        appliedDiscountAmount: 100,
        expiresAt: '2026-12-31',
      };
      const http = CouponControllerMapper.toCouponPublicHttp(app as never);
      expect(http.code).toBe('SAVE10');
    });
  });

  describe('toCouponValidationHttp', () => {
    it('should map validation result', () => {
      const app = { valid: true, code: 'SAVE10', discountAmount: 100 };
      const http = CouponControllerMapper.toCouponValidationHttp(app as never);
      expect(http.valid).toBe(true);
    });
  });

  describe('toVoucherHttp', () => {
    it('should map voucher', () => {
      const app = {
        id: 'v1',
        cartId: CART_ID,
        code: 'GIFT2026',
        status: 'active',
        remainingAmount: 500,
        appliedAmount: 0,
        currency: 'BDT',
        expiresAt: '2027-12-31',
        updatedAt: '2026-01-01',
      };
      const http = CouponControllerMapper.toVoucherHttp(app as never);
      expect(http.code).toBe('GIFT2026');
      expect(http.remainingAmount).toBe(500);
    });
  });

  describe('toVoucherValidationHttp', () => {
    it('should map validation', () => {
      const app = {
        valid: true,
        code: 'GIFT2026',
        appliedAmount: 100,
        remainingAmount: 400,
      };
      const http = CouponControllerMapper.toVoucherValidationHttp(app as never);
      expect(http.appliedAmount).toBe(100);
    });
  });
});
