/**
 * E2E Test Setup — notification-service
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
      const body = exception.getResponse() as unknown;

      // Validation errors (from ValidationPipe) → 422 Unprocessable Entity
      // Detection: status 400 + message is an array of strings
      let finalStatus: number = status;
      if (
        status === 400 &&
        typeof body === 'object' &&
        body !== null &&
        Array.isArray((body as { message?: unknown }).message)
      ) {
        finalStatus = 422;
      }

      if (typeof body === 'string') {
        response.status(finalStatus).json({ statusCode: finalStatus, message: body });
      } else if (typeof body === 'object' && body !== null) {
        const obj = body as Record<string, unknown>;
        response.status(finalStatus).json({
          ...obj,
          statusCode: finalStatus,
        });
      } else {
        response.status(finalStatus).json({ statusCode: finalStatus });
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
// Fixtures (notification-service)
// ─────────────────────────────────────────────
export const NOW = new Date('2026-01-01T10:00:00Z');
export const UUID_NOTIFICATION = '11111111-1111-4111-8111-111111111111';
export const UUID_USER = '33333333-3333-4333-8333-333333333333';
export const UUID_TEMPLATE = '44444444-4444-4444-8444-444444444444';
export const UUID_SCHEDULE = '55555555-5555-4555-8555-555555555555';
export const UUID_BROADCAST = '66666666-6666-4666-8666-666666666666';
export const UUID_DIGEST = '77777777-7777-4777-8777-777777777777';
export const UUID_PREFERENCE = '88888888-8888-4888-8888-888888888888';
export const UUID_DEVICE = '99999999-9999-4999-8999-999999999999';
export const UUID_WEBHOOK = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
export const UUID_ADMIN = 'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';

// ─────────────────────────────────────────────
// Prisma delegates
// ─────────────────────────────────────────────
export function mockDelegate() {
  return {
    findUnique: jest
      .fn<() => Promise<unknown>>()
      .mockResolvedValue({ id: 'existing' }),
    findFirst: jest.fn<() => Promise<unknown>>().mockResolvedValue(null),
    findMany: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
    create: jest.fn<() => Promise<unknown>>().mockResolvedValue({}),
    createMany: jest.fn<() => Promise<unknown>>().mockResolvedValue({ count: 0 }),
    update: jest.fn<() => Promise<unknown>>().mockResolvedValue({}),
    updateMany: jest.fn<() => Promise<unknown>>().mockResolvedValue({ count: 0 }),
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
    notification: {
      ...mockDelegate(),
      create: jest.fn().mockResolvedValue(notificationRow()),
      update: jest.fn().mockResolvedValue(notificationRow()),
    },
    notificationTemplate: {
      ...mockDelegate(),
      create: jest.fn().mockResolvedValue(templateRow()),
      update: jest.fn().mockResolvedValue(templateRow()),
    },
    notificationSchedule: {
      ...mockDelegate(),
      create: jest.fn().mockResolvedValue(scheduleRow()),
      update: jest.fn().mockResolvedValue(scheduleRow()),
    },
    notificationBroadcast: mockDelegate(),
    notificationBroadcastBatch: mockDelegate(),
    notificationDigest: mockDelegate(),
    notificationDigestItem: mockDelegate(),
    notificationPreference: {
      ...mockDelegate(),
      create: jest.fn().mockResolvedValue(preferenceRow()),
      update: jest.fn().mockResolvedValue(preferenceRow()),
    },
    notificationDevice: {
      ...mockDelegate(),
      create: jest.fn().mockResolvedValue(deviceRow()),
      update: jest.fn().mockResolvedValue(deviceRow()),
    },
    notificationWebhook: {
      ...mockDelegate(),
      create: jest.fn().mockResolvedValue(webhookRow()),
      update: jest.fn().mockResolvedValue(webhookRow()),
    },
    notificationWebhookDelivery: mockDelegate(),
    notificationDeliveryAttempt: mockDelegate(),
    notificationEvent: mockDelegate(),
    notificationRateLimit: mockDelegate(),
    notificationUnsubscribe: mockDelegate(),
    notificationBounce: mockDelegate(),
    notificationActionLog: mockDelegate(),
    notificationRule: mockDelegate(),
    notificationAuditLog: mockDelegate(),
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
      incr: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
      expire: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
      ttl: jest.fn<() => Promise<unknown>>().mockResolvedValue(3600),
      sadd: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
      srem: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
      smembers: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
      quit: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    },
  };
}

// ─────────────────────────────────────────────
// Row shapes (Prisma-compatible)
// ─────────────────────────────────────────────
export function notificationRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_NOTIFICATION,
    userId: UUID_USER,
    type: 'transactional',
    category: 'order',
    channel: 'email',
    priority: 'normal',
    status: 'pending',
    title: 'Order confirmed',
    body: 'Your order has been confirmed.',
    imageUrl: null,
    iconUrl: null,
    actionUrl: null,
    actions: null,
    data: null,
    reference: null,
    recipient: { userId: UUID_USER, email: 'user@vubon.com.bd' },
    deliveryStatus: 'queued',
    deliveryAttempts: 0,
    retryAttempts: 0,
    provider: null,
    providerMessageId: null,
    failureReason: null,
    failureCode: null,
    readStatus: 'unread',
    expiresAt: null,
    scheduledAt: null,
    sentAt: null,
    deliveredAt: null,
    readAt: null,
    archivedAt: null,
    failedAt: null,
    cancelledAt: null,
    expiredAt: null,
    snoozedUntil: null,
    metadata: null,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

export function templateRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_TEMPLATE,
    name: 'Order Confirmation',
    slug: 'order-confirmation',
    type: 'email',
    status: 'active',
    category: 'order',
    locale: 'en',
    subject: 'Order #{{orderNumber}} confirmed',
    body: 'Hello {{customerName}}, your order #{{orderNumber}} is confirmed.',
    bodyHtml: null,
    variables: [
      { name: 'orderNumber', type: 'string', required: true },
      { name: 'customerName', type: 'string', required: true },
    ],
    version: 1,
    parentId: null,
    createdBy: UUID_USER,
    updatedBy: null,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

export function scheduleRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_SCHEDULE,
    type: 'scheduled',
    status: 'pending',
    recurrence: 'none',
    scheduledAt: new Date('2026-06-01T10:00:00Z'),
    timezone: 'Asia/Dhaka',
    nextOccurrenceAt: null,
    lastTriggeredAt: null,
    occurrenceCount: 0,
    maxOccurrences: null,
    notificationTemplateId: UUID_TEMPLATE,
    userId: UUID_USER,
    createdBy: UUID_USER,
    lastFailureReason: null,
    metadata: null,
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

export function preferenceRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_PREFERENCE,
    userId: UUID_USER,
    channelPreferences: { email: true, sms: false, push: true, in_app: true },
    categoryPreferences: { order: true, marketing: false },
    quietHoursEnabled: false,
    quietHoursStart: null,
    quietHoursEnd: null,
    timezone: 'Asia/Dhaka',
    locale: 'en',
    version: 0,
    createdAt: NOW,
    updatedAt: NOW,
    deletedAt: null,
    ...overrides,
  };
}

export function deviceRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_DEVICE,
    userId: UUID_USER,
    type: 'android',
    status: 'active',
    token: 'abcdefghijklmnop123456',
    platform: 'android',
    appVersion: '1.0.0',
    osVersion: '14',
    deviceName: 'Pixel 7',
    lastActiveAt: NOW,
    registeredAt: NOW,
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
    url: 'https://example.com/vubon/webhook',
    method: 'POST',
    status: 'active',
    events: ['order.created'],
    secret: null,
    description: 'Test webhook',
    headers: null,
    failureCount: 0,
    lastSuccessAt: null,
    lastFailureAt: null,
    createdBy: UUID_USER,
    metadata: null,
    version: 0,
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
