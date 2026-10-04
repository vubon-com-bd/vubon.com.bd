/**
 * E2E Test Setup — payment-service
 *
 * Key points:
 * - Full AppModule with mocked PrismaService + RedisService
 * - BullMQ mocked globally via jest.setup.ts
 * - Combined exception filter for HttpException + Domain errors
 * - Public route detection: @Public() decorator allowlist bypasses auth
 * - Auth via Bearer <role> header (customer | admin | anonymous)
 */
import { jest } from '@jest/globals';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  INestApplication,
  UnauthorizedException,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { AppModule } from '../../src/module/modules/app.module.js';

// ─────────────────────────────────────────────
// Combined exception filter for E2E
// ─────────────────────────────────────────────
@Catch()
class E2EAllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<{
      status: (code: number) => { json: (body: unknown) => void };
    }>();

    // 1) NestJS HttpException
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      if (typeof body === 'string') {
        response.status(status).json({ statusCode: status, message: body });
      } else {
        response.status(status).json(body);
      }
      return;
    }

    // 2) Domain error (code + httpStatus)
    const err = exception as {
      code?: string;
      httpStatus?: number;
      message?: string;
      context?: unknown;
    };
    if (err?.code && typeof err?.httpStatus === 'number') {
      response.status(err.httpStatus).json({
        statusCode: err.httpStatus,
        code: err.code,
        message: err.message ?? 'Domain error',
        context: err.context,
        timestamp: new Date().toISOString(),
      });
      return;
    }

    // 3) Fallback 500
    response.status(500).json({
      statusCode: 500,
      message: exception instanceof Error ? exception.message : 'Internal server error',
    });
  }
}

// ─────────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────────
export const NOW = new Date('2026-01-01T10:00:00Z');
export const UUID_PAYMENT = '11111111-1111-4111-8111-111111111111';
export const UUID_ORDER = '22222222-2222-4222-8222-222222222222';
export const UUID_USER = '33333333-3333-4333-8333-333333333333';
export const UUID_TX = '44444444-4444-4444-8444-444444444444';
export const UUID_REFUND = '55555555-5555-4555-8555-555555555555';
export const UUID_WEBHOOK = '66666666-6666-4666-8666-666666666666';
export const UUID_ADMIN = '77777777-7777-4777-8777-777777777777';

// ─────────────────────────────────────────────
// Prisma delegates
// ─────────────────────────────────────────────
export function mockDelegate() {
  return {
    // findUnique defaults to a truthy shape because Prisma repositories use it
    // only for existence checks inside save() (findById* uses findFirst).
    // Override per-test when you need the "not existing" branch.
    findUnique: jest
      .fn<() => Promise<unknown>>()
      .mockResolvedValue({ id: 'existing' }),
    findFirst: jest.fn<() => Promise<unknown>>().mockResolvedValue(null),
    findMany: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
    create: jest.fn<() => Promise<unknown>>().mockResolvedValue({}),
    createMany: jest.fn<() => Promise<unknown>>().mockResolvedValue({ count: 0 }),
    update: jest.fn<() => Promise<unknown>>().mockResolvedValue({}),
    delete: jest.fn<() => Promise<unknown>>().mockResolvedValue({}),
    deleteMany: jest.fn<() => Promise<unknown>>().mockResolvedValue({ count: 0 }),
    count: jest.fn<() => Promise<unknown>>().mockResolvedValue(0),
    aggregate: jest
      .fn<() => Promise<unknown>>()
      .mockResolvedValue({ _sum: { amount: 0 }, _avg: { amount: 0 } }),
    groupBy: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
  };
}

export function createMockPrisma() {
  return {
    payment: mockDelegate(),
    transaction: mockDelegate(),
    refund: mockDelegate(),
    webhookEvent: mockDelegate(),
    $queryRaw: jest.fn<() => Promise<unknown>>().mockResolvedValue([{ '1': 1 }]),
    $connect: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    $disconnect: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    isHealthy: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
    isEngineAvailable: jest.fn<() => boolean>().mockReturnValue(true),
  };
}
export type MockPrisma = ReturnType<typeof createMockPrisma>;

