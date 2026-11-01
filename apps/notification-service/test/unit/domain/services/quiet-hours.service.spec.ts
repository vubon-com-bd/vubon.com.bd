import { QuietHoursService } from '@domain/services/quiet-hours.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const NOW = '2025-01-15T14:00:00Z'; // 14:00 UTC

describe('QuietHoursService', () => {
  describe('check()', () => {
    it('returns false when disabled', () => {
      const r = QuietHoursService.check({
        config: { enabled: false, timezone: 'UTC' },
        now: NOW,
      });
      expect(r.inQuietHours).toBe(false);
      expect(r.localHour).toBe(14);
    });

    it('detects quiet hours (start < end)', () => {
      const r = QuietHoursService.check({
        config: { enabled: true, start: 9, end: 17, timezone: 'UTC' },
        now: NOW,
      });
      expect(r.inQuietHours).toBe(true);
    });

    it('not in quiet hours when outside window', () => {
      const r = QuietHoursService.check({
        config: { enabled: true, start: 22, end: 8, timezone: 'UTC' },
        now: NOW,
      });
      expect(r.inQuietHours).toBe(false);
    });

    it('wraps midnight (22-8, hour=23)', () => {
      const r = QuietHoursService.check({
        config: { enabled: true, start: 22, end: 8, timezone: 'UTC' },
        now: '2025-01-15T23:00:00Z',
      });
      expect(r.inQuietHours).toBe(true);
    });

    it('throws on missing start/end when enabled', () => {
      expect(() =>
        QuietHoursService.check({
          config: { enabled: true, timezone: 'UTC' },
          now: NOW,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws on invalid start/end', () => {
      expect(() =>
        QuietHoursService.check({
          config: { enabled: true, start: 25, end: 8, timezone: 'UTC' },
          now: NOW,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws when start === end', () => {
      expect(() =>
        QuietHoursService.check({
          config: { enabled: true, start: 22, end: 22, timezone: 'UTC' },
          now: NOW,
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('localHour()', () => {
    it('converts UTC hour', () => {
      expect(QuietHoursService.localHour(NOW, 'UTC')).toBe(14);
    });

    it('handles invalid timezone gracefully', () => {
      const hour = QuietHoursService.localHour(NOW, 'Invalid/Zone');
      expect(hour).toBeGreaterThanOrEqual(0);
      expect(hour).toBeLessThan(24);
    });
  });

  describe('msUntilAllowed()', () => {
    it('returns 0 when disabled', () => {
      expect(
        QuietHoursService.msUntilAllowed({ enabled: false, timezone: 'UTC' }, NOW),
      ).toBe(0);
    });

    it('returns 0 when not in quiet hours', () => {
      expect(
        QuietHoursService.msUntilAllowed({ enabled: true, start: 22, end: 8, timezone: 'UTC' }, NOW),
      ).toBe(0);
    });

    it('returns positive when in quiet hours', () => {
      const ms = QuietHoursService.msUntilAllowed(
        { enabled: true, start: 22, end: 8, timezone: 'UTC' },
        '2025-01-15T23:00:00Z',
      );
      expect(ms).toBeGreaterThan(0);
    });
  });
});
