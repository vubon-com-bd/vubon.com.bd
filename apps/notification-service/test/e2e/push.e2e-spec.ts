import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, notificationRow, deviceRow, UUID_USER } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Push API (e2e)', () => {
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
      await request(app.getHttpServer()).post('/api/v1/push').expect(401);
    });
  });

  describe('POST /api/v1/push', () => {
    it('200/201 — sends with explicit tokens', async () => {
      prisma.notification.create.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/push')
        .set(AUTH.customer)
        .send({
          tokens: ['abcdefghijklmnop123456'],
          title: 'Order update',
          body: 'Your order shipped.',
        });
      expect([200, 201]).toContain(res.status);
    });

    it('200/201 — sends by userIds (resolves devices)', async () => {
      prisma.notificationDevice.findMany.mockResolvedValueOnce([deviceRow()] as never);
      prisma.notification.create.mockResolvedValue(notificationRow() as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/push')
        .set(AUTH.customer)
        .send({ userIds: [UUID_USER], title: 'T', body: 'B' });
      expect([200, 201]).toContain(res.status);
    });

    it('422 — missing title', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/push')
        .set(AUTH.customer)
        .send({ tokens: ['tk'], body: 'B' })
        .expect(422);
    });

    it('422 — title too long (>65)', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/push')
        .set(AUTH.customer)
        .send({ tokens: ['tk'], title: 'x'.repeat(66), body: 'B' })
        .expect(422);
    });

    it('422 — body too long (>240)', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/push')
        .set(AUTH.customer)
        .send({ tokens: ['tk'], title: 'T', body: 'x'.repeat(241) })
        .expect(422);
    });
  });

  describe('POST /api/v1/push/topic', () => {
    it('422 — missing topic', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/push/topic')
        .set(AUTH.customer)
        .send({ title: 'T', body: 'B' })
        .expect(422);
    });
  });

  describe('POST /api/v1/push/subscribe', () => {
    it('200/201 — valid subscription', async () => {
      prisma.notificationDevice.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/push/subscribe')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          token: 'abcdefghijklmnop123456',
          platform: 'android',
        });
      expect([200, 201]).toContain(res.status);
    });

    it('422 — missing token', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/push/subscribe')
        .set(AUTH.customer)
        .send({ userId: UUID_USER, platform: 'android' })
        .expect(422);
    });
  });

  describe('POST /api/v1/push/unsubscribe/:token', () => {
    it('204/404', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/push/unsubscribe/abcdefghijklmnop123456')
        .set(AUTH.customer);
      expect([204, 404]).toContain(res.status);
    });
  });

  describe('GET /api/v1/push', () => {
    it('200 — list', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer()).get('/api/v1/push').set(AUTH.customer).expect(200);
    });
  });

  describe('GET /api/v1/push/:id', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get('/api/v1/push/11111111-1111-4111-8111-111111111111')
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('POST /api/v1/push/:id/retry', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .post('/api/v1/push/11111111-1111-4111-8111-111111111111/retry')
        .set(AUTH.customer)
        .expect(404);
    });
  });
});
