import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, notificationRow } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Email API (e2e)', () => {
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
      await request(app.getHttpServer()).post('/api/v1/email').expect(401);
    });
  });

  describe('POST /api/v1/email', () => {
    it('200/201 — accepts valid email', async () => {
      prisma.notification.create.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/email')
        .set(AUTH.customer)
        .send({
          to: 'user@vubon.com.bd',
          subject: 'Hello',
          text: 'Body text',
        });
      expect([200, 201]).toContain(res.status);
    });

    it('422 — missing to', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/email')
        .set(AUTH.customer)
        .send({ subject: 'S', text: 'T' })
        .expect(422);
    });

    it('422 — missing subject', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/email')
        .set(AUTH.customer)
        .send({ to: 'user@vubon.com.bd', text: 'T' })
        .expect(422);
    });

    it('422 — invalid email format', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/email')
        .set(AUTH.customer)
        .send({ to: 'not-an-email', subject: 'S', text: 'T' })
        .expect(422);
    });
  });

  describe('POST /api/v1/email/with-template', () => {
    it('422 — missing templateSlug', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/email/with-template')
        .set(AUTH.customer)
        .send({ to: 'user@vubon.com.bd', templateData: {} })
        .expect(422);
    });
  });

  describe('GET /api/v1/email', () => {
    it('200 — list', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer())
        .get('/api/v1/email')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/email/:id', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get('/api/v1/email/11111111-1111-4111-8111-111111111111')
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('POST /api/v1/email/:id/retry', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .post('/api/v1/email/11111111-1111-4111-8111-111111111111/retry')
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('POST /api/v1/email/:id/cancel', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .post('/api/v1/email/11111111-1111-4111-8111-111111111111/cancel')
        .set(AUTH.customer)
        .expect(404);
    });
  });
});
