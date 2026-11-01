/**
 * OrderEligibilityService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderEligibilityService } from '@domain/services/order-eligibility.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('OrderEligibilityService', () => {
  describe('checkEligibility', () => {
    it('eligible for active customer with valid order', () => {
      const result = OrderEligibilityService.checkEligibility({
        customerStatus: 'active',
        itemCount: 3,
        subtotal: 1000,
        currency: 'BDT',
      });
      expect(result.eligible).toBe(true);
      expect(result.reasons).toEqual([]);
    });

    it('not eligible for blocked customer', () => {
      const result = OrderEligibilityService.checkEligibility({
        customerStatus: 'blocked',
        itemCount: 1,
        subtotal: 100,
        currency: 'BDT',
      });
      expect(result.eligible).toBe(false);
      expect(result.reasons.length).toBeGreaterThan(0);
    });

    it('not eligible for suspended customer', () => {
      const result = OrderEligibilityService.checkEligibility({
        customerStatus: 'suspended',
      });
      expect(result.eligible).toBe(false);
    });

    it('not eligible for 0 items', () => {
      const result = OrderEligibilityService.checkEligibility({ itemCount: 0 });
      expect(result.eligible).toBe(false);
    });

    it('not eligible for > 100 items', () => {
      const result = OrderEligibilityService.checkEligibility({ itemCount: 101 });
      expect(result.eligible).toBe(false);
    });

    it('not eligible for subtotal below min', () => {
      const result = OrderEligibilityService.checkEligibility({ subtotal: 0 });
      expect(result.eligible).toBe(false);
    });

    it('not eligible for subtotal above max', () => {
      const result = OrderEligibilityService.checkEligibility({ subtotal: 20000000 });
      expect(result.eligible).toBe(false);
    });

    it('not eligible for invalid currency', () => {
      const result = OrderEligibilityService.checkEligibility({ currency: 'BD' });
      expect(result.eligible).toBe(false);
    });

    it('empty context is eligible', () => {
      const result = OrderEligibilityService.checkEligibility({});
      expect(result.eligible).toBe(true);
    });
  });

  describe('assertEligible', () => {
    it('passes for eligible order', () => {
      expect(() =>
        OrderEligibilityService.assertEligible({
          customerStatus: 'active',
          itemCount: 1,
          subtotal: 100,
        }),
      ).not.toThrow();
    });

    it('throws for ineligible order', () => {
      expect(() =>
        OrderEligibilityService.assertEligible({ customerStatus: 'blocked' }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('isBlacklisted', () => {
    it('true for blocked', () => {
      expect(OrderEligibilityService.isBlacklisted('blocked')).toBe(true);
    });

    it('true for suspended', () => {
      expect(OrderEligibilityService.isBlacklisted('suspended')).toBe(true);
    });

    it('false for active', () => {
      expect(OrderEligibilityService.isBlacklisted('active')).toBe(false);
    });

    it('false for undefined', () => {
      expect(OrderEligibilityService.isBlacklisted(undefined)).toBe(false);
    });
  });
});
