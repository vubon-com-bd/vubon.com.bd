/**
 * Supplementary branch coverage — round 7
 * @module notification-service/test/unit/domain
 *
 * Targets exact uncovered line ranges per file:
 *   broadcast: 88, 108-126 (schedule), 151 (updateProgress branch), 164-212 (complete + fail)
 *   device: 80-108 (activate/deactivate/refreshToken events), 128 (refreshToken throw), 155 (block throw), 176 (touch)
 *   digest: 92-124 (startGenerating through markSent), 154-174 (cancel)
 *   notification: 101 (silent+security), 116 (scheduledAt getter), 123 (isQueued getter)
 *   schedule: 100-199 (all methods)
 *   webhook: 89-191 (all methods)
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
import { DigestItemVO } from '@domain/composites/digest-item.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { DigestStatusVO } from '@domain/primitives/digest-status.vo.js';
import { DigestTypeVO } from '@domain/primitives/digest-type.vo.js';
import { DigestPeriodVO } from '@domain/primitives/digest-period.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';

import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';

import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

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
// Broadcast — 88 (isTerminal), 108-126 (schedule), 151, 164-212 (complete/fail)
// ═══════════════════════════════════════════════════════════
describe('BroadcastEntity — booster 7', () => {
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

  it('isTerminal + isCancelled — L88', () => {
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

  it('schedule from draft — L108-126', () => {
    const entity = BroadcastEntity.create({
      id: BroadcastIdVO.create(IDS.broadcastId),
      vo: makeVO(),
      now: NOW,
    });
    entity.schedule(FUTURE, NOW);
    expect(entity.isScheduled()).toBe(true);
  });

  it('updateProgress from sending — L149-160', () => {
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
    entity.updateProgress(30, 5, NOW);
    expect(entity.sentCount).toBe(30);
  });

  it('complete from sending — L164', () => {
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

  it('fail from sending — L180-212', () => {
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
    entity.fail('server error', NOW);
    expect(entity.isFailed()).toBe(true);
    expect(entity.failureReason).toBe('server error');
  });
});

// ═══════════════════════════════════════════════════════════
// Device — 80-108 (activate/deactivate), 128 (refreshToken throw), 155 (block throw), 176 (touch)
// ═══════════════════════════════════════════════════════════
describe('DeviceEntity — booster 7', () => {
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

  it('activate from inactive — L80', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: DeviceStatusVO.inactive() }) },
    });
    entity.activate(NOW);
    expect(entity.isActive()).toBe(true);
  });

  it('deactivate from active — L93', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.deactivate(NOW);
    expect(entity.vo.status.isInactive()).toBe(true);
  });

  it('refreshToken from active — L110', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.refreshToken(DeviceTokenVO.create(IDS.deviceToken2), NOW);
    expect(entity.token.value).toBe(IDS.deviceToken2);
  });

  it('refreshToken from blocked throws — L128', () => {
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

  it('block from active — L142', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.block('suspicious', NOW);
    expect(entity.isBlocked()).toBe(true);
  });

  it('block from terminal throws — L155', () => {
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

  it('unregister from active — L165', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.unregister('user request', NOW);
    expect(entity.vo.status.isUnregistered()).toBe(true);
  });

  it('unregister from unregistered no-op — L165 false path', () => {
    const entity = DeviceEntity.reconstitute({
      id: IDS.deviceId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: DeviceStatusVO.unregistered() }),
        unregisteredAt: NOW,
      },
    });
    const before = entity.domainEvents.length;
    entity.unregister(undefined, NOW);
    expect(entity.domainEvents.length).toBe(before);
  });

  it('touchActivity — L176', () => {
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
// Digest — 92-124 (full lifecycle), 154-174 (cancel)
// ═══════════════════════════════════════════════════════════
describe('DigestEntity — booster 7', () => {
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

  const makeItem = () =>
    DigestItemVO.create({
      notificationId: NotificationIdVO.create(IDS.notificationId),
      category: NotificationCategoryVO.create('order'),
      priority: NotificationPriorityVO.normal(),
      title: 'Order 123',
      summary: 'confirmed',
      occurredAt: NOW,
    });

  it('full lifecycle: pending → generating → ready → sent — L92-124', () => {
    const entity = DigestEntity.create({
      id: DigestIdVO.create(IDS.digestId),
      vo: makeVO(),
      now: NOW,
    });
    entity.startGenerating(NOW);
    expect(entity.isGenerating()).toBe(true);
    entity.completeGeneration([makeItem()], NOW);
    expect(entity.isReady()).toBe(true);
    entity.markSent(NOW);
    expect(entity.isSent()).toBe(true);
  });

  it('cancel from pending — L154-174', () => {
    const entity = DigestEntity.create({
      id: DigestIdVO.create(IDS.digestId),
      vo: makeVO(),
      now: NOW,
    });
    entity.cancel('user requested', NOW);
    expect(entity.isCancelled()).toBe(true);
    expect(entity.cancelledReason).toBe('user requested');
  });

  it('fail from generating — L136', () => {
    const entity = DigestEntity.create({
      id: DigestIdVO.create(IDS.digestId),
      vo: makeVO(),
      now: NOW,
    });
    entity.startGenerating(NOW);
    entity.fail('timeout', NOW);
    expect(entity.isFailed()).toBe(true);
    expect(entity.failureReason).toBe('timeout');
  });
});

// ═══════════════════════════════════════════════════════════
// Notification — 101 (silent+security), 116 (scheduledAt), 123 (isQueued)
// ═══════════════════════════════════════════════════════════
describe('NotificationEntity — booster 7', () => {
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

  it('silent+security invariant throws — L101', () => {
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

  it('isQueued getter — L123', () => {
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
// Schedule — 100-199 (all methods)
// ═══════════════════════════════════════════════════════════
describe('ScheduleEntity — booster 7', () => {
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

  it('isTerminal getter — L100', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: ScheduleStatusVO.completed() }) },
    });
    expect(entity.isTerminal()).toBe(true);
  });

  it('activate from pending — L195', () => {
    const entity = ScheduleEntity.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      vo: makeVO(),
      now: NOW,
    });
    entity.activate(FUTURE, NOW);
    expect(entity.isActive()).toBe(true);
  });

  it('pause from active — L212', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
    });
    entity.pause('maintenance', NOW);
    expect(entity.isPaused()).toBe(true);
    expect(entity.pausedReason).toBe('maintenance');
  });

  it('resume from paused — L232', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: {
        vo: makeVO({ status: ScheduleStatusVO.paused() }),
        pausedAt: NOW,
      },
    });
    entity.resume(FUTURE, NOW);
    expect(entity.isActive()).toBe(true);
  });

  it('recordExecution from active — L252', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
    });
    entity.recordExecution(10, NOW);
    expect(entity.runCount).toBe(1);
  });

  it('complete from active — L268', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
    });
    entity.complete(NOW);
    expect(entity.isCompleted()).toBe(true);
  });

  it('cancel from pending — L285', () => {
    const entity = ScheduleEntity.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      vo: makeVO(),
      now: NOW,
    });
    entity.cancel('user', IDS.userId, NOW);
    expect(entity.isCancelled()).toBe(true);
  });

  it('fail from active — L310', () => {
    const entity = ScheduleEntity.reconstitute({
      id: IDS.scheduleId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO({ status: ScheduleStatusVO.active() }) },
    });
    entity.fail('db error', NOW);
    expect(entity.isFailed()).toBe(true);
  });
});

// ═══════════════════════════════════════════════════════════
// Webhook — 89-191 (all methods)
// ═══════════════════════════════════════════════════════════
describe('WebhookEntity — booster 7', () => {
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

  it('activate from paused — L185', () => {
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

  it('pause from active — L210', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.pause('maintenance', NOW);
    expect(entity.vo.status.isPaused()).toBe(true);
  });

  it('disable from active — L232', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.disable('deprecated', NOW);
    expect(entity.vo.status.isDisabled()).toBe(true);
  });

  it('recordDelivery from active — L255', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.recordDelivery('del-1', 'order.created', 200, 100, NOW);
    expect(entity.vo.lastTriggeredAt).toBe(NOW);
  });

  it('recordDeliveryFailure — L278', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    const before = entity.domainEvents.length;
    entity.recordDeliveryFailure('del-1', 'order.created', 1, 'timeout', 500, NOW);
    expect(entity.domainEvents.length).toBeGreaterThan(before);
  });

  it('addEvents — L296', () => {
    const entity = WebhookEntity.reconstitute({
      id: IDS.webhookId,
      createdAt: NOW,
      updatedAt: NOW,
      props: { vo: makeVO() },
    });
    entity.addEvents(['user.created'], NOW);
    expect(entity.vo.eventCount).toBe(1);
  });
});
