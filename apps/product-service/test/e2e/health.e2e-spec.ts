/**
 * AUTO-GENERATED E2E Test — health
 * @module product-service/test/e2e
 *
 * NOTE: Termux + Prisma ARM64 = degraded mode.
 * Tests accept a range of statuses to remain resilient.
 *
 * Regenerate: pnpm generate:e2e
 */

import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { getTestApp, closeTestApp } from '../setup.js';


let app: INestApplication;

beforeAll(async () => {
  app = await getTestApp();
}, 30000);

afterAll(async () => {
  await closeTestApp();
});



describe('health (E2E)', () => {
    it('Health Check', async () => {
    let req = request(app.getHttpServer())
      .get(`/health`);
    const response = await req;
    expect([200]).toContain(response.status);
    if (response.status === 200 || response.status === 201) {
      expect(response.body).toHaveProperty('service');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('timestamp');
    }
    expect(response.body).toBeDefined();
  });
});
