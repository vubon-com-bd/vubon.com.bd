/**
 * Supplementary branch coverage — round 2
 * @module notification-service/test/unit/domain
 *
 * Covers specific uncovered lines in:
 *   broadcast, device, digest, notification, preference, schedule, template, webhook
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
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
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

import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const NOW_MS = Date.now();
const WEEK_AGO = new Date(NOW_MS - 7 * 86_400_000).toISOString();
const FUTURE = new Date(NOW_MS + 3_600_000).toISOString();

// ═══════════════════════════════════════════════════════════
// Broadcast — lines 62, 65, 86, 239, 303
// ═══════════════════════════════════════════════════════════
describe('BroadcastEntity — branch coverage round 2', () => {
  const content = () =>
    NotificationContentVO.create({
      subject: NotificationSubjectVO.create('Hi'),
      body: NotificationBodyVO.create('Body'),
      data: NotificationDataVO.create({}),
    });

  const makeVO = (overrides: any = {}) =>
    BroadcastVO.create({
      id: BroadcastIdVO.create(IDS.broadcastId),
      name: 'Sale',
      type: BroadcastTypeVO.create('all_users'),
      status: BroadcastStatusVO.draft(),
      audience: BroadcastAudienceVO.create({ target: 'all' }),
      channels: [NotificationChannelVO.email()],
      content: content(),
      createdBy: UserIdVO.create(IDS.userId),
      recipientCount: 100,
      sentCount: 0,
      failedCount: 0,
      ...overrides,
    });

  it('rejects reconstitute with cancelled but no cancelledAt', () => {
    expect(() =>
      BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: BroadcastStatusVO.cancelled() }) },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects reconstitute with failed but no failureReason', () => {
    expect(() =>
      BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: BroadcastStatusVO.create('failed') }) },
      }),
    ).toThrow(ValidationError);
  });

  it('approve from non-draft throws', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: BroadcastStatusVO.scheduled() }) },
    });
    expect(() => entity.approve(UserIdVO.create(IDS.userId2), NOW)).toThrow(BusinessRuleError);
  });

  it('start from scheduled without approval throws', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: BroadcastStatusVO.scheduled() }),
      },
    });
    expect(() => entity.start(NOW)).toThrow(BusinessRuleError);
  });

  it('updateProgress when not sending throws', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    expect(() => entity.updateProgress(10, 0, NOW)).toThrow(BusinessRuleError);
  });

  it('cancel when sent throws', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({
          status: BroadcastStatusVO.sent(),
          approvedBy: UserIdVO.create(IDS.userId2),
          completedAt: NOW,
        }),
      },
    });
    expect(() => entity.cancel(undefined, undefined, NOW)).toThrow(BusinessRuleError);
  });

  it('rejects send with recipientCount > max', () => {
    expect(() =>
      BroadcastEntity.reconstitute({
        id: IDS.broadcastId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            status: BroadcastStatusVO.sent(),
            recipientCount: 2_000_000,
            completedAt: NOW,
            approvedBy: UserIdVO.create(IDS.userId2),
          }),
        },
      }),
    ).toThrow(ValidationError);
  });
});

// ═══════════════════════════════════════════════════════════
// Device — lines 59, 130, 184, 246
// ═══════════════════════════════════════════════════════════
describe('DeviceEntity — branch coverage round 2', () => {
  const makeVO = (overrides: any = {}) =>
    DeviceVO.create({
      id: DeviceIdVO.create(IDS.deviceId),
      userId: UserIdVO.create(IDS.userId),
      type: DeviceTypeVO.create('android'),
      status: DeviceStatusVO.active(),
      token: DeviceTokenVO.create(IDS.deviceToken),
      platform: DevicePlatformVO.create('android'),
      lastActiveAt: NOW,
      registeredAt: WEEK_AGO,
      ...overrides,
    });

  it('rejects reconstitute with unregistered but no unregisteredAt', () => {
    expect(() =>
      DeviceEntity.reconstitute({
        id: IDS.deviceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: DeviceStatusVO.unregistered() }) },
      }),
    ).toThrow(ValidationError);
  });

  it('block on terminal device throws', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: DeviceStatusVO.unregistered() }),
        unregisteredAt: NOW,
      },
    });
    expect(() => entity.block('x', NOW)).toThrow(BusinessRuleError);
  });

  it('refreshToken on terminal throws (blocks/unregistered)', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: DeviceStatusVO.blocked() }),
        blockedAt: NOW,
      },
    });
    expect(() => entity.refreshToken(DeviceTokenVO.create(IDS.deviceToken2), NOW)).toThrow(
      BusinessRuleError,
    );
  });

  it('activate from active throws', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    expect(() => entity.activate(NOW)).toThrow(BusinessRuleError);
  });
});

// ═══════════════════════════════════════════════════════════
// Digest — lines 61, 67, 70, 90, 197, 215, 259
// ═══════════════════════════════════════════════════════════
describe('DigestEntity — branch coverage round 2', () => {
  const DAY_AGO = new Date(NOW_MS - 86_400_000).toISOString();

  const makeVO = (overrides: any = {}) =>
    DigestVO.create({
      id: DigestIdVO.create(IDS.digestId),
      userId: UserIdVO.create(IDS.userId),
      status: DigestStatusVO.pending(),
      type: DigestTypeVO.create('summary'),
      period: DigestPeriodVO.create({
        frequency: 'daily',
        periodStart: DAY_AGO,
        periodEnd: NOW,
      }),
      categories: ['order'],
      sendHour: 9,
      timezone: 'UTC',
      itemCount: 0,
      ...overrides,
    });

  it('rejects reconstitute with failed but no failureReason', () => {
    expect(() =>
      DigestEntity.reconstitute({
        id: IDS.digestId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: DigestStatusVO.failed() }), items: [] },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects reconstitute with cancelled but no cancelledAt', () => {
    expect(() =>
      DigestEntity.reconstitute({
        id: IDS.digestId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ status: DigestStatusVO.cancelled() }), items: [] },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects > 50 items (invariant)', () => {
    expect(() =>
      DigestEntity.reconstitute({
        id: IDS.digestId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO(),
          items: Array.from({ length: 51 }, () => ({}) as any),
        },
      }),
    ).toThrow(ValidationError);
  });

  it('startGenerating from non-pending throws', () => {
    const entity = DigestEntity.reconstitute({
      id: IDS.digestId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: DigestStatusVO.ready(), generatedAt: NOW, itemCount: 1 }),
        items: [],
      },
    });
    expect(() => entity.startGenerating(NOW)).toThrow(BusinessRuleError);
  });

  it('fail from pending throws', () => {
    const entity = DigestEntity.create({
      id: DigestIdVO.create(IDS.digestId),
      vo: makeVO(),
      now: NOW,
    });
    expect(() => entity.fail('reason', NOW)).toThrow(BusinessRuleError);
  });

  it('cancel from sent throws', () => {
    const entity = DigestEntity.reconstitute({
      id: IDS.digestId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({
          status: DigestStatusVO.sent(),
          sentAt: NOW,
          generatedAt: NOW,
          itemCount: 1,
        }),
        items: [],
      },
    });
    expect(() => entity.cancel(undefined, NOW)).toThrow(BusinessRuleError);
  });
});

// ═══════════════════════════════════════════════════════════
// Notification — lines 89, 92, 95, 101, 116, 123, 132, 164, 296-301, 312-314
// ═══════════════════════════════════════════════════════════
describe('NotificationEntity — branch coverage round 2', () => {
  const content = () =>
    NotificationContentVO.create({
      subject: NotificationSubjectVO.create('Subject'),
      body: NotificationBodyVO.create('Body'),
      data: NotificationDataVO.create({}),
    });

  const recipient = () =>
    NotificationRecipientVO.create({
      userId: UserIdVO.create(IDS.userId),
      channel: NotificationChannelVO.email(),
      email: EmailAddressVO.create('user@example.com'),
    });

  const makeVO = (overrides: any = {}) =>
    NotificationVO.create({
      id: NotificationIdVO.create(IDS.notificationId),
      userId: UserIdVO.create(IDS.userId),
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.create('order'),
      channel: NotificationChannelVO.email(),
      priority: NotificationPriorityVO.normal(),
      status: NotificationStatusVO.draft(),
      subject: NotificationSubjectVO.create('Subject'),
      body: NotificationBodyVO.create('Body'),
      data: NotificationDataVO.create({}),
      ...overrides,
    });

  it('rejects reconstitute with sent but no sentAt', () => {
    expect(() =>
      NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: NotificationStatusVO.sent() }),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
        },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects reconstitute with delivered but no deliveredAt', () => {
    expect(() =>
      NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: NotificationStatusVO.delivered() }),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
          sentAt: NOW,
        },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects reconstitute with cancelled but no cancelledAt', () => {
    expect(() =>
      NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({ status: NotificationStatusVO.cancelled() }),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
        },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects reconstitute with no recipients', () => {
    expect(() =>
      NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO(),
          content: content(),
          recipients: [],
          actions: [],
          attempts: [],
        },
      }),
    ).toThrow(ValidationError);
  });

  it('rejects reconstitute security silent', () => {
    expect(() =>
      NotificationEntity.reconstitute({
        id: IDS.notificationId,
        createdAt: NOW,
        updatedAt: NOW,
        props: {
          vo: makeVO({
            type: NotificationTypeVO.security(),
            category: NotificationCategoryVO.create('security'),
            priority: NotificationPriorityVO.silent(),
          }),
          content: content(),
          recipients: [recipient()],
          actions: [],
          attempts: [],
        },
      }),
    ).toThrow(ValidationError);
  });

  it('invalid transition draft → markSent throws', () => {
    const entity = NotificationEntity.create({
      id: NotificationIdVO.create(IDS.notificationId),
      vo: makeVO(),
      content: content(),
      recipients: [recipient()],
      now: NOW,
    });
    expect(() => entity.markSent(NOW)).toThrow(BusinessRuleError);
  });

  it('schedule past time throws', () => {
    const entity = NotificationEntity.create({
      id: NotificationIdVO.create(IDS.notificationId),
      vo: makeVO({ status: NotificationStatusVO.pending() }),
      content: content(),
      recipients: [recipient()],
      now: NOW,
    });
    expect(() => entity.schedule('2020-01-01T00:00:00Z', NOW)).toThrow(BusinessRuleError);
  });

  it('markDelivered from draft throws', () => {
    const entity = NotificationEntity.create({
      id: NotificationIdVO.create(IDS.notificationId),
      vo: makeVO(),
      content: content(),
      recipients: [recipient()],
      now: NOW,
    });
    expect(() => entity.markDelivered(NOW)).toThrow(BusinessRuleError);
  });

  it('changePriority on terminal throws', () => {
    const entity = NotificationEntity.reconstitute({
      id: IDS.notificationId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: NotificationStatusVO.delivered() }),
        content: content(),
        recipients: [recipient()],
        actions: [],
        attempts: [],
        sentAt: NOW,
        deliveredAt: NOW,
      },
    });
    expect(() => entity.changePriority(NotificationPriorityVO.high(), NOW)).toThrow(BusinessRuleError);
  });

  it('canBeRetried when failed + attempts < max', () => {
    const entity = NotificationEntity.reconstitute({
      id: IDS.notificationId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: NotificationStatusVO.failed() }),
        content: content(),
        recipients: [recipient()],
        actions: [],
        attempts: [],
      },
    });
    expect(entity.canBeRetried()).toBe(true);
  });

  it('archive from cancelled works', () => {
    const entity = NotificationEntity.reconstitute({
      id: IDS.notificationId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: NotificationStatusVO.cancelled() }),
        content: content(),
        recipients: [recipient()],
        actions: [],
        attempts: [],
        cancelledAt: NOW,
      },
    });
    entity.archive(NOW);
    expect(entity.isArchived()).toBe(true);
  });

  it('changePriority on draft works', () => {
    const entity = NotificationEntity.create({
      id: NotificationIdVO.create(IDS.notificationId),
      vo: makeVO(),
      content: content(),
      recipients: [recipient()],
      now: NOW,
    });
    entity.changePriority(NotificationPriorityVO.high(), NOW);
    expect(entity.priority.isUrgent()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Preference — lines 44, 255
// ═══════════════════════════════════════════════════════════
describe('PreferenceEntity — branch coverage round 2', () => {
  const opt = (channel: string, enabled = true) =>
    PreferenceOptionVO.create({ channel: channel as any, enabled });

  const makeVO = (overrides: any = {}) =>
    PreferenceVO.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [opt('email', true)],
      quietHoursEnabled: false,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
      ...overrides,
    });

  it('lock when already locked no-op', () => {
    const entity = PreferenceEntity.reconstitute({
      id: IDS.preferenceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ locked: true }) },
    });
    const before = entity.domainEvents.length;
    entity.lock('again', NOW);
    expect(entity.domainEvents.length).toBe(before);
  });

  it('optOut with category', () => {
    const entity = PreferenceEntity.reconstitute({
      id: IDS.preferenceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({
          options: [opt('email', true), PreferenceOptionVO.create({ channel: 'email', category: 'order', enabled: true })],
        }),
      },
    });
    entity.optOut('email', 'order', NOW);
    expect(entity.isCategoryEnabled('email', 'order')).toBe(false);
  });
});

// ═══════════════════════════════════════════════════════════
// Schedule — lines 97, 278
// ═══════════════════════════════════════════════════════════
describe('ScheduleEntity — branch coverage round 2', () => {
  const makeVO = (overrides: any = {}) =>
    ScheduleVO.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      name: 'R',
      type: ScheduleTypeVO.create('recurring'),
      status: ScheduleStatusVO.pending(),
      frequency: ScheduleFrequencyVO.create('daily'),
      time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
      templateId: TemplateIdVO.create(IDS.templateId),
      recipientIds: [UserIdVO.create(IDS.userId)],
      runCount: 0,
      ...overrides,
    });

  it('pause from pending throws', () => {
    const entity = ScheduleEntity.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      vo: makeVO(),
      now: NOW,
    });
    expect(() => entity.pause(undefined, NOW)).toThrow(BusinessRuleError);
  });

  it('complete from pending throws', () => {
    const entity = ScheduleEntity.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      vo: makeVO(),
      now: NOW,
    });
    expect(() => entity.complete(NOW)).toThrow(BusinessRuleError);
  });
});

// ═══════════════════════════════════════════════════════════
// Template — lines 50, 77, 239
// ═══════════════════════════════════════════════════════════
describe('TemplateEntity — branch coverage round 2', () => {
  const v = (name: string, required = true) =>
    TemplateVariableVO.create({ name, type: 'string', required });

  const makeVO = (overrides: any = {}) =>
    TemplateVO.create({
      id: TemplateIdVO.create(IDS.templateId),
      name: TemplateNameVO.create('Test'),
      slug: 'test',
      type: NotificationTypeVO.create('promotional'),
      status: 'draft' as const,
      format: TemplateFormatVO.html(),
      body: TemplateContentVO.create('{{userName}}'),
      variables: [v('userName')],
      locale: 'en',
      version: 1,
      ...overrides,
    });

  it('create non-draft throws', () => {
    expect(() =>
      TemplateEntity.create({
        id: TemplateIdVO.create(IDS.templateId),
        vo: makeVO({ status: 'active' }),
        now: NOW,
      }),
    ).toThrow(ValidationError);
  });

  it('activate from non-draft throws', () => {
    const entity = TemplateEntity.reconstitute({
      id: IDS.templateId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: 'archived' }), renderedHistory: [] },
    });
    expect(() => entity.activate(NOW)).toThrow(BusinessRuleError);
  });
});

// ═══════════════════════════════════════════════════════════
// Webhook — line 269
// ═══════════════════════════════════════════════════════════
describe('WebhookEntity — branch coverage round 2', () => {
  const makeVO = (overrides: any = {}) =>
    WebhookVO.create({
      id: WebhookIdVO.create(IDS.webhookId),
      name: 'Hook',
      type: WebhookTypeVO.create('outgoing'),
      status: WebhookStatusVO.active(),
      url: WebhookUrlVO.create('https://example.com/hook'),
      events: ['order.created'] as const,
      ...overrides,
    });

  it('pause from paused throws', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: WebhookStatusVO.paused() }), pausedAt: NOW },
    });
    expect(() => entity.pause('again', NOW)).toThrow(BusinessRuleError);
  });
});
