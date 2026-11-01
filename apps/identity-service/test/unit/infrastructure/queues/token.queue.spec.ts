import { describe, it, expect, beforeEach } from '@jest/globals';
import { TokenQueue } from '@infrastructure/queues/token.queue.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('TokenQueue', () => {
  let queue: TokenQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new TokenQueue(queueService as never);
  });

  it('enqueueCleanup enqueues', async () => {
    await queue.enqueueCleanup({ olderThanHours: 24 } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });

  it('enqueueRevocationSweep enqueues', async () => {
    await queue.enqueueRevocationSweep();
    expect(queueService.enqueue).toHaveBeenCalled();
  });
});
