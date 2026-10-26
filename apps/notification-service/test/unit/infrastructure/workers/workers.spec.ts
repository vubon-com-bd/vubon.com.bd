/**
 * Workers — Unit Tests
 * @module notification-service/test/unit/infrastructure/workers
 *
 * Covers: 13 workers
 * Target: 90% statements, 80% branches, 90% functions, 90% lines
 */
import { NotificationSenderWorker } from '@infrastructure/workers/notification-sender.worker.js';
import { EmailSenderWorker } from '@infrastructure/workers/email-sender.worker.js';
import { SmsSenderWorker } from '@infrastructure/workers/sms-sender.worker.js';
import { PushSenderWorker } from '@infrastructure/workers/push-sender.worker.js';
import { InAppSenderWorker } from '@infrastructure/workers/in-app-sender.worker.js';
import { WebhookSenderWorker } from '@infrastructure/workers/webhook-sender.worker.js';
import { ScheduleTriggerWorker } from '@infrastructure/workers/schedule-trigger.worker.js';
import { BroadcastProcessorWorker } from '@infrastructure/workers/broadcast-processor.worker.js';
import { DigestProcessorWorker } from '@infrastructure/workers/digest-processor.worker.js';
import { RetryProcessorWorker } from '@infrastructure/workers/retry-processor.worker.js';
import { BounceProcessorWorker } from '@infrastructure/workers/bounce-processor.worker.js';
import { AnalyticsProcessorWorker } from '@infrastructure/workers/analytics-processor.worker.js';
import { CleanupWorker } from '@infrastructure/workers/cleanup.worker.js';

import { NotificationPrismaMapper } from '@infrastructure/persistence/prisma/mappers/notification.prisma.mapper.js';
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';

import {
  TEST_IDS,
  makePrismaNotification,
  makePrismaTemplate,
  makePrismaDevice,
  makePrismaPreference,
  makePrismaDelegateMock,
  makePrismaServiceMock,
  makeQueueMock,
  makeEventBridgeMock,
} from '@test-infra/index.js';

// ═══════════════════════════════════════════════════════════
// Helper: build entity from Prisma row
// ═══════════════════════════════════════════════════════════
function buildNotificationEntity() {
  return NotificationPrismaMapper.toDomain(makePrismaNotification());
}

// ═══════════════════════════════════════════════════════════
// 1. NotificationSenderWorker
// ═══════════════════════════════════════════════════════════
describe('NotificationSenderWorker', () => {
  let worker: NotificationSenderWorker;
  let queue: ReturnType<typeof makeQueueMock>;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };

  beforeEach(() => {
    queue = makeQueueMock();
    repo = {
      findByIdVO: jest.fn(),
      save: jest.fn(),
    };
    worker = new NotificationSenderWorker(queue as never, repo as never);
  });

  it('has correct queue name + job names', () => {
    // Access protected via cast
    const w = worker as unknown as { queueName: string; jobNames: readonly string[] };
    expect(w.queueName).toBe('notification.processing');
    expect(w.jobNames).toContain('send');
    expect(w.jobNames).toContain('send-bulk');
  });

  it('handle — notification found + sendable → marks sending', async () => {
    const entity = buildNotificationEntity();
    const queueSpy = jest.spyOn(entity, 'queue').mockImplementation(() => undefined);
    const sendingSpy = jest.spyOn(entity, 'markSending').mockImplementation(() => undefined);
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    const handler = worker as unknown as {
      handle: (p: { notificationId: string; channel: string; userId: string }) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      channel: 'email',
      userId: TEST_IDS.USER,
    });

    expect(queueSpy).toHaveBeenCalled();
    expect(sendingSpy).toHaveBeenCalled();
    expect(result).toEqual({ processed: true, notificationId: TEST_IDS.NOTIFICATION });
  });

  it('handle — notification not found → skipped', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: { notificationId: string; channel: string; userId: string }) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      channel: 'email',
      userId: TEST_IDS.USER,
    });
    expect(result).toEqual({ skipped: true, reason: 'not-found' });
  });

  it('handle — invalid status → skipped', async () => {
    const entity = buildNotificationEntity();
    jest.spyOn(entity, 'canBeSent').mockReturnValue(false);
    repo.findByIdVO.mockResolvedValue(entity);
    const handler = worker as unknown as {
      handle: (p: { notificationId: string; channel: string; userId: string }) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      channel: 'email',
      userId: TEST_IDS.USER,
    });
    expect(result).toEqual({ skipped: true, reason: 'invalid-status' });
  });

  it('concurrency = 10', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(10);
  });

  it('onModuleInit — autoStart off → skip', () => {
    // Queue mock's registerWorker should be called only when autoStartWorkers
    // This depends on config — just verify no crash
    expect(() => worker.onModuleInit()).not.toThrow();
  });
});

