import { describe, it, expect } from '@jest/globals';
import { PreferenceVO } from '../../../../../src/module/domain/value-objects/composites/preference.vo.js';
import { PreferenceIdVO } from '../../../../../src/module/domain/value-objects/primitives/preference-id.vo.js';
import { FIXED_USER_ID, makeUuid } from '../../../../helpers/test-factories.js';

function buildProps(overrides: Record<string, unknown> = {}) {
  return {
    id: PreferenceIdVO.create(makeUuid()),
    userId: FIXED_USER_ID,
    channelPreferences: { email: true, sms: false },
    categoryPreferences: { order: true },
    quietHoursEnabled: false,
    timezone: 'Asia/Dhaka',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('PreferenceVO', () => {
  it('create valid', () => {
    const vo = PreferenceVO.create(buildProps());
    expect(vo.isChannelEnabled('email')).toBe(true);
    expect(vo.isChannelEnabled('sms')).toBe(false);
  });
  it('isChannelEnabled default true for unknown', () => {
    const vo = PreferenceVO.create(buildProps());
    expect(vo.isChannelEnabled('unknown')).toBe(true);
  });
  it('isCategoryEnabled default true for unknown', () => {
    const vo = PreferenceVO.create(buildProps());
    expect(vo.isCategoryEnabled('unknown')).toBe(true);
  });
  it('quiet hours requires start/end when enabled', () => {
    expect(() =>
      PreferenceVO.create(buildProps({ quietHoursEnabled: true })),
    ).toThrow();
  });
  it('quiet hours validation - start > 23', () => {
    expect(() =>
      PreferenceVO.create(buildProps({
        quietHoursEnabled: true,
        quietHoursStart: 24,
        quietHoursEnd: 8,
      })),
    ).toThrow();
  });
  it('isInQuietHours range s<e', () => {
    const vo = PreferenceVO.reconstitute(buildProps({
      quietHoursEnabled: true,
      quietHoursStart: 8,
      quietHoursEnd: 18,
    }));
    expect(vo.isInQuietHours(12)).toBe(true);
    expect(vo.isInQuietHours(20)).toBe(false);
  });
  it('isInQuietHours wrap-around', () => {
    const vo = PreferenceVO.reconstitute(buildProps({
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 6,
    }));
    expect(vo.isInQuietHours(23)).toBe(true);
    expect(vo.isInQuietHours(3)).toBe(true);
  });
  it('isInQuietHours s===e returns false', () => {
    const vo = PreferenceVO.reconstitute(buildProps({
      quietHoursEnabled: true,
      quietHoursStart: 12,
      quietHoursEnd: 12,
    }));
    expect(vo.isInQuietHours(12)).toBe(false);
  });
});
