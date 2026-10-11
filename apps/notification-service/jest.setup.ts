import 'reflect-metadata';
import { jest } from '@jest/globals';

jest.setTimeout(45000);

// Mock @nestjs/bullmq so e2e tests don't try to connect to real Redis
jest.mock('@nestjs/bullmq', () => ({
  BullModule: {
    forRoot: jest.fn(() => ({
      module: class MockBullRoot {},
      global: true,
      providers: [],
      exports: [],
    })),
    registerQueue: jest.fn(() => ({
      module: class MockBullQueue {},
      providers: [],
      exports: [],
    })),
  },
  Processor: () => () => undefined,
  WorkerHost: class MockWorkerHost {
    async process(): Promise<unknown> {
      return undefined;
    }
  },
  OnWorkerEvent: () => () => undefined,
}));

beforeAll(() => {
  process.env.LOG_LEVEL = 'error';
  process.env.NODE_ENV = 'test';
  process.env.REDIS_URL = 'redis://localhost:6379';
});
