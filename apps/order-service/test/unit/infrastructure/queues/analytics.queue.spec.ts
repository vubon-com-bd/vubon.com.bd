import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AnalyticsQueue } from '@infrastructure/queues/analytics.queue';
import { ORDER_QUEUE_NAME, ORDER_JOB_NAME } from '@infrastructure/queues/queue.constants';
import { QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

describe('AnalyticsQueue', () => {
  let queue: AnalyticsQueue;
  let mockService: { enqueue: jest.Mock };

  beforeEach(() => {
    mockService = { enqueue: jest.fn().mockResolvedValue('job-id') };
    queue = new AnalyticsQueue(mockService as never);
  });

  it('enqueue sends analytics event', async () => {
    await queue.enqueue({
      orderId: 'order-1',
      event: 'order.created',
      data: { amount: 100 },
    });
    const call = mockService.enqueue.mock.calls[0];
    expect(call[0]).toBe(ORDER_QUEUE_NAME.ANALYTICS);
    expect(call[1]).toBe(ORDER_JOB_NAME.UPDATE_ANALYTICS);
    expect(call[2]).toEqual({
      orderId: 'order-1',
      event: 'order.created',
      data: { amount: 100 },
    });
    const opts = call[3] as { priority: number; jobId: string };
    expect(opts.priority).toBe(QUEUE_PRIORITY.BACKGROUND);
    expect(opts.jobId).toContain('analytics:order.created:order-1:');
  });
});
