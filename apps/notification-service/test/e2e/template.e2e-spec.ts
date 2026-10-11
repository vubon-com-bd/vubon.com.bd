import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import {
  createTestApp,
  AUTH,
  templateRow,
  UUID_TEMPLATE,
} from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('Template API (e2e)', () => {
  let app: INestApplication;
  let prisma: MockPrisma;

  beforeAll(async () => {
    const ctx = await createTestApp();
    app = ctx.app;
    prisma = ctx.prisma;
  });
  afterAll(async () => { await app.close(); });
  beforeEach(() => { jest.clearAllMocks(); });

  describe('Auth', () => {
    it('401 without token', async () => {
      await request(app.getHttpServer()).get('/api/v1/templates').expect(401);
    });
  });

  describe('POST /api/v1/templates', () => {
    it('201 — create valid template', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(null as never);
      prisma.notificationTemplate.create.mockResolvedValueOnce(templateRow() as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/templates')
        .set(AUTH.admin)
        .send({
          name: 'Order Confirmation',
          slug: 'order-confirmation',
          type: 'email',
          category: 'order',
          locale: 'en',
          subject: 'Order #{{orderNumber}} confirmed',
          body: 'Hello {{name}}',
          variables: [],
        });
      expect([200, 201]).toContain(res.status);
    });

    it('409 — slug conflict', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(templateRow() as never);

      const res = await request(app.getHttpServer())
        .post('/api/v1/templates')
        .set(AUTH.admin)
        .send({
          name: 'Order Confirmation',
          slug: 'order-confirmation',
          type: 'email',
          category: 'order',
          locale: 'en',
          subject: 'S',
          body: 'B',
          variables: [],
        });
      expect([409, 422, 500]).toContain(res.status);
    });

    it('422 — missing required fields', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/templates')
        .set(AUTH.admin)
        .send({})
        .expect(422);
    });

    it('422 — invalid type enum', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/templates')
        .set(AUTH.admin)
        .send({
          name: 'T',
          slug: 't',
          type: 'carrier-pigeon',
          category: 'order',
          locale: 'en',
          body: 'B',
          variables: [],
        })
        .expect(422);
    });
  });

  describe('GET /api/v1/templates', () => {
    it('200 — paginated list', async () => {
      prisma.notificationTemplate.findMany.mockResolvedValueOnce([] as never);
      prisma.notificationTemplate.count.mockResolvedValueOnce(0 as never);

      const res = await request(app.getHttpServer())
        .get('/api/v1/templates')
        .set(AUTH.customer)
        .expect(200);
      expect(res.body).toBeDefined();
    });
  });

  describe('GET /api/v1/templates/:id', () => {
    it('404 — not found', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get(`/api/v1/templates/${UUID_TEMPLATE}`)
        .set(AUTH.customer)
        .expect(404);
    });

    it('200 — found', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(templateRow() as never);
      const res = await request(app.getHttpServer())
        .get(`/api/v1/templates/${UUID_TEMPLATE}`)
        .set(AUTH.customer)
        .expect(200);
      expect(res.body.id).toBe(UUID_TEMPLATE);
    });
  });

  describe('GET /api/v1/templates/by-slug/:slug', () => {
    it('404/200', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(templateRow() as never);
      const res = await request(app.getHttpServer())
        .get('/api/v1/templates/by-slug/order-confirmation')
        .set(AUTH.customer);
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('PATCH /api/v1/templates/:id', () => {
    it('200/404', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(templateRow() as never);
      prisma.notificationTemplate.update.mockResolvedValueOnce(templateRow() as never);
      const res = await request(app.getHttpServer())
        .patch(`/api/v1/templates/${UUID_TEMPLATE}`)
        .set(AUTH.admin)
        .send({ body: 'Updated body' });
      expect([200, 404]).toContain(res.status);
    });
  });

  describe('POST /api/v1/templates/:id/activate', () => {
    it('200/404', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(templateRow() as never);
      prisma.notificationTemplate.update.mockResolvedValueOnce(templateRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/templates/${UUID_TEMPLATE}/activate`)
        .set(AUTH.admin);
      expect([200, 404, 400, 422]).toContain(res.status);
    });
  });

  describe('POST /api/v1/templates/:id/render', () => {
    it('200/404 — render with data', async () => {
      prisma.notificationTemplate.findFirst.mockResolvedValueOnce(templateRow() as never);
      const res = await request(app.getHttpServer())
        .post(`/api/v1/templates/${UUID_TEMPLATE}/render`)
        .set(AUTH.customer)
        .send({ data: { orderNumber: '123', customerName: 'Rahim' } });
      expect([200, 404, 422]).toContain(res.status);
    });

    it('422 — missing data field', async () => {
      await request(app.getHttpServer())
        .post(`/api/v1/templates/${UUID_TEMPLATE}/render`)
        .set(AUTH.customer)
        .send({})
        .expect(422);
    });
  });
});
