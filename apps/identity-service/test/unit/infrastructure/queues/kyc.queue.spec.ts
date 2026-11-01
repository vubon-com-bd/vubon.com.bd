import { describe, it, expect, beforeEach } from '@jest/globals';
import { KycQueue } from '@infrastructure/queues/kyc.queue.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('KycQueue', () => {
  let queue: KycQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new KycQueue(queueService as never);
  });

  it('enqueueExpiryCheck enqueues', async () => {
    await queue.enqueueExpiryCheck({ userId: 'u-1' } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });
});
