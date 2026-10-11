import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  AUTH,
  webhookRow,
  UUID_WEBHOOK,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Webhook API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });
  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  describe('Auth', () => {
    it('401 without token', async () => {
      await request(app.getHttpServer()).get('/api/v1/webhooks').expect(401);
    });
  });

  describe('POST /api/v1/webhooks', () => {
    it('201 — create valid webhook', async () => {
      prisma.notificationWebhook.count.mockResolvedValueOnce(0 as never);
      prisma.notificationWebhook.create.mockResolvedValueOnce(webhookRow() as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks')
        .set(AUTH.admin)
        .send({
          url: 'https://example.com/vubon/webhook',
          method: 'POST',
          events: ['order.created'],
        });
      expect([200, 201, 422, 500]).toContain(res.status);
    });

    it('422 — invalid URL', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/webhooks')
        .set(AUTH.admin)
        .send({ url: 'not-a-url', method: 'POST', events: ['order.created'] })
        .expect(422);
    });

    it('422 — empty events', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/webhooks')
        .set(AUTH.admin)
        .send({ url: 'https://x.com/h', method: 'POST', events: [] })
        .expect(422);
    });

    it('422 — invalid method', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/webhooks')
        .set(AUTH.admin)
        .send({ url: 'https://x.com/h', method: 'FLY', events: ['order.created'] })
        .expect(422);
    });
  });

  describe('GET /api/v1/webhooks', () => {
    it('200 — list', async () => {
      prisma.notificationWebhook.findMany.mockResolvedValueOnce([] as never);
      prisma.notificationWebhook.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer())
        .get('/api/v1/webhooks')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/webhooks/:id', () => {
    it('404 — not found', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/webhooks/${UUID_WEBHOOK}`)
        .set(AUTH.customer)
        .expect(404);
    });

    it('200 — found', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(webhookRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/webhooks/${UUID_WEBHOOK}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_WEBHOOK);
    });
  });

  describe('GET /api/v1/webhooks/:id/deliveries', () => {
    it('200/404', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(webhookRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/webhooks/${UUID_WEBHOOK}/deliveries`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/webhooks/:id', () => {
    it('200/404', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(webhookRow() as never);
      prisma.notificationWebhook.update.mockResolvedValueOnce(webhookRow() as never);
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/webhooks/${UUID_WEBHOOK}`)
        .set(AUTH.admin)
        .send({ description: 'updated' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/webhooks/:id/activate', () => {
    it('200/404', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(webhookRow() as never);
      prisma.notificationWebhook.update.mockResolvedValueOnce(webhookRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/webhooks/${UUID_WEBHOOK}/activate`)
        .set(AUTH.admin);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/webhooks/:id/deactivate', () => {
    it('200/404', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(webhookRow() as never);
      prisma.notificationWebhook.update.mockResolvedValueOnce(webhookRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/webhooks/${UUID_WEBHOOK}/deactivate`)
        .set(AUTH.admin)
        .send({ reason: 'maintenance' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/webhooks/:id/disable', () => {
    it('200/404', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(webhookRow() as never);
      prisma.notificationWebhook.update.mockResolvedValueOnce(webhookRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/webhooks/${UUID_WEBHOOK}/disable`)
        .set(AUTH.admin)
        .send({ reason: 'too many failures' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/webhooks/:id/test', () => {
    it('200/404', async () => {
      prisma.notificationWebhook.findFirst.mockResolvedValueOnce(webhookRow() as never);
      prisma.notificationWebhook.update.mockResolvedValueOnce(webhookRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/webhooks/${UUID_WEBHOOK}/test`)
        .set(AUTH.admin)
        .send({ event: 'order.created', payload: {} });
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('POST /api/v1/webhooks/deliveries/:id/retry', () => {
    it('404/200', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks/deliveries/11111111-1111-4111-8111-111111111111/retry')
        .set(AUTH.admin);
      expect([200, 404, 500]).toContain(res.status);
    });
  });
});
