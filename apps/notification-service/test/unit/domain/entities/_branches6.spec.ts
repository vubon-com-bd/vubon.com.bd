/**
 * Supplementary branch coverage — round 6
 * @module notification-service/test/unit/domain
 *
 * Targets specific uncovered branches:
 *   broadcast: 88, 108-126 (schedule/start), 151 (updateProgress-not-sending), 164-212 (complete/fail)
 *   device: 80-108 (activate/deactivate events), 128 (refreshToken terminal), 155 (block terminal), 176 (touch)
 *   digest: 215 (create pending invariant)
 *   notification: 101 (silent+security), 116 (scheduledAt getter), 123 (isQueued getter)
 *   preference: 44 (>50 options invariant)
 *   schedule: 100 (isTerminal getter), 195 (activate)
 *   template: 50 (version invariant), 78 (activate missing subject throw)
 *   webhook: 89 (subscribes), 185 (activate)
 */
import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { TemplateTypeVO } from '@domain/primitives/template-type.vo.js';
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

import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const NOW_MS = Date.now();
const WEEK_AGO = new Date(NOW_MS - 7 * 86_400_000).toISOString();
const FUTURE = new Date(NOW_MS + 3_600_000).toISOString();

// ═══════════════════════════════════════════════════════════
// Broadcast — L88 (isTerminal), L108-126 (schedule/start), L151 (updateProgress), L164-212 (complete/fail)
// ═══════════════════════════════════════════════════════════
describe('BroadcastEntity — booster 6', () => {
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

  it('isCancelled() + isTerminal() — L87-88', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: BroadcastStatusVO.cancelled() }),
        cancelledAt: NOW,
      },
    });
    expect(entity.isCancelled()).toBe(true);
    expect(entity.isTerminal()).toBe(true);
  });

  it('schedule() from draft — L108-126', () => {
    const entity = BroadcastEntity.create({
      id: BroadcastIdVO.create(IDS.broadcastId),
      vo: makeVO(),
      now: NOW,
    });
    entity.schedule(FUTURE, NOW);
    expect(entity.isScheduled()).toBe(true);
  });

  it('start() from scheduled + approved — L128-147', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({
          status: BroadcastStatusVO.scheduled(),
          approvedBy: UserIdVO.create(IDS.userId2),
        }),
      },
    });
    entity.start(NOW);
    expect(entity.isSending()).toBe(true);
  });

  it('updateProgress() from sending — L149-160', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({
          status: BroadcastStatusVO.sending(),
          approvedBy: UserIdVO.create(IDS.userId2),
        }),
      },
    });
    entity.updateProgress(50, 5, NOW);
    expect(entity.sentCount).toBe(50);
    expect(entity.failedCount).toBe(5);
  });

  it('complete() from sending — L162-182', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({
          status: BroadcastStatusVO.sending(),
          approvedBy: UserIdVO.create(IDS.userId2),
        }),
      },
    });
    entity.complete(NOW);
    expect(entity.isSent()).toBe(true);
  });

  it('fail() from sending — L184-212', () => {
    const entity = BroadcastEntity.reconstitute({
      id: IDS.broadcastId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({
          status: BroadcastStatusVO.sending(),
          approvedBy: UserIdVO.create(IDS.userId2),
        }),
      },
    });
    entity.fail('rate limit', NOW);
    expect(entity.isFailed()).toBe(true);
    expect(entity.failureReason).toBe('rate limit');
  });
});

// ═══════════════════════════════════════════════════════════
// Device — L80-108 (activate/deactivate), L128 (refreshToken terminal), L155 (block terminal), L176 (touchActivity)
// ═══════════════════════════════════════════════════════════
describe('DeviceEntity — booster 6', () => {
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

  it('activate() from inactive — L80', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: DeviceStatusVO.inactive() }) },
    });
    entity.activate(NOW);
    expect(entity.isActive()).toBe(true);
  });

  it('deactivate() from active — L93', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.deactivate(NOW);
    expect(entity.vo.status.isInactive()).toBe(true);
  });

  it('refreshToken() from active — L117', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.refreshToken(DeviceTokenVO.create(IDS.deviceToken2), NOW);
    expect(entity.token.value).toBe(IDS.deviceToken2);
  });

  it('refreshToken() from blocked throws — L128', () => {
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

  it('block() from active — L144', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.block('suspicious', NOW);
    expect(entity.isBlocked()).toBe(true);
  });

  it('block() from terminal throws — L155', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: DeviceStatusVO.blocked() }),
        blockedAt: NOW,
      },
    });
    expect(() => entity.block('again', NOW)).toThrow(BusinessRuleError);
  });

  it('unregister() from active — L165', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.unregister('user request', NOW);
    expect(entity.vo.status.isUnregistered()).toBe(true);
  });

  it('touchActivity() — L180', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.touchActivity(NOW);
    expect(entity.vo.lastActiveAt).toBe(NOW);
  });
});

