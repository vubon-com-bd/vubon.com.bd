/**
 * Branch coverage for specifications — edge cases
 * @module notification-service/test/unit/domain/specifications
 */
import { CanSendSpecification } from '@domain/specifications/can-send.specification.js';
import { CanRetrySpecification } from '@domain/specifications/can-retry.specification.js';
import { CanBroadcastSpecification } from '@domain/specifications/can-broadcast.specification.js';
import { CanScheduleSpecification } from '@domain/specifications/can-schedule.specification.js';
import { CanUnsubscribeSpecification } from '@domain/specifications/can-unsubscribe.specification.js';
import { CanRegisterDeviceSpecification } from '@domain/specifications/can-register-device.specification.js';
import { CanSendWebhookSpecification } from '@domain/specifications/can-send-webhook.specification.js';

import { NotificationEntity } from '@domain/entities/notification.entity.js';
import { NotificationVO } from '@domain/composites/notification.vo.js';
import { NotificationContentVO } from '@domain/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '@domain/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';

import { BroadcastEntity } from '@domain/entities/broadcast.entity.js';
import { BroadcastVO } from '@domain/composites/broadcast.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '@domain/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '@domain/primitives/broadcast-status.vo.js';
import { BroadcastAudienceVO } from '@domain/primitives/broadcast-audience.vo.js';

import { ScheduleEntity } from '@domain/entities/schedule.entity.js';
import { ScheduleVO } from '@domain/composites/schedule.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';

import { PreferenceEntity } from '@domain/entities/preference.entity.js';
import { PreferenceVO } from '@domain/composites/preference.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceOptionVO } from '@domain/primitives/preference-option.vo.js';

import { DeviceVO } from '@domain/composites/device.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { DeviceStatusVO } from '@domain/primitives/device-status.vo.js';
import { DeviceTypeVO } from '@domain/primitives/device-type.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { DevicePlatformVO } from '@domain/primitives/device-platform.vo.js';

import { WebhookEntity } from '@domain/entities/webhook.entity.js';
import { WebhookVO } from '@domain/composites/webhook.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';

import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = new Date().toISOString();
const FUTURE = new Date(Date.now() + 3_600_000).toISOString();
const WEEK_AGO = new Date(Date.now() - 7 * 86_400_000).toISOString();

