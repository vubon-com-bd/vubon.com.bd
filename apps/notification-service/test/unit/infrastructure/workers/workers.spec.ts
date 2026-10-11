/**
 * Worker unit tests — verify queueName + jobNames + handle dispatch
 * Uses make*MockEventBridge pattern
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationDispatcherWorker } from '../../../../src/module/infrastructure/workers/notification-dispatcher.worker.js';
import { EmailWorker } from '../../../../src/module/infrastructure/workers/email.worker.js';
import { SmsWorker } from '../../../../src/module/infrastructure/workers/sms.worker.js';
import { PushWorker } from '../../../../src/module/infrastructure/workers/push.worker.js';
import { InAppWorker } from '../../../../src/module/infrastructure/workers/in-app.worker.js';
import { TemplateRendererWorker } from '../../../../src/module/infrastructure/workers/template-renderer.worker.js';
import { ScheduleTriggerWorker } from '../../../../src/module/infrastructure/workers/schedule-trigger.worker.js';
import { BroadcastProcessorWorker } from '../../../../src/module/infrastructure/workers/broadcast-processor.worker.js';
import { DigestGeneratorWorker } from '../../../../src/module/infrastructure/workers/digest-generator.worker.js';
import { WebhookDelivererWorker } from '../../../../src/module/infrastructure/workers/webhook-deliverer.worker.js';
import { DeliveryRecorderWorker } from '../../../../src/module/infrastructure/workers/delivery-recorder.worker.js';
import { CleanupWorker } from '../../../../src/module/infrastructure/workers/cleanup.worker.js';
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
import { FIXED_USER_ID, FIXED_NOTIFICATION_ID } from '../../../helpers/test-factories.js';

function makeQueueService() {
  return { enqueue: jest.fn(), registerWorker: jest.fn() } as never;
}

function makeNotificationRepo() {
  return {
    findByIdVO: jest.fn().mockResolvedValue(null),
    save: jest.fn().mockImplementation(async (e: unknown) => e),
    findStalePending: jest.fn().mockResolvedValue([]),
    findExpired: jest.fn().mockResolvedValue([]),
  } as never;
}

function makeEmailQueue() {
  return { enqueueSend: jest.fn(), enqueueRetry: jest.fn() } as never;
}
function makeSmsQueue() {
  return { enqueueSend: jest.fn(), enqueueRetry: jest.fn() } as never;
}
function makePushQueue() {
  return { enqueueSend: jest.fn(), enqueueRetry: jest.fn() } as never;
}
function makeInAppQueue() {
  return { enqueueSend: jest.fn(), enqueueRetry: jest.fn() } as never;
}
function makeDeliveryQueue() {
  return { enqueueRecordAttempt: jest.fn(), enqueueScheduleRetry: jest.fn() } as never;
}
function makeTemplateQueue() {
  return { enqueueRender: jest.fn() } as never;
}
function makeScheduleQueue() {
  return { enqueueTrigger: jest.fn(), enqueueAdvanceRecurring: jest.fn(), enqueueScanDue: jest.fn() } as never;
}
function makeBroadcastQueue() {
  return { enqueueStart: jest.fn(), enqueueBatch: jest.fn(), enqueueFinalize: jest.fn(), enqueueCancel: jest.fn() } as never;
}
function makeDigestQueue() {
  return { enqueueGenerate: jest.fn(), enqueueSend: jest.fn(), enqueueScanReady: jest.fn() } as never;
}
function makeWebhookQueue() {
  return { enqueueDeliver: jest.fn(), enqueueRetry: jest.fn(), enqueueDisableFailing: jest.fn() } as never;
}
function makeCleanupQueue() {
  return { enqueueStaleCleanup: jest.fn(), enqueueExpiredCleanup: jest.fn(), enqueueOldAttemptsCleanup: jest.fn(), enqueueRateLimitCleanup: jest.fn() } as never;
}
function makeTemplateRepo() {
  return { findByIdVO: jest.fn().mockResolvedValue(null) } as never;
}
function makeTemplateCache() {
  return { setRender: jest.fn() } as never;
}
function makeScheduleRepo() {
  return { findByIdVO: jest.fn().mockResolvedValue(null), findDue: jest.fn().mockResolvedValue([]), save: jest.fn() } as never;
}
function makeBroadcastRepo() {
  return { findByIdVO: jest.fn().mockResolvedValue(null), save: jest.fn() } as never;
}
function makeDigestRepo() {
  return { findByIdVO: jest.fn().mockResolvedValue(null), findReadyToSend: jest.fn().mockResolvedValue([]), save: jest.fn() } as never;
}
function makeWebhookRepo() {
  return { findByIdVO: jest.fn().mockResolvedValue(null), save: jest.fn() } as never;
}
function makeEmailSvc() {
  return { send: jest.fn().mockResolvedValue({ success: true, messageId: 'm-1' }) } as never;
}
function makeSmsSvc() {
  return { send: jest.fn().mockResolvedValue({ success: true, messageId: 'm-1' }) } as never;
}
function makePushSvc() {
  return { send: jest.fn().mockResolvedValue({ success: true, messageId: 'm-1' }) } as never;
}

function buildEntity(): NotificationEntity {
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
        email: { value: 'x@y.com' } as never,
      }),
    },
  });
}

describe('NotificationDispatcherWorker', () => {
  it('registerWorker on module init', () => {
    const qs = makeQueueService();
    const w = new NotificationDispatcherWorker(
      qs,
      makeNotificationRepo(),
      { enqueueDispatch: jest.fn() } as never,
      makeEmailQueue(), makeSmsQueue(), makePushQueue(), makeInAppQueue(),
    );
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });

  it('handle returns skipped when notification missing', async () => {
    const w = new NotificationDispatcherWorker(
      makeQueueService(), makeNotificationRepo(),
      { enqueueDispatch: jest.fn() } as never,
      makeEmailQueue(), makeSmsQueue(), makePushQueue(), makeInAppQueue(),
    );
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', userId: FIXED_USER_ID,
    });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });

  it('handle routes to email queue', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const emailQ = makeEmailQueue();
    const w = new NotificationDispatcherWorker(
      makeQueueService(), repo,
      { enqueueDispatch: jest.fn() } as never,
      emailQ, makeSmsQueue(), makePushQueue(), makeInAppQueue(),
    );
    await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', userId: FIXED_USER_ID,
    });
    expect((emailQ as { enqueueSend: jest.Mock }).enqueueSend).toHaveBeenCalled();
  });

  it('handle routes to sms queue', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const smsQ = makeSmsQueue();
    const w = new NotificationDispatcherWorker(
      makeQueueService(), repo,
      { enqueueDispatch: jest.fn() } as never,
      makeEmailQueue(), smsQ, makePushQueue(), makeInAppQueue(),
    );
    await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'sms', userId: FIXED_USER_ID,
    });
    expect((smsQ as { enqueueSend: jest.Mock }).enqueueSend).toHaveBeenCalled();
  });

  it('handle routes to push queue', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const pushQ = makePushQueue();
    const w = new NotificationDispatcherWorker(
      makeQueueService(), repo,
      { enqueueDispatch: jest.fn() } as never,
      makeEmailQueue(), makeSmsQueue(), pushQ, makeInAppQueue(),
    );
    await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'push', userId: FIXED_USER_ID,
    });
    expect((pushQ as { enqueueSend: jest.Mock }).enqueueSend).toHaveBeenCalled();
  });

  it('handle routes to in-app queue', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const inQ = makeInAppQueue();
    const w = new NotificationDispatcherWorker(
      makeQueueService(), repo,
      { enqueueDispatch: jest.fn() } as never,
      makeEmailQueue(), makeSmsQueue(), makePushQueue(), inQ,
    );
    await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'in_app', userId: FIXED_USER_ID,
    });
    expect((inQ as { enqueueSend: jest.Mock }).enqueueSend).toHaveBeenCalled();
  });

  it('handle skips wrong-status notification', async () => {
    const e = buildEntity();
    e.queue();
    e.startSending('smtp');
    e.markSent();
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(e);
    const w = new NotificationDispatcherWorker(
      makeQueueService(), repo,
      { enqueueDispatch: jest.fn() } as never,
      makeEmailQueue(), makeSmsQueue(), makePushQueue(), makeInAppQueue(),
    );
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', userId: FIXED_USER_ID,
    });
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });
});

describe('EmailWorker', () => {
  it('registerWorker on init', () => {
    const qs = makeQueueService();
    const w = new EmailWorker(qs, makeNotificationRepo(), makeEmailSvc(), makeEmailQueue(), makeDeliveryQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });

  it('handle skip when missing', async () => {
    const w = new EmailWorker(makeQueueService(), makeNotificationRepo(), makeEmailSvc(), makeEmailQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });

  it('handle sends + marks sent', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const w = new EmailWorker(makeQueueService(), repo, makeEmailSvc(), makeEmailQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID });
    expect((r as { sent: boolean }).sent).toBe(true);
  });

  it('handle fail path retries', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const svc = { send: jest.fn().mockRejectedValue(new Error('smtp down')) } as never;
    const emailQ = makeEmailQueue();
    const w = new EmailWorker(makeQueueService(), repo, svc, emailQ, makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID, attempt: 1 });
    expect((r as { retried: boolean }).retried).toBe(true);
  });

  it('handle failure with success=false result', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const svc = { send: jest.fn().mockResolvedValue({ success: false, error: 'bad' }) } as never;
    const w = new EmailWorker(makeQueueService(), repo, svc, makeEmailQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID, attempt: 3 });
    expect((r as { retried: boolean }).retried).toBe(false);
  });
});

describe('SmsWorker', () => {
  it('registerWorker on init', () => {
    const qs = makeQueueService();
    const w = new SmsWorker(qs, makeNotificationRepo(), makeSmsSvc(), makeSmsQueue(), makeDeliveryQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });

  it('skip when missing', async () => {
    const w = new SmsWorker(makeQueueService(), makeNotificationRepo(), makeSmsSvc(), makeSmsQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });

  it('sends + mark sent', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const w = new SmsWorker(makeQueueService(), repo, makeSmsSvc(), makeSmsQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID });
    expect((r as { sent: boolean }).sent).toBe(true);
  });

  it('fail path', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const svc = { send: jest.fn().mockRejectedValue(new Error('sms down')) } as never;
    const w = new SmsWorker(makeQueueService(), repo, svc, makeSmsQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID, attempt: 1 });
    expect((r as { retried: boolean }).retried).toBe(true);
  });
});

describe('PushWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new PushWorker(qs, makeNotificationRepo(), makePushSvc(), makePushQueue(), makeDeliveryQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });

  it('skip missing', async () => {
    const w = new PushWorker(makeQueueService(), makeNotificationRepo(), makePushSvc(), makePushQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });

  it('skip when no tokens', async () => {
    const repo = makeNotificationRepo();
    const e = buildEntity();
    // Entity has email, no device token → tokens=[]
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(e);
    const w = new PushWorker(makeQueueService(), repo, makePushSvc(), makePushQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ notificationId: FIXED_NOTIFICATION_ID });
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });

  it('sends with tokens payload', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const w = new PushWorker(makeQueueService(), repo, makePushSvc(), makePushQueue(), makeDeliveryQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, tokens: ['tk-abcdefghijklmnop'],
    });
    expect((r as { successCount: number }).successCount).toBe(1);
  });
});

describe('InAppWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new InAppWorker(qs, makeNotificationRepo());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('skip missing', async () => {
    const w = new InAppWorker(makeQueueService(), makeNotificationRepo());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID, title: 'T', body: 'B', type: 'toast',
    });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });
  it('delivers when found', async () => {
    const repo = makeNotificationRepo();
    (repo as { findByIdVO: jest.Mock }).findByIdVO.mockResolvedValueOnce(buildEntity());
    const w = new InAppWorker(makeQueueService(), repo);
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, userId: FIXED_USER_ID, title: 'T', body: 'B', type: 'toast',
    });
    expect((r as { delivered: boolean }).delivered).toBe(true);
  });
});

describe('TemplateRendererWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new TemplateRendererWorker(qs, makeTemplateRepo(), makeTemplateCache());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('skip missing', async () => {
    const w = new TemplateRendererWorker(makeQueueService(), makeTemplateRepo(), makeTemplateCache());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      templateId: '00000000-0000-0000-0000-000000000004', data: {},
    });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });
});

describe('ScheduleTriggerWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new ScheduleTriggerWorker(qs, makeScheduleRepo(), makeScheduleQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('scan mode with empty payload', async () => {
    const repo = makeScheduleRepo();
    const w = new ScheduleTriggerWorker(makeQueueService(), repo, makeScheduleQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({});
    expect((r as { scanned: number }).scanned).toBe(0);
  });
  it('skip when schedule missing', async () => {
    const w = new ScheduleTriggerWorker(makeQueueService(), makeScheduleRepo(), makeScheduleQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ scheduleId: '00000000-0000-0000-0000-000000000005' });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });
});

describe('BroadcastProcessorWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new BroadcastProcessorWorker(qs, makeBroadcastRepo(), makeBroadcastQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('skip no broadcastId', async () => {
    const w = new BroadcastProcessorWorker(makeQueueService(), makeBroadcastRepo(), makeBroadcastQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({});
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });
  it('skip missing', async () => {
    const w = new BroadcastProcessorWorker(makeQueueService(), makeBroadcastRepo(), makeBroadcastQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ broadcastId: '00000000-0000-0000-0000-000000000006' });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });
});

describe('DigestGeneratorWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new DigestGeneratorWorker(qs, makeDigestRepo(), makeDigestQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('scan mode', async () => {
    const w = new DigestGeneratorWorker(makeQueueService(), makeDigestRepo(), makeDigestQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({});
    expect((r as { scanned: number }).scanned).toBe(0);
  });
  it('send mode skip when missing', async () => {
    const w = new DigestGeneratorWorker(makeQueueService(), makeDigestRepo(), makeDigestQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ digestId: '00000000-0000-0000-0000-000000000007', userId: 'u' });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });
  it('generate mode delegated', async () => {
    const w = new DigestGeneratorWorker(makeQueueService(), makeDigestRepo(), makeDigestQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ userId: 'u', frequency: 'daily' });
    expect((r as { generated: boolean }).generated).toBe(false);
  });
});

describe('WebhookDelivererWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new WebhookDelivererWorker(qs, makeWebhookRepo(), makeWebhookQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('skip missing', async () => {
    const w = new WebhookDelivererWorker(makeQueueService(), makeWebhookRepo(), makeWebhookQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({ webhookId: '00000000-0000-0000-0000-000000000008' });
    expect(r).toEqual({ skipped: true, reason: 'not_found' });
  });
  it('skip no webhookId', async () => {
    const w = new WebhookDelivererWorker(makeQueueService(), makeWebhookRepo(), makeWebhookQueue());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({});
    expect((r as { skipped: boolean }).skipped).toBe(true);
  });
});

describe('DeliveryRecorderWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new DeliveryRecorderWorker(qs, makeNotificationRepo());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('records', async () => {
    const w = new DeliveryRecorderWorker(makeQueueService(), makeNotificationRepo());
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({
      notificationId: FIXED_NOTIFICATION_ID, channel: 'email', provider: 'smtp',
      attempt: 1, success: true,
    });
    expect((r as { recorded: boolean }).recorded).toBe(true);
  });
});

describe('CleanupWorker', () => {
  it('registerWorker', () => {
    const qs = makeQueueService();
    const w = new CleanupWorker(qs, makeNotificationRepo(), makeCleanupQueue());
    w.onModuleInit();
    expect((qs as { registerWorker: jest.Mock }).registerWorker).toHaveBeenCalled();
  });
  it('runs cleanup', async () => {
    const repo = makeNotificationRepo();
    const cleanupQ = makeCleanupQueue();
    const w = new CleanupWorker(makeQueueService(), repo, cleanupQ);
    const r = await (w as unknown as { handle: (p: unknown) => Promise<unknown> }).handle({});
    expect((r as { markedStale: number }).markedStale).toBe(0);
    expect((cleanupQ as { enqueueStaleCleanup: jest.Mock }).enqueueStaleCleanup).toHaveBeenCalled();
  });
});
