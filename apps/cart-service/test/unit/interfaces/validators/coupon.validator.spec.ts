/**
 * CouponHttpValidator — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { BadRequestException } from '@nestjs/common';
import { CouponHttpValidator } from '../../../../src/module/interfaces/validators/coupon.validator.js';

const CART_ID = '11111111-1111-1111-1111-111111111111';

describe('CouponHttpValidator', () => {
  describe('validateApply', () => {
    it('should accept valid code', () => {
      expect(() =>
        CouponHttpValidator.validateApply({ cartId: CART_ID, code: 'SAVE10' }),
      ).not.toThrow();
    });

    it('should throw on too-short code', () => {
      expect(() =>
        CouponHttpValidator.validateApply({ cartId: CART_ID, code: 'AB' }),
      ).toThrow(BadRequestException);
    });

    it('should normalize lowercase to uppercase (not throw)', () => {
      expect(() =>
        CouponHttpValidator.validateApply({ cartId: CART_ID, code: 'save10' }),
      ).not.toThrow();
    });

    it('should throw on too-long code', () => {
      expect(() =>
        CouponHttpValidator.validateApply({
          cartId: CART_ID,
          code: 'A'.repeat(33),
        }),
      ).toThrow(BadRequestException);
    });
  });

  describe('validateRemove', () => {
    it('should accept valid', () => {
      expect(() =>
        CouponHttpValidator.validateRemove({ cartId: CART_ID, code: 'SAVE10' }),
      ).not.toThrow();
    });
  });

  describe('validateValidate', () => {
    it('should accept valid', () => {
      expect(() =>
        CouponHttpValidator.validateValidate({ cartId: CART_ID, code: 'SAVE10' }),
      ).not.toThrow();
    });
  });
});
