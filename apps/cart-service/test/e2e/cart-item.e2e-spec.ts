import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp } from './setup-e2e.js';

jest.setTimeout(45000);

const PRODUCT_UUID = '11111111-1111-1111-1111-111111111111';

describe('E2E — Cart Items', () => {
  let app: INestApplication;
  let cartId: string;

  beforeAll(async () => {
    app = await createTestApp();
    const res = await request(app.getHttpServer())
      .post('/api/v1/cart')
      .send({ type: 'user', currency: 'BDT' })
      .expect(201);
    cartId = res.body.id;
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  it('POST adds item to cart', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/cart/${cartId}/items`)
      .send({
        productId: PRODUCT_UUID,
        sku: 'SKU-TEST-1',
        name: 'Test Item',
        unitPrice: 199.99,
        quantity: 2,
        currency: 'BDT',
      })
      .expect(201);

    expect(res.body.id).toBe(cartId);
    const item = res.body.items.find(
      (i: { sku: string }) => i.sku === 'SKU-TEST-1',
    );
    expect(item).toBeDefined();
    expect(item.quantity).toBe(2);
  });

  it('POST merges duplicate item', async () => {
    const res = await request(app.getHttpServer())
      .post(`/api/v1/cart/${cartId}/items`)
      .send({
        productId: PRODUCT_UUID,
        sku: 'SKU-TEST-1',
        name: 'Test Item',
        unitPrice: 199.99,
        quantity: 3,
        currency: 'BDT',
      })
      .expect(201);

    const item = res.body.items.find(
      (i: { sku: string }) => i.sku === 'SKU-TEST-1',
    );
    expect(item.quantity).toBe(5);
  });

  it('GET lists items', async () => {
    const res = await request(app.getHttpServer())
      .get(`/api/v1/cart/${cartId}/items`)
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PATCH updates item quantity', async () => {
    const list = await request(app.getHttpServer())
      .get(`/api/v1/cart/${cartId}/items`)
      .expect(200);
    const itemId = list.body[0].id;

    const res = await request(app.getHttpServer())
      .patch(`/api/v1/cart/${cartId}/items/${itemId}/quantity`)
      .send({ quantity: 10 })
      .expect(200);

    const item = res.body.items.find((i: { id: string }) => i.id === itemId);
    expect(item.quantity).toBe(10);
  });

  it('DELETE removes item', async () => {
    const list = await request(app.getHttpServer())
      .get(`/api/v1/cart/${cartId}/items`)
      .expect(200);
    const itemId = list.body[0].id;

    const res = await request(app.getHttpServer())
      .delete(`/api/v1/cart/${cartId}/items/${itemId}`)
      .expect(200);

    const remaining = res.body.items.find(
      (i: { id: string }) => i.id === itemId,
    );
    expect(remaining).toBeUndefined();
  });
});
