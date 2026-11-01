import { PreferenceCheckerService } from '@domain/services/preference-checker.service.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const opt = (ch: string, enabled = true, cat?: string) =>
  PreferenceOptionVO.create({ channel: ch as any, enabled, category: cat });

const makeVO = (options: any[] = [opt('email', true)]) =>
  PreferenceVO.create({
    id: PreferenceIdVO.create(IDS.preferenceId),
    userId: UserIdVO.create(IDS.userId),
    type: PreferenceTypeVO.create('channel_specific'),
    options,
    quietHoursEnabled: false,
    timezone: 'UTC',
    locale: 'en',
    locked: false,
  });

describe('PreferenceCheckerService', () => {
  describe('check()', () => {
    it('allows transactional without preference', () => {
      const r = PreferenceCheckerService.check({
        preference: null,
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        channel: 'email',
      });
      expect(r.allowed).toBe(true);
    });

    it('denies promotional without preference', () => {
      const r = PreferenceCheckerService.check({
        preference: null,
        type: NotificationTypeVO.promotional(),
        category: NotificationCategoryVO.create('promotion'),
        channel: 'email',
      });
      expect(r.allowed).toBe(false);
    });

    it('allows if category enabled', () => {
      const r = PreferenceCheckerService.check({
        preference: makeVO(),
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        channel: 'email',
      });
      expect(r.allowed).toBe(true);
    });

    it('denies promotional if category disabled', () => {
      const r = PreferenceCheckerService.check({
        preference: makeVO([opt('email', false)]),
        type: NotificationTypeVO.promotional(),
        category: NotificationCategoryVO.create('promotion'),
        channel: 'email',
      });
      expect(r.allowed).toBe(false);
      expect(r.reason).toContain('category-disabled');
    });

    it('allows transactional even if category disabled (bypass)', () => {
      const r = PreferenceCheckerService.check({
        preference: makeVO([opt('email', false)]),
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        channel: 'email',
      });
      expect(r.allowed).toBe(true);
      expect(r.reason).toBe('critical-category-forced');
    });

    it('forces allow for security bypass', () => {
      const r = PreferenceCheckerService.check({
        preference: makeVO([opt('email', false)]),
        type: NotificationTypeVO.security(),
        category: NotificationCategoryVO.create('security'),
        channel: 'email',
      });
      expect(r.allowed).toBe(true);
      expect(r.reason).toBe('critical-category-forced');
    });

    it('denies promotional in quiet hours', () => {
      const pref = PreferenceVO.create({
        id: PreferenceIdVO.create(IDS.preferenceId),
        userId: UserIdVO.create(IDS.userId),
        type: PreferenceTypeVO.create('channel_specific'),
        options: [opt('email', true)],
        quietHoursEnabled: true,
        quietHoursStart: 22,
        quietHoursEnd: 8,
        timezone: 'UTC',
        locale: 'en',
        locked: false,
      });
      const r = PreferenceCheckerService.check({
        preference: pref,
        type: NotificationTypeVO.promotional(),
        category: NotificationCategoryVO.create('promotion'),
        channel: 'email',
        localHour: 23,
      });
      expect(r.allowed).toBe(false);
      expect(r.reason).toBe('quiet-hours');
    });

    it('bypasses quiet hours for security', () => {
      const pref = PreferenceVO.create({
        id: PreferenceIdVO.create(IDS.preferenceId),
        userId: UserIdVO.create(IDS.userId),
        type: PreferenceTypeVO.create('channel_specific'),
        options: [opt('email', true)],
        quietHoursEnabled: true,
        quietHoursStart: 22,
        quietHoursEnd: 8,
        timezone: 'UTC',
        locale: 'en',
        locked: false,
      });
      const r = PreferenceCheckerService.check({
        preference: pref,
        type: NotificationTypeVO.security(),
        category: NotificationCategoryVO.create('security'),
        channel: 'email',
        localHour: 23,
      });
      expect(r.allowed).toBe(true);
      expect(r.reason).toBe('quiet-hours-bypass-critical');
    });
  });

  describe('hasAnyChannelEnabled()', () => {
    it('returns true with no preference', () => {
      expect(PreferenceCheckerService.hasAnyChannelEnabled(null, 'order')).toBe(true);
    });

    it('returns true if any channel enabled', () => {
      expect(PreferenceCheckerService.hasAnyChannelEnabled(makeVO(), 'order')).toBe(true);
    });

    it('returns false if all disabled', () => {
      const pref = makeVO([
        opt('email', false),
        opt('sms', false),
        opt('push', false),
        opt('in_app', false),
        opt('webhook', false),
        opt('whatsapp', false),
      ]);
      expect(PreferenceCheckerService.hasAnyChannelEnabled(pref, 'order')).toBe(false);
    });
  });
});
