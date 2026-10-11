import { describe, it, expect } from '@jest/globals';
import { ScheduleMapper } from '../../../../src/module/application/mappers/schedule.mapper.js';
import { BroadcastMapper } from '../../../../src/module/application/mappers/broadcast.mapper.js';
import { DigestMapper } from '../../../../src/module/application/mappers/digest.mapper.js';
import { DeviceMapper } from '../../../../src/module/application/mappers/device.mapper.js';
import { PreferenceMapper } from '../../../../src/module/application/mappers/preference.mapper.js';
import { WebhookMapper } from '../../../../src/module/application/mappers/webhook.mapper.js';
import { TemplateMapper } from '../../../../src/module/application/mappers/template.mapper.js';
import { DeliveryMapper } from '../../../../src/module/application/mappers/delivery.mapper.js';
import { NotificationEntity } from '../../../../src/module/domain/entities/notification.entity.js';
import { NotificationTypeVO } from '../../../../src/module/domain/value-objects/primitives/notification-type.vo.js';
import { NotificationCategoryVO } from '../../../../src/module/domain/value-objects/primitives/notification-category.vo.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import { NotificationTitleVO } from '../../../../src/module/domain/value-objects/primitives/notification-title.vo.js';
import { NotificationBodyVO } from '../../../../src/module/domain/value-objects/primitives/notification-body.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { NotificationContentVO } from '../../../../src/module/domain/value-objects/composites/notification-content.vo.js';
import { NotificationRecipientVO } from '../../../../src/module/domain/value-objects/composites/notification-recipient.vo.js';
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID, FIXED_TEMPLATE_ID } from '../../../helpers/test-factories.js';

function buildNotif(): NotificationEntity {
  const ch = NotificationChannelVO.email();
  return NotificationEntity.create({
    id: FIXED_NOTIFICATION_ID,
    now: new Date().toISOString(),
    props: {
      type: NotificationTypeVO.transactional(),
      category: NotificationCategoryVO.order(),
      channel: ch,
      priority: NotificationPriorityVO.normal(),
      content: NotificationContentVO.create({
        title: NotificationTitleVO.create('T'),
        body: NotificationBodyVO.create('B'),
      }),
      recipient: NotificationRecipientVO.reconstitute({
        userId: UserIdVO.reconstitute(FIXED_USER_ID),
        channel: ch,
      }),
    },
  });
}