describe('CanSendSpecification — extra branches', () => {
  const spec = CanSendSpecification.strict();
  const make = (o: any = {}) =>
    NotificationEntity.reconstitute({
      id: IDS.notificationId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: NotificationVO.create({
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
          ...o.vo,
        }),
        content: NotificationContentVO.create({
          subject: NotificationSubjectVO.create('S'),
          body: NotificationBodyVO.create('B'),
          data: NotificationDataVO.create({}),
        }),
        recipients: [
          NotificationRecipientVO.create({
            userId: UserIdVO.create(IDS.userId),
            channel: NotificationChannelVO.email(),
            email: EmailAddressVO.create('u@example.com'),
          }),
        ],
        actions: [], attempts: [],
        ...o.props,
      },
    });

  it('hasAvailableChannel=true → satisfied', () => {
    expect(spec.isSatisfiedBy({ notification: make(), ctx: { hasAvailableChannel: true } })).toBe(true);
  });

  it('preference with quiet hours active blocks promotional', () => {
    const PreferenceVOClass = require('@domain/composites/preference.vo.js').PreferenceVO;
    const pref = PreferenceVOClass.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [PreferenceOptionVO.create({ channel: 'email', enabled: true })],
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 8,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
    });
    const n = make({
      vo: {
        type: NotificationTypeVO.promotional(),
        category: NotificationCategoryVO.create('promotion'),
      },
    });
    expect(spec.isSatisfiedBy({ notification: n, ctx: { preference: pref, localHour: 23 } })).toBe(false);
  });

  it('promotional blocked when channel disabled', () => {
    const PreferenceVOClass = require('@domain/composites/preference.vo.js').PreferenceVO;
    const pref = PreferenceVOClass.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [PreferenceOptionVO.create({ channel: 'email', enabled: false })],
      quietHoursEnabled: false,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
    });
    const n = make({
      vo: {
        type: NotificationTypeVO.promotional(),
        category: NotificationCategoryVO.create('promotion'),
      },
    });
    expect(spec.isSatisfiedBy({ notification: n, ctx: { preference: pref } })).toBe(false);
  });

  it('transactional bypasses disabled channel (allowed)', () => {
    const PreferenceVOClass = require('@domain/composites/preference.vo.js').PreferenceVO;
    const pref = PreferenceVOClass.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [PreferenceOptionVO.create({ channel: 'email', enabled: false })],
      quietHoursEnabled: false,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
    });
    // Transactional always allowed (critical category)
    expect(spec.isSatisfiedBy({ notification: make(), ctx: { preference: pref } })).toBe(true);
  });

  it('security bypasses preference disable', () => {
    const PreferenceVOClass = require('@domain/composites/preference.vo.js').PreferenceVO;
    const pref = PreferenceVOClass.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [PreferenceOptionVO.create({ channel: 'email', enabled: false })],
      quietHoursEnabled: false,
      timezone: 'UTC',
      locale: 'en',
      locked: false,
    });
    const n = make({
      vo: {
        type: NotificationTypeVO.security(),
        category: NotificationCategoryVO.create('security'),
      },
    });
    expect(spec.isSatisfiedBy({ notification: n, ctx: { preference: pref } })).toBe(true);
  });

  it('security bypasses quiet hours', () => {
    const PreferenceVOClass = require('@domain/composites/preference.vo.js').PreferenceVO;
    const pref = PreferenceVOClass.create({
      id: PreferenceIdVO.create(IDS.preferenceId),
      userId: UserIdVO.create(IDS.userId),
      type: PreferenceTypeVO.create('channel_specific'),
      options: [PreferenceOptionVO.create({ channel: 'email', enabled: true })],
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 8,
      timezone: 'UTC', locale: 'en', locked: false,
    });
    const n = make({
      vo: {
        type: NotificationTypeVO.security(),
        category: NotificationCategoryVO.create('security'),
      },
    });
    expect(spec.isSatisfiedBy({ notification: n, ctx: { preference: pref, localHour: 23 } })).toBe(true);
  });
});

describe('CanBroadcastSpecification — extra branches', () => {
  const spec = CanBroadcastSpecification.strict();
  const make = (o: any = {}) => {
    const content = NotificationContentVO.create({
      subject: NotificationSubjectVO.create('Hi'),
      body: NotificationBodyVO.create('Body'),
      data: NotificationDataVO.create({}),
    });
    const vo = BroadcastVO.create({
      id: BroadcastIdVO.create(IDS.broadcastId),
      name: 'Sale',
      type: BroadcastTypeVO.create('all_users'),
      status: BroadcastStatusVO.draft(),
      audience: BroadcastAudienceVO.create({ target: 'all' }),
      channels: [NotificationChannelVO.email()],
      content,
      createdBy: UserIdVO.create(IDS.userId),
      recipientCount: 100, sentCount: 0, failedCount: 0,
      ...o.vo,
    });
    return BroadcastEntity.reconstitute({
      id: IDS.broadcastId, createdAt: NOW, updatedAt: NOW,
      props: { vo, ...o.props },
    });
  };

  it('explain returns reason for non-draft', () => {
    const b = make({ vo: { status: BroadcastStatusVO.sent(), completedAt: NOW, approvedBy: UserIdVO.create(IDS.userId2) } });
    expect(spec.explain({ broadcast: b })).toContain('status');
  });

  it('approval skipped when requireApproval=false', () => {
    const b = make();
    expect(spec.isSatisfiedBy({ broadcast: b, ctx: { requireApproval: false } })).toBe(true);
  });
});

