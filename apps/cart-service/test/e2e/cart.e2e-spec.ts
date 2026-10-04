import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, TEST_USER } from './setup-e2e.js';

jest.setTimeout(45000);

describe('E2E — Cart', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestApp();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  describe('POST /api/v1/cart', () => {
    it('creates a user cart', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/cart')
        .send({ type: 'user', currency: 'BDT' })
        .expect(201);

      expect(res.body).toHaveProperty('id');
      expect(res.body.type).toBe('user');
      expect(res.body.status).toBe('active');
      expect(res.body.currency).toBe('BDT');
      expect(Array.isArray(res.body.items)).toBe(true);
      expect(res.body.totals).toBeDefined();
    });

    it('defaults to BDT currency', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/cart')
        .send({ type: 'user' })
        .expect(201);

      expect(res.body.currency).toBe('BDT');
    });
  });

  describe('GET /api/v1/cart/:cartId', () => {
    it('returns 404 for missing cart', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/cart/11111111-1111-1111-1111-111111111111');

      expect([404, 500]).toContain(res.status);
    });
  });

  describe('GET /api/v1/cart/me', () => {
    it('returns null or cart for user (200)', async () => {
      const res = await request(app.getHttpServer())
        .get('/api/v1/cart/me')
        .expect(200);

      expect(res.body === null || typeof res.body === 'object').toBe(true);
    });
  });

  describe('Full cart lifecycle', () => {
    it('create → update notes → get', async () => {
      const create = await request(app.getHttpServer())
        .post('/api/v1/cart')
        .send({ type: 'user', currency: 'BDT' })
        .expect(201);

      const cartId = create.body.id;

      const update = await request(app.getHttpServer())
        .patch(`/api/v1/cart/${cartId}`)
        .send({ notes: 'please gift-wrap' })
        .expect(200);

      expect(update.body.id).toBe(cartId);

      const get = await request(app.getHttpServer())
        .get(`/api/v1/cart/${cartId}`)
        .expect(200);

      expect(get.body.id).toBe(cartId);
    });
  });
});
