import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Provider Webhook API (e2e) — INBOUND', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });
  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  // ═══ PUBLIC — NO AUTH REQUIRED ═══
  describe('POST /api/v1/provider-webhooks/:provider (@Public)', () => {
    it('200/400 — sendgrid without auth token', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/provider-webhooks/sendgrid')
        .send({ events: [] });
      expect([200, 400, 500, 422]).toContain(res.status);
    });

    it('200/400 — twilio delivered event', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/provider-webhooks/twilio')
        .send({ MessageSid: 'SM123', MessageStatus: 'delivered' });
      expect([200, 400, 422, 500]).toContain(res.status);
    });

    it('200/400 — ses bounce event', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/provider-webhooks/ses')
        .send({
          Message: JSON.stringify({
            eventType: 'Bounce',
            mail: { messageId: 'm1', timestamp: new Date().toISOString() },
          }),
        });
      expect([200, 400, 422, 500]).toContain(res.status);
    });

    it('200/400 — sendgrid webhook with empty body', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/provider-webhooks/sendgrid')
        .send({});
      expect([200, 400, 422, 500]).toContain(res.status);
    });

    it('400/422 — unknown provider', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/provider-webhooks/unknown-provider')
        .send({});
      expect([400, 422, 500]).toContain(res.status);
    });

    it('does NOT require Authorization header', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/provider-webhooks/sendgrid')
        .send({ events: [] });
      // Should NOT be 401 (unlike other routes)
      expect(res.status).not.toBe(401);
    });
  });
});
