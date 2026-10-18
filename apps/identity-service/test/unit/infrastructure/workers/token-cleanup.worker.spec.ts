import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { TokenCleanupWorker } from '@infrastructure/workers/token-cleanup.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('TokenCleanupWorker', () => {
  let worker: TokenCleanupWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let tokenRepo: { purge: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    tokenRepo = { purge: jest.fn() };
    worker = new TokenCleanupWorker(queueService as never, tokenRepo as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('revokes expired tokens (calls purge)', async () => {
    tokenRepo.purge.mockResolvedValueOnce(5);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ olderThanHours: 24 });
    expect(tokenRepo.purge).toHaveBeenCalled();
    expect(result).toEqual({ purged: 5 });
  });

  it('handles zero purged', async () => {
    tokenRepo.purge.mockResolvedValueOnce(0);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ olderThanHours: 72 });
    expect(result).toEqual({ purged: 0 });
  });

  it('uses concurrency 2', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function),
      2,
    );
  });
});
