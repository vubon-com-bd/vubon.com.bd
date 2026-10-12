import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Health API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  describe('GET /api/v1/logistics/health/live', () => {
    it('200 — public liveness, no auth required', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/logistics/health/live')
        .expect(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('logistics-service');
      expect(typeof res.body.timestamp).toBe('string');
    });
  });

  describe('GET /api/v1/logistics/health/ready', () => {
    it('200 ok when DB + Redis are healthy', async () => {
      prisma.isHealthy.mockResolvedValueOnce(true);
      const res = await request(app.getHttpServer())
        .get('/api/v1/logistics/health/ready')
        .expect(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.checks.database).toBe(true);
      expect(res.body.checks.redis).toBe(true);
    });

    it('200 degraded when DB is down', async () => {
      prisma.isHealthy.mockResolvedValueOnce(false);
      const res = await request(app.getHttpServer())
        .get('/api/v1/logistics/health/ready')
        .expect(200);
      expect(res.body.status).toBe('degraded');
      expect(res.body.checks.database).toBe(false);
    });
  });
});
