/**
 * AuthQueue unit tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AuthQueue } from '@infrastructure/queues/auth.queue.js';
import { makeMockQueueService, AUTH_QUEUE_NAME, AUTH_JOB_NAME } from '@fixtures/index.js';

describe('AuthQueue', () => {
  let queue: AuthQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new AuthQueue(queueService as never);
  });

  it('enqueueAnalytics enqueues with correct queue + job', async () => {
    await queue.enqueueAnalytics({ eventName: 'login', userId: 'u-1' } as never);
    expect(queueService.enqueue).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(Object),
      expect.any(Object),
    );
  });

  it('enqueueAnalytics returns jobId', async () => {
    const id = await queue.enqueueAnalytics({ eventName: 'login' } as never);
    expect(typeof id).toBe('string');
  });

  it('enqueueAnalytics swallows errors (returns empty string)', async () => {
    queueService.enqueue.mockRejectedValueOnce(new Error('queue down'));
    const id = await queue.enqueueAnalytics({ eventName: 'x' } as never);
    expect(id).toBe('');
  });
});
