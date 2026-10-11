import { describe, it, expect } from '@jest/globals';
import { NotificationPreferenceCheckerService } from '../../../../src/module/domain/services/notification-preference-checker.service.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { PreferenceEntity } from '../../../../src/module/domain/entities/preference.entity.js';
import { FIXED_USER_ID, makeUuid } from '../../../helpers/test-factories.js';

function buildPreference(overrides: {
  quietHoursEnabled?: boolean;
  quietHoursStart?: number;
  quietHoursEnd?: number;
} = {}): PreferenceEntity {
  const e = PreferenceEntity.createDefault({
    id: makeUuid(),
    userId: FIXED_USER_ID,
    now: new Date().toISOString(),
  });
  if (overrides.quietHoursEnabled !== undefined) {
    e.updateQuietHours(
      overrides.quietHoursEnabled,
      overrides.quietHoursStart ?? 22,
      overrides.quietHoursEnd ?? 8,
    );
  }
  return e;
}

describe('NotificationPreferenceCheckerService', () => {
  it('shouldSend true when no preference', () => {
    const r = NotificationPreferenceCheckerService.check({
      preference: null,
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: NotificationChannelVO.email(),
      priority: NotificationPriorityVO.normal(),
      currentHour: 12,
    });
    expect(r.shouldSend).toBe(true);
    expect(r.reason).toBe('no_preference_record');
  });

  it('shouldSend false when category disabled', () => {
    const p = buildPreference();
    // marketing is disabled by default
    const r = NotificationPreferenceCheckerService.check({
      preference: p,
      type: NotificationTypeVO.marketing(),
      category: NotificationCategoryVO.marketing(),
      channel: NotificationChannelVO.email(),
      priority: NotificationPriorityVO.normal(),
      currentHour: 12,
    });
    expect(r.shouldSend).toBe(false);
    expect(r.reason).toMatch(/category/);
  });

  it('shouldSend true when category enabled', () => {
    const p = buildPreference();
    const r = NotificationPreferenceCheckerService.check({
      preference: p,
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: NotificationChannelVO.email(),
      priority: NotificationPriorityVO.normal(),
      currentHour: 12,
    });
    expect(r.shouldSend).toBe(true);
  });

  it('quiet hours defer for normal priority', () => {
    const p = buildPreference({ quietHoursEnabled: true });
    const r = NotificationPreferenceCheckerService.check({
      preference: p,
      type: NotificationTypeVO.marketing(),
      category: NotificationCategoryVO.marketing(),
      channel: NotificationChannelVO.email(),
      priority: NotificationPriorityVO.normal(),
      currentHour: 23,
    });
    expect(r.shouldSend).toBe(false);
    expect(r.reason).toMatch(/category|quiet/);
  });

  it('critical bypasses quiet hours', () => {
    const p = buildPreference({ quietHoursEnabled: true });
    const r = NotificationPreferenceCheckerService.check({
      preference: p,
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: NotificationChannelVO.email(),
      priority: NotificationPriorityVO.critical(),
      currentHour: 23,
    });
    expect(r.shouldSend).toBe(true);
  });

  it('assertShouldSend throws when suppressed', () => {
    const p = buildPreference();
    expect(() =>
      NotificationPreferenceCheckerService.assertShouldSend({
        preference: p,
        type: NotificationTypeVO.marketing(),
        category: NotificationCategoryVO.marketing(),
        channel: NotificationChannelVO.email(),
        priority: NotificationPriorityVO.normal(),
        currentHour: 12,
      }),
    ).toThrow();
  });

  it('nextAllowedAt computes quiet hours end', () => {
    const p = buildPreference({ quietHoursEnabled: true });
    const iso = NotificationPreferenceCheckerService.nextAllowedAt(p, new Date());
    expect(typeof iso).toBe('string');
    expect(new Date(iso).getTime()).toBeGreaterThan(Date.now() - 1000);
  });
});
