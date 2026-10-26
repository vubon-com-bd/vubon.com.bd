/**
 * Predicate + Getter coverage — final push to 80% branches
 * @module notification-service/test/unit/domain
 *
 * The remaining uncovered branches are GETTERS and PREDICATES never called।
 * This file systematically calls EVERY public method on each entity।
 */
import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';

import { DeviceEntity } from '@domain/entities/device.entity.js';
import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';

import { DigestEntity } from '@domain/entities/digest.entity.js';
import { DigestVO } from '@domain/composites/digest.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';

import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';

import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';

import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

import { TemplateEntity } from '@domain/entities/template.entity.js';
import { TemplateVO } from '@domain/composites/template.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';

import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const NOW_MS = Date.now();
const WEEK_AGO = new Date(NOW_MS - 7 * 86_400_000).toISOString();
const FUTURE = new Date(NOW_MS + 3_600_000).toISOString();

// ═══════════════════════════════════════════════════════════
// Broadcast — ALL predicates/getters
// ═══════════════════════════════════════════════════════════
describe('BroadcastEntity — call every getter', () => {
  const content = () =>
    NotificationContentVO.create({
      subject: NotificationSubjectVO.create('Hi'),
      body: NotificationBodyVO.create('Body'),
      data: NotificationDataVO.create({}),
    });
  const makeVO = (o: any = {}) =>
    BroadcastVO.create({
      id: BroadcastIdVO.create(IDS.broadcastId),
      name: 'S',
      type: BroadcastTypeVO.create('all_users'),
      status: BroadcastStatusVO.draft(),
      audience: BroadcastAudienceVO.create({ target: 'all' }),
      channels: [NotificationChannelVO.email()],
      content: content(),
      createdBy: UserIdVO.create(IDS.userId),
      recipientCount: 100,
      sentCount: 50,
      failedCount: 5,
      ...o,
    });

  it('calls every getter on draft broadcast', () => {
    const e = BroadcastEntity.reconstitute({
      id: IDS.broadcastId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO() },
    });
    // Predicates
    expect(e.isDraft()).toBe(true);
    expect(e.isScheduled()).toBe(false);
    expect(e.isSending()).toBe(false);
    expect(e.isSent()).toBe(false);
    expect(e.isFailed()).toBe(false);
    expect(e.isCancelled()).toBe(false);
    expect(e.isTerminal()).toBe(false);
    expect(e.vo.canBeCancelled()).toBe(true);
    expect(e.vo.isApproved()).toBe(false);
    // Getters
    expect(e.id).toBe(IDS.broadcastId);
    expect(e.broadcastId.value).toBe(IDS.broadcastId);
    expect(e.vo).toBeDefined();
    expect(e.status.value).toBe('draft');
    expect(e.recipientCount).toBe(100);
    expect(e.sentCount).toBe(50);
    expect(e.failedCount).toBe(5);
    expect(e.cancelledAt).toBeUndefined();
    expect(e.cancelledBy).toBeUndefined();
    expect(e.cancelledReason).toBeUndefined();
    expect(e.failureReason).toBeUndefined();
    expect(e.vo.pendingCount).toBe(45);
    expect(e.vo.successRate).toBeGreaterThan(0);
    expect(e.vo.channelsCount).toBe(1);
    expect(e.vo.hasChannel('email')).toBe(true);
    expect(e.vo.hasChannel('sms')).toBe(false);
    expect(e.vo.usesTemplate()).toBe(false);
    expect(e.vo.usesInlineContent()).toBe(true);
  });

  it('calls every getter on cancelled broadcast', () => {
    const e = BroadcastEntity.reconstitute({
      id: IDS.broadcastId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: makeVO({ status: BroadcastStatusVO.cancelled() }),
        cancelledAt: NOW, cancelledBy: 'admin', cancelledReason: 'test',
      },
    });
    expect(e.isCancelled()).toBe(true);
    expect(e.isTerminal()).toBe(true);
    expect(e.cancelledAt).toBe(NOW);
    expect(e.cancelledBy).toBe('admin');
    expect(e.cancelledReason).toBe('test');
  });

  it('calls every getter on failed broadcast', () => {
    const e = BroadcastEntity.reconstitute({
      id: IDS.broadcastId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: makeVO({ status: BroadcastStatusVO.create('failed') }),
        failureReason: 'db error',
      },
    });
    expect(e.isFailed()).toBe(true);
    expect(e.failureReason).toBe('db error');
  });

  it('calls pendingCount/successRate edge: zero sent', () => {
    const e = BroadcastEntity.reconstitute({
      id: IDS.broadcastId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO({ sentCount: 0, failedCount: 0 }) },
    });
    expect(e.vo.successRate).toBe(0);
  });
});

