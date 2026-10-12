/**
 * E2E Test Setup — creates a NestJS test app with mocked infra
 * @module logistics-service/test/e2e
 *
 * Overrides:
 *  - PrismaService → MockPrisma (in-memory stub for every logistics model)
 *  - RedisService  → MockRedis (in-memory Map)
 *  - QueueService  → MockQueue (noop)
 *
 * Registers global exception filters in the correct order so:
 *  - HttpException        → HttpExceptionFilter   (401/404/400 etc.)
 *  - DomainError/AppError → DomainExceptionFilter (404/409/422 etc.)
 *  - class-validator      → ValidationExceptionFilter (400)
 *  - anything else        → AllExceptionsFilter   (500)
 */
import { Test } from '@nestjs/testing';
import { ValidationPipe } from '@nestjs/common';
import type { INestApplication } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { jest } from '@jest/globals';

import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { QueueService } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { UniversalTestFilter } from './_universal-filter.js';

import { AppModule } from '../../src/module/modules/app.module.js';

// ═══════════════════════════════════════════════════════════════
// Mock Prisma
// ═══════════════════════════════════════════════════════════════

export interface MockModel {
  findFirst: jest.Mock;
  findMany: jest.Mock;
  findUnique: jest.Mock;
  findUniqueOrThrow: jest.Mock;
  create: jest.Mock;
  update: jest.Mock;
  updateMany: jest.Mock;
  delete: jest.Mock;
  deleteMany: jest.Mock;
  count: jest.Mock;
  groupBy: jest.Mock;
}

export interface MockPrisma {
  logisticsShipment: MockModel;
  logisticsShipmentPackage: MockModel;
  logisticsCourier: MockModel;
  logisticsWarehouse: MockModel;
  logisticsVehicle: MockModel;
  logisticsDriver: MockModel;
  logisticsZone: MockModel;
  logisticsShippingMethod: MockModel;
  logisticsPackaging: MockModel;
  logisticsDelivery: MockModel;
  logisticsDeliveryAttempt: MockModel;
  logisticsTracking: MockModel;
  logisticsTrackingEvent: MockModel;
  logisticsRoute: MockModel;
  logisticsFulfillment: MockModel;
  logisticsDispatch: MockModel;
  logisticsReturnShipment: MockModel;
  logisticsInsurance: MockModel;
  isHealthy: jest.Mock;
  isEngineAvailable: jest.Mock;
  $connect: jest.Mock;
  $disconnect: jest.Mock;
  $transaction: jest.Mock;
  $queryRaw: jest.Mock;
}

function makeModel(): MockModel {
  return {
    findFirst: jest.fn(async () => null),
    findMany: jest.fn(async () => []),
    findUnique: jest.fn(async () => null),
    findUniqueOrThrow: jest.fn(async () => { throw new Error('not found'); }),
    create: jest.fn(async () => ({})),
    update: jest.fn(async () => ({})),
    updateMany: jest.fn(async () => ({ count: 0 })),
    delete: jest.fn(async () => ({})),
    deleteMany: jest.fn(async () => ({ count: 0 })),
    count: jest.fn(async () => 0),
    groupBy: jest.fn(async () => []),
  };
}

export function makeMockPrisma(): MockPrisma {
  return {
    logisticsShipment: makeModel(),
    logisticsShipmentPackage: makeModel(),
    logisticsCourier: makeModel(),
    logisticsWarehouse: makeModel(),
    logisticsVehicle: makeModel(),
    logisticsDriver: makeModel(),
    logisticsZone: makeModel(),
    logisticsShippingMethod: makeModel(),
    logisticsPackaging: makeModel(),
    logisticsDelivery: makeModel(),
    logisticsDeliveryAttempt: makeModel(),
    logisticsTracking: makeModel(),
    logisticsTrackingEvent: makeModel(),
    logisticsRoute: makeModel(),
    logisticsFulfillment: makeModel(),
    logisticsDispatch: makeModel(),
    logisticsReturnShipment: makeModel(),
    logisticsInsurance: makeModel(),
    isHealthy: jest.fn(async () => true),
    isEngineAvailable: jest.fn(() => true),
    $connect: jest.fn(async () => undefined),
    $disconnect: jest.fn(async () => undefined),
    $transaction: jest.fn(async (arg: unknown) => {
      if (typeof arg === 'function') return (arg as (tx: unknown) => unknown)({} as never);
      if (Array.isArray(arg)) return Promise.all(arg);
      return undefined;
    }),
    $queryRaw: jest.fn(async () => []),
  };
}

