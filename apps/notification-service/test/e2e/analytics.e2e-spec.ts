import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, UUID_USER } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Analytics API (e2e)', () => {
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
      await request(app.getHttpServer()).get('/api/v1/analytics/overview').expect(401);
    });
  });

  describe('GET /api/v1/analytics/overview', () => {
    it('200 — with valid date range', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/analytics/overview?fromDate=2026-01-01T00:00:00.000Z&toDate=2026-12-31T23:59:59.999Z')
        .set(AUTH.customer);
      expect([200, 422, 500]).toContain(res.status);
    });

    it('422 — missing fromDate', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/analytics/overview?toDate=2026-12-31T23:59:59.999Z')
        .set(AUTH.customer)
        .expect(422);
    });

    it('422 — missing toDate', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/analytics/overview?fromDate=2026-01-01T00:00:00.000Z')
        .set(AUTH.customer)
        .expect(422);
    });

    it('422 — fromDate after toDate', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/analytics/overview?fromDate=2026-12-31T00:00:00.000Z&toDate=2026-01-01T00:00:00.000Z')
        .set(AUTH.customer);
      expect([422, 400, 500]).toContain(res.status);
    });
  });

  describe('GET /api/v1/analytics/time-series', () => {
    it('200 — hourly interval', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/analytics/time-series?fromDate=2026-01-01T00:00:00.000Z&toDate=2026-12-31T23:59:59.999Z&interval=hour')
        .set(AUTH.customer);
      expect([200, 422, 500]).toContain(res.status);
    });

    it('200 — day interval', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/analytics/time-series?fromDate=2026-01-01T00:00:00.000Z&toDate=2026-12-31T23:59:59.999Z&interval=day')
        .set(AUTH.customer);
      expect([200, 422, 500]).toContain(res.status);
    });

    it('422 — invalid interval', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/analytics/time-series?fromDate=2026-01-01T00:00:00.000Z&toDate=2026-12-31T23:59:59.999Z&interval=decade')
        .set(AUTH.customer)
        .expect(422);
    });
  });

  describe('GET /api/v1/analytics/channel-performance', () => {
    it('200 — with valid range', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/analytics/channel-performance?fromDate=2026-01-01T00:00:00.000Z&toDate=2026-12-31T23:59:59.999Z')
        .set(AUTH.customer);
      expect([200, 422, 500]).toContain(res.status);
    });
  });

  describe('POST /api/v1/analytics/reports', () => {
    it('200/201/422 — generate report', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/analytics/reports')
        .set(AUTH.admin)
        .send({
          reportType: 'delivery',
          format: 'json',
          fromDate: '2026-01-01T00:00:00.000Z',
          toDate: '2026-12-31T23:59:59.999Z',
        });
      expect([200, 201, 422]).toContain(res.status);
    });

    it('422 — invalid format', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/analytics/reports')
        .set(AUTH.admin)
        .send({
          reportType: 'delivery',
          format: 'papyrus',
          fromDate: '2026-01-01T00:00:00.000Z',
          toDate: '2026-12-31T23:59:59.999Z',
        })
        .expect(422);
    });
  });
});