export function createMockRedis() {
  return {
    get: jest.fn<() => Promise<unknown>>().mockResolvedValue(null),
    set: jest.fn<() => Promise<unknown>>().mockResolvedValue('OK'),
    del: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
    exists: jest.fn<() => Promise<unknown>>().mockResolvedValue(0),
    isHealthy: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
    raw: {
      set: jest.fn<() => Promise<unknown>>().mockResolvedValue('OK'),
      get: jest.fn<() => Promise<unknown>>().mockResolvedValue(null),
      del: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
      quit: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    },
  };
}

// ─────────────────────────────────────────────
// Row shapes (Prisma-compatible)
// ─────────────────────────────────────────────
export function paymentRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_PAYMENT,
    orderId: UUID_ORDER,
    userId: UUID_USER,
    type: 'one_time',
    status: 'pending',
    method: 'mobile_banking',
    gateway: 'bkash',
    amount: 1000,
    currency: 'BDT',
    gatewayPaymentId: null,
    gatewayOrderId: null,
    gatewaySignature: null,
    idempotencyKey: null,
    refundedAmount: 0,
    retryAttempts: 0,
    authorizedAt: null,
    capturedAt: null,
    failedAt: null,
    cancelledAt: null,
    expiredAt: null,
    failureReason: null,
    failureCode: null,
    metadata: null,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

export function transactionRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_TX,
    paymentId: UUID_PAYMENT,
    orderId: UUID_ORDER,
    userId: UUID_USER,
    type: 'payment',
    status: 'pending',
    amount: 1000,
    currency: 'BDT',
    gateway: 'bkash',
    gatewayTransactionId: null,
    reference: null,
    idempotencyKey: null,
    errorCode: null,
    errorMessage: null,
    metadata: null,
    processedAt: null,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

export function refundRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_REFUND,
    paymentId: UUID_PAYMENT,
    transactionId: null,
    orderId: UUID_ORDER,
    status: 'pending',
    amount: 500,
    currency: 'BDT',
    reason: 'customer requested',
    gatewayRefundId: null,
    processedAt: null,
    failedAt: null,
    failureReason: null,
    failureCode: null,
    metadata: null,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

export function webhookRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_WEBHOOK,
    gateway: 'bkash',
    gatewayEventId: 'evt_1',
    eventType: 'payment.succeeded',
    paymentId: UUID_PAYMENT,
    payload: { paymentId: UUID_PAYMENT },
    signature: null,
    verified: false,
    processed: false,
    attempts: 0,
    maxAttempts: 5,
    lastError: null,
    receivedAt: NOW,
    verifiedAt: null,
    processedAt: null,
    failedAt: null,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

// ─────────────────────────────────────────────
// Guard mocks
// ─────────────────────────────────────────────
export function mockJwtAuthGuard(reflector: Reflector) {
  return {
    canActivate: (ctx: unknown): boolean => {
      const context = ctx as {
        getHandler: () => unknown;
        getClass: () => unknown;
        switchToHttp: () => {
          getRequest: () => {
            headers: Record<string, string | undefined>;
            user?: unknown;
          };
        };
      };

      // @Public() bypass
      const isPublic = reflector.getAllAndOverride<boolean>('isPublic', [
        context.getHandler(),
        context.getClass(),
      ]);
      if (isPublic) return true;

      const req = context.switchToHttp().getRequest();
      const auth = req.headers?.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        throw new UnauthorizedException('Unauthorized');
      }
      const role = auth.slice(7).trim() || 'customer';
      req.user = {
        userId: role === 'admin' ? UUID_ADMIN : UUID_USER,
        roles: [role],
        permissions: [],
        sessionId: 'sess-1',
      };
      return true;
    },
  };
}

// ─────────────────────────────────────────────
// App factory
// ─────────────────────────────────────────────
export async function createTestApp(): Promise<{
  app: INestApplication;
  prisma: MockPrisma;
  redis: ReturnType<typeof createMockRedis>;
}> {
  const prisma = createMockPrisma();
  const redis = createMockRedis();

  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(PrismaService)
    .useValue(prisma)
    .overrideProvider(RedisService)
    .useValue(redis)
    .overrideGuard(JwtAuthGuard)
    .useFactory({
      factory: (reflector: Reflector) => mockJwtAuthGuard(reflector),
      inject: [Reflector],
    })
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
  app.useGlobalFilters(new E2EAllExceptionsFilter());
  await app.init();
  return { app, prisma, redis };
}

export const AUTH = {
  admin: { Authorization: 'Bearer admin' },
  customer: { Authorization: 'Bearer customer' },
};
