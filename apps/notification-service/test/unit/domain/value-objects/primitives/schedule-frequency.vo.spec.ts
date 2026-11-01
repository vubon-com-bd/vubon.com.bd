import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { InvalidScheduleFrequencyError } from '@domain/errors/schedule.errors.js';

describe('ScheduleFrequencyVO', () => {
  it.each(['none', 'hourly', 'daily', 'weekly', 'biweekly', 'monthly', 'quarterly', 'yearly', 'custom'])(
    'accepts "%s"',
    (f) => {
      expect(ScheduleFrequencyVO.create(f).value).toBe(f);
    },
  );

  it('rejects invalid', () => {
    expect(() => ScheduleFrequencyVO.create('every-day')).toThrow(InvalidScheduleFrequencyError);
  });

  it('none() factory', () => {
    expect(ScheduleFrequencyVO.none().isNone()).toBe(true);
    expect(ScheduleFrequencyVO.none().isRecurring()).toBe(false);
  });

  it('isRecurring true for non-none', () => {
    expect(ScheduleFrequencyVO.create('daily').isRecurring()).toBe(true);
  });

  describe('approximateIntervalDays', () => {
    it.each([
      ['hourly', 1 / 24],
      ['daily', 1],
      ['weekly', 7],
      ['biweekly', 14],
      ['monthly', 30],
      ['quarterly', 90],
      ['yearly', 365],
    ])('%s → %s days', (freq, days) => {
      expect(ScheduleFrequencyVO.create(freq).approximateIntervalDays).toBeCloseTo(days as number, 4);
    });

    it('none/custom → undefined', () => {
      expect(ScheduleFrequencyVO.none().approximateIntervalDays).toBeUndefined();
      expect(ScheduleFrequencyVO.create('custom').approximateIntervalDays).toBeUndefined();
    });
  });
});
