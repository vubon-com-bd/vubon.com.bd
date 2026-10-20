import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { NotificationQueue } from '@infrastructure/queues/notification.queue';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '@infrastructure/queues/queue.constants';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

describe('NotificationQueue', () => {
  let queue: NotificationQueue;
  let mockService: { enqueue: jest.Mock };

  beforeEach(() => {
    mockService = { enqueue: jest.fn().mockResolvedValue('job-id') };
    queue = new NotificationQueue(mockService as never);
  });

  it('enqueue sends notification with correct payload', async () => {
    await queue.enqueue({
      userId: 'user-1',
      orderId: 'order-1',
      template: 'order_confirmed',
      data: { orderNumber: 'ORD-1' },
    });
    expect(mockService.enqueue).toHaveBeenCalledWith(
      ORDER_QUEUE_NAME.NOTIFICATION,
      ORDER_JOB_NAME.SEND_NOTIFICATION,
      {
        userId: 'user-1',
        orderId: 'order-1',
        template: 'order_confirmed',
        data: { orderNumber: 'ORD-1' },
      },
      {
        priority: QUEUE_PRIORITY.NORMAL,
        delayMs: undefined,
        jobId: 'notify:order-1:order_confirmed',
      },
    );
  });

  it('enqueue accepts delayMs', async () => {
    await queue.enqueue(
      { userId: 'u', orderId: 'o', template: 't' },
      3000,
    );
    const call = mockService.enqueue.mock.calls[0][3] as { delayMs: number };
    expect(call.delayMs).toBe(3000);
  });
});
