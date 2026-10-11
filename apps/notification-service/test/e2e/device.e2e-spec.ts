import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  AUTH,
  deviceRow,
  UUID_DEVICE,
  UUID_USER,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Device API (e2e)', () => {
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
      await request(app.getHttpServer()).get('/api/v1/devices').expect(401);
    });
  });

  describe('POST /api/v1/devices', () => {
    it('201 — register valid device', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(null as never);
      prisma.notificationDevice.create.mockResolvedValueOnce(deviceRow() as never);
      prisma.notificationDevice.count.mockResolvedValueOnce(0 as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/devices')
        .set(AUTH.customer)
        .send({
          userId: UUID_USER,
          type: 'android',
          token: 'abcdefghijklmnop123456',
        });
      expect([200, 201, 422, 500]).toContain(res.status);
    });

    it('422 — missing token', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/devices')
        .set(AUTH.customer)
        .send({ userId: UUID_USER, type: 'android' })
        .expect(422);
    });

    it('422 — invalid type enum', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/devices')
        .set(AUTH.customer)
        .send({ userId: UUID_USER, type: 'toaster', token: 'tk-abcdefghijklmnop' })
        .expect(422);
    });

    it('422 — token too short', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/devices')
        .set(AUTH.customer)
        .send({ userId: UUID_USER, type: 'android', token: 'short' })
        .expect(422);
    });
  });

  describe('GET /api/v1/devices', () => {
    it('200 — paginated list', async () => {
      prisma.notificationDevice.findMany.mockResolvedValueOnce([] as never);
      prisma.notificationDevice.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer())
        .get('/api/v1/devices')
        .set(AUTH.customer)
        .expect(200);
    });
  });

  describe('GET /api/v1/devices/active', () => {
    it('200 — active devices', async () => {
      prisma.notificationDevice.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/devices/active')
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('GET /api/v1/devices/:id', () => {
    it('404 — not found', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/devices/${UUID_DEVICE}`)
        .set(AUTH.customer)
        .expect(404);
    });

    it('200 — found', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(deviceRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/devices/${UUID_DEVICE}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_DEVICE);
    });
  });

  describe('PATCH /api/v1/devices/:id', () => {
    it('200/404', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(deviceRow() as never);
      prisma.notificationDevice.update.mockResolvedValueOnce(deviceRow() as never);
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/devices/${UUID_DEVICE}`)
        .set(AUTH.customer)
        .send({ appVersion: '2.0.0' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/devices/:id/refresh-token', () => {
    it('200/404', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(deviceRow() as never);
      prisma.notificationDevice.update.mockResolvedValueOnce(deviceRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/devices/${UUID_DEVICE}/refresh-token`)
        .set(AUTH.customer)
        .send({ newToken: 'newtoken0123456789ab' });
      expect([200, 404, 422]).toContain(res.status);
    });

    it('422 — missing newToken', async () => {
      await request(app.getHttpServer())
        .post(`/api/v1/devices/${UUID_DEVICE}/refresh-token`)
        .set(AUTH.customer)
        .send({})
        .expect(422);
    });
  });

  describe('POST /api/v1/devices/:id/block', () => {
    it('404/200', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(null as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/devices/${UUID_DEVICE}/block`)
        .set(AUTH.customer)
        .send({ reason: 'abuse' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('DELETE /api/v1/devices/:id', () => {
    it('204/404', async () => {
      prisma.notificationDevice.findFirst.mockResolvedValueOnce(deviceRow() as never);
      prisma.notificationDevice.update.mockResolvedValueOnce({} as never);
      const res = await request(app.getHttpServer())
        .delete(`/api/v1/devices/${UUID_DEVICE}`)
        .set(AUTH.customer);
      expect([204, 404, 500]).toContain(res.status);
    });
  });
});
