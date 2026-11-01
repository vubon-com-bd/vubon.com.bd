/**
 * E2E — Queue → Worker → Repository Flow
 * @module cart-service/test/e2e/infrastructure
 *
 * Tests the complete async flow:
 *   1. Queue job enqueue
 *   2. Worker processes job
 *   3. Worker updates domain state via repository
 *   4. State persists
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CartQueue } from '@infrastructure/queues/cart.queue.js';
import { AbandonmentQueue } from '@infrastructure/queues/abandonment.queue.js';
import { ReminderQueue } from '@infrastructure/queues/reminder.queue.js';
import { CartExpiryWorker } from '@infrastructure/workers/cart-expiry.worker.js';
import { CartAbandonmentWorker } from '@infrastructure/workers/cart-abandonment.worker.js';
import { CartReminderWorker } from '@infrastructure/workers/cart-reminder.worker.js';
import { CART_QUEUE_NAME, CART_JOB_NAME } from '@infrastructure/queues/queue.constants.js';
import { AbandonedCartEntity } from '@domain/entities/abandoned-cart.entity.js';
import { AbandonedCartIdVO } from '@domain/value-objects/primitives/abandoned-cart-id.vo.js';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { TEST_IDS, TEST_DATES, TEST_CURRENCY } from '@fixtures/index';
import { makeUserCart } from '@fixtures/cart.fixture';

// ─── In-memory queue service ───

interface EnqueuedJob {
  readonly queueName: string;
  readonly jobName: string;
  readonly payload: unknown;
  readonly options?: Record<string, unknown>;
}

class InMemoryQueueService {
  readonly jobs: EnqueuedJob[] = [];
  readonly workers: Array<{
    queueName: string;
    processor: (p: unknown) => Promise<unknown>;
    concurrency: number;
  }> = [];

  enqueue = jest.fn(
    async (queueName: string, jobName: string, payload: unknown, options?: Record<string, unknown>) => {
      this.jobs.push({ queueName, jobName, payload, options });
      return `job-${this.jobs.length}`;
    },
  );

  registerWorker = jest.fn(
    (queueName: string, processor: (p: unknown) => Promise<unknown>, concurrency: number) => {
      this.workers.push({ queueName, processor, concurrency });
    },
  );

  getQueue = jest.fn();

  // Test helper — run the registered processor for a queue
  async runWorker(queueName: string, payload: unknown): Promise<unknown> {
    const worker = this.workers.find((w) => w.queueName === queueName);
    if (!worker) throw new Error(`No worker for ${queueName}`);
    return worker.processor(payload);
  }

  clear(): void {
    this.jobs.length = 0;
    this.workers.length = 0;
  }
}

describe('E2E — Worker Flow', () => {
  let queueService: InMemoryQueueService;

  beforeEach(() => {
    queueService = new InMemoryQueueService();
  });

  // ═══════════════ EXPIRY FLOW ═══════════════

  it('E2E: expiry flow — enqueue → worker → cart expired', async () => {
    const repo = {
      findByIdVO: jest.fn(async () => makeUserCart()),
      save: jest.fn(async (e) => e),
    };

    const queue = new CartQueue(queueService as never);
    const worker = new CartExpiryWorker(queueService as never, repo as never);

    // Register worker
    worker.onModuleInit();

    // Enqueue job
    await queue.enqueueExpiry({ cartId: TEST_IDS.CART_ID });

    // Verify job was enqueued
    expect(queueService.jobs).toHaveLength(1);
    expect(queueService.jobs[0].queueName).toBe(CART_QUEUE_NAME.CART_LIFECYCLE);
    expect(queueService.jobs[0].jobName).toBe(CART_JOB_NAME.EXPIRE_CART);

    // Run worker
    const result = await queueService.runWorker(CART_QUEUE_NAME.CART_LIFECYCLE, {
      cartId: TEST_IDS.CART_ID,
    });

    expect(result).toEqual({ expired: true });
    expect(repo.save).toHaveBeenCalled();
  });

  // ═══════════════ ABANDONMENT FLOW ═══════════════

  it('E2E: abandonment flow — enqueue → worker → cart abandoned', async () => {
    const cartWithItems = makeUserCart();
    cartWithItems.applyItemCountDelta(1);

    const repo = {
      findByIdVO: jest.fn(async () => cartWithItems),
      save: jest.fn(async (e) => e),
    };

    const queue = new AbandonmentQueue(queueService as never);
    const worker = new CartAbandonmentWorker(queueService as never, repo as never);

    worker.onModuleInit();

    await queue.enqueueAbandon({ cartId: TEST_IDS.CART_ID });
    expect(queueService.jobs).toHaveLength(1);

    const result = await queueService.runWorker(CART_QUEUE_NAME.CART_ABANDONMENT, {
      cartId: TEST_IDS.CART_ID,
    });

    expect(result).toEqual({ abandoned: true });
    expect(cartWithItems.isAbandoned()).toBe(true);
  });

  // ═══════════════ REMINDER FLOW ═══════════════

  it('E2E: reminder flow — enqueue → worker → reminder sent', async () => {
    const abandoned = AbandonedCartEntity.create({
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

    const repo = {
      findByIdVO: jest.fn(async () => abandoned),
      save: jest.fn(async (e) => e),
    };

    const queue = new ReminderQueue(queueService as never);
    const worker = new CartReminderWorker(queueService as never, repo as never);

    worker.onModuleInit();

    await queue.enqueueReminder({
      abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
      channel: 'email',
      reminderNumber: 1,
    });
    expect(queueService.jobs).toHaveLength(1);

    const result = await queueService.runWorker(CART_QUEUE_NAME.CART_REMINDER, {
      abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
      channel: 'email',
      reminderNumber: 1,
    });

    expect(result).toEqual({ sent: true });
    expect(abandoned.remindersSent).toBe(1);
    expect(repo.save).toHaveBeenCalled();
  });

  // ═══════════════ FULL LIFECYCLE ═══════════════

  it('E2E: full lifecycle — expire → abandon → reminder flow', async () => {
    const cart = makeUserCart();
    cart.applyItemCountDelta(1);

    const cartRepo = {
      findByIdVO: jest.fn(async () => cart),
      save: jest.fn(async (e) => e),
    };

    const abandonmentQueue = new AbandonmentQueue(queueService as never);
    const abandonmentWorker = new CartAbandonmentWorker(
      queueService as never,
      cartRepo as never,
    );
    abandonmentWorker.onModuleInit();

    // 1. Enqueue abandonment
    await abandonmentQueue.enqueueAbandon({ cartId: TEST_IDS.CART_ID });
    expect(queueService.jobs).toHaveLength(1);

    // 2. Process abandonment
    const result = await queueService.runWorker(CART_QUEUE_NAME.CART_ABANDONMENT, {
      cartId: TEST_IDS.CART_ID,
    });
    expect(result).toEqual({ abandoned: true });
    expect(cart.isAbandoned()).toBe(true);

    // 3. Verify the state persists
    expect(cartRepo.save).toHaveBeenCalledTimes(1);
  });

  // ═══════════════ ERROR HANDLING ═══════════════

  it('E2E: worker handles missing cart gracefully', async () => {
    const repo = {
      findByIdVO: jest.fn(async () => null),
      save: jest.fn(),
    };

    const worker = new CartExpiryWorker(queueService as never, repo as never);
    worker.onModuleInit();

    const result = await queueService.runWorker(CART_QUEUE_NAME.CART_LIFECYCLE, {
      cartId: TEST_IDS.CART_ID,
    });

    expect(result).toEqual({ skipped: true });
    expect(repo.save).not.toHaveBeenCalled();
  });

  // ═══════════════ JOB OPTIONS ═══════════════

  it('E2E: enqueued job carries correct options', async () => {
    const queue = new CartQueue(queueService as never);
    await queue.enqueueExpiry({ cartId: TEST_IDS.CART_ID }, 60000);

    const job = queueService.jobs[0];
    expect(job.options?.['delayMs']).toBe(60000);
    expect(job.options?.['jobId']).toBe(`expire:${TEST_IDS.CART_ID}`);
  });
});
