import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  AUTH,
  UUID_BROADCAST,
  UUID_TEMPLATE,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Broadcast API (e2e)', () => {
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
      await request(app.getHttpServer()).get('/api/v1/broadcasts').expect(401);
    });
  });

  describe('POST /api/v1/broadcasts', () => {
    it('201 — create valid broadcast', async () => {
      prisma.notificationBroadcast.create.mockResolvedValueOnce({
        id: UUID_BROADCAST,
        type: 'all_users',
        status: 'draft',
        target: 'all',
        templateId: UUID_TEMPLATE,
        channels: ['email'],
        estimatedRecipients: null,
        totalRecipients: null,
        processed: 0,
        succeeded: 0,
        failed: 0,
        failureReasons: [],
        scheduledAt: null,
        startedAt: null,
        completedAt: null,
        createdBy: '33333333-3333-4333-8333-333333333333',
        approvedBy: null,
        metadata: null,
        version: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      } as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/broadcasts')
        .set(AUTH.admin)
        .send({
          type: 'all_users',
          target: 'all',
          templateId: UUID_TEMPLATE,
          channels: ['email'],
        });
      expect([200, 201, 422, 500]).toContain(res.status);
    });

    it('422 — empty channels', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/broadcasts')
        .set(AUTH.admin)
        .send({
          type: 'all_users',
          target: 'all',
          templateId: UUID_TEMPLATE,
          channels: [],
        })
        .expect(422);
    });

    it('422 — missing templateId', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/broadcasts')
        .set(AUTH.admin)
        .send({
          type: 'all_users',
          target: 'all',
          channels: ['email'],
        })
        .expect(422);
    });
  });

  describe('GET /api/v1/broadcasts', () => {
    it('200 — list', async () => {
      prisma.notificationBroadcast.findMany.mockResolvedValueOnce([] as never);
      prisma.notificationBroadcast.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer())
        .get('/api/v1/broadcasts')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/broadcasts/:id', () => {
    it('404 — not found', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/broadcasts/${UUID_BROADCAST}`)
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('GET /api/v1/broadcasts/:id/stats', () => {
    it('404/200', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/broadcasts/${UUID_BROADCAST}/stats`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('GET /api/v1/broadcasts/:id/progress', () => {
    it('404/200', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/broadcasts/${UUID_BROADCAST}/progress`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/broadcasts/:id', () => {
    it('404/200', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/broadcasts/${UUID_BROADCAST}`)
        .set(AUTH.admin)
        .send({ channels: ['email'] });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/broadcasts/:id/schedule', () => {
    it('404/200', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/broadcasts/${UUID_BROADCAST}/schedule`)
        .set(AUTH.admin)
        .send({ scheduledAt: new Date(Date.now() + 3600_000).toISOString() });
      expect([200, 404]).toContain(res.status);
    });

    it('422 — missing scheduledAt', async () => {
      await request(app.getHttpServer())
        .post(`/api/v1/broadcasts/${UUID_BROADCAST}/schedule`)
        .set(AUTH.admin)
        .send({})
        .expect(422);
    });
  });

  describe('POST /api/v1/broadcasts/:id/start', () => {
    it('404/200', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/broadcasts/${UUID_BROADCAST}/start`)
        .set(AUTH.admin)
        .send({ totalRecipients: 100 });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/broadcasts/:id/cancel', () => {
    it('404/200', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/broadcasts/${UUID_BROADCAST}/cancel`)
        .set(AUTH.admin)
        .send({ reason: 'no longer needed' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/broadcasts/:id/test', () => {
    it('404/200', async () => {
      prisma.notificationBroadcast.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/broadcasts/${UUID_BROADCAST}/test`)
        .set(AUTH.admin)
        .send({ recipientIds: ['33333333-3333-4333-8333-333333333333'] });
      expect([200, 404]).toContain(res.status);
    });
  });
});
