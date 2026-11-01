/**
 * DeviceTrustService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceTrustService } from '@domain/services/device-trust.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('DeviceTrustService', () => {
  describe('config getters', () => {
    it('should return positive', () => {
      expect(DeviceTrustService.maxDevicesPerUser()).toBeGreaterThan(0);
      expect(DeviceTrustService.trustExpiryDays()).toBeGreaterThan(0);
    });
  });

  describe('trustUntilDate()', () => {
    it('should be future', () => {
      const d = DeviceTrustService.trustUntilDate();
      expect(d.getTime()).toBeGreaterThan(Date.now());
    });

    it('should respect days param', () => {
      const now = Date.now();
      const d = DeviceTrustService.trustUntilDate(now, 1);
      const expected = now + 24 * 3600 * 1000;
      expect(d.getTime()).toBe(expected);
    });
  });

  describe('assertDeviceLimit()', () => {
    it('should pass below limit', () => {
      expect(() => DeviceTrustService.assertDeviceLimit(0)).not.toThrow();
    });

    it('should throw at limit', () => {
      expect(() =>
        DeviceTrustService.assertDeviceLimit(DeviceTrustService.maxDevicesPerUser()),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('canTrust()', () => {
    it('true with fingerprint + same IP + no new country', () => {
      expect(
        DeviceTrustService.canTrust({
          hasFingerprint: true,
          sameIp: true,
          fromNewCountry: false,
        }),
      ).toBe(true);
    });

    it('false without fingerprint', () => {
      expect(
        DeviceTrustService.canTrust({
          hasFingerprint: false,
          sameIp: true,
          fromNewCountry: false,
        }),
      ).toBe(false);
    });

    it('false from new country', () => {
      expect(
        DeviceTrustService.canTrust({
          hasFingerprint: true,
          sameIp: true,
          fromNewCountry: true,
        }),
      ).toBe(false);
    });
  });

  describe('isTrustExpired()', () => {
    it('false for future', () => {
      const future = new Date(Date.now() + 3600_000).toISOString();
      expect(DeviceTrustService.isTrustExpired(future)).toBe(false);
    });

    it('true for past', () => {
      const past = new Date(Date.now() - 3600_000).toISOString();
      expect(DeviceTrustService.isTrustExpired(past)).toBe(true);
    });
  });
});
