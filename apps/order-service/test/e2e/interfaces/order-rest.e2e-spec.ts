/**
 * Order REST E2E
 * @module order-service/test/e2e/interfaces
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

const mockRepo = {
  findById: jest.fn().mockResolvedValue(null),
};

describe('Order REST E2E', () => {
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

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /orders', () => {
    it('should create order (201)', async () => {
      mockService.create.mockResolvedValue({
        orderId: 'o-1',
        orderNumber: 'ORD-2026-000001',
        status: 'pending',
      });

      const res = await request(app.getHttpServer())
        .post('/orders')
        .send({
          customerId: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
          items: [{ productId: 'p-1', quantity: 1, unitPrice: 100 }],
          shippingAddress: { line1: 'L', city: 'C', country: 'BD' },
        })
        .expect(201);

      expect(res.body.success).toBe(true);
      expect(res.body.orderId).toBe('o-1');
    });
  });

  describe('GET /orders/:id', () => {
    it('should return order (200)', async () => {
      mockService.getById.mockResolvedValue({
        id: 'o-1',
        orderNumber: 'ORD-1',
        status: 'pending',
      });

      const res = await request(app.getHttpServer())
        .get('/orders/o-1')
        .expect(200);

      expect(res.body.id).toBe('o-1');
    });
  });

  describe('GET /orders', () => {
    it('should list orders (200)', async () => {
      mockService.listByCustomer.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });

      const res = await request(app.getHttpServer())
        .get('/orders')
        .expect(200);

      expect(res.body.items).toEqual([]);
      expect(res.body.total).toBe(0);
    });
  });

  describe('GET /orders/stats', () => {
    it('should return stats (200)', async () => {
      mockService.getStats.mockResolvedValue({
        totalOrders: 5,
        totalRevenue: 500,
        averageOrderValue: 100,
        currency: 'BDT',
        byStatus: { pending: 5 },
      });

      const res = await request(app.getHttpServer())
        .get('/orders/stats')
        .expect(200);

      expect(res.body.totalOrders).toBe(5);
    });
  });

  describe('GET /orders/:id/public', () => {
    it('should return public view (200)', async () => {
      mockService.getPublic.mockResolvedValue({
        id: 'o-1',
        orderNumber: 'ORD-1',
      });

      const res = await request(app.getHttpServer())
        .get('/orders/o-1/public')
        .expect(200);

      expect(res.body.id).toBe('o-1');
    });
  });

  describe('PATCH /orders/:id', () => {
    it('should update order (200)', async () => {
      mockService.update.mockResolvedValue({
        id: 'o-1',
        status: 'confirmed',
      });

      const res = await request(app.getHttpServer())
        .patch('/orders/o-1')
        .send({ notes: 'urgent' })
        .expect(200);

      expect(res.body.id).toBe('o-1');
    });
  });

  describe('DELETE /orders/:id', () => {
    it('should delete order (204)', async () => {
      mockService.delete.mockResolvedValue(undefined);

      await request(app.getHttpServer())
        .delete('/orders/o-1')
        .send({ reason: 'test' })
        .expect(204);
    });
  });
});
