/**
 * PriceSyncWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { PriceSyncWorker } from '@infrastructure/workers/price-sync.worker.js';
import { CART_QUEUE_NAME } from '@infrastructure/queues/queue.constants.js';
import { TEST_IDS } from '@fixtures/index';
import { makeMockQueueService, type MockQueueService } from '@test-infra/index';

describe('PriceSyncWorker', () => {
  let queueService: MockQueueService;
  let worker: PriceSyncWorker;
  let itemRepo: {
    findByCartId: jest.Mock;
  };

  beforeEach(() => {
    queueService = makeMockQueueService();
    itemRepo = {
      findByCartId: jest.fn(async () => []),
    };
    worker = new PriceSyncWorker(queueService as never, itemRepo as never);
  });

  it('should register worker', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      CART_QUEUE_NAME.CART_PRICE_SYNC,
      expect.any(Function),
      expect.any(Number),
    );
  });

  describe('handle()', () => {
    it('should process empty cart', async () => {
      itemRepo.findByCartId.mockResolvedValue([]);
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({
        cartId: TEST_IDS.CART_ID,
        productIds: [],
      });

      expect(result).toEqual({ changed: 0, unchanged: 0 });
    });

    it('should call findByCartId', async () => {
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      await processor({ cartId: TEST_IDS.CART_ID, productIds: [] });

      expect(itemRepo.findByCartId).toHaveBeenCalledWith(TEST_IDS.CART_ID);
    });
  });
});
