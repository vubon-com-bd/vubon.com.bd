/**
 * RecurringFrequencyVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('RecurringFrequencyVO', () => {
  describe('create()', () => {
    it('creates daily x1', () => {
      const vo = RecurringFrequencyVO.create('daily');
      expect(vo.interval).toBe('daily');
      expect(vo.intervalCount).toBe(1);
    });
    it('accepts all intervals', () => {
      for (const i of ['daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly']) {
        expect(RecurringFrequencyVO.create(i).interval).toBe(i);
      }
    });
    it('normalizes case', () => {
      expect(RecurringFrequencyVO.create('DAILY').interval).toBe('daily');
    });
    it('accepts intervalCount', () => {
      const vo = RecurringFrequencyVO.create('weekly', 2);
      expect(vo.intervalCount).toBe(2);
    });
    it('throws on invalid interval', () => {
      expect(() => RecurringFrequencyVO.create('unknown')).toThrow(ValidationError);
    });
    it('throws on non-string interval', () => {
      expect(() => RecurringFrequencyVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
    it('throws on 0 intervalCount', () => {
      expect(() => RecurringFrequencyVO.create('daily', 0)).toThrow(ValidationError);
    });
    it('throws on > 365 intervalCount', () => {
      expect(() => RecurringFrequencyVO.create('daily', 366)).toThrow(ValidationError);
    });
    it('throws on non-integer intervalCount', () => {
      expect(() => RecurringFrequencyVO.create('daily', 1.5)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves values', () => {
      const vo = RecurringFrequencyVO.reconstitute('monthly', 3);
      expect(vo.interval).toBe('monthly');
      expect(vo.intervalCount).toBe(3);
    });
  });

  describe('predicates', () => {
    it('isDaily', () => expect(RecurringFrequencyVO.create('daily').isDaily()).toBe(true));
    it('isWeekly', () => expect(RecurringFrequencyVO.create('weekly').isWeekly()).toBe(true));
    it('isMonthly', () => expect(RecurringFrequencyVO.create('monthly').isMonthly()).toBe(true));
    it('isYearly', () => expect(RecurringFrequencyVO.create('yearly').isYearly()).toBe(true));
  });

  describe('toDays()', () => {
    it('daily x1 = 1 day', () => {
      expect(RecurringFrequencyVO.create('daily').toDays()).toBe(1);
    });
    it('weekly x1 = 7 days', () => {
      expect(RecurringFrequencyVO.create('weekly').toDays()).toBe(7);
    });
    it('biweekly x1 = 14 days', () => {
      expect(RecurringFrequencyVO.create('biweekly').toDays()).toBe(14);
    });
    it('monthly x1 = 30 days', () => {
      expect(RecurringFrequencyVO.create('monthly').toDays()).toBe(30);
    });
    it('quarterly x1 = 90 days', () => {
      expect(RecurringFrequencyVO.create('quarterly').toDays()).toBe(90);
    });
    it('yearly x1 = 365 days', () => {
      expect(RecurringFrequencyVO.create('yearly').toDays()).toBe(365);
    });
    it('weekly x2 = 14 days', () => {
      expect(RecurringFrequencyVO.create('weekly', 2).toDays()).toBe(14);
    });
  });
});
