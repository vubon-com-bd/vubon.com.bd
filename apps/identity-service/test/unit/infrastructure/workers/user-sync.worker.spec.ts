import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { UserSyncWorker } from '@infrastructure/workers/user-sync.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('UserSyncWorker', () => {
  let worker: UserSyncWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    worker = new UserSyncWorker(queueService as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });
});
