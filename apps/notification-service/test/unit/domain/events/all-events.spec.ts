import {
  NOTIFICATION_EVENT_TYPE,
  NotificationCreatedEvent,
  NotificationSentEvent,
  NotificationDeliveredEvent,
  NotificationCancelledEvent,
  NotificationStatusChangedEvent,
  NotificationExpiredEvent,
} from '@domain/events/notification.events.js';
import {
  NOTIFICATION_FAILED_EVENT_TYPE,
  NotificationFailedEvent,
  NotificationRetryExhaustedEvent,
} from '@domain/events/notification-failed.events.js';
import {
  READ_EVENT_TYPE,
  NotificationMarkedReadEvent,
} from '@domain/events/read.events.js';
import {
  ACTION_EVENT_TYPE,
  NotificationClickedEvent,
} from '@domain/events/action.events.js';
import {
  TEMPLATE_EVENT_TYPE,
  TemplateCreatedEvent,
} from '@domain/events/template.events.js';
import {
  SCHEDULE_EVENT_TYPE,
  ScheduleCreatedEvent,
} from '@domain/events/schedule.events.js';
import {
  BROADCAST_EVENT_TYPE,
  BroadcastCreatedEvent,
} from '@domain/events/broadcast.events.js';
import {
  DIGEST_EVENT_TYPE,
  DigestCreatedEvent,
} from '@domain/events/digest.events.js';
import {
  PREFERENCE_EVENT_TYPE,
  PreferenceCreatedEvent,
} from '@domain/events/preference.events.js';
import {
  DEVICE_EVENT_TYPE,
  DeviceRegisteredEvent,
} from '@domain/events/device.events.js';
import {
  WEBHOOK_EVENT_TYPE,
  WebhookRegisteredEvent,
} from '@domain/events/webhook.events.js';
import { newEventId, nowTimestamp, nowIso, NOTIFICATION_AGGREGATE_TYPE } from '@domain/events/event.helpers.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const NOW = nowTimestamp();

describe('Event helpers', () => {
  it('newEventId unique', () => {
    const id1 = newEventId();
    const id2 = newEventId();
    expect(id1).not.toBe(id2);
    expect(id1).toMatch(/^evt_/);
  });

  it('nowTimestamp returns ISO', () => {
    const ts = nowTimestamp();
    expect(new Date(ts).getTime()).toBeGreaterThan(0);
  });

  it('nowIso returns ISO string', () => {
    expect(nowIso()).toMatch(/^\d{4}-\d{2}-\d{2}/);
  });

  it('aggregate type constants', () => {
    expect(NOTIFICATION_AGGREGATE_TYPE.NOTIFICATION).toBe('Notification');
  });
});

describe('Event type constants', () => {
  it.each([
    ['NOTIFICATION', NOTIFICATION_EVENT_TYPE.CREATED],
    ['NOTIF_FAILED', NOTIFICATION_FAILED_EVENT_TYPE.FAILED],
    ['READ', READ_EVENT_TYPE.MARKED_READ],
    ['ACTION', ACTION_EVENT_TYPE.CLICKED],
    ['TEMPLATE', TEMPLATE_EVENT_TYPE.CREATED],
    ['SCHEDULE', SCHEDULE_EVENT_TYPE.CREATED],
    ['BROADCAST', BROADCAST_EVENT_TYPE.CREATED],
    ['DIGEST', DIGEST_EVENT_TYPE.CREATED],
    ['PREFERENCE', PREFERENCE_EVENT_TYPE.CREATED],
    ['DEVICE', DEVICE_EVENT_TYPE.REGISTERED],
    ['WEBHOOK', WEBHOOK_EVENT_TYPE.REGISTERED],
  ])('%s type defined', (_name, type) => {
    expect(typeof type).toBe('string');
  });
});

