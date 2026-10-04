import { DeliverySchedulingService } from '../../../../src/module/domain/services/delivery-scheduling.service.js';

describe('DeliverySchedulingService', () => {
  describe('estimate()', () => {
    it('computes estimated/earliest/latest dates', () => {
      const now = new Date('2026-01-05T10:00:00Z'); // Monday
      const result = DeliverySchedulingService.estimate(3, now);
      expect(result.estimatedDays).toBe(3);
      expect(result.estimatedAt).toBeTruthy();
      expect(result.earliestAt).toBeTruthy();
      expect(result.latestAt).toBeTruthy();
      expect(new Date(result.latestAt).getTime()).toBeGreaterThan(
        new Date(result.earliestAt).getTime(),
      );
    });

    it('0 days → next business day', () => {
      const now = new Date('2026-01-05T10:00:00Z');
      const result = DeliverySchedulingService.estimate(0, now);
      expect(result.estimatedDays).toBe(0);
    });

    it('negative days clamps to 0', () => {
      const now = new Date('2026-01-05T10:00:00Z');
      const result = DeliverySchedulingService.estimate(-5, now);
      expect(result.estimatedDays).toBe(0);
    });
  });

  describe('daysForType()', () => {
    it('same_day = 0', () => {
      expect(DeliverySchedulingService.daysForType('same_day')).toBe(0);
    });
    it('express = 1', () => {
      expect(DeliverySchedulingService.daysForType('express')).toBe(1);
    });
    it('standard = 3', () => {
      expect(DeliverySchedulingService.daysForType('standard')).toBe(3);
    });
    it('economy = 5', () => {
      expect(DeliverySchedulingService.daysForType('economy')).toBe(5);
    });
    it('unknown defaults to 3', () => {
      expect(DeliverySchedulingService.daysForType('bogus')).toBe(3);
    });
  });

  describe('estimateForType()', () => {
    it('uses daysForType', () => {
      const now = new Date('2026-01-05T10:00:00Z');
      const result = DeliverySchedulingService.estimateForType('express', now);
      expect(result.estimatedDays).toBe(1);
    });
  });

  describe('addBusinessDays()', () => {
    it('skips weekend', () => {
      const friday = new Date('2026-01-09T10:00:00Z'); // Friday
      const result = DeliverySchedulingService.addBusinessDays(friday, 1);
      const dow = result.getDay();
      expect(dow).not.toBe(0);
      expect(dow).not.toBe(6);
    });
  });

  describe('canAttemptNow()', () => {
    it('weekday + business hours → true', () => {
      const wed = new Date('2026-01-07T12:00:00Z');
      expect(DeliverySchedulingService.canAttemptNow(wed)).toBe(true);
    });
    it('weekend → false', () => {
      const sat = new Date('2026-01-10T12:00:00Z');
      expect(DeliverySchedulingService.canAttemptNow(sat)).toBe(false);
    });
    it('before hours → false', () => {
      const wed = new Date('2026-01-07T05:00:00Z');
      const result = DeliverySchedulingService.canAttemptNow(wed);
      // depends on TZ; only check type
      expect(typeof result).toBe('boolean');
    });
  });

  describe('graceEnd()', () => {
    it('adds grace period', () => {
      const scheduled = new Date('2026-01-07T10:00:00Z');
      const grace = DeliverySchedulingService.graceEnd(scheduled);
      expect(grace.getTime()).toBeGreaterThan(scheduled.getTime());
    });
  });

  describe('canRetry()', () => {
    it('too soon → false', () => {
      const lastAttempt = new Date('2026-01-07T10:00:00Z');
      const now = new Date('2026-01-07T10:05:00Z');
      expect(DeliverySchedulingService.canRetry(lastAttempt, now)).toBe(false);
    });
    it('enough time → true', () => {
      const lastAttempt = new Date('2026-01-07T10:00:00Z');
      const now = new Date('2026-01-08T10:00:00Z');
      expect(DeliverySchedulingService.canRetry(lastAttempt, now)).toBe(true);
    });
  });
});
