/**
 * Full composite VO coverage — remaining branches
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationVO } from '../../../../../src/module/domain/value-objects/composites/notification.vo.js';
import { NotificationContentVO } from '../../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { NotificationDeliveryVO } from '../../../../../src/module/domain/value-objects/composites/notification-delivery.vo.js';
import { NotificationReadVO } from '../../../../../src/module/domain/value-objects/composites/notification-read.vo.js';
import { NotificationReferenceVO } from '../../../../../src/module/domain/value-objects/composites/notification-reference.vo.js';
import { ScheduleVO } from '../../../../../src/module/domain/value-objects/composites/schedule.vo.js';
import { BroadcastVO } from '../../../../../src/module/domain/value-objects/composites/broadcast.vo.js';
import { DigestVO } from '../../../../../src/module/domain/value-objects/composites/digest.vo.js';
import { DeviceVO } from '../../../../../src/module/domain/value-objects/composites/device.vo.js';
import { PreferenceVO } from '../../../../../src/module/domain/value-objects/composites/preference.vo.js';
import { NotificationIdVO } from '../../../../../src/module/domain/value-objects/primitives/notification-id.vo.js';
import { NotificationTypeVO } from '../../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationStatusVO } from '../../../../../src/module/domain/value-objects/primitives/notification-status.vo.js';
import { NotificationPriorityVO } from '../../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { DeliveryStatusVO } from '../../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { ReadStatusVO } from '../../../../../src/module/domain/value-objects/primitives/read-status.vo.js';
import { UserIdVO } from '../../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { ScheduleIdVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-id.vo.js';
import { ScheduleTypeVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-type.vo.js';
import { ScheduleStatusVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-status.vo.js';
import { ScheduleRecurrenceVO } from '../../../../../src/module/domain/value-objects/primitives/schedule-recurrence.vo.js';
import { BroadcastIdVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-id.vo.js';
import { BroadcastTypeVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-type.vo.js';
import { BroadcastStatusVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-status.vo.js';
import { BroadcastTargetVO } from '../../../../../src/module/domain/value-objects/primitives/broadcast-target.vo.js';
import { DigestIdVO } from '../../../../../src/module/domain/value-objects/primitives/digest-id.vo.js';
import { DigestFrequencyVO } from '../../../../../src/module/domain/value-objects/primitives/digest-frequency.vo.js';
import { DigestTypeVO } from '../../../../../src/module/domain/value-objects/primitives/digest-type.vo.js';
import { DigestStatusVO } from '../../../../../src/module/domain/value-objects/primitives/digest-status.vo.js';
import { DeviceIdVO } from '../../../../../src/module/domain/value-objects/primitives/device-id.vo.js';
import { DeviceTypeVO } from '../../../../../src/module/domain/value-objects/primitives/device-type.vo.js';
import { DeviceStatusVO } from '../../../../../src/module/domain/value-objects/primitives/device-status.vo.js';
import { DeviceTokenVO } from '../../../../../src/module/domain/value-objects/primitives/device-token.vo.js';
import { PreferenceIdVO } from '../../../../../src/module/domain/value-objects/primitives/preference-id.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID, FIXED_TEMPLATE_ID, makeUuid } from '../../../../helpers/test-factories.js';

describe('NotificationVO deep', () => {
  function build(channel = NotificationChannelVO.email()) {
    return NotificationVO.reconstitute({
      id: NotificationIdVO.create(FIXED_NOTIFICATION_ID),
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel,
      status: NotificationStatusVO.pending(),
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'),
        body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID),
        channel,
      }),
      imageUrl: 'https://x.com/i.png',
      iconUrl: 'https://x.com/ic.png',
      expiresAt: new Date(Date.now() - 1000).toISOString(),
      createdAt: new Date(Date.now() - 86_400_000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  it('getters for imageUrl + iconUrl + expiresAt', () => {
    const vo = build();
    expect(vo.imageUrl).toBe('https://x.com/i.png');
    expect(vo.iconUrl).toBe('https://x.com/ic.png');
    expect(vo.expiresAt).toBeDefined();
  });

  it('isExpired true with past expiresAt', () => {
    expect(build().isExpired()).toBe(true);
  });

  it('hasActions false when no actions', () => {
    expect(build().hasActions()).toBe(false);
  });

  it('isDelivered false without delivery', () => {
    expect(build().isDelivered()).toBe(false);
  });

  it('isDelivered true with delivery status', () => {
    const vo = NotificationVO.reconstitute({
      ...build() as never,
      delivery: NotificationDeliveryVO.reconstitute({
        status: DeliveryStatusVO.delivered(),
        attemptCount: 1,
        deliveredAt: new Date().toISOString(),
      }),
    } as never);
    expect(vo.isDelivered()).toBe(true);
  });

  it('content + recipient + status getters', () => {
    const vo = build();
    expect(vo.content.title.value).toBe('T');
    expect(vo.recipient.userId.value).toBe(FIXED_USER_ID);
    expect(vo.status.isPending()).toBe(true);
  });
});

describe('ScheduleVO deep', () => {
  it('recurring with next occurrence', () => {
    const vo = ScheduleVO.reconstitute({
      id: ScheduleIdVO.create(makeUuid()),
      type: ScheduleTypeVO.recurring(),
      status: ScheduleStatusVO.active(),
      recurrence: ScheduleRecurrenceVO.daily(),
      scheduledAt: new Date().toISOString(),
      timezone: 'Asia/Dhaka',
      nextOccurrenceAt: new Date(Date.now() + 3600_000).toISOString(),
      occurrenceCount: 5,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.isRecurring()).toBe(true);
    expect(vo.isActive()).toBe(true);
    expect(vo.nextOccurrenceAt).toBeDefined();
    expect(vo.occurrenceCount).toBe(5);
  });

  it('optional fields undefined', () => {
    const vo = ScheduleVO.reconstitute({
      id: ScheduleIdVO.create(makeUuid()),
      type: ScheduleTypeVO.scheduled(),
      status: ScheduleStatusVO.pending(),
      recurrence: ScheduleRecurrenceVO.none(),
      scheduledAt: new Date().toISOString(),
      timezone: 'UTC',
      occurrenceCount: 0,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.nextOccurrenceAt).toBeUndefined();
    expect(vo.maxOccurrences).toBeUndefined();
    expect(vo.notificationTemplateId).toBeUndefined();
    expect(vo.userId).toBeUndefined();
  });
});

describe('BroadcastVO deep', () => {
  it('all getters populated', () => {
    const vo = BroadcastVO.reconstitute({
      id: BroadcastIdVO.create(makeUuid()),
      type: BroadcastTypeVO.allUsers(),
      status: BroadcastStatusVO.sending(),
      target: BroadcastTargetVO.all(),
      templateId: FIXED_TEMPLATE_ID,
      estimatedRecipients: 10_000,
      totalRecipients: 10_000,
      succeeded: 5_000,
      failed: 100,
      scheduledAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      completedAt: undefined,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.estimatedRecipients).toBe(10_000);
    expect(vo.totalRecipients).toBe(10_000);
    expect(vo.scheduledAt).toBeDefined();
    expect(vo.startedAt).toBeDefined();
    // approvedBy not exposed by VO
  });
});

describe('DigestVO deep', () => {
  it('ready status with items', () => {
    const vo = DigestVO.reconstitute({
      id: DigestIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      frequency: DigestFrequencyVO.daily(),
      type: DigestTypeVO.summary(),
      status: DigestStatusVO.ready(),
      periodStart: new Date(Date.now() - 86_400_000).toISOString(),
      periodEnd: new Date().toISOString(),
      itemCount: 5,
      generatedAt: new Date().toISOString(),
      channel: 'email',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.hasItems()).toBe(true);
    expect(vo.itemCount).toBe(5);
    expect(vo.generatedAt).toBeDefined();
    expect(vo.channel).toBe('email');
  });
});

describe('DeviceVO deep', () => {
  it('all fields populated', () => {
    const vo = DeviceVO.reconstitute({
      id: DeviceIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      type: DeviceTypeVO.android(),
      status: DeviceStatusVO.active(),
      token: DeviceTokenVO.create('abcdefghijklmnop1234'),
      platform: 'android',
      appVersion: '1.0',
      osVersion: '14',
      lastActiveAt: new Date().toISOString(),
      registeredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.type.value).toBe('android');
    expect(vo.status.value).toBe('active');
    expect(vo.platform).toBe('android');
    expect(vo.osVersion).toBe('14');
    expect(vo.lastActiveAt).toBeDefined();
    expect(vo.registeredAt).toBeDefined();
  });
});

describe('PreferenceVO deep', () => {
  it('quiet hours disabled + enabled variants', () => {
    const vo = PreferenceVO.reconstitute({
      id: PreferenceIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      channelPreferences: { email: true, sms: false, push: true, in_app: true },
      categoryPreferences: { order: true, marketing: false },
      quietHoursEnabled: true,
      quietHoursStart: 22,
      quietHoursEnd: 8,
      timezone: 'Asia/Dhaka',
      locale: 'bn',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.isChannelEnabled('email')).toBe(true);
    expect(vo.isChannelEnabled('sms')).toBe(false);
    expect(vo.isCategoryEnabled('order')).toBe(true);
    expect(vo.isCategoryEnabled('marketing')).toBe(false);
    expect(vo.quietHoursEnabled).toBe(true);
    expect(vo.timezone).toBe('Asia/Dhaka');
    expect(vo.locale).toBe('bn');
  });

  it('quiet hours disabled', () => {
    const vo = PreferenceVO.reconstitute({
      id: PreferenceIdVO.create(makeUuid()),
      userId: FIXED_USER_ID,
      channelPreferences: {},
      categoryPreferences: {},
      quietHoursEnabled: false,
      timezone: 'UTC',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    expect(vo.isInQuietHours(23)).toBe(false);
    expect(vo.quietHoursStart).toBeUndefined();
    expect(vo.quietHoursEnd).toBeUndefined();
  });
});

describe('NotificationDeliveryVO deep', () => {
  it('all optional fields', () => {
    const vo = NotificationDeliveryVO.reconstitute({
      status: DeliveryStatusVO.sent(),
      attemptCount: 1,
      provider: 'smtp',
      providerMessageId: 'msg-1',
      lastAttemptAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
    });
    expect(vo.provider).toBe('smtp');
    expect(vo.providerMessageId).toBe('msg-1');
    expect(vo.lastAttemptAt).toBeDefined();
    expect(vo.sentAt).toBeDefined();
  });
});

describe('NotificationReadVO deep', () => {
  it('all optional fields', () => {
    const vo = NotificationReadVO.reconstitute({
      status: ReadStatusVO.starred(),
      readAt: new Date().toISOString(),
      archivedAt: new Date().toISOString(),
      snoozedUntil: new Date(Date.now() + 3600_000).toISOString(),
    });
    expect(vo.readAt).toBeDefined();
    expect(vo.archivedAt).toBeDefined();
    expect(vo.snoozedUntil).toBeDefined();
  });
});

describe('NotificationReferenceVO deep', () => {
  it('with url', () => {
    const vo = NotificationReferenceVO.reconstitute({
      type: 'order', id: '123', url: 'https://x.com/orders/123',
    });
    expect(vo.url).toBe('https://x.com/orders/123');
  });
});
