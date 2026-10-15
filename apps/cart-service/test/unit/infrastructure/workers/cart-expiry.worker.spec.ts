/**
 * CartExpiryWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartExpiryWorker } from '@infrastructure/workers/cart-expiry.worker.js';
import { CART_QUEUE_NAME } from '@infrastructure/queues/queue.constants.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS } from '@fixtures/index';
import { makeUserCart } from '@fixtures/cart.fixture';
import { makeMockQueueService, type MockQueueService } from '@test-infra/index';

describe('CartExpiryWorker', () => {
  let queueService: MockQueueService;
  let worker: CartExpiryWorker;
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
    worker = new CartExpiryWorker(queueService as never, repo as never);
  });

  describe('onModuleInit()', () => {
    it('should register worker on module init', () => {
      worker.onModuleInit();
      expect(queueService.registerWorker).toHaveBeenCalledWith(
        CART_QUEUE_NAME.CART_LIFECYCLE,
        expect.any(Function),
        expect.any(Number),
      );
    });
  });

  describe('handle()', () => {
    it('should expire an active cart', async () => {
      const cart = makeUserCart();
      repo.findByIdVO.mockResolvedValue(cart);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({ cartId: TEST_IDS.CART_ID });

      expect(cart.isExpired()).toBe(true);
      expect(repo.save).toHaveBeenCalled();
      expect(result).toEqual({ expired: true });
    });

    it('should skip when cart not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({ cartId: TEST_IDS.CART_ID });

      expect(result).toEqual({ skipped: true });
      expect(repo.save).not.toHaveBeenCalled();
    });

    it('should skip already-final carts', async () => {
      const cart = makeUserCart();
      cart.clear(); // makes it final
      repo.findByIdVO.mockResolvedValue(cart);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({ cartId: TEST_IDS.CART_ID });

      expect(result).toEqual({ skipped: true, reason: 'already final' });
    });

    it('should create CartIdVO from payload', async () => {
      const cart = makeUserCart();
      repo.findByIdVO.mockResolvedValue(cart);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      await processor({ cartId: TEST_IDS.CART_ID });

      expect(repo.findByIdVO).toHaveBeenCalledWith(expect.any(CartIdVO));
    });
  });
});
