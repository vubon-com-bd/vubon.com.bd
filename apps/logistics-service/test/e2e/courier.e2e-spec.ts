import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, authHeader } from './_setup.js';
import type { MockPrisma } from './_setup.js';

const BASE = '/api/v1/logistics/couriers';

describe('Courier API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  describe('GET /', () => {
    it('200 — empty list', async () => {
      prisma.logisticsCourier.findMany.mockResolvedValueOnce([]);
      prisma.logisticsCourier.count.mockResolvedValueOnce(0);
      const res = await request(app.getHttpServer())
        .get(BASE)
        .set(authHeader())
        .expect(200);
      expect(res.body.items).toEqual([]);
    });
  });

  describe('GET /default', () => {
    it('200 — null when no default courier', async () => {
      prisma.logisticsCourier.findFirst.mockResolvedValueOnce(null);
      const res = await request(app.getHttpServer())
        .get(`${BASE}/default`)
        .set(authHeader())
        .expect(200);
      // Express serializes null as empty body → supertest may return {} or ''
      const body = res.body;
      const isNullish =
        body === null ||
        body === undefined ||
        body === '' ||
        (typeof body === 'object' && Object.keys(body).length === 0);
      expect(isNullish).toBe(true);
    });
  });

  describe('GET /:id', () => {
    it('404 — courier not found', async () => {
      prisma.logisticsCourier.findFirst.mockResolvedValueOnce(null);
      const res = await request(app.getHttpServer())
        .get(`${BASE}/66666666-6666-6666-6666-666666666666`)
        .set(authHeader());
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    it('400 — invalid courier type', async () => {
      const res = await request(app.getHttpServer())
        .post(BASE)
        .set(authHeader())
        .send({
          name: 'Test Courier', code: 'pathao', displayName: 'Test',
          type: 'invalid-type',
          supportsCOD: true, supportsInsurance: false, supportsInternational: false,
          averageDeliveryDays: 3,
        });
      expect(res.status).toBe(400);
    });

    it('400 — missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post(BASE)
        .set(authHeader())
        .send({ name: 'x' });
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /:id/suspend', () => {
    it('404 when courier missing', async () => {
      prisma.logisticsCourier.findFirst.mockResolvedValueOnce(null);
      const res = await request(app.getHttpServer())
        .patch(`${BASE}/77777777-7777-7777-7777-777777777777/suspend`)
        .set(authHeader())
        .send({ reason: 'policy violation' });
      expect(res.status).toBe(404);
    });

    it('400 — reason too short', async () => {
      const res = await request(app.getHttpServer())
        .patch(`${BASE}/77777777-7777-7777-7777-777777777777/suspend`)
        .set(authHeader())
        .send({ reason: 'x' });
      expect(res.status).toBe(400);
    });
  });

  describe('PATCH /:id/default', () => {
    it('404 when courier missing', async () => {
      prisma.logisticsCourier.findFirst.mockResolvedValueOnce(null);
      await request(app.getHttpServer())
        .patch(`${BASE}/77777777-7777-7777-7777-777777777777/default`)
        .set(authHeader())
        .send({ isDefault: true })
        .expect(404);
    });
  });
});
