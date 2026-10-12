import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Public Logistics API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });
  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  it('GET /public/logistics/track/:tn — 404 when no matching tracking', async () => {
    prisma.logisticsTracking.findFirst.mockResolvedValueOnce(null);
    const res = await request(app.getHttpServer())
      .get('/api/v1/public/logistics/track/SHNOTFOUND1234');
    expect(res.status).toBe(404);
  });

  it('GET /public/logistics/shipments/:id — 404 when not found', async () => {
    prisma.logisticsShipment.findFirst.mockResolvedValueOnce(null);
    const res = await request(app.getHttpServer())
      .get('/api/v1/public/logistics/shipments/99999999-9999-9999-9999-999999999999');
    expect(res.status).toBe(404);
  });
});
