/**
 * AnalyticsProcessorWorker — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { AnalyticsProcessorWorker } from '@infrastructure/workers/analytics-processor.worker.js';
import { CART_QUEUE_NAME } from '@infrastructure/queues/queue.constants.js';
import { TEST_IDS } from '@fixtures/index';
import { makeMockQueueService, type MockQueueService } from '@test-infra/index';

describe('AnalyticsProcessorWorker', () => {
  let queueService: MockQueueService;
  let worker: AnalyticsProcessorWorker;

  beforeEach(() => {
    queueService = makeMockQueueService();
    worker = new AnalyticsProcessorWorker(queueService as never);
  });

  it('should register worker', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalledWith(
      CART_QUEUE_NAME.CART_ANALYTICS,
      expect.any(Function),
      expect.any(Number),
    );
  });

  describe('handle()', () => {
    it('should process analytics event', async () => {
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({
        eventName: 'cart.created',
        aggregateId: TEST_IDS.CART_ID,
        data: { type: 'user' },
      });
      expect(result).toEqual({ recorded: true });
    });

    it('should handle empty data', async () => {
      worker.onModuleInit();
      const processor = queueService.workers[0]?.processor as (p: unknown) => Promise<unknown>;
      const result = await processor({
        eventName: 'cart.created',
        aggregateId: TEST_IDS.CART_ID,
        data: {},
      });
      expect(result).toEqual({ recorded: true });
    });
  });
});
