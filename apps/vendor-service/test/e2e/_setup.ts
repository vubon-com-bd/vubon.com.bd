process.env.NODE_ENV = 'test';

/**
 * E2E Test Setup — creates test Nest app with mocked infrastructure
 * @module vendor-service/test/e2e
 */
import { jest } from '@jest/globals';

// Mock @nestjs/bullmq globally BEFORE any module imports
jest.mock('@nestjs/bullmq', () => {
  const noop = () => () => undefined;
  const MockBullQueue = class MockBullQueue {};
  return {
    BullModule: {
      forRoot: jest.fn(() => ({
        module: class MockBullRoot {},
        global: true,
        providers: [],
        exports: [],
      })),
      registerQueue: jest.fn(() => ({
        module: MockBullQueue,
        providers: [],
        exports: [],
      })),
    },
    Processor: noop,
    WorkerHost: class MockWorkerHost {
      async process(): Promise<unknown> {
        return undefined;
      }
    },
    OnWorkerEvent: noop,
    InjectQueue: () => () => undefined,
    getQueueToken: (name: string) => `BullQueue_${name}`,
  };
});

import { Test } from '@nestjs/testing';
import { ValidationPipe, type INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { jest } from '@jest/globals';

import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { AppModule } from '../../src/module/modules/app.module.js';

export interface MockPrisma {
  isHealthy: jest.Mock;
  [key: string]: unknown;
}

export interface MockRedis {
  isHealthy: jest.Mock;
  get: jest.Mock;
  set: jest.Mock;
  del: jest.Mock;
  exists: jest.Mock;
  [key: string]: unknown;
}

const PRISMA_DELEGATES = [
  'vendor', 'vendorProfile', 'vendorSettings', 'vendorDocument',
  'vendorVerification', 'vendorApproval', 'vendorSuspension', 'vendorSuspensionLog',
  'vendorTeamMember', 'vendorTeamInvite', 'vendorPayout', 'vendorSettlement',
  'vendorInvoice', 'vendorSubscription', 'vendorCommission', 'vendorRating',
  'vendorReview', 'vendorPerformance', 'vendorStats', 'vendorReport',
  'vendorShipping', 'vendorWarranty', 'vendorReturnPolicy',
] as const;

function makeDelegateMock(): Record<string, jest.Mock> {
  return {
    findFirst: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    count: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  };
}

export interface TestAppContext {
  app: INestApplication;
  prisma: MockPrisma;
  redis: MockRedis;
}

export async function createTestApp(): Promise<TestAppContext> {
  // Build mock Prisma with all 23 delegates + isHealthy
  const prismaMock: MockPrisma = {
    isHealthy: jest.fn().mockResolvedValue(true),
  };
  for (const d of PRISMA_DELEGATES) {
    prismaMock[d] = makeDelegateMock();
  }

  // Build mock Redis
  const redisMock: MockRedis = {
    isHealthy: jest.fn().mockResolvedValue(true),
    get: jest.fn().mockResolvedValue(null),
    set: jest.fn().mockResolvedValue(undefined),
    del: jest.fn().mockResolvedValue(undefined),
    exists: jest.fn().mockResolvedValue(false),
  };

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(prismaMock)
    .overrideProvider(RedisService)
    .useValue(redisMock)
    .compile();

  const app = moduleRef.createNestApplication();
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  await app.init();

  return { app, prisma: prismaMock, redis: redisMock };
}
