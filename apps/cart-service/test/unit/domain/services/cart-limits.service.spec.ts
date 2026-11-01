/**
 * CartLimitsService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import {
  CartLimitsService,
  DEFAULT_CART_LIMITS,
} from '@domain/services/cart-limits.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { makeUserCart } from '../../../fixtures/index';

describe('CartLimitsService', () => {
  it('assertCanAddItem() passes under limit', () => {
    const cart = makeUserCart();
    expect(() =>
      CartLimitsService.assertCanAddItem(cart, []),
    ).not.toThrow();
  });

  it('assertCanAddItem() throws at max', () => {
    const cart = makeUserCart();
    const items = new Array(DEFAULT_CART_LIMITS.maxItems).fill({});
    expect(() =>
      CartLimitsService.assertCanAddItem(cart, items as never[]),
    ).toThrow(BusinessRuleError);
  });

  it('assertQuantityWithinLimits() valid', () => {
    expect(() => CartLimitsService.assertQuantityWithinLimits(5)).not.toThrow();
  });

  it('assertQuantityWithinLimits() throws below min', () => {
    expect(() => CartLimitsService.assertQuantityWithinLimits(0)).toThrow(
      BusinessRuleError,
    );
  });

  it('assertQuantityWithinLimits() throws above max', () => {
    expect(() => CartLimitsService.assertQuantityWithinLimits(1000)).toThrow(
      BusinessRuleError,
    );
  });

  it('assertQuantityWithinLimits() throws on non-integer', () => {
    expect(() => CartLimitsService.assertQuantityWithinLimits(1.5)).toThrow(
      BusinessRuleError,
    );
  });

  it('assertCouponLimit() under limit ok', () => {
    expect(() => CartLimitsService.assertCouponLimit(0)).not.toThrow();
  });

  it('assertCouponLimit() at limit throws', () => {
    expect(() => CartLimitsService.assertCouponLimit(1)).toThrow(BusinessRuleError);
  });

  it('assertVoucherLimit() at limit throws', () => {
    expect(() => CartLimitsService.assertVoucherLimit(1)).toThrow(BusinessRuleError);
  });

  it('assertTotalLimit() under limit ok', () => {
    expect(() =>
      CartLimitsService.assertTotalLimit(50, {
        ...DEFAULT_CART_LIMITS,
        maxTotal: 1000,
      }),
    ).not.toThrow();
  });

  it('assertTotalLimit() over limit throws', () => {
    expect(() =>
      CartLimitsService.assertTotalLimit(2000, {
        ...DEFAULT_CART_LIMITS,
        maxTotal: 1000,
      }),
    ).toThrow(BusinessRuleError);
  });
});