// ═══════════════════════════════════════════════════════════════
// Mock Redis
// ═══════════════════════════════════════════════════════════════

export interface MockRedis {
  get: jest.Mock;
  set: jest.Mock;
  del: jest.Mock;
  exists: jest.Mock;
  isHealthy: jest.Mock;
  raw: unknown;
}

export function makeMockRedis(): MockRedis {
  const store = new Map<string, unknown>();
  return {
    get: jest.fn(async (key: string) => store.get(key) ?? null),
    set: jest.fn(async (key: string, value: unknown) => { store.set(key, value); }),
    del: jest.fn(async (key: string) => { store.delete(key); }),
    exists: jest.fn(async (key: string) => store.has(key)),
    isHealthy: jest.fn(async () => true),
    raw: {},
  };
}

// ═══════════════════════════════════════════════════════════════
// Mock Queue
// ═══════════════════════════════════════════════════════════════

export interface MockQueue {
  enqueue: jest.Mock;
  registerWorker: jest.Mock;
  getQueue: jest.Mock;
}

export function makeMockQueue(): MockQueue {
  return {
    enqueue: jest.fn(async () => 'job-1'),
    registerWorker: jest.fn(),
    getQueue: jest.fn(() => ({ add: jest.fn() })),
  };
}

// ═══════════════════════════════════════════════════════════════
// Test App factory
// ═══════════════════════════════════════════════════════════════

export interface TestAppContext {
  app: INestApplication;
  prisma: MockPrisma;
  redis: MockRedis;
  queue: MockQueue;
}

export async function createTestApp(): Promise<TestAppContext> {
  const mockPrisma = makeMockPrisma();
  const mockRedis = makeMockRedis();
  const mockQueue = makeMockQueue();

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(mockPrisma as unknown as PrismaService)
    .overrideProvider(RedisService)
    .useValue(mockRedis as unknown as RedisService)
    .overrideProvider(QueueService)
    .useValue(mockQueue as unknown as QueueService)
    .compile();

  const app = moduleRef.createNestApplication({ logger: ['error', 'warn'] });

  // Same bootstrap as src/main.ts
  app.setGlobalPrefix('api/v1');

  // Test auth middleware — sets request.user when a valid Bearer token is sent
  // Runs BEFORE guards, so JwtAuthGuard finds request.user for protected routes.
  app.use((req: any, _res: unknown, next: () => void) => {
    const auth = req.headers?.authorization as string | undefined;
    if (auth && auth.startsWith('Bearer ')) {
      const token = auth.slice(7).trim();
      if (token === TEST_JWT) {
        req.user = {
          userId: '00000000-0000-0000-0000-000000000001',
          sessionId: 'test-session',
          roles: ['admin'],
          permissions: [],
        };
      }
    }
    next();
  });

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new JwtAuthGuard(reflector));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  // Single universal test filter — deterministic status extraction
  app.useGlobalFilters(new UniversalTestFilter());

  await app.init();

  return { app, prisma: mockPrisma, redis: mockRedis, queue: mockQueue };
}

// ═══════════════════════════════════════════════════════════════
// Auth helpers
// ═══════════════════════════════════════════════════════════════

export const TEST_JWT = 'test-jwt-token';

export function authHeader(token: string = TEST_JWT): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

/**
 * Reset all mocks between tests.
 */
export function resetMocks(ctx: TestAppContext): void {
  Object.values(ctx.prisma).forEach((v) => {
    if (v && typeof v === 'object' && 'mockClear' in v) {
      (v as { mockClear: () => void }).mockClear();
    } else if (v && typeof v === 'object') {
      Object.values(v as Record<string, unknown>).forEach((fn) => {
        if (fn && typeof (fn as { mockClear?: () => void }).mockClear === 'function') {
          (fn as { mockClear: () => void }).mockClear();
        }
      });
    }
  });
  ctx.redis.get.mockClear();
  ctx.redis.set.mockClear();
  ctx.redis.del.mockClear();
  ctx.queue.enqueue.mockClear();
}
