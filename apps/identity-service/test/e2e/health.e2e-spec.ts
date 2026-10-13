/**
 * Health E2E Tests
 * @module identity-service/test/e2e
 */
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { getTestApp, closeTestApp } from '../setup.js';

describe('Health (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await getTestApp();
  });

  afterAll(async () => {
    await closeTestApp();
  });

  describe('GET /api/v1/health', () => {
    it('should return 200 with service metadata', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/health');

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('service');
      expect(res.body.service).toBe('identity-service');
      expect(res.body).toHaveProperty('healthy');
      expect(res.body).toHaveProperty('timestamp');
      expect(res.body).toHaveProperty('uptimeSeconds');
      expect(res.body).toHaveProperty('dependencies');
      expect(Array.isArray(res.body.dependencies)).toBe(true);
    });

    it('should include database and redis dependencies', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/health');

      expect(res.status).toBe(200);
      const deps = res.body.dependencies as Array<{ name: string; healthy: boolean }>;
      const names = deps.map((d) => d.name);
      expect(names).toContain('database');
      expect(names).toContain('redis');
    });

    it('should not require authentication', async () => {
      const res = await request(app.getHttpServer()).get('/api/v1/health');
      expect(res.status).toBe(200);
    });
  });
});
