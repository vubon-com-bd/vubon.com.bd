import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationQueue } from '../../../../src/module/infrastructure/queues/notification.queue.js';
import { EmailQueue } from '../../../../src/module/infrastructure/queues/email.queue.js';
import { SmsQueue } from '../../../../src/module/infrastructure/queues/sms.queue.js';
import { PushQueue } from '../../../../src/module/infrastructure/queues/push.queue.js';
import { InAppQueue } from '../../../../src/module/infrastructure/queues/in-app.queue.js';
import { TemplateQueue } from '../../../../src/module/infrastructure/queues/template.queue.js';
import { ScheduleQueue } from '../../../../src/module/infrastructure/queues/schedule.queue.js';
import { BroadcastQueue } from '../../../../src/module/infrastructure/queues/broadcast.queue.js';
import { DigestQueue } from '../../../../src/module/infrastructure/queues/digest.queue.js';
import { WebhookQueue } from '../../../../src/module/infrastructure/queues/webhook.queue.js';
import { DeliveryQueue } from '../../../../src/module/infrastructure/queues/delivery.queue.js';
import { CleanupQueue } from '../../../../src/module/infrastructure/queues/cleanup.queue.js';

function makeQS() {
  return { enqueue: jest.fn().mockResolvedValue('job-1') } as never;
}

