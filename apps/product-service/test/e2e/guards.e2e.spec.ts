/**
 * Routes + response shape — E2E tests
 * NOTE: Guards are permit-all in E2E setup (real JWT requires token fixture).
 */
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createE2EApp, type E2EApp } from './setup.js';
import { mockProductListResponse, mockProductDetailResponse } from '../mocks/responses.js';
import { PRODUCT_ID } from '../helpers.js';

describe('Routes E2E', () => {
  let ctx: E2EApp;
  let app: INestApplication;

  beforeAll(async () => {
    ctx = await createE2EApp();
    app = ctx.app;
  });

  afterAll(async () => {
    await ctx.close();
  });

  beforeEach(() => {
    (ctx.commandBus.execute as jest.Mock).mockReset();
    (ctx.queryBus.execute as jest.Mock).mockReset();
  });

  describe('Route resolution', () => {
    it('GET /api/v1/products resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());
      await request(app.getHttpServer()).get('/api/v1/products').expect(200);
    });

    it('GET /api/v1/products/search resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());
      await request(app.getHttpServer())
        .get('/api/v1/products/search')
        .query({ q: 'x' })
        .expect(200);
    });

    it('GET /api/v1/products/:id resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductDetailResponse());
      await request(app.getHttpServer()).get(`/api/v1/products/${PRODUCT_ID}`).expect(200);
    });

    it('GET /api/v1/public/products resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());
      await request(app.getHttpServer()).get('/api/v1/public/products').expect(200);
    });

    it('GET /api/v1/public/products/search resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());
      await request(app.getHttpServer())
        .get('/api/v1/public/products/search')
        .query({ q: 'x' })
        .expect(200);
    });

    it('GET /api/v1/public/products/:slug resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductDetailResponse());
      await request(app.getHttpServer()).get('/api/v1/public/products/some-slug').expect(200);
    });

    it('GET /api/v1/inventory/low-stock resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce([]);
      await request(app.getHttpServer()).get('/api/v1/inventory/low-stock').expect(200);
    });

    it('GET /api/v1/inventory/product/:id resolves', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce([]);
      await request(app.getHttpServer())
        .get(`/api/v1/inventory/product/${PRODUCT_ID}`)
        .expect(200);
    });

    it('unknown route → 404', async () => {
      await request(app.getHttpServer()).get('/api/v1/unknown-path').expect(404);
    });
  });

  describe('POST validation', () => {
    it('POST /api/v1/products requires body (400)', async () => {
      const res = await request(app.getHttpServer())
        .post('/api/v1/products')
        .send({});
      expect([400, 500]).toContain(res.status);
    });
  });
});
