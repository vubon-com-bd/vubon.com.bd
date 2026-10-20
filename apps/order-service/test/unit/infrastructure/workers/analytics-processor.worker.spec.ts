import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { AnalyticsProcessorWorker } from '@infrastructure/workers/analytics-processor.worker';

describe('AnalyticsProcessorWorker', () => {
  let worker: AnalyticsProcessorWorker;
  let mockQueue: { registerWorker: jest.Mock };

  beforeEach(() => {
    mockQueue = { registerWorker: jest.fn() };
    worker = new AnalyticsProcessorWorker(mockQueue as never);
  });

  type HandleFn = (payload: {
    orderId: string;
    event: string;
    data?: Record<string, unknown>;
  }) => Promise<unknown>;

  it('accepts analytics event', async () => {
    const handle = (worker as unknown as { handle: HandleFn }).handle.bind(worker);
    const result = await handle({
      orderId: 'order-1',
      event: 'order.created',
      data: { amount: 100 },
    });
    expect(result).toEqual({ accepted: true, event: 'order.created' });
  });

  it('concurrency is 10', () => {
    const c = (worker as unknown as { concurrency: () => number }).concurrency.bind(worker);
    expect(c()).toBe(10);
  });

  it('queue name is analytics', () => {
    const qn = (worker as unknown as { queueName: string }).queueName;
    expect(qn).toBe('analytics');
  });
});
