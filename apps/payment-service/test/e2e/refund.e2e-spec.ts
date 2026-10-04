import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  paymentRow,
  refundRow,
  transactionRow,
  AUTH,
  UUID_PAYMENT,
  UUID_REFUND,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Refund API (e2e)', () => {
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

    // Payment — captured
    prisma.payment.findFirst.mockResolvedValue(
      paymentRow({
        status: 'captured',
        authorizedAt: recent,
        capturedAt: recent,
        gatewayPaymentId: 'gw_1',
      }),
    );
    prisma.payment.findUnique.mockResolvedValue({ id: UUID_PAYMENT });
    prisma.payment.update.mockResolvedValue(
      paymentRow({
        status: 'partially_refunded',
        authorizedAt: recent,
        capturedAt: recent,
        gatewayPaymentId: 'gw_1',
        refundedAmount: 500,
      }),
    );

    // Refund
    prisma.refund.findUnique.mockResolvedValue({ id: UUID_REFUND });
    prisma.refund.findFirst.mockResolvedValue(refundRow());
    prisma.refund.findMany.mockResolvedValue([refundRow()]);
    prisma.refund.create.mockResolvedValue(refundRow());
    prisma.refund.update.mockResolvedValue(refundRow());
    prisma.refund.count.mockResolvedValue(1);
    prisma.refund.aggregate.mockResolvedValue({ _sum: { amount: 500 } });

    // Transaction (for ledger entry created during complete)
    prisma.transaction.findUnique.mockResolvedValue({ id: 'tx-existing' });
    prisma.transaction.update.mockResolvedValue(transactionRow({ type: 'refund' }));
    prisma.transaction.create.mockResolvedValue(transactionRow({ type: 'refund' }));
  });

  // ─── Auth ───
  describe('Auth', () => {
    it('401 without Authorization header', async () => {
      await request(app.getHttpServer()).get('/api/v1/refunds').expect(401);
    });

    it('200 with valid Authorization', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/refunds')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── POST /refunds ───
  describe('POST /api/v1/refunds', () => {
    it('201 requests refund for captured payment', async () => {
      prisma.refund.findUnique
        .mockResolvedValueOnce(null) // first save → create
        .mockResolvedValueOnce({ id: UUID_REFUND });
      const res = await request(app.getHttpServer())
        .post('/api/v1/refunds')
        .set(AUTH.customer)
        .send({ paymentId: UUID_PAYMENT, amount: 500, reason: 'damaged product' })
        .expect(201);
      expect(res.body.success).toBe(true);
      expect(res.body.refundId).toBeDefined();
    });

    it('201 requests full refund (no amount)', async () => {
      prisma.refund.findUnique
        .mockResolvedValueOnce(null)
        .mockResolvedValueOnce({ id: UUID_REFUND });
      const res = await request(app.getHttpServer())
        .post('/api/v1/refunds')
        .set(AUTH.customer)
        .send({ paymentId: UUID_PAYMENT })
        .expect(201);
      expect(res.body.success).toBe(true);
    });

    it('400 on invalid paymentId (not UUID)', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/refunds')
        .set(AUTH.customer)
        .send({ paymentId: 'not-a-uuid', amount: 500 })
        .expect(400);
    });

    it('400 on negative amount', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/refunds')
        .set(AUTH.customer)
        .send({ paymentId: UUID_PAYMENT, amount: -100 })
        .expect(400);
    });

    it('400 on missing paymentId', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/refunds')
        .set(AUTH.customer)
        .send({ amount: 500 })
        .expect(400);
    });
  });

  // ─── GET /refunds ───
  describe('GET /api/v1/refunds', () => {
    it('200 lists refunds', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/refunds')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.items).toBeDefined();
    });

    it('200 accepts filters', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/refunds?page=1&limit=10&status=pending')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── GET /refunds/payment/:paymentId ───
  describe('GET /api/v1/refunds/payment/:paymentId', () => {
    it('200 lists refunds for a payment', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/refunds/payment/${UUID_PAYMENT}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  // ─── GET /refunds/:id ───
  describe('GET /api/v1/refunds/:refundId', () => {
    it('200 returns refund', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/refunds/${UUID_REFUND}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_REFUND);
    });

    it('404 when not found', async () => {
      prisma.refund.findFirst.mockResolvedValue(null);
      await request(app.getHttpServer())
        .get(`/api/v1/refunds/${UUID_REFUND}`)
        .set(AUTH.customer)
        .expect(404);
    });
  });

  // ─── GET /refunds/:id/public ───
  describe('GET /api/v1/refunds/:refundId/public', () => {
    it('200 returns public refund view', async () => {
      const res = await request(app.getHttpServer())
        .get(`/api/v1/refunds/${UUID_REFUND}/public`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_REFUND);
    });
  });

  // ─── POST /refunds/:id/approve ───
  describe('POST /api/v1/refunds/:refundId/approve', () => {
    it('200 approves pending refund', async () => {
      prisma.refund.findFirst.mockResolvedValue(refundRow({ status: 'pending' }));
      prisma.refund.update.mockResolvedValue(refundRow({ status: 'pending' }));
      await request(app.getHttpServer())
        .post(`/api/v1/refunds/${UUID_REFUND}/approve`)
        .set(AUTH.admin)
        .send({})
        .expect(200);
    });
  });

  // ─── POST /refunds/:id/process ───
  describe('POST /api/v1/refunds/:refundId/process', () => {
    it('200 starts processing', async () => {
      prisma.refund.findFirst.mockResolvedValue(refundRow({ status: 'pending' }));
      prisma.refund.update.mockResolvedValue(refundRow({ status: 'processing' }));
      await request(app.getHttpServer())
        .post(`/api/v1/refunds/${UUID_REFUND}/process`)
        .set(AUTH.admin)
        .send({ gatewayRefundId: 'gw_rf_1' })
        .expect(200);
    });
  });

  // ─── POST /refunds/:id/complete ───
  describe('POST /api/v1/refunds/:refundId/complete', () => {
    it('200 completes refund', async () => {
      prisma.refund.findFirst.mockResolvedValue(
        refundRow({ status: 'processing', processedAt: null }),
      );
      prisma.refund.update.mockResolvedValue(
        refundRow({ status: 'succeeded', processedAt: recent }),
      );
      await request(app.getHttpServer())
        .post(`/api/v1/refunds/${UUID_REFUND}/complete`)
        .set(AUTH.admin)
        .send({ gatewayRefundId: 'gw_rf_1' })
        .expect(200);
    });
  });

  // ─── POST /refunds/:id/fail ───
  describe('POST /api/v1/refunds/:refundId/fail', () => {
    it('200 marks refund failed', async () => {
      prisma.refund.update.mockResolvedValue(
        refundRow({ status: 'failed', failedAt: recent }),
      );
      await request(app.getHttpServer())
        .post(`/api/v1/refunds/${UUID_REFUND}/fail`)
        .set(AUTH.admin)
        .send({ reason: 'gateway rejected' })
        .expect(200);
    });

    it('400 on missing reason', async () => {
      await request(app.getHttpServer())
        .post(`/api/v1/refunds/${UUID_REFUND}/fail`)
        .set(AUTH.admin)
        .send({})
        .expect(400);
    });
  });

  // ─── POST /refunds/:id/cancel ───
  describe('POST /api/v1/refunds/:refundId/cancel', () => {
    it('200 cancels pending refund', async () => {
      prisma.refund.findFirst.mockResolvedValue(refundRow({ status: 'pending' }));
      prisma.refund.update.mockResolvedValue(refundRow({ status: 'cancelled' }));
      await request(app.getHttpServer())
        .post(`/api/v1/refunds/${UUID_REFUND}/cancel`)
        .set(AUTH.customer)
        .send({ reason: 'user changed mind' })
        .expect(200);
    });
  });
});
