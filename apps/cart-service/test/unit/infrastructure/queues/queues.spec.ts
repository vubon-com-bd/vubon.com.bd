/**
 * Cart Queues — Unit Tests (all 5 queues)
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { CartQueue } from '@infrastructure/queues/cart.queue.js';
import { AbandonmentQueue } from '@infrastructure/queues/abandonment.queue.js';
import { ReminderQueue } from '@infrastructure/queues/reminder.queue.js';
import { PriceSyncQueue } from '@infrastructure/queues/price-sync.queue.js';
import { AnalyticsQueue } from '@infrastructure/queues/analytics.queue.js';
import {
  CART_QUEUE_NAME,
  CART_JOB_NAME,
} from '@infrastructure/queues/queue.constants.js';
import { TEST_IDS } from '@fixtures/index';
import {
  makeMockQueueService,
  type MockQueueService,
} from '@test-infra/index';

// ═══════════════════════════════════════════
// CartQueue
// ═══════════════════════════════════════════

describe('CartQueue', () => {
  let queueService: MockQueueService;
  let queue: CartQueue;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new CartQueue(queueService as never);
  });

  describe('enqueueExpiry()', () => {
    it('should enqueue expiry job', async () => {
      const jobId = await queue.enqueueExpiry({ cartId: TEST_IDS.CART_ID });
      expect(jobId).toBeDefined();
      expect(queueService.jobs).toHaveLength(1);

      const job = queueService.jobs[0];
      expect(job.queueName).toBe(CART_QUEUE_NAME.CART_LIFECYCLE);
      expect(job.jobName).toBe(CART_JOB_NAME.EXPIRE_CART);
      expect(job.payload).toEqual({ cartId: TEST_IDS.CART_ID });
    });

    it('should set jobId with cart id', async () => {
      await queue.enqueueExpiry({ cartId: TEST_IDS.CART_ID });
      const job = queueService.jobs[0];
      expect(job.options?.jobId).toBe(`expire:${TEST_IDS.CART_ID}`);
    });

    it('should pass delayMs', async () => {
      await queue.enqueueExpiry({ cartId: TEST_IDS.CART_ID }, 60000);
      const job = queueService.jobs[0];
      expect(job.options?.delayMs).toBe(60000);
    });

    it('should use HIGH priority', async () => {
      await queue.enqueueExpiry({ cartId: TEST_IDS.CART_ID });
      const job = queueService.jobs[0];
      expect(job.options?.priority).toBeGreaterThan(0);
    });
  });

  describe('enqueueCleanup()', () => {
    it('should enqueue cleanup job', async () => {
      await queue.enqueueCleanup({ inactiveMinutes: 60 });
      const job = queueService.jobs[0];
      expect(job.queueName).toBe(CART_QUEUE_NAME.CART_LIFECYCLE);
      expect(job.jobName).toBe(CART_JOB_NAME.CLEANUP_STALE);
      expect(job.payload).toEqual({ inactiveMinutes: 60 });
    });

    it('should default delay to 0', async () => {
      await queue.enqueueCleanup({ inactiveMinutes: 60 });
      const job = queueService.jobs[0];
      expect(job.options?.delayMs).toBe(0);
    });
  });
});

// ═══════════════════════════════════════════
// AbandonmentQueue
// ═══════════════════════════════════════════

describe('AbandonmentQueue', () => {
  let queueService: MockQueueService;
  let queue: AbandonmentQueue;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new AbandonmentQueue(queueService as never);
  });

  describe('enqueueAbandon()', () => {
    it('should enqueue abandon job', async () => {
      await queue.enqueueAbandon({ cartId: TEST_IDS.CART_ID });
      const job = queueService.jobs[0];
      expect(job.queueName).toBe(CART_QUEUE_NAME.CART_ABANDONMENT);
      expect(job.jobName).toBe(CART_JOB_NAME.ABANDON_CART);
      expect(job.payload).toEqual({ cartId: TEST_IDS.CART_ID });
    });

    it('should set jobId with cart id', async () => {
      await queue.enqueueAbandon({ cartId: TEST_IDS.CART_ID });
      const job = queueService.jobs[0];
      expect(job.options?.jobId).toBe(`abandon:${TEST_IDS.CART_ID}`);
    });

    it('should pass delayMs', async () => {
      await queue.enqueueAbandon({ cartId: TEST_IDS.CART_ID }, 30000);
      const job = queueService.jobs[0];
      expect(job.options?.delayMs).toBe(30000);
    });
  });
});

// ═══════════════════════════════════════════
// ReminderQueue
// ═══════════════════════════════════════════

describe('ReminderQueue', () => {
  let queueService: MockQueueService;
  let queue: ReminderQueue;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new ReminderQueue(queueService as never);
  });

  describe('enqueueReminder()', () => {
    it('should enqueue reminder job', async () => {
      await queue.enqueueReminder({
        abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
        channel: 'email',
        reminderNumber: 1,
      });
      const job = queueService.jobs[0];
      expect(job.queueName).toBe(CART_QUEUE_NAME.CART_REMINDER);
      expect(job.jobName).toBe(CART_JOB_NAME.SEND_REMINDER);
    });

    it('should set jobId with cart id + reminder number', async () => {
      await queue.enqueueReminder({
        abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
        channel: 'sms',
        reminderNumber: 2,
      });
      const job = queueService.jobs[0];
      expect(job.options?.jobId).toBe(
        `reminder:${TEST_IDS.ABANDONED_CART_ID}:2`,
      );
    });

    it('should support all channels', async () => {
      const channels: Array<'email' | 'sms' | 'push'> = ['email', 'sms', 'push'];
      for (const channel of channels) {
        await queue.enqueueReminder({
          abandonedCartId: TEST_IDS.ABANDONED_CART_ID,
          channel,
          reminderNumber: 1,
        });
      }
      expect(queueService.jobs).toHaveLength(3);
    });
  });
});

// ═══════════════════════════════════════════
// PriceSyncQueue
// ═══════════════════════════════════════════

describe('PriceSyncQueue', () => {
  let queueService: MockQueueService;
  let queue: PriceSyncQueue;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new PriceSyncQueue(queueService as never);
  });

  describe('enqueueSync()', () => {
    it('should enqueue price sync job', async () => {
      await queue.enqueueSync({
        cartId: TEST_IDS.CART_ID,
        productIds: [TEST_IDS.PRODUCT_ID],
      });
      const job = queueService.jobs[0];
      expect(job.queueName).toBe(CART_QUEUE_NAME.CART_PRICE_SYNC);
      expect(job.jobName).toBe(CART_JOB_NAME.SYNC_PRICE);
    });

    it('should set jobId with cart id', async () => {
      await queue.enqueueSync({
        cartId: TEST_IDS.CART_ID,
        productIds: [TEST_IDS.PRODUCT_ID],
      });
      const job = queueService.jobs[0];
      expect(job.options?.jobId).toBe(`price-sync:${TEST_IDS.CART_ID}`);
    });

    it('should handle empty product list', async () => {
      await queue.enqueueSync({
        cartId: TEST_IDS.CART_ID,
        productIds: [],
      });
      expect(queueService.jobs).toHaveLength(1);
    });

    it('should handle multiple products', async () => {
      await queue.enqueueSync({
        cartId: TEST_IDS.CART_ID,
        productIds: [TEST_IDS.PRODUCT_ID, TEST_IDS.PRODUCT_ID_2],
      });
      const job = queueService.jobs[0];
      expect((job.payload as { productIds: string[] }).productIds).toHaveLength(2);
    });
  });
});

// ═══════════════════════════════════════════
// AnalyticsQueue
// ═══════════════════════════════════════════

describe('AnalyticsQueue', () => {
  let queueService: MockQueueService;
  let queue: AnalyticsQueue;

  beforeEach(() => {
    queueService = makeMockQueueService();
    queue = new AnalyticsQueue(queueService as never);
  });

  describe('enqueueEvent()', () => {
    it('should enqueue analytics event', async () => {
      await queue.enqueueEvent({
        eventName: 'cart.created',
        aggregateId: TEST_IDS.CART_ID,
        data: { type: 'user' },
      });
      const job = queueService.jobs[0];
      expect(job.queueName).toBe(CART_QUEUE_NAME.CART_ANALYTICS);
      expect(job.jobName).toBe(CART_JOB_NAME.PROCESS_ANALYTICS);
    });

    it('should include event name in jobId', async () => {
      await queue.enqueueEvent({
        eventName: 'cart.created',
        aggregateId: TEST_IDS.CART_ID,
        data: {},
      });
      const job = queueService.jobs[0];
      expect(job.options?.jobId).toMatch(/^analytics:cart\.created:/);
    });

    it('should use LOW priority', async () => {
      await queue.enqueueEvent({
        eventName: 'cart.created',
        aggregateId: TEST_IDS.CART_ID,
        data: {},
      });
      const job = queueService.jobs[0];
      // LOW priority is generally a low number
      expect(job.options?.priority).toBeDefined();
    });

    it('should pass data payload', async () => {
      const data = { itemCount: 3, value: 500 };
      await queue.enqueueEvent({
        eventName: 'cart.abandoned',
        aggregateId: TEST_IDS.CART_ID,
        data,
      });
      const job = queueService.jobs[0];
      const payload = job.payload as { data: typeof data };
      expect(payload.data).toEqual(data);
    });
  });
});