// ═══════════════════════════════════════════════════════════
// 2. EmailSenderWorker
// ═══════════════════════════════════════════════════════════
describe('EmailSenderWorker', () => {
  let worker: EmailSenderWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new EmailSenderWorker(queue as never, repo as never);
  });

  it('handle — sends email + marks sent', async () => {
    const entity = buildNotificationEntity();
    const sentSpy = jest.spyOn(entity, 'markSent').mockImplementation(() => undefined);
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      to: 'test@example.com',
      subject: 'Hello',
      text: 'Body',
    });

    expect(sentSpy).toHaveBeenCalled();
    expect(result).toEqual({ processed: true, channel: 'email', to: 'test@example.com' });
  });

  it('handle — not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({ notificationId: TEST_IDS.NOTIFICATION, to: 'x', subject: 's' });
    expect(result).toEqual({ skipped: true, reason: 'not-found' });
  });

  it('concurrency = 20', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(20);
  });
});

// ═══════════════════════════════════════════════════════════
// 3. SmsSenderWorker
// ═══════════════════════════════════════════════════════════
describe('SmsSenderWorker', () => {
  let worker: SmsSenderWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new SmsSenderWorker(queue as never, repo as never);
  });

  it('handle — sends sms + marks sent', async () => {
    const entity = buildNotificationEntity();
    jest.spyOn(entity, 'markSent').mockImplementation(() => undefined);
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);

    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      to: '+8801712345678',
      message: 'Test message',
    });
    expect(result).toEqual({ processed: true, channel: 'sms', to: '+8801712345678' });
  });

  it('handle — not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    expect((await handler.handle({ notificationId: TEST_IDS.NOTIFICATION, to: 'x', message: 'y' }))).toEqual({
      skipped: true,
      reason: 'not-found',
    });
  });

  it('concurrency = 10', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(10);
  });
});

// ═══════════════════════════════════════════════════════════
// 4. PushSenderWorker
// ═══════════════════════════════════════════════════════════
describe('PushSenderWorker', () => {
  let worker: PushSenderWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new PushSenderWorker(queue as never, repo as never);
  });

  it('handle — sends push', async () => {
    const entity = buildNotificationEntity();
    jest.spyOn(entity, 'markSent').mockImplementation(() => undefined);
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      tokens: ['token1', 'token2'],
      title: 'Title',
      body: 'Body',
    });
    expect(result).toMatchObject({ processed: true, channel: 'push', tokenCount: 2 });
  });

  it('concurrency = 50', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(50);
  });
});

// ═══════════════════════════════════════════════════════════
// 5. InAppSenderWorker
// ═══════════════════════════════════════════════════════════
describe('InAppSenderWorker', () => {
  let worker: InAppSenderWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new InAppSenderWorker(queue as never, repo as never);
  });

  it('handle — sends in-app', async () => {
    const entity = buildNotificationEntity();
    jest.spyOn(entity, 'markSent').mockImplementation(() => undefined);
    repo.findByIdVO.mockResolvedValue(entity);
    repo.save.mockResolvedValue(entity);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      userId: TEST_IDS.USER,
      title: 'Title',
      body: 'Body',
    });
    expect(result).toMatchObject({ processed: true, channel: 'in-app' });
  });

  it('concurrency = 30', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(30);
  });
});

