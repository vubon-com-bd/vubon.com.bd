/**
 * ReconciliationWorker — Unit Tests
 */
import { describe, it, expect, beforeEach } from '@jest/globals';
import { ReconciliationWorker } from '@infrastructure/workers/reconciliation.worker';
import { makeMockQueueService } from '@test-infra/queue-mock';

describe('ReconciliationWorker', () => {
  let worker: ReconciliationWorker;
  let queue: ReturnType<typeof makeMockQueueService>;

  beforeEach(() => {
    queue = makeMockQueueService();
    worker = new ReconciliationWorker(queue as never);
  });

  it('registers worker on init', () => {
    worker.onModuleInit();
    expect(queue.registerWorker).toHaveBeenCalled();
  });

  it('handles a reconciliation sweep', async () => {
    const result = await (worker as unknown as {
      handle: (p: { fromDate: string; toDate: string }) => Promise<unknown>;
    }).handle({
      fromDate: '2025-01-01',
      toDate: '2025-01-31',
    });
    expect(result).toEqual({ reconciled: true });
  });
});
