import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, notificationRow, UUID_USER, UUID_NOTIFICATION } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('In-App API (e2e)', () => {
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
      await request(app.getHttpServer()).get('/api/v1/in-app/inbox').expect(401);
    });
  });

  describe('POST /api/v1/in-app', () => {
    it('200/201 — valid in-app', async () => {
      prisma.notification.create.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/in-app')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'toast',
          title: 'Welcome',
          body: 'Hello!',
        });
      expect([200, 201]).toContain(res.status);
    });

    it('422 — missing title', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/in-app')
        .set(AUTH.customer)
        .send({ userId: UUID_USER, type: 'toast', body: 'B' })
        .expect(422);
    });
  });

  describe('GET /api/v1/in-app/inbox', () => {
    it('200 — inbox empty', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);

      const res = await request(app.getHttpServer())
        .get('/api/v1/in-app/inbox')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });

    it('200 — unreadOnly filter', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);

      await request(app.getHttpServer())
        .get('/api/v1/in-app/inbox?unreadOnly=true')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/in-app/:id', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/in-app/${UUID_NOTIFICATION}`)
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('POST /api/v1/in-app/:id/read', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .post(`/api/v1/in-app/${UUID_NOTIFICATION}/read`)
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('POST /api/v1/in-app/:id/dismiss', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .post(`/api/v1/in-app/${UUID_NOTIFICATION}/dismiss`)
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('POST /api/v1/in-app/:id/click', () => {
    it('404/200', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/in-app/${UUID_NOTIFICATION}/click`)
        .set(AUTH.customer)
        .send({ actionId: 'a-1' });
      expect([200, 404]).toContain(res.status);
    });
  });
});
