/**
 * MockQueueService — fake enqueue/registerWorker for queue/worker tests
 * @module identity-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

export interface EnqueuedJob {
  queue: string;
  job: string;
  payload: unknown;
  options?: unknown;
}

export interface RegisteredWorker {
  queue: string;
  processor: unknown;
  concurrency: number;
}

export interface MockQueueService {
  enqueue: jest.Mock;
  registerWorker: jest.Mock;
  getQueue: jest.Mock;
  __enqueued: EnqueuedJob[];
  __registeredWorkers: RegisteredWorker[];
  __clear: () => void;
}

export function makeMockQueueService(): MockQueueService {
  const enqueued: EnqueuedJob[] = [];
  const registeredWorkers: RegisteredWorker[] = [];

  return {
    enqueue: jest.fn(
      async (queue: string, job: string, payload: unknown, options?: unknown): Promise<string> => {
        enqueued.push({ queue, job, payload, options });
        return `job-${enqueued.length}`;
      },
    ),
    registerWorker: jest.fn(
      (queue: string, processor: unknown, concurrency: number): void => {
        registeredWorkers.push({ queue, processor, concurrency });
      },
    ),
    getQueue: jest.fn((name: string) => ({ name })),
    __enqueued: enqueued,
    __registeredWorkers: registeredWorkers,
    __clear: () => {
      enqueued.length = 0;
      registeredWorkers.length = 0;
    },
  };
}

export type MockQueue = ReturnType<typeof makeMockQueueService>;
