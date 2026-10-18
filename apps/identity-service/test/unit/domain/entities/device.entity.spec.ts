/**
 * DeviceEntity unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { DeviceEntity } from '@domain/entities/device.entity.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  TEST_DATES,
  makeDeviceEntity,
  untrustedDevice,
  trustedDevice,
  expiredTrustDevice,
  createNewDevice,
} from '@fixtures/index';

describe('DeviceEntity', () => {
  describe('create()', () => {
    it('should create untrusted + emit registered event', () => {
      const d = createNewDevice();
      expect(d.trusted).toBe(false);
      expect(d.version).toBe(1);
      const events = d.pullDomainEvents();
      expect(events.some((e) => e.type === 'device.registered')).toBe(true);
    });
  });

  describe('isTrustActive()', () => {
    it('false for untrusted', () => {
      expect(untrustedDevice().isTrustActive()).toBe(false);
    });

    it('true for trusted + future expiry', () => {
      expect(trustedDevice().isTrustActive()).toBe(true);
    });

    it('false for trusted but expired', () => {
      expect(expiredTrustDevice().isTrustActive()).toBe(false);
    });
  });

  describe('trust()', () => {
    it('should trust + emit event', () => {
      const d = untrustedDevice();
      d.pullDomainEvents();
      d.trust(TEST_DATES.IN_THIRTY_DAYS);
      expect(d.trusted).toBe(true);
      expect(d.trustedUntil).toBe(TEST_DATES.IN_THIRTY_DAYS);
      const events = d.pullDomainEvents();
      expect(events.some((e) => e.type === 'device.trusted')).toBe(true);
    });

    it('should throw when already trusted', () => {
      const d = trustedDevice();
      expect(() => d.trust(TEST_DATES.IN_THIRTY_DAYS)).toThrow(BusinessRuleError);
    });
  });

  describe('untrust()', () => {
    it('should remove trust', () => {
      const d = trustedDevice();
      d.untrust();
      expect(d.trusted).toBe(false);
      expect(d.trustedUntil).toBeUndefined();
    });

    it('should be idempotent', () => {
      const d = untrustedDevice();
      d.untrust();
      expect(d.trusted).toBe(false);
    });
  });

  describe('touchActive()', () => {
    it('should update lastActiveAt', () => {
      const d = untrustedDevice();
      const before = d.lastActiveAt;
      d.touchActive(TEST_DATES.IN_ONE_HOUR);
      expect(d.lastActiveAt).toBe(TEST_DATES.IN_ONE_HOUR);
      expect(d.lastActiveAt).not.toBe(before);
    });
  });
});
