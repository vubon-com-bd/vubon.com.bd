import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  paymentRow,
  transactionRow,
  AUTH,
  UUID_PAYMENT,
  UUID_ORDER,
  UUID_USER,
  UUID_TX,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Payment API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  const recent = new Date(Date.now() - 60 * 1000);

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

    // Payment — default captured state
    prisma.payment.findUnique.mockResolvedValue({ id: UUID_PAYMENT });
    prisma.payment.findFirst.mockResolvedValue(paymentRow());
    prisma.payment.findMany.mockResolvedValue([paymentRow()]);
    prisma.payment.create.mockResolvedValue(paymentRow());
    prisma.payment.update.mockResolvedValue(paymentRow());
    prisma.payment.count.mockResolvedValue(1);
    prisma.payment.aggregate.mockResolvedValue({ _sum: { amount: 1000 } });

    // Transaction — required whenever service records a ledger entry
    prisma.transaction.findUnique.mockResolvedValue({ id: UUID_TX });
    prisma.transaction.findMany.mockResolvedValue([transactionRow()]);
    prisma.transaction.create.mockResolvedValue(transactionRow());
    prisma.transaction.update.mockResolvedValue(transactionRow());
    prisma.transaction.count.mockResolvedValue(1);
  });

  // ─── Auth ───
  describe('Auth', () => {
    it('401 without Authorization header', async () => {
      await request(app.getHttpServer()).get('/api/v1/payments').expect(401);
    });

    it('200 with valid Authorization', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/payments')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── POST /payments ───
  describe('POST /api/v1/payments', () => {
    it('201 creates payment intent', async () => {
      // Override: no idempotency hit + no existing payment (create path)
      prisma.payment.findFirst.mockResolvedValueOnce(null);
      prisma.payment.findUnique
        .mockResolvedValueOnce(null) // save() existence check → create
        .mockResolvedValueOnce({ id: UUID_PAYMENT });
      prisma.payment.create.mockResolvedValueOnce(paymentRow());

      const res = await request(app.getHttpServer())
        .post('/api/v1/payments')
        .set(AUTH.customer)
        .send({
          orderId: UUID_ORDER,
          method: 'mobile_banking',
          amount: 1000,
          currency: 'BDT',
        })
        .expect(201);
      expect(res.body.success).toBe(true);
      expect(res.body.paymentId).toBeDefined();
    });

    it('400 on invalid orderId', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/payments')
        .set(AUTH.customer)
        .send({ orderId: 'not-a-uuid', method: 'mobile_banking', amount: 1000, currency: 'BDT' })
        .expect(400);
    });

    it('400 on amount <= 0', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/payments')
        .set(AUTH.customer)
        .send({ orderId: UUID_ORDER, method: 'mobile_banking', amount: 0, currency: 'BDT' })
        .expect(400);
    });

    it('400 on invalid currency length', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/payments')
        .set(AUTH.customer)
        .send({ orderId: UUID_ORDER, method: 'mobile_banking', amount: 1000, currency: 'BD' })
        .expect(400);
    });
  });

  // ─── GET /payments ───
  describe('GET /api/v1/payments', () => {
    it('200 lists payments', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/payments')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.items).toBeDefined();
    });

    it('200 accepts pagination + filter', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/payments?page=2&limit=10&status=pending&gateway=bkash')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── GET /payments/stats ───
  describe('GET /api/v1/payments/stats', () => {
    it('200 returns stats (admin)', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/payments/stats')
        .set(AUTH.admin)
        .expect(200);
      expect(res.body.totalPayments).toBeDefined();
    });
  });

  // ─── GET by order / user ───
  describe('GET /api/v1/payments/order/:orderId', () => {
    it('200 lists by order', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/payments/order/${UUID_ORDER}`)
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/payments/user/:userId', () => {
    it('200 lists by user', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/payments/user/${UUID_USER}`)
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── GET /:id ───
  describe('GET /api/v1/payments/:paymentId', () => {
    it('200 returns payment', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/payments/${UUID_PAYMENT}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_PAYMENT);
    });

    it('404 when not found', async () => {
      prisma.payment.findFirst.mockResolvedValue(null);
      await request(app.getHttpServer())
        .get(`/api/v1/payments/${UUID_PAYMENT}`)
        .set(AUTH.customer)
        .expect(404);
    });
  });

  // ─── GET /:id/detail ───
  describe('GET /api/v1/payments/:paymentId/detail', () => {
    it('200 detail with transactions', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/payments/${UUID_PAYMENT}/detail`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.payment).toBeDefined();
      expect(res.body.transactions).toBeDefined();
    });
  });

  // ─── GET /:id/public ───
  describe('GET /api/v1/payments/:paymentId/public', () => {
    it('200 public view', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/payments/${UUID_PAYMENT}/public`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_PAYMENT);
    });
  });

  // ─── POST /:id/verify ───
  describe('POST /api/v1/payments/:paymentId/verify', () => {
    it('200 verifies (no signature)', async () => {
      await request(app.getHttpServer())
        .post(`/api/v1/payments/${UUID_PAYMENT}/verify`)
        .set(AUTH.customer)
        .send({})
        .expect(200);
    });
  });

  // ─── POST /:id/capture ───
  describe('POST /api/v1/payments/:paymentId/capture', () => {
    it('200 captures authorized payment', async () => {
      prisma.payment.findFirst.mockResolvedValue(
        paymentRow({
          status: 'authorized',
          authorizedAt: recent,
          gatewayPaymentId: 'gw_1',
        }),
      );
      prisma.payment.update.mockResolvedValue(paymentRow({ status: 'captured' }));
      await request(app.getHttpServer())
        .post(`/api/v1/payments/${UUID_PAYMENT}/capture`)
        .set(AUTH.customer)
        .send({ amount: 1000 })
        .expect(200);
    });
  });

  // ─── POST /:id/fail ───
  describe('POST /api/v1/payments/:paymentId/fail', () => {
    it('200 fails pending payment', async () => {
      prisma.payment.update.mockResolvedValue(paymentRow({ status: 'failed' }));
      await request(app.getHttpServer())
        .post(`/api/v1/payments/${UUID_PAYMENT}/fail`)
        .set(AUTH.customer)
        .send({ reason: 'gateway declined' })
        .expect(200);
    });
  });

  // ─── POST /:id/cancel ───
  describe('POST /api/v1/payments/:paymentId/cancel', () => {
    it('200 cancels pending payment', async () => {
      prisma.payment.update.mockResolvedValue(paymentRow({ status: 'cancelled' }));
      await request(app.getHttpServer())
        .post(`/api/v1/payments/${UUID_PAYMENT}/cancel`)
        .set(AUTH.customer)
        .send({})
        .expect(200);
    });
  });

  // ─── POST /:id/retry ───
  describe('POST /api/v1/payments/:paymentId/retry', () => {
    it('200 retries failed payment', async () => {
      prisma.payment.findFirst.mockResolvedValue(
        paymentRow({
          status: 'failed',
          failedAt: recent,
          failureReason: 'network',
          retryAttempts: 0,
        }),
      );
      prisma.payment.update.mockResolvedValue(paymentRow({ status: 'pending' }));
      await request(app.getHttpServer())
        .post(`/api/v1/payments/${UUID_PAYMENT}/retry`)
        .set(AUTH.customer)
        .send({})
        .expect(200);
    });
  });

  // ─── POST /:id/chargeback ───
  describe('POST /api/v1/payments/:paymentId/chargeback', () => {
    it('200 marks captured payment as chargeback', async () => {
      prisma.payment.findFirst.mockResolvedValue(
        paymentRow({
          status: 'captured',
          authorizedAt: recent,
          capturedAt: recent,
          gatewayPaymentId: 'gw_1',
        }),
      );
      prisma.payment.update.mockResolvedValue(paymentRow({ status: 'chargeback' }));
      await request(app.getHttpServer())
        .post(`/api/v1/payments/${UUID_PAYMENT}/chargeback`)
        .set(AUTH.customer)
        .send({ amount: 1000, reason: 'dispute' })
        .expect(200);
    });
  });

  // ─── POST /:id/mark-paid ───
  describe('POST /api/v1/payments/:paymentId/mark-paid', () => {
    it('200 marks captured payment as paid', async () => {
      prisma.payment.findFirst.mockResolvedValue(
        paymentRow({
          status: 'captured',
          authorizedAt: recent,
          capturedAt: recent,
          gatewayPaymentId: 'gw_1',
        }),
      );
      prisma.payment.update.mockResolvedValue(paymentRow({ status: 'paid' }));
      await request(app.getHttpServer())
        .post(`/api/v1/payments/${UUID_PAYMENT}/mark-paid`)
        .set(AUTH.customer)
        .send({})
        .expect(200);
    });
  });
});
