import { describe, it, expect } from '@jest/globals';
import { PreferenceControllerMapper } from '../../../../src/module/interfaces/mappers/preference.controller.mapper.js';

describe('PreferenceControllerMapper', () => {
  it('toUpdateAppDto', () => {
    const dto = PreferenceControllerMapper.toUpdateAppDto('u', {
      channelPreferences: { email: true }, categoryPreferences: { order: true },
      frequency: 'daily', timezone: 'UTC', locale: 'en',
    } as never);
    expect(dto.userId).toBe('u');
  });

  it('toToggleChannelAppDto', () => {
    const dto = PreferenceControllerMapper.toToggleChannelAppDto('u', {
      channel: 'email', enabled: true,
    } as never);
    expect(dto.channel).toBe('email');
  });

  it('toToggleCategoryAppDto', () => {
    const dto = PreferenceControllerMapper.toToggleCategoryAppDto('u', {
      category: 'marketing', enabled: false,
    } as never);
    expect(dto.enabled).toBe(false);
  });

  it('toQuietHoursAppDto', () => {
    const dto = PreferenceControllerMapper.toQuietHoursAppDto('u', {
      enabled: true, startHour: 22, endHour: 8, timezone: 'Asia/Dhaka',
    } as never);
    expect(dto.startHour).toBe(22);
  });

  it('toOptOutAppDto', () => {
    const dto = PreferenceControllerMapper.toOptOutAppDto('u', {
      scope: 'marketing', reason: 'x',
    } as never);
    expect(dto.scope).toBe('marketing');
  });

  it('toOptInAppDto', () => {
    const dto = PreferenceControllerMapper.toOptInAppDto('u', { scope: 'marketing' } as never);
    expect(dto.scope).toBe('marketing');
  });
});