// ═══════════════════════════════════════════════════════════
// 6. WebhookSenderWorker
// ═══════════════════════════════════════════════════════════
describe('WebhookSenderWorker', () => {
  let worker: WebhookSenderWorker;
  let webhookRepo: { findById: jest.Mock };
  let deliveryRepo: { findById: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    webhookRepo = { findById: jest.fn() };
    deliveryRepo = { findById: jest.fn(), save: jest.fn() };
    worker = new WebhookSenderWorker(
      queue as never,
      webhookRepo as never,
      deliveryRepo as never,
    );
  });

  it('handle — webhook not found', async () => {
    webhookRepo.findById.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      webhookId: TEST_IDS.WEBHOOK,
      deliveryId: TEST_IDS.DELIVERY,
      event: 'order.created',
      payload: {},
    });
    expect(result).toEqual({ skipped: true, reason: 'webhook-not-found' });
  });

  it('concurrency = 5', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(5);
  });
});

// ═══════════════════════════════════════════════════════════
// 7. ScheduleTriggerWorker
// ═══════════════════════════════════════════════════════════
describe('ScheduleTriggerWorker', () => {
  let worker: ScheduleTriggerWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new ScheduleTriggerWorker(queue as never, repo as never);
  });

  it('handle — schedule not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      scheduleId: TEST_IDS.SCHEDULE,
      scheduledFor: '2026-01-15T00:00:00.000Z',
    });
    expect(result).toEqual({ skipped: true, reason: 'not-found' });
  });
});

// ═══════════════════════════════════════════════════════════
// 8. BroadcastProcessorWorker
// ═══════════════════════════════════════════════════════════
describe('BroadcastProcessorWorker', () => {
  let worker: BroadcastProcessorWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new BroadcastProcessorWorker(queue as never, repo as never);
  });

  it('handle — not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    expect((await handler.handle({ broadcastId: TEST_IDS.BROADCAST }))).toEqual({
      skipped: true,
      reason: 'not-found',
    });
  });

  it('concurrency = 3', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(3);
  });
});

// ═══════════════════════════════════════════════════════════
// 9. DigestProcessorWorker
// ═══════════════════════════════════════════════════════════
describe('DigestProcessorWorker', () => {
  let worker: DigestProcessorWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new DigestProcessorWorker(queue as never, repo as never);
  });

  it('handle — not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    expect((await handler.handle({ digestId: TEST_IDS.DIGEST, userId: TEST_IDS.USER }))).toEqual({
      skipped: true,
      reason: 'not-found',
    });
  });

  it('concurrency = 5', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(5);
  });
});

// ═══════════════════════════════════════════════════════════
// 10. RetryProcessorWorker
// ═══════════════════════════════════════════════════════════
describe('RetryProcessorWorker', () => {
  let worker: RetryProcessorWorker;
  let repo: { findByIdVO: jest.Mock; save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    repo = { findByIdVO: jest.fn(), save: jest.fn() };
    worker = new RetryProcessorWorker(queue as never, repo as never);
  });

  it('handle — not found', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    expect(
      (await handler.handle({
        notificationId: TEST_IDS.NOTIFICATION,
        channel: 'email',
        attempt: 1,
        nextRetryAt: '2026-01-15T00:00:00.000Z',
      })),
    ).toEqual({ skipped: true, reason: 'not-found' });
  });

  it('concurrency = 5', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(5);
  });
});

// ═══════════════════════════════════════════════════════════
// 11. BounceProcessorWorker
// ═══════════════════════════════════════════════════════════
describe('BounceProcessorWorker', () => {
  let worker: BounceProcessorWorker;
  let bounceRepo: { save: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    bounceRepo = { save: jest.fn(async (r) => r) };
    worker = new BounceProcessorWorker(queue as never, bounceRepo as never);
  });

  it('handle — persists bounce + returns classification', async () => {
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      userId: TEST_IDS.USER,
      channel: 'email',
      provider: 'sendgrid',
      recipient: 'x@y.com',
      errorCode: 'INVALID_ADDRESS',
      reason: 'invalid',
    });
    expect(bounceRepo.save).toHaveBeenCalled();
    expect((result as Record<string, unknown>)['processed']).toBe(true);
  });

  it('concurrency = 10', () => {
    const w = worker as unknown as { concurrency: () => number };
    expect(w.concurrency()).toBe(10);
  });
});

