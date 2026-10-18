import { describe, it, expect, beforeEach } from '@jest/globals';
import { ProfileQueue } from '@infrastructure/queues/profile.queue.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('ProfileQueue', () => {
  let queue: ProfileQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new ProfileQueue(queueService as never);
  });

  it('enqueueCompletion enqueues', async () => {
    await queue.enqueueCompletion({ userId: 'u-1' } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });
});
