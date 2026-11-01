import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { ProfileCompletionWorker } from '@infrastructure/workers/profile-completion.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('ProfileCompletionWorker', () => {
  let worker: ProfileCompletionWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let profileRepo: { findAll: jest.Mock; findByUserIdRaw: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    profileRepo = { findAll: jest.fn(), findByUserIdRaw: jest.fn() };
    worker = new ProfileCompletionWorker(queueService as never, profileRepo as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('processes all profiles when no userId', async () => {
    profileRepo.findAll.mockResolvedValueOnce([]);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({});
    expect(profileRepo.findAll).toHaveBeenCalled();
    expect(result).toEqual({ scanned: 0 });
  });

  it('returns scanned count for all profiles', async () => {
    profileRepo.findAll.mockResolvedValueOnce([{}, {}, {}]);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({});
    expect(result).toEqual({ scanned: 3 });
  });

  it('checks single user when userId given', async () => {
    profileRepo.findByUserIdRaw.mockResolvedValueOnce({ userId: 'u-1' });
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ userId: 'u-1' });
    expect(profileRepo.findByUserIdRaw).toHaveBeenCalledWith('u-1');
    expect(result).toEqual({ userId: 'u-1', found: true });
  });

  it('single user not found', async () => {
    profileRepo.findByUserIdRaw.mockResolvedValueOnce(null);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ userId: 'u-x' });
    expect(result).toEqual({ userId: 'u-x', found: false });
  });

  it('uses concurrency 3', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(Function),
      3,
    );
  });
});
