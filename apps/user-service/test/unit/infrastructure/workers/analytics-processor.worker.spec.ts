import { jest } from '@jest/globals';

import { AnalyticsProcessorWorker } from '@infrastructure/workers/analytics-processor.worker';

describe('AnalyticsProcessorWorker', () => {
  let worker: AnalyticsProcessorWorker;
  let queue: { enqueue: jest.Mock };
  let logger: { log: jest.Mock };

  beforeEach(() => {
    queue = { enqueue: jest.fn().mockResolvedValue(undefined) };
    logger = { log: jest.fn() };
    worker = new AnalyticsProcessorWorker(queue as never, logger as never);
  });

  it('should log analytics event', async () => {
    await worker.process({
      id: 'job-1',
      data: {
        userId: 'user-1',
        eventName: 'login',
        metadata: { ip: '1.2.3.4' },
      },
    });
    expect(logger.log).toHaveBeenCalled();
  });

  it('enqueue delegates to queue', async () => {
    await worker.enqueue('user-1', 'signup', { source: 'web' });
    expect(queue.enqueue).toHaveBeenCalledWith({
      userId: 'user-1',
      eventName: 'signup',
      metadata: { source: 'web' },
    });
  });
});
