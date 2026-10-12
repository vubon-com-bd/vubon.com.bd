import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, authHeader } from './_setup.js';

describe('CRUD smoke tests — all feature controllers', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
  });
  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  // ═══════════════════════════════════════════════════════════════
  // Verify all GET list endpoints respond (200, not 500)
  // ═══════════════════════════════════════════════════════════════
  const listEndpoints = [
    '/api/v1/logistics/warehouses',
    '/api/v1/logistics/vehicles',
    '/api/v1/logistics/drivers',
    '/api/v1/logistics/zones',
    '/api/v1/logistics/shipping-methods',
    '/api/v1/logistics/packagings',
    '/api/v1/logistics/deliveries',
    '/api/v1/logistics/tracking',
    '/api/v1/logistics/routes',
    '/api/v1/logistics/fulfillments',
    '/api/v1/logistics/dispatches',
    '/api/v1/logistics/return-shipments',
    '/api/v1/logistics/insurances',
  ];

  it.each(listEndpoints)('GET %s → 200 (not 500)', async (url) => {
    const res = await request(app.getHttpServer())
      .get(url)
      .set(authHeader());
    expect(res.status).not.toBe(500);
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(500);
  });

  // ═══════════════════════════════════════════════════════════════
  // All endpoints require auth
  // ═══════════════════════════════════════════════════════════════
  it.each(listEndpoints)('GET %s → 401 without token', async (url) => {
    const res = await request(app.getHttpServer()).get(url);
    expect(res.status).toBe(401);
  });

  // ═══════════════════════════════════════════════════════════════
  // Sample validation: POST with empty body → 400 (DTO validation)
  // ═══════════════════════════════════════════════════════════════
  const postEndpoints = [
    { url: '/api/v1/logistics/warehouses', body: {} },
    { url: '/api/v1/logistics/vehicles', body: {} },
    { url: '/api/v1/logistics/drivers', body: {} },
    { url: '/api/v1/logistics/zones', body: {} },
    { url: '/api/v1/logistics/shipping-methods', body: {} },
    { url: '/api/v1/logistics/packagings', body: {} },
    { url: '/api/v1/logistics/deliveries', body: {} },
    { url: '/api/v1/logistics/tracking', body: {} },
    { url: '/api/v1/logistics/routes', body: {} },
    { url: '/api/v1/logistics/fulfillments', body: {} },
    { url: '/api/v1/logistics/dispatches', body: {} },
    { url: '/api/v1/logistics/return-shipments', body: {} },
    { url: '/api/v1/logistics/insurances', body: {} },
  ];

  it.each(postEndpoints)('POST $url → 400 empty body', async ({ url, body }) => {
    const res = await request(app.getHttpServer())
      .post(url)
      .set(authHeader())
      .send(body);
    expect(res.status).toBe(400);
  });
});
