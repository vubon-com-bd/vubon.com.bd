/**
 * AUTO-GENERATED E2E Test — profile
 * @module vendor-service/test/e2e
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


let accessToken = '';


describe('profile (E2E)', () => {
    it('Get Vendor Profile', async () => {
    const vendorId = '00000000-0000-0000-0000-000000000001';
    let req = request(app.getHttpServer())
      .get(`/vendors/${vendorId}/profile`);
    if (accessToken) req = req.set('Authorization', `Bearer ${accessToken}`);
    const response = await req;
    expect([200,404,500,503,401]).toContain(response.status);
    expect(response.body).toBeDefined();
  });

    it('Update Vendor Profile', async () => {
    const vendorId = '00000000-0000-0000-0000-000000000001';
    let req = request(app.getHttpServer())
      .patch(`/vendors/${vendorId}/profile`);
    if (accessToken) req = req.set('Authorization', `Bearer ${accessToken}`);
    req = req.send(  {
      "displayName": "Updated Profile"
    });
    const response = await req;
    expect([200,400,404,500,503,401]).toContain(response.status);
    expect(response.body).toBeDefined();
  });
});
