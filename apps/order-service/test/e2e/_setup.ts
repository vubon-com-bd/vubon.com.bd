/**
 * E2E Test Setup — full AppModule with mocked Prisma + Redis.
 *
 * Key points:
 * - Combined exception filter handles both HttpException + domain errors (code+httpStatus)
 * - Mock guards inject req.user based on Bearer <role> header
 * - Auth header is REQUIRED for protected routes
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
import { Test } from '@nestjs/testing';
import { PrismaService } from '@vubon/shared-kernel/infrastructure/persistence/prisma';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { JwtAuthGuard, RolesGuard } from '@vubon/shared-kernel/interfaces/guards';
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

    // 1) NestJS HttpException (BadRequestException, UnauthorizedException, NotFoundException...)
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

    // 2) Domain / Application error with code + httpStatus
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
export const UUID_ORDER = '11111111-1111-4111-8111-111111111111';
export const UUID_CUSTOMER = '22222222-2222-4222-8222-222222222222';
export const UUID_PRODUCT = '33333333-3333-4333-8333-333333333333';
export const UUID_ITEM = '44444444-4444-4444-8444-444444444444';
export const UUID_VENDOR = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
export const UUID_CHECKOUT = '77777777-7777-4777-8777-777777777777';
export const UUID_SESSION = '88888888-8888-4888-8888-888888888888';
export const UUID_CANCEL = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
export const UUID_RETURN = 'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
export const UUID_FULFILL = 'ffffffff-ffff-4fff-8fff-ffffffffffff';
export const UUID_DELIVERY = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
export const UUID_METHOD = 'mmmmmmmm-mmmm-4mmm-8mmm-mmmmmmmmmmmm';
export const UUID_TRACK = 'tttttttt-tttt-4ttt-8ttt-tttttttttttt';
export const UUID_ADMIN = '99999999-9999-4999-8999-999999999999';

// ─────────────────────────────────────────────
// Mock Prisma delegates
// ─────────────────────────────────────────────
export function mockDelegate() {
  return {
    findUnique: jest.fn<() => Promise<unknown>>().mockResolvedValue(null),
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
      .mockResolvedValue({ _sum: { total: 0 }, _avg: { total: 0 } }),
    groupBy: jest.fn<() => Promise<unknown>>().mockResolvedValue([]),
  };
}

export function createMockPrisma() {
  return {
    order: mockDelegate(),
    orderItem: mockDelegate(),
    checkout: mockDelegate(),
    checkoutSession: mockDelegate(),
    delivery: mockDelegate(),
    deliveryMethod: mockDelegate(),
    shippingAddress: mockDelegate(),
    billingAddress: mockDelegate(),
    orderCancel: mockDelegate(),
    orderReturn: mockDelegate(),
    orderFulfillment: mockDelegate(),
    orderHistory: mockDelegate(),
    orderTracking: mockDelegate(),
    $queryRaw: jest.fn<() => Promise<unknown>>().mockResolvedValue([{ '1': 1 }]),
    $connect: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    $disconnect: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
  };
}
export type MockPrisma = ReturnType<typeof createMockPrisma>;

export function createMockRedis() {
  return {
    get: jest.fn<() => Promise<unknown>>().mockResolvedValue(null),
    set: jest.fn<() => Promise<unknown>>().mockResolvedValue('OK'),
    del: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
    exists: jest.fn<() => Promise<unknown>>().mockResolvedValue(0),
    raw: {
      set: jest.fn<() => Promise<unknown>>().mockResolvedValue('OK'),
      get: jest.fn<() => Promise<unknown>>().mockResolvedValue(null),
      del: jest.fn<() => Promise<unknown>>().mockResolvedValue(1),
      quit: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
    },
  };
}

// ─────────────────────────────────────────────
// Row shapes
// ─────────────────────────────────────────────
export function itemRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_ITEM, orderId: UUID_ORDER, productId: UUID_PRODUCT,
    variantId: null, vendorId: null, sku: 'SKU-1', name: 'Test Product',
    imageUrl: null, type: 'product', status: 'pending',
    quantity: 2, unitPrice: 100, compareAtPrice: null,
    subtotal: 200, discountAmount: 0, taxAmount: 0, shippingAmount: 0,
    total: 200, currency: 'BDT', attributes: null, notes: null,
    createdAt: NOW, updatedAt: NOW, deletedAt: null,
    ...overrides,
  };
}

export function orderRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID_ORDER, orderNumber: 'ORD-2026-000001',
    customerId: UUID_CUSTOMER, vendorIds: [],
    type: 'regular', status: 'pending', priority: 'normal',
    subtotal: 200, discountAmount: 0, taxAmount: 0, shippingAmount: 0,
    total: 200, currency: 'BDT',
    paymentId: null, paymentStatus: null, paymentMethod: null,
    shippingMethod: null, trackingNumber: null,
    notes: null, customerNotes: null,
    confirmedAt: null, shippedAt: null, deliveredAt: null,
    cancelledAt: null, completedAt: null,
    version: 1, createdAt: NOW, updatedAt: NOW, deletedAt: null,
    items: [itemRow()],
    ...overrides,
  };
}

// ─────────────────────────────────────────────
// Guard mocks
// ─────────────────────────────────────────────
export function mockJwtAuthGuard() {
  return {
    canActivate: (ctx: unknown): boolean => {
      const req = (
        ctx as {
          switchToHttp: () => {
            getRequest: () => {
              headers: Record<string, string | undefined>;
              user?: unknown;
            };
          };
        }
      )
        .switchToHttp()
        .getRequest();

      const auth = req.headers?.authorization;
      if (!auth || !auth.startsWith('Bearer ')) {
        throw new UnauthorizedException('Unauthorized');
      }
      const role = auth.slice(7).trim() || 'customer';
      req.user = {
        userId: role === 'admin' ? UUID_ADMIN : UUID_CUSTOMER,
        role,
        sessionId: 'sess-1',
        vendorId: role === 'vendor' ? UUID_VENDOR : undefined,
      };
      return true;
    },
  };
}

export function mockRolesGuard() {
  return { canActivate: () => true };
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
    .useValue(mockJwtAuthGuard())
    .overrideGuard(RolesGuard)
    .useValue(mockRolesGuard())
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
  vendor: { Authorization: 'Bearer vendor' },
};
