import { DigestSchedulerService } from '@domain/services/digest-scheduler.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const NOW = new Date().toISOString();

describe('DigestSchedulerService', () => {
  describe('nextSchedule()', () => {
    it('daily returns period', () => {
      const r = DigestSchedulerService.nextSchedule({
        frequency: 'daily',
        sendHour: 9,
        timezone: 'UTC',
        now: NOW,
      });
      expect(r.nextSendAt).toBeDefined();
      expect(r.periodStart).toBeDefined();
      expect(r.periodEnd).toBeDefined();
    });

    it('hourly returns 1h period', () => {
      const r = DigestSchedulerService.nextSchedule({
        frequency: 'hourly',
        sendHour: 9,
        timezone: 'UTC',
        now: NOW,
      });
      const dur = new Date(r.periodEnd).getTime() - new Date(r.periodStart).getTime();
      expect(dur).toBe(3_600_000);
    });

    it('weekly returns 7d period', () => {
      const r = DigestSchedulerService.nextSchedule({
        frequency: 'weekly',
        sendHour: 9,
        timezone: 'UTC',
        now: NOW,
      });
      const dur = new Date(r.periodEnd).getTime() - new Date(r.periodStart).getTime();
      expect(dur).toBe(7 * 86_400_000);
    });

    it('biweekly returns 14d period', () => {
      const r = DigestSchedulerService.nextSchedule({
        frequency: 'biweekly',
        sendHour: 9,
        timezone: 'UTC',
        now: NOW,
      });
      const dur = new Date(r.periodEnd).getTime() - new Date(r.periodStart).getTime();
      expect(dur).toBe(14 * 86_400_000);
    });

    it('monthly returns 30d period', () => {
      const r = DigestSchedulerService.nextSchedule({
        frequency: 'monthly',
        sendHour: 9,
        timezone: 'UTC',
        now: NOW,
      });
      const dur = new Date(r.periodEnd).getTime() - new Date(r.periodStart).getTime();
      expect(dur).toBe(30 * 86_400_000);
    });

    it('throws on invalid sendHour', () => {
      expect(() =>
        DigestSchedulerService.nextSchedule({
          frequency: 'daily',
          sendHour: 25,
          timezone: 'UTC',
          now: NOW,
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws on invalid now', () => {
      expect(() =>
        DigestSchedulerService.nextSchedule({
          frequency: 'daily',
          sendHour: 9,
          timezone: 'UTC',
          now: 'garbage',
        }),
      ).toThrow(BusinessRuleError);
    });

    it('throws on unsupported frequency', () => {
      expect(() =>
        DigestSchedulerService.nextSchedule({
          frequency: 'custom',
          sendHour: 9,
          timezone: 'UTC',
          now: NOW,
        }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('defaultConfig()', () => {
    it('returns default freq/hour/tz', () => {
      const config = DigestSchedulerService.defaultConfig();
      expect(config.frequency).toBeDefined();
      expect(config.sendHour).toBeDefined();
      expect(config.timezone).toBeDefined();
    });
  });
});
