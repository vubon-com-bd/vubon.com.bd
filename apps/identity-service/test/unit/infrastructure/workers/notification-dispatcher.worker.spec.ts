import { describe, it, expect, beforeEach } from '@jest/globals';
import { NotificationDispatcherWorker } from '@infrastructure/workers/notification-dispatcher.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('NotificationDispatcherWorker', () => {
  let worker: NotificationDispatcherWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    worker = new NotificationDispatcherWorker(queueService as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });
});
