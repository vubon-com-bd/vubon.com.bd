/**
 * Product endpoints — E2E HTTP tests
 */
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createE2EApp, type E2EApp } from './setup.js';
import { mockProductResponse, mockProductListResponse, mockProductDetailResponse } from '../mocks/responses.js';
import { PRODUCT_ID, CATEGORY_ID, USER_ID } from '../helpers.js';


describe('Product E2E', () => {
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
    // Reset call history between tests
    (ctx.commandBus.execute as jest.Mock).mockReset();
    (ctx.queryBus.execute as jest.Mock).mockReset();
  });

  describe('GET /api/v1/products', () => {
    it('should return 200 with product list', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());

      const res = await request(app.getHttpServer())
        .get('/api/v1/products')
        .query({ page: 1, limit: 20 })
        .expect(200);

      expect(res.body.success).toBe(true);
      expect(res.body.products).toBeDefined();
      expect(res.body.total).toBe(1);
      expect(ctx.queryBus.execute).toHaveBeenCalledTimes(1);
    });

    it('should pass filters through to query', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());

      await request(app.getHttpServer())
        .get('/api/v1/products')
        .query({ status: 'published', type: 'physical', categoryId: CATEGORY_ID })
        .expect(200);

      const cmd = (ctx.queryBus.execute as jest.Mock).mock.calls[0][0];
      expect(cmd.options.filter.status).toBe('published');
      expect(cmd.options.filter.type).toBe('physical');
      expect(cmd.options.filter.categoryId).toBe(CATEGORY_ID);
    });

    it('should accept pagination params', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());

      await request(app.getHttpServer())
        .get('/api/v1/products')
        .query({ page: 2, limit: 10 })
        .expect(200);

      const cmd = (ctx.queryBus.execute as jest.Mock).mock.calls[0][0];
      expect(cmd.options.page).toBe(2);
      expect(cmd.options.limit).toBe(10);
    });
  });

  describe('GET /api/v1/products/search', () => {
    it('should dispatch search query', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());

      await request(app.getHttpServer())
        .get('/api/v1/products/search')
        .query({ q: 'headphones', page: 1, limit: 10 })
        .expect(200);

      const cmd = (ctx.queryBus.execute as jest.Mock).mock.calls[0][0];
      expect(cmd.search).toBe('headphones');
    });
  });

  describe('GET /api/v1/products/:productId', () => {
    it('should return 200 with product detail', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductDetailResponse());

      const res = await request(app.getHttpServer())
        .get(`/api/v1/products/${PRODUCT_ID}`)
        .expect(200);

      expect(res.body.product.id).toBe(PRODUCT_ID);
      expect(res.body.variants).toBeDefined();
      expect(res.body.inventory).toBeDefined();
    });

    it('should be accessible without auth (public)', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductDetailResponse());

      await request(app.getHttpServer())
        .get(`/api/v1/products/${PRODUCT_ID}`)
        .expect(200);
    });
  });

  describe('GET /api/v1/public/products', () => {
    it('should return published products without auth', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());

      const res = await request(app.getHttpServer())
        .get('/api/v1/public/products')
        .query({ page: 1, limit: 20 })
        .expect(200);

      expect(res.body.success).toBe(true);
    });

    it('should filter by status=published', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());

      await request(app.getHttpServer())
        .get('/api/v1/public/products')
        .expect(200);

      const cmd = (ctx.queryBus.execute as jest.Mock).mock.calls[0][0];
      expect(cmd.options.filter.status).toBe('published');
    });

    it('should pass search param', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductListResponse());

      await request(app.getHttpServer())
        .get('/api/v1/public/products')
        .query({ search: 'test' })
        .expect(200);

      const cmd = (ctx.queryBus.execute as jest.Mock).mock.calls[0][0];
      expect(cmd.options.filter.search).toBe('test');
    });
  });

  describe('GET /api/v1/public/products/:slug', () => {
    it('should return product detail by slug', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductDetailResponse());

      const res = await request(app.getHttpServer())
        .get('/api/v1/public/products/test-product')
        .expect(200);

      expect(res.body.product).toBeDefined();
    });

    it('should return 200 with empty body when not found', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(null);

      const res = await request(app.getHttpServer())
        .get('/api/v1/public/products/missing-slug')
        .expect(200);

      // NestJS Express converts null → {} in JSON response
      expect(Object.keys(res.body).length).toBe(0);
    });
  });

  describe('Response shape', () => {
    it('should include standard fields in product DTO', async () => {
      (ctx.queryBus.execute as jest.Mock).mockResolvedValueOnce(mockProductDetailResponse());

      const res = await request(app.getHttpServer())
        .get(`/api/v1/products/${PRODUCT_ID}`)
        .expect(200);

      const product = res.body.product;
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('slug');
      expect(product).toHaveProperty('sku');
      expect(product).toHaveProperty('type');
      expect(product).toHaveProperty('status');
      expect(product).toHaveProperty('price');
      expect(product).toHaveProperty('currency');
    });
  });

  void mockProductResponse;
  void USER_ID;
});
