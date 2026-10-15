/**
 * Queue mock fixtures
 * @module cart-service/test/fixtures/infrastructure
 *
 * Mock for kernel QueueService — records enqueued jobs + workers.
 */
import { jest } from '@jest/globals';

export interface EnqueuedJob {
  readonly queueName: string;
  readonly jobName: string;
  readonly payload: unknown;
  readonly options?: {
    readonly priority?: number;
    readonly delayMs?: number;
    readonly jobId?: string;
  };
}

export type MockQueueService = {
  enqueue: jest.Mock;
  registerWorker: jest.Mock;
  getQueue: jest.Mock;
  jobs: EnqueuedJob[];
  workers: Array<{
    readonly queueName: string;
    readonly processor: unknown;
    readonly concurrency: number;
  }>;
};

/**
 * In-memory queue mock.
 *
 *  - `enqueue()` records to `jobs` and returns a fake job id.
 *  - `registerWorker()` records to `workers`.
 *
 * Tests can call `mock.workers[0].processor(payload)` to trigger the worker.
 */
export function makeMockQueueService(): MockQueueService {
  const jobs: EnqueuedJob[] = [];
  const workers: MockQueueService['workers'] = [];

  const enqueue = jest.fn(
    async (
      queueName: string,
      jobName: string,
      payload: unknown,
      options?: EnqueuedJob['options'],
    ): Promise<string> => {
      jobs.push({ queueName, jobName, payload, options });
      return `${queueName}:${jobName}:${jobs.length}`;
    },
  );

  const registerWorker = jest.fn(
    (
      queueName: string,
      processor: unknown,
      concurrency: number,
    ): void => {
      workers.push({ queueName, processor, concurrency });
    },
  );

  return {
    jobs,
    workers,
    enqueue,
    registerWorker,
    getQueue: jest.fn(),
  };
}
