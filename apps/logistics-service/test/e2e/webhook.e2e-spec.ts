import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './_setup.js';

describe('Webhooks (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
  });
  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  const webhooks = [
    { name: 'pathao', path: '/api/v1/webhooks/couriers/pathao/test-secret-12345', body: { consignment_id: 'C1', merchant_order_id: 'O1', order_status: 'In_Transit', updated_at: new Date().toISOString(), delivery_fee: 60 } },
    { name: 'redx', path: '/api/v1/webhooks/couriers/redx/test-secret-12345', body: { tracking_id: 'T1', parcel_id: 'P1', status: 'in_transit', status_update_at: new Date().toISOString() } },
    { name: 'steadfast', path: '/api/v1/webhooks/couriers/steadfast/test-secret-12345', body: { consignment_id: 'C1', invoice: 'I1', status: 'pending', delivery_status: 'pending', updated_at: new Date().toISOString() } },
    { name: 'sa-paribahan', path: '/api/v1/webhooks/couriers/sa-paribahan/test-secret-12345', body: { consignmentId: 'C1', trackingNumber: 'T1', status: 'in_transit', location: 'Dhaka', occurredAt: new Date().toISOString() } },
  ];

  it.each(webhooks)('$name — 200 on valid payload', async ({ path, body }) => {
    const res = await request(app.getHttpServer())
      .post(path)
      .send(body);
    // Public + valid secret → 200
    expect(res.status).toBeGreaterThanOrEqual(200);
    expect(res.status).toBeLessThan(300);
  });

  it.each(webhooks)('$name — 401 on short secret', async ({ path }) => {
    const shortPath = path.replace('test-secret-12345', 'x');
    const res = await request(app.getHttpServer())
      .post(shortPath)
      .send({});
    expect(res.status).toBe(401);
  });
});
