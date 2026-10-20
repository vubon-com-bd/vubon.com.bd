import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { DeliveryQueue } from '@infrastructure/queues/delivery.queue';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '@infrastructure/queues/queue.constants';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

describe('DeliveryQueue', () => {
  let queue: DeliveryQueue;
  let mockService: { enqueue: jest.Mock };

  beforeEach(() => {
    mockService = { enqueue: jest.fn().mockResolvedValue('job-id') };
    queue = new DeliveryQueue(mockService as never);
  });

  it('enqueueSchedule enqueues schedule-delivery', async () => {
    await queue.enqueueSchedule({
      orderId: 'order-1',
      deliveryId: 'delivery-1',
    });
    expect(mockService.enqueue).toHaveBeenCalledWith(
      ORDER_QUEUE_NAME.DELIVERY,
      ORDER_JOB_NAME.SCHEDULE_DELIVERY,
      { orderId: 'order-1', deliveryId: 'delivery-1' },
      {
        priority: QUEUE_PRIORITY.HIGH,
        delayMs: undefined,
        jobId: 'schedule-delivery:delivery-1',
      },
    );
  });

  it('enqueueTrack enqueues to TRACKING queue', async () => {
    await queue.enqueueTrack({
      trackingNumber: 'TRK-1',
      orderId: 'order-1',
    });
    const call = mockService.enqueue.mock.calls[0];
    expect(call[0]).toBe(ORDER_QUEUE_NAME.TRACKING);
    expect(call[1]).toBe(ORDER_JOB_NAME.TRACK_DELIVERY);
    expect(call[2]).toEqual({ trackingNumber: 'TRK-1', orderId: 'order-1' });
  });
});
