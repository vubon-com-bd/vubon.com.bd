/**
 * Health E2E — verifies app boots and health endpoints respond
 * @module vendor-service/test/e2e
 */
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

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.isHealthy.mockResolvedValue(true);
  });

  describe('GET /api/v1/health/live', () => {
    it('200 — public liveness probe', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/health/live')
        .expect(200);
      expect(res.body.status).toBe('live');
    });

    it('200 — no Authorization required', async () => {
      await request(app.getHttpServer()).get('/api/v1/health/live').expect(200);
    });
  });

  describe('GET /api/v1/health/ready', () => {
    it('200 ready when db healthy', async () => {
      prisma.isHealthy.mockResolvedValueOnce(true);
      const res = await request(app.getHttpServer())
        .get('/api/v1/health/ready')
        .expect(200);
      expect(res.body.status).toBe('ready');
    });

    it('200 not-ready when db down', async () => {
      prisma.isHealthy.mockResolvedValueOnce(false);
      const res = await request(app.getHttpServer())
        .get('/api/v1/health/ready')
        .expect(200);
      expect(res.body.status).toBe('not-ready');
    });
  });

  describe('GET /api/v1/health', () => {
    it('200 ok when all checks pass', async () => {
      prisma.isHealthy.mockResolvedValueOnce(true);
      const res = await request(app.getHttpServer()).get('/api/v1/health').expect(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.service).toBe('vendor-service');
      expect(res.body.checks).toBeDefined();
    });

    it('200 degraded when db down', async () => {
      prisma.isHealthy.mockResolvedValueOnce(false);
      const res = await request(app.getHttpServer()).get('/api/v1/health').expect(200);
      expect(res.body.status).toBe('degraded');
      expect(res.body.checks.database).toBe(false);
    });
  });
});
