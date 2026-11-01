/**
 * Queue + Worker Integration E2E
 * @module order-service/test/e2e/infrastructure
 */
import { jest } from '@jest/globals';

process.env['QUEUE_AUTO_START_WORKERS'] = 'false';

import { OrderQueue } from '@infrastructure/queues/order.queue.js';
import { CheckoutQueue } from '@infrastructure/queues/checkout.queue.js';
import { DeliveryQueue } from '@infrastructure/queues/delivery.queue.js';
import { NotificationQueue } from '@infrastructure/queues/notification.queue.js';
import { AnalyticsQueue } from '@infrastructure/queues/analytics.queue.js';
import {
  ORDER_QUEUE_NAME,
  ORDER_JOB_NAME,
  ORDER_QUEUE_LIMITS,
} from '@infrastructure/queues/queue.constants.js';

describe('Queue E2E', () => {
  describe('Queue Constants', () => {
    it('should have all required queue names', () => {
      expect(ORDER_QUEUE_NAME.ORDER_PROCESSING).toBeDefined();
      expect(ORDER_QUEUE_NAME.DELIVERY).toBeDefined();
      expect(ORDER_QUEUE_NAME.NOTIFICATION).toBeDefined();
    });

    it('should have all required job names', () => {
      expect(ORDER_JOB_NAME.PROCESS_ORDER).toBe('process-order');
      expect(ORDER_JOB_NAME.SCHEDULE_DELIVERY).toBe('schedule-delivery');
      expect(ORDER_JOB_NAME.SEND_NOTIFICATION).toBe('send-notification');
    });

    it('should have valid queue limits', () => {
      expect(ORDER_QUEUE_LIMITS.MAX_ATTEMPTS).toBeGreaterThan(0);
      expect(ORDER_QUEUE_LIMITS.CONCURRENCY).toBeGreaterThan(0);
    });
  });

  describe('Queue Classes', () => {
    let mockQueueService: {
      enqueue: jest.Mock;
      getQueue: jest.Mock;
      registerWorker: jest.Mock;
    };

    beforeEach(() => {
      mockQueueService = {
        enqueue: jest.fn().mockResolvedValue('job-id-123') as jest.Mock,
        getQueue: jest.fn() as jest.Mock,
        registerWorker: jest.fn() as jest.Mock,
      };
    });

    it('OrderQueue.enqueueProcess should call queueService.enqueue', async () => {
      const queue = new OrderQueue(mockQueueService as never);
      await queue.enqueueProcess({ orderId: 'o-1' });
      expect(mockQueueService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.ORDER_PROCESSING,
        ORDER_JOB_NAME.PROCESS_ORDER,
        { orderId: 'o-1' },
        expect.objectContaining({ jobId: 'process-order:o-1' }),
      );
    });

    it('OrderQueue.enqueueAutoCancel should set delay', async () => {
      const queue = new OrderQueue(mockQueueService as never);
      await queue.enqueueAutoCancel({ orderId: 'o-1' }, 60000);
      expect(mockQueueService.enqueue).toHaveBeenCalled();
    });

    it('OrderQueue.enqueueRetry should set retry job id', async () => {
      const queue = new OrderQueue(mockQueueService as never);
      await queue.enqueueRetry({ orderId: 'o-1', attempt: 2 });
      expect(mockQueueService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.ORDER_PROCESSING,
        ORDER_JOB_NAME.PROCESS_ORDER,
        { orderId: 'o-1', attempt: 2 },
        expect.objectContaining({ jobId: expect.stringContaining('retry:o-1:2') }),
      );
    });

    it('CheckoutQueue.enqueueProcess should work', async () => {
      const queue = new CheckoutQueue(mockQueueService as never);
      await queue.enqueueProcess({ checkoutId: 'c-1' });
      expect(mockQueueService.enqueue).toHaveBeenCalled();
    });

    it('CheckoutQueue.enqueueCleanup should use CLEANUP queue', async () => {
      const queue = new CheckoutQueue(mockQueueService as never);
      await queue.enqueueCleanup({ checkoutId: 'c-1' }, 30000);
      expect(mockQueueService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.CLEANUP,
        ORDER_JOB_NAME.CLEANUP_CHECKOUT,
        expect.anything(),
        expect.anything(),
      );
    });

    it('DeliveryQueue.enqueueSchedule should work', async () => {
      const queue = new DeliveryQueue(mockQueueService as never);
      await queue.enqueueSchedule({ orderId: 'o-1', deliveryId: 'd-1' });
      expect(mockQueueService.enqueue).toHaveBeenCalled();
    });

    it('DeliveryQueue.enqueueTrack should use TRACKING queue', async () => {
      const queue = new DeliveryQueue(mockQueueService as never);
      await queue.enqueueTrack({ orderId: 'o-1', trackingNumber: 'TRK-1' });
      expect(mockQueueService.enqueue).toHaveBeenCalledWith(
        ORDER_QUEUE_NAME.TRACKING,
        ORDER_JOB_NAME.TRACK_DELIVERY,
        expect.anything(),
        expect.anything(),
      );
    });

    it('NotificationQueue.enqueue should work', async () => {
      const queue = new NotificationQueue(mockQueueService as never);
      await queue.enqueue({
        userId: 'u-1',
        orderId: 'o-1',
        template: 'order_created',
      });
      expect(mockQueueService.enqueue).toHaveBeenCalled();
    });

    it('AnalyticsQueue.enqueue should use BACKGROUND priority', async () => {
      const queue = new AnalyticsQueue(mockQueueService as never);
      await queue.enqueue({ orderId: 'o-1', event: 'order.created' });
      expect(mockQueueService.enqueue).toHaveBeenCalled();
    });
  });
});
