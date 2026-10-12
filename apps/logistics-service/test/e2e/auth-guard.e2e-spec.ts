import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';

describe('Auth guard (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
  });

  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  // ═══════════════════════════════════════════════════════════════
  // Public endpoints (no token)
  // ═══════════════════════════════════════════════════════════════
  describe('Public endpoints', () => {
    it('GET /logistics/health/live — no auth', async () => {
      await request(app.getHttpServer()).get('/api/v1/logistics/health/live').expect(200);
    });

    it('GET /public/logistics/track/:tn — no auth', async () => {
      // Will 404 because prisma returns null, but NOT 401
      const res = await request(app.getHttpServer()).get('/api/v1/public/logistics/track/SHTEST1234');
      expect(res.status).not.toBe(401);
    });

    it('POST /webhooks/couriers/pathao/:secret — no auth', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/webhooks/couriers/pathao/test-secret-12345')
        .send({ consignmentId: 'x', trackingNumber: 'SH123', status: 'in_transit', location: 'Dhaka', occurredAt: new Date().toISOString() });
      expect(res.status).not.toBe(401);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // Protected endpoints (401 without token)
  // ═══════════════════════════════════════════════════════════════
  describe('Protected endpoints — 401 without token', () => {
    const endpoints = [
      { method: 'get' as const, url: '/api/v1/logistics/shipments' },
      { method: 'get' as const, url: '/api/v1/logistics/couriers' },
      { method: 'get' as const, url: '/api/v1/logistics/warehouses' },
      { method: 'get' as const, url: '/api/v1/logistics/vehicles' },
      { method: 'get' as const, url: '/api/v1/logistics/drivers' },
      { method: 'get' as const, url: '/api/v1/logistics/zones' },
      { method: 'get' as const, url: '/api/v1/logistics/shipping-methods' },
      { method: 'get' as const, url: '/api/v1/logistics/packagings' },
      { method: 'get' as const, url: '/api/v1/logistics/deliveries' },
      { method: 'get' as const, url: '/api/v1/logistics/tracking' },
      { method: 'get' as const, url: '/api/v1/logistics/routes' },
      { method: 'get' as const, url: '/api/v1/logistics/fulfillments' },
      { method: 'get' as const, url: '/api/v1/logistics/dispatches' },
      { method: 'get' as const, url: '/api/v1/logistics/return-shipments' },
      { method: 'get' as const, url: '/api/v1/logistics/insurances' },
    ];

    it.each(endpoints)('$method $url → 401', async ({ method, url }) => {
      const res = await request(app.getHttpServer())[method](url);
      expect(res.status).toBe(401);
    });
  });

  // ═══════════════════════════════════════════════════════════════
  // Protected endpoints with invalid token (still 401)
  // ═══════════════════════════════════════════════════════════════
  describe('Protected endpoints — 401 with invalid token', () => {
    it('GET /logistics/shipments — invalid token → 401', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/logistics/shipments')
        .set('Authorization', 'Bearer invalid-token-xxx');
      expect(res.status).toBe(401);
    });
  });
});
