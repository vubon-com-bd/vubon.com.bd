import { ScheduleCalculatorService } from '@domain/services/schedule-calculator.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

const NOW = new Date().toISOString();

describe('ScheduleCalculatorService', () => {
  describe('nextRun()', () => {
    it('daily adds 24h', () => {
      const r = ScheduleCalculatorService.nextRun({ frequency: 'daily', from: NOW });
      expect(r.intervalMs).toBe(86_400_000);
    });

    it('hourly adds 1h', () => {
      const r = ScheduleCalculatorService.nextRun({ frequency: 'hourly', from: NOW });
      expect(r.intervalMs).toBe(3_600_000);
    });

    it('weekly adds 7 days', () => {
      const r = ScheduleCalculatorService.nextRun({ frequency: 'weekly', from: NOW });
      expect(r.intervalMs).toBe(7 * 86_400_000);
    });

    it('biweekly adds 14 days', () => {
      const r = ScheduleCalculatorService.nextRun({ frequency: 'biweekly', from: NOW });
      expect(r.intervalMs).toBe(14 * 86_400_000);
    });

    it('monthly adds 30 days', () => {
      const r = ScheduleCalculatorService.nextRun({ frequency: 'monthly', from: NOW });
      expect(r.intervalMs).toBe(30 * 86_400_000);
    });

    it('quarterly adds 90 days', () => {
      const r = ScheduleCalculatorService.nextRun({ frequency: 'quarterly', from: NOW });
      expect(r.intervalMs).toBe(90 * 86_400_000);
    });

    it('yearly adds 365 days', () => {
      const r = ScheduleCalculatorService.nextRun({ frequency: 'yearly', from: NOW });
      expect(r.intervalMs).toBe(365 * 86_400_000);
    });

    it('throws on unsupported frequency', () => {
      expect(() =>
        ScheduleCalculatorService.nextRun({ frequency: 'monthlyish', from: NOW }),
      ).toThrow(BusinessRuleError);
    });

    it('throws on invalid from', () => {
      expect(() =>
        ScheduleCalculatorService.nextRun({ frequency: 'daily', from: 'garbage' }),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('nextN()', () => {
    it('generates 3 future times', () => {
      const result = ScheduleCalculatorService.nextN({ frequency: 'daily', from: NOW }, 3);
      expect(result.length).toBe(3);
    });

    it('throws on count < 1', () => {
      expect(() =>
        ScheduleCalculatorService.nextN({ frequency: 'daily', from: NOW }, 0),
      ).toThrow(BusinessRuleError);
    });

    it('throws on count > 365', () => {
      expect(() =>
        ScheduleCalculatorService.nextN({ frequency: 'daily', from: NOW }, 400),
      ).toThrow(BusinessRuleError);
    });
  });

  describe('isRecurring()', () => {
    it('true for daily', () => {
      expect(ScheduleCalculatorService.isRecurring('daily')).toBe(true);
    });

    it('false for none', () => {
      expect(ScheduleCalculatorService.isRecurring('none')).toBe(false);
    });
  });

  describe('estimateRuns()', () => {
    it('estimates 7 for a week of daily', () => {
      const from = NOW;
      const to = new Date(Date.now() + 7 * 86_400_000).toISOString();
      expect(ScheduleCalculatorService.estimateRuns('daily', from, to)).toBe(7);
    });

    it('returns 0 for unknown frequency', () => {
      const to = new Date(Date.now() + 7 * 86_400_000).toISOString();
      expect(ScheduleCalculatorService.estimateRuns('unknown', NOW, to)).toBe(0);
    });
  });
});