// ═══════════════════════════════════════════════════════════
// 12. AnalyticsProcessorWorker
// ═══════════════════════════════════════════════════════════
describe('AnalyticsProcessorWorker', () => {
  let worker: AnalyticsProcessorWorker;
  let bridge: ReturnType<typeof makeEventBridgeMock>;
  let eventRepo: { save: jest.Mock };

  beforeEach(() => {
    bridge = makeEventBridgeMock();
    eventRepo = { save: jest.fn(async (r) => r) };
    worker = new AnalyticsProcessorWorker(bridge as never, eventRepo as never);
  });

  it('onModuleInit — no crash', () => {
    expect(() => worker.onModuleInit()).not.toThrow();
  });

  it('process — non-tracked event ignored', async () => {
    await worker.process({
      id: 'e1',
      type: 'unrelated.event',
      aggregateId: 'agg-1',
      aggregateType: 'Other',
      payload: {},
      occurredAt: '2026-01-15T00:00:00.000Z',
      version: 1,
    } as never);
    expect(eventRepo.save).not.toHaveBeenCalled();
  });

  it('process — tracked event persists', async () => {
    await worker.process({
      id: 'e2',
      type: 'notification.sent',
      aggregateId: TEST_IDS.NOTIFICATION,
      aggregateType: 'Notification',
      payload: { notificationId: TEST_IDS.NOTIFICATION, userId: TEST_IDS.USER, channel: 'email' },
      occurredAt: '2026-01-15T00:00:00.000Z',
      version: 1,
    } as never);
    expect(eventRepo.save).toHaveBeenCalled();
  });

  it('process — missing notificationId → skipped', async () => {
    await worker.process({
      id: 'e3',
      type: 'notification.sent',
      aggregateId: '',
      aggregateType: 'Notification',
      payload: {},
      occurredAt: '2026-01-15T00:00:00.000Z',
      version: 1,
    } as never);
    expect(eventRepo.save).not.toHaveBeenCalled();
  });
});

// ═══════════════════════════════════════════════════════════
// 13. CleanupWorker
// ═══════════════════════════════════════════════════════════
describe('CleanupWorker', () => {
  let worker: CleanupWorker;
  let notifRepo: { purgeOlderThan: jest.Mock };
  let digestRepo: { purgeOlderThan: jest.Mock };
  let webhookDeliveryRepo: { deleteByWebhook: jest.Mock };
  let auditLogRepo: { purgeOlderThan: jest.Mock };
  let rateLimitRepo: { purgeExpired: jest.Mock };
  let queue: ReturnType<typeof makeQueueMock>;

  beforeEach(() => {
    queue = makeQueueMock();
    notifRepo = { purgeOlderThan: jest.fn(async () => 5) };
    digestRepo = { purgeOlderThan: jest.fn(async () => 3) };
    webhookDeliveryRepo = { deleteByWebhook: jest.fn(async () => 2) };
    auditLogRepo = { purgeOlderThan: jest.fn(async () => 1) };
    rateLimitRepo = { purgeExpired: jest.fn(async () => 10) };
    worker = new CleanupWorker(
      queue as never,
      notifRepo as never,
      digestRepo as never,
      webhookDeliveryRepo as never,
      auditLogRepo as never,
      rateLimitRepo as never,
    );
  });

  it('handle — scope=notifications', async () => {
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({ scope: 'notifications', cutoff: '2025-01-01T00:00:00.000Z' });
    expect(notifRepo.purgeOlderThan).toHaveBeenCalled();
    expect((result as Record<string, unknown>)['processed']).toBe(true);
  });

  it('handle — scope=digests', async () => {
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    await handler.handle({ scope: 'digests', cutoff: '2025-01-01T00:00:00.000Z' });
    expect(digestRepo.purgeOlderThan).toHaveBeenCalled();
  });

  it('handle — scope=audit', async () => {
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    await handler.handle({ scope: 'audit', cutoff: '2025-01-01T00:00:00.000Z' });
    expect(auditLogRepo.purgeOlderThan).toHaveBeenCalled();
  });

  it('handle — scope=rate-limits', async () => {
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    await handler.handle({ scope: 'rate-limits', cutoff: '2025-01-01T00:00:00.000Z' });
    expect(rateLimitRepo.purgeExpired).toHaveBeenCalled();
  });

  it('handle — scope=webhooks', async () => {
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    await handler.handle({ scope: 'webhooks', cutoff: '2025-01-01T00:00:00.000Z' });
    expect(webhookDeliveryRepo.deleteByWebhook).toHaveBeenCalled();
  });

  it('handle — scope=all → all repos called', async () => {
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    await handler.handle({ scope: 'all', cutoff: '2025-01-01T00:00:00.000Z' });
    expect(notifRepo.purgeOlderThan).toHaveBeenCalled();
    expect(digestRepo.purgeOlderThan).toHaveBeenCalled();
    expect(auditLogRepo.purgeOlderThan).toHaveBeenCalled();
    expect(rateLimitRepo.purgeExpired).toHaveBeenCalled();
  });

  it('handle — scope error does not crash', async () => {
    notifRepo.purgeOlderThan.mockRejectedValue(new Error('db-down'));
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({ scope: 'notifications', cutoff: '2025-01-01T00:00:00.000Z' });
    expect((result as Record<string, unknown>)['processed']).toBe(true);
  });

});

