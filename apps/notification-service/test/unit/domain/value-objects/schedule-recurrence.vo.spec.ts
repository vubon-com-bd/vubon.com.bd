import { describe, it, expect } from '@jest/globals';
import { ScheduleRecurrenceVO } from '../../../../src/module/domain/value-objects/primitives/schedule-recurrence.vo.js';

describe('ScheduleRecurrenceVO', () => {
  it('create + reconstitute', () => {
    expect(ScheduleRecurrenceVO.create('daily').value).toBe('daily');
    expect(() => ScheduleRecurrenceVO.create('bad')).toThrow();
    expect(ScheduleRecurrenceVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(ScheduleRecurrenceVO.none().value).toBe('none');
    expect(ScheduleRecurrenceVO.hourly().value).toBe('hourly');
    expect(ScheduleRecurrenceVO.daily().value).toBe('daily');
    expect(ScheduleRecurrenceVO.weekly().value).toBe('weekly');
    expect(ScheduleRecurrenceVO.biweekly().value).toBe('biweekly');
    expect(ScheduleRecurrenceVO.monthly().value).toBe('monthly');
    expect(ScheduleRecurrenceVO.quarterly().value).toBe('quarterly');
    expect(ScheduleRecurrenceVO.yearly().value).toBe('yearly');
    expect(ScheduleRecurrenceVO.custom().value).toBe('custom');
  });
  it('predicates', () => {
    expect(ScheduleRecurrenceVO.none().isNone()).toBe(true);
    expect(ScheduleRecurrenceVO.daily().isDaily()).toBe(true);
    expect(ScheduleRecurrenceVO.weekly().isWeekly()).toBe(true);
    expect(ScheduleRecurrenceVO.monthly().isMonthly()).toBe(true);
  });
  it('intervalSeconds', () => {
    expect(ScheduleRecurrenceVO.hourly().intervalSeconds()).toBe(3600);
    expect(ScheduleRecurrenceVO.daily().intervalSeconds()).toBe(86400);
    expect(ScheduleRecurrenceVO.weekly().intervalSeconds()).toBe(604800);
    expect(ScheduleRecurrenceVO.monthly().intervalSeconds()).toBe(2592000);
    expect(ScheduleRecurrenceVO.none().intervalSeconds()).toBeNull();
  });
});
