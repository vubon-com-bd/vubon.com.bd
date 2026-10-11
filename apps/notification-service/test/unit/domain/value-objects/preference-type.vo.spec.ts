import { describe, it, expect } from '@jest/globals';
import { PreferenceTypeVO } from '../../../../src/module/domain/value-objects/primitives/preference-type.vo.js';

describe('PreferenceTypeVO', () => {
  it('create + reconstitute', () => {
    expect(PreferenceTypeVO.create('opt_in').value).toBe('opt_in');
    expect(() => PreferenceTypeVO.create('bad')).toThrow();
    expect(PreferenceTypeVO.reconstitute('any').value).toBe('any');
  });
  it('named constructors', () => {
    expect(PreferenceTypeVO.optIn().value).toBe('opt_in');
    expect(PreferenceTypeVO.optOut().value).toBe('opt_out');
    expect(PreferenceTypeVO.channelSpecific().value).toBe('channel_specific');
    expect(PreferenceTypeVO.categorySpecific().value).toBe('category_specific');
    expect(PreferenceTypeVO.quietHours().value).toBe('quiet_hours');
    expect(PreferenceTypeVO.frequency().value).toBe('frequency');
  });
  it('predicates', () => {
    expect(PreferenceTypeVO.optIn().isOptIn()).toBe(true);
    expect(PreferenceTypeVO.optOut().isOptOut()).toBe(true);
    expect(PreferenceTypeVO.channelSpecific().isChannelSpecific()).toBe(true);
    expect(PreferenceTypeVO.categorySpecific().isCategorySpecific()).toBe(true);
    expect(PreferenceTypeVO.quietHours().isQuietHours()).toBe(true);
    expect(PreferenceTypeVO.frequency().isFrequency()).toBe(true);
  });
});
