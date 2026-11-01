import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { KycExpiryWorker } from '@infrastructure/workers/kyc-expiry.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('KycExpiryWorker', () => {
  let worker: KycExpiryWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let repo: { findExpiring: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    repo = { findExpiring: jest.fn() };
    worker = new KycExpiryWorker(queueService as never, repo as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('processes expiry check', async () => {
    repo.findExpiring.mockResolvedValueOnce([]);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    await processor({ withinDays: 30 });
    expect(repo.findExpiring).toHaveBeenCalled();
  });
});
