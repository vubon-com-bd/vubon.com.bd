/**
 * Queue Mock — for worker + queue tests
 * @module payment-service/test/fixtures/infrastructure
 */
import { jest } from '@jest/globals';

export function makeMockQueueService() {
  return {
    enqueue: jest.fn().mockResolvedValue('mock-job-id'),
    registerWorker: jest.fn(),
    getQueue: jest.fn(),
    onModuleDestroy: jest.fn().mockResolvedValue(undefined),
  };
}

export type MockQueueService = ReturnType<typeof makeMockQueueService>;
