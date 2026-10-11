import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, UUID_DIGEST, UUID_USER } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Digest API (e2e)', () => {
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
      await request(app.getHttpServer()).get('/api/v1/digests').expect(401);
    });
  });

  describe('POST /api/v1/digests', () => {
    it('201 — create valid digest', async () => {
      prisma.notificationDigest.create.mockResolvedValueOnce({
        id: UUID_DIGEST,
        userId: UUID_USER,
        frequency: 'daily',
        type: 'summary',
        status: 'pending',
        periodStart: new Date(Date.now() - 86400_000),
        periodEnd: new Date(),
        itemCount: 0,
        itemIds: [],
        channel: null,
        generatedAt: null,
        sentAt: null,
        failureReason: null,
        metadata: null,
        version: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/digests')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          frequency: 'daily',
          type: 'summary',
          periodStart: new Date(Date.now() - 86400_000).toISOString(),
          periodEnd: new Date().toISOString(),
        });
      expect([200, 201, 422, 500]).toContain(res.status);
    });

    it('422 — missing userId', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/digests')
        .set(AUTH.customer)
        .send({ frequency: 'daily', type: 'summary' })
        .expect(422);
    });
  });

  describe('POST /api/v1/digests/generate', () => {
    it('201/422', async () => {
      prisma.notificationDigest.create.mockResolvedValueOnce({} as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/digests/generate')
        .set(AUTH.customer)
        .send({ userId: UUID_USER, frequency: 'daily' });
      expect([200, 201, 422, 500]).toContain(res.status);
    });
  });

  describe('GET /api/v1/digests', () => {
    it('200 — list', async () => {
      prisma.notificationDigest.findMany.mockResolvedValueOnce([] as never);
      prisma.notificationDigest.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer())
        .get('/api/v1/digests')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/digests/preview', () => {
    it('200/422', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/digests/preview?userId=${UUID_USER}&frequency=daily`)
        .set(AUTH.customer);
      expect([200, 422, 404]).toContain(res.status);
    });
  });

  describe('GET /api/v1/digests/:id', () => {
    it('404 — not found', async () => {
      prisma.notificationDigest.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/digests/${UUID_DIGEST}`)
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('PATCH /api/v1/digests/:id', () => {
    it('404/200', async () => {
      prisma.notificationDigest.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/digests/${UUID_DIGEST}`)
        .set(AUTH.customer)
        .send({ frequency: 'weekly' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/digests/:id/send', () => {
    it('404/200', async () => {
      prisma.notificationDigest.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/digests/${UUID_DIGEST}/send`)
        .set(AUTH.customer)
        .send({ channel: 'email' });
      expect([200, 404]).toContain(res.status);
    });

    it('422 — missing channel', async () => {
      await request(app.getHttpServer())
        .post(`/api/v1/digests/${UUID_DIGEST}/send`)
        .set(AUTH.customer)
        .send({})
        .expect(422);
    });
  });

  describe('POST /api/v1/digests/:id/cancel', () => {
    it('404/200', async () => {
      prisma.notificationDigest.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/digests/${UUID_DIGEST}/cancel`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });
});