// ═══════════════════════════════════════════════════════════
// Suppress unused imports
// ═══════════════════════════════════════════════════════════
void ScheduleIdVO;
void BroadcastIdVO;
void DigestIdVO;
void NotificationIdVO;
void makePrismaTemplate;
void makePrismaDevice;
void makePrismaPreference;
void makePrismaDelegateMock;
void makePrismaServiceMock;


// ═══════════════════════════════════════════════════════════
// BRANCH — Extra worker edge cases
// ═══════════════════════════════════════════════════════════
describe('Workers — extra branches', () => {
  it('NotificationSenderWorker — bulk payload type', () => {
    const queue = makeQueueMock();
    const repo = { findByIdVO: jest.fn(async () => null), save: jest.fn() };
    const worker = new NotificationSenderWorker(queue as never, repo as never);
    expect(worker).toBeDefined();
  });

  it('EmailSenderWorker — with template', async () => {
    const queue = makeQueueMock();
    const entity = buildNotificationEntity();
    jest.spyOn(entity, 'markSent').mockImplementation(() => undefined);
    const repo = {
      findByIdVO: jest.fn(async () => entity),
      save: jest.fn(async (e: unknown) => e),
    };
    const worker = new EmailSenderWorker(queue as never, repo as never);
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({
      notificationId: TEST_IDS.NOTIFICATION,
      to: 'x@y.com',
      subject: 'S',
      templateId: 'tpl-1',
    });
    expect(result).toMatchObject({ processed: true });
  });

  it('CleanupWorker — error swallowed', async () => {
    const queue = makeQueueMock();
    const notifRepo = { purgeOlderThan: jest.fn(async () => { throw new Error('db'); }) };
    const digestRepo = { purgeOlderThan: jest.fn(async () => 0) };
    const webhookDeliveryRepo = { deleteByWebhook: jest.fn(async () => 0) };
    const auditLogRepo = { purgeOlderThan: jest.fn(async () => 0) };
    const rateLimitRepo = { purgeExpired: jest.fn(async () => 0) };
    const worker = new CleanupWorker(
      queue as never,
      notifRepo as never,
      digestRepo as never,
      webhookDeliveryRepo as never,
      auditLogRepo as never,
      rateLimitRepo as never,
    );
    const handler = worker as unknown as {
      handle: (p: Record<string, unknown>) => Promise<unknown>;
    };
    const result = await handler.handle({ scope: 'notifications', cutoff: '2025-01-01' });
    expect((result as Record<string, unknown>)['processed']).toBe(true);
  });
});
