import { describe, it, expect, beforeEach } from '@jest/globals';
import { UserQueue } from '@infrastructure/queues/user.queue.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('UserQueue', () => {
  let queue: UserQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new UserQueue(queueService as never);
  });

  it('enqueueSync enqueues', async () => {
    await queue.enqueueSync({ userId: 'u-1' } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });
});
