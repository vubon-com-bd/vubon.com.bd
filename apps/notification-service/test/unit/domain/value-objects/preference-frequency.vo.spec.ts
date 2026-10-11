import { describe, it, expect } from '@jest/globals';
import { PreferenceFrequencyVO } from '../../../../src/module/domain/value-objects/primitives/preference-frequency.vo.js';

describe('PreferenceFrequencyVO', () => {
  it('create + reconstitute', () => {
    expect(PreferenceFrequencyVO.create('instant').value).toBe('instant');
    expect(() => PreferenceFrequencyVO.create('bad')).toThrow();
    expect(PreferenceFrequencyVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(PreferenceFrequencyVO.instant().value).toBe('instant');
    expect(PreferenceFrequencyVO.hourly().value).toBe('hourly');
    expect(PreferenceFrequencyVO.daily().value).toBe('daily');
    expect(PreferenceFrequencyVO.weekly().value).toBe('weekly');
    expect(PreferenceFrequencyVO.never().value).toBe('never');
  });
  it('predicates + helpers', () => {
    expect(PreferenceFrequencyVO.instant().isInstant()).toBe(true);
    expect(PreferenceFrequencyVO.hourly().isHourly()).toBe(true);
    expect(PreferenceFrequencyVO.daily().isDaily()).toBe(true);
    expect(PreferenceFrequencyVO.weekly().isWeekly()).toBe(true);
    expect(PreferenceFrequencyVO.never().isNever()).toBe(true);
    expect(PreferenceFrequencyVO.daily().allowsDelivery()).toBe(true);
    expect(PreferenceFrequencyVO.never().allowsDelivery()).toBe(false);
    expect(PreferenceFrequencyVO.instant().minIntervalSeconds()).toBeNull();
    expect(PreferenceFrequencyVO.daily().minIntervalSeconds()).toBe(86400);
  });
});
