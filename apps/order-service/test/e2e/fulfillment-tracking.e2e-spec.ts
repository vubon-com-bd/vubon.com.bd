import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp, orderRow, AUTH,
  UUID_ORDER, UUID_FULFILL, UUID_TRACK, UUID_ITEM, NOW,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

function fulfillRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_FULFILL, orderId: UUID_ORDER, vendorId: null,
    status: 'unfulfilled', type: 'standard', itemIds: [UUID_ITEM],
    trackingNumber: null, courierId: null, warehouseId: null,
    shippingCost: null, currency: 'BDT',
    fulfilledAt: null, deliveredAt: null, notes: null,
    createdAt: NOW, updatedAt: NOW, ...o,
  };
}
function trackRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_TRACK, orderId: UUID_ORDER, event: 'order_placed',
    message: 'Order placed', location: null, latitude: null, longitude: null,
    trackingNumber: null, createdBy: null, metadata: null,
    occurredAt: NOW, createdAt: NOW, ...o,
  };
}

describe('Fulfillment + Tracking API (e2e)', () => {
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

    // Full order row so OrderEntity.reconstitute works
    prisma.order.findUnique.mockResolvedValue(orderRow());

    prisma.orderFulfillment.findUnique.mockResolvedValue(fulfillRow());
    prisma.orderFulfillment.findFirst.mockResolvedValue(fulfillRow());
    prisma.orderFulfillment.findMany.mockResolvedValue([fulfillRow()]);
    prisma.orderFulfillment.create.mockResolvedValue(fulfillRow());
    prisma.orderFulfillment.update.mockResolvedValue(fulfillRow());

    prisma.orderTracking.findUnique.mockResolvedValue(trackRow());
    prisma.orderTracking.findMany.mockResolvedValue([trackRow()]);
    prisma.orderTracking.create.mockResolvedValue(trackRow());
    prisma.orderTracking.update.mockResolvedValue(trackRow());
  });

  describe('Fulfillment', () => {
    it('201 start fulfillment', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/order-fulfillments/start')
        .set(AUTH.vendor)
        .send({ orderId: UUID_ORDER, itemIds: [UUID_ITEM], type: 'standard' })
        .expect(201);
      expect(res.body.id).toBe(UUID_FULFILL);
    });

    it('200 get fulfillment by id', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/order-fulfillments/${UUID_FULFILL}`)
        .set(AUTH.vendor).expect(200);
    });

    it('200 pack', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/order-fulfillments/pack')
        .set(AUTH.vendor)
        .send({ fulfillmentId: UUID_FULFILL, orderId: UUID_ORDER })
        .expect(200);
    });
  });

  describe('Tracking', () => {
    it('201 add tracking', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/order-tracking/add')
        .set(AUTH.admin)
        .send({ orderId: UUID_ORDER, event: 'order_placed', message: 'Order placed' })
        .expect(201);
      expect(res.body.id).toBe(UUID_TRACK);
    });

    it('422 on missing message (schema validation)', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/order-tracking/add')
        .set(AUTH.admin)
        .send({ orderId: UUID_ORDER, event: 'order_placed' })
        .expect(422);
    });

    it('200 tracking events', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/order-tracking/order/${UUID_ORDER}/events`)
        .set(AUTH.customer)
        .expect(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('200 tracking summary', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/order-tracking/order/${UUID_ORDER}/summary`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.orderId).toBe(UUID_ORDER);
    });
  });
});
