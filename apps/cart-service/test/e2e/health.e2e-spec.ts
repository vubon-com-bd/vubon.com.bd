import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './setup-e2e.js';

jest.setTimeout(45000);

describe('E2E — Health', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('GET /api/v1/health returns 200', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(res.body).toHaveProperty('service');
    expect(res.body.service).toBe('cart-service');
    expect(['ok', 'degraded']).toContain(res.body.status);
    expect(res.body).toHaveProperty('checks');
  });

  it('health includes Redis + Prisma checks', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/health')
      .expect(200);

    expect(res.body.checks).toHaveProperty('redis');
    expect(res.body.checks).toHaveProperty('prisma');
  });
});
