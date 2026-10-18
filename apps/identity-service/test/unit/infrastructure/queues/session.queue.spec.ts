import { describe, it, expect, beforeEach } from '@jest/globals';
import { SessionQueue } from '@infrastructure/queues/session.queue.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('SessionQueue', () => {
  let queue: SessionQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new SessionQueue(queueService as never);
  });

  it('enqueueCleanup enqueues', async () => {
    await queue.enqueueCleanup({ olderThanHours: 24 } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });

  it('enqueueExpiringSoon enqueues', async () => {
    await queue.enqueueExpiringSoon();
    expect(queueService.enqueue).toHaveBeenCalled();
  });
});
