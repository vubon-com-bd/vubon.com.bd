import { ChannelSelectorService } from '@domain/services/channel-selector.service.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const opt = (ch: string, enabled = true) =>
  PreferenceOptionVO.create({ channel: ch as any, enabled });

const preference = (options: any[] = [opt('email', true), opt('sms', true), opt('push', true)]) =>
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

describe('ChannelSelectorService', () => {
  describe('select()', () => {
    it('picks first allowed channel', () => {
      const result = ChannelSelectorService.select({
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        priority: NotificationPriorityVO.normal(),
        preference: preference(),
      });
      expect(result.primary).toBeDefined();
      expect(result.fallback.length).toBeGreaterThan(0);
    });

    it('urgent priority prefers instant channels (push/in_app)', () => {
      const result = ChannelSelectorService.select({
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        priority: NotificationPriorityVO.critical(),
        preference: preference(),
      });
      expect(['push', 'in_app', 'sms']).toContain(result.primary);
    });

    it('falls back to enabled channels when all filtered out', () => {
      const result = ChannelSelectorService.select({
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('marketing'),
        priority: NotificationPriorityVO.normal(),
        preference: preference([opt('email', false), opt('sms', false), opt('push', false), opt('in_app', true)]),
      });
      expect(result.primary).toBeDefined();
    });

    it('falls back to in_app when email/sms/push all disabled', () => {
      const result = ChannelSelectorService.select({
        type: NotificationTypeVO.security(),
        category: NotificationCategoryVO.create('security'),
        priority: NotificationPriorityVO.critical(),
        preference: preference([opt('email', false), opt('sms', false), opt('push', false)]),
      });
      // in_app remains enabled in default preference options
      expect(result.primary).toBe('in_app');
    });

    it('falls back to email default when ALL channels disabled (security bypass)', () => {
      const result = ChannelSelectorService.select({
        type: NotificationTypeVO.security(),
        category: NotificationCategoryVO.create('security'),
        priority: NotificationPriorityVO.critical(),
        preference: preference([
          opt('email', false),
          opt('sms', false),
          opt('push', false),
          opt('in_app', false),
          opt('webhook', false),
        ]),
      });
      expect(result.primary).toBe('email');
    });

    it('accepts custom availableChannels', () => {
      const result = ChannelSelectorService.select({
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        priority: NotificationPriorityVO.normal(),
        preference: preference(),
        availableChannels: ['sms' as any],
      });
      expect(result.primary).toBe('sms');
    });
  });

  describe('selectAll()', () => {
    it('returns all enabled channels', () => {
      const result = ChannelSelectorService.selectAll({
        type: NotificationTypeVO.transactional(),
        category: NotificationCategoryVO.create('order'),
        priority: NotificationPriorityVO.normal(),
        preference: preference(),
      });
      expect(result.length).toBeGreaterThan(0);
    });
  });
});
