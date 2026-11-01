import { describe, it, expect, beforeEach } from '@jest/globals';
import { AnalyticsProcessorWorker } from '@infrastructure/workers/analytics-processor.worker.js';
import { makeMockQueueService } from '@fixtures/index.js';

describe('AnalyticsProcessorWorker', () => {
  let worker: AnalyticsProcessorWorker;
  let queueService: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queueService = makeMockQueueService();
    worker = new AnalyticsProcessorWorker(queueService as never);
  });

  it('onModuleInit registers', () => {
    worker.onModuleInit();
    expect(queueService.registerWorker).toHaveBeenCalled();
  });
});
