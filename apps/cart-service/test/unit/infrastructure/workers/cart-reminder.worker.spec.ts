/**
 * CartReminderWorker — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartReminderWorker } from '@infrastructure/workers/cart-reminder.worker.js';
import { CART_QUEUE_NAME } from '@infrastructure/queues/queue.constants.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import { makeMockQueueService, type MockQueueService } from '@test-infra/index';

function makeAbandoned(): AbandonedCartEntity {
  return AbandonedCartEntity.create({
    id: AbandonedCartIdVO.create(TEST_IDS.ABANDONED_CART_ID),
    now: TEST_DATES.NOW,
    props: {
      cartId: CartIdVO.create(TEST_IDS.CART_ID),
      itemCount: 3,
      cartValue: 500,
      currency: TEST_CURRENCY,
      abandonedAt: TEST_DATES.YESTERDAY,
      remindersSent: 0,
    },
  });
}

describe('CartReminderWorker', () => {
  let queueService: MockQueueService;
  let worker: CartReminderWorker;
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
    worker = new CartReminderWorker(queueService as never, repo as never);
  });

  it('should register worker', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      CART_QUEUE_NAME.CART_REMINDER,
      expect.any(Function),
      expect.any(Number),
    );
  });

  describe('handle()', () => {
    it('should send reminder to abandonable cart', async () => {
      const abandoned = makeAbandoned();
      repo.findByIdVO.mockResolvedValue(abandoned);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({
        abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
        channel: 'email',
        reminderNumber: 1,
      });

      expect(abandoned.remindersSent).toBe(1);
      expect(result).toEqual({ sent: true });
    });

    it('should skip when not found', async () => {
      repo.findByIdVO.mockResolvedValue(null);
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({
        abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
        channel: 'email',
        reminderNumber: 1,
      });
      expect(result).toEqual({ skipped: true });
    });

    it('should skip when cannot send reminder', async () => {
      const abandoned = makeAbandoned();
      abandoned.unsubscribe();
      repo.findByIdVO.mockResolvedValue(abandoned);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({
        abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
        channel: 'email',
        reminderNumber: 1,
      });
      expect(result).toMatchObject({ skipped: true });
    });

    it('should create AbandonedCartIdVO from payload', async () => {
      const abandoned = makeAbandoned();
      repo.findByIdVO.mockResolvedValue(abandoned);

      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      await processor({
        abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
        channel: 'email',
        reminderNumber: 1,
      });

      expect(repo.findByIdVO).toHaveBeenCalledWith(expect.any(AbandonedCartIdVO));
    });
  });
});
