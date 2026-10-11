import { describe, it, expect } from '@jest/globals';
import { PreferenceEntity } from '../../../../src/module/domain/entities/preference.entity.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';

function build(): PreferenceEntity {
  return PreferenceEntity.createDefault({
    id: makeUuid(),
    userId: FIXED_USER_ID,
    now: new Date().toISOString(),
  });
}

describe('PreferenceEntity', () => {
  it('createDefault → default values', () => {
    const e = build();
    expect(e.channelPreferences).toBeDefined();
    expect(e.categoryPreferences).toBeDefined();
    expect(e.quietHoursEnabled).toBeDefined();
  });

  it('isChannelEnabled honors preferences', () => {
    const e = build();
    expect(e.isChannelEnabled('email')).toBe(true);
    expect(e.isChannelEnabled('sms')).toBe(false);
  });

  it('isChannelEnabled defaults to true for unknown', () => {
    const e = build();
    expect(e.isChannelEnabled('unknown')).toBe(true);
  });

  it('isCategoryEnabled', () => {
    const e = build();
    expect(e.isCategoryEnabled('marketing')).toBe(false);
    expect(e.isCategoryEnabled('order')).toBe(true);
  });

  it('toggleChannel updates preference', () => {
    const e = build();
    e.toggleChannel('sms', true);
    expect(e.isChannelEnabled('sms')).toBe(true);
  });

  it('toggleCategory updates preference', () => {
    const e = build();
    e.toggleCategory('marketing', true);
    expect(e.isCategoryEnabled('marketing')).toBe(true);
  });

  it('updateQuietHours enabled', () => {
    const e = build();
    e.updateQuietHours(true, 22, 8);
    expect(e.quietHoursEnabled).toBe(true);
    expect(e.quietHoursStart).toBe(22);
    expect(e.quietHoursEnd).toBe(8);
  });

  it('updateQuietHours rejects invalid range', () => {
    const e = build();
    expect(() => e.updateQuietHours(true, 25, 8)).toThrow();
  });

  it('updateQuietHours enabled without hours throws', () => {
    const e = build();
    expect(() => e.updateQuietHours(true, undefined, undefined)).toThrow();
  });

  it('isInQuietHours evaluates range (s<e)', () => {
    const e = build();
    e.updateQuietHours(true, 8, 18);
    expect(e.isInQuietHours(12)).toBe(true);
    expect(e.isInQuietHours(20)).toBe(false);
  });

  it('isInQuietHours evaluates range (wrap-around)', () => {
    const e = build();
    e.updateQuietHours(true, 22, 6);
    expect(e.isInQuietHours(23)).toBe(true);
    expect(e.isInQuietHours(3)).toBe(true);
    expect(e.isInQuietHours(12)).toBe(false);
  });

  it('isInQuietHours disabled', () => {
    const e = build();
    e.updateQuietHours(false, undefined, undefined);
    expect(e.isInQuietHours(12)).toBe(false);
  });

  it('optOut → channel disabled', () => {
    const e = build();
    e.optOut('email', 'spam');
    expect(e.isChannelEnabled('email')).toBe(false);
  });

  it('optIn → channel enabled', () => {
    const e = build();
    e.optIn('sms');
    expect(e.isChannelEnabled('sms')).toBe(true);
  });

  it('updateLocale changes locale', () => {
    const e = build();
    e.updateLocale('bn');
    expect(e.locale).toBe('bn');
  });
});
