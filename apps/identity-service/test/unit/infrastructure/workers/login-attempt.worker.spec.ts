import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { LoginAttemptWorker } from '@infrastructure/workers/login-attempt.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('LoginAttemptWorker', () => {
  let worker: LoginAttemptWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let attemptRepo: { purge: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    attemptRepo = { purge: jest.fn() };
    worker = new LoginAttemptWorker(queueService as never, attemptRepo as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('processes purge', async () => {
    attemptRepo.purge.mockResolvedValueOnce(5);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    await processor({ olderThanDays: 30 });
    expect(attemptRepo.purge).toHaveBeenCalled();
  });
});
