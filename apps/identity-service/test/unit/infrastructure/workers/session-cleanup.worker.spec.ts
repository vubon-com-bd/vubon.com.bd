/**
 * SessionCleanupWorker unit tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { SessionCleanupWorker } from '@infrastructure/workers/session-cleanup.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('SessionCleanupWorker', () => {
  let worker: SessionCleanupWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;
  let sessionRepo: { findExpired: jest.Mock; save: jest.Mock };

  beforeEach(() => {
    queueService = makeMockQueueService();
    sessionRepo = { findExpired: jest.fn(), save: jest.fn() };
    worker = new SessionCleanupWorker(queueService as never, sessionRepo as never);
  });

  it('onModuleInit registers worker', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });

  it('processes expired sessions', async () => {
    const mockSession = {
      id: 's-1',
      expire: jest.fn(),
    };
    sessionRepo.findExpired.mockResolvedValueOnce([mockSession]);
    sessionRepo.save.mockResolvedValueOnce(mockSession);

    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ olderThanHours: 24 });

    expect(mockSession.expire).toHaveBeenCalled();
    expect(sessionRepo.save).toHaveBeenCalledWith(mockSession);
    expect(result).toEqual({ cleaned: 1 });
  });

  it('handles empty list', async () => {
    sessionRepo.findExpired.mockResolvedValueOnce([]);
    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ olderThanHours: 24 });
    expect(result).toEqual({ cleaned: 0 });
  });

  it('continues on per-session error', async () => {
    const bad = { id: 's-1', expire: jest.fn(() => { throw new Error('boom'); }) };
    const good = { id: 's-2', expire: jest.fn() };
    sessionRepo.findExpired.mockResolvedValueOnce([bad, good]);
    sessionRepo.save.mockResolvedValueOnce(good);

    worker.onModuleInit();
    const processor = queueService.__registeredWorkers[0].processor as (p: unknown) => Promise<unknown>;
    const result = await processor({ olderThanHours: 24 });
    expect(result).toEqual({ cleaned: 1 });
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
