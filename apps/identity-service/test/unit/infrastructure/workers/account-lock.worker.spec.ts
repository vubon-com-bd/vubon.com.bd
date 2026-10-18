import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AccountLockWorker } from '@infrastructure/workers/account-lock.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('AccountLockWorker', () => {
  let worker: AccountLockWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let lockRepo: { autoUnlockExpired: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    lockRepo = { autoUnlockExpired: jest.fn() };
    worker = new AccountLockWorker(queueService as never, lockRepo as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('processes unlock', async () => {
    lockRepo.autoUnlockExpired.mockResolvedValueOnce(3);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    await processor({});
    expect(lockRepo.autoUnlockExpired).toHaveBeenCalled();
  });
});
