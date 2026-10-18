import { describe, it, expect, beforeEach } from '@jest/globals';
import { AnalyticsQueue } from '@infrastructure/queues/analytics.queue.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('AnalyticsQueue', () => {
  let queue: AnalyticsQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new AnalyticsQueue(queueService as never);
  });

  it('enqueueEvent enqueues', async () => {
    await queue.enqueueEvent({ eventName: 'page-view', userId: 'u-1' } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });

  it('enqueueEvent returns jobId', async () => {
    const id = await queue.enqueueEvent({ eventName: 'x' } as never);
    expect(typeof id).toBe('string');
  });
});