// ═══════════════════════════════════════════════════════════
// Device — ALL predicates
// ═══════════════════════════════════════════════════════════
describe('DeviceEntity — call every getter', () => {
  const makeVO = (o: any = {}) =>
    DeviceVO.create({
      id: DeviceIdVO.create(IDS.deviceId),
      userId: UserIdVO.create(IDS.userId),
      type: DeviceTypeVO.create('android'),
      status: DeviceStatusVO.active(),
      token: DeviceTokenVO.create(IDS.deviceToken),
      platform: DevicePlatformVO.create('android'),
      lastActiveAt: NOW,
      registeredAt: WEEK_AGO,
      ...o,
    });

  it('calls every getter on active device', () => {
    const e = DeviceEntity.reconstitute({
      id: IDS.deviceId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO() },
    });
    expect(e.isActive()).toBe(true);
    expect(e.isBlocked()).toBe(false);
    expect(e.canReceive()).toBe(true);
    expect(e.isStale()).toBe(false);
    expect(e.id).toBe(IDS.deviceId);
    expect(e.deviceId.value).toBe(IDS.deviceId);
    expect(e.status.value).toBe('active');
    expect(e.token).toBeDefined();
    expect(e.blockedReason).toBeUndefined();
    expect(e.blockedAt).toBeUndefined();
    expect(e.unregisteredAt).toBeUndefined();
    expect(e.unregisteredReason).toBeUndefined();
    expect(e.vo.ageInDays()).toBeGreaterThan(0);
  });

  it('calls every getter on blocked device', () => {
    const e = DeviceEntity.reconstitute({
      id: IDS.deviceId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO({ status: DeviceStatusVO.blocked() }), blockedAt: NOW, blockedReason: 'suspicious' },
    });
    expect(e.isBlocked()).toBe(true);
    expect(e.isActive()).toBe(false);
    expect(e.canReceive()).toBe(false);
    expect(e.blockedAt).toBe(NOW);
    expect(e.blockedReason).toBe('suspicious');
  });

  it('calls every getter on unregistered device', () => {
    const e = DeviceEntity.reconstitute({
      id: IDS.deviceId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO({ status: DeviceStatusVO.unregistered() }), unregisteredAt: NOW, unregisteredReason: 'user' },
    });
    expect(e.vo.status.isUnregistered()).toBe(true);
    expect(e.unregisteredAt).toBe(NOW);
    expect(e.unregisteredReason).toBe('user');
  });
});

