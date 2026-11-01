import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ActivityCleanupWorker } from '@infrastructure/workers/activity-cleanup.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('ActivityCleanupWorker', () => {
  let worker: ActivityCleanupWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let repo: { purge: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    repo = { purge: jest.fn() };
    worker = new ActivityCleanupWorker(queueService as never, repo as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('processes cleanup', async () => {
    repo.purge.mockResolvedValueOnce(10);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    await processor({ olderThanDays: 90 });
    expect(repo.purge).toHaveBeenCalled();
  });
});
