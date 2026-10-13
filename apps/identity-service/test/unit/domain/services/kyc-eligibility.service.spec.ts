/**
 * KycEligibilityService — Unit Tests
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll, afterAll, jest } from '@jest/globals';
import { KycEligibilityService } from '../../../../src/module/domain/services/kyc-eligibility.service.js';

describe('KycEligibilityService', () => {
  describe('check()', () => {
    it('eligible when all conditions met', () => {
      const result = KycEligibilityService.check({
        userStatus: 'active',
        userType: 'individual',
        emailVerified: true,
        phoneVerified: false,
        documentCount: 1,
      });
      expect(result.eligible).toBe(true);
    });

    it('not eligible when user inactive', () => {
      const result = KycEligibilityService.check({
        userStatus: 'pending',
        userType: 'individual',
        emailVerified: true,
        phoneVerified: false,
        documentCount: 1,
      });
      expect(result.eligible).toBe(false);
      expect(result.reasons).toContain('user must be active');
    });

    it('not eligible without email verified', () => {
      const result = KycEligibilityService.check({
        userStatus: 'active',
        userType: 'individual',
        emailVerified: false,
        phoneVerified: false,
        documentCount: 1,
      });
      expect(result.eligible).toBe(false);
    });

    it('not eligible without documents', () => {
      const result = KycEligibilityService.check({
        userStatus: 'active',
        userType: 'individual',
        emailVerified: true,
        phoneVerified: false,
        documentCount: 0,
      });
      expect(result.eligible).toBe(false);
    });

    it('not eligible when already approved', () => {
      const result = KycEligibilityService.check({
        userStatus: 'active',
        userType: 'individual',
        emailVerified: true,
        phoneVerified: false,
        documentCount: 1,
        currentKycStatus: 'approved',
      });
      expect(result.eligible).toBe(false);
    });
  });

  describe('requiresKyc()', () => {
    it('true for business/vendor', () => {
      expect(KycEligibilityService.requiresKyc('business')).toBe(true);
      expect(KycEligibilityService.requiresKyc('vendor')).toBe(true);
    });

    it('false for individual', () => {
      expect(KycEligibilityService.requiresKyc('individual')).toBe(false);
    });
  });
});
