/**
 * CartCleanupWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartCleanupWorker } from '@infrastructure/workers/cart-cleanup.worker.js';
import { CART_QUEUE_NAME } from '@infrastructure/queues/queue.constants.js';
import { makeMockQueueService, type MockQueueService } from '@test-infra/index';

describe('CartCleanupWorker', () => {
  let queueService: MockQueueService;
  let worker: CartCleanupWorker;
  let repo: {
    findStale: jest.Mock;
  };

  beforeEach(() => {
    queueService = makeMockQueueService();
    repo = {
      findStale: jest.fn(async () => []),
    };
    worker = new CartCleanupWorker(queueService as never, repo as never);
  });

  it('should register worker', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      CART_QUEUE_NAME.CART_LIFECYCLE,
      expect.any(Function),
      expect.any(Number),
    );
  });

  describe('handle()', () => {
    it('should return count of stale carts', async () => {
      repo.findStale.mockResolvedValue([]);
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({ inactiveMinutes: 60 });
      expect(result).toEqual({ cleaned: 0 });
    });

    it('should call findStale with inactiveMinutes', async () => {
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      await processor({ inactiveMinutes: 120 });
      expect(repo.findStale).toHaveBeenCalledWith(120);
    });
  });
});
