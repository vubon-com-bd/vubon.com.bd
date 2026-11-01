import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { CheckoutQueue } from '@infrastructure/queues/checkout.queue';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '@infrastructure/queues/queue.constants';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

describe('CheckoutQueue', () => {
  let queue: CheckoutQueue;
  let mockService: { enqueue: jest.Mock };

  beforeEach(() => {
    mockService = { enqueue: jest.fn().mockResolvedValue('job-id') };
    queue = new CheckoutQueue(mockService as never);
  });

  it('enqueueProcess enqueues process-checkout', async () => {
    await queue.enqueueProcess({ checkoutId: 'checkout-1' });
    expect(mockService.enqueue).toHaveBeenCalledWith(
      ORDER_QUEUE_NAME.ORDER_PROCESSING,
      ORDER_JOB_NAME.PROCESS_CHECKOUT,
      { checkoutId: 'checkout-1' },
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs: undefined,
        jobId: 'process-checkout:checkout-1',
      },
    );
  });

  it('enqueueCleanup enqueues to CLEANUP queue', async () => {
    await queue.enqueueCleanup({ checkoutId: 'checkout-1' }, 10000);
    expect(mockService.enqueue).toHaveBeenCalledWith(
      ORDER_QUEUE_NAME.CLEANUP,
      ORDER_JOB_NAME.CLEANUP_CHECKOUT,
      { checkoutId: 'checkout-1' },
      {
        priority: QUEUE_PRIORITY.LOW,
        delayMs: 10000,
        jobId: 'cleanup-checkout:checkout-1',
      },
    );
  });
});
