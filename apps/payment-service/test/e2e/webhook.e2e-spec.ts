import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  paymentRow,
  webhookRow,
  AUTH,
  UUID_PAYMENT,
  UUID_WEBHOOK,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Webhook API (e2e)', () => {
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
    prisma.payment.findFirst.mockResolvedValue(
      paymentRow({
        status: 'captured',
        authorizedAt: recent,
        capturedAt: recent,
        gatewayPaymentId: 'gw_1',
      }),
    );
    prisma.payment.update.mockResolvedValue(paymentRow({ status: 'paid' }));
    prisma.webhookEvent.findFirst.mockResolvedValue(null); // dedup miss
    prisma.webhookEvent.findUnique
      .mockResolvedValueOnce(null) // save existence check
      .mockResolvedValueOnce(webhookRow({ verified: true, processed: true }));
    prisma.webhookEvent.create.mockResolvedValue(
      webhookRow({ verified: true, processed: true }),
    );
    prisma.webhookEvent.update.mockResolvedValue(
      webhookRow({ verified: true, processed: true }),
    );
    prisma.webhookEvent.findMany.mockResolvedValue([webhookRow()]);
    prisma.webhookEvent.count.mockResolvedValue(1);
  });

  // ─── PUBLIC webhook receiver ───
  describe('POST /api/v1/webhooks/:gateway — public endpoint', () => {
    it('200 accepts webhook WITHOUT Authorization header (@Public)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks/bkash')
        .send({
          id: 'evt_bkash_1',
          type: 'payment.succeeded',
          paymentId: UUID_PAYMENT,
          status: 'success',
        })
        .expect(200);
      expect(res.body.success).toBe(true);
      expect(res.body.webhookId).toBeDefined();
    });

    it('200 accepts nagad webhook with event_id', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks/nagad')
        .send({
          event_id: 'evt_nagad_1',
          event_type: 'payment.succeeded',
          paymentId: UUID_PAYMENT,
        })
        .expect(200);
      expect(res.body.success).toBe(true);
    });

    it('200 accepts stripe webhook with signature', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks/stripe')
        .send({
          id: 'evt_stripe_1',
          type: 'payment_intent.succeeded',
          paymentId: UUID_PAYMENT,
          signature: 'sig_abc123',
        })
        .expect(200);
      expect(res.body.success).toBe(true);
    });

    it('200 handles webhook without any id (auto-generates eventId)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks/rocket')
        .send({ paymentId: UUID_PAYMENT })
        .expect(200);
      expect(res.body.success).toBe(true);
    });

    it('200 handles duplicate webhook gracefully', async () => {
      prisma.webhookEvent.findFirst.mockResolvedValueOnce(
        webhookRow({ id: UUID_WEBHOOK, processed: false }),
      );
      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks/bkash')
        .send({
          id: 'evt_bkash_duplicate',
          type: 'payment.succeeded',
        })
        .expect(200);
      expect(res.body.webhookId).toBeDefined();
    });
  });

  // ─── GET /webhooks (protected) ───
  describe('GET /api/v1/webhooks', () => {
    it('401 without Authorization', async () => {
      await request(app.getHttpServer()).get('/api/v1/webhooks').expect(401);
    });

    it('200 lists webhook events', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/webhooks')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.items).toBeDefined();
    });

    it('200 accepts filters', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/webhooks?gateway=bkash&processed=false&verified=true')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  // ─── GET /webhooks/:id (protected) ───
  describe('GET /api/v1/webhooks/:webhookId', () => {
    it('401 without Authorization', async () => {
      await request(app.getHttpServer())
        .get(`/api/v1/webhooks/${UUID_WEBHOOK}`)
        .expect(401);
    });

    it('200 returns webhook event', async () => {
      prisma.webhookEvent.findFirst.mockResolvedValue(webhookRow());
      const res = await request(app.getHttpServer())
        .get(`/api/v1/webhooks/${UUID_WEBHOOK}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_WEBHOOK);
    });

    it('404 when not found', async () => {
      prisma.webhookEvent.findFirst.mockResolvedValue(null);
      await request(app.getHttpServer())
        .get(`/api/v1/webhooks/${UUID_WEBHOOK}`)
        .set(AUTH.customer)
        .expect(404);
    });
  });
});