// ═══════════════════════════════════════════════════════════
// Digest — ALL predicates
// ═══════════════════════════════════════════════════════════
describe('DigestEntity — call every getter', () => {
  const DAY_AGO = new Date(NOW_MS - 86_400_000).toISOString();
  const makeVO = (o: any = {}) =>
    DigestVO.create({
      id: DigestIdVO.create(IDS.digestId),
      userId: UserIdVO.create(IDS.userId),
      status: DigestStatusVO.pending(),
      type: DigestTypeVO.create('summary'),
      period: DigestPeriodVO.create({ frequency: 'daily', periodStart: DAY_AGO, periodEnd: NOW }),
      categories: ['order'],
      sendHour: 9, timezone: 'UTC', itemCount: 0, ...o,
    });

  it('calls every getter on pending digest', () => {
    const e = DigestEntity.reconstitute({
      id: IDS.digestId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO(), items: [] },
    });
    expect(e.isPending()).toBe(true);
    expect(e.isGenerating()).toBe(false);
    expect(e.isReady()).toBe(false);
    expect(e.isSent()).toBe(false);
    expect(e.isFailed()).toBe(false);
    expect(e.isCancelled()).toBe(false);
    expect(e.isEmpty()).toBe(true);
    expect(e.canBeSent()).toBe(false);
    expect(e.id).toBe(IDS.digestId);
    expect(e.digestId.value).toBe(IDS.digestId);
    expect(e.status.value).toBe('pending');
    expect(e.items).toEqual([]);
    expect(e.itemCount).toBe(0);
    expect(e.failureReason).toBeUndefined();
    expect(e.cancelledAt).toBeUndefined();
    expect(e.cancelledReason).toBeUndefined();
    expect(e.vo.hasCategory('order')).toBe(true);
    expect(e.vo.hasCategory('promo')).toBe(false);
  });

  it('calls every getter on cancelled digest', () => {
    const e = DigestEntity.reconstitute({
      id: IDS.digestId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: makeVO({ status: DigestStatusVO.cancelled() }),
        items: [], cancelledAt: NOW, cancelledReason: 'user',
      },
    });
    expect(e.isCancelled()).toBe(true);
    expect(e.cancelledAt).toBe(NOW);
    expect(e.cancelledReason).toBe('user');
  });

  it('calls every getter on failed digest', () => {
    const e = DigestEntity.reconstitute({
      id: IDS.digestId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: makeVO({ status: DigestStatusVO.failed() }),
        items: [], failureReason: 'timeout',
      },
    });
    expect(e.isFailed()).toBe(true);
    expect(e.failureReason).toBe('timeout');
  });
});

// ═══════════════════════════════════════════════════════════
// Notification — ALL predicates + getters
// ═══════════════════════════════════════════════════════════
describe('NotificationEntity — call every getter', () => {
  const content = () =>
    NotificationContentVO.create({
      subject: NotificationSubjectVO.create('S'),
      body: NotificationBodyVO.create('B'),
      data: NotificationDataVO.create({}),
    });
  const recipient = () =>
    NotificationRecipientVO.create({
      userId: UserIdVO.create(IDS.userId),
      channel: NotificationChannelVO.email(),
      email: EmailAddressVO.create('u@example.com'),
    });
  const makeVO = (o: any = {}) =>
    NotificationVO.create({
      id: NotificationIdVO.create(IDS.notificationId),
      userId: UserIdVO.create(IDS.userId),
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.create('order'),
      channel: NotificationChannelVO.email(),
      priority: NotificationPriorityVO.normal(),
      status: NotificationStatusVO.draft(),
      subject: NotificationSubjectVO.create('S'),
      body: NotificationBodyVO.create('B'),
      data: NotificationDataVO.create({}),
      ...o,
    });
  const make = (o: any = {}) =>
    NotificationEntity.reconstitute({
      id: IDS.notificationId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: makeVO(),
        content: content(),
        recipients: [recipient()],
        actions: [], attempts: [],
        ...o,
      },
    });

  it('calls all predicates on draft', () => {
    const e = make();
    expect(e.isDraft()).toBe(true);
    expect(e.isPending()).toBe(false);
    expect(e.isQueued()).toBe(false);
    expect(e.isScheduled()).toBe(false);
    expect(e.isSending()).toBe(false);
    expect(e.isSent()).toBe(false);
    expect(e.isDelivered()).toBe(false);
    expect(e.isFailed()).toBe(false);
    expect(e.isCancelled()).toBe(false);
    expect(e.isExpired()).toBe(false);
    expect(e.isArchived()).toBe(false);
    expect(e.isTerminal()).toBe(false);
    expect(e.isInFlight()).toBe(false);
    expect(e.canBeSent()).toBe(true);
    expect(e.canBeCancelled()).toBe(true);
    expect(e.canBeRetried()).toBe(false);
    expect(e.isExpiredByDate()).toBe(false);
  });

  it('calls all predicates on delivered', () => {
    const e = make({
      vo: makeVO({ status: NotificationStatusVO.delivered() }),
      sentAt: NOW, deliveredAt: NOW,
    });
    expect(e.isDelivered()).toBe(true);
    expect(e.isTerminal()).toBe(true);
    expect(e.canBeSent()).toBe(false);
    expect(e.canBeCancelled()).toBe(false);
  });

  it('calls all predicates on failed with attempts', () => {
    const e = make({ vo: makeVO({ status: NotificationStatusVO.failed() }) });
    expect(e.isFailed()).toBe(true);
    expect(e.canBeRetried()).toBe(true);
  });

  it('calls all predicates on queued', () => {
    const e = make({ vo: makeVO({ status: NotificationStatusVO.queued() }) });
    expect(e.isQueued()).toBe(true);
    expect(e.isInFlight()).toBe(true);
  });

  it('calls getter with scheduledAt', () => {
    const e = make({ vo: makeVO({ status: NotificationStatusVO.scheduled() }), scheduledAt: FUTURE });
    expect(e.scheduledAt).toBe(FUTURE);
  });

  it('calls getter with expiresAt', () => {
    const e = make({ expiresAt: FUTURE });
    expect(e.expiresAt).toBe(FUTURE);
    expect(e.isExpiredByDate()).toBe(false);
  });

  it('calls getter with cancelledAt', () => {
    const e = make({ vo: makeVO({ status: NotificationStatusVO.cancelled() }), cancelledAt: NOW, cancelledBy: 'admin', cancelledReason: 'test' });
    expect(e.cancelledAt).toBe(NOW);
    expect(e.cancelledBy).toBe('admin');
    expect(e.cancelledReason).toBe('test');
  });
});

