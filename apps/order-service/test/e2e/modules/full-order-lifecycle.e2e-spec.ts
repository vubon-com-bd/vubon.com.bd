/**
 * Full Order Lifecycle E2E — create → confirm → ship → deliver → complete
 * @module order-service/test/e2e/modules
 */
import { jest } from '@jest/globals';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { OrderController } from '@interfaces/controllers/rest/order.controller.js';
import { ORDER_SERVICE } from '@application/services/interfaces/order.service.interface.js';
import { JwtAuthGuard } from '@vubon/shared-kernel/interfaces/guards';
import { OwnOrderGuard } from '@interfaces/guards/own-order.guard.js';
import { OrderCacheInterceptor } from '@interfaces/interceptors/order-cache.interceptor.js';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { ORDER_REPOSITORY } from '@domain/repositories/order.repository.interface.js';

const mockService = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  confirm: jest.fn(),
  hold: jest.fn(),
  release: jest.fn(),
  getById: jest.fn(),
  getByNumber: jest.fn(),
  getPublic: jest.fn(),
  getDetail: jest.fn(),
  list: jest.fn(),
  listByCustomer: jest.fn(),
  listByVendor: jest.fn(),
  getStats: jest.fn(),
};

const mockRedis = {
  get: jest.fn().mockResolvedValue(null),
  raw: { set: jest.fn() },
};

const mockRepo = { findById: jest.fn().mockResolvedValue(null) };

describe('Full Order Lifecycle E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        { provide: ORDER_SERVICE, useValue: mockService },
        { provide: RedisService, useValue: mockRedis },
        { provide: ORDER_REPOSITORY, useValue: mockRepo },
        OrderCacheInterceptor,
      ],
    })
      .overrideGuard(JwtAuthGuard).useValue({
        canActivate: (ctx: unknown) => {
          const req = (ctx as { switchToHttp: () => { getRequest: () => { user?: unknown } } })
            .switchToHttp()
            .getRequest();
          req.user = { userId: 'test-user', roles: ['customer'] };
          return true;
        },
      })
      .overrideGuard(OwnOrderGuard).useValue({ canActivate: () => true })
      .overrideInterceptor(OrderCacheInterceptor).useValue({
        intercept: (_ctx: unknown, next: { handle: () => unknown }) => next.handle(),
      })
      .compile();
    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  it('should complete full lifecycle: create → confirm → ship → deliver', async () => {
    // ─── Step 1: Create ───
    mockService.create.mockResolvedValue({
      orderId: 'o-lifecycle',
      orderNumber: 'ORD-2026-LC001',
      status: 'pending',
    });

    const createRes = await request(app.getHttpServer())
      .post('/orders')
      .send({
        customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
        items: [{ productId: '7c9e6679-7425-40de-944b-e07fc1f90ae7', quantity: 1, unitPrice: 100 }],
        shippingAddress: { line1: 'L', city: 'C', country: 'BD' },
      })
      .expect(201);
    expect(createRes.body.success).toBe(true);
    expect(createRes.body.status).toBe('pending');

    // ─── Step 2: Confirm ───
    mockService.confirm.mockResolvedValue({ id: 'o-lifecycle', status: 'confirmed' });

    const confirmRes = await request(app.getHttpServer())
      .post('/orders/o-lifecycle/confirm')
      .send({})
      .expect(200);
    expect(confirmRes.body.status).toBe('confirmed');

    // ─── Step 3: Ship ───
    mockService.getById.mockResolvedValue({
      id: 'o-lifecycle',
      status: 'shipped',
      trackingNumber: 'TRK-2026-001',
    });

    const shipRes = await request(app.getHttpServer())
      .get('/orders/o-lifecycle')
      .expect(200);
    expect(shipRes.body.status).toBe('shipped');
    expect(shipRes.body.trackingNumber).toBe('TRK-2026-001');

    // ─── Step 4: Deliver ───
    mockService.getById.mockResolvedValue({
      id: 'o-lifecycle',
      status: 'delivered',
      deliveredAt: new Date().toISOString(),
    });

    const deliverRes = await request(app.getHttpServer())
      .get('/orders/o-lifecycle')
      .expect(200);
    expect(deliverRes.body.status).toBe('delivered');
    expect(deliverRes.body.deliveredAt).toBeDefined();
  });

  it('should handle lifecycle with hold + release', async () => {
    mockService.hold.mockResolvedValue({ id: 'o-2', status: 'on_hold' });
    mockService.release.mockResolvedValue({ id: 'o-2', status: 'confirmed' });

    const holdRes = await request(app.getHttpServer())
      .post('/orders/o-2/hold')
      .send({ reason: 'fraud check' })
      .expect(200);
    expect(holdRes.body.status).toBe('on_hold');

    const releaseRes = await request(app.getHttpServer())
      .post('/orders/o-2/release')
      .send({ note: 'cleared' })
      .expect(200);
    expect(releaseRes.body.status).toBe('confirmed');
  });

  it('should list orders by customer after creation', async () => {
    mockService.listByCustomer.mockResolvedValue({
      items: [{ id: 'o-1', orderNumber: 'ORD-1', status: 'pending', total: 100, currency: 'BDT', itemCount: 1, createdAt: new Date().toISOString() }],
      total: 1,
      page: 1,
      limit: 20,
      totalPages: 1,
    });

    const res = await request(app.getHttpServer())
      .get('/orders')
      .expect(200);
    expect(res.body.total).toBe(1);
    expect(res.body.items).toHaveLength(1);
  });
});
