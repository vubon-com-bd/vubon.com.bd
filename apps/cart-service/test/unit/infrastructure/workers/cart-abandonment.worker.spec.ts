/**
 * CartAbandonmentWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartAbandonmentWorker } from '@infrastructure/workers/cart-abandonment.worker.js';
import { CART_QUEUE_NAME } from '@infrastructure/queues/queue.constants.js';
import { TEST_IDS } from '@fixtures/index';
import { makeUserCart } from '@fixtures/cart.fixture';
import { makeMockQueueService, type MockQueueService } from '@test-infra/index';

describe('CartAbandonmentWorker', () => {
  let queueService: MockQueueService;
  let worker: CartAbandonmentWorker;
  let repo: {
    findByIdVO: jest.Mock;
    save: jest.Mock;
  };

  beforeEach(() => {
    queueService = makeMockQueueService();
    repo = {
      findByIdVO: jest.fn(),
      save: jest.fn(async (e) => e),
    };
    worker = new CartAbandonmentWorker(queueService as never, repo as never);
  });

  it('should register worker', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      CART_QUEUE_NAME.CART_ABANDONMENT,
      expect.any(Function),
      expect.any(Number),
    );
  });

  describe('handle()', () => {
    it('should abandon a cart with items', async () => {
      const cart = makeUserCart();
      cart.applyItemCountDelta(1); // add an item so it's abandonable
      repo.findByIdVO.mockResolvedValue(cart);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({ cartId: TEST_IDS.CART_ID });

      expect(cart.isAbandoned()).toBe(true);
      expect(result).toEqual({ abandoned: true });
    });

    it('should skip when cart not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({ cartId: TEST_IDS.CART_ID });
      expect(result).toEqual({ skipped: true });
    });

    it('should skip empty carts (cannot abandon)', async () => {
      const cart = makeUserCart(); // empty by default
      repo.findByIdVO.mockResolvedValue(cart);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({ cartId: TEST_IDS.CART_ID });

      expect(result).toMatchObject({ skipped: true });
    });
  });
});