// ═══════════════════════════════════════════════════════════
// Preference — ALL predicates
// ═══════════════════════════════════════════════════════════
describe('PreferenceEntity — call every getter', () => {
  const opt = (ch: string, en = true, cat?: string) =>
    PreferenceOptionVO.create({ channel: ch as any, enabled: en, category: cat });
  const makeVO = (o: any = {}) =>
    PreferenceVO.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [opt('email', true), opt('sms', false)],
      quietHoursEnabled: false,
      timezone: 'UTC', locale: 'en', locked: false,
      ...o,
    });
  const make = (o: any = {}) =>
    PreferenceEntity.reconstitute({
      id: IDS.preferenceId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO(o) },
    });

  it('calls all getters on unlocked', () => {
    const e = make();
    expect(e.locked).toBe(false);
    expect(e.isChannelEnabled('email')).toBe(true);
    expect(e.isChannelEnabled('sms')).toBe(false);
    expect(e.isCategoryEnabled('email', 'order')).toBe(true);
    expect(e.isInQuietHours(23)).toBe(false);
    expect(e.id).toBe(IDS.preferenceId);
    expect(e.preferenceId.value).toBe(IDS.preferenceId);
    expect(e.userId.value).toBe(IDS.userId);
  });

  it('calls all getters on locked', () => {
    const e = make({ locked: true });
    expect(e.locked).toBe(true);
  });

  it('calls getter with quiet hours enabled', () => {
    const e = make({ quietHoursEnabled: true, quietHoursStart: 22, quietHoursEnd: 8 });
    expect(e.isInQuietHours(23)).toBe(true);
    expect(e.isInQuietHours(10)).toBe(false);
  });

  it('optOut category-specific', () => {
    const e = make({ options: [opt('email', true, 'order')] });
    e.optOut('email', 'order', NOW);
    expect(e.isCategoryEnabled('email', 'order')).toBe(false);
  });

  it('optIn category-specific', () => {
    const e = make({ options: [opt('email', false, 'order')] });
    e.optIn('email', 'order', NOW);
    expect(e.isCategoryEnabled('email', 'order')).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Schedule — ALL predicates + getters
// ═══════════════════════════════════════════════════════════
describe('ScheduleEntity — call every getter', () => {
  const makeVO = (o: any = {}) =>
    ScheduleVO.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      name: 'R',
      type: ScheduleTypeVO.create('recurring'),
      status: ScheduleStatusVO.pending(),
      frequency: ScheduleFrequencyVO.create('daily'),
      time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
      templateId: TemplateIdVO.create(IDS.templateId),
      recipientIds: [UserIdVO.create(IDS.userId)],
      runCount: 0, ...o,
    });
  const make = (o: any = {}) =>
    ScheduleEntity.reconstitute({
      id: IDS.scheduleId, createdAt: NOW, updatedAt: NOW,
      props: o,
    });

  it('calls all predicates on pending', () => {
    const e = make({ vo: makeVO() });
    expect(e.isPending()).toBe(true);
    expect(e.isActive()).toBe(false);
    expect(e.isPaused()).toBe(false);
    expect(e.isCompleted()).toBe(false);
    expect(e.isCancelled()).toBe(false);
    expect(e.isFailed()).toBe(false);
    expect(e.isRunnable()).toBe(false);
    expect(e.isTerminal()).toBe(false);
    expect(e.id).toBe(IDS.scheduleId);
    expect(e.scheduleId.value).toBe(IDS.scheduleId);
    expect(e.status.value).toBe('pending');
    expect(e.runCount).toBe(0);
    expect(e.nextRunAt).toBeUndefined();
    expect(e.lastRunAt).toBeUndefined();
    expect(e.pausedAt).toBeUndefined();
    expect(e.pausedReason).toBeUndefined();
    expect(e.cancelledAt).toBeUndefined();
    expect(e.cancelledBy).toBeUndefined();
    expect(e.cancelledReason).toBeUndefined();
    expect(e.failureReason).toBeUndefined();
  });

  it('calls all predicates on active', () => {
    const e = make({ vo: makeVO({ status: ScheduleStatusVO.active(), nextRunAt: FUTURE, runCount: 5 }) });
    expect(e.isActive()).toBe(true);
    expect(e.isRunnable()).toBe(true);
    expect(e.nextRunAt).toBe(FUTURE);
    expect(e.runCount).toBe(5);
  });

  it('calls all predicates on paused', () => {
    const e = make({
      vo: makeVO({ status: ScheduleStatusVO.paused() }),
      pausedAt: NOW, pausedReason: 'maintenance',
    });
    expect(e.isPaused()).toBe(true);
    expect(e.pausedAt).toBe(NOW);
    expect(e.pausedReason).toBe('maintenance');
  });

  it('calls all predicates on completed', () => {
    const e = make({ vo: makeVO({ status: ScheduleStatusVO.completed() }) });
    expect(e.isCompleted()).toBe(true);
    expect(e.isTerminal()).toBe(true);
  });

  it('calls all predicates on cancelled', () => {
    const e = make({
      vo: makeVO({ status: ScheduleStatusVO.cancelled() }),
      cancelledAt: NOW, cancelledBy: 'u', cancelledReason: 'r',
    });
    expect(e.isCancelled()).toBe(true);
    expect(e.cancelledAt).toBe(NOW);
    expect(e.cancelledBy).toBe('u');
    expect(e.cancelledReason).toBe('r');
  });

  it('calls all predicates on failed', () => {
    const e = make({
      vo: makeVO({ status: ScheduleStatusVO.failed() }),
      failureReason: 'db error',
    });
    expect(e.isFailed()).toBe(true);
    expect(e.failureReason).toBe('db error');
  });
});