describe('CanScheduleSpecification — extra branches', () => {
  const spec = CanScheduleSpecification.strict();
  const make = (o: any = {}) => {
    const vo = ScheduleVO.create({
      id: ScheduleIdVO.create(IDS.scheduleId),
      name: 'R',
      type: ScheduleTypeVO.create('recurring'),
      status: ScheduleStatusVO.pending(),
      frequency: ScheduleFrequencyVO.create('daily'),
      time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
      templateId: TemplateIdVO.create(IDS.templateId),
      recipientIds: [UserIdVO.create(IDS.userId)],
      runCount: 0,
      ...o.vo,
    });
    return ScheduleEntity.reconstitute({
      id: IDS.scheduleId, createdAt: NOW, updatedAt: NOW,
      props: { vo, ...o.props },
    });
  };

  it('explain for terminal', () => {
    const s = make({ vo: { status: ScheduleStatusVO.completed() } });
    expect(spec.explain({ schedule: s })).toContain('status');
  });

  it('explain for past scheduledAt', () => {
    // Reconstitute with past time by using reconstitute to bypass VO validation
    const vo = ScheduleVO.reconstitute({
      id: ScheduleIdVO.create(IDS.scheduleId),
      name: 'R',
      type: ScheduleTypeVO.create('recurring'),
      status: ScheduleStatusVO.pending(),
      frequency: ScheduleFrequencyVO.create('daily'),
      time: ScheduleTimeVO.reconstitute({ scheduledAt: '2020-01-01T00:00:00Z', timezone: 'UTC' }),
      templateId: TemplateIdVO.create(IDS.templateId),
      recipientIds: [UserIdVO.create(IDS.userId)],
      runCount: 0,
    });
    const s = ScheduleEntity.reconstitute({
      id: IDS.scheduleId, createdAt: NOW, updatedAt: NOW,
      props: { vo },
    });
    expect(spec.explain({ schedule: s })).toContain('past');
  });

  it('no recipients → explain', () => {
    const vo = ScheduleVO.reconstitute({
      id: ScheduleIdVO.create(IDS.scheduleId),
      name: 'R',
      type: ScheduleTypeVO.create('recurring'),
      status: ScheduleStatusVO.pending(),
      frequency: ScheduleFrequencyVO.create('daily'),
      time: ScheduleTimeVO.create({ scheduledAt: FUTURE, timezone: 'UTC' }),
      templateId: TemplateIdVO.create(IDS.templateId),
      recipientIds: [],
      runCount: 0,
    });
    const s = ScheduleEntity.reconstitute({
      id: IDS.scheduleId, createdAt: NOW, updatedAt: NOW,
      props: { vo },
    });
    expect(spec.explain({ schedule: s })).toContain('recipient');
  });
});

describe('CanUnsubscribeSpecification — extra branches', () => {
  const spec = CanUnsubscribeSpecification.strict();
  const opt = (ch: string, en = true) => PreferenceOptionVO.create({ channel: ch as any, enabled: en });
  const make = (o: any = {}) =>
    PreferenceEntity.reconstitute({
      id: IDS.preferenceId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: PreferenceVO.create({
          id: PreferenceIdVO.create(IDS.preferenceId),
          userId: UserIdVO.create(IDS.userId),
          type: PreferenceTypeVO.create('channel_specific'),
          options: [opt('email', true)],
          quietHoursEnabled: false,
          timezone: 'UTC', locale: 'en', locked: false,
          ...o,
        }),
      },
    });

  it('explain for locked', () => {
    const p = make({ locked: true });
    expect(spec.explain({ preference: p, ctx: { channel: 'email' } })).toContain('locked');
  });

  it('explain for protected category', () => {
    expect(spec.explain({ preference: make(), ctx: { channel: 'email', category: 'auth' } })).toContain('protected');
  });

  it('explain for already unsubscribed', () => {
    const p = make({ options: [opt('email', false)] });
    expect(spec.explain({ preference: p, ctx: { channel: 'email' } })).toContain('already');
  });
});