describe('NotificationQueue', () => {
  it('enqueueDispatch critical', async () => {
    const qs = makeQS();
    const q = new NotificationQueue(qs);
    await q.enqueueDispatch({ notificationId: 'n-1', channel: 'email', userId: 'u', priority: 'critical' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueDispatch high', async () => {
    const qs = makeQS();
    await new NotificationQueue(qs).enqueueDispatch({ notificationId: 'n-1', channel: 'email', userId: 'u', priority: 'high' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueDispatch default', async () => {
    const qs = makeQS();
    await new NotificationQueue(qs).enqueueDispatch({ notificationId: 'n-1', channel: 'email', userId: 'u' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueProcessQueued', async () => {
    const qs = makeQS();
    await new NotificationQueue(qs).enqueueProcessQueued({ notificationId: 'n-1' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueProcessScheduled', async () => {
    const qs = makeQS();
    await new NotificationQueue(qs).enqueueProcessScheduled(
      { notificationId: 'n-1' },
      new Date(Date.now() + 3600_000),
    );
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueRetry', async () => {
    const qs = makeQS();
    await new NotificationQueue(qs).enqueueRetry({ notificationId: 'n-1', attempt: 1 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueExpire', async () => {
    const qs = makeQS();
    await new NotificationQueue(qs).enqueueExpire({ notificationId: 'n-1' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('EmailQueue', () => {
  it('enqueueSend', async () => {
    const qs = makeQS();
    await new EmailQueue(qs).enqueueSend({
      notificationId: 'n-1', to: ['x@y.com'], subject: 'S',
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueSendBulk', async () => {
    const qs = makeQS();
    await new EmailQueue(qs).enqueueSendBulk({ notificationIds: ['n-1'], batchId: 'b-1' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueRetry', async () => {
    const qs = makeQS();
    await new EmailQueue(qs).enqueueRetry({ notificationId: 'n-1', attempt: 1 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueTrackEvent', async () => {
    const qs = makeQS();
    await new EmailQueue(qs).enqueueTrackEvent({
      notificationId: 'n-1', eventType: 'delivered', occurredAt: new Date().toISOString(),
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('SmsQueue', () => {
  it('enqueueSend', async () => {
    const qs = makeQS();
    await new SmsQueue(qs).enqueueSend({ notificationId: 'n-1', to: '+88017', message: 'M' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueBulk', async () => {
    const qs = makeQS();
    await new SmsQueue(qs).enqueueBulk({ batchId: 'b-1', recipients: ['+88017'], message: 'M' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueRetry', async () => {
    const qs = makeQS();
    await new SmsQueue(qs).enqueueRetry({ notificationId: 'n-1', attempt: 1 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('PushQueue', () => {
  it('enqueueSend high', async () => {
    const qs = makeQS();
    await new PushQueue(qs).enqueueSend({
      notificationId: 'n-1', tokens: ['tk'], title: 'T', body: 'B', priority: 'high',
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueSend normal', async () => {
    const qs = makeQS();
    await new PushQueue(qs).enqueueSend({
      notificationId: 'n-1', tokens: ['tk'], title: 'T', body: 'B',
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueSendToTopic', async () => {
    const qs = makeQS();
    await new PushQueue(qs).enqueueSendToTopic({
      notificationId: 'n-1', topic: 'x', title: 'T', body: 'B',
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueRetry', async () => {
    const qs = makeQS();
    await new PushQueue(qs).enqueueRetry({ notificationId: 'n-1', attempt: 1 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueTokenCleanup', async () => {
    const qs = makeQS();
    await new PushQueue(qs).enqueueTokenCleanup({ tokens: ['tk'], reason: 'invalid' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('InAppQueue', () => {
  it('enqueueSend', async () => {
    const qs = makeQS();
    await new InAppQueue(qs).enqueueSend({
      notificationId: 'n-1', userId: 'u', title: 'T', body: 'B', type: 'toast',
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueBroadcast', async () => {
    const qs = makeQS();
    await new InAppQueue(qs).enqueueBroadcast({
      batchId: 'b-1', userIds: ['u'], title: 'T', body: 'B',
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueRealtime', async () => {
    const qs = makeQS();
    await new InAppQueue(qs).enqueueRealtime({ notificationId: 'n-1', userId: 'u' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('TemplateQueue', () => {
  it('enqueueRender', async () => {
    const qs = makeQS();
    await new TemplateQueue(qs).enqueueRender({ templateId: 't-1', data: {} });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueCacheWarm', async () => {
    const qs = makeQS();
    await new TemplateQueue(qs).enqueueCacheWarm({ templateIds: ['t-1'] });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('ScheduleQueue', () => {
  it('enqueueTrigger with scheduledAt', async () => {
    const qs = makeQS();
    await new ScheduleQueue(qs).enqueueTrigger(
      { scheduleId: 's-1', occurrence: 1, triggeredAt: new Date().toISOString() },
      new Date(Date.now() + 3600_000),
    );
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueTrigger without scheduledAt', async () => {
    const qs = makeQS();
    await new ScheduleQueue(qs).enqueueTrigger(
      { scheduleId: 's-1', occurrence: 1, triggeredAt: new Date().toISOString() },
    );
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueAdvanceRecurring', async () => {
    const qs = makeQS();
    await new ScheduleQueue(qs).enqueueAdvanceRecurring({
      scheduleId: 's-1', nextOccurrenceAt: new Date(Date.now() + 3600_000).toISOString(),
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueScanDue', async () => {
    const qs = makeQS();
    await new ScheduleQueue(qs).enqueueScanDue();
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('BroadcastQueue', () => {
  it('enqueueStart with scheduledAt', async () => {
    const qs = makeQS();
    await new BroadcastQueue(qs).enqueueStart(
      { broadcastId: 'b-1', totalRecipients: 100 },
      new Date(Date.now() + 3600_000),
    );
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueStart without scheduledAt', async () => {
    const qs = makeQS();
    await new BroadcastQueue(qs).enqueueStart({ broadcastId: 'b-1', totalRecipients: 100 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueBatch', async () => {
    const qs = makeQS();
    await new BroadcastQueue(qs).enqueueBatch({ broadcastId: 'b-1', batchNumber: 1, recipientIds: ['u'] });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueFinalize', async () => {
    const qs = makeQS();
    await new BroadcastQueue(qs).enqueueFinalize({ broadcastId: 'b-1' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueCancel', async () => {
    const qs = makeQS();
    await new BroadcastQueue(qs).enqueueCancel({ broadcastId: 'b-1', reason: 'no' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('DigestQueue', () => {
  it('enqueueGenerate with scheduledAt', async () => {
    const qs = makeQS();
    await new DigestQueue(qs).enqueueGenerate(
      { userId: 'u', frequency: 'daily' },
      new Date(Date.now() + 3600_000),
    );
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueGenerate without', async () => {
    const qs = makeQS();
    await new DigestQueue(qs).enqueueGenerate({ userId: 'u', frequency: 'daily' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueSend', async () => {
    const qs = makeQS();
    await new DigestQueue(qs).enqueueSend({ digestId: 'd-1', userId: 'u', channel: 'email' });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueScanReady', async () => {
    const qs = makeQS();
    await new DigestQueue(qs).enqueueScanReady();
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('WebhookQueue', () => {
  it('enqueueDeliver with deliveryId', async () => {
    const qs = makeQS();
    await new WebhookQueue(qs).enqueueDeliver({
      webhookId: 'w-1', event: 'order.created', payload: {}, deliveryId: 'd-1',
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueDeliver without deliveryId', async () => {
    const qs = makeQS();
    await new WebhookQueue(qs).enqueueDeliver({
      webhookId: 'w-1', event: 'order.created', payload: {},
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueRetry', async () => {
    const qs = makeQS();
    await new WebhookQueue(qs).enqueueRetry({ webhookId: 'w-1', deliveryId: 'd-1', attempt: 1 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueDisableFailing', async () => {
    const qs = makeQS();
    await new WebhookQueue(qs).enqueueDisableFailing({ webhookId: 'w-1', failureCount: 20 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueCleanupStale', async () => {
    const qs = makeQS();
    await new WebhookQueue(qs).enqueueCleanupStale();
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('DeliveryQueue', () => {
  it('enqueueRecordAttempt', async () => {
    const qs = makeQS();
    await new DeliveryQueue(qs).enqueueRecordAttempt({
      notificationId: 'n-1', channel: 'email', provider: 'smtp',
      attempt: 1, success: true,
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueScheduleRetry', async () => {
    const qs = makeQS();
    await new DeliveryQueue(qs).enqueueScheduleRetry({
      notificationId: 'n-1', attempt: 2, delayMs: 60_000,
    });
    expect(qs.enqueue).toHaveBeenCalled();
  });
});

describe('CleanupQueue', () => {
  it('enqueueStaleCleanup', async () => {
    const qs = makeQS();
    await new CleanupQueue(qs).enqueueStaleCleanup({ olderThanMinutes: 60 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueExpiredCleanup', async () => {
    const qs = makeQS();
    await new CleanupQueue(qs).enqueueExpiredCleanup({ batchSize: 500 });
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueExpiredCleanup default', async () => {
    const qs = makeQS();
    await new CleanupQueue(qs).enqueueExpiredCleanup();
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueOldAttemptsCleanup', async () => {
    const qs = makeQS();
    await new CleanupQueue(qs).enqueueOldAttemptsCleanup();
    expect(qs.enqueue).toHaveBeenCalled();
  });
  it('enqueueRateLimitCleanup', async () => {
    const qs = makeQS();
    await new CleanupQueue(qs).enqueueRateLimitCleanup();
    expect(qs.enqueue).toHaveBeenCalled();
  });
});
