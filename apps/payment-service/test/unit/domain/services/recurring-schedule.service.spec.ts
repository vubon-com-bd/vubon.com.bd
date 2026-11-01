/**
 * RecurringScheduleService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecurringScheduleService } from '@domain/services/recurring-schedule.service';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';

describe('RecurringScheduleService', () => {
  describe('advance()', () => {
    it('daily +1', () => {
      const next = RecurringScheduleService.advance(
        new Date('2025-01-15T10:00:00Z'),
        RecurringFrequencyVO.create('daily'),
      );
      expect(next.toISOString()).toBe('2025-01-16T10:00:00.000Z');
    });
    it('weekly +7', () => {
      const next = RecurringScheduleService.advance(
        new Date('2025-01-15T10:00:00Z'),
        RecurringFrequencyVO.create('weekly'),
      );
      expect(next.toISOString()).toBe('2025-01-22T10:00:00.000Z');
    });
    it('biweekly +14', () => {
      const next = RecurringScheduleService.advance(
        new Date('2025-01-15T10:00:00Z'),
        RecurringFrequencyVO.create('biweekly'),
      );
      expect(next.toISOString()).toBe('2025-01-29T10:00:00.000Z');
    });
    it('monthly +1M', () => {
      const next = RecurringScheduleService.advance(
        new Date('2025-01-15T10:00:00Z'),
        RecurringFrequencyVO.create('monthly'),
      );
      expect(next.toISOString()).toBe('2025-02-15T10:00:00.000Z');
    });
    it('quarterly +3M', () => {
      const next = RecurringScheduleService.advance(
        new Date('2025-01-15T10:00:00Z'),
        RecurringFrequencyVO.create('quarterly'),
      );
      expect(next.toISOString()).toBe('2025-04-15T10:00:00.000Z');
    });
    it('yearly +1Y', () => {
      const next = RecurringScheduleService.advance(
        new Date('2025-01-15T10:00:00Z'),
        RecurringFrequencyVO.create('yearly'),
      );
      expect(next.toISOString()).toBe('2026-01-15T10:00:00.000Z');
    });
    it('respects intervalCount', () => {
      const next = RecurringScheduleService.advance(
        new Date('2025-01-15T10:00:00Z'),
        RecurringFrequencyVO.create('weekly', 2),
      );
      expect(next.toISOString()).toBe('2025-01-29T10:00:00.000Z');
    });
  });

  describe('computeNextRun()', () => {
    it('advances past referenceDate', () => {
      const r = RecurringScheduleService.computeNextRun({
        frequency: RecurringFrequencyVO.create('daily'),
        startAt: '2025-01-10T10:00:00.000Z',
        referenceDate: new Date('2025-01-15T10:00:00.000Z'),
      });
      expect(new Date(r.nextRunAt).getTime()).toBeGreaterThan(
        new Date('2025-01-15T10:00:00.000Z').getTime(),
      );
    });

    it('isFinal false when endAt > nextRun', () => {
      const r = RecurringScheduleService.computeNextRun({
        frequency: RecurringFrequencyVO.create('daily'),
        startAt: '2025-01-10T10:00:00.000Z',
        endAt: '2025-01-30T10:00:00.000Z',
        referenceDate: new Date('2025-01-19T10:00:00.000Z'),
      });
      expect(r.isFinal).toBe(false);
    });

    it('isFinal true when endAt < nextRun', () => {
      // referenceDate = Jan 19 → next daily = Jan 20 → endAt Jan 20 23:59 → nextRun < endAt? false
      // Use endAt strictly before next run
      const r = RecurringScheduleService.computeNextRun({
        frequency: RecurringFrequencyVO.create('daily'),
        startAt: '2025-01-10T10:00:00.000Z',
        endAt: '2025-01-20T09:00:00.000Z', // before next run 2025-01-20T10:00:00Z
        referenceDate: new Date('2025-01-19T10:00:00.000Z'),
      });
      expect(r.isFinal).toBe(true);
    });
  });

  describe('isDue()', () => {
    it('true when nextRunAt <= now', () => {
      expect(RecurringScheduleService.isDue('2025-01-01T10:00:00Z', new Date('2025-01-15T10:00:00Z'))).toBe(true);
    });
    it('false when nextRunAt > now', () => {
      expect(RecurringScheduleService.isDue('2025-02-01T10:00:00Z', new Date('2025-01-15T10:00:00Z'))).toBe(false);
    });
  });
});