describe('CanRetrySpecification — extra branches', () => {
  const spec = CanRetrySpecification.strict();
  const make = (o: any = {}) =>
    NotificationEntity.reconstitute({
      id: IDS.notificationId, createdAt: NOW, updatedAt: NOW,
      props: {
        vo: NotificationVO.create({
          id: NotificationIdVO.create(IDS.notificationId),
          userId: UserIdVO.create(IDS.userId),
          type: NotificationTypeVO.transactional(),
          category: NotificationCategoryVO.create('order'),
          channel: NotificationChannelVO.email(),
          priority: NotificationPriorityVO.normal(),
          status: NotificationStatusVO.failed(),
          subject: NotificationSubjectVO.create('S'),
          body: NotificationBodyVO.create('B'),
          data: NotificationDataVO.create({}),
          ...o.vo,
        }),
        content: NotificationContentVO.create({
          subject: NotificationSubjectVO.create('S'),
          body: NotificationBodyVO.create('B'),
          data: NotificationDataVO.create({}),
        }),
        recipients: [
          NotificationRecipientVO.create({
            userId: UserIdVO.create(IDS.userId),
            channel: NotificationChannelVO.email(),
            email: EmailAddressVO.create('u@example.com'),
          }),
        ],
        actions: [], attempts: [],
        ...o.props,
      },
    });

  it('explain for not-failed', () => {
    const n = make({ vo: { status: NotificationStatusVO.draft() } });
    expect(spec.explain({ notification: n })).toContain('not failed');
  });

  it('error.retryable=false → not satisfied', () => {
    const err = DeliveryErrorVO.create({ reason: 'timeout', message: 'x', retryable: false });
    expect(spec.isSatisfiedBy({ notification: make(), ctx: { error: err } })).toBe(false);
  });

  it('maxAttempts reached → not satisfied', () => {
    expect(spec.isSatisfiedBy({ notification: make(), ctx: { maxAttempts: 0 } })).toBe(false);
  });

  it('retryable error → satisfied', () => {
    const err = DeliveryErrorVO.create({ reason: 'timeout', message: 'x', retryable: true });
    expect(spec.isSatisfiedBy({ notification: make(), ctx: { error: err } })).toBe(true);
  });
});

describe('CanRegisterDeviceSpecification — extra branches', () => {
  const spec = CanRegisterDeviceSpecification.strict();
  const make = (o: any = {}) =>
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

  it('explain for max devices', () => {
    expect(
      spec.explain({ candidate: make(), ctx: { existingDeviceCount: 10, existingTokens: [] } }),
    ).toContain('device');
  });

  it('explain for duplicate token', () => {
    expect(
      spec.explain({
        candidate: make(),
        ctx: {
          existingDeviceCount: 5,
          existingTokens: [DeviceTokenVO.create(IDS.deviceToken)],
        },
      }),
    ).toContain('token');
  });

  it('no existingTokens → still satisfied', () => {
    expect(
      spec.isSatisfiedBy({ candidate: make(), ctx: { existingDeviceCount: 0 } }),
    ).toBe(true);
  });
});

describe('CanSendWebhookSpecification — extra branches', () => {
  const spec = CanSendWebhookSpecification.strict();
  const make = (o: any = {}) => {
    const vo = WebhookVO.create({
      id: WebhookIdVO.create(IDS.webhookId),
      name: 'Hook',
      type: WebhookTypeVO.create('outgoing'),
      status: WebhookStatusVO.active(),
      url: WebhookUrlVO.create('https://x.com/h'),
      events: ['order.created'] as const,
      ...o.vo,
    });
    return WebhookEntity.reconstitute({
      id: IDS.webhookId, createdAt: NOW, updatedAt: NOW,
      props: { vo, ...o.props },
    });
  };

  it('explain for not-active', () => {
    const w = make({ vo: { status: WebhookStatusVO.paused() }, props: { pausedAt: NOW } });
    expect(spec.explain({ webhook: w, ctx: { event: 'order.created' } })).toContain('status');
  });

  it('explain for not subscribed', () => {
    expect(spec.explain({ webhook: make(), ctx: { event: 'payment.failed' } })).toContain('subscribe');
  });

  it('explain for payload too large', () => {
    expect(
      spec.explain({
        webhook: make(),
        ctx: { event: 'order.created', payloadSizeBytes: 300_000 },
      }),
    ).toContain('payload');
  });

  it('explain for too many failures', () => {
    expect(
      spec.explain({
        webhook: make(),
        ctx: { event: 'order.created', failedAttempts24h: 10 },
      }),
    ).toContain('failed');
  });

  it('no payloadSize/failedAttempts → satisfied', () => {
    expect(spec.isSatisfiedBy({ webhook: make(), ctx: { event: 'order.created' } })).toBe(true);
  });
});
