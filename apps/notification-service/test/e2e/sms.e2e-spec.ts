import { jest } from '@jest/globals';
import request from 'supertest';
import type { INestApplication } from '@nestjs/common';
import { createTestApp, AUTH, notificationRow } from './_setup.js';
import type { MockPrisma } from './_setup.js';

describe('SMS API (e2e)', () => {
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
      await request(app.getHttpServer()).post('/api/v1/sms').expect(401);
    });
  });

  describe('POST /api/v1/sms', () => {
    it('200/201 — valid SMS', async () => {
      prisma.notification.create.mockResolvedValueOnce(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/sms')
        .set(AUTH.customer)
        .send({ to: '+8801712345678', message: 'Your OTP is 123456' });
      expect([200, 201]).toContain(res.status);
    });

    it('422 — missing message', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/sms')
        .set(AUTH.customer)
        .send({ to: '+8801712345678' })
        .expect(422);
    });

    it('422 — missing to', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/sms')
        .set(AUTH.customer)
        .send({ message: 'Hello' })
        .expect(422);
    });

    it('422 — message too long', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/sms')
        .set(AUTH.customer)
        .send({ to: '+8801712345678', message: 'x'.repeat(1601) })
        .expect(422);
    });
  });

  describe('POST /api/v1/sms/bulk', () => {
    it('200/201 — bulk', async () => {
      prisma.notification.create.mockResolvedValue(notificationRow() as never);
      const res = await request(app.getHttpServer())
        .post('/api/v1/sms/bulk')
        .set(AUTH.customer)
        .send({ recipients: ['+8801712345678'], message: 'Hello' });
      expect([200, 201]).toContain(res.status);
    });

    it('422 — empty recipients', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/sms/bulk')
        .set(AUTH.customer)
        .send({ recipients: [], message: 'Hello' })
        .expect(422);
    });
  });

  describe('GET /api/v1/sms', () => {
    it('200 — list', async () => {
      prisma.notification.findMany.mockResolvedValueOnce([] as never);
      prisma.notification.count.mockResolvedValueOnce(0 as never);
      await request(app.getHttpServer()).get('/api/v1/sms').set(AUTH.customer).expect(200);
    });
  });

  describe('GET /api/v1/sms/:id', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .get('/api/v1/sms/11111111-1111-4111-8111-111111111111')
        .set(AUTH.customer)
        .expect(404);
    });
  });

  describe('POST /api/v1/sms/:id/retry', () => {
    it('404 — not found', async () => {
      prisma.notification.findFirst.mockResolvedValueOnce(null as never);
      await request(app.getHttpServer())
        .post('/api/v1/sms/11111111-1111-4111-8111-111111111111/retry')
        .set(AUTH.customer)
        .expect(404);
    });
  });
});
