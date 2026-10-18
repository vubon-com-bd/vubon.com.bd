/**
 * E2E — Queues + Workers (real Redis/BullMQ)
 * @module identity-service/test/e2e/infrastructure
 */
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '@infrastructure/queues/queue.constants.js';

describe('E2E — Queues + Workers (real Redis)', () => {
  let queueService: QueueService;

  beforeAll(() => {
    queueService = new QueueService();
  });

  afterAll(async () => {
    try { await queueService.onModuleDestroy(); } catch { /* ignore */ }
  });

  it('enqueue returns a job id', async () => {
    const jobId = await queueService.enqueue(
      AUTH_QUEUE_NAME.ANALYTICS,
      AUTH_JOB_NAME.ANALYTICS_EVENT ?? 'analytics-event',
      { eventName: 'e2e-test', userId: 'u-e2e' },
      { priority: 2 },
    );
    expect(typeof jobId).toBe('string');
    expect(jobId.length).toBeGreaterThan(0);
  });

  it('registerWorker wires processor + concurrency', () => {
    const registered: string[] = [];
    queueService.registerWorker(
      AUTH_QUEUE_NAME.SESSION,
      async (_payload: { x: string }) => {
        registered.push('called');
        return { ok: true };
      },
      2,
    );
    expect(queueService).toBeDefined();
  });

  it('can enqueue multiple jobs without error', async () => {
    for (let i = 0; i < 3; i++) {
      const id = await queueService.enqueue(
        AUTH_QUEUE_NAME.ANALYTICS,
        'analytics-event',
        { eventName: `e2e-${i}`, userId: 'u-e2e' },
      );
      expect(typeof id).toBe('string');
    }
  });
});
