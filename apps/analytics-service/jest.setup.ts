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

// Mock kafkajs so tests don't try to connect to real Kafka
jest.mock('kafkajs', () => {
  const mockProducer = {
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
    send: jest.fn().mockResolvedValue(undefined),
    sendBatch: jest.fn().mockResolvedValue(undefined),
  };

  const mockConsumer = {
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn().mockResolvedValue(undefined),
    subscribe: jest.fn().mockResolvedValue(undefined),
    run: jest.fn().mockResolvedValue(undefined),
    pause: jest.fn(),
    resume: jest.fn(),
  };

  return {
    Kafka: jest.fn().mockImplementation(() => ({
      producer: jest.fn(() => mockProducer),
      consumer: jest.fn(() => mockConsumer),
      admin: jest.fn(() => ({
        connect: jest.fn().mockResolvedValue(undefined),
        disconnect: jest.fn().mockResolvedValue(undefined),
        createTopics: jest.fn().mockResolvedValue(undefined),
      })),
    })),
    Partitioners: {
      DefaultPartitioner: jest.fn(),
    },
  };
});

beforeAll(() => {
  process.env.LOG_LEVEL = 'error';
  process.env.NODE_ENV = 'test';
  process.env.REDIS_URL = 'redis://localhost:6379';
  process.env.KAFKA_BROKERS = 'localhost:9092';
});
