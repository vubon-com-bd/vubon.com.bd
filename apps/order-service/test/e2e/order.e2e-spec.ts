import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp, orderRow, itemRow, AUTH, UUID_ORDER, UUID_CUSTOMER, UUID_PRODUCT,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Order API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.order.findUnique.mockResolvedValue(orderRow());
    prisma.order.findFirst.mockResolvedValue(orderRow());
    prisma.order.findMany.mockResolvedValue([orderRow()]);
    prisma.order.create.mockResolvedValue(orderRow({ items: [] }));
    prisma.order.update.mockResolvedValue(orderRow());
    prisma.order.count.mockResolvedValue(1);
    prisma.order.aggregate.mockResolvedValue({ _sum: { total: 200 }, _avg: { total: 200 } });
    prisma.order.groupBy.mockResolvedValue([{ status: 'pending', _count: { _all: 1 } }]);
    prisma.orderItem.deleteMany.mockResolvedValue({ count: 0 });
    prisma.orderItem.createMany.mockResolvedValue({ count: 1 });
  });

  describe('Auth', () => {
    it('401 without Authorization header', async () => {
      await request(app.getHttpServer()).get('/api/v1/orders').expect(401);
    });
    it('200 with valid Authorization', async () => {
      await request(app.getHttpServer()).get('/api/v1/orders').set(AUTH.customer).expect(200);
    });
  });

  describe('POST /orders', () => {
    it('201 creates new order', async () => {
      // 1st findUnique: save() existence check → null (create path)
      // 2nd findUnique: post-create reload → return row
      prisma.order.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce(orderRow({ items: [] }));

      const body = {
        customerId: UUID_CUSTOMER,
        items: [{ productId: UUID_PRODUCT, quantity: 2, unitPrice: 100 }],
        shippingAddress: {
          fullName: 'John', phone: '01700000000',
          line1: '123 Main', city: 'Dhaka', country: 'BD',
        },
      };
      const res = await request(app.getHttpServer())
        .post('/api/v1/orders')
        .set(AUTH.customer)
        .send(body)
        .expect(201);
      expect(res.body.id).toBe(UUID_ORDER);
      expect(prisma.order.create).toHaveBeenCalled();
    });

    it('422 on invalid UUID (schema validation)', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/orders')
        .set(AUTH.customer)
        .send({
          customerId: 'not-a-uuid',
          items: [{ productId: UUID_PRODUCT, quantity: 1, unitPrice: 100 }],
          shippingAddress: { fullName: 'J', phone: '0', line1: 'x', city: 'y', country: 'BD' },
        })
        .expect(422);
    });
  });

  describe('GET /orders', () => {
    it('200 lists orders', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/orders').set(AUTH.customer).expect(200);
      expect(res.body.items).toBeDefined();
    });
  });

  describe('GET /orders/:orderId', () => {
    it('200 returns order', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/orders/${UUID_ORDER}`).set(AUTH.customer).expect(200);
      expect(res.body.id).toBe(UUID_ORDER);
    });

    it('404 when not found', async () => {
      prisma.order.findUnique.mockResolvedValue(null);
      await request(app.getHttpServer())
        .get(`/api/v1/orders/${UUID_ORDER}`).set(AUTH.customer).expect(404);
    });
  });

  describe('GET /orders/number/:orderNumber', () => {
    it('200 returns order by number', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/orders/number/ORD-2026-000001').set(AUTH.customer).expect(200);
      expect(res.body.orderNumber).toBe('ORD-2026-000001');
    });
  });

  describe('GET /orders/stats', () => {
    it('200 admin only', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/orders/stats').set(AUTH.admin).expect(200);
      expect(res.body.totalOrders).toBeDefined();
    });
  });

  describe('PATCH /orders/:orderId', () => {
    it('200 updates order', async () => {
      await request(app.getHttpServer())
        .patch(`/api/v1/orders/${UUID_ORDER}`)
        .set(AUTH.customer).send({ notes: 'updated' }).expect(200);
    });
  });

  describe('POST /orders/:orderId/confirm', () => {
    it('200 confirms order', async () => {
      prisma.order.findUnique.mockResolvedValue(orderRow());
      prisma.order.update.mockResolvedValue(orderRow({ status: 'confirmed' }));
      await request(app.getHttpServer())
        .post(`/api/v1/orders/${UUID_ORDER}/confirm`)
        .set(AUTH.customer).send({}).expect(200);
    });
  });

  describe('POST /orders/:orderId/hold', () => {
    it('200 admin holds order', async () => {
      prisma.order.findUnique.mockResolvedValue(orderRow());
      prisma.order.update.mockResolvedValue(orderRow({ status: 'on_hold' }));
      await request(app.getHttpServer())
        .post(`/api/v1/orders/${UUID_ORDER}/hold`)
        .set(AUTH.admin).send({ reason: 'waiting payment' }).expect(200);
    });
  });

  describe('DELETE /orders/:orderId', () => {
    it('204 soft deletes', async () => {
      await request(app.getHttpServer())
        .delete(`/api/v1/orders/${UUID_ORDER}`).set(AUTH.admin).expect(204);
    });
  });

  describe('POST /orders/:orderId/items', () => {
    it('201 adds item', async () => {
      prisma.order.findUnique.mockResolvedValue(orderRow({ items: [] }));
      prisma.orderItem.findUnique.mockResolvedValue(null);
      prisma.orderItem.create.mockResolvedValue(itemRow());
      prisma.orderItem.deleteMany.mockResolvedValue({ count: 0 });

      const body = {
        productId: UUID_PRODUCT, sku: 'SKU-NEW', name: 'New Item',
        quantity: 2, unitPrice: 100,
      };
      const res = await request(app.getHttpServer())
        .post(`/api/v1/orders/${UUID_ORDER}/items`)
        .set(AUTH.customer).send(body).expect(201);
      expect(res.body.sku).toBe('SKU-1');
    });
  });

  describe('GET /orders/:orderId/items', () => {
    it('200 lists items', async () => {
      prisma.order.findUnique.mockResolvedValue(orderRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/orders/${UUID_ORDER}/items`).set(AUTH.customer).expect(200);
      expect(res.body.items).toBeDefined();
    });
  });

  describe('GET /orders/:orderId/items/:itemId', () => {
    it('200 returns item', async () => {
      prisma.orderItem.findUnique.mockResolvedValue(itemRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/orders/${UUID_ORDER}/items/44444444-4444-4444-8444-444444444444`)
        .set(AUTH.customer).expect(200);
      expect(res.body.id).toBe('44444444-4444-4444-8444-444444444444');
    });
  });
});
