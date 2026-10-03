import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp, orderRow, AUTH, UUID_ORDER, UUID_DELIVERY, UUID_METHOD, NOW,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

function deliveryRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_DELIVERY, orderId: UUID_ORDER, deliveryMethodId: null,
    status: 'scheduled', type: 'standard',
    trackingNumber: null, courierId: null,
    estimatedAt: null, deliveredAt: null,
    attempts: 0, notes: null,
    createdAt: NOW, updatedAt: NOW, deletedAt: null, ...o,
  };
}
function methodRow(o: Record<string, unknown> = {}) {
  return {
    id: UUID_METHOD, name: 'Standard', type: 'standard', carrier: null,
    baseCost: 50, currency: 'BDT', estimatedDays: 3, isActive: true,
    createdAt: NOW, updatedAt: NOW, ...o,
  };
}

describe('Delivery API (e2e)', () => {
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
    prisma.delivery.findUnique.mockResolvedValue(deliveryRow());
    prisma.delivery.findFirst.mockResolvedValue(deliveryRow());
    prisma.delivery.findMany.mockResolvedValue([deliveryRow()]);
    prisma.delivery.create.mockResolvedValue(deliveryRow());
    prisma.delivery.update.mockResolvedValue(deliveryRow());
    prisma.deliveryMethod.findMany.mockResolvedValue([methodRow()]);
    prisma.deliveryMethod.findUnique.mockResolvedValue(methodRow());
  });

  it('401 without token', async () => {
    await request(app.getHttpServer()).get('/api/v1/deliveries/methods').expect(401);
  });

  it('201 schedule delivery', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/v1/deliveries')
      .set(AUTH.admin)
      .send({ orderId: UUID_ORDER, type: 'standard' })
      .expect(201);
    expect(res.body.id).toBe(UUID_DELIVERY);
  });

  it('200 list methods', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/deliveries/methods').set(AUTH.customer).expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('200 get by id', async () => {
    await request(app.getHttpServer())
      .get(`/api/v1/deliveries/${UUID_DELIVERY}`).set(AUTH.customer).expect(200);
  });

  it('404 not found', async () => {
    prisma.delivery.findUnique.mockResolvedValue(null);
    await request(app.getHttpServer())
      .get(`/api/v1/deliveries/${UUID_DELIVERY}`).set(AUTH.customer).expect(404);
  });
});