describe('Event classes', () => {
  it('NotificationCreatedEvent', () => {
    const e = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      payload: {
        notificationId: IDS.notificationId,
        userId: IDS.userId,
        type: 'transactional',
        category: 'order',
        channel: 'email',
        priority: 'normal',
        createdAt: nowIso(),
      },
    });
    expect(e.type).toBe(NOTIFICATION_EVENT_TYPE.CREATED);
    expect(e.aggregateId).toBe(IDS.notificationId);
    expect(e.id).toMatch(/^evt_/);
  });

  it('NotificationSentEvent', () => {
    const e = new NotificationSentEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, channel: 'email', sentAt: nowIso() },
    });
    expect(e.type).toBe(NOTIFICATION_EVENT_TYPE.SENT);
  });

  it('NotificationDeliveredEvent', () => {
    const e = new NotificationDeliveredEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, deliveredAt: nowIso() },
    });
    expect(e.type).toBe(NOTIFICATION_EVENT_TYPE.DELIVERED);
  });

  it('NotificationCancelledEvent', () => {
    const e = new NotificationCancelledEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, cancelledAt: nowIso() },
    });
    expect(e.type).toBe(NOTIFICATION_EVENT_TYPE.CANCELLED);
  });

  it('NotificationStatusChangedEvent', () => {
    const e = new NotificationStatusChangedEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, fromStatus: 'draft', toStatus: 'pending' },
    });
    expect(e.type).toBe(NOTIFICATION_EVENT_TYPE.STATUS_CHANGED);
  });

  it('NotificationExpiredEvent', () => {
    const e = new NotificationExpiredEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, expiredAt: nowIso() },
    });
    expect(e.type).toBe(NOTIFICATION_EVENT_TYPE.EXPIRED);
  });

  it('NotificationFailedEvent', () => {
    const e = new NotificationFailedEvent({
      aggregateId: IDS.notificationId,
      payload: {
        notificationId: IDS.notificationId,
        reason: 'error',
        errorMessage: 'failed',
        failedAt: nowIso(),
        retryable: true,
      },
    });
    expect(e.type).toBe(NOTIFICATION_FAILED_EVENT_TYPE.FAILED);
  });

  it('NotificationRetryExhaustedEvent', () => {
    const e = new NotificationRetryExhaustedEvent({
      aggregateId: IDS.notificationId,
      payload: {
        notificationId: IDS.notificationId,
        attemptsUsed: 3,
        maxAttempts: 3,
        lastErrorMessage: 'x',
        exhaustedAt: nowIso(),
      },
    });
    expect(e.type).toBe(NOTIFICATION_FAILED_EVENT_TYPE.RETRY_EXHAUSTED);
  });

  it('NotificationMarkedReadEvent', () => {
    const e = new NotificationMarkedReadEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, userId: IDS.userId, readAt: nowIso() },
    });
    expect(e.type).toBe(READ_EVENT_TYPE.MARKED_READ);
  });

  it('NotificationClickedEvent', () => {
    const e = new NotificationClickedEvent({
      aggregateId: IDS.notificationId,
      payload: { notificationId: IDS.notificationId, userId: IDS.userId, clickedAt: nowIso() },
    });
    expect(e.type).toBe(ACTION_EVENT_TYPE.CLICKED);
  });

  it('TemplateCreatedEvent', () => {
    const e = new TemplateCreatedEvent({
      aggregateId: IDS.templateId,
      payload: {
        templateId: IDS.templateId,
        name: 'T',
        slug: 't',
        type: 'transactional',
        format: 'html',
        createdAt: nowIso(),
      },
    });
    expect(e.type).toBe(TEMPLATE_EVENT_TYPE.CREATED);
  });

  it('ScheduleCreatedEvent', () => {
    const e = new ScheduleCreatedEvent({
      aggregateId: IDS.scheduleId,
      payload: { scheduleId: IDS.scheduleId, type: 'recurring', frequency: 'daily', createdAt: nowIso() },
    });
    expect(e.type).toBe(SCHEDULE_EVENT_TYPE.CREATED);
  });

  it('BroadcastCreatedEvent', () => {
    const e = new BroadcastCreatedEvent({
      aggregateId: IDS.broadcastId,
      payload: {
        broadcastId: IDS.broadcastId,
        name: 'B',
        type: 'all_users',
        target: 'all',
        channels: ['email'],
        createdBy: IDS.userId,
        createdAt: nowIso(),
      },
    });
    expect(e.type).toBe(BROADCAST_EVENT_TYPE.CREATED);
  });

  it('DigestCreatedEvent', () => {
    const e = new DigestCreatedEvent({
      aggregateId: IDS.digestId,
      payload: {
        digestId: IDS.digestId,
        userId: IDS.userId,
        frequency: 'daily',
        type: 'summary',
        createdAt: nowIso(),
      },
    });
    expect(e.type).toBe(DIGEST_EVENT_TYPE.CREATED);
  });

  it('PreferenceCreatedEvent', () => {
    const e = new PreferenceCreatedEvent({
      aggregateId: IDS.preferenceId,
      payload: {
        userId: IDS.userId,
        timezone: 'UTC',
        locale: 'en',
        createdAt: nowIso(),
      },
    });
    expect(e.type).toBe(PREFERENCE_EVENT_TYPE.CREATED);
  });

  it('DeviceRegisteredEvent', () => {
    const e = new DeviceRegisteredEvent({
      aggregateId: IDS.deviceId,
      payload: {
        deviceId: IDS.deviceId,
        userId: IDS.userId,
        type: 'android',
        platform: 'android',
        registeredAt: nowIso(),
      },
    });
    expect(e.type).toBe(DEVICE_EVENT_TYPE.REGISTERED);
  });

  it('WebhookRegisteredEvent', () => {
    const e = new WebhookRegisteredEvent({
      aggregateId: IDS.webhookId,
      payload: {
        webhookId: IDS.webhookId,
        name: 'H',
        type: 'outgoing',
        url: 'https://x.com',
        events: ['order.created'],
        registeredAt: nowIso(),
      },
    });
    expect(e.type).toBe(WEBHOOK_EVENT_TYPE.REGISTERED);
  });

  it('custom metadata + version + occurredAt', () => {
    const customTs = '2025-01-15T10:00:00.000Z';
    const e = new NotificationCreatedEvent({
      aggregateId: IDS.notificationId,
      occurredAt: customTs as any,
      version: 5,
      metadata: { correlationId: 'corr-1', userId: IDS.userId },
      payload: {
        notificationId: IDS.notificationId,
        userId: IDS.userId,
        type: 'transactional',
        category: 'order',
        channel: 'email',
        priority: 'normal',
        createdAt: customTs,
      },
    });
    expect(e.occurredAt).toBe(customTs);
    expect(e.version).toBe(5);
    expect(e.metadata?.correlationId).toBe('corr-1');
  });
});