describe('ScheduleMapper branches', () => {
  it('toResponse with all optional fields', () => {
    const fakeEntity = {
      id: 's-1',
      type: { value: 'scheduled' },
      status: { value: 'pending' },
      recurrence: { value: 'none' },
      scheduledAt: new Date().toISOString(),
      timezone: 'Asia/Dhaka',
      nextOccurrenceAt: new Date(Date.now() + 3600_000).toISOString(),
      occurrenceCount: 5,
      maxOccurrences: 10,
      notificationTemplateId: FIXED_TEMPLATE_ID,
      userId: FIXED_USER_ID,
      createdBy: FIXED_USER_ID,
      lastTriggeredAt: new Date().toISOString(),
      lastFailureReason: 'x',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = ScheduleMapper.toResponse(fakeEntity);
    expect(r.nextOccurrenceAt).toBeDefined();
    expect(r.maxOccurrences).toBe(10);
  });

  it('toResponse with undefined optional fields', () => {
    const fakeEntity = {
      id: 's-1',
      type: { value: 'scheduled' },
      status: { value: 'pending' },
      recurrence: { value: 'none' },
      scheduledAt: new Date().toISOString(),
      timezone: 'UTC',
      occurrenceCount: 0,
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = ScheduleMapper.toResponse(fakeEntity);
    expect(r.nextOccurrenceAt).toBeUndefined();
    expect(r.maxOccurrences).toBeUndefined();
  });

  it('toListResponse + toTriggerResponse', () => {
    const list = ScheduleMapper.toListResponse([], 0, 1, 20);
    expect(list.total).toBe(0);
    const trigger = ScheduleMapper.toTriggerResponse({
      id: 's-1',
      occurrenceCount: 1,
      lastTriggeredAt: new Date().toISOString(),
    } as never, 'n-1');
    expect(trigger.occurrence).toBe(1);
  });
});

describe('BroadcastMapper branches', () => {
  it('toResponse with failureReasons', () => {
    const fake = {
      id: 'b-1',
      type: { value: 'all_users' },
      status: { value: 'partially_sent' },
      target: { value: 'all' },
      templateId: FIXED_TEMPLATE_ID,
      estimatedRecipients: 100,
      totalRecipients: 100,
      processed: 100,
      succeeded: 80,
      failed: 20,
      progressPercent: () => 100,
      scheduledAt: new Date().toISOString(),
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      failureReasons: ['x', 'y'],
      createdBy: FIXED_USER_ID,
      approvedBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = BroadcastMapper.toResponse(fake);
    expect(r.failureReasons?.length).toBe(2);
    expect(r.approvedBy).toBe(FIXED_USER_ID);
  });

  it('toResponse without failureReasons', () => {
    const fake = {
      id: 'b-1',
      type: { value: 'all_users' },
      status: { value: 'draft' },
      target: { value: 'all' },
      templateId: FIXED_TEMPLATE_ID,
      processed: 0, succeeded: 0, failed: 0,
      progressPercent: () => 0,
      failureReasons: [],
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = BroadcastMapper.toResponse(fake);
    expect(r.failureReasons).toBeUndefined();
  });

  it('toStats with processed=0', () => {
    const fake = {
      id: 'b-1', processed: 0, succeeded: 0, failed: 0,
      totalRecipients: 0, progressPercent: () => 0,
    } as never;
    const r = BroadcastMapper.toStats(fake);
    expect(r.deliveryRate).toBe(0);
    expect(r.failureRate).toBe(0);
  });

  it('toProgress', () => {
    const fake = {
      id: 'b-1', processed: 50, succeeded: 45, failed: 5,
      totalRecipients: 100, progressPercent: () => 50,
    } as never;
    const r = BroadcastMapper.toProgress(fake);
    expect(r.processed).toBe(50);
  });
});

describe('DigestMapper branches', () => {
  it('toResponse with all optional fields', () => {
    const fake = {
      id: 'd-1', userId: FIXED_USER_ID,
      frequency: { value: 'daily' }, type: { value: 'summary' },
      status: { value: 'sent' },
      periodStart: new Date().toISOString(),
      periodEnd: new Date().toISOString(),
      itemCount: 5, itemIds: ['a', 'b'],
      generatedAt: new Date().toISOString(),
      sentAt: new Date().toISOString(),
      channel: 'email', failureReason: 'x',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = DigestMapper.toResponse(fake);
    expect(r.generatedAt).toBeDefined();
    expect(r.failureReason).toBe('x');
  });

  it('toPreview', () => {
    const r = DigestMapper.toPreview('u', []);
    expect(r.itemCount).toBe(0);
  });
});

describe('DeviceMapper branches', () => {
  it('toResponse with all optional fields', () => {
    const fake = {
      id: 'd-1', userId: FIXED_USER_ID,
      type: { value: 'android' }, status: { value: 'active' },
      token: { masked: () => 'tk-***' },
      platform: 'android', appVersion: '1.0', osVersion: '14',
      lastActiveAt: new Date().toISOString(),
      registeredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = DeviceMapper.toResponse(fake);
    expect(r.platform).toBe('android');
    expect(r.lastActiveAt).toBeDefined();
  });

  it('toResponse without optional fields', () => {
    const fake = {
      id: 'd-1', userId: FIXED_USER_ID,
      type: { value: 'web' }, status: { value: 'active' },
      token: { masked: () => 'tk-***' },
      registeredAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = DeviceMapper.toResponse(fake);
    expect(r.platform).toBeUndefined();
  });
});

describe('PreferenceMapper branches', () => {
  it('toResponse + toPublic', () => {
    const fake = {
      id: 'p-1', userId: FIXED_USER_ID,
      channelPreferences: { email: true },
      categoryPreferences: { order: true },
      quietHoursEnabled: true,
      quietHoursStart: 22, quietHoursEnd: 8,
      timezone: 'Asia/Dhaka', locale: 'en',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = PreferenceMapper.toResponse(fake);
    expect(r.quietHoursStart).toBe(22);
    const p = PreferenceMapper.toPublic(fake);
    expect(p.quietHours.enabled).toBe(true);
  });

  it('toResponse without optional fields', () => {
    const fake = {
      id: 'p-1', userId: FIXED_USER_ID,
      channelPreferences: {}, categoryPreferences: {},
      quietHoursEnabled: false, timezone: 'UTC',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = PreferenceMapper.toResponse(fake);
    expect(r.locale).toBeUndefined();
  });
});

describe('WebhookMapper branches', () => {
  it('toResponse with secret', () => {
    const fake = {
      id: 'w-1',
      url: { value: 'https://x.com/h' },
      method: { value: 'POST' },
      status: { value: 'active' },
      events: [{ value: 'order.created' }],
      hasSecret: () => true,
      description: 'desc',
      failureCount: 0,
      lastSuccessAt: new Date().toISOString(),
      lastFailureAt: new Date().toISOString(),
      createdBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = WebhookMapper.toResponse(fake);
    expect(r.hasSecret).toBe(true);
  });
});

describe('TemplateMapper branches', () => {
  it('toResponse with all fields', () => {
    const fake = {
      id: FIXED_TEMPLATE_ID,
      name: { value: 'T' }, slug: 't',
      type: { value: 'email' }, status: { value: 'active' },
      category: { value: 'order' }, locale: { value: 'en' },
      subject: 'S', body: 'B', bodyHtml: '<p>B</p>',
      variables: [{ name: { value: 'x' }, type: 'string', required: true, defaultValue: 'y', description: 'z' }],
      version: 1, parentId: 'p',
      createdBy: FIXED_USER_ID, updatedBy: FIXED_USER_ID,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as never;
    const r = TemplateMapper.toResponse(fake);
    expect(r.bodyHtml).toBeDefined();
    expect(r.variables.length).toBe(1);
  });

  it('toPublicResponse + toRenderResponse', () => {
    const fake = {
      id: FIXED_TEMPLATE_ID, name: { value: 'T' }, slug: 't',
      type: { value: 'email' }, category: { value: 'order' },
      locale: { value: 'en' },
    } as never;
    expect(TemplateMapper.toPublicResponse(fake).slug).toBe('t');

    const render = TemplateMapper.toRenderResponse({
      subject: 's', body: 'b', bodyHtml: 'h',
      missingVariables: [], resolvedVariables: [],
    });
    expect(render.subject).toBe('s');
  });
});

describe('DeliveryMapper branches', () => {
  it('toResponse from notification entity', () => {
    const r = DeliveryMapper.toResponse(buildNotif());
    expect(r.notificationId).toBe(FIXED_NOTIFICATION_ID);
    expect(r.attempts).toEqual([]);
  });

  it('toRetryResponse', () => {
    const r = DeliveryMapper.toRetryResponse({
      notificationId: 'n-1', scheduled: true, attempt: 2,
      nextAttemptAt: new Date().toISOString(), delayMs: 60_000,
    });
    expect(r.scheduled).toBe(true);
  });
});