// ═══════════════════════════════════════════════════════════
// Template — ALL predicates + getters
// ═══════════════════════════════════════════════════════════
describe('TemplateEntity — call every getter', () => {
  const v = (n = 'varname') => TemplateVariableVO.create({ name: n, type: 'string', required: true });
  const makeVO = (o: any = {}) =>
    TemplateVO.create({
      id: TemplateIdVO.create(IDS.templateId),
      name: TemplateNameVO.create('Test'),
      slug: 't',
      type: NotificationTypeVO.create('promotional'),
      status: 'draft' as const,
      format: TemplateFormatVO.html(),
      body: TemplateContentVO.create('{{varname}}'),
      variables: [v('varname')],
      locale: 'en', version: 1,
      ...o,
    });
  const make = (o: any = {}) =>
    TemplateEntity.reconstitute({
      id: IDS.templateId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO(), renderedHistory: [], ...o },
    });

  it('calls all predicates on draft', () => {
    const e = make();
    expect(e.isDraft()).toBe(true);
    expect(e.isActive()).toBe(false);
    expect(e.isInactive()).toBe(false);
    expect(e.isArchived()).toBe(false);
    expect(e.isDeprecated()).toBe(false);
    expect(e.isUsable()).toBe(false);
    expect(e.canBeDeleted()).toBe(true);
    expect(e.id).toBe(IDS.templateId);
    expect(e.templateId.value).toBe(IDS.templateId);
    expect(e.status).toBe('draft');
    expect(e.templateVersion).toBe(1);
    expect(e.renderedHistory).toEqual([]);
  });

  it('calls all predicates on active', () => {
    const e = make({ vo: makeVO({ status: 'active' }) });
    expect(e.isActive()).toBe(true);
    expect(e.isUsable()).toBe(true);
    expect(e.canBeDeleted()).toBe(false);
  });

  it('calls all predicates on inactive', () => {
    const e = make({ vo: makeVO({ status: 'inactive' }) });
    expect(e.isInactive()).toBe(true);
  });

  it('calls all predicates on archived', () => {
    const e = make({ vo: makeVO({ status: 'archived' }) });
    expect(e.isArchived()).toBe(true);
    expect(e.canBeDeleted()).toBe(true);
  });

  it('calls all predicates on deprecated', () => {
    const e = make({ vo: makeVO({ status: 'deprecated' }) });
    expect(e.isDeprecated()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Webhook — ALL predicates + getters
// ═══════════════════════════════════════════════════════════
describe('WebhookEntity — call every getter', () => {
  const makeVO = (o: any = {}) =>
    WebhookVO.create({
      id: WebhookIdVO.create(IDS.webhookId),
      name: 'H',
      type: WebhookTypeVO.create('outgoing'),
      status: WebhookStatusVO.active(),
      url: WebhookUrlVO.create('https://x.com/h'),
      events: ['order.created'] as const,
      ...o,
    });
  const make = (o: any = {}) =>
    WebhookEntity.reconstitute({
      id: IDS.webhookId, createdAt: NOW, updatedAt: NOW,
      props: { vo: makeVO(), ...o },
    });

  it('calls all predicates on active', () => {
    const e = make();
    expect(e.isActive()).toBe(true);
    expect(e.canDeliver()).toBe(true);
    expect(e.isTerminal()).toBe(false);
    expect(e.subscribes('order.created')).toBe(true);
    expect(e.subscribes('payment.failed')).toBe(false);
    expect(e.id).toBe(IDS.webhookId);
    expect(e.webhookId.value).toBe(IDS.webhookId);
    expect(e.status.value).toBe('active');
    expect(e.pausedAt).toBeUndefined();
    expect(e.pausedReason).toBeUndefined();
    expect(e.disabledAt).toBeUndefined();
    expect(e.disabledReason).toBeUndefined();
    expect(e.failureReason).toBeUndefined();
  });

  it('calls all predicates on paused', () => {
    const e = make({ vo: makeVO({ status: WebhookStatusVO.paused() }), pausedAt: NOW, pausedReason: 'm' });
    expect(e.canDeliver()).toBe(false);
    expect(e.pausedAt).toBe(NOW);
    expect(e.pausedReason).toBe('m');
  });

  it('calls all predicates on disabled', () => {
    const e = make({ vo: makeVO({ status: WebhookStatusVO.disabled() }), disabledAt: NOW, disabledReason: 'd' });
    expect(e.isTerminal()).toBe(true);
    expect(e.disabledAt).toBe(NOW);
    expect(e.disabledReason).toBe('d');
  });

  it('calls all predicates on failed', () => {
    const e = make({ vo: makeVO({ status: WebhookStatusVO.failed() }), failureReason: 'net' });
    expect(e.failureReason).toBe('net');
  });
});
