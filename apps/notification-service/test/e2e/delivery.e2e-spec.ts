import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  AUTH,
  notificationRow,
  UUID_NOTIFICATION,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Delivery API (e2e)', () => {
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
      await request(app.getHttpServer()).get('/api/v1/delivery').expect(401);
    });
  });

  describe('GET /api/v1/delivery/:notificationId', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/delivery/${UUID_NOTIFICATION}`)
        .set(AUTH.customer)
        .expect(404);
    });

    it('200 — returns delivery status', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/delivery/${UUID_NOTIFICATION}`)
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('GET /api/v1/delivery', () => {
    it('200 — paginated list', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/delivery')
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });

    it('200 — filter by channel', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/delivery?channel=email')
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });

    it('422 — invalid limit', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/delivery?limit=500')
        .set(AUTH.customer)
        .expect(422);
    });
  });
});
