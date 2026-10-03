import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './setup-e2e.js';

jest.setTimeout(45000);

const PRODUCT_UUID = '11111111-1111-1111-1111-111111111111';

describe('E2E — Totals', () => {
  let app: INestApplication;
  let cartId: string;

  beforeAll(async () => {
    app = await createTestApp();

    const res = await request(app.getHttpServer())
      .post('/api/v1/cart')
      .send({ type: 'user', currency: 'BDT' })
      .expect(201);
    cartId = res.body.id;

    await request(app.getHttpServer())
      .post(`/api/v1/cart/${cartId}/items`)
      .send({
        productId: PRODUCT_UUID,
        sku: 'SKU-TOT-1',
        name: 'Totals Item',
        unitPrice: 100,
        quantity: 2,
        currency: 'BDT',
      })
      .expect(201);
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('GET /totals returns totals', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/cart/${cartId}/totals`)
      .expect(200);

    expect(res.body).toHaveProperty('currency');
    expect(res.body).toHaveProperty('subtotal');
    expect(res.body).toHaveProperty('grandTotal');
  });

  it('GET /summary returns summary', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/cart/${cartId}/summary`)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('itemCount');
  });
});
