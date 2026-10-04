import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  transactionRow,
  AUTH,
  UUID_PAYMENT,
  UUID_ORDER,
  UUID_TX,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Transaction API (e2e)', () => {
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
    prisma.transaction.findFirst.mockResolvedValue(transactionRow());
    prisma.transaction.findMany.mockResolvedValue([transactionRow()]);
    prisma.transaction.count.mockResolvedValue(1);
    prisma.transaction.aggregate.mockResolvedValue({ _sum: { amount: 1000 } });
  });

  // ─── Auth ───
  describe('Auth', () => {
    it('401 without Authorization', async () => {
      await request(app.getHttpServer()).get('/api/v1/transactions').expect(401);
    });

    it('200 with Authorization', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/transactions')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── GET /transactions ───
  describe('GET /api/v1/transactions', () => {
    it('200 lists transactions', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/transactions')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.items).toBeDefined();
      expect(res.body.total).toBeDefined();
    });

    it('200 accepts pagination + filters', async () => {
      await request(app.getHttpServer())
        .get(
          `/api/v1/transactions?page=1&limit=10&type=payment&status=success&gateway=bkash`,
        )
        .set(AUTH.customer)
        .expect(200);
    });

    it('200 accepts paymentId filter', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/transactions?paymentId=${UUID_PAYMENT}`)
        .set(AUTH.customer)
        .expect(200);
    });

    it('200 accepts orderId filter', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/transactions?orderId=${UUID_ORDER}`)
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── GET /transactions/payment/:paymentId ───
  describe('GET /api/v1/transactions/payment/:paymentId', () => {
    it('200 lists transactions for a payment', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/transactions/payment/${UUID_PAYMENT}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  // ─── GET /transactions/order/:orderId ───
  describe('GET /api/v1/transactions/order/:orderId', () => {
    it('200 lists transactions for an order', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/transactions/order/${UUID_ORDER}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  // ─── GET /transactions/:id ───
  describe('GET /api/v1/transactions/:transactionId', () => {
    it('200 returns transaction', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/transactions/${UUID_TX}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_TX);
    });

    it('404 when not found', async () => {
      prisma.transaction.findFirst.mockResolvedValue(null);
      await request(app.getHttpServer())
        .get(`/api/v1/transactions/${UUID_TX}`)
        .set(AUTH.customer)
        .expect(404);
    });
  });
});
