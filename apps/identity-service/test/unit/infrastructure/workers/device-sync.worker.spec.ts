import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeviceSyncWorker } from '@infrastructure/workers/device-sync.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('DeviceSyncWorker', () => {
  let worker: DeviceSyncWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let repo: { findStale: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    repo = { findStale: jest.fn() };
    worker = new DeviceSyncWorker(queueService as never, repo as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('processes sync', async () => {
    repo.findStale.mockResolvedValueOnce([]);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    await processor({});
    expect(repo.findStale).toHaveBeenCalled();
  });
});
