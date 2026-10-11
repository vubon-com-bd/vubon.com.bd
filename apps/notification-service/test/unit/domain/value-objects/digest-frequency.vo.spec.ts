import { describe, it, expect } from '@jest/globals';
import { DigestFrequencyVO } from '../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';

describe('DigestFrequencyVO', () => {
  it('create + reconstitute', () => {
    expect(DigestFrequencyVO.create('daily').value).toBe('daily');
    expect(() => DigestFrequencyVO.create('bad')).toThrow();
    expect(DigestFrequencyVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(DigestFrequencyVO.hourly().value).toBe('hourly');
    expect(DigestFrequencyVO.daily().value).toBe('daily');
    expect(DigestFrequencyVO.weekly().value).toBe('weekly');
    expect(DigestFrequencyVO.biweekly().value).toBe('biweekly');
    expect(DigestFrequencyVO.monthly().value).toBe('monthly');
  });
  it('predicates', () => {
    expect(DigestFrequencyVO.hourly().isHourly()).toBe(true);
    expect(DigestFrequencyVO.daily().isDaily()).toBe(true);
    expect(DigestFrequencyVO.weekly().isWeekly()).toBe(true);
    expect(DigestFrequencyVO.monthly().isMonthly()).toBe(true);
  });
  it('intervalSeconds', () => {
    expect(DigestFrequencyVO.hourly().intervalSeconds()).toBe(3600);
    expect(DigestFrequencyVO.daily().intervalSeconds()).toBe(86400);
    expect(DigestFrequencyVO.weekly().intervalSeconds()).toBe(604800);
  });
});
