import { describe, it, expect, beforeEach } from '@jest/globals';
import { NotificationQueue } from '@infrastructure/queues/notification.queue.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('NotificationQueue', () => {
  let queue: NotificationQueue;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new NotificationQueue(queueService as never);
  });

  it('enqueueEmail enqueues email payload', async () => {
    await queue.enqueueEmail({ to: 'test@x.com', subject: 'Hi' } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });

  it('enqueueSms enqueues sms payload', async () => {
    await queue.enqueueSms({ to: '+8801700000000', message: 'Hi' } as never);
    expect(queueService.enqueue).toHaveBeenCalled();
  });
});
