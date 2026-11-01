/**
 * OrderQueue tests
 * @module order-service/test/unit/infrastructure/queues
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { OrderQueue } from '@infrastructure/queues/order.queue';
import {
  ORDER_QUEUE_NAME,
  ORDER_JOB_NAME,
  ORDER_QUEUE_LIMITS,
} from '@infrastructure/queues/queue.constants';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

describe('OrderQueue', () => {
  let queue: OrderQueue;
  let mockService: { enqueue: jest.Mock };

  beforeEach(() => {
    mockService = { enqueue: jest.fn().mockResolvedValue('job-id-1') };
    queue = new OrderQueue(mockService as never);
  });

  describe('enqueueProcess', () => {
    it('enqueues process-order job', async () => {
      const id = await queue.enqueueProcess({ orderId: 'order-1' });
      expect(id).toBe('job-id-1');
      expect(mockService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.ORDER_PROCESSING,
        ORDER_JOB_NAME.PROCESS_ORDER,
        { orderId: 'order-1' },
        {
          priority: QUEUE_PRIORITY.HIGH,
          delayMs: undefined,
          jobId: 'process-order:order-1',
        },
      );
    });

    it('accepts delayMs', async () => {
      await queue.enqueueProcess({ orderId: 'order-1' }, 5000);
      expect(mockService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.ORDER_PROCESSING,
        ORDER_JOB_NAME.PROCESS_ORDER,
        { orderId: 'order-1' },
        {
          priority: QUEUE_PRIORITY.HIGH,
          delayMs: 5000,
          jobId: 'process-order:order-1',
        },
      );
    });
  });

  describe('enqueueAutoCancel', () => {
    it('enqueues auto-cancel job with delay', async () => {
      await queue.enqueueAutoCancel({ orderId: 'order-1' }, 30 * 60 * 1000);
      expect(mockService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.ORDER_PROCESSING,
        ORDER_JOB_NAME.AUTO_CANCEL_ORDER,
        { orderId: 'order-1' },
        {
          priority: QUEUE_PRIORITY.NORMAL,
          delayMs: 30 * 60 * 1000,
          jobId: 'auto-cancel:order-1',
        },
      );
    });
  });

  describe('enqueueRetry', () => {
    it('enqueues retry with default delay', async () => {
      await queue.enqueueRetry({ orderId: 'order-1', attempt: 2 });
      expect(mockService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.ORDER_PROCESSING,
        ORDER_JOB_NAME.PROCESS_ORDER,
        { orderId: 'order-1', attempt: 2 },
        {
          priority: QUEUE_PRIORITY.NORMAL,
          delayMs: ORDER_QUEUE_LIMITS.RETRY_DELAY_MS,
          jobId: 'retry:order-1:2',
        },
      );
    });

    it('accepts custom delay', async () => {
      await queue.enqueueRetry({ orderId: 'order-1', attempt: 1 }, 1000);
      const call = mockService.enqueue.mock.calls[0][3] as { delayMs: number };
      expect(call.delayMs).toBe(1000);
    });
  });
});