// ═══════════════════════════════════════════════════════════
// Digest — L215 (create pending invariant)
// ═══════════════════════════════════════════════════════════
describe('DigestEntity — booster 6', () => {
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

  it('create with non-pending throws — L215', () => {
    expect(() =>
      DigestEntity.create({
        id: DigestIdVO.create(IDS.digestId),
        vo: makeVO({
          status: DigestStatusVO.ready(),
          generatedAt: NOW,
          itemCount: 1,
        }),
        now: NOW,
      }),
    ).toThrow(ValidationError);
  });
});

// ═══════════════════════════════════════════════════════════
// Notification — L101 (silent+security), L116 (scheduledAt getter), L123 (isQueued)
// ═══════════════════════════════════════════════════════════
describe('NotificationEntity — booster 6', () => {
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

  it('security + silent throws — L101', () => {
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

  it('scheduledAt getter — L116', () => {
    const entity = NotificationEntity.reconstitute({
      id: IDS.notificationId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: NotificationStatusVO.scheduled() }),
        content: content(),
        recipients: [recipient()],
        actions: [],
        attempts: [],
        scheduledAt: FUTURE,
      },
    });
    expect(entity.scheduledAt).toBe(FUTURE);
  });

  it('isQueued() getter — L123', () => {
    const entity = NotificationEntity.reconstitute({
      id: IDS.notificationId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: NotificationStatusVO.queued() }),
        content: content(),
        recipients: [recipient()],
        actions: [],
        attempts: [],
      },
    });
    expect(entity.isQueued()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Preference — L44 (>50 options)
// ═══════════════════════════════════════════════════════════
describe('PreferenceEntity — booster 6', () => {
  const opt = (channel: string, enabled = true, category?: string) =>
    PreferenceOptionVO.create({ channel: channel as any, enabled, category });

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

  it('rejects > 50 options — L44', () => {
    const options = Array.from({ length: 51 }, (_, i) =>
      opt('email', true, `cat${i}`),
    );
    expect(() =>
      PreferenceEntity.reconstitute({
        id: IDS.preferenceId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo: makeVO({ options }) },
      }),
    ).toThrow(ValidationError);
  });
});

// ═══════════════════════════════════════════════════════════
// Schedule — L100 (isTerminal), L195 (activate)
// ═══════════════════════════════════════════════════════════
describe('ScheduleEntity — booster 6', () => {
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

  it('isTerminal() getter — L100', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: ScheduleStatusVO.completed() }),
      },
    });
    expect(entity.isTerminal()).toBe(true);
  });

  it('activate() from pending — L195', () => {
    const entity = ScheduleEntity.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      vo: makeVO(),
      now: NOW,
    });
    entity.activate(FUTURE, NOW);
    expect(entity.isActive()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Template — L50 (version < 1), L78 (activate missing subject)
// ═══════════════════════════════════════════════════════════
describe('TemplateEntity — booster 6', () => {
  const v = (name: string, required = true) =>
    TemplateVariableVO.create({ name, type: 'string', required });

  it('rejects version < 1 — L50', () => {
    // Use VO.reconstitute to bypass create validation
    const vo = TemplateVO.reconstitute({
      id: TemplateIdVO.create(IDS.templateId),
      name: TemplateNameVO.create('Test'),
      slug: 'test',
      type: NotificationTypeVO.create('promotional'),
      status: 'draft' as const,
      format: TemplateFormatVO.html(),
      body: TemplateContentVO.create('{{userName}}'),
      variables: [v('userName')],
      locale: 'en',
      version: 0,  // ← invalid
    });
    expect(() =>
      TemplateEntity.reconstitute({
        id: IDS.templateId,
        createdAt: NOW,
        updatedAt: NOW,
        props: { vo, renderedHistory: [] },
      }),
    ).toThrow(ValidationError);
  });

  it('activate transactional with subject present passes — L78 (false path)', () => {
    const vo = TemplateVO.create({
      id: TemplateIdVO.create(IDS.templateId),
      name: TemplateNameVO.create('Test'),
      slug: 'test',
      type: TemplateTypeVO.create('email'),
      status: 'draft' as const,
      format: TemplateFormatVO.html(),
      subject: NotificationSubjectVO.create('Test Subject'),
      body: TemplateContentVO.create('Hello {{userName}}'),
      variables: [v('userName')],
      locale: 'en',
      version: 1,
    });
    const entity = TemplateEntity.create({
      id: TemplateIdVO.create(IDS.templateId),
      vo,
      now: NOW,
    });
    entity.activate(NOW);
    expect(entity.isActive()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Webhook — L89 (subscribes), L185 (activate)
// ═══════════════════════════════════════════════════════════
describe('WebhookEntity — booster 6', () => {
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

  it('subscribes true/false — L89', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    expect(entity.subscribes('order.created')).toBe(true);
    expect(entity.subscribes('payment.failed')).toBe(false);
  });

  it('activate() from paused — L185', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: WebhookStatusVO.paused() }),
        pausedAt: NOW,
      },
    });
    entity.activate(NOW);
    expect(entity.isActive()).toBe(true);
  });
});
